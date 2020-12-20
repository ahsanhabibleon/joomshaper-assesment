import Canvas from "./components/Layout/Canvas/Canvas";
import LeftSidebar from "./components/Layout/LeftSideBar/LeftSidebar";
import './App.scss';

import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

function App() {
  return (
    <div className="App">
      <div className="window">
        <LeftSidebar />
        <Canvas />
      </div>
    </div>
  );
}

export default App;