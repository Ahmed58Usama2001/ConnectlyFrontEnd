export interface User {
  id: string;
  email: string;
  userName: string;
  token: string;
  imageUrl?: string;
}



export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  userName: string;
  password: string;
  confirmPassword?: string;
}


