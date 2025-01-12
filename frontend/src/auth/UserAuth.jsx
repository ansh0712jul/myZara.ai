import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../contextApi/User.context';

const UserAuth = ({ children }) => {
    const { user } = useContext(userContext);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || !user) {
            navigate('/login');
        } else {
            setLoading(false);
        }
    }, [token, user, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default UserAuth;
