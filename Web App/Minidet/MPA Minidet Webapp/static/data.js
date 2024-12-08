var currentPage = 1; // Track the current page
var limit = 10; //Default Number of records per page
var chart;

async function lineChart() {
  const endpoint = `/api/data`;
  chart = new Chart(document.getElementById("lineChart"), {
    type: "bar",
    data: {
      datasets: [
        {
          label: "Attack ID",
          backgroundColor: "rgba(240, 0, 0, 1)", // Color for all bars
          borderColor: "rgba(248,215,218, 1)", // Add some styling if needed
          borderWidth: 1,
          data: [],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "realtime",
          realtime: {
            duration: 10000, // Display the last 70 seconds
            refresh: 1000, // Fetch data every second
            delay: 1000,
            onRefresh: async (chart) => {
              try {
                const response = await fetch(endpoint);
                if (response.ok) {
                  data = await response.json();

                  data.forEach((element) => {
                    chart.data.datasets[0].data.push({
                      x: new Date(element.timestamp).getTime(), // Timestamp for x-axis
                      y: element.attack_id, // Attack ID for y-axis
                    });
                  });
                  const maxDatapoints = 2000;

                  if (chart.data.datasets[0].data.length > maxDatapoints) {
                    chart.data.datasets[0].data =
                      chart.data.datasets[0].data.slice(-maxDatapoints);
                  }
                  chart.update("quiet");
                } else {
                  console.log("Error response", response);
                }
              } catch (error) {
                console.error("Error line chart:", error);
              }
            },
          },
        },
        y: {
          min: 0,
          max: 9,
        },
      },
    },
  });
}

async function pieChart() {
  const endpoint = `/api/data`;
  //Create chart
  chart = new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      datasets: [
        {
          label: ["0", "1", "2", "3", "4", "5", "6", "7", "8 ", "9"],
          backgroundColor: [
            "rgba(193, 226, 195, 1)", // Color for label "0"
            "rgba(226, 193, 225, 1)", // Color for label "1"
            "rgba(193, 226, 226, 1)", // Color for label "2"
            "rgba(193, 226, 203, 1)", // Color for label "3"
            "rgba(193, 226, 185, 1)", // Color for label "4"
            "rgba(226, 195, 193, 1)", // Color for label "5"
            "rgba(226, 226, 193, 1)", // Color for label "6"
            "rgba(226, 193, 193, 1)", // Color for label "7"
            "rgba(193, 193, 226, 1)", // Color for label "8"
            "rgba(178, 210, 180, 1)", // Color for label "9"
          ],
          borderColor: "rgba(248,215,218, 1)", // Add some styling if needed
          borderWidth: 1,
          data: [],
        },
      ],
    },
    options: {},
  });
  const updatePieChart = async () => {
    try {
      //Read data
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json(); // Parse the JSON data
        //Similar to a map but is an object
        const attack_count = {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0,
        };
        data.forEach((element) => {
          if (attack_count.hasOwnProperty(element.attack_id)) {
            attack_count[element.attack_id]++;
          }
        });
        //Take id
        chart.data.labels = ["0", "1", "2", "3", "4", "5", "6", "7", "8 ", "9"];
        //Take count
        chart.data.datasets[0].data = Object.values(attack_count);
        chart.update("quiet");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  setInterval(updatePieChart, 700);
}

async function loadTable(page = 1) {
  //page, limit, parameters for the skip(skip).limit(limit))
  const endpoint = `/api/data?page=${page}&limit=${limit}`;
  // Add query parameters for pagination
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      const data = await response.json(); // Parse the JSON data
      let tableRows = ""; // Initialize the variable for table rows

      // Iterate over the data array
      data.forEach((element) => {
        //Generate attack_name- with variable ${}
        const attackClass = `attack_name-${element.attack_name}`;
        tableRows += `
                <tr>
                    <td>${element.source_ip}</td>
                    <td>${element.source_port}</td>
                    <td>${element.target_ip}</td>
                    <td>${element.target_port}</td>
                    <td>${element.protocol}</td>
                    <td>${element.input_bytes}</td>
                    <td>${element.output_bytes}</td>
                    <td>${element.anomality}</td>
                    <td>${element.attack_id}</td>
                    <!--Convert to HH:MM:SS format-->
                    <td class ="attack_name ${attackClass}">${
          element.attack_name
        }</td>
                    <td>${new Date(element.timestamp).toLocaleTimeString(
                      "en-GB"
                    )}</td>
                </tr>
                `;
      });

      // Insert the rows into the table body
      document.querySelector("#tableContainer tbody").innerHTML = tableRows;

      // Update the current page 
      document.getElementById("pageIndicator").textContent = `Page ${page}`;
      currentPage = page; 
    } else {
      console.error(
        "Failed to load data:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

//Update rows limit
function updateRowsPerPage(){
limit = document.getElementById("rowsPerPage").value;
loadTable(1);
}
// Load the next page
function loadNextPage() {
  loadTable(currentPage + 1);
}

// Load the previous page
function loadPreviousPage() {
  if (currentPage > 1) {
    loadTable(currentPage - 1);
  }
}

window.onload = () => {
  loadTable(currentPage);
  lineChart();
  pieChart();
  setInterval(() => {
    loadTable(currentPage);
  }, 1005);
};
