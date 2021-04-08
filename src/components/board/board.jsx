import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import Footer from '../footer/footer';
import Header from '../header/header';
import Styles from './board.module.css';

const Board = ({firebaseAuth}) => {
    const history = useHistory();
    const historyState = history.location.state.id;
    console.log(`board : ${historyState}`)

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
            <div className={Styles.board}>
                <div>게시판</div>

                <ul className={Styles.boardCardList}>
                    
                </ul>
            </div>
        <Footer />
        </>
    )
}

export default Board;