import "./styles.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Features from "./pages/Features";
import ResourceLibrary from "./pages/resourceLibrary";
import YourComponent from "./pages/homepage";
import VideoPage from "./pages/VideoPage";
import CallPage from "./pages/CallPage";
import Mentor from "./pages/mentor";
import ChatApp from "./pages/ChatApp";import AboutUs from "./pages/aboutUs";



/** root routes */
const router = createBrowserRouter([
  {
    path: '/',
    element: <YourComponent />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/features',
    element: (
        <Features />
    )
  },
  {
    path: '/chats',
    element: <ChatApp />
  },
  {
    path: '/mentor',
    element: <Mentor/>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/resources',
    element: <ResourceLibrary/>
  },
  {
    path:"/call",
    element:<CallPage/>
  },
  {
    path:"/room/:id",
    element:<VideoPage/>
  },{
    path:"/aboutUs",
    element:<AboutUs/>
  }

]);
export default function App() {
  return (
    <main>
          <RouterProvider router={router} />
        </main>
  );
}