import type { User } from "@/types/userType";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const generateToken = (user: User) => {
	return jwt.sign(user, secret, {
		expiresIn: "3h",
	});
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, secret);
};
