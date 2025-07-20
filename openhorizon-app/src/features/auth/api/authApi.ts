import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthResponse } from "../model/authResponse";
import RegisterCredentials from "../model/registerCredentials";
import LoginCredentials from "../model/loginCredentials";
import { createBaseQueryWithReauth } from "../../../shared/api/baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: createBaseQueryWithReauth("http://localhost:5129"),
  endpoints: (builder) => ({

    loginUser: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
    }),

    forgotPassword: builder.mutation<
      { resetToken: string },
      { email: string; login: string }
    >({
      query: (data) => ({
        url: "api/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation<
      void,
      { resetToken: string; password: string }
    >({
      query: (data) => ({
        url: "api/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
