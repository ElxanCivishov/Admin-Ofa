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

    case "AZ_ADD_FEATURE":
      return { ...state, azFeatures: [...state.azFeatures, action.payload] };
    case "AZ_REMOVE_FEATURE":
      return {
        ...state,
        azFeatures: state.azFeatures.filter(
          (feature) => feature !== action.payload
        ),
      };
    case "EN_ADD_FEATURE":
      return { ...state, enFeatures: [...state.enFeatures, action.payload] };
    case "EN_REMOVE_FEATURE":
      return {
        ...state,
        enFeatures: state.enFeatures.filter(
          (feature) => feature !== action.payload
        ),
      };
    case "RU_ADD_FEATURE":
      return { ...state, ruFeatures: [...state.ruFeatures, action.payload] };
    case "RU_REMOVE_FEATURE":
      return {
        ...state,
        ruFeatures: state.ruFeatures.filter(
          (feature) => feature !== action.payload
        ),
      };

    default:
      return state;
  }
};
