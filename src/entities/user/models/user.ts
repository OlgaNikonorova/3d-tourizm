export default interface User {
  id: string;
  email?: string;
  login: string;
  passwordHash?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profilePictureId?: string;
  role: string;
}
