import { baseApi } from "../api/baseApi";

const metalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMetals: builder.query({
      query: ({ page = 1, limit = 20, searchTerm = '' }) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });

        if (searchTerm) {
          params.append('searchTerm', searchTerm);
        }

        return {
          url: `/metal/all?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Metal'],
    }),
  }),
});

export const { useGetMetalsQuery } = metalApi;