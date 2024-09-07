import { TypeJWTPayload } from "@/types";
import jwt from "jsonwebtoken";

const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY as string;

const generateJWT = (jwtPayload: TypeJWTPayload) => {
  return jwt.sign(jwtPayload, PRIVATE_KEY, { expiresIn: "30d" });
};

export default generateJWT;
