import { createContext } from "react";

interface ActivePageContextProps {
    activePage: string;
    setActivePage: (data: string) => void;
}

const UserContext = createContext({} as ActivePageContextProps);

export default UserContext;