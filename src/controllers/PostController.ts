import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import {plainToClass} from "class-transformer";
import { Post } from "../entity/Post";
import { CreatePostDTO, PostDTO, CreatePostRequest } from '../models/post';
import { Category } from "../entity/Category";
import { validate } from "class-validator";
import { PostLikes } from "../entity/PostLike";
import { LikeDTO } from "../models/likes";

class PostController {

    static getPosts = async (req: Request, res: Response) => {
        const postRepository = getRepository(Post);
        const token = res.locals.jwtPayload;
        let posts: Post[];
        try {
            posts = await postRepository
                    .createQueryBuilder('post')
                    .leftJoinAndSelect('post.category', 'category')
                    .leftJoinAndSelect('post.user', 'user')
                    .leftJoinAndSelect('post.likes', 'like', `like.userId = ${token.userId} and like.postId = post.id`)
                    .where('post.isDeleted = false')
                    .orderBy('post.createdAt', 'DESC')
                    .getMany();

            const postsDTO = plainToClass(PostDTO, posts, { excludeExtraneousValues: true });
            return res.send(postsDTO);
        } catch (err) {
            return res.status(500).send({err: 'Error Occured'});
        }
    }

    static createPost = async (req: Request, res: Response) => {
        const token = res.locals.jwtPayload;
        const categoryRepository = getRepository(Category);
        const userRepository = getRepository(User);
        const postRepository = getRepository(Post);

        const body = req.body;
        const createPostRequest = plainToClass(CreatePostRequest, body, {excludeExtraneousValues: true});

        const errors = await validate(createPostRequest, {validationError: {target: false, value: false}});
        if (errors && errors.length > 0) {
            return res.status(500).send(errors); 
        }

        const user = await userRepository.findOne(token.userId);
        const category = await categoryRepository.findOne(createPostRequest.categoryId);
        
        let post = new Post();
        post.user = user;
        post.category = category;
        post.content = createPostRequest.content;
        post.isCommentsEnabled = createPostRequest.isCommentsEnabled;
        try {
            post = await postRepository.save(post);
        } catch (err) {
            return res.status(500).send({err: 'Error Occured'});
        }

        const newPost = plainToClass(CreatePostDTO, post, { excludeExtraneousValues: true });

        res.send(newPost);
    }

    static getPostById = async (req: Request, res: Response) => {
        const postId: number = req.params.id;

        if (!postId) {
            return res.status(500).send({err: 'postId is required'});
        }

        const postRepository = getRepository(Post);
        try {
            const post = await postRepository.findOneOrFail(postId, {relations: ['category', 'user']});
            const postDTO = plainToClass(PostDTO, post, {excludeExtraneousValues: true});
            return res.send(postDTO);
        } catch (error) {
            return res.status(500).send({err: `Post not found with id: ${postId}`});
        }
    }

    static getPostLikes = async (req: Request, res: Response) => {
        const postId: number = req.params.id;
        const { userId } = res.locals.jwtPayload;

        if (!postId) {
            return res.status(500).send({err: 'postId is required'});
        }

        const postLikesRepository = getRepository(PostLikes);
        try {
            const likes = await postLikesRepository.find({where: {postId}, relations: ['user']});
            const likesDTO = plainToClass(LikeDTO, likes, {excludeExtraneousValues: true});
            return res.send(likesDTO);
        } catch (error) {
            return res.status(500).send({err: `Post not found with id: ${postId}`});
        }
    }

    static toggleLike = async (req: Request, res: Response) => {
        const token = res.locals.jwtPayload;
        const postId: number = req.params.id;

        if (!postId) {
            return res.status(500).send({err: 'postId is required'});
        }

        const userRepository = getRepository(User);
        const postRepository = getRepository(Post);

        const user = await userRepository.findOne(token.userId);
        try {
            const post = await postRepository.findOneOrFail(1);
            res.send(post);

        } catch (error) {
            return res.status(500).send({err: `Post not found with id: ${postId}`});
        }
    }

}

export default PostController;