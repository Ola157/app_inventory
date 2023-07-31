import axios, { all } from "axios"

export const handleFetch = () => {
    return async (dispatch) => {
        try {
            let response = await axios.get('http://localhost:9810/store/getAllgoods', null)
            let { allGoods } = response.data
            dispatch({ type: "ALL_GOODS", payload: allGoods })
        }
        catch (err) {
            console.log(err)
        }
    }

}

export const handleAddGoods = (goodsDetails, customerQuantity, addItem, itemEdit) => {
    return async () => {
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
                let response = await axios.post('http://localhost:9810/store/addGoods', formData,
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
}
export const handleAllCart = (any, value, id) => {
    return (dispatch) => {
        dispatch({ type: "HANDLE_CART", payload: { any, value, id } })
    }
}

export const handleCheckingOut = (allGoods) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:9810/store/checkout', { allGoods }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            if (response.data === 'payment successful') {
                dispatch({ type: "CHECK_OUT" })
                alert(response.data)
            }
            else { alert(response.data) }
        }
        catch (err) { console.log(err) }
    }
}

export const handleAmends = (value) => {
    let { any, _id, nimage, nitem, nquantity, nprice, ndetail } = value
    return async (dispatch) => {
        switch (any) {
            case 'edit':
                try {
                    let response = await axios.patch(`http://localhost:9810/store/editItem/${_id}`, null)
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

                    let response = await axios.post(`http://localhost:9810/store/editDone/${_id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/formdata'
                        }
                    })
                }
                catch (err) { console.error(err) }
                break;
            case 'remove':
                try {
                    let response = await axios.delete(`http://localhost:9810/store/deleteItem/${_id}`, null)
                }
                catch (err) { console.error(err) }
                break;
        }
    }
}