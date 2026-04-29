import { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { client } from "../apollo/apolloClient.js";
import { GET_MILESTONES_BY_PROJECT, GET_TASKS, SAVE_TASK } from "./query.js";

export function useTasks({ page = 1, search = "" } = {}) {
  return useQuery(GET_TASKS, {
    variables: { page, search },
    fetchPolicy: "network-only",
  });
}

export async function saveTask(variables) {
  try {
    const { data } = await client.mutate({
      mutation: SAVE_TASK,
      variables,
    });
    return data?.createTask;
  } catch (e) {
    return { status: 500, errorMessage: e.message };
  }
}


export function useMilestonesByProject(projectId) {
  return useQuery(GET_MILESTONES_BY_PROJECT, {
    variables: { projectId: projectId ? parseInt(projectId) : undefined },
    skip: !projectId,
    fetchPolicy: "network-only",
  });
}