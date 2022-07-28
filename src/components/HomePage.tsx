/* eslint-disable prettier/prettier */
import { useWeb3Auth } from "../services/web3auth";
import Console from "./Console";
import Header from "./Header";

function HomePage() {
  const { starkKey } = useWeb3Auth();

  return (
    <>
      <Header />

      <br></br>

      <div className="h-56 grid grid-cols-3 gap-4 content-start">
        <div className="justify-center w-full">
          <h1 className="flex items-center justify-center block font-medium text-3xl text-center mb-2 text-slate-600">
            Welcome to Web3Auth StarkEx Playground
          </h1>
          <div className="flex items-center justify-center block text-slate-600 font-bold p-2">Please connect to Web3Auth to get started</div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                stark_key
              </label>
            </div>
            <div className="md:w-1/3">
              <p
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                id="inline-full-name">
                {starkKey as string}
              </p>
            </div>
          </div>
          {/* <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                token_id
              </label>
            </div>
            <div className="md:w-1/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                id="inline-full-name"
                type="text"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                amount
              </label>
            </div>
            <div className="md:w-1/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                id="inline-full-name"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div> */}
        </div>
        {/* <button className="flex rounded-full px-6 py-3 text-white" style={{ backgroundColor: "#0364ff" }}>
          Send with StarkEx Gateway
        </button> */}
        <Console />
      </div>
    </>
  );
}

export default HomePage;
