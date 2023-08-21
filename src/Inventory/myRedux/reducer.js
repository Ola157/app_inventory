const initialState = {
    allGoods: [],
    cart: [],
    userLoggedIn: false,
    modal: '',
    allOrders: [],
    personalDetails: {},
    address: {},
}

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ALL_GOODS":
            return {
                ...state,
                allGoods: action.payload,
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
            let { type, itemId } = action.payload
            let updateGood = state.allGoods.map(good => {
                if (good._id === itemId) {
                    console.log(type)
                    return {
                        ...good,
                        addItem: type === 'addItem' ? false :
                            type === 'cancel' ? good.addItem = true
                                : good.addItem,
                        customerQuantity: type === 'addItem' ? good.customerQuantity = 1
                            : type == 'add' ? good.customerQuantity += 1
                                : type === 'subtract' ? good.customerQuantity -= 1 :
                                    type === 'cancel' ? good.customerQuantity = 0
                                        : good.customerQuantity
                    }

                }

                if (type === 'empty') {

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

        case "LOG_OUT":
            return {
                ...state,
                userLoggedIn: false
            }
    }
    return state
}
export default myReducer;