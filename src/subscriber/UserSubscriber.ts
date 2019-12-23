import { User } from "../entity/User";
import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from "typeorm";
import { ProfileSettings } from "../entity/ProfileSettings";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

    listenTo() {
        return User;
    }

    async afterInsert(event: InsertEvent<User>) {
        const profile = new ProfileSettings();
        profile.user = event.entity;

        await event.manager
            .getRepository(ProfileSettings)
            .save(profile);
    }
}