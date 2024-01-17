import React, { Fragment } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useSelector } from "react-redux";
import { MdArrowBackIos } from "react-icons/md";
import ShoppingDept from "./NavShoppingDept";
import useCategory from "../custom-hooks/use-category";
import useNavigator from "../custom-hooks/use-Navigation";


const CategoryList = ({ }) => {

    const activeCategory = useSelector(state => state.activeCategory)
    const categories = useSelector(state => state.categories)
    const activeDepartment = useSelector(state => state.activeDepartment)
    const shoppingDept = useSelector(state => state.department)
    const page = useSelector(state => state.page)
    const [handleToggleCategory, toggleDepartment, toggleInnerDepartment, handleNavBtn] = useCategory()
    const [handleNavigation] = useNavigator()

    return (<>

        {
            Object.keys(categories).map((category, index) => (
                <ul key={index} className={activeCategory === category ? 'active' : ''}>
                    <li className="d-flex justify-content-start p-0 px-1 py-1 d-block d-md-none">
                        <button onClick={() => handleToggleCategory(null)}>
                            <span className="me-1"><MdArrowBackIosNew size={20} /></span>   Back
                        </button>
                    </li>
                    {categories[category].map((item, i) => {

                        const newITEM = Object.keys(shoppingDept).find(a => a === item);

                        return (
                            <li key={i} onClick={page === 'GROCERYPAGE' ?
                                () => toggleDepartment(item) :
                                () => handleNavigation('shopgrocery')} className={activeDepartment === item && page === 'GROCERYPAGE' ? 'clicked' : ''}>
                                <span style={{ textDecoration: 'none' }}>{item}{newITEM && <MdArrowBackIos className="svg_grocery" />}</span>
                            </li>
                        )
                    })}
                </ul>
            ))
        }


        <ShoppingDept toggleInnerDepartment={toggleInnerDepartment} />
    </>);
};

export default CategoryList