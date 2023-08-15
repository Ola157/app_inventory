import axios from "axios"

const actionTypes = {
    ALL_GOODS: "ALL_GOODS",
    HANDLE_CARTFETCH: "HANDLE_CARTFETCH",
    HANDLE_CART: "HANDLE_CART",
    CHECK_OUT: "CHECK_OUT",
    REG_SUCCESS: "REG_SUCCESS",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    MODAL_RESPONSE: "MODAL_RESPONSE",
    CLEAR_MODAL: "CLEAR_MODAL",
    ADDRESS: "ADDRESS",
    PERSONALDETAILS: "PERSONAL_DETAILS",
    ALL_ORDERS: 'ALL_ORDERS',
    SHOW_ORDER: "SHOW_ORDER"
};

export const handleFetch = () => async (dispatch) => {

    try {
        const response = await axios.get('https://inventory-be-seven.vercel.app/store/getAllgoods');
        const { allGoods } = response.data;
        dispatch({ type: actionTypes.ALL_GOODS, payload: allGoods });
    } catch (err) {
        console.log(err);
    }
}

export const handleAddGoods = (goodsDetails, customerQuantity, addItem, itemEdit) => async () => {
    let { item, quantity, image, price, detail } = goodsDetails
    if (item !== '' && quantity !== '' && price !== '' && detail !== '' && image !== '') {
        let formData = new FormData()
        formData.append("image", image)
        formData.append("item", item)
        formData.append("quantity", quantity)
        formData.append("price", price)
        formData.append("detail", detail)
        formData.append("itemEdit", itemEdit)
        formData.append('addItem', addItem)
        formData.append('customerQuantity', customerQuantity)

        try {
            await axios.post('https://inventory-be-seven.vercel.app/store/addGoods', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/formdata'
                    }
                }
            )
        }
        catch (err) { console.error(err) }

    }

    else { alert('inputs cant be blank') }

}

export const handleFetchCart = () => async (dispatch) => {
    let myJwt = localStorage.getItem('myAccessToken')
    try {
        let response = await axios.get('https://inventory-be-seven.vercel.app/user/fetchcart', {
            headers: {
                'Authorization': `Bearer ${myJwt}`
            }
        })
        let { cart } = response.data
        dispatch({ type: actionTypes.HANDLE_CARTFETCH, payload: cart })
    }
    catch (err) {
        console.log(err)
    }
}


