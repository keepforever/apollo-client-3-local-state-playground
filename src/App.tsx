import React from 'react';
import { ApolloProvider } from '@apollo/client';
import './App.css';
// import Whatever from './comps/Whatever';
// import ReadFromClient from './comps/ReadFromClient';
// import Alpha from './comps/Alpha';
import ExploreState from './comps/ExploreState'
import LocalTodos from './comps/LocalTodos';
import CallLocalQueryResolver from './comps/CallLocalQueryResolver';

import client from './ApolloConfig';

const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <ExploreState />
                <CallLocalQueryResolver />
                <LocalTodos />
            </div>
        </ApolloProvider>
    );
};

export default App;
