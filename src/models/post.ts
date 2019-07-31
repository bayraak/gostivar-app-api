import { Expose, Type, Transform } from "class-transformer";
import { CategoryDTO } from "./category";
import { UserDTO } from "./user";
import { MinLength, IsNotEmpty } from "class-validator";

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

    @Expose() 
    @Transform((value, post) => {
        return (post && post.likes && post.likes.length > 0) ? true : false
    }) 
    isLiked: boolean;
}