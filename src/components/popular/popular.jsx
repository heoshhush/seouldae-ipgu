import React, { useEffect, useState } from 'react';
import Styles from './popular.module.css'
import Footer from '../footer/footer';
import Header from '../header/header';
import { useHistory } from 'react-router';

const Popular = ({firebaseAuth}) => {
    const history = useHistory();
    const historyState = history.location.state
    console.log(`popular userId : ${historyState.id}`)
    console.log(`popular displayName : ${historyState.displayName}`)

    useEffect(() => {
        firebaseAuth.authChanged(user => {
            if(!user){
                history.push('/');
            }
        })
    })


    return(
        <>
        <Header 
            firebaseAuth={firebaseAuth}
            userId={historyState.id}
            displayName={historyState.displayName}
        />
        <div className={Styles.popular}>
            popular
        </div>
        <Footer />
        </>
    )
}

export default Popular;