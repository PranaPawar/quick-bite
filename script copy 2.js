document.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let department = document.getElementById("department").value;
    let password = document.getElementById("password").value;

    let message = document.getElementById("message");

    if (name === "" || email === "" || department === "" || password === "") {
        message.textContent = "Please fill in all fields.";
        message.style.color = "red";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        message.style.color = "red";
        return;
    }

    message.textContent = "Sign in successful! Welcome " + name + " 🎉";
    message.style.color = "green";

     //go to home page
    window.location.href ="home.html";

    // Clear form
    document.getElementById("loginForm").reset();
});vdocument.getElementById("loginForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let department = document.getElementById("department").value;
    let password = document.getElementById("password").value;

    let message = document.getElementById("message");

    if (name === "" || email === "" || department === "" || password === "") {
        message.textContent = "Please fill in all fields.";
        message.style.color = "red";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        message.style.color = "red";
        return;
    }

    message.textContent = "Sign in successful! Welcome " + name + " ";
    message.style.color = "green";

    // Clear form
    document.getElementById("loginForm").reset();
});
function signIn() {
    let role = document.getElementById("select").value;

    if (role === "") {
        alert("Please select an option");
    }
    else if (role === "Teacher") {
        window.location.href = "home.html";
    }
    else if (role === "Admin") {
        window.location.href = "login.html";
    }
}