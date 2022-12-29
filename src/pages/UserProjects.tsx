/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import App from "../layouts/App";
import { Title, ArrowIcon, Form, Input, Label, ButtonForm, Submit, Projects, Project } from "../layouts/Common";
import UserContext from "../contexts/UserContext";
import ProjectContext from "../contexts/ProjectContext";
import { addProjectCollaborator, getProjects } from "../services/requests";

export default function UserProjects() {
	const navigate = useNavigate();
	const [projects, setProjects] = useState<any[]>([]);
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
	}, []);

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