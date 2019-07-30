import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { User } from "./User";
import { Category } from "./Category";
import { PostLikes } from "./PostLike";
import { PostComments } from "./PostComment";
import { PostReport } from "./PostReport";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
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

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    userId: number;

    @ManyToOne(type => User, user => user.posts)
    user: User;

    @ManyToOne(type => Category, category => category.posts)
    category: Category;

    @OneToMany(type => PostLikes, postLike => postLike.post)
    likes!: PostLikes[];

    @OneToMany(type => PostComments, postComment => postComment.post)
    comments!: PostComments[];

    @OneToMany(type => PostReport, postReport => postReport.post)
    reports!: PostReport[];
}