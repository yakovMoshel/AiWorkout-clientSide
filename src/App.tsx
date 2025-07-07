import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import SetupPage from './pages/SetUp';
import MainLayout from './components/templates/main-layout';
import ExploreExercisesPage from './pages/ExploreExercisesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// import ErrorPage from './pages/ErrorPage';


const router = createBrowserRouter([{
  path: '/',
  element: <MainLayout />,
  // errorElement: <ErrorPage />,
  children: [{
    path: '/',
    element: <Home />
  },
  {
    path: '/setup',
    element: <SetupPage />
  },
  {
    path: '/explore-exercises',
    element: <ExploreExercisesPage />
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/register',
    element: <RegisterPage />
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
