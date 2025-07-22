import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ShortenForm from "../components/ShortenForm";
import UrlList from "../components/UrlList";
import { connectWalletAPI, shortenUrl, getMyUrls } from "../services/api";
import abi from "../URLRegistry.json";
import { generateShortCode } from "../utils/generateShortCode";

const contractAddress = "0x0d9A2fCce6212AcF7127eae4822B2c554657871F";

const Home = () => {
  const [wallet, setWallet] = useState(null);
  const [contract, setContract] = useState(null);
  const [status, setStatus] = useState("");
  const [urls, setUrls] = useState([]);

  const handleConnect = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const urlContract = new ethers.Contract(contractAddress, abi.abi, signer);

      setWallet(accounts[0]);
      setContract(urlContract);
      await connectWalletAPI({ walletAddress: accounts[0] });
    } catch (err) {
      console.error("Wallet connect error:", err);
    }
  };

  const handleShorten = async (originalUrl) => {
    if (!wallet || !contract) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const shortCode = generateShortCode();
      setStatus("⏳ Waiting for transaction confirmation...");
      const tx = await contract.registerURL(shortCode);
      await tx.wait();

      const response = await shortenUrl({
        originalUrl,
        walletAddress: wallet,
        shortCode,
      });

      if (response.status === 201 || response.status === 200) {
        setStatus("✅ URL registered and saved.");
        setUrls((prev) => [...prev, response.data]);
      } else {
        setStatus("❌ Backend failed to save URL.");
      }
    } catch (err) {
      console.error("Error:", err);
      setStatus("❌ Transaction or backend failed.");
    }
  };

  const fetchUrls = async () => {
    if (!wallet) return;
    try {
      const response = await getMyUrls(wallet);
      setUrls(response.data || []);
    } catch (err) {
      console.error("Failed to fetch URLs:", err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [wallet]);

  const handleClickUpdate = (shortCode) => {
    setUrls((prev) =>
      prev.map((url) =>
        url.shortCode === shortCode ? { ...url, clicks: url.clicks + 1 } : url
      )
    );
  };

  return (
    <div className="h-screen w-full flex justify-center items-center px-4 bg-gradient-to-br from-gray-50 via-white to-purple-100 overflow-hidden">
      <div className="w-full max-w-3xl bg-white border border-gray-300 rounded-xl shadow-md p-6 sm:p-8 md:p-10 overflow-y-auto max-h-[95vh]">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6 flex items-center justify-center gap-2">
          <span role="img" aria-label="link">🔗</span> Web3 URL Shortener
        </h1>

        {!wallet ? (
          <div className="flex justify-center">
            <button
              onClick={handleConnect}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-md transition duration-300"
            >
              🚀 Connect Wallet
            </button>
          </div>
        ) : (
          <>
            <div className="text-center text-sm text-gray-600 mb-4">
              <span className="text-green-600">✅ Connected Wallet</span>
              <p className="font-mono text-xs break-all text-purple-700">{wallet}</p>
            </div>

            {status && (
              <p className="text-center text-sm font-medium text-indigo-600 mb-4">
                {status}
              </p>
            )}

            <ShortenForm onShorten={handleShorten} />
            <UrlList urls={urls} onClickUpdate={handleClickUpdate} />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
