// Variável global para armazenar os dados que serão enviados
let dadosRecebimento = {};

// Valores mínimos para validação
const valoresMinimos = {
    lencolCarrinho: 330,
    lencolPrateleira: 330,
    camisola: 150,
    cobertor: 80,
    fronha: 150
};

// Função para validar e retornar indicador
function validar(valor, minimo) {
    return valor >= minimo ? '🟢' : '🟡';
}

// Função para gerar a mensagem
document.getElementById("gerarBtn").addEventListener("click", function() {
    // Data
    let dataInput = document.getElementById("dataRecebimento").value;
    let dataStr;
    if(dataInput){
        const parts = dataInput.split("-");
        dataStr = `${parts[2]}/${parts[1]}/${parts[0]}`;
    } else {
        const data = new Date();
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth()+1).padStart(2, '0');
        const ano = data.getFullYear();
        dataStr = `${dia}/${mes}/${ano}`;
    }

    // Responsável
    const responsavel = document.getElementById("responsavel").value || "DEIVID";

    // Enxoval
    const lencolCarrinho = parseInt(document.getElementById("lencolCarrinho").value || 0);
    const lencolPrateleira = parseInt(document.getElementById("lencolPrateleira").value || 0);
    const camisolaQtd = parseInt(document.getElementById("camisolaQtd").value || 0);
    const cobertorQtd = parseInt(document.getElementById("cobertorQtd").value || 0);
    const fronhaQtd = parseInt(document.getElementById("fronhaQtd").value || 0);

    // Montar mensagem COM VALIDAÇÃO
    let msg = `👕 ROUPARIA ${responsavel.toUpperCase()} 👕\n📋 Passagem de plantão: ${dataStr}\n`;
    msg += `📌 Lençol no carrinho: ${lencolCarrinho} ${validar(lencolCarrinho, valoresMinimos.lencolCarrinho)}\n`;
    msg += `📌 Lençol na prateleira: ${lencolPrateleira} ${validar(lencolPrateleira, valoresMinimos.lencolPrateleira)}\n`;
    msg += `📌 Camisola: ${camisolaQtd} ${validar(camisolaQtd, valoresMinimos.camisola)}\n`;
    msg += `📌 Cobertor: ${cobertorQtd} ${validar(cobertorQtd, valoresMinimos.cobertor)}\n`;
    msg += `📌 Fronha: ${fronhaQtd} ${validar(fronhaQtd, valoresMinimos.fronha)}`;

    document.getElementById("resultado").value = msg;

    // Armazenar todos os dados em objeto global COM VALIDAÇÕES
    dadosRecebimento = {
        data: dataStr,
        responsavel,
        lencolCarrinho,
        lencolCarrinhoStatus: validar(lencolCarrinho, valoresMinimos.lencolCarrinho),
        lencolPrateleira,
        lencolPrateleiraStatus: validar(lencolPrateleira, valoresMinimos.lencolPrateleira),
        camisolaQtd,
        camisolaQtdStatus: validar(camisolaQtd, valoresMinimos.camisola),
        cobertorQtd,
        cobertorQtdStatus: validar(cobertorQtd, valoresMinimos.cobertor),
        fronhaQtd,
        fronhaQtdStatus: validar(fronhaQtd, valoresMinimos.fronha)
    };
});

// Botão copiar
document.getElementById("copiarBtn").addEventListener("click", function() {
    const textarea = document.getElementById("resultado");
    if (textarea.value.trim() === "") {
        alert("Não há mensagem para copiar!");
        return;
    }

    // Copiar mensagem
    navigator.clipboard.writeText(textarea.value)
        .then(() => {
            alert("Mensagem copiada com sucesso! ✅");
            // Enviar dados para envio.js
            if (typeof enviarParaSheets === "function") {
                enviarParaSheets(dadosRecebimento);
            }
        })
        .catch(err => {
            console.error("Erro ao copiar: ", err);
            alert("Não foi possível copiar a mensagem.");
        });
});
