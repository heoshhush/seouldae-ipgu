import React from 'react';
import Styles from './popularCard.module.css';

const PopularCard = ({ card, onClickPopularCard }) => {
    
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

    const URL = `board/view&id=${card.id}`
    const onClickCard = () => {
        onClickPopularCard(URL, card)
        // view할때 history로 넘겨주는 것:

    }

    return(
        <div onClick={onClickCard} className={Styles.popularCard}>
            <div className={Styles.left}>
                <div className={Styles.title}>{card.title}</div>
                <div className={Styles.commentNum}>[{commentNum + getNComNum(getNComKeys())}]</div>
            </div>
            <div className={Styles.date}>{card.date.substr(0,11)}</div>
        </div>
    )
}

export default PopularCard;