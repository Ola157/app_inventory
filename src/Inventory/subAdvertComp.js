import React from "react";
import useNavigate from "./custom-hooks/use-Navigation";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import useNavigator from "./custom-hooks/use-Navigation";

const SubAd = () => {

    const [handleNavigation] = useNavigator()

    return (<section className="christmas-section" onClick={() => handleNavigation('/signIn/landing/*')}>
        <div className="christmas-container">
            <div className="christmas-information" >
                <h3>Festive inspiration is here</h3>
                <p>The festive season is upon us and we want to help you spend less while you enjoy more</p>
            </div>
            <div className="christmas-image-div">
                <img src={require(`${'./assets/christmastable.jpg'}`)} />
                <button> <MdOutlineArrowForwardIos /></button>
            </div>
        </div>
    </section>)
}
export default SubAd