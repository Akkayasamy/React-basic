import { useQuery ,useMutation} from "@apollo/client/react";
import { CREATE_MILESTONE ,GET_MILESTONES} from "./query";


export const useSaveMilestone = () => {
  const [createMilestone, { loading, error }] = useMutation(CREATE_MILESTONE);

  const saveMilestone = async (variables) => {
    try {
      const { data } = await createMilestone({ variables });
      return data?.createMilestone;
    } catch (err) {
      console.error("saveMilestone error:", err);
      return { status: 500, errorMessage: err.message };
    }
  };

  return {
    saveMilestone,
    loading,
    error,
  };
};

export const useMilestones = (variables = {}) => {
  const { data, loading, error,refetch } = useQuery(GET_MILESTONES, {
    variables,
  });

  return {
    status: data?.getMilestones?.status,
    data: data?.getMilestones?.results,
    totalCount: data?.getMilestones?.totalCount,
    currentPage: data?.getMilestones?.currentPage,
    totalPages: data?.getMilestones?.totalPages,
    errorMessage: data?.getMilestones?.errorMessage,
    loading,
    error,
    refetch
  };
};


