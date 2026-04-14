// importar componentes do react-router
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./context/ThemeContext";
import { PreferencesProvider } from "./context/PreferencesContext";
import Loader from "./components/ui/TrophySpin";

// componente principal da aplicação
import MainLayout from "./pages/MainLayout";
import History from "./pages/History";
import Settings from "./pages/Settings";

const AddTransaction = lazy(() => import("./pages/AddTransaction"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Statistics = lazy(() => import("./pages/Statistics"));

// Criar instância do QueryClient
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <PreferencesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route
                  index
                  element={
                    <Suspense fallback={<Loader />}>
                      <Dashboard />
                    </Suspense>
                  }
                />

                <Route
                  path="adicionar"
                  element={
                    <Suspense>
                      <AddTransaction />
                    </Suspense>
                  }
                />
                <Route path="historico" element={<History />} />

                <Route
                  path="estatisticas"
                  element={
                    <Suspense fallback={<Loader />}>
                      <Statistics />
                    </Suspense>
                  }
                />

                <Route path="definicoes" element={<Settings />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PreferencesProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
