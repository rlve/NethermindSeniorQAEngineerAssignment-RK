export const sendEthBlockNumber = async () => {
  const body = {
    jsonrpc: "2.0",
    id: 0,
    method: "eth_blockNumber",
    params: [],
  };

  const response = await fetch("http://localhost:8545", {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  console.log(data);
};
