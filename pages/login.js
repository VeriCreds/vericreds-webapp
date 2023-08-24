import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from 'next/image'

function Login() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { push } = useRouter();

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });

    const { message } = await requestChallengeAsync({
      address: account,
      chainId: chain.id,
    });

    const signature = await signMessageAsync({ message });

    // redirect user after success authentication to '/user' page
    const { url } = await signIn("moralis-auth", {
      message,
      signature,
      redirect: false,
      callbackUrl: "/overview",
    });

    /**
     * instead of using signIn(..., redirect: "/user")
     * we get the url from callback and push it to the router to avoid page refreshing
     */
    await push(url);
  }

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-center bg-cover" style={{ backgroundImage: 'url("/loginbackground.png")' }}>
        <Image
          src="/logo.png"
          alt="VeriCred Logo"
          width={125}
          height={125}
          priority
        />
      <button
        onClick={() => {
          handleAuth();
          }
        }
        className="mt-10 px-10 py-1 bg-gray-300 rounded-lg"
      >
        Log in with MetaMask
      </button>
    </div>
  );
}

export default Login;
