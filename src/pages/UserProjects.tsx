/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";
import { MdDeleteOutline, MdForward } from "react-icons/md";
import styled from "styled-components";

import App from "../layouts/App";
import { Title, ArrowIcon, Form, Input, Label, ButtonForm, Submit, Projects } from "../layouts/Common";
import UserContext from "../contexts/UserContext";
import ProjectContext from "../contexts/ProjectContext";
import { addProjectCollaborator, getProjects, updateProject } from "../services/requests";

export default function UserProjects() {
	const navigate = useNavigate();
	const [projects, setProjects] = useState<any[]>([]);
	const [refresh, setRefresh] = useState(false);
	const { userData } = useContext(UserContext);
	const { setProjectData } = useContext(ProjectContext);
	const [newCollaborator, setNewCollaborator] = useState("");
	const [showCollaboratorsForm, setShowCollaboratorsForm] = useState(false);
	const token = userData.token;

	useEffect(() => {
		const req = getProjects(token);
		req.then(res => {
			setProjects(res.data);
		}).catch(err => {
			console.log(err);
			toast.error(err.response.data.message);
		});
	}, [refresh]);

	function goTo(path: string, data: any){
		navigate(path);
		setProjectData(data);
	}

	function addCollaborator(e: React.FormEvent){
		e.preventDefault();

		const body = {
			name: newCollaborator
		};
		const req = addProjectCollaborator(token, body);
		req.then(() => {
			toast.success("Colaborador adicionado com sucesso!");
			setNewCollaborator("");
			setShowCollaboratorsForm(false);
		}
		).catch(err => {
			console.log(err);
			toast.error(err.response.data.message);
		});
	}

	function update(id: string){
		const name = projects.find((project: any) => project.id === id).name || "";

		const projectId = id;
		const body = {
			name
		};
		const req = updateProject(token, body, projectId);
		req.then(() => {
			toast.success("Projeto atualizado com sucesso!");
			setRefresh(!refresh);
		}
		).catch(err => {
			console.log(err);
			toast.error(err.response.data.message);
		});
	}

	return (
		<App>
			<h1>Esses são seus projetos</h1>
			<Title onClick={() => setShowCollaboratorsForm(!showCollaboratorsForm)}>
				<h3>Adicionar colaborador</h3>
				<ArrowIcon showForm={showCollaboratorsForm} />
			</Title>
			<Form showForm={showCollaboratorsForm} onSubmit={addCollaborator}>
				<div>
					<Input
						type="text"
						value={newCollaborator}
						onChange={e => setNewCollaborator(e.target.value)}
						onInvalid={e => (e.target as HTMLInputElement).setCustomValidity("Please enter the collaborator name")}
						onInput={e => (e.target as HTMLInputElement).setCustomValidity("")}
						required
					/>
					<Label>Nome do Colaborador</Label>
				</div>
				<ButtonForm>
					<Submit type="submit">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
                            Adicionar
					</Submit>
				</ButtonForm>
			</Form>
			<Projects style={{marginTop: 50}}>
				{projects.length === 0 && <p>Você ainda não tem projetos. Comece agora mesmo.</p>}
				{projects.length !== 0 && (
					<>
						{projects.map((project: any) => {
							return (
								<Project key={project.id}>
									<EditableName 
										rows={1000}	
										placeholder={project.name}
										value={project.name}
										onChange={(e: any) => setProjects(
											projects.map(
												(p: any) => {
													if(p.id === project.id){
														p.name = e.target.value;
														p.changed = true;
													}
													return p;
												}
											)
										)}
									/>
									<Icons>
										<MdForward style={{fontSize: 22, cursor: "pointer"}} onClick={() => goTo(`/projeto/${project.id}`, project)} />
										<span>
											{project.changed ? 
												<RxUpdate style={{marginRight: 5, fontSize: 18, cursor: "pointer"}} onClick={() => update(project.id)}/> :
												<MdDeleteOutline style={{fontSize: 18, cursor: "pointer"}} />
											}
										</span>
									</Icons>
								</Project>
							);
						})}
					</>
				)}
			</Projects>
		</App>
	);
}

export const Project = styled.div`
	width: 170px;
	height: 80px;
	font-size: 16px;
	font-weight: 500;
	margin-right: 20px;
	margin-bottom: 20px;
	padding: 10px;
	background: #1E1782;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    div{
        height: 80%;
        word-break: break-all;
        overflow-y: hidden;
    }

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

export const EditableName = styled.textarea`
	width: 100%;
	height: 70%;
	border: none;
	background-color: transparent;
	font-size: 16px;
	font-weight: 500;
	color: #fff;
	overflow-y: scroll;
	resize: none;

	:hover::-webkit-scrollbar-thumb {
        background-color: #BFBFBF;
    }
    ::-webkit-scrollbar {
        width: 2px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 20px;
    }

	@media (min-width: 768px) {
		height: 80%;
	}
`;

const Icons = styled.div`
	display: flex;
	justify-content: space-between;
`;