import { PrimaryGeneratedColumn, ManyToOne, Entity } from "typeorm";
import { Role } from "./Role";
import { Category } from "./Category";

@Entity()
export class RoleToCategory {
    @PrimaryGeneratedColumn()
    roleToCategoryId!: number;

    roleId: number;
    categoryId: number;

    @ManyToOne(type => Role, role => role.roleToCategories)
    role!: Role

    @ManyToOne(type => Category, category => category.roleToCategories)
    category!: Category
}