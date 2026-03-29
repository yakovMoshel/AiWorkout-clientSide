import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SetupPage from "./pages/SetUp";
import MainLayout from "./components/templates/main-layout";
import ExploreExercisesPage from "./pages/ExploreExercisesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import { logout } from "./utils/auth";
import { AuthProvider } from "./store/auth-context";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import CalendarSetupPage from "./pages/CalendarSetupPage";
import { AiChatPage } from "./pages/AiChat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    id: "root",
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/setup",
        element: (
          <ProtectedRoute>
            <SetupPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/explore-exercises",
        element: (
          <ProtectedRoute>
            <ExploreExercisesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/calendar-setup",
        element: (
          <ProtectedRoute>
            <CalendarSetupPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/logout",
        action: logout,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/Edit",
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/ai-chat",
        element: (
          <ProtectedRoute>
            <AiChatPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;