import {SET_IS_CUSTOMER} from './constants'

export const setIsCustomer = (is_customer) => {
  return {
    type: SET_IS_CUSTOMER,
    is_customer
  }
};