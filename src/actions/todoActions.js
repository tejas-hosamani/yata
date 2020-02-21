import { setLocalStorage } from "../Utils/LocalStorage";
import shortid from "shortid";

export const updateTodoData = payload => {
  return async dispatch => {
    dispatch({
      type: "UPDATE_TODOS_LIST",
      payload: []
    });
  };
};

export const addNewTodo = newTodoItem => {
  return async (dispatch, getState) => {
    const todoList = JSON.parse(JSON.stringify(getState().todoList.todosList));
    todoList.push({
      id: shortid.generate(),
      title: newTodoItem,
      status: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    setLocalStorage("todo-app-data", todoList);
    dispatch({
      type: "UPDATE_TODOS_LIST",
      payload: todoList
    });
  };
};

export const toggleTodoStatus = selectedTodoItem => {
  return async (dispatch, getState) => {
    // Get all existing todos
    const todoList = JSON.parse(JSON.stringify(getState().todoList.todosList));

    //  find index
    const indexOfselectedTodoItem = todoList.findIndex(
      singleTodo => selectedTodoItem.id === singleTodo.id
    );
    // Update the data at that index
    todoList[indexOfselectedTodoItem].status = !selectedTodoItem.status;
    setLocalStorage("todo-app-data", todoList);
    dispatch({
      type: "UPDATE_TODOS_LIST",
      payload: todoList
    });
  };
};

export const deleteTodoItem = selectedTodoItem => {
  return async (dispatch, getState) => {
    // Get all existing todos
    const remainingTodoList = getState().todoList.todosList.filter(
      singleTodo => selectedTodoItem.id !== singleTodo.id
    );

    setLocalStorage("todo-app-data", remainingTodoList);
    dispatch({
      type: "UPDATE_TODOS_LIST",
      payload: remainingTodoList
    });
  };
};
