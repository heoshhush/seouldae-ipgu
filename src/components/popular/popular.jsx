import React, { useEffect, useState } from 'react';
import Styles from './popular.module.css'
import Footer from '../footer/footer';
import Header from '../header/header';
import { useHistory } from 'react-router';

const Popular = ({firebaseAuth}) => {
    const history = useHistory();
    const historyState = history.location.state.id;
    console.log(`popular : ${historyState}`)

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
            userId={historyState}
        />
        <div className={Styles.popular}>
            popular
        </div>
        <Footer />
        </>
    )
}

export default Popular;