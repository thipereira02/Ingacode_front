import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import GlobalStyle from "./layouts/GlobalStyle";

import Home from "./pages/Home";
import Login from "./pages/Login";
import UserContext from "./contexts/UserContext";

const ProjectRoutes = () => {
	const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user") || "{}"));

	return (
		<UserContext.Provider value={{ userData, setUserData }}>
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
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
	);
};

export default ProjectRoutes; 