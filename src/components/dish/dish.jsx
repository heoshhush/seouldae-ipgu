import React, { useEffect } from 'react';
import Styles from './dish.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';
import { useHistory } from 'react-router';

const Dish = ({firebaseAuth}) => {
    const history = useHistory();
    const historyState = history.location.state
    console.log(`dish userId : ${historyState.id}`)
    console.log(`dish displayName : ${historyState.displayName}`)

    return(
        <>
        <Header 
            firebaseAuth={firebaseAuth}
            userId={historyState.id}
            displayName={historyState.displayName}
        />
        <div className={Styles.dish}>
            dish
        </div>
        <Footer />
        </>
    )
}

export default Dish;