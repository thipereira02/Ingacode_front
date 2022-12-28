import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import App from "../layouts/App";
import { Input, Label, ButtonForm, Submit } from "../layouts/Common";
import UserContext from "../contexts/UserContext";
import { createProject } from "../services/requests";

export default function AddProject() {
	const navigate = useNavigate();
	const [projectName, setProjectName] = useState("");
	const { userData } = useContext(UserContext);

	function newProject(e: React.FormEvent) {
		e.preventDefault();

		const body = {
			name: projectName
		};
		const token = userData.token;
		const req = createProject(token, body);
		req.then(() => {
			toast.success("Projeto criado com sucesso!");
			navigate("/projetos");
		}
		).catch(err => {
			toast.error(err.response.data.message);
			console.log(err);
		});
	}

	return (
		<App>
			<h1 style={{marginBottom: 50}}>Crie um novo projeto</h1>
			<form onSubmit={newProject}>
				<div>
					<Input
						type="text"
						value={projectName}
						onChange={e => setProjectName(e.target.value)}
						onInvalid={e => (e.target as HTMLInputElement).setCustomValidity("Please enter the project name")}
						onInput={e => (e.target as HTMLInputElement).setCustomValidity("")}
						required
					/>
					<Label>Nome do Projeto</Label>
				</div>
				<ButtonForm>
					<Submit type="submit">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
                            Criar
					</Submit>
				</ButtonForm>
			</form>
		</App>
	);
}