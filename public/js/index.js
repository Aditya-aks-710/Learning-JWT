
async function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    await axios.post("http://localhost:3000/signup", {
        username: username,
        password: password
    });
    alert("Signed Up Successfully");
}

async function signin() {
    const username = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;

    const response = await axios.post("http://localhost:3000/signin", {
        username: username,
        password: password
    });

    if(!response.data.token){
        return alert(response.data.message);
    }

    localStorage.setItem("token", response.data.token);

    alert("Successfully signed in!");
}

function logout() {
    localStorage.removeItem("token");

    document.getElementById("user-info").innerHTML = "";

    window.location.href = "/";

    alert("logged out");
}

async function getUserInformation() {
    const response = await axios.get("http://localhost:3000/me", {
        headers: {
            token: localStorage.getItem("token")
        }
    });
    document.getElementById("user-info").innerHTML = "Username:" + response.data.username + "Password: " + response.data.password;
}
getUserInformation();