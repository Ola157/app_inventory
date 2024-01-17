import React from "react";
import CategoryList from "./Navcategory";
import { IoCloseSharp } from "react-icons/io5";
import useNavigator from "../custom-hooks/use-Navigation";
import useCategory from "../custom-hooks/use-category";


const Navmenu = ({ }) => {
    const [handleToggleCategory, toggleDepartment, toggleInnerDepartment, handleNavBtn] = useCategory()

    const multiFunc = () => {
        if (window.innerWidth > 830) {
            handleToggleCategory(null)
        } else {
            handleNavBtn('menu')
        }
    }


    return (
        <div>
            <span className="close-span">
                <button onClick={() => multiFunc()}>
                    Close <span><IoCloseSharp size={20} /></span>
                </button>
            </span>

            <CategoryList />


        </div >
    );
};
export default Navmenu;
