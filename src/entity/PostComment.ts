import { ManyToOne, Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class PostComments {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    postId: string;

    @Column()
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