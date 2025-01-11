import React, { useEffect, useState, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import SelectUser from "@/dialog/SelectUser";
import axios from "@/config/axios";
import { initializeSocket, receiveMessage, sendMessage } from "@/config/socket";
import { userContext } from "../contextApi/User.context";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism"; // Import a code style



const Project = () => {
    const location = useLocation();
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userList, setUserList] = useState([]);
    const [projectUsers, setProjectUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");
    const { user } = useContext(userContext);
    const messagebox = useRef(null);

    const sendMsg = () => {
        const messageObject = {
            sender: user,
            message: msg,
        };
        sendMessage("project-message", messageObject);
        appendOutgoingMessage(messageObject);
        setMsg("");
    };

    const appendIncomingMessage = (messageObject) => {
        setMessages((prevMessages) => [...prevMessages, messageObject]);
        scrollToBottom();
    };

    const appendOutgoingMessage = (messageObject) => {
        setMessages((prevMessages) => [...prevMessages, messageObject]);
        scrollToBottom();
    };

    const scrollToBottom = () => {
        messagebox.current.scrollTop = messagebox.current.scrollHeight;
    };

    const handleSendMsg = (e) => {
        if (e.key === "Enter" && msg !== "") {
            sendMsg();
        }
    };

    useEffect(() => {
        initializeSocket(location.state?.project._id);

        receiveMessage("project-message", (data) => {
            appendIncomingMessage(data);
            console.log(data);
        });

        axios
            .get(`${import.meta.env.VITE_BASE_URL}/projects/get-project/${location.state?.project._id}`)
            .then((res) => {
                if (res.data?.message?.usersInvolved) {
                    setProjectUsers(res.data.message.usersInvolved);
                }
            })
            .catch(console.error);

        axios
            .get(`${import.meta.env.VITE_BASE_URL}/user/all`)
            .then((res) => setUserList(res.data.message))
            .catch(console.error);
    }, []);

    return (
        <main className="h-screen w-screen flex">
            <section className="left-section flex flex-col h-full min-w-[400px] bg-gray-600">
                <header className="w-full h-14 p-2 px-4 flex items-center justify-between bg-gray-300">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex gap-1 items-center text-black text-xl font-bold"
                        aria-label="Add Collaborator"
                    >
                        <i className="ri-link text-xl"></i> Add Collaborator
                    </button>
                    <button onClick={() => setIsPanelOpen(!isPanelOpen)} aria-label="Toggle Panel">
                        <i className="ri-user-2-fill text-2xl relative">
                            <span className="absolute bottom-3 left-1/2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {location.state?.project.usersInvolved.length}
                            </span>
                        </i>
                    </button>
                </header>

                <div className="conversation-box flex-grow flex flex-col max-h-full overflow-scroll scrollbar-hidden">
                    <div ref={messagebox} className="message-box flex flex-grow flex-col p-4 gap-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${
                                    msg.sender._id === user._id
                                        ? "outgoing ml-auto bg-red-300 text-black"
                                         : msg.sender._id === "ai"
                                        ? "incoming mr-auto bg-black text-white"
                                        : "incoming mr-auto bg-gray-200 text-black"
                                } max-w-64 w-fit p-2 px-4 rounded-sm flex flex-col break-words`}
                            >
                                <small className="opacity-50 text-xs">{msg.sender.userName}</small>
                                <Markdown
                                    options={{
                                        overrides: {
                                            code: {
                                                component: SyntaxHighlighter,
                                                props: {
                                                    style: solarizedlight,
                                                    language: "javascript",
                                                },
                                            },
                                        },
                                    }}
                                >
                                    {msg.message}
                                </Markdown>
                            </div>
                        ))}
                    </div>

                    <div className="input-box w-full flex border h-12 border-gray-400">
                        <input
                            onChange={(e) => setMsg(e.target.value)}
                            onKeyDown={handleSendMsg}
                            type="text"
                            value={msg}
                            placeholder="Enter your message"
                            className="px-4 border-4 outline-none w-[85%]"
                        />
                        <button onClick={sendMsg} className="flex-grow bg-black text-white h-full" aria-label="Send Message">
                            <i className="ri-send-plane-line text-2xl"></i>
                        </button>
                    </div>
                </div>
            </section>

            {isPanelOpen && (
                <div
                    className="side-panel w-[400px] h-full max-h-full bg-slate-500 absolute top-0 left-0 overflow-y-scroll scrollbar-hidden transition-all duration-300 ease-in-out"
                    style={{
                        transform: isPanelOpen ? "translateX(0)" : "translateX(-100%)",
                    }}
                >
                    <header className="w-full h-14 p-2 px-4 flex items-center justify-between bg-gray-300 sticky top-0">
                        <h1 className="text-2xl font-bold">Collaborators</h1>
                        <button
                            onClick={() => setIsPanelOpen(false)}
                            className="text-white"
                            aria-label="Close Panel"
                        >
                            <i className="ri-close-large-fill text-2xl"></i>
                        </button>
                    </header>

                    <div className="users flex flex-col gap-3 mt-7   ">
                    {projectUsers.map((user, index) => (
                            <div
                                key={index}
                                className="user h-12 mx-auto rounded-lg w-4/5 p-2 px-4 bg-slate-50 flex items-center gap-2"
                            >
                                <div className="h-8 w-8 bg-gray-700 rounded-full text-white p-1 flex items-center justify-center">
                                    <i className="ri-user-follow-fill text-xl"></i>
                                </div>
                                <h3 className="text-sm">{user.email}</h3>
                            </div>
                        ))}
                    </div>

                </div>
            )}

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
