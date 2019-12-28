import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    BaseEntity
} from "typeorm";
import { Length } from "class-validator";
import { User } from "./User";
import { ProfileDisplayAs, AvailableLanguages } from "../models/profile";

@Entity()
export class ProfilePreferences extends BaseEntity {

    constructor() {
        super();
        
        this.preferedLanguage = AvailableLanguages.ENGLISH;
        this.profileDisplayAs = ProfileDisplayAs.NAME_SURNAME;
        this.profilePictureUrl = "";
        this.enabledCategoryNotifications = [];
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 20)
    preferedLanguage: AvailableLanguages;

    @Column("simple-json", { nullable: true })
    enabledCategoryNotifications: { id: number, name: string }[];

    @Column()
    @Length(2, 256)
    profilePictureUrl: string;

    @Column()
    @Length(2, 64)
    profileDisplayAs: ProfileDisplayAs;

    @OneToOne(type => User, user => user.profilePreferences)
    user!: User;
}