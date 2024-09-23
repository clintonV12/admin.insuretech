import { router } from '../../app.js';

export function RequestAllStuffInfo() {
  const raw = {
    "all-stuff": 1
  };

  var table = $('#stuff_tbl').DataTable({
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
        title: "Role",
        data: "role"
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

  $("#stuff_tbl tbody").on("click", "tr", function() {
      var data = table.row(this).data();
      console.log(data.id);

      const modal = new bootstrap.Modal('#stuff-actions');
      modal.show();

      const editButton = document.getElementById('edit-btn');
      editButton.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default form submission behavior
          setStuffInfo(data.first_name, data.last_name, data.email);
      });

      const saveEditButton = document.getElementById('save-editbtn');
      saveEditButton.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default form submission behavior
          RequestStuffUpdate(data.id);
          $("#edit-stuff").modal("hide");
      });

      const removeButton = document.getElementById('remove-btn');
      removeButton.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default form submission behavior
          RequestStuffRemoval(data.id);
          $("#remove-stuff").modal("hide");
      });

    });

  // Debugging: Check if DataTable initialization is successful
  console.log("DataTable initialized: ", table);
}

function setStuffInfo(fname, lname, phone, email) {
  document.getElementById("f_name").value = fname;
  document.getElementById("l_name").value = lname;
  document.getElementById("username").value  = phone;
  document.getElementById("email").value  = email;
}

function RequestStuffUpdate(id) {
  
  const raw = JSON.stringify({
      "update-stuff": "1",
      "stuff_id": id,
      "first_name": document.getElementById("f_name").value,
      "last_name": document.getElementById("l_name").value,
      "username": document.getElementById("username").value,
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

function RequestStuffRemoval(id) {
  
  const raw = JSON.stringify({
      "remove-stuff": "1",
      "stuff_id": id
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
    showInfoMsg("Alert", data.message);
  });

  req.fail(function(jqXHR, textStatus, errorThrown){
      //if the call is not successful
      console.log(jqXHR);
      showErrorMsg("Error", jqXHR.responseText);
    });

}

export function AddNewStuff() {
  const addStuffButton = document.getElementById('save-new-stuff');
  addStuffButton.addEventListener('click', (event) => {
      event.preventDefault();
      RequestStuffCreation();
  });
}

function RequestStuffCreation() {
  
  const raw = JSON.stringify({
      "new-stuff": "1",
      "role": document.getElementById("s-role").value,
      "first_name": document.getElementById("s-f_name").value,
      "last_name": document.getElementById("s-l_name").value,
      "email": document.getElementById("s-email").value,
      "username": document.getElementById("s-username").value,
      "password": document.getElementById("s-password").value
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
    showInfoMsg("Alert", data.message);
    $("#new-stuff").modal("hide");
  });

  req.fail(function(jqXHR, textStatus, errorThrown){
      //if the call is not successful
      console.log(jqXHR);
      showErrorMsg("Error", jqXHR.responseText);
    });

}

