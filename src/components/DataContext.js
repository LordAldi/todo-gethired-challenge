import React, { useReducer, createContext, useMemo } from "react";
export const DataContext = createContext();
export const ACTIONS = {
  SET_ACTIVITY: "set_activity",
  SET_TASK: "set_decrease",
  LOADING: "loading",
  UNLOADING: "unloading",
};
const initialState = {
  activity: [],
  task: [],
  loading: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_ACTIVITY:
      return {
        ...state,
        activity: [...action.payload],
      };
    case ACTIONS.SET_TASK:
      return {
        ...state,
        task: [...action.payload],
      };
    case ACTIONS.LOADING:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.UNLOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // (**)
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
