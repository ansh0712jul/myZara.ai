import AppRoutes from "./routes/AppRoutes"
import { UserProvider } from "./contextApi/User.context"

function App() {
 

  return (
<<<<<<< HEAD
    <>
      <h1 className="text-3xl font-bold underline">
      my name is madhav bansal
    </h1>
    </>
=======
    <UserProvider>
      <AppRoutes/>
    </UserProvider>
    
>>>>>>> 99bc35037d28cfb3f076ac89ac52b5988a924e9a
  )
}

export default App
