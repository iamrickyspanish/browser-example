export const initialState = {
  items: [],
  totalCount: 0,
  filterData: {},
  offset: 0,
  limit: 20,
  queryData: {},
  isLoading: false,
  hasError: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FILTER":
      return {
        ...state,
        filterData: action.filterData,
        queryData: {
          ...action.filterData,
          offset: initialState.offset,
          limit: state.limit
        },
        offset: initialState.offset,
        items: []
      };
    case "MORE":
      return {
        ...state,
        offset: state.offset + state.limit,
        queryData: {
          ...state.queryData,
          offset: state.offset + state.limit
        }
      };
    case "REQUEST":
      return {
        ...state,
        isLoading: true,
        hasError: false
      };
    case "RECEIVE":
      return {
        ...state,
        isLoading: false,
        items: [...state.items, ...action.items],
        hasError: false
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        hasError: true
      };
    case "TOTAL_COUNT":
      return {
        ...state,
        totalCount: action.value
      };
    default:
      return state;
  }
};

export const filterItems = filterData => ({ type: "FILTER", filterData });
export const loadMoreItems = () => ({ type: "MORE" });
export const requestItems = () => ({ type: "REQUEST" });
export const receiveItems = items => ({ type: "RECEIVE", items });
export const receiveTotalCount = items => ({ type: "TOTAL_COUNT", items });
export const receiveError = error => ({ type: "ERROR", error });

export default reducer;
