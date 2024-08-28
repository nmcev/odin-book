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
import { ProtectedRoute } from './components/ProtectedRoute.tsx'
import Notifications from './components/Notifications.tsx'
import { EditPostForm } from './components/EditPostForm.tsx'
import { SignupPage } from './pages/SignupPage.tsx'
import { ProfileSetupPage } from './pages/ProfileSetupPage.tsx'

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
        element:
          <ProtectedRoute>
            <CreatePostPage />
          </ProtectedRoute>
      }
      , {
        path: '/notifications',
        element:
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
      },
      {
        path: '/profile',
        element:
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>

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
        element:
          <ProtectedRoute>
            <FollowingPage />
          </ProtectedRoute>
      },
      {
        path: '/edit-post/:postId',
        element:
        <ProtectedRoute>
           <EditPostForm />
        </ProtectedRoute>
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
    element:<SignupPage />
  },
  {
    path: '/profile-setup',
    element: <ProfileSetupPage />
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
