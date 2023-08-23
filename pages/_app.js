import "@/styles/globals.css";
import Layout from "@/components/layout/Layout";
import { Provider } from "react-redux";
import Store from "@/components/store/Store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={Store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </Provider>
  );
}
