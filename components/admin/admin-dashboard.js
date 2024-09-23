export function AdminDashboard() {
    return fetch(BASE_URL + 'pages/admin/admin-dashboard.html')
        .then(response => response.text())
        .then(data => data);
}
