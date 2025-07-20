export default interface UpdateUser {
  email?: string;
  passwordHash?: string;
  login?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: string;
  profilePictureId?: string;
}
