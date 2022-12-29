import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import App from "../layouts/App";
import ProjectContext from "../contexts/ProjectContext";

export default function Project(){
	const { projectId } = useParams();
	const { projectData } = useContext(ProjectContext);
	console.log(projectData);

	return (
		<App>
			<h1>Projeto:</h1>
			<h2>{projectData.name}</h2>
			<Board>
				<Collumn>
					<Title>Não iniciadas</Title>
					<div>
						<Task>asdasd</Task>
						<Task>asdasd</Task>
						<Task>asdasd</Task>
						<Task>asdasd</Task>
					</div>
				</Collumn>
				<Collumn>
					<Title>Em execução</Title>
					<div>
						<Task>asdasd</Task>
						<Task>asdasd</Task>
					</div>
				</Collumn>
				<Collumn>
					<Title>Concluídas</Title>
					<div>
						<Task>asdasd</Task>
						<Task>asdasd</Task>
					</div>
				</Collumn>
			</Board>
		</App>
	);
}

const Board = styled.div`
	margin-top: 40px;

	@media (min-width: 1024px){
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}
`;

const Collumn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;

	div{
		width: 100%;
		padding: 10px;
	}
`;

const Title = styled.div`
	width: 100%;
	padding: 10px;
	font-size: 20px;
	font-weight: 500;
	
`;

const Task = styled.div`
	width: 100%;
	min-height: 200px;
	background-color: red;
	margin-bottom: 10px;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
`;