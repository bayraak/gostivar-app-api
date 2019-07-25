import { Expose, Type, Transform } from "class-transformer";
import { UserDTO } from "./user";
import { PostDTO } from "./post";

export class CreateReportRequest {
    @Expose() reason: string;
    @Expose() postId: string;
}

export class ReportDTO {
    @Expose() id: string;
    @Expose() reason: string;
    @Expose() createdAt: Date;
    @Expose() @Type(() => PostDTO) post: PostDTO;
    @Expose() @Type(() => UserDTO) user: UserDTO;
}

export class ReportFilterModel {
    @Expose() from: string;
    @Expose() to: string;
    @Expose() postId: string;
    @Expose() userId: number;

    @Transform(value => +value || 0, { toClassOnly: true })
    @Expose() skip: number;

    @Transform(value => +value || 20, { toClassOnly: true })
    @Expose() take: number;
}