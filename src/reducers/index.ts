export interface SearchState {
  value: string;
}

const initialState: SearchState = {
  value: "",
};

const searchReducer = (state = initialState, action) => {
  if (action.type == "UPDATE_SEARCH") {
    return { value: action.value };
  }
  return state;
};

export default searchReducer;
