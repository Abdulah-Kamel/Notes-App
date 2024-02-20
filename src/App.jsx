import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import LayOut from "./components/LayOut/LayOut";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import AuthProvider from "./Context/AuthContext";
import NoteProvider from "./Context/NoteContext";
import AuthRoutes from "./AuthRoutes/AuthRoutes";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/signup",
      element: (
        <AuthRoutes>
          <SignUp />
        </AuthRoutes>
      ),
    },
    {
      path: "/login",
      element: (
        <AuthRoutes>
          <Login />
        </AuthRoutes>
      ),
    },
  ]);
  return (
    <AuthProvider>
      <NoteProvider>
        <RouterProvider router={router}></RouterProvider>;
      </NoteProvider>
    </AuthProvider>
  );
}

export default App;
