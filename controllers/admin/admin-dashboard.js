import { router } from '../../app.js';

const ajaxErrorHandler = (xhr, error, code) => {
  console.error("AJAX Error:", error, code);
  console.log(xhr);
  showErrorMsg("Error", xhr.responseText || "An unexpected error occurred.");
};

export function RequestAllClientInfo() {
  const raw = JSON.stringify({ "all-clients": 1 });

  const table = $('#policy_tbl').DataTable({
    processing: true,
    serverSide: false,
    pageLength: 5,
    responsive: true,
    bLengthChange: true,
    bFilter: true,
    buttons: ['copyHtml5', 'excelHtml5', 'csvHtml5', 'print'],

    ajax: {
      method: "POST",
      url: `${SERVER_URL}admin`,
      data: () => raw,
      dataSrc: "",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      error: ajaxErrorHandler
    },

    columns: [
      { title: "Phone Number", data: "phone_number" },
      { title: "First Name", data: "first_name" },
      { title: "Last Name", data: "last_name" },
      { title: "National ID", data: "national_id" },
      {
        title: "Actions",
        data: null,
        defaultContent: `
          <div class="dropdown">
            <button type="button" class="btn btn-info dropdown-toggle" href="#" id="client_action" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bx bx-dots-vertical-rounded"></i>
            </button>
            <ul class="dropdown-menu" aria-labelledby="client_action">
              <li><a class="dropdown-item" href="#" onclick="openTransactionHistory()">View Transactions</a></li>
              <li><a class="dropdown-item" href="#" onclick="openCovered()">View Covered</a></li>
              <li><a class="dropdown-item" href="#" onclick="openBeneficiary()">View Beneficiaries</a></li>
            </ul>
          </div>`,
        targets: -1
      }
    ]
  });

  table.on("click", "button", function(e) {
    let data = table.row(e.target.closest('tr')).data();
    clientRowData = data;
  });

  console.log("DataTable initialized:", table);
}

export function RequestStats() {
  const raw = JSON.stringify({ "all-stats": 1 });

  $.ajax({
    url: `${SERVER_URL}admin`,
    method: "POST",
    data: raw,
    headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      }
  })
    .done(data => {
      document.getElementById("total_clients").innerText = data.total_clients || 0;
      document.getElementById("total_agents").innerText = data.total_agents || 0;
      document.getElementById("total_covered").innerText = data.total_covered || 0;
      document.getElementById("total_claims").innerText = data.total_claims || 0;
    })
    .fail(ajaxErrorHandler);
}
