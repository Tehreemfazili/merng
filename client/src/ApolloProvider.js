import React from 'react';
import App from './App';
// import ApolloClient from 'apollo-client'; // this gave error so removed with @apolloclient
// import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http'; //need to bind it with apollo client
// import { ApolloProvider } from '@apollo/react-hooks'; // this gave error so removed with @apolloclient
import { setContext } from 'apollo-link-context';
//installed apollo-link-context libarry to to store the token for the future use till its expired

// we can do all this wiht apollo boast but thats giver some problem when comes with authentications, so better to do it yourself


// connection to the graphql url
const httpLink = createHttpLink({
  uri: 'http://localhost:3003/'
});


//to save the authorization token
const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
//   link: httpLink,
  cache: new InMemoryCache() //to store cached data
});

console.log(client)

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);