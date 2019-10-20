import { useReducer } from "react";

const initialState = 1;

const paginationReducer = (state, action) => {
  switch (action.type) {
    case "prev":
      return state === 1 ? state : state - 1;
    case "next":
      return state + 1;
    case "set":
      return action.page < 1 ? state : action.page;
    case "reset":
      return initialState;
    default:
      return state;
  }
};

export const usePagination = () => {
  const [page, dispatch] = useReducer(paginationReducer, initialState);

  return {
    page,
    prevPage: () => dispatch({ type: "prev" }),
    nextPage: () => dispatch({ type: "next" }),
    setPage: page => dispatch({ type: "next", page }),
    resetPagination: () => dispatch({ type: "reset" })
  };
};

export default usePagination;
