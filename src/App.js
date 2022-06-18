
// import { createClient } from 'pexels';
import { render } from "@testing-library/react";
import NavBar from "./comps/navBar";
import Home from "./home/home";

// const clientImgKey = createClient('563492ad6f917000010000019e5ac6db1cca432ea31c2445f79014da');

let weatherApiKey='235ee31517e38d928f1e4d68b6d638fd';
function App() {
  return (
    <div className="App">
        <NavBar/>
        <Home/>
    </div>
  );
}

export default App;