import { User } from "../entity/User";
import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from "typeorm";
import { ProfilePreferences } from "../entity/ProfilePreferences";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

    listenTo() {
        return User;
    }

    async afterInsert(event: InsertEvent<User>) {
        const profile = new ProfilePreferences();
        profile.user = event.entity;

        await event.manager
            .getRepository(ProfilePreferences)
            .save(profile);
    }
}