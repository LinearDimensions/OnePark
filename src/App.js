import logo from './assets/img/logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Carparks } from "./components/Carparks";
import { Projects } from "./components/report_fault";
import { Faults } from "./components/Faults";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Carparks />
      <Projects />
      <Contact />
      <Faults />
      <Footer />
    </div>
  );
}

export default App;
