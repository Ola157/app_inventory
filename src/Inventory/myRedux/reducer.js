const initialState = {
    goods: [],
    cart: [],
    isLogged: false,
    isClickRegister: false,
    records: [],
    personalDetails: {},
    address: [],
    searched: [],
    viewed: {},
    message: '',
    cartRecord: [],
    isMenu: false,
    isSearch: false,
    isStore: false,
    isHelp: false,
    isAbout: false,
    isWebsite: false,
    isLink: false
}

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REG_SUCCESS':
            return {
                ...state,
                isClickRegister: action.payload.value
            }

        case "LOGIN_SUCCESS":
            return {
                ...state,
                isLogged: true
            }

        case "LOG_OUT":
            let allGoods = state.goods.map(item => item.addItem ? ({
                ...item,
                addItem: false,
                userQuantity: 0
            }) : item)

            return {
                ...state,
                cart: [],
                goods: allGoods,
                isLogged: false,
                records: [],
                personalDetails: {},
                address: {},
                searched: [],
                viewed: {},
                message: '',
                total: '',
                cartRecord: []
            }

        case "ALL_GOODS":
            const { goods } = action.payload;
            let updatedCart;

            if (state.cart.length) {
                updatedCart = state.goods.map((good) => {
                    const matchedItem = state.goods.find((item) => good.itemId === item._id);
                    return {
                        ...good,
                        userQuantity: matchedItem ? matchedItem.userQuantity : good.userQuantity,
                        addItem: matchedItem ? matchedItem.addItem : good.addItem,
                    };
                });
            }
            return {
                ...state,
                searched: [],
                goods: updatedCart
                    ? updatedCart
                    : goods.map((good) => ({
                        ...good,
                        userQuantity: 0,
                        _id: good._id,
                        addItem: false,
                    })),
            };

        case 'MESSAGE':
            const { message } = action.payload
            return {
                ...state,
                message
            }

        case "VIEWED_ITEM":
            const { viewed } = action.payload
            const matchedProd = state.goods.find(item => item._id === viewed._id)
            if (matchedProd) {
                viewed.userQuantity = matchedProd.userQuantity
                viewed.addItem = matchedProd.addItem
            }
            return {
                ...state,
                viewed: viewed
            }

        case "SEARCHED_ITEM":
            const { items } = action.payload
            let updateSearched = []
            for (const searched of items) {
                const matchedItem = state.goods.find(item => item._id == searched._id);
                if (matchedItem) {
                    updateSearched.push(matchedItem)
                }
            }
            return {
                ...state,
                searched: items.length ? updateSearched : []
            }

        case "HANDLE_CARTFETCH":
            const { cart, kind } = action.payload
            const total = cart.reduce((acc, item) => acc + item.cost, 0);
            return {
                ...state,
                goods: kind === 'updatequantity' && cart.length ?
                    state.goods.map(good => {
                        const matchedCartItem = cart.find(cartItem => cartItem.itemId === good._id);
                        if (matchedCartItem) {
                            return {
                                ...good,
                                userQuantity: matchedCartItem.userQuantity,
                                addItem: matchedCartItem.addItem
                            };
                        }
                        return good;
                    }) : state.goods,
                cart,
                total
            }

        case "HANDLE_CART":
            const { userQuantity, itemId } = action.payload;
            const updatingCart = state.goods.map(good => {
                if (good._id === itemId) {
                    const updatedGood = { ...good };

                    updatedGood.addItem = userQuantity > 0 ? true : userQuantity < 1 ? false : updatedGood.addItem;

                    updatedGood.userQuantity = userQuantity;

                    return updatedGood;
                }
                return good;
            });

            return {
                ...state,
                goods: updatingCart,
                viewed: state.viewed ? updatingCart.find(item => itemId === item._id) : state.viewed,
                searched: state.searched.length > 0 ? state.searched
                    .map(searched => updatingCart.find(item => searched._id === item._id))
                    .filter(reViewed => reViewed) : state.searched,
                total: state.cart.length ? state.cart.reduce((acc, item) => acc + item.cost, 0) : state.total
            };

        case "REMOVE_ITEM":
            let updatedGood = state.goods.map(good => good._id == action.payload.itemId ?
                ({
                    ...good,
                    userQuantity: 0,
                    addItem: false
                }) : good)

            let cartFilter = state.cart.filter(good => good.itemId != action.payload.itemId)
            return {
                ...state,
                goods: updatedGood,
                cart: cartFilter
            }

        case "CLEAR_CART":
            let updateCleared = state.goods.map(good => ({
                ...good,
                userQuantity: 0,
                addItem: false,
            }))
            return {
                ...state,
                goods: updateCleared,
                cart: [],
                total: ''
            }

        case "CHECK_OUT":
            return {
                ...state,
                goods: state.goods.map((good) => ({
                    ...good,
                    userQuantity: 0,
                    addItem: false
                })),
                cart: []
            }

        case "ALL_CART_RECORDS":
            return {
                ...state,
                records: action.payload.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateA - dateB;
                })
            }

        case 'CART_RECORD':
            const { cartRecord } = action.payload
            return {
                ...state,
                cartRecord
            }

        case "ADDRESS":
            return {
                ...state,
                address: action.payload
            }

        case "PERSONAL_DETAILS":
            let { title, email, firstName, lastName, mobileNumber, alternativeNumber } = action.payload
            return {
                ...state,
                personalDetails: { title, email, firstName, lastName, mobileNumber, alternativeNumber }
            }

        case "LINK":
            return {
                ...state,
                isLink: !state.isLink
            }

        case "HELP":
            return {
                ...state,
                isHelp: !state.isHelp
            }

        case "ABOUT":
            return {
                ...state,
                isAbout: !state.isAbout
            }

        case "WEBSITE":
            return {
                ...state,
                isWebsite: !state.isWebsite
            }

        case "STORE":
            return {
                ...state,
                isStore: !state.isStore,
                isMenu: false,
                isSearch: false
            }

        case "MENU":
            return {
                ...state,
                isMenu: !state.isMenu,
                isStore: false,
                isSearch: false
            }

        case "SEARCH":
            return {
                ...state,
                isSearch: !state.isSearch,
                isStore: false,
                isMenu: false
            }

        case "NAVIGATE":
            return {
                ...state,
                isSearch: false,
                isStore: false,
                isMenu: false
            }

    }
    return state
}
export default myReducer;