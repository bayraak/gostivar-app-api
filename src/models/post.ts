import { Expose, Type } from "class-transformer";
import { CategoryDTO } from "./category";
import { UserDTO } from "./user";

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

export class PostDTO {
    @Expose() id: string;
    @Expose() content: string;
    @Expose() likeCount: number;
    @Expose() commentCount: number;
    @Expose() isDeleted: boolean;
    @Expose() isCommentsEnabled: boolean;
    @Expose() createdAt: Date;
    @Expose() updatedAt: Date;
    @Expose() @Type(() => CategoryDTO) category: CategoryDTO;
    @Expose() @Type(() => UserDTO) user: UserDTO;
}