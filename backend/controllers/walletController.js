

exports.connectWallet = async (req, res) => {
  const { walletAddress } = req.body;

  console.log("🔐 Connect Wallet Request:");
  console.log("→ Wallet Address:", walletAddress);

  res.json({ message: "Wallet connected", walletAddress });
};
