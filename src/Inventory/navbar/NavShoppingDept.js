import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { MdArrowBackIos } from "react-icons/md";
import useCategory from "../custom-hooks/use-category";

const ShoppingDept = ({ }) => {

    const shoppingDept = useSelector(state => state.department)
    const activeDepartment = useSelector(state => state.activeDepartment)
    const item = useSelector(state => state.item_department)
    const activeItemDepartment = useSelector(state => state.activeItemDepartment)
    const [handleToggleCategory, toggleDepartment, toggleInnerDepartment, handleNavBtn] = useCategory()

    return (<>
        {
            Object.keys(shoppingDept).map((deptKey, index) => (
                <div key={index} className={`shopping_dept_div ${activeDepartment === deptKey ? 'active' : ""}`}>
                    <ul className={activeDepartment === deptKey ? 'active' : ""}>
                        {shoppingDept[deptKey].slice(0, 11).map((dept, i) => {
                            const newITEM = Object.keys(item).find(a => a === dept);
                            return (
                                <li key={i} onClick={() => toggleInnerDepartment(dept)} className={activeItemDepartment === dept ? 'clicked' : ""}>
                                    {dept} {i !== 0 && newITEM && <MdArrowBackIos className="svg_grocery" />}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))
        }


        {Object.keys(item).map((good, index) => {
            const newItem = Object.values(shoppingDept).flat().find(a => a === good)

            return (<div key={index} className={`item_dept_div ${activeItemDepartment === good ? 'active' : ""}`}>

                <ul className={activeItemDepartment === good && newItem ? 'active' : ""}>

                    {item[good].slice(0, 11).map((dept, i) => (

                        <li key={i}>

                            {dept}

                        </li>))}

                </ul>
            </div>)
        })}

    </>)
}
export default ShoppingDept
