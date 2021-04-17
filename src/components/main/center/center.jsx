import React, { useState } from 'react';
import Styles from './center.module.css'
import Popular from './popular/popular';

const Center = ({ firebasePopular, onClickPopularCard }) => {
    
    
    return(
        <div className={Styles.center}>
            <div className={Styles.firstLine}>
                <div className={Styles.popular}>
                    <div className={Styles.popularHeader}>
                        <div className={Styles.popularTitle}>
                            인기글
                        </div>

                    </div>
                    <Popular 
                        firebasePopular={firebasePopular}
                        onClickPopularCard={onClickPopularCard}
                    />
                </div>
                <div className={Styles.trading}>
                    <div className={Styles.tradingTitle}>
                        당신의 근처에
                    </div>
                </div>
            </div>

            <div className={Styles.dish}></div>
        </div>
    )
}
export default Center;