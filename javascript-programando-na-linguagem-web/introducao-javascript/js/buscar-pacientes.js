var btBuscar = document.querySelector("#buscar-pacientes");
btBuscar.addEventListener('click', function () {

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");

    xhr.addEventListener("load", function () {
        var erroAjax = document.querySelector("#erro-ajax");

        if (xhr.status == 200) {
            erroAjax.classList.add("invisivel");

            var pacientes = JSON.parse(xhr.responseText);

            pacientes.forEach(paciente => {
                adicionaPacienteNaTabela(paciente);
            });
        } else {
            console.log(xhr.status);
            console.log(xhr.responseText);

            erroAjax.classList.remove("invisivel");
        }
    });

    xhr.send();
});