/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { TbNewSection, TbDotsCircleHorizontal } from "react-icons/tb";
import { toast } from "react-toastify";

import { Projects, Project } from "../layouts/Common";
import UserContext from "../contexts/UserContext";
import ActivePageContext from "../contexts/ActivePageContext";
import ProjectContext from "../contexts/ProjectContext";
import { getProjects } from "../services/requests";
import App from "../layouts/App";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const navigate = useNavigate();
	const { userData } = useContext(UserContext);
	const { setActivePage } = useContext(ActivePageContext);
	const { setProjectData } = useContext(ProjectContext);
	const [projects, setProjects] = useState<any[]>([]);

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
		if (data.length !== 0) setActivePage("Mmeus projetos");
		else setActivePage(path);
	}
	
	return (
		<App>
			<h1>Olá, {userData.userName}</h1>
			<h2>O que vai fazer hoje?</h2>
			<h3>Iniciar um novo projeto</h3>
			<NewProject onClick={() => goTo("/novo-projeto", {})} >
				<TbNewSection />
			</NewProject>
			<h3>Seus projetos recentes</h3>
			<Projects>
				{projects.length === 0 && <p>Você ainda não tem projetos. Comece agora mesmo.</p>}
				{projects.length !== 0 && (
					<>
						{projects.slice(0, 3).map((p) => (
							<Project key={p.id} onClick={() => goTo(`/projeto/${p.id}`, p)}>
								<div>
									<p>{p.name}</p>
								</div>
							</Project>
						))}
						<Invisible>
							<DotsIcon onClick={() => goTo("/meus-projetos", {})} />
						</Invisible>
					</>
				)}
			</Projects>
		</App>
	);
}

const NewProject = styled.div`
	width: 170px;
	height: 80px;
	background: #1E1782;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 50px;
	cursor: pointer;
	margin-right: 10px;
	margin-bottom: 10px;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

	@media (min-width: 768px) {
		width: 242px;
		height: 112px;
		font-size: 60px;
	}
`;

const Invisible = styled.div`
	width: 170px;
	height: 80px;
	margin-right: 20px;
	margin-bottom: 20px;
`;

const DotsIcon = styled(TbDotsCircleHorizontal)`
	font-size: 40px;
	cursor: pointer;
	margin-top: calc( 80px/2 - 40px/2 );
	
	@media (min-width: 768px) {
		font-size: 50px;
		margin-top: calc( 112px/2 - 25px );
	}

	@media (min-width: 1024px) {
		opacity: 0.5;
		transition: 0.3s;

		&:hover{
			opacity: 1;
		}
	}
`;