export function Beneficiary() {
    return fetch(BASE_URL + 'pages/admin/client_details/beneficiary.html')
        .then(response => response.text())
        .then(data => data);
}
