import { ManyToOne, Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class PostReport {
    @PrimaryGeneratedColumn() 
    id: number;
    
    @Column()
    reason: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    userId: number;

    @Column()
    postId: string;

    @ManyToOne(type => User, user => user.reports)
    user!: User

    @ManyToOne(type => Post, post => post.reports)
    post!: Post
}