export const handleAllCart = (value, data) => async (dispatch) => {
    let myJwt = localStorage.getItem('myAccessToken')
    let { any, itemId, customerQuantity } = value
    dispatch({ type: "HANDLE_CART", payload: { any, itemId, customerQuantity } })

    if (any === 'addItem') {

        setTimeout(async () => {
            try {
                await axios.post('https://inventory-be-seven.vercel.app/user/cart', data, {
                    headers: {
                        'Authorization': `Bearer ${myJwt}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
            }
            catch (err) { console.log(err) }
        }, 1000)
    }

    if (any === 'empty') {
        try {
            await axios.delete('https://inventory-be-seven.vercel.app/user/clearCart', {
                headers: {
                    'Authorization': `Bearer ${myJwt}`,
                }
            })
        }
        catch (err) { console.log(err) }
    }

    if (any === 'removeItem') {
        try {
            await axios.patch(`https://inventory-be-seven.vercel.app/user/removeItem/${itemId}`, null, {
                headers: {
                    'Authorization': `Bearer ${myJwt}`,
                }
            })

        }
        catch (err) { console.log(err) }
    }
}

export const handleCheckingOut = () => async (dispatch) => {
    let myJwt = localStorage.getItem('myAccessToken')
    try {
        const response = await axios.post('https://inventory-be-seven.vercel.app/store/checkout', null, {
            headers: {
                'Authorization': `Bearer ${myJwt}`,
            }
        });
        dispatch({ type: actionTypes.CHECK_OUT, payload: response.data })

    }
    catch (err) { console.log(err) }
}

export const handleAmends = (data) => async () => {
    let { any, _id, nimage, nitem, nquantity, nprice, ndetail } = data

    switch (any) {
        case 'edit':
            try {
                await axios.patch(`https://inventory-be-seven.vercel.app/store/editItem/${_id}`, null)
            }
            catch (err) { console.error(err) }
            break;
        case 'done':
            try {
                let formData = new FormData()
                formData.append("item", nitem)
                formData.append("quantity", nquantity)
                formData.append("price", nprice)
                formData.append("detail", ndetail)
                formData.append("image", nimage)

                await axios.post(`https://inventory-be-seven.vercel.app/store/editDone/${_id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/formdata'
                    }
                })
            }
            catch (err) { console.error(err) }
            break;
        case 'remove':
            try {
                await axios.delete(`https://inventory-be-seven.vercel.app/store/deleteItem/${_id}`, null)
            }
            catch (err) { console.error(err) }
            break;
    }
}

export const handle_Email_Password = (data) => async (dispatch) => {
    let { type, email, title, password, firstName, lastName, mobNumber } = data
    if (type === 'signup') {
        try {
            let response = await axios.post('https://inventory-be-seven.vercel.app/user/register', { email, title, password, firstName, lastName, mobNumber }, {

                // let response = await axios.post('https://inventory-be-seven.vercel.app/user/register', { email, title, password, firstName, lastName, mobNumber }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            if (response.data === 'registration successful') {
                dispatch({ type: actionTypes.REG_SUCCESS })
            }

            else if (response.data === 'user already exist') {
                dispatch({ type: actionTypes.MODAL_RESPONSE, action: response.data })
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    if (type === 'login') {
        try {
            let response = await axios.post('https://inventory-be-seven.vercel.app/user/login', { email, password }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })

            if (response.data !== 'That email or password doesn’t look right. Please try again') {
                let { myAccessToken } = response.data
                localStorage.setItem('myAccessToken', myAccessToken)
                dispatch({ type: actionTypes.LOGIN_SUCCESS })
            }

            else if (response.data === 'That email or password doesn’t look right. Please try again') {
                dispatch({ type: actionTypes.MODAL_RESPONSE, payload: response.data })
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    // if (type === 'forgotPassword') {
    //     try {
    //         let response = await axios.post('httpss://inventory-be-seven.vercel.app/user/forgotPassword', { email, password })
    //     }
    //     catch (err) {

    //     }
    // }
}

export const handleModal = () => (dispatch) => {
    dispatch({ type: actionTypes.CLEAR_MODAL })
}

export const handleChanges = (data) => async (dispatch) => {
    let { any } = data
    let myJwt = localStorage.getItem('myAccessToken')
    if (any === 'address') {
        try {
            let response = await axios.post('https://inventory-be-seven.vercel.app/user/addAddress', { data }, {
                headers: {
                    'Authorization': `Bearer ${myJwt}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            let { address } = response.data
            dispatch({ type: actionTypes.ADDRESS, payload: address })
        }
        catch (err) { console.error(err) }
    }

    if (any === 'details') {
        try {
            let { title, firstName, lastName, email, epassword, newPassword, mobNumber, alterNumber } = data
            let response = await axios.post('https://inventory-be-seven.vercel.app/user/personalDetails', { title, firstName, lastName, email, epassword, newPassword, mobNumber, alterNumber }, {
                headers: {
                    'Authorization': `Bearer ${myJwt}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            if (response.data.email) {
                dispatch({ type: actionTypes.PERSONALDETAILS, payload: { title, firstName, lastName, email, newPassword, mobNumber, alterNumber } })
            }
            else if (response.data === 'incorrect password') {
                dispatch({ type: actionTypes.MODAL_RESPONSE, payload: response.data })
            }
        }
        catch (err) { console.error(err) }
    }
}

export const fetchPastOrders = () => async (dispatch) => {
    let myJwt = localStorage.getItem('myAccessToken')
    try {
        let response = await axios.get('https://inventory-be-seven.vercel.app/user/fetchAllOrders', {
            headers: {
                'Authorization': `Bearer ${myJwt}`
            }
        })
        let { allOrders } = response.data
        dispatch({ type: actionTypes.ALL_ORDERS, payload: allOrders })
    }
    catch (err) { console.error(err) }
}

export const handle_Display_Order = (id) => async (dispatch) => {

    dispatch({ type: actionTypes.SHOW_ORDER, payload: id })
}

export const handle_My_Address = () => async (dispatch) => {
    let myJwt = localStorage.getItem('myAccessToken')
    try {
        let response = await axios.get('https://inventory-be-seven.vercel.app/user/getAddress', {
            headers: {
                'Authorization': `Bearer ${myJwt}`
            }
        })
        let { address } = response.data
        dispatch({ type: actionTypes.ADDRESS, payload: address })
    }
    catch (err) { console.error(err) }
}

export const handle_My_Details = () => async (dispatch) => {
    let myJwt = localStorage.getItem('myAccessToken')
    try {
        let response = await axios.get('https://inventory-be-seven.vercel.app/user/getDetails', {
            // let response = await axios.get('https://inventory-be-seven.vercel.app/user/getDetails', {
            headers: {
                'Authorization': `Bearer ${myJwt}`
            }
        })
        let { title, email, firstName, lastName, mobNumber, alterNumber } = response.data
        dispatch({ type: actionTypes.PERSONALDETAILS, payload: { title, email, firstName, lastName, mobNumber, alterNumber } })
    }
    catch (err) { console.error(err) }
}


export const handle_Adress_Amends = (type, addressId) => async (dispatch) => {
    let myJwt = localStorage.getItem('myAccessToken');
    try {
        switch (type) {
            case 'edit':
                try {
                    let response = await axios.patch(`https://inventory-be-seven.vercel.app/user/editAddress/${addressId}`,
                        null,
                        {
                            headers: {
                                'Authorization': `Bearer ${myJwt}`,
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }
                    )
                    let { address } = response.data
                    dispatch({ type: actionTypes.ADDRESS, payload: address })
                }
                catch (err) { console.error(err) }
                break;

            case 'cancel':
                try {
                    let response = await axios.patch(`https://inventory-be-seven.vercel.app/user/editAddress/${type}`,
                        null,
                        {
                            headers: {
                                'Authorization': `Bearer ${myJwt}`,
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }
                    )
                    let { address } = response.data
                    dispatch({ type: actionTypes.ADDRESS, payload: address })
                }
                catch (err) { console.error(err) }
                break;

            case 'delete':
                try {
                    let response = await axios.delete(`https://inventory-be-seven.vercel.app/user/deleteAddress/${addressId}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${myJwt}`,
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }
                    );
                    let { address } = response.data
                    dispatch({ type: actionTypes.ADDRESS, payload: address })
                }
                catch (err) { console.error(err) }
                break;

            default:
                break;
        }
    }
    catch (err) {
        console.error(err);
    }
};
