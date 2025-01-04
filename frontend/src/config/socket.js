import { io } from "socket.io-client";

let socketInstance = null;

export const initializeSocket = (projectId) => {
    if (!socketInstance) {
        socketInstance = io(import.meta.env.VITE_BASE_URL, {
            auth: {
                token: localStorage.getItem("token"), // Ensure token is valid
            },
            query: {
                projectId
            },
            transports: ["websocket"], // Force WebSocket transport
        });

        socketInstance.on("connect", () => {
            console.log("user conected form frontend");
        });

        socketInstance.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
        });
    }

    return socketInstance;
};

export const getSocketInstance = () => {
    if (!socketInstance) {
        throw new Error("Socket not initialized. Call initializeSocket first.");
    }
    return socketInstance;
};

export const receiveMessage = (eventName , cb ) =>{
    socketInstance.on(eventName, cb);
}

export const sendMessage = (eventName, data) => {
    socketInstance.emit(eventName, data);
};