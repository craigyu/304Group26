import { SET_IS_CUSTOMER } from './constants';

const initialState = {
  is_customer: null,
};

function registerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_CUSTOMER:
      return Object.assign(state, { is_customer: action.is_customer });
    default:
      return state
  }
}

export default registerReducer;
