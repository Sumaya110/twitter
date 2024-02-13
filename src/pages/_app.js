
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { SocketProvider } from "@/libs/contexts/SocketContext";
import { Provider } from "react-redux";
import store from "@/libs/redux/store";

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







// import '../styles/globals.css';
// import { SessionProvider } from 'next-auth/react';
// import { Provider } from 'react-redux';
// import store from "@/store"

// function MyApp({ Component, pageProps: { session, ...pageProps } }) {
//   return (
//     <SessionProvider session={session}>
//       <Provider store={store}>
//         <Component {...pageProps} />
//       </Provider>
//     </SessionProvider>
//   );
// }

// export default MyApp;
