import { baseApi } from "@/redux/api/baseApi";

const assignmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: ({ page = 1, limit = 10, sortOrder = 'desc', status }) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          sortOrder,
        });
        if (status) params.append('status', status);
        return {
          url: `/assignment/all?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Request'],
    }),
  }),
});

export const { useGetAssignmentsQuery } = assignmentApi;