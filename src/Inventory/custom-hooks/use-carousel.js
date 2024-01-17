import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useCarouselBtn = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const slides = useSelector(state => state.slides)
    const isPause = useSelector(state => state.isPause)

    useEffect(() => {

        if (isPause) return

        let intervalTime = setInterval(nextSlide, 5000)

        return () => {
            clearInterval(intervalTime)
        }
    }, [currentSlide, isPause, slides])


    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);

        const carouselItems = document.querySelectorAll('.carousel_item');

        carouselItems.forEach((item, index) => {
            if (index === currentSlide) {
                item.style.animation = 'translateXOut 600ms forwards';
            } else if (index === (currentSlide + 1) % slides.length) {
                item.style.animation = 'translateXIn 600ms forwards';
            } else {
                item.style.animation = 'translateX 600ms forwards';
            }
        })
    }

    const prevSlide = () => {

        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
        const carouselItems = document.querySelectorAll('.carousel_item');

        carouselItems.forEach((item, index) => {
            if (index === currentSlide) {
                item.style.animation = 'translateXOutReverse 600ms forwards';
            } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
                item.style.animation = 'translateXInReverse 600ms forwards';
            } else {
                item.style.animation = 'translateXReverse 600ms forwards';
            }
        });
    }

    return [currentSlide, nextSlide, prevSlide]
}
export default useCarouselBtn