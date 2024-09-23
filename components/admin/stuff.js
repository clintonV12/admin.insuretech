export function Stuff() {
    return fetch(BASE_URL + 'pages/admin/stuff.html')
        .then(response => response.text())
        .then(data => data);
}
