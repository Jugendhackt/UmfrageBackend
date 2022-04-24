function logout() {
    document.cookie = "loggedIn=false";
    document.location.href = "/";
}