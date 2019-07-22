import { Expose, Type } from "class-transformer";
import { UserDTO } from "./user";

export class LikeDTO {
    @Expose() postId: string;
    @Expose() userId: number;
    @Expose() createdAt: Date;
    @Expose() @Type(() => UserDTO) user: UserDTO;
}