import Navbar from "../../components/Navbar/Navbar";
import DashboardHome from "../../components/Dashboard/DashboardHome/DashboardHome";
import { useDispatch } from "react-redux";
import { navbarActions } from "../../store/navbar-slice";
import { useEffect } from "react";

const Home = () => {
  const dispach = useDispatch();
  useEffect(() => {
    dispach(navbarActions.activateSearchInput());
  }, []);
  return (
    <div>
      <Navbar />
      <DashboardHome />
    </div>
  );
};

export default Home;
