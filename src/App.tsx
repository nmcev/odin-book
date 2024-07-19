import { Outlet } from "react-router-dom"
import { Header } from "./components/Header"
import { PostProvider } from "./contexts/PostContext"

function App() {

  return (
    <>

      <PostProvider>
      <div className="min-h-dvh relative">
        <Header />
        <Outlet />
      </div>
      </PostProvider>

    </>
  )
}

export default App
