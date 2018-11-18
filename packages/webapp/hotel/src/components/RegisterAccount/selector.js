import { createSelector } from 'reselect/es';

const registerReducer = (state) => state.registerReducer;

const isCustomerSelector = createSelector(
  registerReducer,
  (state) => state.is_customer
);


export { isCustomerSelector };
