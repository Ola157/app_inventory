import { useDispatch } from "react-redux";
import { handleUserQuantity } from "../myRedux/myActions";

const useQuantity = () => {

    const dispatch = useDispatch();

    const handleAddClick = (data) => {
        const { itemId, newUserQuantity, quantity, page } = data;
        // if (!isLogged) {
        //     return (`/signIn/${page}/${itemId}`);
        // } else
        if (quantity > newUserQuantity + 1) {
            dispatch(handleUserQuantity(itemId, newUserQuantity + 1));
        } else if (quantity >= newUserQuantity + 1) {
            dispatch(handleUserQuantity(itemId, quantity));
        } else if (quantity < newUserQuantity + 1) {
            // handleIncomingMessage(`Item Out Of Stock, only ${quantity} available`);
        }
    };

    const handleSubtractClick = (data) => {
        const { itemId, newUserQuantity } = data;
        if (newUserQuantity > 1) {
            dispatch(handleUserQuantity(itemId, newUserQuantity - 1));
        } else {
            dispatch(handleUserQuantity(itemId, 0));
        }
    };
    return [handleAddClick, handleSubtractClick]
}

export default useQuantity;