export function RequestBeneficiaryInfo() {
  const raw = {
    "client_beneficiary": clientRowData.id //submits client id
  };

  var table = $('#beneficiary_tbl').DataTable({
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
        title: "Phone Number",
        data: "phone_number"
      },
      {
        title: "ID",
        data: "national_id"
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


