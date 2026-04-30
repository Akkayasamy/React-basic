import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { client } from "../apollo/apolloClient.js";
import { GET_SUBTASKS, SAVE_SUBTASK } from "./query.js";


export function useSubtasks({ taskId, projectId, status, search = "" } = {}) {
  return useQuery(GET_SUBTASKS, {
    variables: { 
      taskId: taskId ? parseInt(taskId) : undefined,
      projectId: projectId ? parseInt(projectId) : undefined,
      status: status || undefined,
      search 
    },
    fetchPolicy: "network-only",
  });
}


export async function saveSubtask(variables) {
  try {
    const { data } = await client.mutate({
      mutation: SAVE_SUBTASK,
      variables: {
        ...variables,        id: variables.id ? parseInt(variables.id) : undefined,
        taskId: variables.taskId ? parseInt(variables.taskId) : undefined,
        projectId: variables.projectId ? parseInt(variables.projectId) : undefined,
        milestoneId: variables.milestoneId ? parseInt(variables.milestoneId) : undefined,
        estimatedHours: variables.estimatedHours ? parseFloat(variables.estimatedHours) : 0,
        actualHours: variables.actualHours ? parseFloat(variables.actualHours) : 0,
      },
    });
    return data?.createSubtask;
  } catch (e) {
    console.error("Mutation error:", e);
    return { status: 500, errorMessage: e.message };
  }
}