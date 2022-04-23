console.log(getCookie("dark"))
if (getCookie("dark") === "true") {
    if (document.getElementById("toggle").classList.contains("left")) {
        toggle();
    }
}

function toggle() {
    let toggle = document.getElementById("toggle");
    if (toggle.classList.contains("left")) {
        toggle.classList.remove("left");
        toggle.classList.add("right");
        document.body.classList.add("dark");
        document.cookie = "dark=true";
    } else {
        toggle.classList.remove("right");
        toggle.classList.add("left");
        document.body.classList.remove("dark");
        document.cookie = "dark=false";
    }
}

function getCookie(name) {
    let value = document.cookie;
    let parts = value.split("; ");
    for (const part of parts) {
        let [cookieName, cookieValue] = part.split("=");
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}