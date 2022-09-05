import './Quotes.css'
import {useEffect, useState} from "react";
import Logo from '../../../images/logo.png';
import {Box, Flex} from "monday-ui-react-core";

export default function Quotes() {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {

        const intervalId = setInterval(() => {
            setActiveSlide(prevState => (prevState + 1) % reviews.length);
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const reviews = [
        {
            name: "Mahatma G.",
            quote:
                "Earth provides enough to satisfy every man's need, but not every man's greed."
        },
        {
            name: "Benjamin F.",
            quote:
                "When the well is dry, we know the worth of water."
        },
        {
            name: "Kofi A.",
            quote:
                "On climate change, we often don't fully appreciate that it is a problem. We think it is a problem waiting to happen."
        },
        {
            name: "Bill G.",
            quote:
                "Climate change is a terrible problem, and it absolutely needs to be solved. It deserves to be a huge priority "
        },
        {
            name: "Tony B.",
            quote: "Global warming is too serious for the world any longer to ignore its danger or split into opposing factions on it."
        }
    ];

    return (
        <Box>
            <Flex direction={Flex.directions.COLUMN}>

            <img src={Logo} height={120}  alt=""/>

            <div className="quote">

                <blockquote className="carousel__quote">
                    <cite>
                        <span className="carousel__name">{reviews[activeSlide].name}</span>
                    </cite>
                    <p>"{reviews[activeSlide].quote}"</p>
                </blockquote>

                <div className="carousel__indicator">
                    <span onClick={() => setActiveSlide(0)} className={`carousel__dot${activeSlide === 0 ? " active" : ""}`}/>
                    <span onClick={() => setActiveSlide(1)} className={`carousel__dot${activeSlide === 1 ? " active" : ""}`}/>
                    <span onClick={() => setActiveSlide(2)} className={`carousel__dot${activeSlide === 2 ? " active" : ""}`}/>
                    <span onClick={() => setActiveSlide(3)} className={`carousel__dot${activeSlide === 3 ? " active" : ""}`}/>
                    <span onClick={() => setActiveSlide(4)} className={`carousel__dot${activeSlide === 4 ? " active" : ""}`}/>
                </div>
        </div>

            </Flex>
        </Box>
    );


}
