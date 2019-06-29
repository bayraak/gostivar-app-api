export default class PasswordGenerator {
    
    static generate = () => {
        const password = Math.random().toString(36).slice(-8);
        return password;
    }

}