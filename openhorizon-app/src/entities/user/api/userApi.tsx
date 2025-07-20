import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import User from "../models/user";
import UpdateUser from "../models/updateUser";
import UpdateUserAvatar from "../models/updateUserAvatar";
import { createBaseQueryWithReauth } from "../../../shared/api/baseQuery";
import RegisterCredentials from "../../../features/auth/model/registerCredentials";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: createBaseQueryWithReauth("http://localhost:5129"),
  endpoints: (builder) => ({

    getUserById: builder.query<User, string>({
      query: (id) => ({
        url: `/api/user/${id}`,
        method: "GET",
      }),
    }),

    createUserById: builder.mutation<User, RegisterCredentials>({
      query: (data) => ({
        url: `/api/user/${data.id}`,
        method: "POST",
        body: data,
      }),
    }),

    updateUserById: builder.mutation<
      User,
      { id: string; updateUser: UpdateUser }
    >({
      query: ({ id, updateUser }) => ({
        url: `/api/user/${id}`,
        method: "PUT",
        body: updateUser,
      }),
    }),

    deleteUserById: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/user/${id}`,
        method: "DELETE",
      }),
    }),

    updateUserAvatarById: builder.mutation<
      User,
      { id: string; updateUserAvatar: UpdateUserAvatar }
    >({
      query: ({ id, updateUserAvatar }) => ({
        url: `/api/user/${id}/avatar`,
        method: "PUT",
        body: updateUserAvatar,
      }),
    }),
  }),
});

export const {
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
  useCreateUserByIdMutation,
  useGetUserByIdQuery,
} = userApi;
