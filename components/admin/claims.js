export function Claims() {
    return fetch(BASE_URL + 'pages/admin/claims.html')
        .then(response => response.text())
        .then(data => data);
}
