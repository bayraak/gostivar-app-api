import { MigrationInterface, QueryRunner, getRepository, getConnection, InsertResult } from "typeorm";
import { ProfilePreferences } from "../entity/ProfilePreferences";
import { User } from "../entity/User";
import { ProfileDisplayAs, AvailableLanguages } from "../models/profile";
import { Category } from "../entity/Category";

export class AddInitialProfileSettingsToExistingUsers1576943500067 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const profilePreferencesRepository = getRepository(ProfilePreferences);
        const categoryRepository = getRepository(Category);
        const userRepository = getRepository(User);

        // get all categories (notification types) from db
        const allCategories: Category[] = await categoryRepository.find();
        // get all users from db 
        let allUsers: User[] = await userRepository.find();

        // create an array of objects with category id's and category names
        const asNotifications: { id: number, name: string }[] = allCategories.map(cat => {
            const notification = {
                id: cat.id,
                name: cat.name
            }
            return notification;
        });

        // create an object as default profile settings for all users
        const profilePreferences = {
            preferedLanguage: AvailableLanguages.ENGLISH,
            enabledCategoryNotifications: asNotifications,
            profilePictureUrl: 'https://example.com/any-link-to-default-profile-pic.jpg',
            profileDisplayAs: ProfileDisplayAs.NAME_SURNAME
        }

        // create an array with length as many as users. Fill that array with the same profilePreferences object
        const profilePreferencesArray = Array(allCategories.length).fill(profilePreferences);

        // save the profileSettingsArray to database in ProfilePreferences table and get the created id's
        const insertResult: InsertResult = await profilePreferencesRepository.insert(profilePreferencesArray);

        // Assing all the created Id's to the allUser entities.
        for (let i = 0; i < allUsers.length; i++) {
            allUsers[i].profilePreferences = insertResult.identifiers[i]['id'];
        }

        // Save all the user entities again to database.
        // Becuse users existing in the db save method just
        // updates the existing users with the new profileSettingsId values
        // Example craeted SQL query for one user: 
        // UPDATE "user" SET "profileSettingsId" = $2, "updatedAt" = CURRENT_TIMESTAMP WHERE "id" IN ($1) RETURNING "updatedAt" -- PARAMETERS: [1,53]
        await userRepository.save(allUsers);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        // First set all the profileSettingsIds to null
        await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({ profilePreferences: null })
            .execute();

        // Then delete all ProfileSetttings data
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(ProfilePreferences)
            .execute();
        
        // The order of execution must be as it is now.
        // If you try to first delete the ProfilePreferences entities
        // you'll get an error that it has a reference in User table
    }

}
