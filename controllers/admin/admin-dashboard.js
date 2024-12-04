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
      responsive: false,
      bLengthChange: true,
      bFilter: true,
      layout: {
        bottomStart: {
          buttons: ['copyHtml5','excelHtml5','csvHtml5', 'print']
        }
      },
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
                      <button class="btn btn-sm bg-gradient-info" type="button" id="client_action" data-bs-toggle="modal" data-bs-target="#actionModal">
                          <i class="bx bx-dots-horizontal-rounded"></i>
                      </button>
                  </div>`,
              targets: -1
          }
      ],
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
