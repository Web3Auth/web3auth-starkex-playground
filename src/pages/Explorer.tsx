import starkwareCrypto from "@starkware-industries/starkware-crypto-utils";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import JsonFormatter from "react-json-formatter";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Tabs from "../components/Tabs";
import { useWeb3Auth } from "../services/web3auth";

function Explorer() {
  let batchInfo = [];
  const asset_type = starkwareCrypto.asset.getAssetType({
    type: "ETH",
    data: { quantum: "1" },
  });
  const asset_id = starkwareCrypto.asset.getAssetId({
    type: "ETH",
    data: { quantum: "1" },
  });
  const {
    provider,
    starkKey,
    onWithdrawalRequest,
    onL1WithdrawalRequest,
    getLastBatch,
  } = useWeb3Auth();

  const [vaultId, setVaultId] = useState("1654615998");
  const [tokenId, setTokenId] = useState(asset_id);
  const [assetType, setAssetType] = useState(asset_type);
  const [amount, setAmount] = useState("6000000000");
  const [l1TransactionData, setL1TransactionData] = useState([]);
  const [l2TransactionData, setL2TransactionData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [batch_id, setBatchId] = useState(null);
  const [starkexBatches, setStarkexBatches] = useState([]);
  const [lastStarkexBatch, setLastStarkexBatch] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [tab, setTab] = useState("l1");
  const itemsCountPerPage = 10;
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    if (tab === "batches") {
      console.log("Page Number", pageNumber);
      getStarkexBatches(pageNumber);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getStarkexBatches = async (page) => {
    console.log("Getting page", page);
    let lastBatch = 0;
    if (activePage === 1) {
      lastBatch = await provider.getLastBatch();
      setLastStarkexBatch(lastBatch);
    } else {
      lastBatch = lastStarkexBatch - (page - 1) * 5;
    }
    if (starkexBatches.length === 0) {
      batchInfo = new Array(lastStarkexBatch);
    }
    for (let index = lastBatch; index > lastBatch - 5; index--) {
      if (index <= 0) {
        break;
      }
      if (!batchInfo[index - 1]) {
        batchInfo[index - 1] = await provider.getBatch(index);
        batchInfo[index - 1].no_of_txns = batchInfo[index - 1].txs_info.length;
        batchInfo[index - 1].batch_id = index;
      }
    }
    setStarkexBatches(batchInfo);
  };

  const getData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-Key":
          "NGeSzLk0z99E2e4R1BK1AICtvAtCeprCQtc8DjOlAzK75x7qWSKUxhlfYijthyIy",
      },
    };

    fetch(
      "https://deep-index.moralis.io/api/v2/0x5731aEa1809BE0454907423083fb879079FB69dF?chain=goerli",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setL1TransactionData(response.result);
        return response;
      })
      .catch((err) => console.error(err));
  };

  const TabData = [
    {
      tabName: "L1 Transactions",
      onClick: () => setTab("l1"),
      active: tab === "l1",
    },
    {
      tabName: "StarkEx Batches",
      onClick: () => {
        setTab("batches");
        getStarkexBatches(1);
      },
      active: tab === "batches",
    },
    {
      tabName: "Transactions in the batch",
      active: tab === "starkex",
    },
  ];

  const renderTabs = () => {
    if (tab === "starkex") {
      const columns = ["txn_info"];
      const jsonStyle = {
        propertyStyle: { color: "red" },
        stringStyle: { color: "green" },
        numberStyle: { color: "darkorange" },
      };
      return (
        <div className="w-11/12 px-4 sm:px-6 lg:px-8 flex-col">
          <div className="justify-center p-8 mt-6 mb-0 space-y-4 rounded-lg bg-gray-200">
            <div className="overflow-x-auto">
              <h1>Batch ID: {batch_id}</h1>
              <table className="w-full text-sm divide-y divide-gray-200 table-fixed">
                <thead className="w-full">
                  <tr>
                    {columns.length > 0 &&
                      columns.map((item) => {
                        return (
                          <th className="p-4 font-bold text-left text-gray-900 whitespace-nowrap w-1/3">
                            {item}
                          </th>
                        );
                      })}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  <JsonFormatter
                    json={JSON.stringify(l2TransactionData)}
                    tabWith={4}
                    jsonStyle={jsonStyle}
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    } else if (tab === "l1") {
      const columns = [
        "hash",
        "block_number",
        "from_address",
        "to_address",
        "gas",
      ];
      return (
        <div className="w-11/12 px-4 sm:px-6 lg:px-8 flex-col">
          <div className="justify-center p-8 mt-6 mb-0 space-y-4 rounded-lg bg-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-sm divide-y divide-gray-200 table-fixed">
                <thead className="w-full">
                  <tr>
                    {columns.length > 0 &&
                      columns.map((item) => {
                        return (
                          <th className="p-4 font-bold text-left text-gray-900 whitespace-nowrap w-1/3">
                            {item}
                          </th>
                        );
                      })}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {l1TransactionData.length > 0 &&
                    l1TransactionData
                      .slice(
                        (activePage - 1) * itemsCountPerPage,
                        (activePage - 1) * itemsCountPerPage + itemsCountPerPage
                      )
                      .map((item) => {
                        return (
                          <tr>
                            {columns.map((columnName) => {
                              switch (columnName) {
                                case "hash":
                                  return (
                                    <td className="p-4 font-medium whitespace-nowrap truncate text-blue-500 ">
                                      <a
                                        href={`https://goerli.etherscan.io/tx/${item[columnName]}`}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        {item[columnName]}
                                      </a>
                                    </td>
                                  );
                                case "block_number":
                                  return (
                                    <td className="p-4 font-medium whitespace-nowrap truncate text-blue-500">
                                      <a
                                        href={`https://goerli.etherscan.io/block/${item[columnName]}`}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        {item[columnName]}
                                      </a>
                                    </td>
                                  );
                                case "from_address":
                                  return (
                                    <td className="p-4 font-medium whitespace-nowrap truncate text-blue-500">
                                      <a
                                        href={`https://goerli.etherscan.io/address/${item[columnName]}`}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        {item[columnName]}
                                      </a>
                                    </td>
                                  );
                                case "to_address":
                                  return (
                                    <td className="p-4 font-medium whitespace-nowrap truncate text-blue-500">
                                      <a
                                        href={`https://goerli.etherscan.io/address/${item[columnName]}`}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        {item[columnName]}
                                      </a>
                                    </td>
                                  );
                                default:
                                  return (
                                    <td className="p-4 whitespace-nowrap ">
                                      {item[columnName]}
                                    </td>
                                  );
                              }
                            })}
                          </tr>
                        );
                      })}
                </tbody>
              </table>
              <div className="flex-1 w-full px-20 py-5 justify-center align-center">
                <Pagination
                  innerClass="pagination"
                  itemClass="page-item"
                  linkClass="page-link"
                  activePage={activePage}
                  activeClass="active-page"
                  itemsCountPerPage={itemsCountPerPage}
                  totalItemsCount={l1TransactionData.length}
                  onChange={(e) => {
                    handlePageChange(e);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (tab === "batches") {
      const columns = [
        "batch_id",
        "prev_batch_id",
        "sequence_number",
        "no_of_txns",
        "time_created",
      ];
      return (
        <div className="w-11/12 px-4 sm:px-6 lg:px-8 flex-col">
          <div className="justify-center p-8 mt-6 mb-0 space-y-4 rounded-lg bg-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full text-sm divide-y divide-gray-200 table-fixed">
                <thead className="w-full">
                  <tr>
                    {columns.length > 0 &&
                      columns.map((item) => {
                        return (
                          <th className="p-4 font-bold text-left text-gray-900 whitespace-nowrap w-1/3">
                            {item}
                          </th>
                        );
                      })}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {starkexBatches.length > 0 ? (
                    starkexBatches
                      .slice(0)
                      .reverse()
                      .map((item) => {
                        return (
                          <tr>
                            {columns.map((columnName) => (
                              <td
                                className="p-4 font-medium whitespace-nowrap truncate"
                                onClick={() => {
                                  setTab("starkex");
                                  setBatchId(item.batch_id);
                                  setIsVisible(true);
                                  setL2TransactionData(item.txs_info);
                                }}
                              >
                                {item[`${columnName}`]}
                              </td>
                            ))}
                          </tr>
                        );
                      })
                  ) : (
                    <>
                      <div className="flex-1 justify-center items-center">
                        <svg
                          aria-hidden="true"
                          className="mr-2 w-full h-full text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </>
                  )}
                </tbody>
              </table>
              <div className="flex-1 w-full px-20 py-5 justify-center align-center">
                <Pagination
                  innerClass="pagination"
                  itemClass="page-item"
                  linkClass="page-link"
                  activePage={activePage}
                  activeClass="active-page"
                  itemsCountPerPage={5}
                  totalItemsCount={lastStarkexBatch}
                  onChange={(e) => {
                    handlePageChange(e);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <main className="flex flex-col h-screen z-0">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {provider ? (
          <div className=" w-full h-full flex flex-1 flex-col bg-gray-50 items-center justify-flex-start overflow-scroll">
            <h1 className="w-11/12 px-4 pt-16 pb-8 sm:px-6 lg:px-8 text-2xl font-bold text-center sm:text-3xl">
              StarkEx Explorer
            </h1>
            <Tabs tabData={TabData} />
            {renderTabs()}
          </div>
        ) : (
          <div className=" w-full h-full flex flex-1 flex-col bg-gray-50 items-center justify-center overflow-scroll p-4">
            <h1 className="text-2xl font-bold text-center sm:text-3xl">
              Welcome to Web3Auth StarkEx Playground
            </h1>
            <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
              Please connect to Web3Auth to get started.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Explorer;
