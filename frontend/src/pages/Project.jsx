import React, { useEffect, useState, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import SelectUser from "@/dialog/SelectUser";
import axios from "@/config/axios";
import { initializeSocket, receiveMessage, sendMessage } from "@/config/socket";
import { userContext } from "../contextApi/User.context";
import Markdown from 'markdown-to-jsx'
import hljs from 'highlight.js';

function SyntaxHighlightedCode(props) {
    const ref = useRef(null)

    React.useEffect(() => {
        if (ref.current && props.className?.includes('lang-') && window.hljs) {
            window.hljs.highlightElement(ref.current)

            // hljs won't reprocess the element unless this attribute is removed
            ref.current.removeAttribute('data-highlighted')
        }
    }, [ props.className, props.children ])

    return <code {...props} ref={ref} />
}






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
    const [fileTree,setFileTree] = useState({})
    const  [currentFile, setCurrentFile] = useState(null)
    const [openFiles, setOpenFiles] = useState([])

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
    function WriteAiMessage(message) {
        let messageObject = {};
    
        try {
            // Check if message is a valid JSON string and parse it
            if (typeof message === 'string' && message.trim().startsWith("{") && message.trim().endsWith("}")) {
                messageObject = JSON.parse(message);  // Parse the message if it's valid JSON
            } else {
                console.warn("Received message is not a valid JSON string:", message);
                messageObject.text = message;  // If not JSON, assume it's plain text
            }
        } catch (error) {
            console.error("Error parsing message:", error);
            messageObject.text = "Failed to parse message";  // Provide a fallback message
        }
    
        // Return the message in a styled div with Markdown rendering
        return (
            <div className="overflow-auto bg-slate-950 text-white rounded-sm p-2">
                <Markdown
                    children={messageObject.text}
                    options={{
                        overrides: {
                            code: SyntaxHighlightedCode,  // Ensure you have this component for code highlighting
                        },
                    }}
                />
            </div>
        );
    }
    

    const handleSendMsg = (e) => {
        if (e.key === "Enter" && msg !== "") {
            sendMsg();
        }
    };

    useEffect(() => {
        initializeSocket(location.state?.project._id);

        receiveMessage("project-message", (data) => {
            appendIncomingMessage(data);
            const message = JSON.parse(data.message);
            console.log(message);
            
            if(message.fileTree){
                setFileTree(message.fileTree)
               
            }
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

                <div className="conversation-area pt-6  flex-grow flex flex-col h-full relative ">

                    <div
                        ref={messagebox}
                        className="message-box p-2 flex-grow flex flex-col gap-3 overflow-auto max-h-full scrollbar-hide">
                        {messages.map((msg, index) => (
                            <div
                            key={index}
                            className={`${msg.sender._id === 'ai' ? 'max-w-80' : 'max-w-64'} 
                                ${msg.sender._id === user._id.toString() ? 'ml-auto bg-red-200' : 'bg-gray-200'} 
                                message flex flex-col p-2  rounded-md w-fit px-4`}>
                            <small className='opacity-65 text-xs'>{msg.sender.userName}</small>
                            <div className='text-sm'>
                                {msg.sender._id === 'ai' ? (
                                    WriteAiMessage(msg.message)
                                ) : (
                                    <p>{msg.message}</p>
                                )}
                            </div>
                        </div>
                        ))}
                    </div>

                    <div className="input-box w-full flex  border h-12 border-gray-400">
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
            <section className="right bg-slate-500 flex-grow h-full flex">
                <div className="explorer h-full w-56 max-w-56 bg-red-300 p-2">
                    <div className="file-tree flex flex-col gap-2">
                        {
                            Object.keys(fileTree).map((key,index) =>{
                                return (
                                    <button 
                                        key={index}
                                        onClick={() => {
                                            setCurrentFile(key)
                                            setOpenFiles([...new Set([...openFiles,key])])
                                        }}
                                        className="tree-ele flex items-center gap-2 w-full  bg-red-300 justify-center border-2 rounded-sm shadow-xl hover:shadow-md">
                                    
                                        <h3 className="cursor-pointer font-semibold text-xl
                                        text-white p-3">
                                            {key}
                                        </h3>

                                </button>

                                )
                            })
                        }
                    </div>
                </div>
                {currentFile && (
                    <div className="code-editor flex flex-grow flex-col h-full">
                    <div className="top flex flex-row h-12">
                       {
                        openFiles.map((file, index) => (
                            <button
                                onClick={() => setCurrentFile(file)}
                                className={`flex items-center p-2 w-fit max-w-52 justify-center  ${currentFile === file ? 'bg-slate-700' : ''} `}
                            >
                                <h1 className="cursor-pointer font-semibold text-xl text-white">{file}</h1>
                                {/* <button
                                    onClick={(e) =>{
                                        setOpenFiles((prev) => prev.filter((item) => item !== file))
                                        
                                    }}
                                 className="ml-2 mt-1">
                                    <i className="ri-close-fill text-white text-2xl"></i>
                                </button> */}
                            </button>
                        ))
                       }
                    </div>
                    <div className="bottom flex flex-grow">
                        {
                            fileTree[currentFile] && (
                                <textarea
                                    onChange={(e) =>{
                                        setFileTree((prev) => ({
                                            ...prev,
                                            [currentFile]: {
                                                ...prev[currentFile],
                                                content: e.target.value
                                            }
                                        }))
                                    }}
                                 className="w-full h-full bg-gray-900 text-white p-2"  value={fileTree[currentFile].file.contents}></textarea>
                            )
                        }
                    </div>
                    </div>
                )}

            </section>

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
