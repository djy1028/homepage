import React,{ReactNode} from 'react'
import { AuthProvider } from './auth-context';
import {QueryClient, QueryClientProvider} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
export const AppProviders = ({children}:{children:ReactNode})=>{
     
    const queryclient = new QueryClient({
        defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
              retry:false
            }
        }
    })
    return (
        <QueryClientProvider  client={queryclient}>
            <AuthProvider>{children}</AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider >
    )
   
}