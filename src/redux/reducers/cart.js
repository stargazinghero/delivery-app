import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        quantity: 0,
        cartItems: [],
        totalPrice: 0,
    },
    reducers: {
        addToCart: (state, { payload }) => {
            const checkProduct = state.cartItems.find(
                item => item.id === payload.id,
            );
            if (!checkProduct) {
                state.cartItems = [
                    ...state.cartItems,
                    { ...payload, quantity: 1 },
                ];
            } else {
                state.cartItems = state.cartItems.map(item => {
                    if (item.id === payload.id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
            state.quantity++;
            state.totalPrice += payload.price;
        },

        removeFromCart: (state, { payload }) => {
            state.cartItems = state.cartItems.filter(
                item => item.id !== payload.id,
            );
            state.quantity -= payload.quantity;
            state.totalPrice -= payload.price * payload.quantity;
        },

        addItemQuantity: (state, { payload }) => {
            state.cartItems = state.cartItems.map(item => {
                if (item.id === payload.id) {
                    return { ...item, quantity: item.quantity + 1 };
                } else {
                    return item;
                }
            });
            state.quantity++;
            state.totalPrice += payload.price;
        },

        subtractItemQuantity: (state, { payload }) => {
            const subItem = state.cartItems.find(
                item => item.id === payload.id,
            );
            if (subItem.quantity === 1) {
                state.cartItems = state.cartItems.filter(
                    item => item.id !== subItem.id,
                );
            } else {
                subItem.quantity -= 1;
            }
            state.quantity--;
            state.totalPrice -= subItem.price;
        },
        clearCart: state => {
            state.cartItems = [];
            state.quantity = 0;
            state.totalPrice = 0;
        },
    },
});

export const cartItemsState = state => state.cart.cartItems;
export const totalPriceState = state => state.cart.totalPrice;
export const quantityState = state => state.cart.quantity;

export const cartReducer = cartSlice.reducer;

export const {
    addToCart,
    removeFromCart,
    addItemQuantity,
    subtractItemQuantity,
    clearCart,
} = cartSlice.actions;
