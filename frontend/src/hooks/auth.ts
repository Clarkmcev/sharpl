import { useAppSelector } from "../store/hooks";

export const useAuth = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  return isAuthenticated ? user : null;
};
