import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import File from "../model/file";
import UploadFile from "../model/uploadFile";
import { createBaseQueryWithReauth } from "../../../shared/api/baseQuery";

export const filesApi = createApi({
  reducerPath: "filesApi",
  baseQuery: createBaseQueryWithReauth("http://localhost:5129"),
  endpoints: (builder) => ({
    uploadFile: builder.mutation<File, UploadFile>({
      query: (data) => {
        return {
          url: `/api/file/${data.id}`,
          method: "POST",
          params: {
            id: data.id,
            name: data.name,
            type: data.type,
            extension: data.extension,
          },
          body: data.formData,
        };
      },
    }),
    getFileById: builder.query<File, string>({
      query: (id) => {
        return {
          url: `/api/file/${id}`,
          method: "GET",
        };
      },
    }),
    deleteFile: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/file/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useUploadFileMutation,
  useGetFileByIdQuery,
  useDeleteFileMutation,
} = filesApi;
