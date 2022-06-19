import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const Authenticated = () => {
  const user = useSelector((state) => state.user.user.accessToken);
  const location = useLocation();

  useEffect(() => {
      console.log(user);
  }, [])

  return (
    !user ? <Outlet /> : <Navigate to={state} state={{from: location}} replace />
  )
}

export default Authenticated