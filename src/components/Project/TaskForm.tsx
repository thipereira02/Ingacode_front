/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

import { Title, ArrowIcon, Form, Input, Label, ButtonForm, Submit } from "../../layouts/Common";
import UserContext from "../../contexts/UserContext";
import { addTask } from "../../services/requests";

export default function TaskForm({ projectId, update, setUpdate }: { projectId: any, update: boolean, setUpdate: (update: boolean) => void }) {
	const { userData } = useContext(UserContext);
	const [newTask, setNewTask] = useState("");
	const [taskDescription, setTaskDescription] = useState("");
	const [showTasksForm, setShowTasksForm] = useState(false);

	function createTask(e: React.FormEvent) {
		e.preventDefault();

		const token = userData.token;
		const body = {
			projectId,
			name: newTask,
			description: taskDescription
		};
		const req = addTask(token, body);
		req.then(() => {
			toast.success("Task criada com sucesso!");
			setNewTask("");
			setTaskDescription("");
			setShowTasksForm(false);
			setUpdate(!update);
		}).catch(err => {
			toast.error(err.response.data.message);
			console.log(err);
		});
	}

	return (
		<>
			<Title onClick={() => setShowTasksForm(!showTasksForm)}>
				<h3>Adicionar task</h3>
				<ArrowIcon showForm={showTasksForm} />
			</Title>
			<Form showForm={showTasksForm} onSubmit={createTask} >
				<div>
					<Input
						type="text"
						value={newTask}
						onChange={e => setNewTask(e.target.value)}
						onInvalid={e => (e.target as HTMLInputElement).setCustomValidity("Please enter task title")}
						onInput={e => (e.target as HTMLInputElement).setCustomValidity("")}
						required
					/>
					<Label>Título da Task</Label>
				</div>
				<div>
					<Input
						type="text"
						value={taskDescription}
						onChange={e => setTaskDescription(e.target.value)}
						onInvalid={e => (e.target as HTMLInputElement).setCustomValidity("Please enter the task description")}
						onInput={e => (e.target as HTMLInputElement).setCustomValidity("")}
						required
					/>
					<Label>Descrição</Label>
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
		</>
	);
}