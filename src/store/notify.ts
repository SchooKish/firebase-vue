import {defineStore} from "pinia";

interface INotifyState {
    isShow: boolean,
    notifyText: string,
    isShowError: boolean,
    errorText: string,
}

export const useNotifyStore = defineStore('notify', {
    state: (): INotifyState => {
        return {
            isShow: false,
            notifyText: '',
            isShowError: false,
            errorText: '',
        }
    },

    actions: {
        showNotify(text: string) {
            this.isShow = true;
            this.notifyText = text;
            setTimeout(() => {
                this.isShow = false;
                this.notifyText = '';
            }, 5000);
        },

        showError(code: string, text: string) {
            this.errorText = `${code} ${text}`;
            this.isShowError = true;
        },

        closeError() {
            this.errorText = '';
            this.isShowError = false;
        }
    }
})