import React, {useContext, useEffect, useState} from 'react'
import { userContext } from '@/contextApi/User.context'
import { useNavigate } from 'react-router-dom'
const UserAuth = ({childern}) => {

    const {user} = useContext(userContext)
    const navigate = useNavigate();

    const [loading , setLoading] = useState(true);

    const token = localStorage.getItem('token');

    

    useEffect(() => {
        if(user){
            setLoading(false);
        }
        if(!token || !user){
            navigate('/login');
        }
    },[])

    if(loading){
        return <h1> Loading ..</h1>
    }
  return (
    <>
        {childern}
    </>
  )
}

export default UserAuth