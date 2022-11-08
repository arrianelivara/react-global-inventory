import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthRoute } from "routes";
import LayoutA from "./components/layout/layout-a";
import { SignIn } from "./modules";
import AuthorizedPage from "./pages/authorized/authorized.page";
import React, { useState } from "react";
import { Loader, Error } from "components/index";
import { AppContext } from "contexts";

function App() {
  const [appState, setAppState] = useState({ error: false });
  const [globalLoading, setGlobalLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          appState,
          setAppState,
          setGlobalLoading,
          setGlobalError: setError,
        }}
      >
        <BrowserRouter>
          {error ? <Error />:
          <Routes>
            <Route path="/auth" element={<SignIn />} />
            <Route path="/*" element={localStorage.getItem("accessToken") ? (
              <LayoutA component={<AuthorizedPage />}></LayoutA>
              ) : (
                <AuthRoute />
              )} />
          </Routes>
          }
        </BrowserRouter>
        {globalLoading && <Loader loading={globalLoading} />}
      </AppContext.Provider>
    </div>
  );
}

export default App;
