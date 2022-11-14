const sendLogin = async () => {
    const user = document.getElementById("user").value;
    const pwd = document.getElementById("pwd").value;
    try {
        const response = await fetch('http://localhost::3001/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ user, pwd })
        });
        if (!response.ok) {
            if (response.status === 401) {
                return await sendRefreshToken();
            }
            throw new Error(`${reponse.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (err) {
        console.log(err.stack);
        displayErr();
    }
}