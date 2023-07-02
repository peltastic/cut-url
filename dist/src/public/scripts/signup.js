const full_name_input = document.getElementById("full_name_input");
const email_input = document.getElementById("email_input");
const password_input = document.getElementById("password_input");

const signup_form = document.getElementById("signup_form");

const full_name_error_message = document.getElementById(
  "full_name_error_message"
);
const email_error_message = document.getElementById("email_error_message");
const password_error_message = document.getElementById(
  "password_error_message"
);

const signup_error_message = document.querySelector(".signup_error_message");

const signup_btn = document.getElementById("signup_btn");

let isInputError = false;

//routes

const signup_route = "/api/users/create-user";

full_name_input.addEventListener("change", () => signup_error_message.textContent = "")
email_input.addEventListener("change", () => signup_error_message.textContent = "")
password_input.addEventListener("change", () => signup_error_message.textContent = "")



signup_form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!full_name_input.value) {
    full_name_error_message.textContent = "Full Name Is Required";
    isInputError = true;
  }

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
    full_name: full_name_input.value,
  };
  signup_btn.disabled = true;
  signup_btn.textContent = "Loading.....";

  fetch(signup_route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((data) => {
      signup_btn.disabled = false;
      signup_btn.textContent = "Next";
      return data.json();
    })
    .then((data) => {
      if (!data.success) {
        signup_btn.disabled = false;
        signup_btn.textContent = "Next";
        return (signup_error_message.textContent = data.message);
      }
      window.location.href = "/i/login";
    })
    .catch((e) => {
      console.log(e);
      signup_btn.disabled = false;
      signup_btn.textContent = "Next";
      signup_error_message.textContent = "Something went Wrong";
    });
});
