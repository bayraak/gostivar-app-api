import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from "typeorm";
import { Length } from "class-validator";
import { RoleToCategory } from "./RoleToCategory";
import { Post } from "./Post";


@Entity()
@Unique(["name"])
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(2, 20)
    name: string;

    @OneToMany(type => RoleToCategory, roleToCategory => roleToCategory.category)
    roles!: RoleToCategory[];
    
    @OneToMany(type => Post, post => post.category)
    posts: Post[];
}