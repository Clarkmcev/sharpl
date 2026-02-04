import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { whoamiRequest } from "../store/slices/authSlice";

export const useWhoami = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(whoamiRequest());
    }
  }, [dispatch, isAuthenticated]);
};
