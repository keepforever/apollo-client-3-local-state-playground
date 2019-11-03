import * as React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_VISIBILITY_FILTER = gql`
    {
        visibilityFilter @client
    }
`;

const NETWORK_STATUS_QUERY = gql`
    {
        networkStatus {
            isConnected
        }
    }
`

interface Props {}

const ReadFromClient: React.FC<Props> = () => {
    const { data, client } = useQuery(GET_VISIBILITY_FILTER);
    const { data: gimmieData } = useQuery(NETWORK_STATUS_QUERY);
    const { data: isLoggedInData } = useQuery(gql`
        {
            isLoggedIn @client
        }
    `)

    console.log('\n', '\n', `isLoggedInData = `, isLoggedInData, '\n', '\n');

    return (
        <div>
            <h3>Hello ReadFromClient</h3>
            {data && <p>{data.visibilityFilter}</p>}
            {!data && <p>there is no data</p>}
            {gimmieData.networkStatus && <p>networkStatus</p>}
        </div>
    );
};

export default ReadFromClient;
