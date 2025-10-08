export interface User {
  _id: string;
  username: string;
  [key: string]: any;
}

export interface RegisterParams {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
