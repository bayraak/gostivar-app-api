import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    Generated
} from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    @Generated('uuid')
    id: string;

    @Column()
    content: string;

    @Column({
        default: 0
    })
    likeCount: number;

    @Column({
        default: 0
    })
    commentCount: number;

    @Column({
        default: false
    })
    isDeleted: boolean;

    @Column({
        default: true
    })
    isCommentsEnabled: boolean;

    @ManyToOne(type => User, user => user.posts)
    user: User;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}