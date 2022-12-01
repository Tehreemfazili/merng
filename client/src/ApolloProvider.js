import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
// import { setContext } from 'apollo-link-context';

// we can do all this wiht apollo boast but thats giver some problem when comes with authentications, so better to do it yourself


//connection to the graphql url
const httpLink = createHttpLink({
  uri: 'http://localhost:3003/'
});


// const authLink = setContext(() => {
//   const token = localStorage.getItem('jwtToken');
//   return {
//     headers: {
//       Authorization: token ? `Bearer ${token}` : ''
//     }
//   };
// });

const client = new ApolloClient({
//   link: authLink.concat(httpLink),
  link: httpLink,
  cache: new InMemoryCache() //to store cached data
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);