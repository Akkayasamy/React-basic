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

export const GET_ALL_USERS = gql`
query getUsers {
  getUsers {
  status
		errorMessage
		results{
      id
			first_name
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


export const CREATE_MILESTONE = gql`
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
        owner{
			  	first_name
			  }
      }
    }
  }
`;


export const GET_ALL_PROJECTS = gql`
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
        `;


export const GET_TASKS = gql`
  query getTasks($page: Int, $search: String) {
    getTasks(page: $page, search: $search) {
      status
      errorMessage
      totalCount
      currentPage
      totalPages
      results {
        id
        taskCode
        title
        taskName
        status
        priority
        startDate
        dueDate
        project {
          id
          projectname
        }
        assignee {
          id
          first_name
        }
        milestone {
          id
          milestoneName
        }
      }
    }
  }
`;

export const SAVE_TASK = gql`
  mutation createTask(
    $id: Int
    $title: String
    $taskName: String
    $projectId: Int
    $milestoneId: Int
    $assignedTo: String
    $startDate: String
    $dueDate: String
    $priority: String
    $status: String
  ) {
    createTask(
      id: $id
      title: $title
      taskName: $taskName
      projectId: $projectId
      milestoneId: $milestoneId
      assignedTo: $assignedTo
      startDate: $startDate
      dueDate: $dueDate
      priority: $priority
      status: $status
    ) {
      status
      errorMessage
    }
  }
`;

export const GET_MILESTONES_BY_PROJECT = gql`
  query getMilestones($projectId: Int) {
    getMilestones(projectId: $projectId) {
      results {
        id
        milestoneName
      }
    }
  }
`;


export const GET_SUBTASKS = gql`
query getSubtasks(
  $taskId: Int, 
  $projectId: Int, 
  $status: String, 
  $search: String
) {
  getSubtasks(
    taskId: $taskId,
    projectId: $projectId,
    status: $status,
    search: $search
  ) {
    status
    errorMessage
    totalCount
    results {
      id
      title
      subTaskName
      status
      startDate
      dueDate
      estimatedHours
      actualHours
      task {
        id
        title
        taskCode
      }
      project {
        title
      }
			milestone{
				title
			}
      assignee {
        id
        first_name
      }
    }
  }
}     
`;

export const SAVE_SUBTASK = gql`
  mutation createSubtask(
    $id: Int
    $title: String
    $subTaskName: String
    $taskId: Int
    $projectId: Int
    $milestoneId: Int
    $assignedTo: String
    $startDate: String
    $dueDate: String
    $status: String
    $estimatedHours: Float
    $actualHours: Float
  ) {
    createSubtask(
      id: $id
      title: $title
      subTaskName: $subTaskName
      taskId: $taskId
      projectId: $projectId
      milestoneId: $milestoneId
      assignedTo: $assignedTo
      startDate: $startDate
      dueDate: $dueDate
      status: $status
      estimatedHours: $estimatedHours
      actualHours: $actualHours
    ) {
      status
      errorMessage
    }
  }
`;