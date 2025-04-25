import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from '../features/transactions/transactionsSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    categories: categoriesReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
