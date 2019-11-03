import React from 'react';
import { gql, useMutation } from '@apollo/client';

const TOGGLE_TODO = gql`
    mutation ToggleTodo($id: Int!) {
        toggleTodo(id: $id) @client
    }
`;

interface Props {
    id: string;
    completed: boolean;
    text: string;
}

const Todo: React.FC<Props> = ({ text, completed, id }) => {
    const [toggleTodo] = useMutation(TOGGLE_TODO, { variables: { id } });

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid yellow',
                marginBottom: 15,
                padding: 15
            }}
        >
            <h2>{text}xx</h2>
            {completed && <p>completed</p>}
            {!completed && <p style={{ color: 'red' }}>NOT completed</p>}
            <button style={{ height: 45 }} onClick={toggleTodo as any}>
                Toggle Completed
            </button>
        </div>
    );
};

export default Todo;
