function createForm(data) {
  const formModal = document.querySelector(".form-modal");
  //const formModal = document.querySelector(".form-modal");
  const contactBtn = document.querySelector("#contact");
formModal.setAttribute("aria-labelledby",`Contactez ${data.name}`)
  formModal.innerHTML = ` <p >
    <form class ='form' method="post" action="traitement.php">
    <div class="form-modal__title">
    <h2>Contactez-moi</h2>
    <span tabindex="6" role="button" aria-label="Fermer formulaire de contact" class ="close-contactform"><i title="Fermer formulaire de contact"class="fas fa-times form-modal__close" id = 'close'></i></span>
    </div>
    <h3>${data.name}</h3>
    <div
    class="prenom-formData">
    <label for="prenom">Prénom</label>
    <input tabindex="1" type="text" name= "prenom"  id = "prenom"/>
    <span class="error"></span>
    </div>
    <div class="nom-formData">
    <label for="nom">Nom</label>
    <input tabindex="2" type="text" name= "nom" id = "nom"/>
    <span class="error"></span>
    </div>
    <div class="email-formData">
    <label for="email">Email</label>
    <input tabindex="3" type="email" name= "email" id = "email"/>
    <span class="error"></span>
    </div>
    <label for="message">Votre message</label>
    <textarea tabindex="4" name = "message" id = "message"></textarea>
    </p>
    <div class="form-modal-btn">
    <button tabindex="5" type="button" class="form__btn contact__btn" id= "btn-modal">Envoyer</button>
    </div>
    </form>
    `;
  const inputs = document.querySelectorAll(
    'input[type ="text"], input[type="email"]'
  );
  const prenom = document.getElementById("prenom");
  const btnModal = document.getElementById("btn-modal");
  const nom = document.getElementById("nom");
  const email = document.getElementById("email");
  const close = document.getElementById("close");

  contactBtn.addEventListener("click", (e) => {
    formModal.style.visibility = "visible";
    prenom.focus();
  });

  close.addEventListener("click", (e) => {
    cancelModal();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key == "Escape") cancelModal();
  });

  function cancelModal() {
    //formModal.style.visibility = "hidden";
    formModal.style.display = "none";
  }

 /*
 Affichage message d'erreur
  */
  const errorDisplay = (tag, message, valid) => {
    // message de chaque champs (se trouve dans le span )

    const spanMsg = document.querySelector("." + tag + "-formData > span");

    // pointe le nom de champs
    const global = document.querySelector("." + tag + "-formData");

    if (!valid) {
      global.classList.add("error");
      spanMsg.textContent = message;
    } else {
      global.classList.remove("error");
      spanMsg.textContent = message;
    }
  };
  //.................................................................................................
  const nameChecker = (type, value, element) => {
    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
      errorDisplay(
        type,
        "Le " + type + " doit contenir entre 3 et 20 caracteres"
      );

      element.style.border = "3px solid maroon";
    } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
      errorDisplay(
        type,
        "Le " + type + "  ne doit pas contenir de caracteres speciaux"
      );

      element.style.border = "3px solid maroon";
    } else {
      errorDisplay(type, "", true);
      errorDisplay.textContent = "";
      element.style.border = "3px solid green";
    }
  };
  //....................................................................................................
  const emailChecker = (value, element) => {
    if (
      !value.match(
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      )
    ) {
      errorDisplay("email", "Adresse mail non valide");
      element.style.border = "3px solid maroon";
    } else {
      errorDisplay("email", "", true);
      element.style.border = "3px solid green";
    }
  };

  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      switch (
        e.target.id //test la valeur de champs
      ) {
        case "prenom": //si tu es dans le prenom
          //  console.log(e);
          nameChecker("prenom", e.target.value, prenom); //on  analise cette fonction : (nameChecker (avec les arguments comme ceux ci pour les parametres :type, value, element))
          break;

        case "nom":
          nameChecker("nom", e.target.value, nom); // nom ici -  le nom de la variable
          break;

        case "email":
          emailChecker(e.target.value, email);
          break;

        default:
          null;
      }
    });
  });

  btnModal.addEventListener("click", (e) => {
    if (prenom.value == "") {
      errorDisplay("prenom", "Veuillez remplir ce champs");
    }

    if (nom.value == "") {
      errorDisplay("nom", "Veuillez remplir ce champs");
    }

    if (email.value == "") {
      //  e.preventDefault();
      errorDisplay("email", "Veuillez remplir ce champs");
    } else {
      const userData = {
        prenom: prenom.value,
        nom: nom.value,
        email: email.value,
      };
      console.log(userData);
    }
  });
}
export { createForm };
