import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import {Exclude} from "class-transformer";
import { ResetPasswordToken } from "./ResetPasswordToken";
import { Role } from "./Role";
import { Post } from "./Post";
import { PostLikes } from "./PostLike";
import { PostComments } from "./PostComment";
import { PostReport } from "./PostReport";

@Entity()
@Unique(["username"])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 20)
    username: string;

    @Column()
    @Length(2, 20)
    firstName: string;

    @Column()
    @Length(2, 20)
    lastName: string;

    @Column()
    @Length(2, 20)
    email: string;

    @Column()
    @Length(4, 100)
    @Exclude()
    password: string;

    @OneToMany(type => ResetPasswordToken, token => token.user)
    resetPasswordTokens: ResetPasswordToken[];

    @OneToMany(type => Post, post => post.user)
    posts: Post[];

    @OneToMany(type => PostLikes, postLike => postLike.user)
    likes: PostLikes[];

    @OneToMany(type => PostComments, postComment => postComment.user)
    comments!: PostComments[];

    @OneToMany(type => PostReport, postReport => postReport.user)
    reports!: PostReport[];

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    
    @ManyToOne(type => Role, role => role.users)
    role: Role;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}