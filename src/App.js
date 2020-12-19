import Canvas from "./components/Layout/Canvas/Canvas";
import LeftSidebar from "./components/Layout/LeftSideBar/LeftSidebar";
import './App.scss';

function App() {
  return (
    <div className="App">
      <LeftSidebar />
      <Canvas />
    </div>
  );
}

export default App;