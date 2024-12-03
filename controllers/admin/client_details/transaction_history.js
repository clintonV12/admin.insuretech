export function RequestTranasctionInfo() {
  const raw = {
    "client_transactions": clientRowData.id //submits client id
  };

  var table = $('#transaction_tbl').DataTable({
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
        title: "Amount (E)",
        data: "amount"
      },
      {
        title: "Payment Status",
        data: "payment_status"
      },
      {
        title: "Due Date",
        data: "billing_date"
      },
      {
        title: "Created ",
        data: "created_at",
      }
    ]
  });

  // Debugging: Check if DataTable initialization is successful
  console.log("DataTable initialized: ", table);
}


