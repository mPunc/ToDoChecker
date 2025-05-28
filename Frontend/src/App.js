import TestingDisplay from "./pages/TestingDisplay";
import AllTasksList from "./pages/AllTasksList";
import OneTask from "./components/task_components/OneTask";

function App() {
  return (
    <div className="App">
      <TestingDisplay/>
      <OneTask id={0}/>
      <AllTasksList/>
    </div>
  );
}

export default App;
