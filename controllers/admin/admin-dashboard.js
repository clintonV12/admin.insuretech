import { router } from '../../app.js';

export function RequestAllClientInfo() {
  const raw = {
    "all-clients": 1
  };

  var table = $('#policy_tbl').DataTable({
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
        title: "Last Name",
        data: "last_name"
      },
      {
        title: "National ID",
        data: "national_id"
      },
      {
        title: "Registered At",
        data: "created_at",
      }
    ]
  });


  // Debugging: Check if DataTable initialization is successful
  console.log("DataTable initialized: ", table);
}

export function RequestStats() {
  
  const raw = JSON.stringify({
      "all-stats": "1",
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
      document.getElementById("total_clients").innerText = data.total_clients;
      document.getElementById("total_agents").innerText = data.total_agents;
      document.getElementById("total_covered").innerText = data.total_covered;
      document.getElementById("total_claims").innerText = data.total_claims;
  });

  req.fail(function(jqXHR, textStatus, errorThrown){
      //if the call is not successful
      console.log(jqXHR);
      showErrorMsg("Error", jqXHR.responseText);
    });

}