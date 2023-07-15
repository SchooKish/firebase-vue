import {defineStore} from "pinia";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {onValue, ref, set} from "firebase/database";
import {auth, db} from "../firebaseInit";
import {useNotifyStore} from "./notify";

interface IUserState {
    isLogged: boolean,
    uid: string,
    data: IUserData,
}

export interface IUserData {
    email?: string,
    username?: string,
    fullName?: string,
    birthdate?: string,
    about?: string,
}

export const useUserStore = defineStore('user', {
    state: (): IUserState => {
        return {
            isLogged: false,
            uid: '',
            data: {},
        }
    },

    actions: {
        async login(formData: { email: string, password: string }) {
            await signInWithEmailAndPassword(auth, formData.email, formData.password)
                .then(res => {
                    const user = res.user;
                    const uid = user.uid;
                    this.getUserData(uid);
                })
                .catch((error) => {
                    const alert = useNotifyStore();
                    alert.showError(error.code, error.message)
                });
        },

        getUserData(uid: string) {
            const dbUser = ref(db, 'users/' + uid);
            onValue(dbUser, (res) => {
                this.isLogged = true;
                this.uid = uid;
                this.data = res.val();
            })
        },

        logout() {
            auth.signOut();
            this.isLogged = false;
            this.uid = '';
            this.data = {};
        },

        async registration(formData: { username: string, email: string, password: string }) {
           await createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .then(res => {
                    const user = res.user;
                    const uid = user.uid;
                    set(ref(db, 'users/' + uid), {
                        username: formData.username,
                        email: formData.email,
                    })
                })
                .then(() => {
                    const notify = useNotifyStore();
                    notify.showNotify('Регистрация прошла успешно')
                })
                .catch((error) => {
                    const alert = useNotifyStore();
                    alert.showError(error.code, error.message)
                });
        },

        async updateUserInfo(formData: IUserData) {
            await set(ref(db, 'users/' + this.uid), {
                ...formData
            }).then(() => {
                const notify = useNotifyStore();
                notify.showNotify('Данные успешно изменены')
            })
        }
    },
})