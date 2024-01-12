import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

// UserType

export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

// Schema mongoose

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
});

// Crypt password, привращение пароля в хэш

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password,8)
}
next();
});

const User = mongoose.model<UserType>('User', userSchema)

export default User