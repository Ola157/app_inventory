import { useDispatch } from "react-redux"
import { funcCategory, funcDepartment, funcGMenu, funcItemDepartment, funcMenu, funcSearch, funcSignIn, funcStore } from "../myRedux/myActions"
import useNavigator from "./use-Navigation"

const useCategory = () => {
    const dispatch = useDispatch()
    const [handleNavigation] = useNavigator()

    const handleToggleCategory = (category) => {
        console.log('cat', category)
        if (category === 'favorite') {
            handleNavigation('/signIn/signin/user')
        }

        dispatch(funcCategory(category))
    }

    const toggleDepartment = (department, deptcategory) => {
        if (deptcategory) {
            handleToggleCategory(deptcategory)
        }

        dispatch(funcDepartment(department, deptcategory))
    }

    const toggleInnerDepartment = (department) => {
        dispatch(funcItemDepartment(department))
    }

    const handleNavBtn = (toggleType) => {

        dispatch(funcCategory(null))

        switch (toggleType) {
            case 'search':
                dispatch(funcSearch());
                break
            case 'signin':
                handleNavigation('/signIn/landing/*')
                dispatch(funcSignIn());
                break
            case 'menu':
                dispatch(funcMenu());
                break
            case 'grocerymenu':
                dispatch(funcGMenu());
                break
            case 'store':
                dispatch(funcStore());
                break
        }
    }

    return [handleToggleCategory, toggleDepartment, toggleInnerDepartment, handleNavBtn]
}
export default useCategory