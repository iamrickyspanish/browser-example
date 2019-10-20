export const initialState = {
  items: [],
  filterData: {},
  paginationData: { page: 1, perPage: 20 },
  queryData: {},
  isLoading: false,
  hasError: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER":
      return {
        ...state,
        filterData: action.filterData,
        queryData: {
          ...action.filterData,
          ...state.paginationData
        },
        paginationData: initialState.paginationData,
        items: []
      };
    case "MORE":
      return {
        ...state,
        paginationData: {
          ...state.paginationData,
          page: state.paginationData.page + 1
        },
        queryData: {
          ...state.filterData,
          ...state.paginationData,
          page: state.paginationData.page + 1
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
    default:
      return state;
  }
};

export const filterItems = filterData => ({ type: "FILTER", filterData });
export const loadMoreItems = () => ({ type: "MORE" });
export const requestItems = () => ({ type: "REQUEST" });
export const receiveItems = items => ({ type: "RECEIVE", items });
export const receiveError = error => ({ type: "ERROR", error });

export default reducer;
