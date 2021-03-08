import "./styles/app.css";

import Routes from "./routes";
import { FirebaseProvider } from "./context/firebase";

function App() {
  return (
    <FirebaseProvider>
      <Routes />
    </FirebaseProvider>
  );
}

export default App;
