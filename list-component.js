import Component from "./component.js";
import store from "./store/index.js";
import Server from './server.js';


export default class ListComponent extends Component {
    constructor() {
        super(
            store,
            document.querySelector('.js-items')
        );
        this.server = new Server();
    }
    async onInit() {
        let getTodoList = await this.server.getTodoList();
        store.state.todo = getTodoList;
    }

    render() {
        if (this.done) {
            this.list = store.state.todo.filter(todoItem => todoItem.completed === true);
        } else if (this.notDone) {
            this.list = store.state.todo.filter(todoItem => todoItem.completed === false);
        } else {
            this.list = store.state.todo.concat();
        }

        this.countDone = store.state.todo.filter(todoItem => todoItem.completed === true).length;
        this.countNotDone = store.state.todo.filter(todoItem => todoItem.completed === false).length;
        this.countAll = this.countDone + this.countNotDone;

        if (this.list.length === 0) {
            this.anchor.innerHTML = `No todo's`;
        }
        this.anchor.innerHTML = `
        <button type="button" class="done_todo" >done (${this.countDone})</button>
        <button type="button" class="not_done_todo" >not done (${this.countNotDone})</button>
        <button type="button" class="all_todo" >all (${this.countAll})</button>
        <ul>
            ${
            this.list.map(todoItem => `
                    <li>
                    <div class="inp_div">
                    <div>${todoItem.text}</div>
                    <input type = "text" value="${todoItem.text}" class="invisible"/>
                    </div>
                    <button type="button" class="complete" >complete</button>
                    <button type="button" class="remove">X</button>
                    </li>
                `).join('')
            } 
            </ul> 
        `;
                this.list.forEach((todoItem, id) => {
            if (todoItem.completed) {
                this.anchor.querySelectorAll('.inp_div')[id].classList.add('complete_item');
            }
        })
        this.setupListeners();
    }
    
    setupListeners(){
        this.anchor.querySelectorAll('.remove').forEach((button, index) =>
            button.addEventListener('click', async () => {
               await this.server.removeItem(this.list[index]._id)
               store.dispatch('removeItem', { todoItem: this.list[index] });
            })
        )
        this.anchor.querySelectorAll('.inp_div').forEach((div) =>
            div.addEventListener('click', () => {
                div.querySelectorAll('div')[0].classList.add('invisible');
                div.querySelectorAll('input')[0].classList.remove('invisible');
            }
            )
        )
        this.anchor.querySelectorAll('input').forEach((input, index) => {
            let listcomp = this;
            input.addEventListener('keydown', async function (save) {
                if (save.keyCode === 13) {
                    let text = this.value;
                    await listcomp.server.editItem({text:text}, listcomp.list[index]._id)
                    store.dispatch('editItem', { todoItem: listcomp.list[index], text });
                }
            })
        })
        this.anchor.querySelectorAll('.complete').forEach((button, index) =>
            button.addEventListener('click', async () => {
                await this.server.editItem({completed:!this.list[index].completed}, this.list[index]._id)
                store.dispatch('completeItem', { todoItem: this.list[index] });
            })
        )

        this.anchor.querySelector('.done_todo').addEventListener('click', () => {
            this.done = true;
            this.notDone = false;
            this.render();
        })

        this.anchor.querySelector('.not_done_todo').addEventListener('click', () => {

            this.done = false;
            this.notDone = true;
            this.render();
        })

        this.anchor.querySelector('.all_todo').addEventListener('click', () => {
            this.done = false;
            this.notDone = false;
            this.render();
        })
    }
}
