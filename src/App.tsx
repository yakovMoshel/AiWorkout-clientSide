import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([{
  path: '/',
  // element: ,
  // errorElement: ,
  children: [

  ]
}
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
