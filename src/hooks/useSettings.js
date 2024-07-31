import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSetting } from "./../services/apiSettings";
import toast from "react-hot-toast";

const queryKey = ["settings"];

const useSettings = () => {
  const {
    data: settings,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey,
    queryFn: getSettings,
  });

  const queryClient = useQueryClient();
  const { isLoading: updating, mutate: updateSettingM } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings successfully updated.");
      queryClient.invalidateQueries({
        queryKey,
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    settings,
    loading,
    error,
    updating,
    updateSetting: updateSettingM,
  };
};

export default useSettings;
