import { Toaster } from "./components/ui/toaster"
import Authentication from "./context/AuthContext"
import Routes from "./Routes"

function App() {
  return (
    <Authentication>
      <Toaster />
      <Routes />
    </Authentication>
  )
}

export default App
