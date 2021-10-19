import { useCallback, useContext } from "react";
import { ACTIONS, DataContext } from "./DataContext";

const baseURL = "https://todo.api.devcode.gethired.id";
const email = "aldianugra09@gmail.com";
const addEmail = `?email=${email}`;
const useFetch = () => {
  const { dispatch } = useContext(DataContext);

  const fetchActivity = useCallback(async () => {
    try {
      dispatch({ type: ACTIONS.LOADING });
      const data = await fetch(baseURL + "/activity-groups" + addEmail);
      const res = await data.json();
      console.log(res.data);
      dispatch({ type: ACTIONS.SET_ACTIVITY, payload: [...res?.data] });
      dispatch({ type: ACTIONS.UNLOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.UNLOADING });
    }
  }, [dispatch]);

  const createActivity = async () => {
    try {
      dispatch({ type: ACTIONS.LOADING });
      await fetch(baseURL + "/activity-groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ title: "New Activity", email }),
      });
      await fetchActivity();
      dispatch({ type: ACTIONS.UNLOADING });
    } catch (error) {
      dispatch({ type: ACTIONS.UNLOADING });
    }
  };
  const deleteActivity = async (id) => {
    await fetch(baseURL + "/activity-groups/" + id + email, {
      method: "DELETE",
    });
    await fetchActivity();
  };
  const fetchTask = useCallback(
    async (id) => {
      try {
        dispatch({ type: ACTIONS.LOADING });
        const data = await fetch(baseURL + "/activity-groups/" + id);
        const res = await data.json();
        console.log(res);
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
    await fetch(baseURL + "/todo-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(task),
    });
  };

  const deleteTask = async (id, group_id) => {
    await fetch(baseURL + "/todo-items/" + id, {
      method: "DELETE",
    });
    await fetchTask(group_id);
  };
  return {
    fetchActivity,
    createActivity,
    deleteActivity,
    createTask,
    fetchTask,
    deleteTask,
  };
};

export default useFetch;
