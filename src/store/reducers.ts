// reducers.ts
const initialState = {
  cartItems: [],
  checkoutCompleted: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      console.log(action.payload);
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "DELETE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_CART_ITEM":
      const { itemId, updatedItem } = action.payload;
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.title == itemId) {
          return { ...item, ...updatedItem };
        }
        return item;
      });
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    case "CHECKOUT":
      return {
        ...state,
        cartItems: [],
        checkoutCompleted: true,
      };
    default:
      return state;
  }
};

export default cartReducer; // Export the reducer as a module
