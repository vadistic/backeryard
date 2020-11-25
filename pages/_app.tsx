import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import React from 'react'

import { useApollo } from '../lib/apollo'

export const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
