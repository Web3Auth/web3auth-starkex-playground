import { useWeb3Auth } from "../services/web3auth";
import Form from "./Form";
import Header from "./Header";
import Sidebar from "./Sidebar";

function HomePage() {
  const { provider, starkKey, address } = useWeb3Auth();
  const formDetails = [
    {
      label: "Address",
      input: address as string,
      readOnly: true,
    },
    {
      label: "Stark Key",
      input: starkKey as string,
      readOnly: true,
    },
  ];
  return (
    <main className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="container w-full h-full flex flex-1 flex-col bg-gray-50 items-center justify-center">
          {provider ? (
            <>
              <h1 className="w-11/12 px-4 pt-16 sm:px-6 lg:px-8 text-2xl font-bold text-center text-primary sm:text-3xl">
                Welcome to Web3Auth StarkEx Playground
              </h1>
              <div className="py-16 w-full">
                <Form heading="Your Account Details" formDetails={formDetails} />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-center text-primary sm:text-3xl">Welcome to Web3Auth StarkEx Playground</h1>
              <p className="max-w-md mx-auto mt-4 text-center text-gray-500">Please connect to Web3Auth to get started.</p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default HomePage;
