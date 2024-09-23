import { router } from '../../app.js';

export function RequestAllClaimsInfo() {
  const raw = {
    "all-claims": 1
  };

  var table = $('#claims_tbl').DataTable({
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
        title: "Phone Number",
        data: "phone_number"
      },
      {
        title: "First Name",
        data: "first_name"
      },
      {
        title: "Processing Stage",
        data: "status"
      },
      {
        title: "Submited At",
        data: "created_at",
      }
    ]
  });

  $("#claims_tbl tbody").on("click", "tr", function() {
    var data = table.row(this).data();

    const modal = new bootstrap.Modal('#claim-docs');
    modal.show();
    showSpinner();
    RequestDocuments(data.id);
    
  });

  // Debugging: Check if DataTable initialization is successful
  console.log("DataTable initialized: ", table);
}

function RequestDocuments(id) {
  
  const raw = JSON.stringify({
      "get-claim-doc": "1",
      "claim_id": id,
    });
  

  var req = $.ajax({
    "url": SERVER_URL + "admin",
    "method": "POST",
    "data": raw,
    "headers": {
      "Authorization": `Bearer ${TOKEN}`,
      "Content-Type": "application/json"
      }
  });

  req.done(function(data){
      //if the call is successful
    const idBtn = document.getElementById("download-id")
    idBtn.innerText = "Download National ID";
    idBtn.setAttribute("href", DOWNLOAD_URL + data.national_id);

    const certBtn = document.getElementById("download-cert");
    certBtn.innerText = "Download Death Certificate";
    certBtn.setAttribute("href", DOWNLOAD_URL + data.death_certificate);
  });

  req.fail(function(jqXHR, textStatus, errorThrown){
      //if the call is not successful
      console.log(jqXHR);
      showErrorMsg("Error", jqXHR.responseText);
    });

  req.always(function(){
    hideSpinner();
  });

}

