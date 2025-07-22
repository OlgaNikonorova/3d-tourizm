import User from "../../../entities/user/models/user";

export interface AuthResponse {
  token: string;
  userId: string;
  role: string;
}
