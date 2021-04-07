import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import Styles from './main.module.css'

const Main = ({ firebaseAuth }) => {
    const history= useHistory();
    
    const logout = () => {
        firebaseAuth.logout();
    }

    useEffect(() => {
        firebaseAuth.authChanged(user => {
            if(!user){
                history.push('/');
            }
        })
    })
    
    return(
        <main>
            this is main
            <button onClick={logout}>Logout</button>
        </main>
    )  
};

export default Main;