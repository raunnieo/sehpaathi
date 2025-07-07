import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import Home from "./pages/Home/Home.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import About from "./pages/About/About.jsx";
import Signin from "./pages/Signin/Signin.jsx";
import Layout from "./Layout.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import PrivateRoute from "./route/PrivateRoute.jsx";
import Error from "./pages/Error/Error.jsx";
import UserCustomization from "./pages/UserCustomization/UserCustomization.jsx";
import ComingSoon from "./pages/ComingSoon/ComingSoon.jsx";
import ContactSupport from "./pages/ContactSupport/ContactSupport.jsx";
import Demo from "./pages/Demo/Demo.jsx";

// Dashboard Pages
import DashboardHome from "./pages/Dashboard/DashboardHome.jsx";
import AIChat from "./pages/Dashboard/AIChat.jsx";
import Resources from "./pages/Dashboard/Resources.jsx";
import Materials from "./pages/Dashboard/Materials.jsx";
import Profile from "./pages/Dashboard/Profile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>} errorElement = {<Error/>}>
      <Route path="" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />      
      <Route path="/about" element={<About />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/coming-soon" element={<ComingSoon />} />
      <Route path="/contact-support" element={<ContactSupport />} />
      <Route path="/customize-profile" element={<PrivateRoute element={<UserCustomization />} />} />
      <Route path="/user-customization" element={<PrivateRoute element={<UserCustomization />} />} />
      <Route
        path="/dashboard"
        element={<PrivateRoute element={<Dashboard />} />}
      >
        <Route index element={<DashboardHome />} />
        <Route path="chat" element={<AIChat />} />
        <Route path="resources" element={<Resources />} />
        <Route path="materials" element={<Materials />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
