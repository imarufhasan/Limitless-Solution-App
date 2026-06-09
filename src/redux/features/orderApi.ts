import { baseApi } from "../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createVehicleOrder: builder.mutation({
      query: (data) => ({
        url: '/order/vehicle',
        method: 'POST',
        body: data,
        formData: true,
      }),
      invalidatesTags: ['Request'],
    }),
    getVehicleOrders: builder.query({
      query: ({ page = 1, limit = 20 , status }) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          status: String(status),
        });
        return {
          url: `/order/customer/all?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Request'],
    }),
  }),
});

export const { useCreateVehicleOrderMutation, useGetVehicleOrdersQuery } = orderApi;