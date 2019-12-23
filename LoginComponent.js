import Component from './component.js'
import store from "./store/index.js";
import Server from './server.js';
export default class LoginComponent extends Component {
    constructor() {
        super(
            store,
            document.querySelector('.app')
        );
        this.server = new Server();
    }
    async onInit() {
        if (window.localStorage['token']) {
            await this.server.me()
                .then(getToken => {
                    if (getToken.error) {
                        window.localStorage.removeItem('token');
                    } else {
                        window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'dashboard' } }));
                    }
                }).catch(error => { console.log(error) })
        }
    }
    render() {
        return `
        <form>
            <h1>Login</h1>
            <input type = "text" name = "Login" class = "email"/>
            <input type = "password" name = "Password" class = "password"/>
            <button type="submit">Submit</button>
        </form>
        `;
    }
    async setupListeners() {
        this.anchor.querySelector('button[type="submit"]').addEventListener('click', async (event) => {
            event.preventDefault();
            let email = this.anchor.querySelector('.email').value;
            let password = this.anchor.querySelector('.password').value;
            let login = await this.server.login(email, password)

            if (login.token) {
                window.localStorage.setItem('token', login.token);
                window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'dashboard' } }));
            }
        })
    }
}
