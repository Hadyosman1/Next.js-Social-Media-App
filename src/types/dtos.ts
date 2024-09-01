// ============ articles ================
export interface ICreateNewArticleDto {
  title: string;
  description: string;
  imageUrl?: string | null;
}

export interface IUpdateArticleDto {
  title?: string;
  description?: string;
}

// ============ users ================
export interface IRegisterUserDto {
  userName: string;
  email: string;
  password: string;
  profilePicture?: string | null;
}

export interface ILogInUserDto {
  email: string;
  password: string;
}

export interface IUpdateUserDto {
  userName?: string;
  email?: string;
  password?: string;
}

// ============ comments ================
export interface ICreateNewCommentDto {
  content: string;
  articleId: number;
}

export interface IUpdateCommentDto {
  content?: string;
}
