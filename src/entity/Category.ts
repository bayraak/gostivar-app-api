import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Length } from "class-validator";
import { RoleToCategory } from "./RoleToCategory";
import { Post } from "./Post";


@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(2, 20)
    name: string;

    @OneToMany(type => RoleToCategory, roleToCategory => roleToCategory.category)
    roleToCategories!: RoleToCategory[];
    
    @OneToMany(type => Post, post => post.category)
    posts: Post[];
}