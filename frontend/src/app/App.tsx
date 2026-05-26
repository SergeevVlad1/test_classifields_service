import "./styles/App.scss";
import { PropertyFormPage } from "../pages/property-form-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <main className="app-container">
        <PropertyFormPage />
      </main>
    </QueryClientProvider>
  );
}

export default App;
