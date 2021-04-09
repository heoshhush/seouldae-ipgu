import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Footer from '../footer/footer';
import Header from '../header/header';
import Leftside from '../leftside/leftside';
import Center from './center/center';
import Styles from './main.module.css'

const Main = ({ firebaseAuth }) => {
    const history = useHistory();
    const historyState = history.location.state;
    const [userId, setUserId] = useState(historyState && historyState.id)
    const [displayName, setDisplayName] = useState(historyState && historyState.displayName)
    console.log(`main displayName :${historyState.displayName}`)
    console.log(`main user id :${userId}`)


    useEffect(() => {
        firebaseAuth.authChanged(user => {
            if(user){
                setUserId(historyState.id)
                setDisplayName(firebaseAuth.getUserInfo().displayName)
            }
            else if(!user){
                history.push('/');
            }
        })
    },[])
    
    return(
        <main>
            <div className={Styles.header}>
                <Header 
                    firebaseAuth={firebaseAuth}
                    userId={userId}
                    displayName={displayName}
                />
            </div>
            <section className={Styles.section}>
                <Leftside 
                    firebaseAuth={firebaseAuth}
                    userId = {userId}
                    displayName = {displayName}
                />
                <Center 
                />


            </section>
            <Footer />
        </main>
    )  
};

export default Main;