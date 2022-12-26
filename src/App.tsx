import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import GlobalStyle from "./layouts/GlobalStyle";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserContext from "./contexts/UserContext";

function App() {
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
					theme="dark"
				/>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/sign-up" element={<Login />} />
					<Route path="/" element={<Home />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;