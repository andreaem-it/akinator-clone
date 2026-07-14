import { useLenis } from "./hooks/useLenis";
import { Noise } from "./components/Noise";
import { Cursor } from "./components/Cursor";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { About } from "./components/About";
import { Focus } from "./components/Focus";
import { Principles } from "./components/Principles";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  useLenis();

  return (
    <>
      <Noise />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Focus />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
