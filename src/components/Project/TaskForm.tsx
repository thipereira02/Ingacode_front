/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { toast } from "react-toastify";

import { Title, ArrowIcon, Form, Input, Label, ButtonForm, Submit } from "../../layouts/Common";

export default function TaskForm({ userData }: any) {
	const [newTask, setNewTask] = useState("");
	const [taskDescription, setTaskDescription] = useState("");
	const [showTasksForm, setShowTasksForm] = useState(false);

	return (
		<>
			<Title onClick={() => setShowTasksForm(!showTasksForm)}>
				<h3>Adicionar task</h3>
				<ArrowIcon showForm={showTasksForm} />
			</Title>
			<Form showForm={showTasksForm}>
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