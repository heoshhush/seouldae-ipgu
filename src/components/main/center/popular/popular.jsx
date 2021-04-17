import React, { useEffect, useState } from 'react';
import PopularCard from '../../../popular/popularCard/popularCard';
import Styles from './popular.module.css';

const Popular = ({ firebasePopular }) => {
    const [popularByStar, setPopularByStar] = useState({});
    const [popularByView, setPopularByView] = useState({});
    const [popularByComment, setPopularByComment] = useState({});
    const [orderByStar, setOrderByStar] = useState(true);
    const [orderByViews, setOrderByViews] = useState(false);
    const [orderByComment, setOrderByComment] = useState(false);

    const getPopularByStar = () => {
        firebasePopular.getPopular('star', 1, (value) => {
            setPopularByStar(value);
        })
    }

    const getPopularByView = () => {
        firebasePopular.getPopular('views', 3, (value) => {
            setPopularByView(value);
        })
    }

    const getPopularByComment = () => {
        firebasePopular.getPopularByComment(3, (value) => {
            setPopularByComment(value);
        })
    }

    const onClickStar = () => {
        setOrderByStar(true);
        setOrderByViews(false);
        setOrderByComment(false);
    }
    const onClickViews = () => {
        setOrderByStar(false);
        setOrderByViews(true);
        setOrderByComment(false);
    }
    const onClickComment = () => {
        setOrderByStar(false);
        setOrderByViews(false);
        setOrderByComment(true);
    }
    

    useEffect(() => {
        getPopularByStar();
        getPopularByView();
        getPopularByComment();
    }, [])

    return(
        <div>
            <div className={Styles.popularBtns}>
                <button onClick={onClickStar}>추천순</button>
                <button onClick={onClickViews}>조회순</button>
                <button onClick={onClickComment}>댓글순</button>
            </div>
            {orderByStar && Object.keys(popularByStar).map(key => (
                <PopularCard 
                    key={key}
                    card={popularByStar[key]}
                />
            ))}
            {orderByViews && Object.keys(popularByView).map(key => (
                <PopularCard 
                    key={key}
                    card={popularByView[key]}
                />
            ))}
            {orderByComment && Object.keys(popularByComment).map(key => (
                <PopularCard 
                    key={key}
                    card={popularByComment[key]}
                />
            ))}
        </div>
    )
}

export default Popular;