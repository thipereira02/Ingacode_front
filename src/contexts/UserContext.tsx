import { createContext } from "react";

interface UserContextProps {
    userData: string;
    setUserData: (userData: string) => void;
}

const UserContext = createContext({} as UserContextProps);

export default UserContext;