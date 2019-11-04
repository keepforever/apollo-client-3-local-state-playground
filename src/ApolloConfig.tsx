import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import './App.css';
import uuid from 'uuid';

const cache = new InMemoryCache();

cache.writeData({
    data: {
        balls: [
            {
                id: uuid.v4(),
                sport: 'football',
                shape: 'ellipsoid',
                __typename: 'BallItem'
            },
            {
                id: uuid.v4(),
                sport: 'basketball',
                shape: 'round',
                __typename: 'BallItem'
            },
            {
                id: uuid.v4(),
                sport: 'golf',
                shape: 'small-round',
                __typename: 'BallItem'
            }
        ],
        todos: [
            {
                id: uuid.v4(),
                text: 'First',
                completed: false,
                __typename: 'TodoItem'
            },
            {
                id: uuid.v4(),
                text: 'Second',
                completed: false,
                __typename: 'TodoItem'
            },
            {
                id: uuid.v4(),
                text: 'Third',
                completed: false,
                __typename: 'TodoItem'
            }
        ],
        visibilityFilter: 'SHOW_ALL',
        networkStatus: {
            __typename: 'NetworkStatus',
            isConnected: true
        },
        isLoggedIn: 'is-logged-in-value'
    }
});

const CACHE_QUERY = gql`
    {
        isLoggedIn @client
    }
`;

const client = new ApolloClient({
    cache,
    resolvers: {
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
                console.log('\n', '\n', `todo = `, todo, '\n', '\n');
                const data = { ...todo, completed: !todo.completed };
                console.log('\n', '\n', `data = `, data, '\n', '\n');
                cache.writeData({ id, data });
                return null;
            }
        },
        Query: {
            kangaroo: (obj, args, context) => {
                console.group('Balls Resolver');
                console.log('\n', '\n', `obj = `, obj, '\n', '\n');
                console.log('\n', '\n', `args = `, args, '\n', '\n');
                console.log('\n', '\n', `context = `, context, '\n', '\n');
                console.log(
                    '\n',
                    `context.cache.readQuery(CACHE_QUERY) = `,
                    context.cache.readQuery({ query: CACHE_QUERY }),
                    '\n'
                );

                console.groupEnd();
                return 42;
            }
        }
    }
});

export default client;
