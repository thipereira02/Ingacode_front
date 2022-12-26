import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyle from "./layouts/GlobalStyle";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
	return (	
		<BrowserRouter>
			<GlobalStyle />
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Home />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;