const app = document.querySelector("#app");
const css = document.querySelector("#css");

const spaResolver = async (location) => {
  const currentLocation =
    location === undefined || location === "/" || location === ""
      ? "signup"
      : location;
  const response = await fetch(`src/pages/${currentLocation}.html`);
  const html = await response.text();
  history.pushState(null, null, location);
  css.href = `src/styles/pages/${currentLocation}.css`;
  switch (location) {
    case "/":
      app.innerHTML = html;
      document.title = "ITRex - Lab. Sign Up Page";
      formAction();
      break;
    case "":
      app.innerHTML = html;
      document.title = "ITRex - Lab. Sign Up Page";
      formAction();
      break;
    case undefined:
      app.innerHTML = html;
      document.title = "ITRex - Lab. Sign Up Page";
      formAction();

      break;
    case "signin":
      app.innerHTML = html;
      document.title = "ITRex - Lab. Sign In Page";
      formAction();
      break;
    case "restore":
      app.innerHTML = html;
      document.title = "ITRex - Lab. Restore Password Page";
      formAction();
      break;
    case "account":
      app.innerHTML = html;
      document.title = "ITRex - Lab. Patient Page";
      patientList();
      break;
  }
};

const backwardHandler = () => {
  history.back();
};

window.addEventListener("popstate", (e) => {
  spaResolver(e.currentTarget.location.pathname.substring(1));
});

const formAction = () => {
  const form = document.querySelector("FORM");

  form.addEventListener("click", (event) => {
    showHidePassword(event);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    validateForm();
    console.log(form);
    const formData = document.querySelectorAll("INPUT");
    let validated = false;
    formData.forEach((input) => {
      if (input.classList.contains("error")) {
        return (validated = false);
      } else {
        return (validated = true);
      }
    });

    if (validated) {
      form.reset();
      spaResolver("account");
    } else {
    }
  });
};

const validateForm = () => {
  const formData = document.querySelectorAll("INPUT");

  formData.forEach((input) => {
    switch (input.id) {
      case "firstname":
        if (
          validator.isAlpha(input.value) &&
          validator.isLength(input.value, { min: 1, max: 30 })
        ) {
          removeErrorMessage(input);
        } else {
          addErrorMessage(
            input,
            "Usually first name contains 1 symbol minimum and only letters"
          );
        }
        break;
      case "lastname":
        if (
          validator.isAlpha(input.value) &&
          validator.isLength(input.value, { min: 1, max: 30 })
        ) {
          removeErrorMessage(input);
        } else {
          addErrorMessage(
            input,
            "Usually last name contains 1 symbol minimum and only letters"
          );
        }
        break;
      case "email":
        if (validator.isEmail(input.value)) {
          removeErrorMessage(input);
        } else {
          addErrorMessage(
            input,
            "Looks like you don't want provide your email, but it needed"
          );
        }
        break;
      case "password":
        if (validator.isLength(input.value, { min: 8, max: 30 })) {
          removeErrorMessage(input);
        } else {
          addErrorMessage(
            input,
            "Password should contain minimum 8 symbols and maximum 30"
          );
        }
        break;
      case "confirm":
        if (validator.isLength(input.value, { min: 8, max: 30 })) {
          removeErrorMessage(input);
        } else {
          addErrorMessage(
            input,
            "Password should contain minimum 8 symbols and maximum 30"
          );
        }
        break;
    }
  });
};

const showHidePassword = (event) => {
  if (event.target.className === "icon-eye") {
    event.target.classList.add("opened");
    event.target
      .closest("div")
      .querySelector("input")
      .setAttribute("type", "text");
  } else if (event.target.className === "icon-eye opened") {
    event.target.classList.remove("opened");
    event.target
      .closest("div")
      .querySelector("input")
      .setAttribute("type", "password");
  }
};

const dataHandler = () => {
  const data = document.querySelectorAll("INPUT").forEach((input) => {
    console.log("ID:", input.id, "VALUE:", input.value);
  });
};

const addErrorMessage = (input, message) => {
  const text = input.closest("div").querySelector("span");
  input.classList.add("error");
  text.setAttribute("style", "display:block");
  text.innerHTML = message;
};

const removeErrorMessage = (input) => {
  const text = input.closest("div").querySelector("span");
  input.classList.remove("error");
  text.setAttribute("style", "display");
  text.innerHTML = "";
};

const patientList = async () => {
  const dashboard = document.querySelector(".account__appointments");
  const response = await fetch("db.json");
  const appointments = await response.json();
  console.log(appointments);
  console.log(dashboard);

  if (appointments.length > 0) {
    appointments.map((appointments) => {
      dashboard.innerHTML += `
      <div class="account__patients__card">
            <div class="account__patients__card_header">
              <div class="account__patients__avatar">
                <img src="${appointments.patientAvatar}" alt="" />
              </div>
              <div class="account__patients__info">
                <h3>${appointments.patient}</h3>
                <p>Appointment is confirmed</p>
                <div class="appointment__confimation"></div>
              </div>
              <div class="account__patients__controls">
                <button type="button" class="account__sort"></button>
              </div>
            </div>
            <div class="account__patients__card_body">
              <div class="account__patiens__date">
                <h3>${appointments.appointmentDate} ${appointments.appointmentTime}</h3>
              </div>
              <div class="account__patiens__description">
                <p>
                ${appointments.appointmentDescription}
                </p>
              </div>
            </div>
          </div>
      `;
    });
  } else {
    dashboard.innerHTML = `
    <div class="account__empty">
      <p>
        You have no patients yet.<br />
        To create a patient profile, please contact your
        administrator.
      </p>
    </div>
    `;
  }
};
