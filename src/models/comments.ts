import { Expose, Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { UserDTO } from "./user";
import { PostDTO } from "./post";

export class CreateCommentRequest {
    @IsNotEmpty({message: 'Content can\'t be empty'})
    @Expose()
    content: string;
}

export class CommentDTO {
    @Expose() id: string;
    @Expose() content: string;
    @Expose() isDeleted: boolean;
    @Expose() createdAt: Date;
    @Expose() updatedAt: Date;
    @Expose() @Type(() => UserDTO) user: UserDTO;
    @Expose() @Type(() => PostDTO) post: PostDTO;
}