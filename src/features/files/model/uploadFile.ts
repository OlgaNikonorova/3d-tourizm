export default interface UploadFile {
  id: string;
  name?: string;
  type?: string;
  extension?: string;
  formData: FormData;
}
