import React from "react";
import styles from "./input.module.scss";
import Swal from "sweetalert2";
import { VscClose } from "react-icons/vsc";
const Input = () => {
  const shortenUrl = () => {
    // Validar se o link existe
    const url = (document.getElementById("input-url") as HTMLInputElement)
      .value;

    if (!url) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "É Preciso Inserir Uma Url Para Encurtar!",
        width: "40rem",
        padding: "50px",
        heightAuto: false,
      });
      return;
    }
    //api key: c645e963087c4feeb056bc4dffd0c489

    //Encurtar o link

    const headers = {
      "Content-Type": "application/json",
      apiKey: "c645e963087c4feeb056bc4dffd0c489",
    };

    //dados da requisição

    const linkRequest = {
      destination: url,
      domain: { fullName: "rebrand.ly" },
    };

    fetch("https://api.rebrandly.com/v1/links", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(linkRequest),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const inputURL = document.getElementById("input-url");
        (inputURL as HTMLInputElement).value = json.shortUrl;
      });
  };

  const copyUrl = () => {
    const inputURL = document.getElementById("input-url");
    const url = (document.getElementById("input-url") as HTMLInputElement)
      .value;

    (inputURL as HTMLInputElement).select();
    (inputURL as HTMLInputElement).setSelectionRange(0, 99999);

    navigator.clipboard.writeText((inputURL as HTMLInputElement).value);

    if (!url) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "É Preciso Inserir Uma Url Para Copiar!",
        width: "40rem",
        padding: "50px",
        heightAuto: false,
      });
      return;
    }

    Swal.fire({
      title: "URL Copiada Com Sucesso: ",
      text: `${(inputURL as HTMLInputElement).value}`,
      width: "40rem",
      padding: "100px",
      heightAuto: false,
    });
  };

  // Evitar a função do enter no form
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1>Encurtador de Links!</h1>
        <div className={styles.boxInput}>
          <form autoComplete="off">
            <input
              className={styles.inputUrl}
              type="text"
              id="input-url"
              placeholder="Coloque aqui a URL"
            />
            <button className={styles.btnClean} type="reset" value="Reset">
              <VscClose size={30} />
            </button>
          </form>
          <div className={styles.btns}>
            <button className={styles.btn} onClick={shortenUrl}>
              Encurtar
            </button>
            <button className={styles.btn} onClick={copyUrl}>
              Copiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
