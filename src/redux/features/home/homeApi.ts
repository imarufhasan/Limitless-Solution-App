import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllbanner: builder.query({
      query: () => {
        return {
          url: "/banner/all?page=1&limit=10",
          method: "GET",
        };
      },
    }),
    getTaskInfo: builder.query({
      query: () => {
        return {
          url: "/assignment/ongoing",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllbannerQuery, useGetTaskInfoQuery } = authApi;
