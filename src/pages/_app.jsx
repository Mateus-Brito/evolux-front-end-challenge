import "@styles/global.css";

import { Provider } from "react-redux";
import store from "@store/index";
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Toaster
      position="bottom-right"
      reverseOrder={false}
      />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
