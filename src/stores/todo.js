import { defineStore } from "pinia";
import axios from "axios";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),
  actions: {
    async fetchTodos() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/todos");
        this.todos = response.data;
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    },
    async addTodo(newTodo) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/todos", newTodo);
        this.todos.push(response.data);
      } catch (error) {
        console.error("Failed to add todo:", error);
      }
    },
    async updateTodo(updatedTodo) {
      try {
        await axios.put(`http://127.0.0.1:8000/api/todos/${updatedTodo.id}`, updatedTodo);
        const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
        this.todos[index] = updatedTodo;
      } catch (error) {
        console.error("Failed to update todo:", error);
      }
    },
    async deleteTodo(id) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/todos/${id}`);
        this.todos = this.todos.filter((todo) => todo.id !== id);
      } catch (error) {
        console.error("Failed to delete todo:", error);
      }
    },
  },
});
