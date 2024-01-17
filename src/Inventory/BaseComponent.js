import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const BaseComponentOne = () => {
    const baseComponentOne = useSelector(state => state.baseComponentOne)

    return (
        <div className="base-component-grid-row">

            {baseComponentOne.map((comp, index) => (
                <div className="base-container mb-0" key={index}>
                    <div className="base-component-container">
                        <Link>
                            <div className="base-component-image">
                                <img src={require(`${comp.image}`)} />
                            </div>
                            <div className="base-component-detail">
                                <div>
                                    <h3>{comp.h3}</h3>
                                    <p>{comp.p}</p>
                                </div>
                                <div>
                                    <span className="span-shop">
                                        <span>{comp.span}</span><span> <MdOutlineArrowForwardIos size={20} /></span>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>))}

        </div>
    )
}

export default BaseComponentOne