import {
    ApolloClient
} from 'apollo-client'
import {
    createHttpLink
} from 'apollo-link-http'
import {
    InMemoryCache
} from 'apollo-cache-inmemory'
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import {
    ApolloLink,
    concat,
    split
} from 'apollo-link';


const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
      headers: {
        authorization: "admin",
      }
    });
    return forward(operation);
  })

const httpLink = createHttpLink({
    uri: 'http://test.drug1market.com/graphql'
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
})

export {
    apolloProvider
}