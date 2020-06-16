import { Schema, model } from 'mongoose';

const authSchema = Schema({
    email : {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    passwordResetToken: {
        token: {
          type: String
        },
        expiryDate: {
          type: Date
        }
      },
});

export default model('auth', authSchema);