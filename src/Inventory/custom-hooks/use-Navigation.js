import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { funcNavClose } from "../myRedux/myActions"

const useNavigator = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleNavigation = (initial) => {
        dispatch(funcNavClose())
        navigate(initial)
    }

    return [handleNavigation]
}
export default useNavigator