import { createContext } from "react";

interface ActivePageContextProps {
    activePage: string;
    setActivePage: (data: string) => void;
}

const ActivePageContext = createContext({} as ActivePageContextProps);

export default ActivePageContext;