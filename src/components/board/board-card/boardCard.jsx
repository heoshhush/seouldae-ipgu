import React from 'react';
import { useHistory } from 'react-router';
import Styles from './boardCard.module.css';

const BoardCard = ({ card, userId, updateViews, addViews, onClickCard }) => {
    const history = useHistory();
    const URL = `/board/view&id=${card.id}`
    const onClick = () => {
        addViews(card, userId)
        updateViews(card)
        onClickCard(URL, history, card)
    }

    const commentNum = card.comment ? Object.keys(card.comment).length : 0;

    const getNComKeys = () => {
        const comKeys = card.comment && Object.keys(card.comment);
        const comKeys2 = comKeys && comKeys.map(key=> card.comment[key]);
        const comKeys3 = comKeys2 && comKeys2.map(key => key['ncomment'])
        const comKeys4 = comKeys3 && comKeys3.map(key => key && Object.keys(key).length)
        const comKeys5 = comKeys4 && comKeys4.filter(key => key !== undefined)
        return comKeys5;
    }

    const getNComNum = (comKeys5) => {
            if(comKeys5){
                let num = 0;
                for(let i = 0; i < comKeys5.length; i ++){
                    num += Number(comKeys5[i])
            }
                 return num

            } else if(!comKeys5){
                 return 0;
            }
    }
    
    

    // 현재 문제: 대댓글의 갯수를 못센다
    // 구체적으로, 댓글이 1개일때 대댓글을 여러개 달면 잘 센다
    // 하지만, 이전에 대댓글이 1000개 여서 잘 셌음에도 불구하고,
    // 원댓글 자체가 2개 이상을 넘어가면, 원댓글 갯수만세고 대댓글은 못센다
    
    // 아무래도, 위 getNCommentNum함수에서 
    // const commentKeys = card.comment && card.comment[Object.keys(card.comment)] ;
    // 이부분의 card.comment[Object.Keys(card.comment)] 가 여러개인데, 지금 한개라고 생각하고 함수를
    // 전개하고 있어서 그런듯
    // map돌리든지 해보자.


    return(
        <div onClick={onClick} className={Styles.boardCard}>
            <div className={Styles.cardNum}>{card.cardNum}</div>
            <div className={Styles.cardTitle}>{card.title}
                <span className={Styles.commentNum}>[{commentNum + getNComNum(getNComKeys())}]</span>
            </div>
            <div className={Styles.userNickname}>{card.nickname}</div>
            <div className={Styles.cardDate}>{card.date}</div>
            <div className={Styles.viewNum}>{card.views}</div>
            <div className={Styles.stars}>{card.star}</div>
        </div>
    )
}

export default BoardCard;