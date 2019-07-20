import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    Generated,
    OneToMany,
    PrimaryColumn
} from "typeorm";
import { User } from "./User";
import { Category } from "./Category";
import { PostLikes } from "./PostLike";

@Entity()
export class Post {
    @PrimaryColumn()
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

    @ManyToOne(type => Category, category => category.posts)
    category: Category;

    @OneToMany(type => PostLikes, postLike => postLike.user)
    likes!: PostLikes[];

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}