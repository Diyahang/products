import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// css mantine
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import PokeAPI from "./components/PokeAPI";

function App() {
  const styleUI = {
    fontFamiliy: "Montserrat, sans-serif",
    heading: {
      fontFamiliy: "Montserrat, sans-serif",
    },
  };

  return (
    <MantineProvider theme={styleUI}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="poke" element={<PokeAPI />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
