import Mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import isEmail from 'validator/lib/isEmail';
import isAlpha from 'validator/lib/isAlpha';

export interface UserInput extends Document {
  username: string;
  email?: string;
  password?: string;
  emailToken?: string | null;
  isVerified?: boolean;
  missions?: Array<string>
}

export interface UserDocument extends UserInput, Mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    validate: [isAlpha, "Username can only contain letters"],
    minlength: [3, "Username must be a minumin length of 3 characters"],
    lowercase: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [isEmail, "Please enter a valid email"],
    lowercase: true,
  },
  emailToken: {
    type: String
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be a minimun length of 10 characters"]
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  missions: []
}, {
  timestamps: true
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(this.password, salt)

  this.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password).catch(error => false);
}

const UserModel = Mongoose.model<UserDocument>("User", UserSchema);
export default UserModel;