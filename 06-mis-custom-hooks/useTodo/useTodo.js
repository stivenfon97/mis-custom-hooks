import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

const initialState = [
  // {
  //   id: new Date().getTime(),
  //   description: "Recolectar la piedra del Alma",
  //   done: false,
  // },
  // {
  //   id: new Date().getTime() * 3,
  //   description: "Recolectar la piedra del Tiempo",
  //   done: false,
  // },
];

export const useTodo = () => {

  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos) || []);
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = {
      type: "[TODO] Add Todo",
      payload: todo,
    };

    dispatch(action);
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: "[TODO] Delete Todo",
      payload: id,
    });
  };

  const hadleToggleTodo = (id) => {
    dispatch({
      type: "[TODO] Toggle Todo",
      payload: id,
    });
  };

  const countTodos = todos.length;
  const pendingTodosCount = todos.filter(todo => !todo.done).length;

  return {
    todos,
    countTodos,
    pendingTodosCount,
    handleNewTodo,
    handleDeleteTodo,
    hadleToggleTodo,
  };
};
