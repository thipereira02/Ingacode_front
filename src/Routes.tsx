import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import GlobalStyle from "./layouts/GlobalStyle";

import Home from "./pages/Home";
import Login from "./pages/Login";
import UserContext from "./contexts/UserContext";
import ActivePageContext from "./contexts/ActivePageContext";
import AddProject from "./pages/AddProject";

const ProjectRoutes = () => {
	const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
	const [activePage, setActivePage] = useState("Home");

	return (
		<UserContext.Provider value={{ userData, setUserData }}>
			<ActivePageContext.Provider value={{ activePage, setActivePage }}>
				<BrowserRouter>
					<GlobalStyle />
					<ToastContainer
						position="top-center"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="dark" />
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/sign-up" element={<Login />} />
						<Route path="/home" element={<Home />} />
						<Route path="/novo-projeto" element={<AddProject />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</BrowserRouter>
			</ActivePageContext.Provider>
		</UserContext.Provider>
	);
};

export default ProjectRoutes; 