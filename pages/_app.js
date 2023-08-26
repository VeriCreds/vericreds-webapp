import '@/styles/globals.css'
import { createConfig, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider, useSession } from "next-auth/react";
import { mainnet, sepolia, filecoin } from "wagmi/chains";
import { useState, useEffect } from "react";
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
    const [collection, setCollection] = useState([
      {
        name: "document1",
        format: "PDF",
        image: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
        status: "verified",
        category: "Identification",
      },
      {
        name: "document2",
        format: "PDF",
        image:
          "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
        status: "minted",
        category: "Reference Letters",
      },
      {
        name: "document3",
        format: "PNG",
        image:
          "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
        status: "shared",
        category: "Certificates",
      },
      {
        name: "document4",
        format: "PDF",
        image:
          "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
        status: "minted",
        category: "Reference Letters",
      },
      {
        name: "document5",
        format: "PDF",
        image:
          "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
        status: "shared",
        category: "Identification",
      },
      {
        name: "document6",
        format: "PDF",
        image:
          "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
        status: "verified",
        category: "Others",
      },
      {
        name: "document7",
        format: "PDF",
        image:
          "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
        status: "minted",
        category: "Certificates",
      },
      {
        name: "document8",
        format: "PDF",
        image:
          "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
        status: "shared",
        category: "Transcripts",
      },
      {
        name: "document9",
        format: "JPEG",
        image:
          "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
        status: "minted",
        category: "Reference Letters",
      },
      {
        name: "document10",
        format: "PDF",
        image:
          "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
        status: "shared",
        category: "Recommendation Letters",
      },
      {
        name: "Recommendation",
        format: "PNG",
        image:
          "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
        status: "shared",
        category: "Diplomas",
      },
      {
        name: "Transcript",
        format: "PDF",
        image:
          "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg",
        status: "minted",
        category: "Transcripts",
      },
    ]);

    useEffect(() => {
        if (session?.user?.fetchedToken) {
            window.localStorage.setItem('Token', session.user.fetchedToken);
        }
    }, [session]);

    return (
      <Component
        {...pageProps}
        collection={collection}
        setCollection={setCollection}
      />
    );
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
