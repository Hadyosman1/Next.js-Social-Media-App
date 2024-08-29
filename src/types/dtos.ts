export interface ICreateNewArticleDto {
  title: string;
  description: string;
}

export interface IUpdateArticleDto {
  title?: string;
  description?: string;
}

export interface IRegisterUserDto {
  userName: string;
  email: string;
  password: string;
}

export interface ILogInUserDto {
  email: string;
  password: string;
}
