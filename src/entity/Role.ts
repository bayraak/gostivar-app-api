import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from "typeorm";
import { User } from "./User";
import { RoleToCategory } from "./RoleToCategory";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => User, user => user.role)
    users: User[];

    @OneToMany(type => RoleToCategory, roleToCategory => roleToCategory.role)
    roleToCategories!: RoleToCategory[];
}