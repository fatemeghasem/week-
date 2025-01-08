import { AuthProvider } from "./context/ProductsContexts";
import Router from "./router/Router";

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
