import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthRoute } from "routes";
import LayoutA from "./components/layout/layout-a";
import { SignIn } from "./modules";
import AuthorizedPage from "./pages/authorized/authorized.page";

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<SignIn />} />
          <Route path="/*" element={localStorage.getItem("accessToken") ? (
            <LayoutA component={<AuthorizedPage />}></LayoutA>
            ) : (
              <AuthRoute />
            )} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
