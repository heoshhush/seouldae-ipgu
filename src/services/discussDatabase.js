import { firebaseDatabase } from './firebase';

class DiscussDatabase {
    saveCard = (card) => {
        firebaseDatabase.ref(`anonymous/${card.id}`).set(
            card
        )
    }

    loadCard = (myFunction) => {
        firebaseDatabase.ref(`anonymous`).once('value', snapshot => {
            const value = snapshot.val();
            myFunction(value);
        })
        }

    deleteCard = (card) => {
        firebaseDatabase.ref(`anonymous/${card.id}`).remove();
    }
}

export default DiscussDatabase;