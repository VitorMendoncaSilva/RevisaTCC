document.addEventListener("DOMContentLoaded", function () {
  const abas = document.querySelectorAll(".aba");
  const conteudo = document.querySelector(".conteudo-aba");
  const status = document.querySelector(".cabecalho p");

  // Recupera dados salvos da análise
  const resultado = JSON.parse(localStorage.getItem("resultadoAnalise"));
  if (!resultado) {
    conteudo.innerHTML = "<p>Erro: Nenhuma análise foi encontrada.</p>";
    return;
  }

  // Exibe nome do arquivo
  status.textContent = `Documento: ${resultado.arquivo} | Status: Analisado com sucesso`;

  const conteudos = [
    // Correção gramatical
    `
    <h3>Sugestões gramaticais</h3>
    ${
      resultado.correcaoGramatical.length > 0
        ? resultado.correcaoGramatical.map(item =>
            `<p><strong>Original:</strong> ${item.original}<br><strong>Sugestão:</strong> ${item.sugestao}</p>`
          ).join("")
        : "<p>Nenhuma sugestão encontrada.</p>"
    }
    `,
    // Normas ABNT
    `
    <h3>Verificação de Normas ABNT</h3>
    <ul>
      ${
        resultado.abnt.length > 0
          ? resultado.abnt.map(erro => `<li>${erro}</li>`).join("")
          : "<li>Sem erros encontrados.</li>"
      }
    </ul>
    `,
    // Plágio
    `
    <h3>Trechos com possível plágio</h3>
    ${
      resultado.plagio.length > 0
        ? resultado.plagio.map(p =>
            `<p>Trecho: "${p.trecho}"<br>Fonte: <a href="${p.fonte}" target="_blank">${p.fonte}</a></p>`
          ).join("")
        : "<p>Sem indícios de plágio detectados.</p>"
    }
    `,
    // Fontes Google Scholar
    `
    <h3>Fontes recomendadas (Google Scholar)</h3>
    <ul>
      ${
        resultado.fontes.length > 0
          ? resultado.fontes.map(f => `<li><a href="${f.link}" target="_blank">${f.termo}</a></li>`).join("")
          : "<li>Nenhuma fonte sugerida.</li>"
      }
    </ul>
    `
  ];

  // Controle de abas
  abas.forEach((aba, index) => {
    aba.addEventListener("click", () => {
      document.querySelector(".aba.ativa").classList.remove("ativa");
      aba.classList.add("ativa");
      conteudo.innerHTML = conteudos[index];
    });
  });

  // Mostra aba 1 (gramática) ao carregar
  conteudo.innerHTML = conteudos[0];
});
