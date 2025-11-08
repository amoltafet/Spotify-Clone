import { useContext } from "react"
import Display from "./components/Display"
import Player from "./components/Player"
import Sidebar from "./components/Sidebar"
import { PlayerContext } from "./context/PlayerContext"
import { StatsigProvider, useClientAsyncInit } from '@statsig/react-bindings';
import { StatsigAutoCapturePlugin } from '@statsig/web-analytics';
import { StatsigSessionReplayPlugin } from '@statsig/session-replay';
import { useEffect } from "react";
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import { GrowthBook } from "@growthbook/growthbook";
import { 
  thirdPartyTrackingPlugin,
  autoAttributesPlugin
} from "@growthbook/growthbook/plugins";

const growthbook = new GrowthBook({
  apiHost: "https://cdn.growthbook.io",
  clientKey: "sdk-KZbH7FJfdS0iNTcW",
  enableDevMode: true,
  plugins: [
    autoAttributesPlugin(),
    thirdPartyTrackingPlugin({ trackers: ["ga4", "gtm"] }),
  ],
});

const App = () => {
  const {audioRef,track} = useContext(PlayerContext)
  // const { client } = useClientAsyncInit(
  //   "client-QSXaobm2DKxdOXm1fukCT7kWcBrPMlrFWNZ7T1wicCm",
  //   { userID: 'a-user' }, 
  //   { plugins: [ new StatsigAutoCapturePlugin(), new StatsigSessionReplayPlugin() ] },
  // );

    useEffect(() => {
      // Load features asynchronously when the app renders
      growthbook.init({ streaming: true });
    }, []);


  return (
   <GrowthBookProvider growthbook={growthbook}>

    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar/>
        <Display/>
      </div>
      <Player/>
      <audio ref={audioRef} src={track.file} preload="auto">

      </audio>
    </div>
    </GrowthBookProvider>
  )
}

export default App