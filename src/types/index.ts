import type TArticle from "./article.type";
import TComment from "./comment.type";

type TypeJWTPayload = {
  id: number;
  userName: string;
  email: string;
  isAdmin: boolean;
  profilePicture: string | null;
};

export { TArticle, type TypeJWTPayload, type TComment };
