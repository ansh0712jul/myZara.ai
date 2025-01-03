import socket from 'socket.io-client';


let socketInstance = null;


export const initializeSocket = (projectId) => {   
    console.log('initializing socket');
    console.log(projectId);

    socketInstance = socket("localhost:8078", {
        auth: {
            token: localStorage.getItem('token')
        },
        query: {
            projectId   
        }
    });

    return socketInstance;

}

export const receiveMessage = (eventName,cb) => {
    socketInstance.on(eventName,cb);
}

export const sendMessage = (eventName,data) => {
    socketInstance.emit(eventName,data);
}