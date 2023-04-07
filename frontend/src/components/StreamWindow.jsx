import Hls from 'hls.js';
import { useEffect, useRef } from 'react';

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

    useEffect(() => {
        const hls = hlsRef.current = new Hls(config);

        if (Hls.isSupported()) {
            hls.loadSource('http://localhost:8080/hls/witaj.m3u8');
            hls.attachMedia(videoElement.current);
        }
        return () => hls.destroy();
    }, []);

    const handleVideoClick = () => {
        const hls = hlsRef.current;
        hls.loadSource('http://localhost:8080/hls/witaj.m3u8');
        hls.attachMedia(videoElement.current);
        videoElement.current.play();
    }

    return (
        <>
            <video ref={videoElement} controls height={"720px"} width={"1280px"}></video>
            <button onClick={handleVideoClick}>LOL</button>
        </>
    );
}