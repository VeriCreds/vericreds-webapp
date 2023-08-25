import '@/styles/globals.css'
import { createConfig, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider, useSession } from "next-auth/react";
import { mainnet, sepolia, filecoin } from "wagmi/chains";
import { useEffect } from 'react';
import { wrapper } from "@/app/store";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const { provider, webSocketProvider } = configureChains(
    [mainnet, sepolia, filecoin],
    [publicProvider()]
);

const config = createConfig({
    provider,
    webSocketProvider,
    autoConnect: true,
});

function AppContent({ Component, pageProps }) {
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user?.fetchedToken) {
            window.localStorage.setItem('Token', session.user.fetchedToken);
        }
    }, [session]);

    return <Component {...pageProps} />;
}

function WrappedApp({ Component, ...rest }) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const { pageProps } = props;

    return (
        <WagmiConfig config={config}>
            <SessionProvider session={pageProps.session} refetchInterval={0}>
                <GoogleReCaptchaProvider
                    useRecaptchaNet
                    reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    useEnterprise={true}
                    scriptProps={{
                        async: true, // optional, default to false,
                        defer: false, // optional, default to false
                        appendTo: 'head', // optional, default to "head", can be "head" or "body",
                        nonce: undefined // optional, default undefined
                    }}
                >
                    <AppContent Component={Component} pageProps={pageProps} />
                </GoogleReCaptchaProvider>
            </SessionProvider>
        </WagmiConfig>
    );
}

export default wrapper.withRedux(WrappedApp);
