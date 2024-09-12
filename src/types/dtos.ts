// ============ articles ================
export interface ICreateNewArticleDto {
  title: string;
  description: string;
  imageUrl?: string | null;
}

export interface IUpdateArticleDto {
  title?: string;
  description?: string;
  imageUrl?: string | null;
}

// ============ users ================
export interface IRegisterUserDto {
  userName: string;
  email: string;
  password: string;
  profilePicture?: null | string;
}

export interface ILogInUserDto {
  email: string;
  password: string;
}

export interface IUpdateUserDto {
  userName?: string;
  email?: string;
  password?: string;
  profilePicture?: string | null;
  isAdmin?: boolean;
}

// ============ comments ================
export interface ICreateNewCommentDto {
  content: string;
  articleId: number;
}

export interface IUpdateCommentDto {
  content?: string;
}
