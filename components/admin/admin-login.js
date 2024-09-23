export function AdminLogin() {
    return fetch(BASE_URL + 'pages/admin/admin-login.html')
        .then(response => response.text())
        .then(data => data);
}
