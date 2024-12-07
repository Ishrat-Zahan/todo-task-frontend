<template>
  <div>
    <h1>Todo List</h1>
    <form @submit.prevent="addNewTodo">
      <input v-model="newTodo.title" placeholder="Add new todo" required />
      <button type="submit">Add</button>
    </form>

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input
          type="checkbox"
          v-model="todo.status"
          @change="toggleTodoStatus(todo)"
        />
        <span :style="{ textDecoration: todo.status ? 'line-through' : 'none' }">
          {{ todo.title }}
        </span>
        <button @click="editTodo(todo)">Edit</button>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>

    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/auth";
import { useTodoStore } from "../stores/todo";

export default {
  setup() {
    const authStore = useAuthStore();
    const todoStore = useTodoStore();

    const newTodo = ref({ title: "", status: false });

    const addNewTodo = async () => {
      await todoStore.addTodo(newTodo.value);
      newTodo.value = { title: "", status: false };
    };

    const toggleTodoStatus = async (todo) => {
      todo.status = !todo.status;
      await todoStore.updateTodo(todo);
    };

    const editTodo = async (todo) => {
      const newTitle = prompt("Edit Todo", todo.title);
      if (newTitle) {
        todo.title = newTitle;
        await todoStore.updateTodo(todo);
      }
    };

    const deleteTodo = async (id) => {
      await todoStore.deleteTodo(id);
    };

    const logout = () => {
      authStore.logout();
      window.location.reload();
    };

    todoStore.fetchTodos();

    return {
      todos: todoStore.todos,
      newTodo,
      addNewTodo,
      toggleTodoStatus,
      editTodo,
      deleteTodo,
      logout,
    };
  },
};
</script>
