import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const BaseComponentTwo = () => {

    const baseComponentTwo = useSelector(state => state.baseComponentTwo)

    return (<div className="base-component-element">
        <div className="base-component-grid-row">
            {baseComponentTwo && baseComponentTwo.map((comp, index) => (
                <div className="base-container-typeTwo" key={index}>
                    <div className="base-component-container-typeTwo">
                        <Link>
                            <div className="base-component-image">
                                <img src={require(`${comp.image}`)} />
                            </div>
                            <div className="base-component-detail">
                                <div>
                                    <h3>{comp.h3}</h3>
                                    {comp.p && <p>{comp.p}</p>}
                                    <button> <MdOutlineArrowForwardIos /></button>
                                </div>
                                {comp.span && <div>
                                    <span className="span-shop">
                                        <span>{comp.span}</span><span> <MdOutlineArrowForwardIos size={20} /></span>
                                    </span>
                                </div>}
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    </div>)
}
export default BaseComponentTwo