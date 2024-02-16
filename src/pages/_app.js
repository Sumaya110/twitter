import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { SocketProvider } from "@/libs/Context/Context";
import { Provider } from "react-redux";
import store from "@/store";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </Provider>
    </SessionProvider>
  );
}
