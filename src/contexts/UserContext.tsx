import { createContext } from "react";

interface UserContextProps {
    userData: {
        token: string;
        userName: string;
    };
    setUserData: (data: { token: string; userName: string }) => void;
}

const UserContext = createContext({} as UserContextProps);

export default UserContext;