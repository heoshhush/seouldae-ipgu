import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../../header/header';
import Styles from './view.module.css'

const View = ({card, database, loadCards, userId, firebaseAuth}) => {
    const [whoClicked, setWhoClicked] = useState(card.whoClicked)
    const [viewUserId, setUserId] = useState(userId)
    const [showPopUp, setShowPopUp] = useState(false)

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
    const [star, setStar] = useState(card.star)

    useEffect(() => {
        firebaseAuth.authChanged((user) => {
            setUserId(user.uid)
        })
    },[])


    const history = useHistory();
    const onClickDelete = () => {
        database.deleteCard('board', card);
        history.push({
            pathname: '/board',
            state: {
                id: card.userId,
                displayName: card.nickname
            }
        })
    }

    console.log(viewUserId)



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
        database.whoClickedStars(card, viewUserId)
    }


    const updateStars = () => {
        setStar(star => {
            database.loadCard(`board/${card.id}/whoClicked`, 
            (value) => {
                if(value){
                    database.setStars(card, Object.keys(value).length)
                    return Object.keys(value).length
                } else if (!value){
                    database.setStars(card, 0);
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
        database.removeWhoClickedStars(card, viewUserId);
    }

    const onClickEditBtn = () => {
        database.loadCard(`board/${card.id}`,
            (value) => {
                history.push({
                    pathname:'/board/edit',
                    state: {
                        id: value.id,
                        userId: value.viewUserId,
                        nickname: value.nickname,
                        title: value.title,
                        text: value.text,
                        imgName: value.imgName,
                        imgURL: value.imgURL,
                        date: value.date,
                        star: value.star,
                        whoClicked: value.whoClicked
                    }
                })
            })
    }

    const nowStar = clickStar === true ? Styles.starClicked : '';


    return(
        <>
                <div className={Styles.view}>
                    <div className={Styles.title}>{card.title}</div>
                    <div className={Styles.nickname}>{card.nickname}</div>
                    <div className={Styles.date}>{card.date}</div>
                    <div className={Styles.text}>{card.text}</div>
                    
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
                    {viewUserId === card.userId && 
                    <div className={Styles.btns}>
                        <button onClick={onClickEditBtn} className={Styles.editBtn}>수정</button>
                        <button onClick={onClickDelete} className={Styles.deleteBtn}>삭제</button>
                    </div>}
                    <div className={Styles.alignPopUp}>
                    {showPopUp && <div className={Styles.likePopUp}>
                        이 글을 추천하셨습니다!
                    </div>
                    }
                    </div>
                </div>
        </>
                
                
    )
}

export default View;