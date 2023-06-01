export const initialState = {
  image: "",
  azTitle: "",
  azContent: "",
  enTitle: "",
  enContent: "",
  ruTitle: "",
  ruContent: "",
};

export const RecipesReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "SET_DATA":
      return {
        image: action.payload.image,
        azTitle: action.payload.azTitle,
        azContent: action.payload.azContent,
        enTitle: action.payload.enTitle,
        enContent: action.payload.enContent,
        ruTitle: action.payload.ruTitle,
        ruContent: action.payload.ruContent,
      };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};
