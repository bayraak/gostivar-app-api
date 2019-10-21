import { Expose } from "class-transformer";

export class PostImageDTO {
    @Expose() url: string[];
}