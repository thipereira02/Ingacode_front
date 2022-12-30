/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { RxUpdate } from "react-icons/rx";
import { MdDeleteOutline } from "react-icons/md";

import App from "../layouts/App";
import UserContext from "../contexts/UserContext";
import ProjectContext from "../contexts/ProjectContext";
import TaskForm from "../components/Project/TaskForm";
import { deleteATask, getTasks, updateATask } from "../services/requests";

export default function Project(){
	const { projectId } = useParams<{ projectId: string }>();
	const { userData } = useContext(UserContext);
	const { projectData } = useContext(ProjectContext);
	const [update, setUpdate] = useState(false);
	const [tasks, setTasks] = useState<any[]>([]);
	const [deletedTasks, setDeletedTasks] = useState<any[]>([]);
	const token = userData.token;

	function filterTasks(tasks: any){
		const deletedTasks = tasks.filter((task: any) => task.wasDeleted === true);
		setDeletedTasks(deletedTasks);

		const activeTasks = tasks.filter((task: any) => task.wasDeleted === false);
		setTasks(activeTasks);
	}

	{projectId !== undefined &&
		useEffect(() => {
			const req = getTasks(token, projectId);
			req.then(res => {
				filterTasks(res.data);
			}).catch(err => {
				console.log(err);
				toast.error(err.response.data.message);
			});
		}, [update]);
	}

	function updateTask(id: string){
		const description = tasks.find((task: any) => task.id === id).description || "";
		const name = tasks.find((task: any) => task.id === id).name || "";

		if (projectId !== undefined) {
			const taskId = id;
			const body = {
				description,
				name,
				projectId
			};
		
			const req = updateATask(token, body, taskId);
			req.then(() => {
				toast.success("Task atualizada com sucesso!");
				setUpdate(!update);
			}).catch(err => {
				console.log(err);
				toast.error(err.response.data.message);
			});
		}
	}

	function deleteTask(id: string){
		if (projectId !== undefined) {
			const taskId = id;
			const req = deleteATask(token, projectId, taskId);
			req.then(() => {
				toast.success("Task deletada com sucesso!");
				setUpdate(!update);
			}).catch(err => {
				console.log(err);
				toast.error(err.response.data.message);
			});
		}
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
					{tasks.map((task: any) => {
						return (
							<Task key={task.id}>
								<div>
									<EditableTitle
										type="text"
										placeholder={task.name}
										value={task.name}
										onChange={(e: any) => setTasks(
											tasks.map(
												(t: any) => {
													if(t.id === task.id){
														t.name = e.target.value;
														t.changed = true;
													}
													return t;
												}
											)
										)}
									/>
									{task.changed ?								
										<RxUpdate style={{marginRight: 10, fontSize: 20, cursor: "pointer"}} onClick={() => updateTask(task.id)} />
										:
										<MdDeleteOutline style={{fontSize: 20, cursor: "pointer"}} onClick={() => deleteTask(task.id)} />
									}
								</div>
								<EditableDescription
									rows={1000}	
									placeholder={task.description}
									value={task.description}
									onChange={(e: any) => setTasks(
										tasks.map(
											(t: any) => {
												if(t.id === task.id){
													t.description = e.target.value;
													t.changed = true;
												}
												return t;
											}
										)
									)}
								/>
							</Task>
						);
					})}
				</Collumn>
				<Collumn>
					<Title>Em execução</Title>
					<Task>

					</Task>
				</Collumn>
				<Collumn>
					<Title>Concluídas</Title>
					{deletedTasks.map((task: any) => {
						return (
							<Task key={task.id}>
								<h4>{task.name}</h4>
								<TextArea>
									<p>{task.description}</p>
								</TextArea>
							</Task>
						);
					})}
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
		grid-gap: 15px;
	}
`;

const Collumn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Title = styled.div`
	width: 100%;
	font-size: 20px;
	font-weight: 500;
	margin-bottom: 10px;
`;

const Task = styled.div`
	width: 100%;
	height: 200px;
	background-color: red;
	margin-bottom: 10px;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
	display: flex;
	flex-direction: column;
	padding: 15px;

	div{
		display: flex;
		justify-content: space-between;
		align-items: center;

		h1{
			font-size: 20px;
			font-weight: 500;
		}
	}

	h4{
		font-size: 20px;
		font-weight: 500;
	}
`;

const EditableTitle = styled.input`
	width: 100%;
	border: none;
	background-color: transparent;
	font-size: 20px;
	font-weight: 500;
	color: #fff;
`;

const EditableDescription = styled.textarea`
	width: 100%;
	border: none;
	background-color: transparent;
	font-size: 16px;
	color: #fff;
	overflow-y: scroll;
	resize: none;
	margin-top: 10px;

	:hover::-webkit-scrollbar-thumb {
        background-color: #BFBFBF;
    }
    ::-webkit-scrollbar {
        width: 2px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 20px;
    }
`;

const TextArea = styled.div`
	width: 100%;
	overflow-y: scroll;
	word-break: break-all;
	margin-top: 20px;
	display: flex;
	flex-direction: column;

	p{
		font-size: 16px;
		line-height: 1.2;
	}

	:hover::-webkit-scrollbar-thumb {
        background-color: #BFBFBF;
    }
    ::-webkit-scrollbar {
        width: 2px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 20px;
    }
`;