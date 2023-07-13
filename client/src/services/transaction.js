import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from "../config/api";

export const transactionAPI = createApi({
    reducerPath: 'transactionAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: (builder) => ({
        getTransactions: builder.query({
            query: (filter) => ({
                url: `transactions${filter ? filter : ''}`
            })
        }),
        getTransactionById: builder.query({
            query: (id) => ({
                url: `transactions/${id}`
            })
        }),
        getTransactionsSummaries: builder.query({
            query: () => ({
                url: 'transactions/summaries'
            })
        }),
        createTransaction: builder.mutation({
            query: (requestBody) => ({
                url: 'transactions',
                method: 'POST',
                body: requestBody
            })
        }),
        updateTransaction: builder.mutation({
            query: (id, requestBody) => ({
                url: `transactions/${id}`,
                method: 'PUT',
                body: requestBody
            })
        }),
        deleteTransaction: builder.mutation({
            query: (id) => ({
                url: `transactions/${id}`,
                method: 'DELETE',
            })
        })
    })
})

export const {
    useGetTransactionsQuery,
    useGetTransactionByIdQuery,
    useGetTransactionsSummariesQuery,
    useCreateTransactionMutation,
    useUpdateTransactionMutation,
    useDeleteTransactionMutation
} = transactionAPI