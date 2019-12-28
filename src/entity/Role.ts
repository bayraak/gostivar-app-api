import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BaseEntity
} from "typeorm";
import { User } from "./User";
import { RoleToCategory } from "./RoleToCategory";

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => User, user => user.role)
    users: User[];

    @OneToMany(type => RoleToCategory, roleToCategory => roleToCategory.role)
    categories!: RoleToCategory[];
}