import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './pages/HomePage.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { AuthContextProvider } from './contexts/AuthContext.tsx'
import { ProfilePage } from './pages/ProfilePage.tsx'
import { FollowersPage } from './pages/FollowersPage.tsx'
import { FollowingPage } from './pages/FollowingPage.tsx'
import { UserPage } from './pages/UserPage.tsx'
import { PostPage } from './pages/PostPage.tsx'
import SearchComponent from './pages/SearchComponent.tsx'
import { CreatePostPage } from './pages/CreatePostPage.tsx'

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
        element: <SearchComponent />
      }, {
        path: '/create-post',
        element: <CreatePostPage />
      }
      , {
        path: '/notifications',
        element: <h1>search</h1>
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/:username/:postId',
        element: <PostPage />
      },
      {
        path: '/:username/followers',
        element:<FollowersPage />
      },
      {
        path: '/profile/following',
        element:<FollowingPage />
      },
      {
        path: '/:username',
        element: <UserPage />
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
