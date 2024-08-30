import type TArticle from "./article.type";

type TypeJWTPayload = {
  id: number;
  email: string;
  isAdmin: boolean;
};

export { TArticle, type TypeJWTPayload };
