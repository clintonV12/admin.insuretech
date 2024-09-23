export function Agents() {
    return fetch(BASE_URL + 'pages/admin/agents.html')
        .then(response => response.text())
        .then(data => data);
}
