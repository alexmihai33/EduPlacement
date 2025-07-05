import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "reactstrap";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Profile from "./components/Profile";
import News from "./components/News";
import Guide from "./components/Guide";
import SchoolDashboard from "./components/SchoolDashboard";
import Support from "./components/Support";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import InspectorateDashboard from "./components/InspectorateDashboard";

const App = () => {
  const { isAuthenticated, isLoading, error, user } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }
  return (

    <BrowserRouter>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container fluid className="custom-container flex-grow-1 mt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<Profile />} />
            {isAuthenticated && (user?.userRole === 'School') ? <Route path="/dashboard" element={<SchoolDashboard />} /> : null}
            {isAuthenticated && (user?.userRole === 'Inspectorate') ? <Route path="/dashboard" element={<InspectorateDashboard />} /> : null}
          </Routes>
        </Container>
        <Footer />
      </div>
    </BrowserRouter>

  );
};

export default App;