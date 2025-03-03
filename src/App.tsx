import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useAuth } from "./lib/context/AuthenticatedContext";
import Students from "./pages/Students/Students";
import Reports from "./pages/Reports/Reports";
import NotFound from "./pages/NotFound/NotFound";
import Admin from "./pages/Admin/Admin";

function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>{user ? <AuthStack /> : <UnauthStack />}</BrowserRouter>
  );
}

const UnauthStack = () => {
  return (
    <Routes>
      <Route index element={<Home />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const AuthStack = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/students" replace />} />
      <Route path="/students" element={<Students />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/admin" element={<Admin />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
