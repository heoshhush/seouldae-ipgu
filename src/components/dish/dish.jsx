import React from 'react';
import Styles from './dish.module.css';
import Footer from '../footer/footer';
import Header from '../header/header';

const Dish = (props) => {
    return(
        <>
        <Header />
        <div className={Styles.dish}>
            dish
        </div>
        <Footer />
        </>
    )
}

export default Dish;