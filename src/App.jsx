import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/Home'
import Auth from './pages/Auth'
import Playlists from "./pages/Playlists";
import Favorites from "./pages/Favorites";
import Navbar from './components/custom/Navbar';

import { authentication } from './redux/reducers/userReducer';
import './App.css'
import PlaylistDetails from './pages/PlaylistDetails';

function App() {
  const dispatch = useDispatch();
  const routes = createBrowserRouter([
    {
      path:'/',
      element:<Navbar />,
      children:[
        {
          index:true,
          element:<Home />
        },
        {
          path:"/playlists",
          element:<Playlists />
        },
        {
          path:"/playlist/:id/details",
          element:<PlaylistDetails />
        },
        {
          path:"/favorites",
          element:<Favorites />
        },
        {
          path:'/auth',
          element:<Auth />
        }
      ]
    }, 
  ]);

  useEffect(() => {
    dispatch(authentication());
  }, []);

  return (
    <div className='min-h-screen h-full w-full m-0 p-0 bg-slate-100 dark:bg-zinc-800 dark:text-zinc-200'>
      <RouterProvider router={routes}/>
      <ToastContainer autoClose={2000} newestOnTop={true} />
    </div>
  )
}

export default App
