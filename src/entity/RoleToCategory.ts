import { PrimaryGeneratedColumn, ManyToOne, Entity, JoinColumn, PrimaryColumn } from "typeorm";
import { Role } from "./Role";
import { Category } from "./Category";

@Entity()
export class RoleToCategory {
    @PrimaryColumn() 
    roleId: number;

    @PrimaryColumn() 
    categoryId: number;

    @ManyToOne(type => Role, role => role.roleToCategories)
    @JoinColumn({ name: "roleId" })
    role!: Role

    @ManyToOne(type => Category, category => category.roleToCategories)
    @JoinColumn({ name: "categoryId" })
    category!: Category
}