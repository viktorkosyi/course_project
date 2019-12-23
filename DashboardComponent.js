import Component from './component.js';
import store from "./store/index.js";
import ListComponent from "./list-component.js";
import Server from "./server.js"

export default class DashboardComponent extends Component {
    constructor() {
        super(
            store,
            document.querySelector('.app')
        );
        this.server = new Server();
    }
    async onInit() {
        if (window.localStorage['token']) {
            this.server.me()
                .then(getToken => {
                    if (getToken.error) {
                        window.localStorage.removeItem('token')
                        window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'login ' } }));
                    }
                }).catch(error => { console.log(error) })
        } else { window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'login ' } })); }
    }
    render() {
        return `
        <section class="app__input">
        <h2 class="app__heading">What you have done</h2>
                <form class="new-item boilerform js-form">
            <div class="boilerform">
                <!-- Form styles form the https://boilerform.design boilerplate -->
                <label for="new-item-field" class="new-item__label c-label">Add a new item</label>
                <input type="text" class="new-item__details c-input-field" id="new-item-field"
                    autocomplete="off">
                <button class="c-button new-item__button">Save</button>
                <button class="log-out__button">Log Out</button>
            </div>
        </form>
        <div class="js-items"></div>
    </section>
        `;
    }

    async setupListeners() {
        const input = document.querySelector('.c-input-field')
        const submit = document.querySelector('.c-button')
        const logOut = document.querySelector('.log-out__button')

        submit.addEventListener('click', async event => {
            event.preventDefault();
            let value = input.value.trim();
            if (value.length) {
                this.server.saveItem(value)
                    .then(res => {
                        if (!res.error) {
                            store.dispatch('addItem', res);
                            input.focus();
                        } else { alert(res.error) }
                    })
            }
        })

        logOut.addEventListener('click', async event => {
            event.preventDefault();
            window.localStorage.removeItem('token')
            window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'login' } }));
        })

        const list = new ListComponent();
        await list.onInit();
        list.render();
    }
}
