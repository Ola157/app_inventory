import React from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useSelector } from "react-redux";

const AdSection = () => {
    const advert = useSelector(state => state.advert)
    return (
        <section className="battery-section">

            {advert && <div className="battery-container" >
                <div className="battery-information" style={{ backgroundColor: advert.bg }}>
                    <p>{advert.p1}</p>
                    <p>{advert.p2}</p>
                </div>
                <div className="battery-image-div">
                    <img src={require(`${advert.image}`)} />
                    <button> <MdOutlineArrowForwardIos /></button>
                </div>
            </div>}

        </section>
    )
}
export default AdSection