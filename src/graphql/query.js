import { gql } from "@apollo/client";

export const GET_USERS = gql`
query getUser {
  getUser {
    status
    errorMessage
    result {
      first_name
      email
    }
  }
}`;


export const GET_MANAGERS = gql`
  query GetAllManagers {
    getAllManagers {
      status
      errorMessage
      results {
        id
        name
      }
    }
  }
`;


export const CREATE_MILESTONE =gql `
  mutation createMilestone(
    $id: Int,
    $title: String,
    $milestoneName: String,
    $projectId: Int,
    $startDate: String,
    $endDate: String,
    $status: String,
    $milestoneOwner: String
  ) {
    createMilestone(
      id: $id,
      title: $title,
      milestoneName: $milestoneName,
      projectId: $projectId,
      startDate: $startDate,
      endDate: $endDate,
      status: $status,
      milestoneOwner: $milestoneOwner
    ) {
      status
      errorMessage
      result {
        id
        milestoneName
      }
    }
  }
`;

export const GET_MILESTONES = gql`
  query getMilestones($page: Int, $search: String, $projectId: Int, $status: String) {
    getMilestones(
      page: $page
      search: $search
      projectId: $projectId
      status: $status
    ) {
      status
      errorMessage
      totalCount
      currentPage
      totalPages
      results {
        id
        title
        milestoneName
        status
        milestoneOwner
        startDate
        endDate
        project {
          id
          projectname
          projectcode
        }
      }
    }
  }
`;


export const GET_ALL_PROJECTS= gql`
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
        `