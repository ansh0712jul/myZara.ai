import { Socket } from "socket.io-client";

let socketInstance = null;

export const getSocketInstance = (projectId) => {
    if (!socketInstance) {
        socketInstance = new Socket(import.meta.env.VITE_API_URL, {
            auth: {
                token: localStorage.getItem("token"),
            },
            query: {
                projectId,  
            },
        });
    }
    return socketInstance;
    }