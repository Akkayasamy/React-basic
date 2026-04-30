import { useQuery } from "@apollo/client/react";
import { client } from "../apollo/apolloClient.js";
import { GET_TIMESHEETS, CREATE_TIMESHEET } from "./query.js";

export function useTimesheets({ page, search = "", employeeId, projectId, status } = {}) {
  return useQuery(GET_TIMESHEETS, {
    variables: {
      page: page ? parseInt(page) : 1,
      search: search || "",
      employeeId: employeeId ? parseInt(employeeId) : undefined,
      projectId: projectId ? parseInt(projectId) : undefined,
      status: status || undefined,
    },
    fetchPolicy: "network-only",
  });
}

export async function saveTimesheet(variables) {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_TIMESHEET,
      variables: {
        ...variables,
        id: variables.id ? parseInt(variables.id) : undefined,
        taskId: variables.taskId ? parseInt(variables.taskId) : undefined,
        subtaskId: variables.subtaskId ? parseInt(variables.subtaskId) : undefined,
        hoursWorked: variables.hoursWorked ? parseFloat(variables.hoursWorked) : 0,
        employeeId: variables.employeeId ? variables.employeeId.toString() : undefined,
      },
    });
    return data?.createTimesheet;
  } catch (e) {
    console.error("Timesheet Mutation error:", e);
    return { 
      status: 500, 
      errorMessage: e.message || "Internal Server Error" 
    };
  }
}