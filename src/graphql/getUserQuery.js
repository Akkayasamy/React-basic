import { useQuery } from "@apollo/client/react";
import { GET_ALL_USERS, GET_USERS } from "./query";

export const useUsers = (skip = false) => {
  const { data, loading, error } = useQuery(GET_USERS, { skip });

  return {
    status: data?.getUser?.status,
    data: data?.getUser?.result,
    errorMessage: data?.getUser?.errorMessage,
    loading,
    error,
  };
};

export const useGetAllUsers = (skip = false) => {
  const { data, loading, error } = useQuery(GET_ALL_USERS, { skip });

  return {
    status: data?.getUsers?.status,
    data: data?.getUsers?.results,
    errorMessage: data?.getUsers?.errorMessage,
    loading,
    error,
  };
};