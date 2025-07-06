import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import SetupPage from './pages/SetUp';
import MainLayout from './components/templates/main-layout';
import ExploreExercisesPage from './pages/ExploreExercisesPage';
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
