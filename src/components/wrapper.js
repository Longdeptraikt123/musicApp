import React, { useState } from "react";
import './wrapper.scss'
import PlayerTop from "./player-top";
const Wrapper = () => {

    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const handleNext = () => {
        setCurrentSongIndex((prev) => prev + 1)
    }
    const handleRandom = () => {
        setCurrentSongIndex((prev) => Math.floor(prev.random() * 10))
    }

    const handlePrev = () => {
        if (currentSongIndex > 0) {
            setCurrentSongIndex((prev) => prev - 1)
        }
    }
    return (

        <div className="wrapper">
            <div className="player">
                <PlayerTop
                    currentSongIndex={currentSongIndex}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    handleRandom={handleRandom} />
            </div>
        </div>
    )
}
export default Wrapper