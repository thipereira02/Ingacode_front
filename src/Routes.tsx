import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import GlobalStyle from "./layouts/GlobalStyle";

import Home from "./pages/Home";
import Login from "./pages/Login";
import UserContext from "./contexts/UserContext";
import ActivePageContext from "./contexts/ActivePageContext";
import ProjectContext from "./contexts/ProjectContext";
import AddProject from "./pages/AddProject";
import UserProjects from "./pages/UserProjects";
import Project from "./pages/Project";
import AddTimeTracker from "./pages/AddTimeTracker";

interface Project {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
	userId: string;
	wasDeleted: boolean;
}

const ProjectRoutes = () => {
	const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
	const [activePage, setActivePage] = useState("HHome");
	const [projectData, setProjectData] = useState({} as Project);

	return (
		<UserContext.Provider value={{ userData, setUserData }}>
			<ActivePageContext.Provider value={{ activePage, setActivePage }}>
				<ProjectContext.Provider value={{ projectData, setProjectData }}>
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
							<Route path="/meus-projetos" element={<UserProjects />} />
							<Route path="/projeto/:projectId" element={<Project />} />
							<Route path="/projeto/:taskId/novo-time-tracker" element={<AddTimeTracker />} />
							<Route path="*" element={<Navigate to="/" />} />
						</Routes>
					</BrowserRouter>
				</ProjectContext.Provider>
			</ActivePageContext.Provider>
		</UserContext.Provider>
	);
};

export default ProjectRoutes; 