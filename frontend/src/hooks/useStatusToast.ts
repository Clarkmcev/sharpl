import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearStatus } from "../store/slices/statusSlice";

export function useStatusToast() {
  const dispatch = useAppDispatch();
  const { type, message } = useAppSelector((state) => state.status);

  useEffect(() => {
    if (!type || !message) return;

    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }

    dispatch(clearStatus());
  }, [type, message, dispatch]);
}
