let allState = ''
const myReducer = (state = allState, action) => {
    switch (action.type) {
        case "ALL_GOODS":
            return {
                ...state,
                allGoods: action.payload
            }

        case "HANDLE_CART":
            let { any, value, id } = action.payload

            let updateGood = state.allGoods.map(good => {
                if (good._id == id && any !== 'empty' && any !== 'checkout') {
                    return {
                        ...good,
                        customerQuantity:
                            any === 'addItem' && good.quantity < 1 ? good.customerQuantity = 'out of stock' :
                                any === 'addItem' ? good.customerQuantity = 1 :
                                    any === 'add' && good.customerQuantity >= good.quantity ? good.customerQuantity = good.quantity :
                                        any === 'add' ? good.customerQuantity += 1 :
                                            any === 'subtract' && good.customerQuantity >= 1 ? good.customerQuantity -= 1 :
                                                any === 'subtract' && good.customerQuantity < 1 ? good.customerQuantity = 0 :
                                                    good.customerQuantity,
                        addItem:
                            any === 'addItem' ? good.addItem = false :
                                any === 'subtract' && good.customerQuantity < 1 ? good.addItem = true :
                                    good.addItem,
                    }

                }

                if (any === 'empty') {
                    return {
                        ...good,
                        customerQuantity: good.customerQuantity = 0
                    }
                }

                return good
            })

            return {
                ...state,
                allGoods: updateGood
            }
        case "CHECK_OUT":
            return {
                ...state,
                allGoods: state.allGoods.map((good) => ({
                    ...good,
                    customerQuantity: good.customerQuantity = 0,
                    addItem: good.addItem = true
                }))
            }

    }
    return state
}
export default myReducer;