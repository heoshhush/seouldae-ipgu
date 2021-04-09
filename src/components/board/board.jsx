import React, { useEffect, useState } from 'react';
import { Route, Router, Switch, useHistory } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import BoardCard from './board-card/boardCard';
import Styles from './board.module.css';
import View from './view/view';
import Write from './write/write';

const Board = ({firebaseAuth, database }) => {
    const history = useHistory();
    const historyState = history.location.state;
    const [cards, setCards] = useState({})
    const cardKeys = Object.keys(cards)

    useEffect(() => {
        firebaseAuth.authChanged(user => {
            if(!user){
                history.push('/');
            }
        })
    })

    const writeCards = (writeCard) => {
        const addTo = {...cards};
        addTo[writeCard.id] = writeCard;
        database.saveCard('board', writeCard)
        setCards(addTo);
        
    }

    const loadCards = () => {
        database.loadCard("board", (value) => {
            value && setCards(value);
        })
    }

    useEffect(() => {
        loadCards()
    }, [])


    return(
        <>
        <Header 
            firebaseAuth={firebaseAuth}
            userId={historyState.id}
            displayName={historyState.displayName}
        />
        
        
            <div className={Styles.board}>
                <div className={Styles.boardTitle}>게시판</div>
                <Route path='/board' exact>
                    <ul className={Styles.boardCardList}>
                       {Object.keys(cards).map(key=> (
                            <Link to= {`/board/view&id=${key}`}>
                                <li>
                                    <BoardCard 
                                        key={key}
                                        card={cards[key]}
                                        cardKeys={cardKeys}
                                    />
                                </li>
                            </Link>
                        ))}
                    </ul>
                    <div className={Styles.boardBtn}>
                            <Link to="/board/write">
                                <button>글쓰기</button>
                            </Link>
                    </div>
                
                </Route>
                {Object.keys(cards).map(key=> (
                    <Route path={`/board/view&id=${key}`} exact>
                        <View 
                            key={key}
                            card={cards[key]}
                            database={database}
                            loadCards={loadCards}
                            userId={historyState.id}
                        />
                    </Route>
                ))
                }
                
                <div>
                    <Route path="/board/write">
                        <Write 
                            writeCards = {writeCards}
                            database = {database}
                            userId = {historyState.id}
                            displayName = {historyState.displayName}
                        /> 
                    </Route>
                </div>
                
                
                </div>
                

                    
                
            
        <Footer />
        </>
    )
}

export default Board;