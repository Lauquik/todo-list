import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Index";
import Register from "./Register";
import Signin from "./Signin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/todos" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}
