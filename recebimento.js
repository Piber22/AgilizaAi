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
    const lencolQtd = document.getElementById("lencolQtd").value || 0;
    const lencolPeso = parseFloat(document.getElementById("lencolPeso").value || 0).toFixed(2);

    const camisolaQtd = document.getElementById("camisolaQtd").value || 0;
    const camisolaPeso = parseFloat(document.getElementById("camisolaPeso").value || 0).toFixed(2);

    const cobertorQtd = document.getElementById("cobertorQtd").value || 0;
    const cobertorPeso = parseFloat(document.getElementById("cobertorPeso").value || 0).toFixed(2);

    // Roupas
    const jaleco = {
        P: document.getElementById("jalecoP").value || 0,
        M: document.getElementById("jalecoM").value || 0,
        G: document.getElementById("jalecoG").value || 0,
        GG: document.getElementById("jalecoGG").value || 0,
        EG: document.getElementById("jalecoEG").value || 0,
        Peso: parseFloat(document.getElementById("jalecoPeso").value || 0).toFixed(2)
    };

    const calca = {
        P: document.getElementById("calcaP").value || 0,
        M: document.getElementById("calcaM").value || 0,
        G: document.getElementById("calcaG").value || 0,
        GG: document.getElementById("calcaGG").value || 0,
        EG: document.getElementById("calcaEG").value || 0,
        Peso: parseFloat(document.getElementById("calcaPeso").value || 0).toFixed(2)
    };

    // Montar mensagem
    let msg = `👕ROUPARIA ${responsavel.toUpperCase()}👕\n📋 Recebendo o enxoval do dia ${dataStr}\n`;
    msg += `📌 Lençol ${lencolQtd} ( peso ${lencolPeso} )\n`;
    msg += `📌 Camisola ${camisolaQtd} ( peso ${camisolaPeso} )\n`;
    msg += `📌 Cobertor ${cobertorQtd} ( peso ${cobertorPeso} )\n\n`;
    msg += `📋 ROUPA AZUL\n🥼JALECO\n`;
    msg += `🥼 P ${jaleco.P}\n🥼 M ${jaleco.M}\n🥼 G ${jaleco.G}\n🥼 GG ${jaleco.GG}\n🥼 EG ${jaleco.EG}\n🧮 Peso: ${jaleco.Peso}\n\n`;
    msg += `👖CALÇA\n`;
    msg += `👖 P ${calca.P}\n👖 M ${calca.M}\n👖 G ${calca.G}\n👖 GG ${calca.GG}\n👖 EG ${calca.EG}\n🧮 Peso: ${calca.Peso}`;

    document.getElementById("resultado").value = msg;
});

// Botão copiar
document.getElementById("copiarBtn").addEventListener("click", function() {
    const textarea = document.getElementById("resultado");
    if (textarea.value.trim() === "") {
        alert("Não há mensagem para copiar!");
        return;
    }
    navigator.clipboard.writeText(textarea.value)
        .then(() => {
            alert("Mensagem copiada com sucesso! ✅");
        })
        .catch(err => {
            console.error("Erro ao copiar: ", err);
            alert("Não foi possível copiar a mensagem.");
        });
});
