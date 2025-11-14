document.addEventListener("DOMContentLoaded", function () {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
        alert("No user data found!");
        window.location.href = "../Public/login.html";
        return;
    }

    const user = JSON.parse(storedUser);

    document.getElementById("p_username").value = user.username;
    document.getElementById("p_fullname").value = user.fullname;
    document.getElementById("p_email").value = user.email;
    document.getElementById("p_mobile").value = user.mobile;
    document.getElementById("p_campus").value = user.campus;
});

function logout() {
    localStorage.removeItem("user");
    window.location.href = "../Public/login.html";
}
