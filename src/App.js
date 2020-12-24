import Canvas from "./components/Layout/Canvas/Canvas";
import LeftSidebar from "./components/Layout/LeftSideBar/LeftSidebar";
import './App.scss';
import { Provider } from "react-redux";
import Store from "./redux/store/store";

function App() {
  return (
    <div className="App" data-test="App">
      <div className="window">
        <Provider store={Store}>
          <LeftSidebar />
          <Canvas />
        </Provider>
      </div>
    </div>
  );
}

export default App;