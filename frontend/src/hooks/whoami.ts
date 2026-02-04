import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { whoamiRequest } from "../store/slices/authSlice";

export const useWhoami = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentUser && localStorage.getItem("authToken")) {
      dispatch(whoamiRequest());
    }
  }, [dispatch, currentUser]);
};
