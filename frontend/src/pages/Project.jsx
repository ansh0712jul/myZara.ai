import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SelectUser from '@/dialog/SelectUser';
import axios from '@/config/axios';


const Project = () => {
    const location = useLocation();
    // console.log(location.state);

    //for set Side panel 
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    // for set Select Use Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [user, Setuser] = useState([]);

    // for getting userInvolved in project collection 
    const [project, setProject] = useState([]);

    // fetching all users 
   useEffect( () =>{
    axios.get(`${import.meta.env.VITE_BASE_URL}/projects/get-project/${location.state.project._id}`)
    .then(res => {
        setProject(res.data.message.usersInvolved);
    })
    .catch((err) => console.log(err));
    axios.get(`${import.meta.env.VITE_BASE_URL}/user/all`)
    .then(res => { 
        Setuser(res.data.message);
        // console.log(user);

    })
    .catch((err) => console.log(err));
   },[])





  return (
    <main className='h-screen w-screen flex'>
        <section className='left-section relative flex flex-col h-full min-w-[400px] bg-gray-600'>
           <header className='w-full h-14 p-2 px-4 flex items-center justify-between bg-gray-300'>
           <button 
                onClick={() => setIsModalOpen(true)}
                className='flex gap-1 items-center text-white'>
                <i className="ri-link text-xl"></i>
                Add Collaborator 
            </button>

            <button
            // toggling the panel
                onClick={() => setIsPanelOpen(!isPanelOpen)}
                >
                    <i className="ri-user-2-fill text-2xl "></i>
                </button> 
            
           </header>
           <div className='conversation-box flex-grow flex flex-col'>
            <div className='message-box flex flex-grow flex-col p-4 gap-4'>
                <div className="incoming message max-w-60  w-fit bg-red-50 p-2 px-4 rounded-sm flex flex-col  
                ">
                <small className='opacity-50 text-xs'>username</small>
                <p className='text-sm'> Lorem ipsum dolor sit. Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur.</p>
                </div>
                <div className="outgoing ml-auto max-w-60 w-fit  bg-gray-200 p-2 px-4 rounded-sm flex flex-col">
                <small className='opacity-50  text-xs'>Username</small>
                <p className='text-sm'>Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur .</p>
                </div>
            </div>
            <div className='input-box w-full flex border border-gray-400  '>
                <input type="text " placeholder='Enter your message' className='  p-2 px-4 border-none outline-none w-[85%]'  />
                <button className='flex-grow bg-white'><i className="ri-send-plane-line text-2xl"></i></button>
            </div>
           </div>

            {/* side panel  */}
           <div className={`w-full h-full bg-slate-500 absolute top-0 left-0 ${isPanelOpen ? 'block' : 'hidden'}`}>
                <header className='w-full h-14 p-2 px-4 flex items-center justify-end bg-gray-300 g'>
                    <button
                        onClick={() => setIsPanelOpen(!isPanelOpen)}
                        className=' text-white'
                        ><i className="ri-close-large-fill text-2xl"></i>
                    </button>
                </header>
                <div className='users flex flex-col gap-3 mt-7'>
                    {
                        project.map((user,index) =>{
                            return (
                                <div key={index} className="user h-12 
                        mx-auto rounded-lg  
                        w-4/5 p-2 px-4 bg-slate-50 flex items-center gap-2">
                        <div className='h-8 w-8 bg-gray-700 rounded-full text-white p-1 flex items-center justify-center'>
                        <i className="ri-user-follow-fill text-xl"></i>
                        </div>
                        <h3 className='text-sm'>{user.email}</h3>

                    </div>
                            )
                        })
                    }
                </div>
                
           </div>

        </section>
        
        
            {/* Modal for SelectUser */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 text-white text-xl">
                            <i className="ri-close-fill"></i>
                        </button>
                            <SelectUser  onClose={() => setIsModalOpen(false)} user={user} location={location} />
                    </div>
                </div>
            )}

        
        

    </main>
   
  )
}

export default Project