import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from "../config/api";

export const transactionAPI = createApi({
    reducerPath: 'transactionAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: (builder) => ({
        getTransactions: builder.query({
            query: ({ year, month }) => ({
                url: 'transactions',
                params: {
                    year: year,
                    month: month
                }
            }),
            providesTags: () => [{ type: 'transactionList' }]
        }),
        getTransactionById: builder.query({
            query: (id) => ({
                url: `transactions/${id}`
            }),
            providesTags: () => [{ type: 'transactionList' }]
        }),
        getTransactionsSummaries: builder.query({
            query: () => ({
                url: 'transactions/summaries'
            }),
            providesTags: ['transactionList']
        }),
        createTransaction: builder.mutation({
            query: (requestBody) => ({
                url: 'transactions',
                method: 'POST',
                body: requestBody
            }),
            invalidatesTags: ['transactionList']
        }),
        updateTransaction: builder.mutation({
            query: (requestBody) => ({
                url: `transactions/${requestBody.id}`,
                method: 'PUT',
                body: requestBody
            }),
            invalidatesTags: ['transactionList']
        }),
        deleteTransaction: builder.mutation({
            query: (id) => ({
                url: `transactions/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['transactionList']
        })
    })
})

export const {
    useGetTransactionsQuery,
    useLazyGetTransactionsQuery,
    useGetTransactionByIdQuery,
    useLazyGetTransactionByIdQuery,
    useGetTransactionsSummariesQuery,
    useCreateTransactionMutation,
    useUpdateTransactionMutation,
    useDeleteTransactionMutation
} = transactionAPI