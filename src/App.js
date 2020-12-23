import Canvas from "./components/Layout/Canvas/Canvas";
import LeftSidebar from "./components/Layout/LeftSideBar/LeftSidebar";
import './App.scss';

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