import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";

export const routes = [
  { path: "/login", exact: true, component: Login },
  { path: "/signup", exact: true, component: SignUp },
  { path: "/", exact: true, component: LandingPage },
  { path: "/forget", exact: true, component: ForgetPassword },
  { path: "/reset", exact: true, component: ResetPassword },
];

export const privateRoutes = [
  { path: "/dashboard", exact: true, component: Dashboard },
];
