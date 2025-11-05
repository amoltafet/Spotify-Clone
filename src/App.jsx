import { useContext } from "react"
import Display from "./components/Display"
import Player from "./components/Player"
import Sidebar from "./components/Sidebar"
import { PlayerContext } from "./context/PlayerContext"

const App = () => {
  const {audioRef,track} = useContext(PlayerContext)
  const { client } = useClientAsyncInit(
    "client-QSXaobm2DKxdOXm1fukCT7kWcBrPMlrFWNZ7T1wicCm",
    { userID: 'a-user' }, 
    { plugins: [ new StatsigAutoCapturePlugin(), new StatsigSessionReplayPlugin() ] },
  );

  return (
    <StatsigProvider client={client} loadingComponent={<div>Loading...</div>}>
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar/>
        <Display/>
      </div>
      <Player/>
      <audio ref={audioRef} src={track.file} preload="auto">

      </audio>
    </div>
    </StatsigProvider>
  )
}

export default App