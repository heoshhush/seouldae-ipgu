import React from 'react';
import { Link } from 'react-router-dom';
import BoardCard from '../board-card/boardCard';
import Styles from './boardCards.module.css'

const BoardCards = ({ boardId, updateViews, addViews, cards, onClickCard }) => {

    
    return(
        <div className={Styles.boardCards}>
        {Object.keys(cards).map(key=> (
                 <li>
                     <BoardCard
                         key={key}
                         userId={boardId}
                         card={cards[key]}
                         updateViews={updateViews}
                         addViews={addViews}
                         onClickCard={onClickCard}
                     />
                 </li>
         ))}
         </div>
    )
}

export default BoardCards;