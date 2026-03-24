import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import MyShelfPage from "./pages/MyShelfPage";
import ExplorePage from "./pages/ExplorePage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="myshelf" element={<MyShelfPage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
