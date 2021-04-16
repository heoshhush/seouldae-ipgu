import { firebaseAuth, githubProvider, googleProvider } from './firebase'

class FirebaseAuth {

    login = (provider) => {
        firebaseAuth.signInWithPopup(provider);
    }

    logout = () => {
        firebaseAuth.signOut();
    }

    getProvider = (provider) => {
        switch(provider){
            case "Google":
                return googleProvider;
            case "Github":
                return githubProvider;
            default:
                throw new Error(`Unknown Provider: ${provider}`)
        }
    }

    authChanged = (myFunction) => {
        firebaseAuth.onAuthStateChanged(user => {
            myFunction(user);
        })
    }

    getUserInfo = () => {
        const user = firebaseAuth.currentUser;
        if(user) {
            return user
        }
    }

    // 가입 -----
    
    signUp = (email, password) => {
        firebaseAuth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            alert('회원가입이 완료되었습니다!')
        })
        .catch((error) => {
            const errorCode = error.code;
            if(errorCode === 'auth/email-already-in-use'){
                const eMessage = '이미 존재하는 아이디입니다'
                alert(eMessage);
            } else if(errorCode === 'auth/invalid-email'){
                const eMessage = '올바르지 않은 이메일 양식입니다'
                alert(eMessage);
            } else if(errorCode === 'auth/weak-password'){
                const eMessage = '비밀번호는 6자 이상으로 설정해주세요'
                alert(eMessage);
            } else {
                alert(errorCode)
            }

        })
    }

    // 가입한 메일 및 패스워드로 로그인 

    signInWithEmail = (email, password, errorHandler) => {
        firebaseAuth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            if(errorCode === 'auth/user-not-found'){
                const eMessage = '아이디나 비밀번호가 일치하지 않습니다'
                errorHandler(eMessage)
            } else if (errorCode === 'auth/invalid-email'){
                const eMessage = '올바르지 않은 이메일 양식입니다'
                errorHandler(eMessage)
            } else {
                errorHandler(errorCode);
            }
        }
    )}
}
export default FirebaseAuth ;