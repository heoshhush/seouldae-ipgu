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
    console.log(`boardDPName: ${boardDisplayName}`)
    console.log(`boardID : ${boardId}`)
    
    firebaseAuth.authChanged(user => {
        if(user){
            setBoardId(user.uid);
            setBoardDIsplayName(user.displayName);
    }})

    //보드 새로불러오기 

    const getEndCard = () => {
        database.loadEndElem(value => setEndCard(value))

        // 중요!!!!) 얘는 비동기라, 한번에 잡아야하네, 불러 낸뒤 
        // then으로 이어주지 않는다면 휘발해버린다! 그러니 한번에 함수 실행시키든지 해야함
}

    
    const [endCard, setEndCard] = useState()
    const [cardsLength, setCardsLength] = useState();
    const [buttons, setButtons] = useState([]);
    const [nCommentLength, setNCommentLength] = useState(0);

    const getState = (card) => {
        return {
            id: card.id,
            cardNum: card.cardNum,
            userId: card.userId,
            nickname: card.nickname,
            title: card.title,
            text: card.text,
            imgName: card.imgName,
            imgURL: card.imgURL,
            date: card.date,
            star: card.star,
            views: card.views,
            whoClicked: card.whoClicked,
            whoViews: card.whoViews,
            comment: card.comment,
        }
    }
    const onClickCard = (URL, history, card) => {
        history.push({
            pathname:`${URL}`,
            state: getState(card)
        })
    }
    
    const onClickWrite = () => {
        history.push({
            pathname:'/board/write',
            state: {
                cardsLength: cardsLength,
                userId: boardId,
                nickname: boardDisplayName,
            }
        })
    }

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
                const btnNum = Math.floor(cardsLength/19)
                if(btnNum > 9){
                    return [1,2,3,4,5,6,7,8,9,10]
                } else {
                for(let i = 1; i < btnNum+2; i++){
                    temp.push(i);
                }
                    return temp;
                }
                
            }
            )
    }

    const nextPrevBtnLoad = (moveToPage) => {
        history.push(
            {pathname:`/board/page=${moveToPage}`,
             state:{
                 id: boardId,
                 displayName:boardDisplayName,
         }})
         const endNum = cardsLength - 19 * (Number(moveToPage) - 1)
         const startNum = cardsLength - 19 * (Number(moveToPage)) + 1 
         database.loadPage(startNum, endNum, 
            (value) => {
                value && setCards(value)
            })
    }
    
    const onClickPageBtn = (event) => {
        nextPrevBtnLoad(event.currentTarget.textContent)

    //    history.push(
    //        {pathname:`/board/page=${event.currentTarget.textContent}`,
    //         state:{
    //             id: boardId,
    //             displayName:boardDisplayName,
    //     }})
        
    //     const btnNum = Number(event.currentTarget.textContent);
    //     const endNum = cardsLength - 19 * (btnNum - 1)
    //     const startNum = cardsLength - 19 * (btnNum) + 1

    //     database.loadPage(startNum, endNum,
    //         (value) => {
    //             value && setCards(value)
    //         })


    }


    const onClickNextBtn = () => {
        const tempBtns = buttons;
        const nextBtns = tempBtns.map(btn => btn+10)
        .filter(btn => btn < Math.floor(cardsLength/19)+2)
        setButtons(nextBtns)
        
        const moveToPage = buttons[9]+1
        nextPrevBtnLoad(moveToPage);
    }
    const onClickPrevBtn = () => {
            const tempBtns = [];
            for(let i = 0; i < 10; i++){
                tempBtns.push(buttons[0]+i)
            }
            const prevBtns = tempBtns.map(btn => btn-10)
            setButtons(prevBtns)

            const moveToPage = buttons[0]-1
            nextPrevBtnLoad(moveToPage);
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
                    
                    
                    <div className={Styles.headerDivider}></div>
                </div>
                <Route path='/board' exact>
                        <div className={Styles.headerBtns}>
                                    <button 
                                        onClick={onClickWrite}
                                        className={Styles.writeBtn}>
                                        <i className={`fas fa-pen ${Styles.writeIcon}`}></i>
                                    글쓰기</button>
                        </div>
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
                            onClickCard={onClickCard}
                        />
                        </div>
                        <div className={Styles.boardBtn}>
                                    <button 
                                    onClick={onClickWrite}
                                    className={Styles.writeBtn}>
                                        <i className={`fas fa-pen ${Styles.writeIcon}`}></i>
                                    글쓰기</button>
                        </div>
                        <div className={Styles.pages}>
                            {buttons[0] !== 1 && <button onClick={onClickPrevBtn} className={Styles.prevBtn}>
                                 <i className={`fas fa-chevron-left ${Styles.prevBtnIcon}`}></i>
                            </button>}
                            {buttons && buttons.map(button => (
                                <button 
                                className={`${Styles.pageBtn}`}
                                onClick={onClickPageBtn}
                                
                                >
                                    {button}
                                </button>
                            ))}
                            {buttons.length === 10 && <button onClick={onClickNextBtn} className={Styles.nextBtn}>
                                <i className={`fas fa-chevron-right ${Styles.nextBtnIcon}`}></i>
                            </button>}
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
                                onClickCard={onClickCard} 
                                cards={cards}
                                boardId={boardId}
                                updateViews={updateViews}
                                addViews={addViews}
                            />
                            </div>
                            <div className={Styles.boardBtn}>
                                        <button className={Styles.writeBtn}
                                            onClick={onClickWrite}>
                                            <i className={`fas fa-pen ${Styles.writeIcon}`}></i>
                                        글쓰기</button>
                            </div>

                            <div className={Styles.pages}>
                            {buttons[0] !== 1 && <button onClick={onClickPrevBtn} className={Styles.prevBtn}>
                                 <i className={`fas fa-chevron-left ${Styles.prevBtnIcon}`}></i>
                            </button>}

                            {buttons && buttons.map(button => (
                                <button 
                                    className={`${Styles.pageBtn}`}
                                    onClick={onClickPageBtn}>
                                        {button}
                                </button>
                            ))}
                            {buttons.length === 10 && <button onClick={onClickNextBtn} className={Styles.nextBtn}>
                                <i className={`fas fa-chevron-right ${Styles.nextBtnIcon}`}></i>
                            </button>}
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
                            userId={boardId}
                            displayName={boardDisplayName}
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
                                    getEndCard = {getEndCard}
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