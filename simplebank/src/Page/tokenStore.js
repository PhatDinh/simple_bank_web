
import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";


class TokenStore {
    accessToken = '';
    refreshToken = '';
    notifyId = '';
    openDialog = false;
    typeDialog = null

    constructor() {
        makeAutoObservable(this)
    }

    addToken(access, refresh) {
        console.log('add')
        this.accessToken = access;
        this.refresh = refresh;
    }

    async getNewToken(oldToken, refresh) {
        console.log('err')
        await fetch('https://infinite-beyond-71487.herokuapp.com/api/customer/v1/token', {
            method: 'POST',
            headers: {
                'content-type': 'application-json',
                'Authorization': 'Bearer ' + oldToken
            },
            body: JSON.stringify({
                "refresh_token": refresh
            })
        }).then(res => {
            if (!res.ok) throw new console.error(res);
            else return res.json();
        }).then(data => {
            this.accessToken = data.access_token;
            this.refreshToken = this.refresh_token;
        }
        )
    }

    async getDebt() {
        await fetch(`https://infinite-beyond-71487.herokuapp.com/api/customer/v1/me/debts/${this.notifyId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application-json',
                'Authorization': 'Bearer ' + this.accessToken
            },
        }).then(res => {
            if (!res.ok) throw new console.error(res);
            else return res.json();
        }).then(data => {
            this.debt = data;
        }
        )
    }

    resetNotify() {
        this.notifyId = '';
        this.openDialog = false;
    }
}


const tokenStore = new TokenStore();

export default tokenStore;
