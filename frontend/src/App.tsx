import { Analytics } from "@vercel/analytics/react"
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import PDF from "./pages/PDF";
import ScrollToTop from "./components/ScrollToTop";
const Home = lazy(() => import("./pages/Home"));
const Layout = lazy(() => import("./components/Layout"));
const About = lazy(() => import('./pages/About'))
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const PastQuestions = lazy(() => import('./pages/PastQuestions'));
const Assignments = lazy(() => import('./pages/Assignments'));
const Syllabus = lazy(() => import('./pages/Syllabus'));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Analytics />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/pdfs" element={<PDF />} />
            <Route path="/pastquestions" element={<PastQuestions />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/syllabus" element={<Syllabus />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
