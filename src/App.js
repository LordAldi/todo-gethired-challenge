import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
function App() {
  return (
    <Router>
      <div className="font-Poppins min-h-screen bg-gray-100">
        <div className="bg-blue-400 h-28 mb-12">
          <div className="max-w-screen-sm md:max-w-screen-lg mx-auto flex flex-col justify-center h-full">
            <h1 className="text-2xl font-bold text-white">TO DO LIST APP</h1>
          </div>
        </div>
        <main className="max-w-screen-sm md:max-w-screen-lg mx-auto">
          <Switch>
            <Route path="/detail/:id">
              <Detail />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
