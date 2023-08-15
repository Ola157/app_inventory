const initialState = {
    allGoods: [],
    cart: [],
    userLoggedIn: false,
    modal: '',
    allOrders: [],
    personalDetails: {},
    address: {}
}

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ALL_GOODS":
            return {
                ...state,
                allGoods: action.payload,
                userLoggedIn: false
            }
        case "HANDLE_CARTFETCH":
            return {
                ...state,
                cart: action.payload
            }

        case "MODAL_RESPONSE":
            return {
                ...state,
                modal: action.payload
            }

        case "HANDLE_CART":
            let { any, itemId, customerQuantity } = action.payload
            let updateGood = state.allGoods.map(good => {
                if (good._id === itemId && any !== 'empty' && any !== 'checkout') {
                    return {
                        ...good,
                        customerQuantity: any === 'addItem' ? good.customerQuantity = customerQuantity : good.customerQuantity,
                        addItem: any === 'buy' ? false : any === 'addItem' || any ? true : good.addItem
                    }

                }

                if (any === 'empty') {

                    return {
                        ...good,
                        customerQuantity: 0,
                    }
                }

                return good
            })

            return {
                ...state,
                allGoods: updateGood,
            }

        case "CHECK_OUT":

            return {
                ...state,
                allGoods: state.allGoods.map((good) => action.payload === 'payment successful' ? ({
                    ...good,
                    customerQuantity: 0,
                    addItem: true,
                }) : good),
                modal: action.payload === 'payment successful' ? `${action.payload}, thanks for shopping with us` : state.modal
            }

        case "LOGIN_SUCCESS":
            return {
                ...state,
                userLoggedIn: true
            }

        case "REG_SUCCESS":
            return {
                ...state,
                userLoggedIn: 'Registered'
            }

        case "CLEAR_MODAL":
            return {
                ...state,
                modal: ''
            }
        case "ADDRESS":
            return {
                ...state,
                address: action.payload
            }

        case "PERSONAL_DETAILS":
            let { title, email, firstName, lastName, mobNumber, alterNum } = action.payload
            return {
                ...state,
                personalDetails: { title, email, firstName, lastName, mobNumber, alterNum }
            }
        case "ALL_ORDERS":
            return {
                ...state,
                allOrders: action.payload
            }
        case "SHOW_ORDER":
            let showOrder = state.allOrders.map((orders) => action.payload === orders._id ? ({
                ...orders,
                showOrder: !orders.showOrder
            }) : orders)
            return {
                ...state,
                allOrders: showOrder
            }
    }
    return state
}
export default myReducer;