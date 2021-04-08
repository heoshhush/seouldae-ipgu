import React, { useEffect } from 'react';
import Styles from './dish.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';
import { useHistory } from 'react-router';

const Dish = ({firebaseAuth}) => {
    const history = useHistory();
    const historyState = history.location.state.id;
    console.log(`dish : ${historyState}`)

    return(
        <>
        <Header 
            firebaseAuth={firebaseAuth}
            userId={historyState}
        />
        <div className={Styles.dish}>
            dish
        </div>
        <Footer />
        </>
    )
}

export default Dish;