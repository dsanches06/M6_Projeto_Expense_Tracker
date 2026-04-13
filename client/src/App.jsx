// importar componentes do react-router
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./context/ThemeContext";
import { PreferencesProvider } from "./context/PreferencesContext";

// componente principal da aplicação
import MainLayout from "./pages/MainLayout";
import Dashboard from "./pages/dashboard";
import AddTransaction from "./pages/AddTransaction";
import History from "./pages/History";
import Settings from "./pages/Settings";

// Criar instância do QueryClient
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <PreferencesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="adicionar" element={<AddTransaction />} />
                <Route path="historico" element={<History />} />
                <Route path="definicoes" element={<Settings />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PreferencesProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
