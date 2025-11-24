const linksForm = document.querySelectorAll(".abrir-form");
const formContainer = document.getElementById("formContainer");
const fechar = document.getElementById("fechar");
const enviar = document.getElementById("enviar");

// Abre o formulário ao clicar em qualquer link
linksForm.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault(); // evita que o link vá para outra página
        if (formContainer) formContainer.style.display = "block";
    });
});

// Fecha o formulário
if (fechar) fechar.onclick = () => { if (formContainer) formContainer.style.display = "none"; };

// Envia mensagem para o WhatsApp (validação de telefone)
if (enviar) enviar.onclick = () => {
    const nomeRaw = (document.getElementById("nome") && document.getElementById("nome").value) || "";
    const mensagemRaw = (document.getElementById("mensagem") && document.getElementById("mensagem").value) || "";
    const nome = nomeRaw.trim();
    const mensagem = mensagemRaw.trim();
    const numeroElem = document.getElementById("numero");
    let numero = (numeroElem && numeroElem.value) ? numeroElem.value.replace(/\D/g,'') : "";

    // Campos obrigatórios
    if (!nome || !numero || !mensagem) {
        alert("Preencha todos os campos!");
        return;
    }

    // Validação: aceitar apenas 10 ou 11 dígitos (DDD + número)
    if (!/^\d{10,11}$/.test(numero)) {
        alert("Número inválido. Digite o DDD + número (10 ou 11 dígitos). Ex: 19999999999");
        if (numeroElem) numeroElem.focus();
        return;
    }

    // Remove zeros à esquerda, se houver
    numero = numero.replace(/^0+/, '');

    // Redireciona para WhatsApp (código do país 55)
    const text = `Olá, meu nome é ${nome}. ${mensagem}`;
    const encodedText = encodeURIComponent(text);
    window.location.href = `https://wa.me/55${numero}?text=${encodedText}`;
};