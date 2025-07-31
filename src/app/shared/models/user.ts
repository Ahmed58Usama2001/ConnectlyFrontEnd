export interface User {
  id: string;
  email: string;
  userName: string;
  token: string;
  pictureUrl?: string;
  gender?: string;
  dateOfBirth?: string; // You may parse it to a Date object in UI later
  created: string;
  lastActive: string;
  description?: string;
  city?: string;
  country?: string;
}



export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  userName: string;
  password: string;
}


