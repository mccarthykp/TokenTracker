import { useEffect } from 'react'
// Dark Mode Script
import { applyTheme } from "./utils/themeUtils";
// Visibility Script
import { onDOMReady } from "./utils/domUtils";
// Pages
import Home from "./pages/Home";

export default function App() {
  useEffect(() => {
    applyTheme();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      onDOMReady(() => {
        document.body.style.visibility = "visible";
      });
    }, 200);
  }, []);

  return (
    <>
      <div className='App'>
        <Home />
      </div>
    </>
  )
}
