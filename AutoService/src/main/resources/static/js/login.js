const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        togglePassword.classList.remove("ri-eye-off-fill");
        togglePassword.classList.add("ri-eye-fill");
    } else {
        password.type = "password";
        togglePassword.classList.remove("ri-eye-fill");
        togglePassword.classList.add("ri-eye-off-fill");
    }
});