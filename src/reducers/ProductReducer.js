const ProductReducer = (state, action) => {
  //console.log("in ProductReducer", state);

  switch (action.type) {
    case "CHANGE_CATEGORY":
      return {
        ...state,
        filteredProducts:
          action.payload.category === "All"
            ? { ...state.products }
            : state.products.filter(
                (p) => p.category === action.payload.category
              ),
      };
    default:
      return state;
  }
};

export default ProductReducer;
