import { baseApi } from '../../api/baseApi';

const socketApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSupportConversation: builder.mutation({
            query: () => {
                return {
                    url: "/conversation/support",
                    method: 'POST'
                }
            },
            invalidatesTags: ['Conversation'],
        }),
        getConversationMessages: builder.query({
            query: (id) => ({
                url: `/conversation/${id}/messages`,
                method: 'GET',
            }),
        }),
        getMyConversation: builder.query({
            query: () => {
                return {
                    url: '/conversation/all?page=1&limit=20',
                    method: 'GET'
                }
            },
            providesTags: ['Conversation'],
        })
        // conversationAttachedment :  builder.mutation({
        //     query : ()
        // })
    })
})

export const { useCreateSupportConversationMutation, useGetConversationMessagesQuery, useGetMyConversationQuery } = socketApi