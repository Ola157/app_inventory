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
    ALL_CART_RECORDS: 'ALL_CART_RECORDS',
    CART_RECORD: 'CART_RECORD',
    LOG_OUT: "LOG_OUT",
    REMOVE_ITEM: "REMOVE_ITEM",
    CLEAR_CART: "CLEAR_CART",
    VIEWED_ITEM: 'VIEWED_ITEM',
    SEARCHED_ITEM: "SEARCHED_ITEM",
    MESSAGE: "MESSAGE",
    LINK: "LINK",
    WEBSITE: "WEBSITE",
    SEARCH: "SEARCH",
    MENU: 'MENU',
    STORE: "STORE",
    ABOUT: "ABOUT",
    HELP: 'HELP',
    NAV: 'NAV',
    CATEGORY: 'CATEGORY',
    SIGNIN: 'SIGNIN'
};


export const handleAuth = (data) => (dispatch) => {
    const { type, email, title, password, firstName, lastName, mobNumber } = data;
    if (type === 'signup') {
        axios
            .post('https://inventory-be-seven.vercel.app/user/register', { email, title, password, firstName, lastName, mobNumber }, {
                // .post('http://localhost:9810/user/register', { email, title, password, firstName, lastName, mobNumber }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((response) => {
                const { message } = response.data;
                if (message === 'Registration successful') {
                    dispatch({ type: actionTypes.MESSAGE, payload: { message } });
                    dispatch({ type: actionTypes.REG_SUCCESS, payload: { value: false } });
                } else if (message === 'User already exists') {
                    dispatch({ type: actionTypes.MESSAGE, payload: { message } });
                }
                setTimeout(() => {
                    dispatch({ type: actionTypes.MESSAGE, payload: { message: '' } });
                }, 2000)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    if (type === 'login') {
        axios
            // .post('http://localhost:9810/user/login', { email, password }, {
            .post('https://inventory-be-seven.vercel.app/user/login', { email, password }, {

                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((response) => {
                const { message, accessToken } = response.data;
                if (message === "login successful") {
                    localStorage.setItem('accessToken', accessToken);
                    dispatch({ type: actionTypes.LOGIN_SUCCESS });
                } else {
                    dispatch({ type: actionTypes.MESSAGE, payload: { message } });
                }
                setTimeout(() => {
                    dispatch({ type: actionTypes.MESSAGE, payload: { message: '' } });
                }, 2000)
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

export const handleIsReg = (value) => (dispatch) => {
    dispatch({ type: actionTypes.REG_SUCCESS, payload: { value } });
}

export const handleSignOut = () => (dispatch) => {
    dispatch({ type: actionTypes.LOG_OUT });
};

export const handleGetGoods = () => (dispatch) => {
    axios
        // .get('http://localhost:9810/store/getgoods')
        .get('https://inventory-be-seven.vercel.app/store/getgoods')
        .then((response) => {
            const { goods } = response.data;
            dispatch({ type: actionTypes.ALL_GOODS, payload: { goods } });
        })
        .catch((error) => {
            console.error('Error while fetching goods:', error);
        });
};

export const handleAddGoods = (data) => (dispatch) => {
    const { item, quantity, image, price, description } = data;
    let formData = new FormData();
    formData.append('image', image);
    formData.append('item', item);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('description', description);

    axios
        // .post('http://localhost:9810/store/addGoods', formData, {
        .post('https://inventory-be-seven.vercel.app/store/addGoods', formData, {
            headers: {
                'Content-Type': 'multipart/formdata',
            },
        })
        .then((response) => {
            const { message } = response.data;
            dispatch({ type: actionTypes.MESSAGE, payload: { message } });
            setTimeout(() => {
                dispatch({ type: actionTypes.MESSAGE, payload: { message: '' } });
            }, 2000)
        })
        .catch((error) => {
            console.error(error);
        });
};

export const handleAllRecords = () => (dispatch) => {
    const myJwt = localStorage.getItem('accessToken');

    axios
        // .get('http://localhost:9810/user/records', {
        .get('https://inventory-be-seven.vercel.app/user/records', {
            headers: {
                'Authorization': `Bearer ${myJwt}`
            }
        }
        )
        .then((response) => {
            const { records, message } = response.data;
            if (records) return dispatch({ type: actionTypes.ALL_CART_RECORDS, payload: records });
            dispatch({ type: actionTypes.MESSAGE, payload: { message } });
            setTimeout(() => {
                dispatch({ type: actionTypes.MESSAGE, payload: { message: '' } });
            }, 2000)
        })
        .catch((error) => {
            console.error(error);
        });
};

export const handleMessage = (message) => (dispatch) => {
    dispatch({ type: actionTypes.MESSAGE, payload: { message } });

    setTimeout(() => {
        dispatch({ type: actionTypes.MESSAGE, payload: { message: '' } });
    }, 2000)
};

export const handleViewed = (itemId) => (dispatch) => {
    axios
        // .get(`http://localhost:9810/store/viewmore/${itemId}`)
        .get(`https://inventory-be-seven.vercel.app/store/viewmore/${itemId}`)
        .then((response) => {
            const { viewed } = response.data;
            dispatch({ type: actionTypes.VIEWED_ITEM, payload: { viewed } });
        })
        .catch((error) => {
            console.error(error);
        });
};

export const handleSearch = (event) => (dispatch) => {
    if (!event) {
        dispatch({ type: actionTypes.SEARCHED_ITEM, payload: { items: event } });
    } else if (event) {
        setTimeout(() => {
            axios
                // .get(`http://localhost:9810/store/searchItem/${event}`)
                .get(`https://inventory-be-seven.vercel.app/store/searchItem/${event}`)
                .then((response) => {
                    const { items, message } = response.data;
                    dispatch({ type: actionTypes.MESSAGE, payload: { message } });
                    dispatch({ type: actionTypes.SEARCHED_ITEM, payload: { items } });
                    setTimeout(() => {
                        dispatch({ type: actionTypes.MESSAGE, payload: { message: '' } });
                    }, 2000)
                })
                .catch((error) => {
                    console.error(error);
                });
        }, 800);
    }
};

export const handleCartPull = (kind) => (dispatch) => {
    const myJwt = localStorage.getItem('accessToken');
    // axios.get('http://localhost:9810/user/pullCart', {
    axios.get('https://inventory-be-seven.vercel.app/user/pullCart', {
        headers: {
            'Authorization': `Bearer ${myJwt}`
        }
    }).then((response) => {
        const { cart } = response.data;
        dispatch({ type: actionTypes.HANDLE_CARTFETCH, payload: { cart, kind } });
    }).catch((error) => {
        console.log(error);
    });
};

export const handleCartChanges = (type, itemId) => (dispatch) => {
    const myJwt = localStorage.getItem('accessToken');
    if (type === 'clearcart') {
        axios
            // .delete('http://localhost:9810/user/clearCart', {
            .delete('https://inventory-be-seven.vercel.app/user/clearCart', {
                headers: {
                    'Authorization': `Bearer ${myJwt}`
                }
            })
            .then((response) => {
                const { cart } = response.data;
                dispatch({ type: actionTypes.HANDLE_CARTFETCH, payload: { cart } });

            })
            .catch((error) => {
                console.log(error);
            });
    }

    if (type === 'removeItem') {
        dispatch({ type: actionTypes.REMOVE_ITEM, payload: { itemId } });
        axios
            // .patch(`http://localhost:9810/user/removeItem/${itemId}`, null, {
            .patch(`https://inventory-be-seven.vercel.app/user/removeItem/${itemId}`, null, {
                headers: {
                    'Authorization': `Bearer ${myJwt}`
                }
            }).then((response) => {
                const { cart } = response.data;
                dispatch({ type: actionTypes.HANDLE_CARTFETCH, payload: { cart } });
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

export const handleUserQuantity = (itemId, userQuantity) => (dispatch) => {
    const myJwt = localStorage.getItem('accessToken');

    dispatch({ type: actionTypes.HANDLE_CART, payload: { itemId, userQuantity } });
    setTimeout(() => {
        // axios.post(`http://localhost:9810/user/cart/${itemId}`, { userQuantity }, {
        axios.post(`https://inventory-be-seven.vercel.app/user/cart/${itemId}`, { userQuantity }, {
            headers: {
                'Authorization': `Bearer ${myJwt}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            const { cart } = response.data;
            dispatch({ type: actionTypes.HANDLE_CARTFETCH, payload: { cart } });
        }).catch((error) => {
            console.log(error);
        });
    }, 500);
};

export const handleCheckingOut = () => (dispatch) => {
    const myJwt = localStorage.getItem('accessToken');

    axios
        // .post('http://localhost:9810/store/checkout', null, {
        .post(`https://inventory-be-seven.vercel.app/store/checkout`, null, {

            headers: {
                'Authorization': `Bearer ${myJwt}`
            }
        })
        .then((response) => {
            const { message } = response.data;
            dispatch({ type: actionTypes.MESSAGE, payload: { message } });
            dispatch({ type: actionTypes.CHECK_OUT, payload: { message } });
            setTimeout(() => {
                dispatch({ type: actionTypes.MESSAGE, payload: { message: '' } });
            }, 2000)
        })
        .catch((error) => {
            console.log(error);
        });
};

export const handleProductChanges = (data) => () => {
    let { type, _id, newImage, newItem, newQuantity, newPrice, newDescription } = data;

    switch (type) {
        case 'edit':
            axios.patch(`https://inventory-be-seven.vercel.app/store/edit/${_id}`, null)
                // axios.patch(`http://localhost:9810/store/edit/${_id}`, null)
                .catch((error) => {
                    console.error(error);
                });
            break;
        case 'save':
            let formData = new FormData();
            formData.append("item", newItem);
            formData.append("quantity", newQuantity);
            formData.append("price", newPrice);
            formData.append("image", newImage);
            formData.append("description", newDescription);

            axios
                .post(`https://inventory-be-seven.vercel.app/store/save/${_id}`, formData, {
                    // .post(`http://localhost:9810/store/save/${_id}`, formData, {

                    headers: {
                        'Content-Type': 'multipart/formdata'
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            break;
        case 'delete':
            axios
                .delete(`https://inventory-be-seven.vercel.app/store/delete/${_id}`, null)
                // .delete(`http://localhost:9810/store/delete/${_id}`, null)
                .catch((error) => {
                    console.error(error);
                });
            break;
        case 'cancel':
            axios.patch(`https://inventory-be-seven.vercel.app/store/cancel/${_id}`, null).catch((error) => {
                console.error(error);
            });
            break;
    }
};

export const handleRecord = (recordId) => (dispatch) => {
    const myJwt = localStorage.getItem('accessToken');

    axios.get(`https://inventory-be-seven.vercel.app/user/getcartRecord/${recordId}`, {
        // axios.get(`http://localhost:9810/user/getcartRecord/${recordId}`, {
        headers: {
            'Authorization': `Bearer ${myJwt}`
        }
    }).then((response) => {
        const { cartRecord } = response.data;
        dispatch({ type: actionTypes.CART_RECORD, payload: { cartRecord } });
    }).catch((error) => {
        console.error(error);
    });
}

export const AddAddress = (data) => (dispatch) => {
    const myJwt = localStorage.getItem('accessToken');
    axios
        .post('https://inventory-be-seven.vercel.app/user/addAddress', { data }, {
            // .post('http://localhost:9810/user/addAddress', { data }, {
            headers: {
                'Authorization': `Bearer ${myJwt}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {

            const { address } = response.data;
            dispatch({ type: actionTypes.ADDRESS, payload: address });

        })
        .catch((error) => {
            console.error(error);
        });
};

export const handleFetchAddress = () => (dispatch) => {
    const myJwt = localStorage.getItem('accessToken');

    axios
        .get('https://inventory-be-seven.vercel.app/user/getAddress', {
            // .get('http://localhost:9810/user/getAddress', {

            headers: {
                'Authorization': `Bearer ${myJwt}`
            }
        })
        .then((response) => {
            const { address } = response.data;
            dispatch({ type: actionTypes.ADDRESS, payload: address });
        })
        .catch((error) => {
            console.error(error);
        });
};

export const handleAddressDelete = (addressId) => (dispatch) => {
    const myJwt = localStorage.getItem('accessToken');

    axios.delete(`https://inventory-be-seven.vercel.app/user/deleteAddress/${addressId}`, {
        // axios.delete(`http://localhost:9810/user/deleteAddress/${addressId}`, {

        headers: {
            'Authorization': `Bearer ${myJwt}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((response) => {
        const { address } = response.data;
        dispatch({ type: actionTypes.ADDRESS, payload: address });
    }).catch((error) => {
        console.error(error);
    });

};

export const handleFetchPersonalDetails = () => (dispatch) => {
    const myJwt = localStorage.getItem('accessToken');

    axios.get('https://inventory-be-seven.vercel.app/user/getDetails', {
        headers: {
            'Authorization': `Bearer ${myJwt}`
        }
    }).then((response) => {
        const { user } = response.data;
        dispatch({ type: actionTypes.PERSONALDETAILS, payload: user });
    }).catch((error) => {
        console.error(error);
    });
};

export const handleUpdateDetails = (data) => (dispatch) => {
    const myJwt = localStorage.getItem('accessToken');
    axios.post('https://inventory-be-seven.vercel.app/user/updateDetails', data, {
        // axios.post('http://localhost:9810/user/updateDetails', data, {
        headers: {
            'Authorization': `Bearer ${myJwt}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((response) => {
        const { user } = response.data;
        dispatch({ type: actionTypes.PERSONALDETAILS, payload: user });
    }).catch((error) => {
        console.error(error);
    });
};

export const funcSearch = (value) => (dispatch) => {
    dispatch({ type: actionTypes.SEARCH, payload: { value } })
}

export const funcMenu = (value) => (dispatch) => {
    dispatch({ type: actionTypes.MENU, payload: { value } })
}

export const funcStore = (value) => (dispatch) => {
    dispatch({ type: actionTypes.STORE, payload: { value } })
}

export const funcSignIn = (value) => (dispatch) => {
    dispatch({ type: actionTypes.SIGNIN, payload: { value } })
}

export const funcAbout = () => (dispatch) => {
    dispatch({ type: actionTypes.ABOUT })
}

export const funcHelp = () => (dispatch) => {
    dispatch({ type: actionTypes.HELP })
}

export const funcWeb = () => (dispatch) => {
    dispatch({ type: actionTypes.WEBSITE })
}

export const funcLink = () => (dispatch) => {
    dispatch({ type: actionTypes.LINK })
}


export const funcNavClose = () => (dispatch) => {
    dispatch({ type: actionTypes.NAV })
}

export const funcCategory = (category) => (dispatch) => {
    dispatch({ type: actionTypes.CATEGORY, payload: { category } })

}









