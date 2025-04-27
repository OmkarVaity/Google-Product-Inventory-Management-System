import { AuthProvider } from "./context/Auth";
import "./App.css";
import Nav from "./navigation/Nav";

function App() {
  return (
    <AuthProvider>
      <Nav />
    </AuthProvider>
  );
}

export default App;
