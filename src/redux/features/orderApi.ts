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
            query: ({ page = 1, limit = 20, status }) => {
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
        acceptQuote: builder.mutation({
            query: (id) => {
                return {
                    url: `/order/accept/${id}`,
                    method: 'POST',
                };
            },
            invalidatesTags: ['Request'],
        }),
        cancelQuote: builder.mutation({
            query: (id) => ({
                url: `/order/cancel/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['Request'],
        }),
        createMetalOrder: builder.mutation({
            query: (data) => ({
                url: '/order/metal',
                method: 'POST',
                body: data,
                formData: true,
            }),
            invalidatesTags: ['Request'],
        }),
        getOrderHistory: builder.query({
            query: ({ id }) => {
                return {
                    url: `/order-history/${id}`,
                    method: 'GET'
                }
            }
        })
    }),
});

export const { 
    useCreateVehicleOrderMutation, 
    useGetVehicleOrdersQuery, 
    useAcceptQuoteMutation, 
    useCancelQuoteMutation, 
    useCreateMetalOrderMutation, 
    useGetOrderHistoryQuery 
} = orderApi;