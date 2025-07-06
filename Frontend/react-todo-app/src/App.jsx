import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import Controls from './pages/Controls';
import TaskDetails from './pages/TaskDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      <Route index element= {<HomePage/>}/>
      <Route path='/tasks' element= {<TaskList/>}/>
      <Route path='/addtask' element= {<AddTask/>}/>
      <Route path='/controls' element= {<Controls/>}/>
      <Route path="/todo/:id" element={<TaskDetails />} />
    </Route>
  )
);

export default function App() {
  return (
    <RouterProvider router={router}/>
  );
}
