import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { GET_DASHBOARD_DATA } from './query';


export function useDashboardData() {
    return useQuery(GET_DASHBOARD_DATA, {
        fetchPolicy: "network-only",
    });
}