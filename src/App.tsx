import React from 'react';
import {
    gql,
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from '@apollo/client';
import './App.css';
import Whatever from './comps/Whatever';
import ReadFromClient from './comps/ReadFromClient';

const cache = new InMemoryCache();

cache.writeData({
    data: {
        todos: [],
        visibilityFilter: 'SHOW_ALL',
        networkStatus: {
            __typename: 'NetworkStatus',
            isConnected: true
        },
        isLoggedIn: 'foo-bar'
    }
});

const typeDefs = gql`
    extend type Query {
        isLoggedIn: String!
    }

    extend type Mutation {
        returnMyBoolean(myBoolean: Boolean!): Boolean
    }
`;

const client = new ApolloClient({
    cache,
    typeDefs,
    resolvers: {
        // Query: {
        //     gimmieSome: (_, { someVar }) => {
        //         console.log('\n', '\n', `someVar = `, someVar, '\n', '\n');
        //         const results = cache.readQuery({
        //             query: gql`
        //                 networkStatus @client {
        //                     isConnected
        //                 }
        //             `
        //         });
        //         console.log('\n', '\n', `results = `, results, '\n', '\n');
        //         return results;
        //     }
        // },
        Mutation: {
            toggleTodo: (_root, variables, { cache, getCacheKey }) => {
                const id = getCacheKey({
                    __typename: 'TodoItem',
                    id: variables.id
                });
                const fragment = gql`
                    fragment completeTodo on TodoItem {
                        completed
                    }
                `;
                const todo = cache.readFragment({ fragment, id });
                const data = { ...todo, completed: !todo.completed };
                cache.writeData({ id, data });
                return null;
            }
        }
    }
});

const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <Whatever foo="bar" />
                <ReadFromClient />
            </div>
        </ApolloProvider>
    );
};

export default App;
