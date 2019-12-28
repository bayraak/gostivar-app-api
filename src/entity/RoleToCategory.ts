import { PrimaryGeneratedColumn, ManyToOne, Entity, JoinColumn, PrimaryColumn, BaseEntity } from "typeorm";
import { Role } from "./Role";
import { Category } from "./Category";

@Entity()
export class RoleToCategory extends BaseEntity {
    @PrimaryColumn() 
    roleId: number;

    @PrimaryColumn() 
    categoryId: number;

    @ManyToOne(type => Role, role => role.categories)
    role!: Role

    @ManyToOne(type => Category, category => category.roles)
    category!: Category
}