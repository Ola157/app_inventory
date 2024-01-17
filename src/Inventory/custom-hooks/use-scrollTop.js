import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { funcNavClose } from "../myRedux/myActions"

const useScrollTop = () => {

    const activeCategory = useSelector(state => state.activeCategory)
    const isMenu = useSelector(state => state.isMenu)
    const isGMenu = useSelector(state => state.isGMenu)
    const isSearch = useSelector(state => state.isSearch)
    const isStore = useSelector(state => state.isStore)
    const isSignin = useSelector(state => state.isSignin)
    const dispatch = useDispatch()
    const invenTory = document.querySelector('.inventory')

    useEffect(() => {

        invenTory.addEventListener('click', scrollToTop)
        console.log(invenTory)

        return () => {
            invenTory.removeEventListener('click', scrollToTop)
        }

    }, [activeCategory, isMenu, isSearch, isStore, isSignin, isGMenu])

    const scrollToTop = () => {
        dispatch(funcNavClose())

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

export default useScrollTop