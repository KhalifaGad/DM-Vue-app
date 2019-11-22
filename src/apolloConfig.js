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

const httpLink = createHttpLink({
    uri: 'http://test.drug1market.com/graphql'
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

export { apolloProvider }