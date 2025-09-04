document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const arquivo = document.getElementById("arquivo").files[0];

    if (!arquivo) {
      alert("Por favor, selecione um arquivo para análise.");
      return;
    }

    const formData = new FormData();
    formData.append("arquivo", arquivo);

    try {
      const resposta = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData
      });

      if (!resposta.ok) {
        throw new Error("Erro ao processar o arquivo.");
      }

      const resultado = await resposta.json();

      // Salva resultado no localStorage para exibir na próxima página
      localStorage.setItem("resultadoAnalise", JSON.stringify(resultado));

      // Redireciona para página de resultado
      window.location.href = "resultado.html";
    } catch (erro) {
      alert("Erro ao enviar arquivo para análise: " + erro.message);
    }
  });
});
