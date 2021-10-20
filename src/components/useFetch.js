import { useCallback, useContext } from "react";
import { ACTIONS, DataContext } from "./DataContext";

const baseURL = "https://todo.api.devcode.gethired.id";
const email = "aldianugra09@gmail.com";
const addEmail = `?email=${email}`;
const useFetch = () => {
  const { dispatch, state } = useContext(DataContext);

  const fetchActivity = useCallback(async () => {
    try {
      dispatch({ type: ACTIONS.LOADING });
      const data = await fetch(baseURL + "/activity-groups" + addEmail);
      const res = await data.json();
      dispatch({ type: ACTIONS.SET_ACTIVITY, payload: [...res?.data] });
      dispatch({ type: ACTIONS.UNLOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.UNLOADING });
    }
  }, [dispatch]);

  const createActivity = async () => {
    try {
      dispatch({ type: ACTIONS.LOADING });
      const data = await fetch(baseURL + "/activity-groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ title: "New Activity", email }),
      });
      const res = await data.json();
      dispatch({
        type: ACTIONS.SET_ACTIVITY,
        payload: [res, ...state.activity],
      });
      dispatch({ type: ACTIONS.UNLOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.UNLOADING });
    }
  };
  const deleteActivity = async (id) => {
    await fetch(baseURL + "/activity-groups/" + id + email, {
      method: "DELETE",
    });
    dispatch({
      type: ACTIONS.SET_ACTIVITY,
      payload: [...state.activity.filter((act) => act.id !== id)],
    });
  };
  const fetchTask = useCallback(
    async (id) => {
      try {
        dispatch({ type: ACTIONS.LOADING });
        const data = await fetch(baseURL + "/activity-groups/" + id);
        const res = await data.json();
        dispatch({ type: ACTIONS.SET_TASK, payload: [...res?.todo_items] });
        dispatch({ type: ACTIONS.SET_TITLE, payload: res?.title });
        dispatch({ type: ACTIONS.UNLOADING });
      } catch (error) {
        dispatch({ type: ACTIONS.UNLOADING });
      }
    },
    [dispatch]
  );
  const createTask = async (task) => {
    const data = await fetch(baseURL + "/todo-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(task),
    });
    const res = await data.json();
    console.log(state.task);
    dispatch({
      type: ACTIONS.SET_TASK,
      payload: [{ ...res, is_active: res.is_active ? 1 : 0 }, ...state.task],
    });
  };

  const deleteTask = async (id) => {
    await fetch(baseURL + "/todo-items/" + id, {
      method: "DELETE",
    });
    dispatch({
      type: ACTIONS.SET_TASK,
      payload: [...state.task.filter((t) => t.id !== id)],
    });
  };

  const editTask = async (task) => {
    const data = await fetch(baseURL + "/todo-items/" + task.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(task),
    });
    const res = await data.json();
    const idx = state.task.findIndex((t) => t.id === res.id);
    const newA = [...state.task];
    newA[idx] = res;
    dispatch({
      type: ACTIONS.SET_TASK,
      payload: [...newA],
    });
  };
  return {
    fetchActivity,
    createActivity,
    deleteActivity,
    createTask,
    fetchTask,
    deleteTask,
    editTask,
  };
};

export default useFetch;
