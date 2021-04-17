import { firebaseDatabase } from './firebase';

class FirebasePopular{
    // 추천수에 따라 정렬 -> 갯수만큼(5-7)가져오기

    getPopular = (standard, num, myFnc) => {
        firebaseDatabase.ref(`board`).once(
            'value', snapshot => {
                const value = snapshot.val();
                const keys= Object.keys(value);
                const cardArray = keys.map(key => value[key]);
                const cardObj = cardArray.filter(key => key[standard] > num);
                myFnc(cardObj)
            }
        )
    }

    getPopularByComment = (num, myFnc) => {
        firebaseDatabase.ref(`board`).once(
            'value', snapshot => {
                const value = snapshot.val();
                const keys= Object.keys(value);
                const cardArray = keys.map(key => value[key]);
                const isCardObj = cardArray.filter(key => key['comment']);
                const cardObj = isCardObj.filter(key => Object.keys(key['comment']).length > num);
                myFnc(cardObj)
            }
        )
}}

export default FirebasePopular;