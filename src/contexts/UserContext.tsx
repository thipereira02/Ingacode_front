import { createContext } from "react";

interface UserContextProps {
    userData: any;
    setUserData: (userData: any) => void;
}

const UserContext = createContext({} as UserContextProps);

export default UserContext;