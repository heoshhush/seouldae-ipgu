import { firebaseDatabase } from './firebase';

class Database {
    saveCard = (path, card) => {
        firebaseDatabase.ref(`${path}/${card.id}`).set(
            card
        )
    }

    loadCard = (path, myFunction) => {
        firebaseDatabase.ref(`${path}`).once('value', snapshot => {
            const value = snapshot.val() ? snapshot.val() : {};
            myFunction(value);
        })
        }

    deleteCard = (path, card) => {
        firebaseDatabase.ref(`${path}/${card.id}`).remove();
    }

    // 조회수 

    setViews = (card, views) => {
        firebaseDatabase.ref(`board/${card.id}/views`).set(
            views
        )
    }

    whoViews = (card, userId) => {
        firebaseDatabase.ref(`board/${card.id}/whoViews/${userId}`).set(
            userId
        )
    }

    // 추천수 

    setStars = (card, star) => {
        firebaseDatabase.ref(`board/${card.id}/star`).set(
            star
            )
    }

    whoClickedStars = (card, userId) => {
        firebaseDatabase.ref(`board/${card.id}/whoClicked/${userId}`).set(
            userId
        )
    }
    
    removeWhoClickedStars = (card, userId) => {
        firebaseDatabase.ref(`board/${card.id}/whoClicked/${userId}`).remove()
    }

    // 게시판에서, 정해진 기준에 따라 불러오기
    

    firstPage = (myFnc) => {
        firebaseDatabase.ref(`board/`).limitToLast(19)
        .once('value', snapshot => {
            const value = snapshot.val() ? snapshot.val() : {};
            myFnc(value)
        })
    }

    loadPage = (startNum, endNum, myFnc) => {
        const nowPage = firebaseDatabase.ref(`board/`)
        .orderByChild('cardNum')
        .startAt(startNum)
        .endAt(endNum)
        nowPage.once('value', snapshot => {
            const value = snapshot.val()
            myFnc(value)
        })
    }

    loadEndElem = (myFnc) => {
        firebaseDatabase.ref(`board/`).limitToLast(1)
        .once('value', snapshot => {
            const value = snapshot.val()
            myFnc(value)
        })
    }

    // 게시판에서, 댓글 관련

    saveComment = (card, userId, nickname, text) => {
        const date = new Date();
        firebaseDatabase.ref(`board/${card.id}/comment/${Date.now()}`).set(
            {
                key:Date.now(),    
                id: userId,
                text:text,
                date: date.toLocaleString(),
                nickname: nickname
            }
        )
    }

    loadComment = (card, myFnc) => {
        firebaseDatabase.ref(`board/${card.id}/comment/`)
        .once('value', snapshot => {
            const value = snapshot.val() ? snapshot.val() : {}
            myFnc(value)
        })
    }  

    updateComment = (card, comment, text) => {
        firebaseDatabase.ref(`board/${card.id}/comment/${comment.key}`).set(
            {
                key: comment.key,
                id:comment.id,
                text:text,
                date: comment.date,
                nickname: comment.nickname
            }
        )
    }

    deleteComment = (card, comment) => {
        firebaseDatabase.ref(`board/${card.id}/comment/${comment.key}`).remove();
    }
}

export default Database;