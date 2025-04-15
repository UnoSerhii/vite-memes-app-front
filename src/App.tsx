import { Route, Routes } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar.tsx";
import { ListPage } from "@/pages/ListPage.tsx";
import { TablePage } from "@/pages/TablePage.tsx";
import MemePage from "./pages/MemePage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<TablePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/memes/:id" element={<MemePage />} />
      </Routes>
    </>
  );
}

export default App;
