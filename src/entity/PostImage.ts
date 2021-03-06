import { ManyToOne, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { Post } from "./Post";

@Entity()
export class PostImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    url: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    postId: string;

    @ManyToOne(type => Post, post => post.images)
    post!: Post
}