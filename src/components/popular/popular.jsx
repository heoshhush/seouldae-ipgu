import React from 'react';
import Styles from './popular.module.css'
import Footer from '../footer/footer';
import Header from '../header/header';

const Popular = (props) => {
    return(
        <>
        <Header />
        <div className={Styles.popular}>
            popular
        </div>
        <Footer />
        </>
    )
}

export default Popular;