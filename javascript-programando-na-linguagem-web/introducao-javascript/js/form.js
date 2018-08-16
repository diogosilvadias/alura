var btAdicionar = document.querySelector("#adicionar-paciente");
btAdicionar.addEventListener("click", function (event) {
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");
    var paciente = obtemPacienteDoFormulario(form);

    var erros = validaPaciente(paciente);
    if (erros.length > 0) {
        exibeMensagensDeErro(erros);
        return;
    }

    adicionaPacienteNaTabela(paciente);

    form.reset();
    limparMensagensDeErro();
});

function obtemPacienteDoFormulario(form) {
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    };

    return paciente;
}

function montaTr(paciente) {
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente) {
    var erros = [];

    if (paciente.nome.length == 0) {
        erros.push("O nome não pode ser em branco.");
    }

    if (paciente.peso.length == 0) {
        erros.push("O peso não pode ser em branco.");
    }

    if (!validaPeso(paciente.peso)) {
        erros.push("O peso é inválido.");
    }

    if (paciente.altura.length == 0) {
        erros.push("A altura não pode ser em branco.");
    }

    if (!validaAltura(paciente.altura)) {
        erros.push("A altura é inválida.");
    }

    if (paciente.gordura.length == 0) {
        erros.push("O percentual de gordura não pode ser em branco.");
    }

    return erros;
}

function adicionaPacienteNaTabela(paciente) {
    var table = document.querySelector("#tabela-pacientes");
    table.appendChild(montaTr(paciente));
}

function exibeMensagensDeErro(erros) {
    limparMensagensDeErro();

    var ul = document.querySelector("#mensagens-erro");

    erros.forEach(erro => {
        var li = document.createElement("li");
        li.textContent = erro;

        ul.appendChild(li);
    });
}

function limparMensagensDeErro() {
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";
}