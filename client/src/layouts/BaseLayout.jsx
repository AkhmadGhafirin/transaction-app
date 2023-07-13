import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const BaseLayout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

export default BaseLayout;
