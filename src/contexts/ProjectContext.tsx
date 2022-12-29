import { createContext } from "react";

interface ProjectContextProps {
    projectData: {
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
        userId: string;
        wasDeleted: boolean;
    };
    setProjectData: (data: {
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
        userId: string;
        wasDeleted: boolean;
    }) => void;
}

const ProjectContext = createContext({} as ProjectContextProps);

export default ProjectContext;