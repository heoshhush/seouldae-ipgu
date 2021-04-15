import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ShowComment from './showComment/showComment';
import Styles from './view.module.css'
import WriteComment from './writeComment/writeComment';

const View = ({ card, database, firebaseAuth, userId, displayName }) => {
    const history = useHistory();
    const historyState = history.location.state;
    const [whoClicked, setWhoClicked] = useState(card.whoClicked)
    const [viewUserId, setUserId] = useState(card.userId)
    const [showPopUp, setShowPopUp] = useState(false)
    const [comments, setComments] = useState({})
    const [viewCard, setViewCard] = useState(historyState && historyState)
    const whoClickedView = viewCard ? viewCard.whoClicked : {};
    const whoViewsView = viewCard ? viewCard.whoViews : {};

    const getClickStar = () => {
        if(!whoClicked){
            return false;
        } else if(whoClicked){
            if(Object.keys(whoClicked).includes(viewUserId)){
                return true;
            } else if(!Object.keys(whoClicked).includes(viewUserId))
                return false;
        }
    }


    const [clickStar, setClickStar] = useState(getClickStar())
    const [star, setStar] = useState(viewCard.star)


    useEffect(() => {
        firebaseAuth.authChanged((user) => {
            setUserId(user.uid)
        })
    },[])

    const onClickDelete = () => {
        database.deleteCard('board', viewCard);
        history.push({
            pathname: '/board',
            state: {
                id: viewCard.userId,
                displayName: viewCard.nickname
            }
        })
    }

    const onClickStar = () => {
        if(!clickStar){
            addWhoClicked();
            updateStars();
            setClickStar(true);
            setShowPopUp(true);

        } else if (clickStar){
            removeWhoClicked();
            updateStars();
            setClickStar(false);
            setShowPopUp(false);
        }
    }

    const addWhoClicked = () => {
        setWhoClicked(whoClicked => {
            const nowClicked = {...whoClicked};
            nowClicked[viewUserId] = viewUserId;
            return nowClicked;
        })
        database.whoClickedStars(viewCard, viewUserId)
    }


    const updateStars = () => {
        setStar(star => {
            database.loadCard(`board/${viewCard.id}/whoClicked`, 
            (value) => {
                if(value){
                    database.setStars(viewCard, Object.keys(value).length)
                    return Object.keys(value).length
                } else if (!value){
                    database.setStars(viewCard, 0);
                    return 0;
                }
            })
        }) 
    }

    const removeWhoClicked = () => {
        setWhoClicked(whoClicked => {
            const nowClicked = {...whoClicked};
            delete nowClicked[viewUserId];
            return(nowClicked);
        })
        database.removeWhoClickedStars(viewCard, viewUserId);
    }

    const onClickEditBtn = () => {
        database.loadCard(`board/${viewCard.id}`,
            (value) => {
                history.push({
                    pathname:'/board/edit',
                    state: {
                        id: value.id,
                        cardNum: value.cardNum,
                        userId: viewUserId,
                        nickname: value.nickname,
                        title: value.title,
                        text: value.text,
                        imgName: value.imgName,
                        imgURL: value.imgURL,
                        date: value.date,
                        star: value.star,
                        views: value.views,
                        whoClicked: value.whoClicked? value.whoClicked : {},
                        whoViews: value.whoViews ? value.whoViews : {},
                        comment: value.comment ? value.comment : {}
                    }
                })
            })
    }


    const loadComments = () => {
        database.loadComment(viewCard, (value) => {
            setComments(value);
        })
    }
    useEffect(() => {
        loadComments(viewCard)}
        ,[])

    const nowStar = clickStar === true ? Styles.starClicked : '';

    return(
        <>
                <div className={Styles.view}>
                    <div className={Styles.title}>{viewCard.title}</div>
                    <div className={Styles.articleInfo}>
                        <div className={Styles.nickname}>
                            <i className={`fas fa-user ${Styles.userIcon}`}></i>
                            {viewCard.nickname}
                        </div>
                        <div className={Styles.articleSubInfo}>
                            <div className={Styles.stars}>추천수 | {viewCard.star}</div>
                            <div className={Styles.views}>조회수 | {viewCard.views}</div>
                            <div className={Styles.date}>작성일  | {viewCard.date}</div>
                        </div>
                    </div>
 
                    <div className={Styles.text}>
                            <pre className={Styles.textPre}>{viewCard.text}</pre>
                        </div>
                    

                    <div className={Styles.textDivider}></div>
                    {viewUserId === viewCard.userId && 
                    <div className={Styles.btns}>
                        <button onClick={onClickEditBtn} className={Styles.editBtn}>
                            <i className={`${Styles.editIcon} fas fa-keyboard`}></i>
                            수정
                        </button>
                        <button onClick={onClickDelete} className={Styles.deleteBtn}>
                            <i className={`${Styles.deleteIcon} far fa-trash-alt`}></i>
                            삭제
                        </button>
                    </div>}

                    <div className={Styles.likeSection}>
                        <div className={Styles.likeSectionText}>
                            추천
                        </div>
                        <div likeSectionBtns>
                            <button
                            onClick={onClickStar}
                            className={`${Styles.star} ${nowStar}`}
                            >
                                <i className={`fas fa-thumbs-up ${Styles.likeBtn}`}></i>
                            </button>
                        </div>
                    </div>

                    <div className={Styles.alignPopUp}>
                    {showPopUp && <div className={Styles.likePopUp}>
                        이 글을 추천하셨습니다!
                                </div>
                    }
                    </div>
                    </div>

            <div className={Styles.comment}>
                 <WriteComment 
                    card={viewCard}
                    database={database}
                    loadComments={loadComments}
                    userId={userId}
                    displayName={displayName}
                 />

                 {Object.keys(comments).map(key=>(
                     <ShowComment 
                        key={key}
                        comment={comments[key]}
                        database={database}
                        loadComments={loadComments}
                        card={viewCard}
                        userId={userId}
                     />
                 ))}
            </div>    
            

                
        </>
                
                
    )
}

export default View;