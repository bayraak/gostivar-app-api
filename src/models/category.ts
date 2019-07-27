import { Expose } from "class-transformer";

export class CategoryDTO {
    @Expose() id: number;
    @Expose() name: string;
}

export class CreateCategoryDTO {
    @Expose() categoryName: string;
    @Expose() role: string;
}