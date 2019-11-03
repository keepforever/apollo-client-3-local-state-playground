import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import Todo from './Todo';

const GET_TODOS = gql`
    query MyGetTodos {
        todos @client {
            id
            completed
            text
        }
    }
`;

interface Props {}

interface Todo {
    id: string;
    completed: boolean;
    text: string;
}

const LocalTodos: React.FC<Props> = () => {
    const { data } = useQuery(GET_TODOS);

    console.log('\n', '\n', `LocalTodos, data = `, data, '\n', '\n');

    return (
        <div style={{ maxWidth: 450 }}>
            <h3 style={{ margin: 0, paddingTop: 30 }}>Hello LocalTodos</h3>
            {data &&
                data.todos.map((t: Todo) => {
                    return <Todo key={t.id} {...t} />;
                })}
        </div>
    );
};

export default LocalTodos;
