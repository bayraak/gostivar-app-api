import { ManyToOne, Entity, PrimaryColumn, Column, CreateDateColumn, BaseEntity } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class PostLikes extends BaseEntity {
    @PrimaryColumn() 
    postId: string;

    @PrimaryColumn() 
    userId: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(type => User, user => user.likes)
    user!: User

    @ManyToOne(type => Post, post => post.likes)
    post!: Post
}