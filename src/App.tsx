import { Outlet } from "react-router-dom"
import { Header } from "./components/Header"
import { PostProvider } from "./contexts/PostContext"
import { FollowProvider } from "./contexts/FollowContext"

function App() {

  return (
    <>

      <PostProvider>
        <FollowProvider>
      <div className="min-h-dvh relative">
        <Header />
        <Outlet />
        </div>
          </FollowProvider>
      </PostProvider>

    </>
  )
}

export default App
