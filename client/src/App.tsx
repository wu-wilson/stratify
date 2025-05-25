import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "./context/theme/ThemeProvider";
import Home from "./pages/home/Home";

const App = () => {
  const theme = useTheme();

  return (
    <div className={theme.darkMode ? "dark-mode" : "light-mode"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
