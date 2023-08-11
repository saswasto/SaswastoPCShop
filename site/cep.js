function buscaCep() {
    let cep = document.getElementById("strCep").value

    if (cep != ""){
        let url = "https://brasilapi.com.br/api/cep/v1/" + cep
        let req = new XMLHttpRequest()
        req.open("GET", url)
        req.send()

        req.onload = function () {
            if (req.status == 200) {
                let address = JSON.parse(req.response)
                document.getElementById("strTwo").value = address.street
                document.getElementById("strNeighborhood").value = address.neighborhood
                document.getElementById("strCity").value = address.city
                document.getElementById("strState").value = address.state
            }
            else if(req.status == 404) {
                alert("INVALID ZIP CODE")
            }
            else {
                alert("REQUEST ERROR")
            }
        }
    }
}

window.onload = function () {
    let strCep = document.getElementById("strCep")
    strCep.addEventListener("blur", buscaCep)
}