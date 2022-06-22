import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Authenticated = () => {
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  const location = useLocation();

  const from = location.state?.from?.pathname || "/"

  return (
    !accessToken ? <Outlet /> : <Navigate to={from} state={{from: location}} replace />
  )
}

export default Authenticated