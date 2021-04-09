import React, { useEffect, useState } from 'react';
import { Route, Router, Switch, useHistory } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import BoardCard from './board-card/boardCard';
import Styles from './board.module.css';
import View from './view/view';
import Write from './write/write';

const Board = ({firebaseAuth}) => {
    const history = useHistory();
    const historyState = history.location.state.id;
    console.log(`board: ${historyState}`)

    const [cards, setCards] = useState({
        1:{
            id: 1,
            userId: historyState,
            nickname: 'kim',
            title: 'title1',
            text: 'wow~',
            imgName: 'heo',
            imgURL: 'heo.heo.com'
        },
        2:{
            id: 2,
            userId: historyState,
            nickname: 'heo',
            title: 'title2',
            text: 'wow2',
            imgName: 'heo',
            imgURL: 'heo.heo.com'
        },
        3:{
            id: 3,
            userId: historyState,
            nickname: 'park',
            title: 'title3',
            text: 'wow3',
            imgName: 'heo',
            imgURL: 'heo.heo.com'
        }
    })

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
        setCards(addTo);
    }

    return(
        <>
        <Header 
            firebaseAuth={firebaseAuth}
            userId={historyState}
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
                        />
                    </Route>
                ))
                }
                
                <div>
                    <Route path="/board/write">
                        <Write 
                            writeCards = {writeCards}
                            userId = {historyState}
                        />
                    </Route>
                </div>
                
                
                </div>
                

                    
                
            
        <Footer />
        </>
    )
}

export default Board;