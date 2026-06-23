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
      providesTags: ['assignment'],
    }),
    getAssignmentDetails : builder.query({
      query : ({id}) =>{
        return{
          url : `/assignment/${id}`,
          method : "GET",
        }
      }
    }),
    acceptAssignment : builder.mutation({
      query  : ({id})=>{
        return{
          url : `/assignment/accept/${id}`,
          method : "POST"
        }
      },
      invalidatesTags :["assignment"]
    }),
    canelAssignment : builder.mutation({
      query : ({id , data}) =>{
        return {
          url : `/assignment/cancel/${id}`,
          method : 'POST',
          body : data
        }
      },
      invalidatesTags : ['assignment']
    }),
    onTheWayStatus :  builder.mutation({
      query : ({id})=>{
        return{
          url : `/order/on-the-way/${id}`,
          method : "POST"
        }
      }
    }),
    receivedOrderStauts :  builder.mutation({
      query : ({id})=>{
        return{
          url : `/order/received/${id}`,
          method : "POST"
        }
      }
    }),
    completeOrderStatus :  builder.mutation({
      query : ({id})=>{
        return{
          url : `/order/complete/pickup/${id}`,
          method : "POST"
        }
      }
    })
  }),
});

export const { useGetAssignmentsQuery , useGetAssignmentDetailsQuery , useAcceptAssignmentMutation,
  useReceivedOrderStautsMutation, useCompleteOrderStatusMutation, useOnTheWayStatusMutation , useCanelAssignmentMutation
} = assignmentApi;