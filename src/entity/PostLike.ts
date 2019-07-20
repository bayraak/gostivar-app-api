import { ManyToOne, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class PostLikes {
    @PrimaryGeneratedColumn()
    id: number;

    postId: string;
    userId: number;

    @ManyToOne(type => User, user => user.likes)
    user!: User

    @ManyToOne(type => Post, post => post.likes)
    post!: Post
}