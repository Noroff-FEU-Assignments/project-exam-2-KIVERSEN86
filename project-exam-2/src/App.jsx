import "./sass/style.scss";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Main/Layout";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div>Home</div>} />
            <Route path="profiles" element={<div>Profiles</div>} />
            <Route path="contact" element={<div>Contact</div>} />
            <Route path="*" element={<div>Route not found</div>} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
