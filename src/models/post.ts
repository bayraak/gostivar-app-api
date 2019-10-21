import { Expose, Type, Transform } from "class-transformer";
import { CategoryDTO } from "./category";
import { UserDTO } from "./user";
import { MinLength, IsNotEmpty } from "class-validator";
import { PostImage } from "../entity/PostImage";
import { PostImageDTO } from "./postImage";

export class CreatePostDTO {
    @Expose() id: string;
    @Expose() content: string;
    @Expose() likeCount: number;
    @Expose() commentCount: number;
    @Expose() isDeleted: boolean;
    @Expose() isCommentsEnabled: boolean;
    @Expose() createdAt: Date;
    @Expose() updatedAt: Date;
    @Expose() @Type(() => CategoryDTO) category: CategoryDTO;
    @Expose() @Type(() => PostImageDTO) images: PostImageDTO[];
}

export class CreatePostRequest {
    @IsNotEmpty({message: 'Content can\'t be empty'})
    @Expose()
    content: string;

    @Expose()
    @Transform(value => value !== null ? value : true, { toClassOnly: true })
    isCommentsEnabled: boolean;

    @Expose()
    @IsNotEmpty({message: 'CategoryId can\'t be empty'})
    categoryId: number;

    @Expose()
    @Transform(value => value || [], { toClassOnly: true })
    images: string[];
}

export class PostDTO {
    @Expose() id: string;
    @Expose() content: string;
    @Expose() likeCount: number;
    @Expose() commentCount: number;
    @Expose() isDeleted: boolean;
    @Expose() isCommentsEnabled: boolean;
    @Expose() createdAt: Date;
    @Expose() updatedAt: Date;
    @Expose() userId: number;
    @Expose() @Type(() => CategoryDTO) category: CategoryDTO;
    @Expose() @Type(() => UserDTO) user: UserDTO;
    @Expose() @Type(() => PostImageDTO) images: PostImageDTO[];

    @Expose() 
    @Transform((value, post) => {
        return (post && post.likes && post.likes.length > 0) ? true : false
    }) 
    isLiked: boolean;
}