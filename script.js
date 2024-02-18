const ctx = document.getElementById("cryptoChart").getContext("2d");
let chart;

function fetchCryptoData() {
  const apiUrl =
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const btcPrice = data.bitcoin.usd;
      const ethPrice = data.ethereum.usd;
      updateChart(chart, btcPrice, ethPrice);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function initChart() {
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["BTC", "ETH"],
      datasets: [
        {
          label: "USD",
          data: [0, 0],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function updateChart(chart, btcPrice, ethPrice) {
  chart.data.datasets[0].data = [btcPrice, ethPrice];
  chart.update();
}

initChart();
fetchCryptoData();

setInterval(fetchCryptoData, 60000);
