import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import Navigation from "./pages/Auth/Navigation";

const App = () => {
  console.log("App.jsx v2 - Cache busting"); // Force new build
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <Navigation />
      <main className="py-3 pl-[12rem]" style={{ paddingTop: '64px' }}>
        <Outlet />
      </main>
    </ThemeProvider>
  );
};

export default App;
