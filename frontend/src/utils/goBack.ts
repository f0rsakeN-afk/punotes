import { useNavigate } from "react-router-dom";

export const GoBack = () => {
  const navigate = useNavigate();
  return () => {
    navigate(-1);
  };
};
