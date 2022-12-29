import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";

import App from "../layouts/App";
import UserContext from "../contexts/UserContext";
import ProjectContext from "../contexts/ProjectContext";
import TaskForm from "../components/Project/TaskForm";
import { getTasks } from "../services/requests";

export default function Project(){
	const { projectId } = useParams<{ projectId: string }>();
	const { userData } = useContext(UserContext);
	const { projectData } = useContext(ProjectContext);
	const [update, setUpdate] = useState(false);
	const [tasks, setTasks] = useState([]);
	console.log(tasks);

	{projectId !== undefined &&
		useEffect(() => {
			const token = userData.token;
			const req = getTasks(token, projectId);
			req.then(res => {
				setTasks(res.data);
			}).catch(err => {
				console.log(err);
				toast.error(err.response.data.message);
			});
		}, [update]);
	}

	return (
		<App>
			<h1>Projeto:</h1>
			<h2>{projectData.name}</h2>
			<TaskForm 
				projectId ={projectId}
				update={update}
				setUpdate={setUpdate}
			/>
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