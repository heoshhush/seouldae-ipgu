import React from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import Styles from './board.module.css';

const Board = (props) => {
    return(
        <>
        <Header />
        <div className={Styles.board}>
            Board
        </div>
        <Footer />
        </>
    )
}

export default Board;