import axios from "axios";

const BASE_URL = "http://localhost:4000";

function setConfig(token: string) {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
}

export function login(body: { userName: string; password: string }) {
	return axios.post(`${BASE_URL}/login`, body);
}

export function signUp(body: { userName: string; password: string }) {
	return axios.post(`${BASE_URL}/sign-up`, body);
}

export function getProjects(token: string) {
	return axios.get(`${BASE_URL}/projects`, setConfig(token));
}

export function createProject(token: string, body: { name: string }) {
	return axios.post(`${BASE_URL}/new-project`, body, setConfig(token));
}

export function addProjectCollaborator(token: string, body: { name: string }) {
	return axios.post(`${BASE_URL}/new-collaborator`, body, setConfig(token));
}

export function addTask(token: string, body: { projectId: string, name: string, description: string }) {
	return axios.post(`${BASE_URL}/new-task`, body, setConfig(token));
}

export function getTasks(token: string, projectId: string) {
	return axios.get(`${BASE_URL}/get-tasks/${projectId}`, setConfig(token));
}