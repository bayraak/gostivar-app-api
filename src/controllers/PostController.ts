import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import {plainToClass} from "class-transformer";
import { Post } from "../entity/Post";
import { CreatePostDTO } from '../models/post';

class PostController {

    static getAllPosts = async (req: Request, res: Response) => {
        const postRepository = getRepository(Post);
        let posts: Post[];
        try {
            posts = await postRepository.find();
        } catch (err) {
            return res.status(500).send({err: 'Error Occured'});
        }

        res.send(posts);
    }

    static createPost = async (req: Request, res: Response) => {
        const token = res.locals.jwtPayload;
        const userRepository = getRepository(User);
        const postRepository = getRepository(Post);
        const user = await userRepository.findOne(token.userId);
        let post = new Post();
        post.user = user;
        post.content = 'Test';
        try {
            post = await postRepository.save(post);
        } catch (err) {
            return res.status(500).send({err: 'Error Occured'});
        }

        const newPost = plainToClass(CreatePostDTO, post, { excludeExtraneousValues: true });

        res.send(newPost);
    }

}

export default PostController;