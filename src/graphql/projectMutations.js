import { GQL_ENDPOINT } from "../config";
import { getToken } from "../utils/auth";

export async function saveProject(variables) {
  const token = getToken();

  const query = `
    mutation createProject(
      $id: Int
      $title: String
      $projectname: String
      $startdate: String
      $enddate: String
      $budgethours: Int
      $status: String
      $project_managerid: String
      $remarks: String
    ) {
      createProject(
        id: $id
        title: $title
        projectname: $projectname
        startdate: $startdate
        enddate: $enddate
        budgethours: $budgethours
        status: $status
        project_managerid: $project_managerid
        remarks: $remarks
      ) {
        status
        errorMessage
      }
    }
  `;

  const res = await fetch(GQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 👈 AUTH ADDED HERE
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await res.json();
  return data?.data?.createProject;
}



export const fetchProjectsAPI = async (search = "", currentPage = 1) => {
  try {
     const token = getToken();
    const res = await fetch(GQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        query: `
          query GetAllProjects($search: String, $currentPage: Int) {
            getAllProjects(search: $search, currentPage: $currentPage) {
              status
              errorMessage
              totalCount
              currentPage
              totalPages
              results {
                id
                title
                projectname
                projectcode
                startdate
                enddate
                budgethours
                status
                project_managerid
                remarks
                createdAt
                updatedAt
                manager {
                  name
                }
              }
            }
          }
        `,
        variables: {
          search,
          currentPage,
        },
      }),
    });

    const json = await res.json();
    return json?.data?.getAllProjects;
  } catch (error) {
    console.error("fetchProjectsAPI error:", error);
    return null;
  }
};