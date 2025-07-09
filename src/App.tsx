import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import SetupPage from './pages/SetUp';
import MainLayout from './components/templates/main-layout';
import ExploreExercisesPage from './pages/ExploreExercisesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './utils/ProtectedRoute';
import { logout, tokenLoaders } from './utils/auth';
// import ErrorPage from './pages/ErrorPage';


const router = createBrowserRouter([{
  path: '/',
  element: <MainLayout />,
  // errorElement: <ErrorPage />,
  id: 'root',
  loader: tokenLoaders,
  children: [{
    path: '/',
    element: <Home />
  },
  {
    path: '/setup',
    element:
      <ProtectedRoute>
        <SetupPage />
      </ProtectedRoute>
  },
  {
    path: '/explore-exercises',
    element:
      <ProtectedRoute>
        <ExploreExercisesPage />
      </ProtectedRoute>
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path:'/logout',
    action:logout  
  }
    // {
    //   path: '/AiCoach',
    //   element: <AiCoachPage />
    // }
  ]
}
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
