import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { TbNewSection } from "react-icons/tb";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import UserContext from "../contexts/UserContext";

export default function Home() {
	const user = localStorage.getItem("user");
	const userData = useContext(UserContext);
	const [sidebar, setSidebar] = useState(true);
	const [activePage, setActivePage] = useState("/");

	useEffect(() => {
		if (!user) {
			window.location.href = "/login";
		}
	}, [user]);

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
					<Project>
						T
					</Project>
					<Project>
						T
					</Project>
					<Project>
						T
					</Project>
					<Project>
						T
					</Project>
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
		font-weight: 500;
		line-height: 20px;
		margin-top: 40px;
		margin-bottom: 20px;
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
	}
`;

const NewProject = styled.div`
	width: 70px;
	height: 70px;
	background: #1E1782;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 50px;
	cursor: pointer;
	margin-right: 10px;
	margin-bottom: 10px;

	@media (min-width: 768px) {
		width: 100px;
		height: 100px;
		font-size: 60px;
	}
`;

const Projects = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 20px;
`;

const Project = styled.div`
	width: 70px;
	height: 70px;
	font-size: 40px;
	margin-right: 20px;
	margin-bottom: 20px;
	outline: calc(70px/2) solid #0009;
	outline-offset: calc(70px/-2);
	cursor: pointer;
	transition: 0.3s;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover{
		outline: 4px solid #1E1782;
		outline-offset: 10px;
		background: #1E1782;
	}

	@media (min-width: 768px) {
		width: 100px;
		height: 100px;
		font-size: 60px;
		outline: calc(100px/2) solid #0009;
		outline-offset: calc(100px/-2);
		margin-bottom: 25px;
		margin-right: 25px;

		&:hover{
			outline-offset: 12px;
		}
	}
`;