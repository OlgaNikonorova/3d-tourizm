export default interface File {
  id: string;
  name: string;
  type: string;
  extension: string;
  uploadedAt?: Date;
  data: string;
}