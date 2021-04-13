import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './pages.module.css'

const Pages = ({button,loadCards}) => {
    //onClick 하면, 카드 로드하고 -> 
    // boardCards 컴포넌트 보여주면 되는거 아냐?ㅑ

   const onClickPage = () => {
        loadCards();
    }

    return (
        <div className={Styles.pages}>
            <Link to={`/board/page=${button}`}>
                <button>
                    {button}
                </button>    
            </Link>
        </div>
    )
}

export default Pages;