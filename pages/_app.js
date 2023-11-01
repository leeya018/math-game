import { Provider } from "react-redux";
import { useStore } from "../store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { autorun } from "mobx";

import "../styles/globals.css";
import { userStore } from "mobx/userStore";

export function reportWebVitals(metric) {
  if (metric.label === "web-vital") {
    console.log(metric.name, metric.value); // or send to analytics
  }
}

export default function App({ Component, pageProps }) {
  autorun(() => {
    userStore.saveState();
  });
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}
