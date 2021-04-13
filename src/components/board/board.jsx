import React, { useEffect, useState } from 'react';
import { Route, Router, Switch, useHistory } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import Styles from './board.module.css';
import BoardCards from './boardCards/boardCards';
import Edit from './edit/edit';
import Pages from './pages/pages';
import View from './view/view';
import Write from './write/write';

const Board = ({firebaseAuth, database }) => {
    const history = useHistory();
    const historyState = history.location.state;
    const [cards, setCards] = useState({})
    const [boardId, setBoardId] = useState(historyState && historyState.id)
    const [boardDisplayName, setBoardDIsplayName] = useState(historyState && historyState.displayName)
    console.log(`boardID: ${boardId}`)

    const getEndCard = () => {
        database.loadEndElem(value => setEndCard(value))

        // 중요!!!!) 얘는 비동기라, 한번에 잡아야하네, 불러 낸뒤 
        // then으로 이어주지 않는다면 휘발해버린다! 그러니 한번에 함수 실행시키든지 해야함
}

    const [endCard, setEndCard] = useState()
    const [cardsLength, setCardsLength] = useState();
    const [buttons, setButtons] = useState([]);



    const writeCards = (writeCard) => {
        const addTo = {...cards};
        addTo[writeCard.id] = writeCard;
        database.saveCard('board', writeCard)
        setCards(addTo);
        
    }

    const loadCards = () => {
        database.firstPage((value) => {
            value && setCards(value)
            }
        )
    }

    const getButtons = () => {
        setButtons(
            (buttons) => {
                const temp = [];
                const btnNum = Math.round(cardsLength/19)
                for(let i = 1; i < btnNum+2; i++){
                    temp.push(i);
                }
                return temp;
            }
            )
    }

    const onClickPageBtn = (event) => {
       history.push(
           {pathname:`/board/page=${event.currentTarget.textContent}`,
            state:{
                id: boardId,
                displayName:boardDisplayName
        }})
        

        const num = Number(event.currentTarget.textContent)
        database.loadPage(num,
            (value) => {
                value && setCards(value)
            })
    }

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


    useEffect(() => {
        console.log('load cards!')
        loadCards()
    }, [])

    useEffect(() => {
        getButtons()
    }, [cardsLength])

    useEffect(() => {
        getEndCard()
    },[])

    useEffect(() => {
        endCard && setCardsLength(endCard[Object.keys(endCard)[0]].cardNum)
    }, [endCard])



    useEffect(() => {
        firebaseAuth.authChanged(user => {
            if(!user){
                history.push('/');
            }
        })
    })

    // const loadPageCards = (button) => {
    //     const startNum = button-1;
    //     const endNum = button*19;
    //     database.loadPage(
    //         startNum, endNum,
    //         (value) => {
    //         value && setCards(value)
    //         value && setCardsLength(Object.keys(value).length)
    //     })
    // }

    // const onClickPageBtn = (event) => {
    //     loadPageCards(event.currentTarget.textcontent);

    // }


    console.log(`cardLength : ${cardsLength}`)
    console.log(`buttons:${buttons}`)



    return(
        <>
        <Header 
            firebaseAuth={firebaseAuth}
            userId={boardId}
            displayName={boardDisplayName}
            database={database}
        />
        
        
            <div className={Styles.board}>
                <div className={Styles.boardHeader}>
                    <div className={Styles.boardTitle}>
                        <i className={`fas fa-file-alt ${Styles.boardTitleIcon}`}></i>  
                        게시판
                    </div>
                    <div className={Styles.headerBtns}>
                        <Link to="/board/write">
                                    <button className={Styles.writeBtn}>
                                        <i className={`fas fa-pen ${Styles.writeIcon}`}></i>
                                    글쓰기</button>
                        </Link>
                    </div>
                    <div className={Styles.headerDivider}></div>
                </div>
                <Route path='/board' exact>
                    <ul className={Styles.boardCardList}>
                    <div className={Styles.index}>
                            <div className={Styles.cardNum}>번호</div>
                            <div className={Styles.cardTitle}>제목</div>
                            <div className={Styles.cardAuthor}>작성자</div>
                            <div className={Styles.cardDate}>작성일</div>
                            <div className={Styles.cardViews}>조회수</div>
                            <div className={Styles.cardStar}>추천수</div>
                        </div>
                    <div className={Styles.boardCards}>
                        <BoardCards 
                            cards={cards}
                            boardId={boardId}
                            updateViews={updateViews}
                            addViews={addViews}
                        />
                        </div>
                        <div className={Styles.boardBtn}>
                                <Link to="/board/write">
                                    <button className={Styles.writeBtn}>
                                        <i className={`fas fa-pen ${Styles.writeIcon}`}></i>
                                    글쓰기</button>
                                </Link>
                        </div>
                        <div className={Styles.pages}>
                            {buttons && buttons.map(button => (
                                <button onClick={onClickPageBtn}>
                                    {button}
                                </button>
                            ))}
                        </div>
                    </ul>
                </Route>

                {buttons && buttons.map(button => (
                    <Route path={`/board/page=${button}`} exact>
                        <ul className={Styles.boardCardList}>
                        <div className={Styles.index}>
                                <div className={Styles.cardNum}>번호</div>
                                <div className={Styles.cardTitle}>제목</div>
                                <div className={Styles.cardAuthor}>작성자</div>
                                <div className={Styles.cardDate}>작성일</div>
                                <div className={Styles.cardViews}>조회수</div>
                                <div className={Styles.cardStar}>추천수</div>
                            </div>
                        <div className={Styles.boardCards}>
                            <BoardCards 
                                cards={cards}
                                boardId={boardId}
                                updateViews={updateViews}
                                addViews={addViews}
                            />
                            </div>
                            <div className={Styles.boardBtn}>
                                    <Link to="/board/write">
                                        <button className={Styles.writeBtn}>
                                            <i className={`fas fa-pen ${Styles.writeIcon}`}></i>
                                        글쓰기</button>
                                    </Link>
                            </div>
                            <div className={Styles.pages}>
                            {buttons && buttons.map(button => (
                                <button onClick={onClickPageBtn}>
                                    {button}
                                </button>
                            ))}
                        </div>
                        </ul>
                    </Route>
                
                ))}





                {Object.keys(cards).map(key=> (
                    <Route path={`/board/view&id=${key}`} exact>
                        { historyState && <View 
                            key={key}
                            card={cards[key]}
                            database={database}
                            firebaseAuth={firebaseAuth}
                        />}
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
                                    cardsLength = {cardsLength}
                                    loadCards = {loadCards}
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