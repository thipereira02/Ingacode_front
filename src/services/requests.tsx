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