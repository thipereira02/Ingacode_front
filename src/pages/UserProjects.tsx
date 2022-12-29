/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import App from "../layouts/App";
import { Projects, Project } from "../layouts/Common";
import UserContext from "../contexts/UserContext";
import ActivePageContext from "../contexts/ActivePageContext";
import ProjectContext from "../contexts/ProjectContext";
import { getProjects } from "../services/requests";

export default function UserProjects() {
	const navigate = useNavigate();
	const [projects, setProjects] = useState<any[]>([]);
	const { userData } = useContext(UserContext);
	const { setProjectData } = useContext(ProjectContext);

	useEffect(() => {
		const token = userData.token;
		const req = getProjects(token);
		req.then(res => {
			setProjects(res.data);
		}).catch(err => {
			console.log(err);
			toast.error(err.response.data.message);
		});
	}, []);

	function goTo(path: string, data: any){
		navigate(path);
		setProjectData(data);
	}

	return (
		<App>
			<h1 style={{marginBottom: 20}}>Esses são seus projetos</h1>
			<Projects>
				{projects.length === 0 && <p>Você ainda não tem projetos. Comece agora mesmo.</p>}
				{projects.length !== 0 && (
					<>
						{projects.map((p) => (
							<Project key={p.id} onClick={() => goTo(`/projeto/${p.id}`, p)}>
								<p>{p.name}</p>
							</Project>
						))}
					</>
				)}
			</Projects>
		</App>
	);
}