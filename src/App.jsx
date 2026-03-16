import { useEffect, useState } from "react"
import Login from "./pages/Public/Login"
import Dashboard from "./pages/Private/Dashboard"

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if token exists in cookies
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("token="))
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAuthenticated(!!token)
    setLoading(false)
  }, [])

  if (loading) return <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col justify-center items-center gap-2">
        <span className="loading loading-infinity loading-xl"></span>
        <p>Loading...</p>
  </div> 
  return (
    <>
      {isAuthenticated ? <Dashboard /> : <Login />}
    </>
  )
}

export default App
