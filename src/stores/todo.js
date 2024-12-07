import { defineStore } from 'pinia';
import axios from 'axios';

export const useTodoStore = defineStore('todo', {
    state: () => ({
        todos: [],
    }),
    actions: {
        async fetchTodos() {
            const response = await axios.get('http://localhost:8000/api/todos');
            this.todos = response.data;
        },
        async addTodo(title) {
            const response = await axios.post('http://localhost:8000/api/todos', { title });
            this.todos.push(response.data);
        },
        async updateTodo(todo) {
            await axios.put(`http://localhost:8000/api/todos/${todo.id}`, todo);
            await this.fetchTodos();
        },
        async deleteTodo(id) {
            await axios.delete(`http://localhost:8000/api/todos/${id}`);
            this.todos = this.todos.filter(todo => todo.id !== id);
        },
    },
});
