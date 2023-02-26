import React, { useState, useEffect } from "react";
import './player-top.scss'
import axios from 'axios'
import { BiSkipNext, BiSkipPrevious, BiPauseCircle, BiPlayCircle } from 'react-icons/bi'
import { FaShareSquare } from 'react-icons/fa'
import { BsHeartFill } from 'react-icons/bs'


const PlayerTop = (props) => {
    const { handlePrev, handleNext, currentSongIndex } = props
    const [isPlay, setIsPlay] = useState(false)
    const [data, setData] = useState(null)
    const music = data?.data?.results?.[currentSongIndex]?.downloadUrl?.[2]?.link
    const name = data?.data?.results?.[currentSongIndex]?.primaryArtists
    const track = data?.data?.results?.[currentSongIndex]?.name
    const image = data?.data?.results?.[currentSongIndex]?.image?.[2]?.link
    const [isLike, setIsLike] = useState(true)


    const [search, setSearch] = useState('Post malone')


    const options = {
        method: 'GET',
        url: `https://saavn.me/search/songs?query=${search}&page=1&limit=10`,
    };

    const handleLike = () => {
        setIsLike(!isLike)
    }

    const handlePlay = () => {
        setIsPlay(true)
        document.getElementById('ID')?.play();
    }
    const handlePause = () => {
        setIsPlay(false)
        document.getElementById('ID')?.pause();
    }


    useEffect(() => {
        axios.request(options)
            .then(function (response) {
                const { data } = response
                setData(data)
            })
            .catch(function (error) {
                console.log(error);
            });


    }, [])



    return (
        <>
            <div className="player-top">
                <div className="player-cover">
                    <span>
                        <div className="player-cover-item">
                            <img alt="" src={image} />
                        </div>
                    </span>
                </div>
                <div className="player-controls">
                    <div className="player-controls-item-like">
                        {isLike ? <BsHeartFill onClick={handleLike} /> : <BsHeartFill onClick={handleLike} id="like" />}
                    </div>
                    <div className="player-controls-item">
                        <BiSkipNext onClick={handleNext} style={{
                            height: 'auto',
                            width: 'auto'
                        }} />
                    </div>
                    <div className="player-controls-item">
                        <BiSkipPrevious onClick={handlePrev} style={{
                            height: 'auto',
                            width: 'auto'
                        }} />
                    </div>
                    <div className="player-controls-item-share">
                        <FaShareSquare style={{
                            height: 'auto',
                            width: 'auto'
                        }} />
                    </div>
                    <div className="player-controls-item-play">
                        {isPlay ? <BiPauseCircle onClick={handlePause} /> : <BiPlayCircle onClick={handlePlay} />}
                    </div>


                </div>
            </div>
            <div className="progress">
                <div className="progress-top">
                    <div className="album-info">
                        <div className="album-info-name">{name}</div>
                        <div className="album-info-track">{track}</div>
                    </div>

                </div>
                <div className="progress-bar">
                    <audio id="ID" autoPlay={isPlay} src={music} controls>
                    </audio>
                </div>
            </div>
        </>

    )
}
export default PlayerTop