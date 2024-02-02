// actions.js
export const addToCart = (item: any) => ({
  type: 'ADD_TO_CART',
  payload: item
});

export const deleteFromCart = (itemId: any) => ({
  type: 'DELETE_FROM_CART',
  payload: itemId
});

export const updateCartItem = (itemId: any, updatedItem: any) => ({
  type: 'UPDATE_CART_ITEM',
  payload: { itemId, updatedItem }
});

export const checkout = () => ({
  type: 'CHECKOUT'
});
