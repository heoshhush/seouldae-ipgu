import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Footer from '../footer/footer';
import Header from '../header/header';
import Styles from './main.module.css'

const Main = ({ firebaseAuth }) => {
    const history = useHistory();
    const historyState = history.location.state;
    const [userId, setUserId] = useState(historyState && historyState.id)
    console.log(`main: ${userId} / ${historyState}`)

    useEffect(() => {
        firebaseAuth.authChanged(user => {
            if(!user){
                history.push('/');
            }
        })
    })
    
    return(
        <main>
            <Header 
                firebaseAuth={firebaseAuth}
                userId={userId}
            />
            <section className={Styles.section}>
            </section>
            <Footer />
        </main>
    )  
};

export default Main;