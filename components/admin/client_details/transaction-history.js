export function TransactionHistory() {
    return fetch(BASE_URL + 'pages/admin/client_details/transaction_history.html')
        .then(response => response.text())
        .then(data => data);
}
