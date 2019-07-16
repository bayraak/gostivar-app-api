import { Expose } from "class-transformer";

export class CreatePostDTO {
    @Expose() id: string;
    @Expose() content: string;
    @Expose() likeCount: number;
    @Expose() commentCount: number;
    @Expose() isDeleted: boolean;
    @Expose() isCommentsEnabled: boolean;
    @Expose() createdAt: Date;
    @Expose() updatedAt: Date;
}