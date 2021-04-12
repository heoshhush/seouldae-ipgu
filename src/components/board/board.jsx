import React, { useEffect, useState } from 'react';
import { Route, Router, Switch, useHistory } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import BoardCard from './board-card/boardCard';
import Styles from './board.module.css';
import Edit from './edit/edit';
import View from './view/view';
import Write from './write/write';

const Board = ({firebaseAuth, database }) => {
    const history = useHistory();
    const historyState = history.location.state;
    const [cards, setCards] = useState({})
    const [boardId, setBoardId] = useState(historyState && historyState.id)
    const [boardDisplayName, setBoardDIsplayName] = useState(historyState && historyState.displayName)
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

    const addViews = (card, userId) => {
        const nowWhoViews = {...card.whoViews}
        nowWhoViews[userId] = userId;
        database.whoViews(card, userId)
    }

    const updateViews = (card) => {
        database.loadCard(`board/${card.id}/whoViews`,
        (value) => {
            if(value){
                database.setViews(card, Object.keys(value).length)
            } else if (!value){
                database.setViews(card, 0);
            }
        })
    }





    return(
        <>
        <Header 
            firebaseAuth={firebaseAuth}
            userId={boardId}
            displayName={boardDisplayName}
            database={database}
        />
        
        
            <div className={Styles.board}>
                
                <Route path='/board' exact>
                    
                    <ul className={Styles.boardCardList}>
                        
                        <div className={Styles.boardBtn}>
                                <Link to="/board/write">
                                    <button className={Styles.writeBtn}>
                                        <i className={`fas fa-pen ${Styles.writeIcon}`}></i>
                                    글쓰기</button>
                                </Link>
                        </div>
                    <div className={Styles.boardCards}>
                       {Object.keys(cards).map(key=> (
                            <Link to= {`/board/view&id=${key}`}>  
                                <li>
                                    <BoardCard 
                                        key={key}
                                        userId={boardId}
                                        card={cards[key]}
                                        cardKeys={cardKeys}
                                        updateViews={updateViews}
                                        addViews={addViews}
                                    />
                                </li>
                            </Link>
                        ))}
                        </div>
                        <div className={Styles.index}>
                            <div className={Styles.cardNum}>번호</div>
                            <div className={Styles.cardTitle}>제목</div>
                            <div className={Styles.cardAuthor}>작성자</div>
                            <div className={Styles.cardDate}>작성일</div>
                            <div className={Styles.cardViews}>조회수</div>
                            <div className={Styles.cardStar}>추천수</div>
                        </div>
                        <div className={Styles.boardTitle}>게시판</div>

                    </ul>
  
                
                </Route>
                {Object.keys(cards).map(key=> (
                    <Route path={`/board/view&id=${key}`} exact>
                        <View 
                            key={key}
                            card={cards[key]}
                            database={database}
                            userId={boardId}
                            firebaseAuth={firebaseAuth}
                        />
                    </Route>
                ))
                }
                
                        <div>
                            <Route path="/board/write">
                                { historyState && <Write 
                                    writeCards = {writeCards}
                                    database = {database}
                                    userId = {historyState.id}
                                    displayName = {historyState.displayName}
                                /> } 
                            </Route>
                        </div>
                        <div>
                            <Route path="/board/edit">
                                { historyState && <Edit
                                    writeCards = {writeCards}
                                    database = {database}
                                    userId = {historyState.id}
                                    displayName = {historyState.displayName}
                                /> } 
                            </Route>
                        </div>

                
                
                </div>
                

                    
                
            
        <Footer />
        </>
    )
}

export default Board;