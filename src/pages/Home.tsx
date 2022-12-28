/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { TbNewSection, TbDotsCircleHorizontal } from "react-icons/tb";
import { toast } from "react-toastify";

import UserContext from "../contexts/UserContext";
import { getProjects } from "../services/requests";
import App from "../layouts/App";

export default function Home() {
	const userData = useContext(UserContext);
	const [projects, setProjects] = useState<any[]>([]);

	useEffect(() => {
		const token = userData.userData.token;
		const req = getProjects(token);
		req.then(res => {
			setProjects(res.data);
		}).catch(err => {
			console.log(err);
			toast.error(err.response.data.message);
		});
	}, []);
	
	return (
		<App>
			<h1>Olá, {userData.userData.userName}</h1>
			<h2>O que vai fazer hoje?</h2>
			<h3>Iniciar um novo projeto</h3>
			<NewProject>
				<TbNewSection />
			</NewProject>
			<h3>Seus projetos recentes</h3>
			<Projects>
				{projects.length === 0 && <p>Você ainda não tem projetos. Comece agora mesmo.</p>}
				{projects.length !== 0 && (
					<>
						{projects.slice(0, 3).map((p) => (
							<Project key={p.id}>
								<p>{p.name}</p>
							</Project>
						))}
						<Invisible>
							<DotsIcon onClick={() => window.location.href = "/projetos"} />
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

const Projects = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 20px;

	p{
		color: #BFBFBF;
		font-size: 16px;
		font-weight: 500;
		line-height: 19px;

		@media (min-width: 768px) {
			font-size: 19px;
			line-height: 22px;
		}
	}
`;

const Project = styled.div`
	width: 170px;
	height: 80px;
	font-size: 16px;
	font-weight: 500;
	margin-right: 20px;
	margin-bottom: 20px;
	word-break: break-all;
	overflow-y: hidden;
	cursor: pointer;
	padding: 10px;
	background: #1E1782;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

	@media (min-width: 768px) {
		width: 242px;
		height: 112px;
		font-size: 20px;
		margin-right: 25px;
		margin-bottom: 25px;
		padding: 15px;
	}

	@media (min-width: 1024px) {
		outline: calc(115px/2) solid #0009;
		outline-offset: calc(113px/-2);
		transition: 0.3s;

		&:hover{
			outline: 4px solid #1E1782;
			outline-offset: 12px;
			background: #1E1782;
		}
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