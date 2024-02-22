document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("cryptoChart").getContext("2d");
  const initialInvestment = {
    btc: 0.03577764,
    eth: 0.47519969,
  };

  const initialBtcPrice = 48365.63;
  const initialEthPrice = 3676.77;

  let chart = initChart();

  async function fetchCryptoData() {
    const apiUrl =
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd";
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const btcPrice = data.bitcoin.usd;
      const ethPrice = data.ethereum.usd;
      updateChart(btcPrice, ethPrice);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function initChart() {
    return new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Initial", "Current"],
        datasets: [
          {
            label: "BTC",
            data: [initialInvestment.btc * initialBtcPrice, 0],
            borderColor: "rgba(255, 99, 132, 1)",
            fill: false,
          },
          {
            label: "ETH",
            data: [initialInvestment.eth * initialEthPrice, 0],
            borderColor: "rgba(54, 162, 235, 1)",
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  }

  function updateChart(btcPrice, ethPrice) {
    chart.data.datasets[0].data[1] = btcPrice * initialInvestment.btc;
    chart.data.datasets[1].data[1] = ethPrice * initialInvestment.eth;
    chart.update();
  }

  fetchCryptoData();
  setInterval(fetchCryptoData, 60000);
});
