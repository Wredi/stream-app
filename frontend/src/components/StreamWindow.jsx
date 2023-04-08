import Hls from 'hls.js';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { IconContext } from "react-icons";
import '../css/StreamWindow.css';

const config = {
    debug: true,
    enableWorker: true,
    liveSyncDurationCount: 3,
    liveMaxLatencyDurationCount: 10,
    liveBackBufferLength: 60 * 60,
    liveDurationInfinity: true,
    liveMaxDuration: 60 * 60,
    maxBufferLength: 30,
    maxMaxBufferLength: 60,
    startLevel: -1,
    levelLoadingRetryDelay: 1000,
    levelLoadingMaxRetryTimeout: 64000,
    fragLoadingRetryDelay: 1000,
    fragLoadingMaxRetryTimeout: 64000,
    manifestLoadingRetryDelay: 1000,
    manifestLoadingMaxRetryTimeout: 64000,
    manifestLoadingMaxRetry: 10,
    startPosition: 1000
};

export default function StreamWindow({src}) {
    const videoElement = useRef(null);
    const hlsRef = useRef(null);

    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const hls = hlsRef.current = new Hls(config);

        if (Hls.isSupported()) {
            hls.loadSource('http://localhost:8080/hls/witaj.m3u8');
            hls.attachMedia(videoElement.current);
        }
        return () => hls.destroy();
    }, []);

    const onPlayClick = () => {
        const hls = hlsRef.current;
        // hls.loadSource('http://localhost:8080/hls/witaj.m3u8');
        // hls.attachMedia(videoElement.current);

        if(isPlaying){
            videoElement.current.pause();
        }else{
            videoElement.current.play();
        }

        setIsPlaying(!isPlaying);
    }

    const onVolumeChange = (e) => {
        setVolume(e.target.value);
    }

    return (
        <div className='video-player'>
            <div class="shadow"></div>
            <video ref={videoElement}></video>
            <div className='player-controls'>
                <button onClick={onPlayClick} className='play-button'>
                    <IconContext.Provider value={{ className: "shared-class", size: 18, color: "#ffffff" }}>
                        {isPlaying ? <FaPause/> : <FaPlay/> }
                    </IconContext.Provider>
                </button>
                <input type='range' min={0} max={1} value={volume} step={0.01} onChange={onVolumeChange} className='volume'/>
            </div>
        </div>
    );
}