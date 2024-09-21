import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PUBLIC_API_URL } from "../../constants";

export type SubmitOrderRequest = {
  oil: string;
  egg: string;
  acid: string;
  mustard: string;
  email_address: string;
};

function useSubmitOrderMutation() {
  const queryClient = useQueryClient();

  const mutationFn = async (
    submitOrderRequest: SubmitOrderRequest
  ): Promise<void> => {
    await axios.post(`${PUBLIC_API_URL}/order`, submitOrderRequest);
    // TODO: handle errors
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["inventory"] });
  };

  return useMutation({ mutationFn, onSuccess });
}

export default useSubmitOrderMutation;
