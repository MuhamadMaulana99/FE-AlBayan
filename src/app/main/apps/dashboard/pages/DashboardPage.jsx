import React from "react";
import Chart from "react-apexcharts";

const DashboardPage = (props) => {
  const data = props?.data;


  const statusSummary = {
    menunggu: { count: 0, totalNominal: 0 },
    layak: { count: 0, totalNominal: 0 },
    tidakLayak: { count: 0, totalNominal: 0 }
};

data.forEach(item => {
    if (item.status === null) {
        statusSummary.menunggu.count += 1;
        statusSummary.menunggu.totalNominal += item.nominalPermohonan;
    } else if (item.status === "1") {
        statusSummary.layak.count += 1;
        statusSummary.layak.totalNominal += item.nominalPermohonan;
    } else if (item.status === "0") {
        statusSummary.tidakLayak.count += 1;
        statusSummary.tidakLayak.totalNominal += item.nominalPermohonan;
    }
});

// console.log(statusSummary, 'ddd');
  // Data untuk Bar Chart
  const barChartOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: ["Jumlah Nasabah"],
    },
    colors: ["#00E396", "#FF4560", "#775DD0"],
  };

  const barChartSeries = [
    {
      name: "Menunggu",
      data: [statusSummary.menunggu?.count],
    },
    {
      name: "Layak",
      data: [statusSummary?.layak?.count],
    },
    {
      name: "Tidak Layak",
      data: [statusSummary?.tidakLayak?.count],
    },
  ];

  // Data untuk Pie Chart
  const pieChartOptions = {
    
    labels: ["Menunggu", "Layak", "Tidak Layak"],
    colors: ["#00E396", "#FF4560", "#775DD0"], // Tambahkan warna untuk kategori "Menunggu"
    legend: {
      position: "bottom", // Label di bawah chart
      horizontalAlign: "center", // Label diatur secara horizontal
      fontSize: "14px", // Ukuran font label
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            fontSize: "12px", // Ukuran lebih kecil untuk perangkat kecil
          },
        },
      },
    ],
  };

  const pieChartSeries = [
    statusSummary.menunggu?.totalNominal,
    statusSummary.layak?.totalNominal,
    statusSummary.tidakLayak?.totalNominal,
  ];
  // console.log(pieChartSeries, 'pieChartSeries')

  return (
    <div
    className="mt-10"
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      {/* Bar Chart */}
      <div style={{ width: "45%" }}>
        <Chart
          options={barChartOptions}
          series={barChartSeries}
          type="bar"
          height={350}
          />
          <h2 className=" w-full text-center">Jumlah Nasabah</h2>
      </div>

      {/* Pie Chart */}
      <div className="" style={{ width: "45%" }}>
        <Chart
          options={pieChartOptions}
          series={pieChartSeries}
          type="pie"
          height={350}
          />
          <h2 className=" w-full text-center mt-48">Proporsi Nasabah</h2>
      </div>
    </div>
  );
};

export default DashboardPage;
