import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';
import isBrowser from 'is-browser';
import JsonGlobal from 'safe-json-globals/get';

const state = isBrowser && JsonGlobal('state');
const apolloState = isBrowser && state.apolloState;
const apiGatewayUrl = isBrowser && state.base.apiGatewayUrl;
const csrfToken = isBrowser && state.base.csrfToken;

export const apolloClient = new ApolloClient({
  ssrMode: !isBrowser,
  link: new HttpLink({uri: apiGatewayUrl, fetch, headers: {'x-csrf-token': csrfToken}}),
  cache: new InMemoryCache().restore(apolloState),
});
