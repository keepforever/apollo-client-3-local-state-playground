import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

interface Props {}

const GET_BALLS = gql`
    query MyBallsResolver {
        balls @client {
            id
            sport
            shape
        }
    }
`;

const GET_KANGAROO = gql`
    query MyBallsResolver {
        kangaroo @client
    }
`;

const CallLocalQueryResolver: React.FC<Props> = () => {
    const {
        data, client
    } = useQuery(GET_BALLS);

    console.log('\n', '\n', `client = `, client, '\n', '\n');
    console.log('\n', '\n', `balls, data = `, data, '\n', '\n');

    const { data:kangarooData} = useQuery(GET_KANGAROO);

    console.log('\n', '\n', `kangarooData = `, kangarooData, '\n', '\n');

    return (
        <div>
            <h3>Hello CallLocalQueryResolver</h3>
        </div>
    );
};

export default CallLocalQueryResolver;
