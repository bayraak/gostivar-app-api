import { config } from "dotenv"

if (process.env.NODE_ENV !== 'production') {
    console.log('.env config() is disabled!');
    config();
}