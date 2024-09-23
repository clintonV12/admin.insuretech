export function AdminPasswordRecovery() {
    return fetch(BASE_URL + 'pages/admin/admin-password-recover.html')
        .then(response => response.text())
        .then(data => data);
}
