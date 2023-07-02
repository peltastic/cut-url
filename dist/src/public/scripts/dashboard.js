if (!localStorage.getItem) {
  window.location = "/login";
}
const generate_input = document.getElementById("generate-input");

const generate_btn = document.getElementById("generate-btn");

const error_message = document.querySelector(".error_message");

const short_link = document.getElementById("short-link");

const form = document.querySelector("form");

const table = document.querySelector("table");

const shorten_url_route = "/api/urls/shorten-url";

const get_user_urls_route = "/api/urls/user/urls";

fetch(get_user_urls_route, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((data) => data.json())
  .then((data) => {
    for (const el of data) {
      const row = document.createElement("tr");
      const column1 = document.createElement("td");
      const column2 = document.createElement("td");
      const column3 = document.createElement("td");
      column1.textContent = el.shortened_url;
      column2.textContent = el.clicks;
      column3.textContent = el.date;
      row.appendChild(column1);
      row.appendChild(column2);
      row.appendChild(column3);
      table.appendChild(row);
    }
    console.log(data);
  });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!generate_input.value) {
    return;
  }
  const payload = {
    url: generate_input.value,
  };
  generate_btn.disabled = true;
  generate_btn.textContent = "Generating....";
  fetch(shorten_url_route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(payload),
  })
    .then((data) => {
      generate_btn.disabled = false;
      generate_btn.textContent = "Generate";
      return data.json();
    })
    .then((data) => {
      if (!data.success) {
        generate_btn.disabled = false;
        generate_btn.textContent = "Generate";
        error_message.textContent = data.message;
      }
      console.log(data);
      short_link.className = "short-link";
      short_link.textContent = data.url;
    })
    .catch((e) => {
      console.log(e);
      generate_btn.disabled = false;
      generate_btn.textContent = "Generate";

      error_message.textContent = "Something went Wrong";
    });
});
