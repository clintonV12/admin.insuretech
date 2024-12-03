function showSpinner() {
	var loader = document.getElementById("spinner");
  loader.innerHTML = `
    <div class="spinner-border bg-dark text-info" role="status">
      <span class="sr-only">...</span>
    </div>
  `;
}

function hideSpinner() {
	var loader = document.getElementById("spinner");
  loader.innerHTML = ``;
}

//"success","warning","info","question","error"
function showErrorMsg(title, msg) {
  Swal.fire(title, msg,"error");
}

function showSuccessMsg(title, msg) {
  Swal.fire(title, msg,"success");
}

function showInfoMsg(title, msg) {
  Swal.fire(title, msg,"info");
}

function openTransactionHistory() {
    console.log(clientRowData);
    pagename = 'transaction-history';
    window.router();
}

function openBeneficiary() {
    pagename = 'beneficiary';
    window.router();
}

function openCovered() {
    pagename = 'covered';
    window.router();
}

function openAdminDash() {
    pagename = 'admin-dashboard';
    window.router();
}