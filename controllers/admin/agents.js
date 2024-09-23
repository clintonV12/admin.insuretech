import { router } from '../../app.js';

export function RequestAllAgentsInfo() {
  const raw = {
    "all-agents": 1
  };

  var table = $('#agents_tbl').DataTable({
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
        title: "Email",
        data: "email"
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
        title: "Registered At",
        data: "created_at",
      }
    ]

  });

  $("#agents_tbl tbody").on("click", "tr", function() {
      var data = table.row(this).data();
      console.log(data.id);

      const modal = new bootstrap.Modal('#agent-actions');
      modal.show();

      const editButton = document.getElementById('edit-btn');
      editButton.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default form submission behavior
          setAgentInfo(data.first_name, data.last_name, data.phone_number, data.email);
      });

      const saveEditButton = document.getElementById('save-editbtn');
      saveEditButton.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default form submission behavior
          RequestAgentUpdate(data.id);
          $("#edit-agent").modal("hide");
      });

      const removeButton = document.getElementById('remove-btn');
      removeButton.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default form submission behavior
          RequestAgentRemoval(data.id);
          $("#remove-agent").modal("hide");
      });

    });

  // Debugging: Check if DataTable initialization is successful
  console.log("DataTable initialized: ", table);
}

function setAgentInfo(fname, lname, phone, email) {
  document.getElementById("f_name").value = fname;
  document.getElementById("l_name").value = lname;
  document.getElementById("phone").value  = phone;
  document.getElementById("email").value  = email;
}

function RequestAgentUpdate(id) {
  
  const raw = JSON.stringify({
      "update-agent": "1",
      "agent_id": id,
      "first_name": document.getElementById("f_name").value,
      "last_name": document.getElementById("l_name").value,
      "phone_number": document.getElementById("phone").value,
      "email": document.getElementById("email").value
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
    showSuccessMsg("Well Done", data.message);
  });

  req.fail(function(jqXHR, textStatus, errorThrown){
      //if the call is not successful
      console.log(jqXHR);
      showErrorMsg("Error", jqXHR.responseText);
    });

}

function RequestAgentRemoval(id) {
  
  const raw = JSON.stringify({
      "remove-agent": "1",
      "agent_id": id
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
    showSuccessMsg("Well Done", data.message);
  });

  req.fail(function(jqXHR, textStatus, errorThrown){
      //if the call is not successful
      console.log(jqXHR);
      showErrorMsg("Error", jqXHR.responseText);
    });

}

export function AddNewAgent() {
  const addAgentButton = document.getElementById('save-new-agent');
  addAgentButton.addEventListener('click', (event) => {
      event.preventDefault();
      RequestAgentCreation();
  });
}

function RequestAgentCreation() {
  
  const raw = JSON.stringify({
      "new-agent": "1",
      "first_name": document.getElementById("n-f_name").value,
      "last_name": document.getElementById("n-l_name").value,
      "phone_number": document.getElementById("n-phone").value,
      "email": document.getElementById("n-email").value,
      "username": document.getElementById("n-username").value,
      "password": document.getElementById("n-password").value
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
    showSuccessMsg("Well Done", data.message);
  });

  req.fail(function(jqXHR, textStatus, errorThrown){
      //if the call is not successful
      console.log(jqXHR);
      showErrorMsg("Error", jqXHR.responseText);
    });

}

