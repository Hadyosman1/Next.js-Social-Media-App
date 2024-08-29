import jwt from "jsonwebtoken";

const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY as string;

type TParams = {
  id: number;
  email: string;
  isAdmin: boolean;
};

const generateJWT = (jwtPayload: TParams) =>
  jwt.sign(jwtPayload, PRIVATE_KEY, { expiresIn: "30d" });

export default generateJWT;
