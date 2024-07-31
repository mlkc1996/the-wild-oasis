import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCabins,
  deleteCabin,
  createOrUpdateCabin,
} from "../services/apiCabins";
import toast from "react-hot-toast";
const queryKey = ["cabins"];

const useCabins = () => {
  const {
    isLoading: fetching,
    data: cabins,
    error: fetching_error,
  } = useQuery({
    queryKey,
    queryFn: getCabins,
  });

  const queryClient = useQueryClient();
  const { isLoading: deleting, mutate: deleteCabinM } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin successfully deleted.");
      queryClient.invalidateQueries({
        queryKey,
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { isLoading: creating, mutate: createOrUpdateCabinM } = useMutation({
    mutationFn: createOrUpdateCabin,
    onSuccess: (data) => {
      if (data?.updated) {
        toast.success("Cabin successfully updated.");
      } else {
        toast.success("New cabin successfully created.");
      }
      queryClient.invalidateQueries({
        queryKey,
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    cabins,
    fetching,
    fetching_error,
    deleting,
    deleteCabin: deleteCabinM,
    creating,
    createOrUpdateCabin: createOrUpdateCabinM,
  };
};

export default useCabins;
