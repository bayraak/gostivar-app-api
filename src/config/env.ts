import { config } from "dotenv"

if (process.env.NODE_ENV !== 'production') {
    config();
}
else {
    console.log('.env config() is disabled!');
}