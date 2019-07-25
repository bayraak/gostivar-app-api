import { ManyToOne, Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class PostComments {
    @PrimaryColumn() 
    postId: string;

    @PrimaryColumn() 
    userId: number;
    
    @Column()
    content: string;

    @Column({ default: false })
    isDeleted: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => User, user => user.comments)
    user!: User

    @ManyToOne(type => Post, post => post.comments)
    post!: Post
}