import React, { useEffect, useState, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import SelectUser from "@/dialog/SelectUser";
import axios from "@/config/axios";
import { initializeSocket, receiveMessage, sendMessage} from "../config/socket";
import { userContext } from "../contextApi/User.context";

const Project = () => {
    const location = useLocation();
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userList, setUserList] = useState([]);
    const [projectUsers, setProjectUsers] = useState([]);
    const [messages, setMessages] = useState([]); // Fixed initial state to an array
    const [msg, setMsg] = useState("");
    const { user } = useContext(userContext);
    const messageBoxRef = useRef(null);

    const sendmsg = () => {
        console.log(user);
        sendMessage("project-message", {
            message: msg,
            sender: user._id,
        }); 
        setMessages([...messages, { message: msg, sender: user }]);
    }

    useEffect(() => {
       
        initializeSocket(location.state?.project._id);


        receiveMessage("project-message", (data) => {
            console.log(data);
        });


        axios
            .get(`${import.meta.env.VITE_BASE_URL}/projects/get-project/${location.state?.project._id}`)
            .then((res) => {
                if (res.data?.message?.usersInvolved) {
                    setProjectUsers(res.data.message.usersInvolved);
                }
                if (Array.isArray(res.data?.messages)) {
                    setMessages(res.data.messages);
                }
            })
            .catch(console.error);

        axios
            .get(`${import.meta.env.VITE_BASE_URL}/user/all`)
            .then((res) => setUserList(res.data.message))
            .catch(console.error);

        return () => {
            socket.disconnect();
        };
    }, [location.state?.project._id]);

    return (
        <main className="h-screen w-screen flex">
            <section className="left-section flex flex-col h-full min-w-[400px] bg-gray-600">
                {/* Header */}
                <header className="w-full h-14 p-2 px-4 flex items-center justify-between bg-gray-300">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex gap-1 items-center text-white"
                        aria-label="Add Collaborator"
                    >
                        <i className="ri-link text-xl"></i> Add Collaborator
                    </button>
                    <button onClick={() => setIsPanelOpen(!isPanelOpen)} aria-label="Toggle Panel">
                        <i className="ri-user-2-fill text-2xl"></i>
                    </button>
                </header>

                {/* Messages */}
                <div className="conversation-box flex-grow flex flex-col">
                    <div ref={messageBoxRef} className="message-box flex flex-grow flex-col p-4 gap-4 overflow-y-auto">
                        {Array.isArray(messages) &&
                            messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`message ${msg.type === "incoming" ? "bg-red-50" : "bg-gray-200"} p-2 px-4 rounded-sm`}
                                >
                                    <small className="opacity-50 text-xs">{msg.sender?.userName}</small>
                                    <p className="text-sm">{msg.message}</p>
                                </div>
                            ))}
                    </div>

                    {/* Input */}
                    <div className="input-box w-full flex border border-gray-400">
                        <input
                            onChange={(e) => setMsg(e.target.value)}
                            type="text"
                            value={msg}
                            placeholder="Enter your message"
                            className="p-2  px-4 border-none outline-none w-[85%]"
                        />
                        <button onClick={sendmsg}  className="flex-grow bg-white" aria-label="Send Message">
                            <i className="ri-send-plane-line text-2xl"></i>
                        </button>
                    </div>
                </div>
            </section>

            {/* Side Panel */}
            {isPanelOpen && (
                <div className="side-panel w-full h-full bg-slate-500 absolute top-0 left-0">
                    <header className="w-full h-14 p-2 px-4 flex items-center justify-end bg-gray-300">
                        <button
                            onClick={() => setIsPanelOpen(false)}
                            className="text-white"
                            aria-label="Close Panel"
                        >
                            <i className="ri-close-large-fill text-2xl"></i>
                        </button>
                    </header>
                    <div className="users flex flex-col gap-3 mt-7">
                        {projectUsers.map((user, index) => (
                            <div key={index} className="user h-12 mx-auto rounded-lg w-4/5 p-2 px-4 bg-slate-50 flex items-center gap-2">
                                <div className="h-8 w-8 bg-gray-700 rounded-full text-white p-1 flex items-center justify-center">
                                    <i className="ri-user-follow-fill text-xl"></i>
                                </div>
                                <h3 className="text-sm">{user.email}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 text-white text-xl"
                            aria-label="Close Modal"
                        >
                            <i className="ri-close-fill"></i>
                        </button>
                        <SelectUser onClose={() => setIsModalOpen(false)} user={userList} location={location} />
                    </div>
                </div>
            )}
        </main>
    );
};

export default Project;
