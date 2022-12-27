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
				<Project>
					<TbNewSection />
				</Project>
				<h3>Seus projetos recentes</h3>
				<Projects>
					
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


const Projects = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 20px;
`;

const Project = styled.div`
	width: 70px;
	height: 70px;
	border-radius: 20px;
	background: #1E1782;
	opacity: 0.7;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 50px;
	cursor: pointer;
	margin-right: 10px;
	margin-bottom: 10px;

	&:hover{
		background: #1E1782;
		opacity: 1;
	}

	@media (min-width: 768px) {
		width: 100px;
		height: 100px;
		border-radius: 30px;
		font-size: 60px;
		margin-right: 20px;
		margin-bottom: 20px;
	}
`;