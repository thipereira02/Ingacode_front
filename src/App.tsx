import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyle from "./layouts/GlobalStyle";

function App() {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<Routes>
				<Route path="/" element={<div>Home</div>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
