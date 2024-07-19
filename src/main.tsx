import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './pages/HomePage.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { AuthContextProvider } from './contexts/AuthContext.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />
      }, {
        path: '/search',
        element: <h1>search</h1>
      }, {
        path: '/create-post',
        element: <h1>search</h1>
      }
      , {
        path: '/notifications',
        element: <h1>search</h1>
      },
      {
        path: '/profile',
        element: <h1>search</h1>
      }
    ]
  }, {
    path: '/login',
    element: <LoginPage />
  }
  , {
    path: '/signup',
    element: <h1>Signup page</h1>
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
  ,
)
