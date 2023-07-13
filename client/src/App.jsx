import { Provider } from "react-redux";
import { store } from "./store";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;
