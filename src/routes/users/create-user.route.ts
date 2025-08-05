import { Request, Response } from "express";
import type { NewUser } from "../../db/schema";
import { BadRequestError } from "../../middleware/custom-errors.js";
import { createUser, ReturnUser } from "../../db/queries/user.js";
import { hashPassword } from "../../auth/auth.js";

type ApiUserCreate = {
  email: string;
  password: string;
};

export async function handlerCreateUser(req: Request, res: Response) {
  const userData: ApiUserCreate = req.body;

  if (!userData.email || !userData.password) {
    throw new BadRequestError("All fields are required");
  }

  const hashedPassword = await hashPassword(userData.password);

  const newUser: ReturnUser = await createUser({
    email: userData.email,
    hashedPassword: hashedPassword,
  });
  if (!newUser) {
    throw new Error("Unable to create User");
  }
  res.status(201).json(newUser);
}
