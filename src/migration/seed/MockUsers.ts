import { User } from "../../entity/User";

let buba = new User();
buba.username = "buba";
buba.password = "gostivarapp";
buba.email = "buba@example.com";
buba.firstName = "Berat";
buba.lastName = "Kukuli";
buba.hashPassword();

let zamzi = new User();
zamzi.username = "zamzi";
zamzi.password = "gostivarapp";
zamzi.email = "hamza@example.com";
zamzi.firstName = "Hamza";
zamzi.lastName = "Veysel";
zamzi.hashPassword();

let riko = new User();
riko.username = "riko";
riko.password = "gostivarapp";
riko.email = "rihad@example.com";
riko.firstName = "Rihad";
riko.lastName = "Rizvance";
riko.hashPassword();

let sakir = new User();
sakir.username = "sako";
sakir.password = "gostivarapp";
sakir.email = "sakir@example.com";
sakir.firstName = "Sakir";
sakir.lastName = "Matyan";
sakir.hashPassword();

let mendel = new User();
mendel.username = "mendel";
mendel.password = "gostivarapp";
mendel.email = "mendel@example.com";
mendel.firstName = "Murat";
mendel.lastName = "Mendel";
mendel.hashPassword();

let canberk = new User();
canberk.username = "canbo";
canberk.password = "gostivarapp";
canberk.email = "canberk@example.com";
canberk.firstName = "Canberk";
canberk.lastName = "Ahmetoglu";
canberk.hashPassword();

let alican = new User();
alican.username = "alican";
alican.password = "gostivarapp";
alican.email = "alican@example.com";
alican.firstName = "Alican";
alican.lastName = "Ali";
alican.hashPassword();

let haluk = new User();
haluk.username = "haluk";
haluk.password = "gostivarapp";
haluk.email = "haluk@example.com";
haluk.firstName = "Haluk";
haluk.lastName = "Cafer";
haluk.hashPassword();

let fati = new User();
fati.username = "fati";
fati.password = "gostivarapp";
fati.email = "fatih@example.com";
fati.firstName = "Fatih";
fati.lastName = "Sagir";
fati.hashPassword();

let bedran = new User();
bedran.username = "bedril";
bedran.password = "gostivarapp";
bedran.email = "bedran@example.com";
bedran.firstName = "Bedran";
bedran.lastName = "Sakir";
bedran.hashPassword();

const MockUsers = [buba, zamzi, sakir, mendel, canberk, alican, haluk, bedran, fati]

export default MockUsers;