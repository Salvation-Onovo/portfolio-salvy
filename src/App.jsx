import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./Components/NavBar";
import Intro from "./Components/Intro";
import About from "./Components/About";
import Experience from "./Components/Experience";
import Project from "./Components/Projects";
import Footer from "./Components/Footer";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div className="font-['NRT'] bg-(--navy) text-(--lightest-slate) flex flex-col min-h-100vh w-full margin-0">
        <NavBar />

        <div>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Intro />
                  <About />
                  <Experience />
                  <Project />
                </>
              }
            />
          </Routes>
        </div>

        <Footer/>
      </div>
    </>
  );
}

export default App;
