import { firebaseDatabase } from './firebase';

class Database {
    saveCard = (path, card) => {
        firebaseDatabase.ref(`${path}/${card.id}`).set(
            card
        )
    }

    loadCard = (path, myFunction) => {
        firebaseDatabase.ref(`${path}`).once('value', snapshot => {
            const value = snapshot.val();
            myFunction(value);
        })
        }

    deleteCard = (path, card) => {
        firebaseDatabase.ref(`${path}/${card.id}`).remove();
    }

    setStars = (card, star) => {
        firebaseDatabase.ref(`board/${card.id}/star`).set(
            star
            )
    }
}

export default Database;