// https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js/#enable-queries-mutations-and-subscriptions
import { API } from "aws-amplify";
import { listTodos } from "../graphql/queries";
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation } from "../graphql/mutations";

const fetchTodosUtil = async () => {
  const apiData = await API.graphql({ query: listTodos });
  const todoFromAPI = apiData.data.listTodos.items;
  return todoFromAPI;
};

const createTodoUtil = async (userName, event) => {
  event.preventDefault();
  const form = new FormData(event.target);
  const data = {
    id: userName,
    name: form.get("name"),
    description: form.get("description"),
  };
  await API.graphql({
    query: createTodoMutation,
    variables: { input: data },
  });
  const newTodos = await fetchTodosUtil();
  event.target.reset();
  return newTodos;
};

const deleteTodoUtil = async (id, state) => {
  const newTodos = state.filter((elem) => elem.id !== id);
  await API.graphql({
    query: deleteTodoMutation,
    variables: { input: { id } },
  });
  return newTodos;
};

export { fetchTodosUtil, createTodoUtil, deleteTodoUtil };
