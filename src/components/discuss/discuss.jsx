import React from 'react';
import Styles from './discuss.module.css'
import Footer from '../footer/footer';
import Header from '../header/header';

const Discuss = (props) => {
    return(        
        <>
        <Header />
        <div className={Styles.discuss}>
            Discuss
        </div>
        <Footer />
        </>
    )
}

export default Discuss;