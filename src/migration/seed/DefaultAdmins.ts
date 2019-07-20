import { User } from "../../entity/User";

let ebrar = new User();
ebrar.username = "admin";
ebrar.password = "admin";
ebrar.email = "ebrarislami@gmail.com";
ebrar.firstName = "Ebrar";
ebrar.lastName = "Islami";
ebrar.hashPassword();

let bayram = new User();
bayram.username = "bayraak";
bayram.password = "fenerbahce";
bayram.email = "bayraak@gmail.com";
bayram.firstName = "Bayramali";
bayram.lastName = "Başgül";
bayram.hashPassword();

const DefaultAdmins = [ebrar, bayram];

export default DefaultAdmins;
