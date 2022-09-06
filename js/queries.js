async function httpRequest(url, body=null, method='POST', headers={'Content-Type': 'application/json'}) {
    return await fetch(url, { method, headers, body: JSON.stringify(body) })
}

