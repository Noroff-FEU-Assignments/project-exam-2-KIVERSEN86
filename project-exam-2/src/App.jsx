import "./sass/style.scss";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Main/Layout";
import Home from "./pages/Home";
import HomeLoggedIn from "./pages/HomeLoggedIn";
import Profiles from "./pages/Profiles";
import ProfilePage from "./pages/ProfilePage";
import Posts from "./pages/Posts";
import PostSpecific from "./pages/PostSpecific";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="homeloggedin" element={<HomeLoggedIn />} />
            <Route path="profiles/:name" element={<ProfilePage />} />
            <Route path="profiles" element={<Profiles />} />
            <Route path="posts/:id" element={<PostSpecific />} />
            <Route path="posts" element={<Posts />} />
            <Route path="*" element={<div>Route not found</div>} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
