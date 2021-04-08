import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import Footer from '../footer/footer';
import Header from '../header/header';
import Styles from './main.module.css'

const Main = ({ firebaseAuth }) => {
    const history= useHistory();
    
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
            />
            <section className={Styles.section}>
            </section>
            <Footer />
        </main>
    )  
};

export default Main;