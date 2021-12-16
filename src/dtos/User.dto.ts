export default class UserDto {
    id: number;
    username: string;
    email: string;
    phone: string;
    role: string;

    constructor({ id, email, phone, username, role, refreshToken }) {
        this.id = id
        this.username = username
        this.email = email
        this.phone = phone
        this.role = role
    }

    get dto() {
        return {
            id: this.id,
            email: this.email,
            phone: this.phone,
            username: this.username,
            role: this.role
        }
    }
}