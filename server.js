export default class Server {
    constructor() { }
    me() {
        return fetch('https://todo-app-back.herokuapp.com/me', {
            method: 'GET',
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        }).then(getToken => getToken.json())
    }
    saveItem(value) {
        return fetch('https://todo-app-back.herokuapp.com/todos', {
            method: 'POST',
            body:
                JSON.stringify({
                    text: value,
                }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('token')
            }
        }).then(res1 => {
            return res1.json()
        })
    }
    login(email, password) {
        return fetch('https://todo-app-back.herokuapp.com/login', {
            method: 'POST',
            body:
                JSON.stringify({
                    email: email,
                    password: password,
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(auth => auth.json());
    }
    getTodoList() {
        return fetch('https://todo-app-back.herokuapp.com/todos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('token')
            }
        }).then(todoList => todoList.json())
    }
    removeItem(todoId) {
        return fetch(`https://todo-app-back.herokuapp.com/todos/${todoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('token')
            }
        });
    }
    editItem(body, todoId) {
        fetch(`https://todo-app-back.herokuapp.com/todos/${todoId}`, {
            method: 'PUT',
            body:
                JSON.stringify({
                    text:body.text,
                }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('token')
            }
        });
    }
}
