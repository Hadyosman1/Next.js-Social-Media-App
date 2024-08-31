import { TComment } from "@/types";

type TArticle = {
  id: number;
  title: string;
  authorId: number;
  description: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  author: {
    profilePicture: string;
    userName: string;
  };
  comments: (TComment & {
    user: {
      profilePicture: string;
      userName: string;
    };
  })[];
};

export default TArticle;
