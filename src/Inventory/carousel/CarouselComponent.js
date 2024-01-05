import React from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { CiPause1 } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const CarouselPage = ({
    currentSlide,
    backWard,
    setClick,
    nextSlide,
    prevSlide,
    slides,
    manualClick }) => {

    return (
        <section className="carousel-section">

            <div className="carousel-div">

                <div className="carousel-container">
                    {slides.map((slide, index) => (
                        <div className={`carousel_item ${currentSlide === index ? `active` : ''} `} key={index}>
                            <div className="carousel-information">
                                {slide.h4 ? <h4>{slide.h4}</h4> : null}
                                <p>{slide.p}</p>
                                <button>{slide.b} <MdOutlineArrowForwardIos /></button>
                            </div>

                            <div className="carousel-image-div">
                                <img src={require(`${slide.image}`)} alt={`Slide ${index} `} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="carousel-control-container">
                    <div className="carousel-control">
                        <div>
                            <ul>
                                <li onClick={() => prevSlide()}><span><MdOutlineArrowBackIos /></span></li>
                                {slides.map((slid, index) => (
                                    <li className="lisvg" key={index}>
                                        <span><FaCircle className={index === currentSlide ? 'active' : ''} /></span>
                                    </li>
                                ))}
                                <li className="m-0" onClick={() => nextSlide()}> <span> <MdOutlineArrowForwardIos size={18} /></span></li>
                                <li className="border-0 bg-transparent m-0"><hr></hr></li>
                                <li onClick={() => setClick(!manualClick)}>{!manualClick ? <span><CiPause1 size={18} /></span> : <span><CiPlay1 size={18} /></span>}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


        </section>
    )
}

export default CarouselPage