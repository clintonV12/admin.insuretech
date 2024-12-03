export function Covered() {
    return fetch(BASE_URL + 'pages/admin/client_details/covered.html')
        .then(response => response.text())
        .then(data => data);
}
