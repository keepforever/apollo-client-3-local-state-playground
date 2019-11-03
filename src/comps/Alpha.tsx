import * as React from 'react';
import { gql, useQuery } from '@apollo/client';

// const NETWORK_STATUS_QUERY = gql`
//     {
//         networkStatus @client {
//             isConnected
//         }
//     }
// `

interface Props {}

const Alpha: React.FC<Props> = () => {
    // const { data } = useQuery(NETWORK_STATUS_QUERY);
    // console.log('\n', '\n', `data = `, data, '\n', '\n');

    return (
        <div>
            <h3 style={{ margin: 0, paddingTop: 30 }}>Hello Alpha</h3>
        </div>
    );
};

export default Alpha;
