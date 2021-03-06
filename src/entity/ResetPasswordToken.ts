import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from "typeorm";
import { User } from "./User";

export enum TokenStatus {
    NEW = 0,
    USED = 1,
}

@Entity()
export class ResetPasswordToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column({
        default: TokenStatus.NEW
    })
    status: number;

    @ManyToOne(type => User, user => user.resetPasswordTokens)
    user: User;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}