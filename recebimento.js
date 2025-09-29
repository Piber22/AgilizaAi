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
    const lencolQtd = parseInt(document.getElementById("lencolQtd").value || 0);
    const lencolPeso = parseFloat(document.getElementById("lencolPeso").value || 0).toFixed(2);

    const camisolaQtd = parseInt(document.getElementById("camisolaQtd").value || 0);
    const camisolaPeso = parseFloat(document.getElementById("camisolaPeso").value || 0).toFixed(2);

    const cobertorQtd = parseInt(document.getElementById("cobertorQtd").value || 0);
    const cobertorPeso = parseFloat(document.getElementById("cobertorPeso").value || 0).toFixed(2);

    const fronhaQtd = parseInt(document.getElementById("fronhaQtd").value || 0);
    const fronhaPeso = parseFloat(document.getElementById("fronhaPeso").value || 0).toFixed(2);

    // Scrubs
    const jaleco = {
        P: parseInt(document.getElementById("jalecoP").value || 0),
        M: parseInt(document.getElementById("jalecoM").value || 0),
        G: parseInt(document.getElementById("jalecoG").value || 0),
        GG: parseInt(document.getElementById("jalecoGG").value || 0),
        EG: parseInt(document.getElementById("jalecoEG").value || 0),
        Peso: parseFloat(document.getElementById("jalecoPeso").value || 0).toFixed(2)
    };

    const calca = {
        P: parseInt(document.getElementById("calcaP").value || 0),
        M: parseInt(document.getElementById("calcaM").value || 0),
        G: parseInt(document.getElementById("calcaG").value || 0),
        GG: parseInt(document.getElementById("calcaGG").value || 0),
        EG: parseInt(document.getElementById("calcaEG").value || 0),
        Peso: parseFloat(document.getElementById("calcaPeso").value || 0).toFixed(2)
    };

    // Calcular peso total
    const pesoTotal = (
        parseFloat(lencolPeso) +
        parseFloat(camisolaPeso) +
        parseFloat(cobertorPeso) +
        parseFloat(fronhaPeso) +
        parseFloat(jaleco.Peso) +
        parseFloat(calca.Peso)
    ).toFixed(2);

    // Montar mensagem
    let msg = `👕ROUPARIA ${responsavel.toUpperCase()}👕\n📋 Recebendo o enxoval do dia ${dataStr}\n`;
    msg += `📌 Lençol ${lencolQtd} ( peso ${lencolPeso} )\n`;
    msg += `📌 Camisola ${camisolaQtd} ( peso ${camisolaPeso} )\n`;
    msg += `📌 Cobertor ${cobertorQtd} ( peso ${cobertorPeso} )\n`;
    msg += `📌 Fronha ${fronhaQtd} ( peso ${fronhaPeso} )\n\n`;
    msg += `📋 ROUPA AZUL\n🥼JALECO\n`;
    msg += `🥼 P ${jaleco.P}\n🥼 M ${jaleco.M}\n🥼 G ${jaleco.G}\n🥼 GG ${jaleco.GG}\n🥼 EG ${jaleco.EG}\n🧮 Peso: ${jaleco.Peso}\n\n`;
    msg += `👖CALÇA\n`;
    msg += `👖 P ${calca.P}\n👖 M ${calca.M}\n👖 G ${calca.G}\n👖 GG ${calca.GG}\n👖 EG ${calca.EG}\n🧮 Peso: ${calca.Peso}\n\n`;
    msg += `💯 PESO TOTAL: ${pesoTotal}`;

    document.getElementById("resultado").value = msg;
});

// Botão copiar + envio para Sheets
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
            // Após copiar, enviar para Google Sheets
            enviarParaSheets();
        })
        .catch(err => {
            console.error("Erro ao copiar: ", err);
            alert("Não foi possível copiar a mensagem.");
        });
});

// Função para enviar dados para Google Sheets via Web App
function enviarParaSheets() {
    // Pegar valores
    const dataInput = document.getElementById("dataRecebimento").value || "";
    const responsavel = document.getElementById("responsavel").value || "DEIVID";

    const lencolQtd = document.getElementById("lencolQtd").value || 0;
    const lencolPeso = document.getElementById("lencolPeso").value || 0;

    const camisolaQtd = document.getElementById("camisolaQtd").value || 0;
    const camisolaPeso = document.getElementById("camisolaPeso").value || 0;

    const cobertorQtd = document.getElementById("cobertorQtd").value || 0;
    const cobertorPeso = document.getElementById("cobertorPeso").value || 0;

    const fronhaQtd = document.getElementById("fronhaQtd").value || 0;
    const fronhaPeso = document.getElementById("fronhaPeso").value || 0;

    const jalecoP = document.getElementById("jalecoP").value || 0;
    const jalecoM = document.getElementById("jalecoM").value || 0;
    const jalecoG = document.getElementById("jalecoG").value || 0;
    const jalecoGG = document.getElementById("jalecoGG").value || 0;
    const jalecoEG = document.getElementById("jalecoEG").value || 0;
    const jalecoPeso = document.getElementById("jalecoPeso").value || 0;

    const calcaP = document.getElementById("calcaP").value || 0;
    const calcaM = document.getElementById("calcaM").value || 0;
    const calcaG = document.getElementById("calcaG").value || 0;
    const calcaGG = document.getElementById("calcaGG").value || 0;
    const calcaEG = document.getElementById("calcaEG").value || 0;
    const calcaPeso = document.getElementById("calcaPeso").value || 0;

    const pesoTotal = (
        parseFloat(lencolPeso) +
        parseFloat(camisolaPeso) +
        parseFloat(cobertorPeso) +
        parseFloat(fronhaPeso) +
        parseFloat(jalecoPeso) +
        parseFloat(calcaPeso)
    ).toFixed(2);

    // Montar objeto para envio
    const dados = {
        data: dataInput,
        responsavel: responsavel,
        lencolQtd, lencolPeso,
        camisolaQtd, camisolaPeso,
        cobertorQtd, cobertorPeso,
        fronhaQtd, fronhaPeso,
        jalecoP, jalecoM, jalecoG, jalecoGG, jalecoEG, jalecoPeso,
        calcaP, calcaM, calcaG, calcaGG, calcaEG, calcaPeso,
        pesoTotal
    };

    // Substitua a URL abaixo pela do seu Web App do Google Apps Script
    const url = "https://script.google.com/macros/s/AKfycbxSg2thZCDZRI9spjwtENg4pT0x43dUmn-loIAklaRxuAh9-PCD87TDZYuhAfc7INp4/exec";

    fetch(url, {
        method: "POST",
        body: JSON.stringify(dados),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(res => {
        console.log("Dados enviados com sucesso:", res);
    })
    .catch(err => {
        console.error("Erro ao enviar para Sheets:", err);
    });
}
