<template>
  <div class="todos">
    <h1>Todo List</h1>

    <form @submit.prevent="addTodo">
      <input
        type="text"
        v-model="newTodo"
        placeholder="Add a new todo"
      />
      <button type="submit">Add</button>
    </form>

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodoStatus(todo.id)"
        />
        <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
        <button @click="editTodo(todo.id)">Edit</button>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { useTodoStore } from '@/stores/todo';

export default {
  data() {
    return {
      newTodo: '',
      editMode: false,
      todoToEdit: null,
    };
  },
  setup() {
    const todoStore = useTodoStore();

    todoStore.fetchTodos();

    const addTodo = async () => {
      if (!this.newTodo.trim()) return;
      if (this.editMode) {
        await todoStore.editTodo(this.todoToEdit.id, this.newTodo);
        this.editMode = false;
        this.todoToEdit = null;
      } else {
        await todoStore.addTodo({ title: this.newTodo });
      }
      this.newTodo = '';
    };

    const editTodo = (id) => {
      const todo = todoStore.todos.find((t) => t.id === id);
      this.newTodo = todo.title;
      this.editMode = true;
      this.todoToEdit = todo;
    };

    const deleteTodo = async (id) => {
      await todoStore.deleteTodo(id);
    };

    const toggleTodoStatus = async (id) => {
      await todoStore.toggleTodoStatus(id);
    };

    return { 
      todos: todoStore.todos,
      addTodo,
      editTodo,
      deleteTodo,
      toggleTodoStatus,
    };
  },
};
</script>

<style scoped>
.todos {
  max-width: 600px;
  margin: auto;
}
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
