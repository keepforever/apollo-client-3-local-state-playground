import * as React from 'react';
import { useApolloClient } from '@apollo/client';

interface Props {
    foo: string;
}

/* An example of using the client to write to the cache directly */
const UseClientWriteCache: React.FC<Props> = ({ foo }) => {
    const client = useApolloClient();
    return (
        <div>
            Hello Typescript {foo}
            <button
                onClick={() =>
                    client.writeData({ data: { visibilityFilter: 'filter' } })
                }
            >
                Direct Write
            </button>
        </div>
    );
};

export default UseClientWriteCache;
