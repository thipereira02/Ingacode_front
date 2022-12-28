/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { TbNewSection } from "react-icons/tb";
import { toast } from "react-toastify";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import UserContext from "../contexts/UserContext";
import { getProjects } from "../services/requests";

export default function Home() {
	const user = localStorage.getItem("user");
	const userData = useContext(UserContext);
	const [sidebar, setSidebar] = useState(true);
	const [activePage, setActivePage] = useState("/");
	const [projects, setProjects] = useState<any[]>([]);

	useEffect(() => {
		if (!user) {
			window.location.href = "/login";
		}

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
		<>
			<Sidebar sidebar={sidebar} setSidebar={setSidebar} setActivePage={setActivePage} />
			<Header sidebar={sidebar} activePage={activePage} />
			<Content>
				<h1>Olá, {userData.userData.userName}</h1>
				<h2>O que vai fazer hoje?</h2>
				<h3>Iniciar um novo projeto</h3>
				<NewProject>
					<TbNewSection />
				</NewProject>
				<h3>Seus projetos recentes</h3>
				<Projects>
					{projects.slice(0, 3).map((p) => (
						<Project key={p.id}>
							<p>{p.name}</p>
						</Project>
					))}
				</Projects>
			</Content>
		</>
	);
}

const Content = styled.div`
	padding: 80px 20px 0 90px;

	h1{
		color: #FFF;
		font-size: 19px;
		font-weight: 700;
		line-height: 22px;
	}

	h2{
		color: #BFBFBF;
		font-size: 19px;
		font-weight: 500;
		line-height: 22px;
	}

	h3{
		color: #FFF;
		font-size: 17px;
		font-weight: 700;
		line-height: 20px;
		margin: 40px 0 20px;
	}

	@media (min-width: 768px) {
		padding: 100px 40px 0 110px;

		h1{
			font-size: 30px;
			line-height: 35px;
		}

		h2{
			font-size: 30px;
			line-height: 35px;
		}

		h3{
			font-size: 20px;
			line-height: 23px;
			margin: 50px 0 20px;
		}
	}
`;

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
`;

const Project = styled.div`
	width: 170px;
	height: 80px;
	font-size: 16px;
	font-weight: 500;
	margin-right: 20px;
	margin-bottom: 20px;
	word-break: break-all;
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