import { Expose, Type } from "class-transformer";
import { CategoryDTO } from "./category";

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