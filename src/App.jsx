import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthRoute } from "routes";
import LayoutA from "./components/layout/layout-a";
import { SignIn } from "./modules";
import AuthorizedPage from "./pages/authorized/authorized.page";
import React, { useState } from "react";
import { Loader, Error, Text } from "components/index";
import { AppContext } from "contexts";
import { Modal } from "antd";
import { useModal } from "hooks/index";

function App() {
  const [appState, setAppState] = useState({ error: false });
  const [globalLoading, setGlobalLoading] = useState(false);
  const [error, setError] = useState(false);
  const globalErrorModal = useModal();

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          appState,
          setAppState,
          setGlobalLoading,
          setGlobalError: setError,
          globalErrorModal,
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
        <Modal {...globalErrorModal} 
          title="Something Went Wrong.."
          cancelButtonProps={{ style: { display: "none" }}}
          onOk={() => {
            globalErrorModal.close();
          }}
          onCancel={() => {
            globalErrorModal.close();
          }}
        ><Text className="mt-md ml-sm">Refresh page or contact administrator.</Text></Modal>
      </AppContext.Provider>
    </div>
  );
}

export default App;
