import { SECRET_TOKEN } from '../config/env.config'
import { CreateQuery } from 'mongoose';
import UserModel, { UserInput } from '../models/User.model';
import jwt from 'jsonwebtoken';

const result = { status: 200, message: "" }

export async function findOneUser(query: string) {
  return UserModel.findOne({ _id: query })
}

export async function create(input: CreateQuery<UserInput>) {
  try {
    await UserModel.create(input)
    result.status = 201;
    result.message = "Account created, Please verify the account by open the verication link from the verification email";
  } catch (error) {
    result.status = 500;
    result.message = `${error}`;
  }
  return result;
}

export async function verification(query: string) {
  await UserModel.findOneAndUpdate({ emailToken: query }, { emailToken: null, isVerified: true }, { new: true })
    .exec()
    .then(verifiedUser => {
      if (!verifiedUser) {
        result.status = 400
        result.message = "Could not verify the account, please contact our support, support@support.com"
      }
      result.message = `Account verifiyed`
    })
    .catch((error: Error) => {
      result.status = 500;
      result.message = `${error.message}`
    })

  return result;
}

export async function login({ email, password }: { email: string; password: string; }) {
  const authUser = await UserModel.findOne({ email });

  if (!authUser!.isVerified) {
    result.status = 401;
    result.message = "Verify your account befor loggin"
    return result
  }

  if (!authUser) {
    result.status = 401;
    result.message = `Authentication Error - Invalid Credentials`
    return result
  }

  const authPassword = authUser?.comparePassword(password)

  if (!authPassword) {
    result.status = 401;
    result.message = `Authentication Error - Invalid Credentials`
    return result
  }

  const authToken = jwt.sign({ id: authUser?._id }, SECRET_TOKEN);
  result.message = `Login Success, token: ${authToken}`

  return result;
}

export async function deleteOneUser(query: string) {
  await UserModel.deleteOne({ _id: query })
    .exec()
    .then(() => {
      result.message = `Account has been deleted`
    })
    .catch((error: Error) => {
      result.status = 500;
      result.message = `${error.message}`
    })
  return result;
}