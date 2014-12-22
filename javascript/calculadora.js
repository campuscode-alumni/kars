function $2(id) {
    return document.getElementById(id);
}

function obterPreco() {
    var precoContent = $2("preco_carro").textContent;
    return precoContent;
}

function preco2Number() {
    var preco = obterPreco().replace(/[.]/g, "").replace(",", ".");
    return parseFloat(preco);
}

function exibeFinanciamento() {
    $2("financiamento").classList.remove("invisible");
}

/* Está aqui somente para estudo, vamos usar a versão normal logo abaixo
 * function formataPrecoReduzida(precoFinal) {
    return precoFinal
             .toFixed(2)
             .replace(".", ",")
             .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}*/

function formataPreco(precoFinal) {
    var precoArredondado = Math.round(precoFinal).toString(),
        tamanho          = precoArredondado.length,
        precoComVirgula  = "",
        n                = -3;

    if (tamanho <= n * -1) {
        return parseFloat(precoFinal.toString()).toFixed(2).replace(".", ",");
    }

    while ((n + 3) > (tamanho * -1)) {
        if (tamanho >= n * -1) {
            precoComVirgula = precoArredondado.substr(n).substr(0, 3) + "." + precoComVirgula;
        } else {
            precoComVirgula = precoArredondado.substr(0, (tamanho + (n + 3))) + "." + precoComVirgula;
        }
        n = n - 3;
    }

    precoComVirgula = precoComVirgula.substr(0, precoComVirgula.length - 1);
    precoComVirgula = precoComVirgula + "," + parseFloat(precoFinal).toFixed(2).substr(-2);

    return precoComVirgula;
}

function imprimeResultado(precoCarro, parcelaComJuros, precoFinal) {
    exibeFinanciamento();

    var conteudoHTML     = "<p>Valor financiado: R$ " + precoCarro + "</p>";
    conteudoHTML        += "<p>Valor da parcela: R$ " + formataPreco(parcelaComJuros) + "</p>";
    conteudoHTML        += "<p>Preço: R$ " + formataPreco(precoFinal) + "</p>";

    $2("detalhes_do_financiamento").innerHTML =    conteudoHTML;
}

function financiamento(parcelas) {
    var preco           = preco2Number(),
        parcela         = preco / parcelas,
        parcelaComJuros = parcela * 1.001,
        precoFinal      = parcelaComJuros * parcelas;

    imprimeResultado(obterPreco(), parcelaComJuros, precoFinal);
}

