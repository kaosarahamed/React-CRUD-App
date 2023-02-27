import Style from "./pages/Users/Users.module.css";
import Router from "./routes/Router";
function App() {
  return (
    <div className={Style.App}>
      <Router />
    </div>
  );
}

export default App;
