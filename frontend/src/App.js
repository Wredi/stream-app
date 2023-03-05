import ReactPlayer from 'react-player'
import ReactHlsPlayer from 'react-hls-player/dist';

function App() {
  return (
    <div className="App">
      <ReactPlayer 
        src="http://localhost:8080/hls/test.m3u8"
        width="100%"
        height="auto" 
      />
      {/* <ReactHlsPlayer
          src="http://localhost:8080/hls/test.m3u8"
          autoPlay={false}
          controls={true}
          width="100%"
          height="auto" 
      /> */}
    </div>
  );
}

export default App;
