const email_input = document.getElementById("email_input");
const password_input = document.getElementById("password_input");

const login_form = document.getElementById("login_form");

const email_error_message = document.getElementById("email_error_message");
const password_error_message = document.getElementById(
  "password_error_message"
);

const login_error_message = document.querySelector(".signup_error_message");

const login_btn = document.getElementById("login_btn");

let isInputError = false;

//routes

const login_route = "/api/users/login-user";

email_input.addEventListener(
  "change",
  () => (login_error_message.textContent = "")
);
password_input.addEventListener(
  "change",
  () => (login_error_message.textContent = "")
);

login_form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!email_input.value) {
    email_error_message.textContent = "Email Is Required";
    isInputError = true;
  }

  if (!password_input.value) {
    password_error_message.textContent = "Password is Required";
    isInputError = true;
  }

  if (isInputError) {
    return;
  }

  const payload = {
    email: email_input.value,
    password: password_input.value,
  };

  login_btn.disabled = true;
  login_btn.textContent = "Loading.....";

  fetch(login_route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((data) => {
      login_btn.disabled = false;
      login_btn.textContent = "Next";
      return data.json();
    })
    .then((data) => {
        if (!data.success) {
            login_btn.disabled = false;
            login_btn.textContent = "Next";
            return (login_error_message.textContent = data.message);
        }
        localStorage.setItem("token", data.token)
          window.location.href = "/i/dashboard";
    })
    .catch((e) => {
      console.log(e);
      login_btn.disabled = false;
      login_btn.textContent = "Next";
      login_error_message.textContent = "Something went Wrong";
    });
});

