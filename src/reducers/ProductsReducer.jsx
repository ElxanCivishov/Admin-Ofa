export const initialState = {
  image: "",
  category: "",
  price: "",
  azTitle: "",
  azMainText: "",
  azContent: "",
  azComposition: "",
  azFeatureTitle: "",
  azFeatures: [],
  azAddition: "",
  enTitle: "",
  enMainText: "",
  enContent: "",
  enComposition: "",
  enFeatureTitle: "",
  enFeatures: [],
  enAddition: "",
  ruTitle: "",
  ruMainText: "",
  ruContent: "",
  ruComposition: "",
  ruFeatureTitle: "",
  ruFeatures: [],
  ruAddition: "",
};

export const ProductsReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "ADD_FEATURE":
      return {
        ...state,
        [action.field]: [...state[action.field], action.value],
      };

    case "REMOVE_FEATURE":
      return {
        ...state,
        [action.field]: state[action.field].filter(
          (feature) => feature !== action.value
        ),
      };

    case "SET_DATA":
      return {
        price: action.payload.price,
        category: action.payload.category,
        image: action.payload.image,
        azTitle: action.payload.azTitle,
        azContent: action.payload.azContent,
        azComposition: action.payload.azComposition,
        azAddition: action.payload.azAddition,
        azFeatureTitle: action.payload.azFeatureTitle,
        azFeatures: action.payload.azFeatures.map((item) => item.text),
        enTitle: action.payload.enTitle,
        enContent: action.payload.enContent,
        enComposition: action.payload.enComposition,
        enFeatureTitle: action.payload.enFeatureTitle,
        enFeatures: action.payload.enFeatures.map((item) => item.text),
        enAddition: action.payload.enAddition,
        ruTitle: action.payload.ruTitle,
        ruContent: action.payload.ruContent,
        ruComposition: action.payload.ruComposition,
        ruFeatureTitle: action.payload.ruFeatureTitle,
        ruFeatures: action.payload.ruFeatures.map((item) => item.text),
        ruAddition: action.payload.ruAddition,
      };

    case "RESET_STATE":
      return initialState;

    default:
      return state;
  }
};
