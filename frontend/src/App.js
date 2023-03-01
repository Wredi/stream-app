import ReactPlayer from 'react-player'

function App() {
  return (
    <div className="App">
      <ReactPlayer
        url="http://localhost:8080/hls/test.m3u8"
        width="1200px"
        height="720px"
        controls={true}
      />
    </div>
  );
}

export default App;
