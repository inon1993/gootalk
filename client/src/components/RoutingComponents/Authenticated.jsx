import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const Authenticated = () => {
  const user = useSelector((state) => state.user.user.accessToken);
  const location = useLocation();

  const from = location.state?.from?.pathname || "/"

  return (
    !user ? <Outlet /> : <Navigate to={from} state={{from: location}} replace />
  )
}

export default Authenticated