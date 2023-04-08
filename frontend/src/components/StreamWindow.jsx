import Hls from 'hls.js';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { FaExpand, FaPause, FaPlay, FaVolumeDown, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { IconContext } from "react-icons";
import '../css/StreamWindow.css';

const config = {
    // debug: true,
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
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        const hls = hlsRef.current = new Hls(config);

        if (Hls.isSupported()) {
            hls.loadSource('http://localhost:8080/hls/witaj.m3u8');
            hls.attachMedia(videoElement.current);
        }

        return () => hls.destroy();
    }, []);

    const onPlayClick = () => {
        // const hls = hlsRef.current;
        // hls.loadSource('http://localhost:8080/hls/witaj.m3u8');
        // hls.attachMedia(videoElement.current);

        if(isPlaying){
            videoElement.current.pause();
        }else{
            videoElement.current.play();
        }

        setIsPlaying(!isPlaying);
    }

    const onMuteClick = () => {
        if(isMuted){
            videoElement.current.volume = volume < 0.00000001 ? 0.2 : volume;
            setVolume(0.2);
        }else{
            videoElement.current.volume = 0.0;
        }
        setIsMuted(!isMuted);
    }

    const onVolumeChange = (e) => {
        const v = e.target.value;
        videoElement.current.volume = v;
        if(v < 0.00000001){
            setIsMuted(true);
        }else{
            setIsMuted(false);
        }
        setVolume(v);
    }

    const onFullScreenClick = () => {
        videoElement.current.requestFullscreen();
    }

    return (
        <div className='video-player'>
            <div className='shadow'></div>
            <video ref={videoElement}></video>
            <div className='player-controls'>
                <div className='left'>
                    <IconContext.Provider value={{ className: "shared-class", size: 14, color: "#ffffff" }}>
                        <button onClick={onPlayClick} className='play-button'>
                            {isPlaying ? <FaPause/> : <FaPlay/> }
                        </button>
                    </IconContext.Provider>

                    <IconContext.Provider value={{ className: "shared-class", size: 18, color: "#ffffff" }}>
                        <div className='volume-box'>
                            <button onClick={onMuteClick} className='mute-button'>
                                {isMuted ? <FaVolumeMute/> : volume > 0.5 ? <FaVolumeUp/> : <FaVolumeDown/>}
                            </button>
                            <input type='range' min={0} max={1} value={isMuted ? 0.0 : volume} step={0.01} onChange={onVolumeChange} className='volume'/>
                        </div>
                    </IconContext.Provider>
                </div>
                <div className='right'>
                    <button onClick={onFullScreenClick} className='fullscreen'>
                        <IconContext.Provider value={{ className: "shared-class", size: 18, color: "#ffffff" }}>
                            <FaExpand/>
                        </IconContext.Provider>
                    </button>
                </div>
            </div>
        </div>
    );
}