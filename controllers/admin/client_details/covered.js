export function RequestCoveredInfo() {
  const raw = {
    "client_covered": clientRowData.id //submits client id
  };

  var table = $('#covered_tbl').DataTable({
    processing: true,
    serverSide: false,
    pageLength: 5,
    responsive: true,
    bLengthChange: true,
    bFilter: true,
    layout: {
      bottomStart: {
        buttons: ['copyHtml5','excelHtml5','csvHtml5', 'print']
      }
    },
    ajax: {
      method: "POST",
      url: SERVER_URL + "admin",
      data: function(d) {
        return JSON.stringify(raw);
      },
      dataSrc: "",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      error: function(xhr, error, code) {
        console.error("AJAX Error: ", error, code);
        console.log(xhr);
      }
    },

    columns: [
      {
        title: "Full Name",
        data: "full_name"
      },
      {
        title: "ID",
        data: "national_id"
      },
      {
        title: "Benefit Value (E)",
        data: "benefit_amount"
      },
      {
        title: "Premium (E)",
        data: "monthly_premium"
      },
      {
        title: "Relationship",
        data: "relationship",
      }
    ]
  });

  // Debugging: Check if DataTable initialization is successful
  console.log("DataTable initialized: ", table);
}


