import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CreateReview from "../models/createReview";
import Review from "../models/review";
import { createBaseQueryWithReauth } from "../../../shared/api/baseQuery";

export const reviewApi = createApi({
    reducerPath: "reviewApi",
    baseQuery: createBaseQueryWithReauth("http://localhost:5129"),
    endpoints: (builder) => ({

        getReviews: builder.query<Review[], void>({
            query: () => ({
                url: "api/review/reviews",
                method: "GET",
            }),
        }),

        createReview: builder.mutation<Review, CreateReview>({
            query: (body) => ({
                url: `api/review/${body.id}`,
                method: "POST",
                body,
            }),
        }),

        deleteReview: builder.mutation<void, string>({
            query: (id) => ({
                url: `api/review/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetReviewsQuery,
    useCreateReviewMutation,
    useDeleteReviewMutation,
} = reviewApi;
