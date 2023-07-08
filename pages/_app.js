import '@/styles/globals.css'
import { createConfig, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";
import { mainnet } from "wagmi/chains";
import { wrapper } from "@/app/store" ;
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const { provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  provider,
  webSocketProvider,
  autoConnect: true,
});

function WrappedApp({ Component, ...rest }) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const { pageProps } = props;

    return (
        <WagmiConfig config={config}>
            <SessionProvider session={pageProps.session} refetchInterval={0}>
                <GoogleReCaptchaProvider reCaptchaKey={process.env.RECAPTCHA_SITE_KEY}>
                    <Component {...pageProps} />
                </GoogleReCaptchaProvider>
            </SessionProvider>
        </WagmiConfig>
    );
}

export default wrapper.withRedux(WrappedApp);
