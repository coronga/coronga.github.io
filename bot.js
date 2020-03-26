const PCTG_CERTAIN = 70;
const PCTG_POTENTIAL = 20;


function handleUserInput() {
    var predictions = document.getElementById("predictions");
    var responseArea = document.getElementById("results");
    responseArea.innerHTML = "";
    predictions.innerHTML = "";
    var txt = document.getElementById("mainInput").value;
    var parsedInput = txt.toLowerCase()
        .replace("í", "i")
        .replace("á", "a")
        .replace(/(~|`|’|‘|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|"|´|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g, " ")
        .replace(/\s+/g, ' ') // Strips extra spaces
        .trim()
        .split(" ")
        .filter(term => !wordsToIgnore.includes(term));
    primaryParser(parsedInput);
}

function handleButton() {
    handleUserInput();
    var predictions = document.getElementById("predictions");
    var responseArea = document.getElementById("results");
    var reply = "<p class='reply-txt'>Me desculpe, não consegui encontrar uma resposta para você. Talvez alguma das perguntas abaixo te ajude:</p>"
    var results = [0, 2, 3];
    if (responseArea.innerHTML == "" && predictions.innerHTML == "") {
        for (var i = 0; i < results.length; i++) {
            reply += '<p class="prediction-txt"><a class="predictions" onclick="selectedQuestion(' + results[i] + ')">' + questions[results[i]][2] + '</a></p>';
            if (i == results.length - 1) {
                predictions.innerHTML = reply;
            }
        }

    }
}

function printOptions(res) {
    var predictions = document.getElementById("predictions");
    uniqueResults = [...new Set(res)];
    results = Array.from(uniqueResults);
    if (results.length == 0) {
        predictions.innerHTML = "";
    }
    var html = "";
    for (var i = 0; i < results.length; i++) {
        html += '<p class="prediction-txt"><a class="predictions" onclick="selectedQuestion(' + results[i] + ')">' + questions[results[i]][2] + '</a></p>'
        if (i == results.length - 1) {
            predictions.innerHTML = html;
        }
    }
}

function selectedQuestion(n) {
    var responseArea = document.getElementById("results");
    var predictions = document.getElementById("predictions");
    predictions.innerHTML = "";
    responseArea.innerHTML = '<p class="reply-title">' + questions[n][2] + '</p><p class="reply-txt">' + questions[n][3] + '</p><p class="reply-txt">Mais informações: <a target="_blank" href="' + questions[n][5] + '">' + questions[n][4] + '</a></p>';
}

function primaryParser(parsedInput) {
    var resultIndexes = [];
    var secondaryMatches = {};
    for (var i = 0; i < questions.length; i++) {
        console.log(questions[i]);
        if (parsedInput.indexOf(questions[i][0]) != -1) {
            resultIndexes.push(d[i]);
            continue;
        }
        var notInOverlap = parsedInput.filter(term => !questions[i][1].includes(term));
        var coverage = ((parsedInput.length - notInOverlap.length) * 100 / parsedInput.length);
        if (coverage > PCTG_CERTAIN) {
            resultIndexes.push(d[i]);
        }
        else if (coverage > PCTG_POTENTIAL) {
            secondaryMatches[coverage] = i;
        }
        if (i == questions.length - 1 && resultIndexes.length > 0) {
            printOptions(resultIndexes);
        }
        else if (i == questions.length - 1 && resultIndexes.length == 0) {
            secondaryParser(parsedInput, secondaryMatches);
        }
    }
}

function secondaryParser(parsedInput, secondaryMatches) {
    if (secondaryMatches.length == 0) {
        tertiaryParser(parsedInput);
    }
    else {
        var orderedByCoverage = [];
        Object.keys(secondaryMatches).sort().forEach(function (key) {
            orderedByCoverage.push(secondaryMatches[key]);
        });
        printOptions(orderedByCoverage);
    }
}

function tertiaryParser(parsedInput) {
    var results = [];
    for (var i = 0; i < questions.length; i++) {
        var chars = parsedInput[j].split('');
        for (var j = 0; j < parsedInput.length; j++) {
            var notInOverlap = questions[1].split('').filter(char => chars.indexOf(char) == -1);
            var coverage = ((chars.length - notInOverlap.length) * 100 / chars.length);
            if (coverage > 85) {
                results.push(d[i]);
                printOptions(results);
                break;
            }
            if (i == questions.length - 1) {
                printOptions(results);
            }
        }
    }
}


var d = {
    0: 0,
    1: 0,
    2: 2,
    3: 3,
    4: 2,
    5: 5,
    6: 6,
    7: 6,
    8: 6,
    9: 9,
    10: 10,
    11: 10,
    12: 10,
    13: 13,
    14: 13,
    15: 13, 
    16: 16,
    17: 17,
    18: 18,
    19: 18,
    20: 20,
    21: 21, 
    22: 22,
    23: 23,
    24: 24,
    25: 25, 
    26: 26,
    27: 27,
    28: 28,
    29: 29,
    30: 30,
    31: 31,
    32: 32,
    33: 33,
    34: 34,
    35: 35,
    36: 36,
    37: 37,
    38: 38
}

var questions = [
    // 0
    [
        "sintomas",
        ["sintomas", "virus", "sintmas", "sintoms", "quais", "qual", "tosse", "tossindo", "estou", "febre", "dificuldade", "repirar", "repiratório", "garganta", "dor", "espirro"],
        "Quais são os sintomas do vírus?",
        "Os sintomas principais são febre, falta de ar e tosse seca. Em casos mais graves, a infecção pode causar pneumonia, síndrome respiratória, insuficiência renal e até a morte.",
        "Organização Mundial da Saúde (OMS)",
        "https://news.un.org/pt/story/2020/01/1702002"
    ],
    // 1
    [
        "sintoma",
        ["sintomas", "virus", "sintmas", "sintoms", "quais", "qual", "tosse", "tossindo", "estou", "febre", "dificuldade", "repirar", "repiratório", "garganta", "dor", "espirro"],
        "Quais são os sintomas do vírus?",
        "Os sintomas principais são febre, falta de ar e tosse seca. Em casos mais graves, a infecção pode causar pneumonia, síndrome respiratória, insuficiência renal e até a morte.",
        "Organização Mundial da Saúde (OMS)",
        "https://news.un.org/pt/story/2020/01/1702002"
    ],
    // 2
    [
        "cura",
        ["cura", "tratamento", "existe", "tratar", "curar"],
        "Existe um tratamento para o COVID-19?",
        "Não há um tratamento específico. No entanto, muitos dos sintomas podem ser tratados e, portanto, o tratamento depende da condição do paciente. Além disso, os cuidados de apoio às pessoas infectadas ajudam muito na recuperação.",
        "Organização Mundial da Saúde (OMS)",
        "https://news.un.org/pt/story/2020/01/1702002"
    ],
    // 3
    [
        "vacina",
        ["vacina", "prevenção", "existe", "previnir", "imunidade"],
        "Existe uma vacina para o novo coronavírus?",
        "Ainda não. Quando uma doença surge, não existe vacina até que uma possa ser desenvolvida após testes em laboratório. Segundo a OMS, este processo pode levar alguns anos.",
        "Organização Mundial da Saúde (OMS)",
        "https://news.un.org/pt/story/2020/01/1702002"
    ],
    // 4
    [
        "tratamento",
        ["cura", "tratamento", "existe", "tratar", "curar"],
        "Existe um tratamento para o COVID-19?",
        "Não há um tratamento específico. No entanto, muitos dos sintomas podem ser tratados e, portanto, o tratamento depende da condição do paciente. Além disso, os cuidados de apoio às pessoas infectadas ajudam muito na recuperação.",
        "Organização Mundial da Saúde (OMS)",
        "https://news.un.org/pt/story/2020/01/1702002"
    ],
    // 5
    [
        "coronavirus",
        ["virus", "coronavirus", "tipo", "sars"],
        "O que é um coronavírus?",
        "Os coronavírus são uma grande família de vírus que causam doenças que variam do resfriado comum a doenças mais graves, como a Síndrome Respiratória do Oriente Médio, Mers, e a Síndrome Respiratória Aguda Grave, Sars.",
        "Organização Mundial da Saúde (OMS)",
        "https://news.un.org/pt/story/2020/01/1702002"
    ],
    // 6
    [
        "covid19",
        ["virus", "novo", "covid19", "wuhan", "china", "2019", "coronavirus"],
        "O que é o novo coronavírus?",
        "O COVID-19 é um novo tipo de coronavírus que não tinha sido identificado em humanos antes.",
        "Organização Mundial da Saúde (OMS)",
        "https://news.un.org/pt/story/2020/01/1702002"
    ],
    // 7
    [
        "coronavirus",
        ["virus", "novo", "covid19", "wuhan", "china", "2019", "coronavirus"],
        "O que é o novo coronavírus?",
        "O COVID-19 é um novo tipo de coronavírus que não tinha sido identificado em humanos antes.",
        "Organização Mundial da Saúde (OMS)",
        "https://news.un.org/pt/story/2020/01/1702002"
    ],
    // 8
    [
        "novo",
        ["virus", "novo", "covid19", "wuhan", "china", "2019", "coronavirus"],
        "O que é o novo coronavírus?",
        "O COVID-19 é um novo tipo de coronavírus que não tinha sido identificado em humanos antes.",
        "Organização Mundial da Saúde (OMS)",
        "https://news.un.org/pt/story/2020/01/1702002"
    ],
    // 9
    [
        "animal",
        ["animal", "animais", "infecção", "infectado", "podem", "possivel", "como", "seres", "humanos", "infectados", "pessoa", "origem"],
        "Os seres humanos podem ser infectados com um novo coronavírus de origem animal?",
        "Sim. Investigações detalhadas descobriram que o Sars-CoV foi transmitido das civetas (um mamífero carnívoro de origem asiática) para humanos na China em 2002, e o Mers-CoV de camelos dromedários para humanos na Arábia Saudita em 2012. Vários coronavírus conhecidos estão presentes em animais que ainda não infectaram humanos. À medida que o controle melhora em todo o mundo, é provável que mais coronavírus sejam identificados.",
        "Organização Mundial da Saúde (OMS)",
        "https://news.un.org/pt/story/2020/01/1702002"
    ],
    // 10
    [
        "transmissão",
        ["pessoa", "pode", "transmissão", "transmitido", "comunitaria", "infecção", "contato", "próximo", "humano", "humanos"],
        "O vírus pode ser transmitido de pessoa para pessoa?",
        "Sim. Alguns coronavírus podem ser passados de pessoa para pessoa, geralmente após contato próximo com um paciente infectado, como por exemplo, em casa ou num centro de saúde.",
        "Organização Mundial da Saúde (OMS)",
        "https://news.un.org/pt/story/2020/01/1702002"
    ],
    // 11
    [
        "transmitir",
        ["pessoa", "pode", "transmissão", "transmitido", "comunitaria", "infecção", "contato", "próximo", "humano", "humanos", "contrair"],
        "O vírus pode ser transmitidos de pessoa para pessoa?",
        "Sim. Alguns coronavírus podem ser passados de pessoa para pessoa, geralmente após contato próximo com um paciente infectado, como por exemplo, em casa ou num centro de saúde.",
        "Organização Mundial da Saúde (OMS)",
        "https://news.un.org/pt/story/2020/01/1702002"
    ],
    // 12
    [
        "transmitido",
        ["pessoa", "pode", "transmissão", "transmitido", "comunitaria", "infecção", "contato", "próximo", "humano", "humanos"],
        "O vírus pode ser transmitidos de pessoa para pessoa?",
        "Sim. Alguns coronavírus podem ser passados de pessoa para pessoa, geralmente após contato próximo com um paciente infectado, como por exemplo, em casa ou num centro de saúde.",
        "Organização Mundial da Saúde (OMS)",
        "https://news.un.org/pt/story/2020/01/1702002"
    ],
    // 13
    [
        "proteger",
        ["como", "posso", "me", "proteger", "proteção", "fazer", "recomendação", "recomendado", "precaução", "precauções", "prevenir", "prevenção"],
        "O que devo fazer para me proteger?",
        "Lavar as mãos regularmente e manter distância de outras pessoas são as melhores maneiras de se proteger. Em muitos países a recomendação é ficar em casa o máximo possível.",
        "Organização Mundial da Saúde (OMS)",
        "https://news.un.org/pt/story/2020/01/1702002",
    ],
    // 14
    [
        "proteção",
        ["como", "posso", "me", "proteger", "proteção", "fazer", "recomendação", "recomendado", "precaução", "precauções", "prevenir", "prevenção"],
        "O que devo fazer para me proteger?",
        "Lavar as mãos regularmente e manter distância de outras pessoas são as melhores maneiras de se proteger. Em muitos países a recomendação é ficar em casa o máximo possível.",
        "Organização Mundial da Saúde (OMS)",
        "https://news.un.org/pt/story/2020/01/1702002",
    ],
    // 15
    [
        "prevenir",
        ["como", "posso", "me", "proteger", "proteção", "fazer", "recomendação", "recomendado", "precaução", "precauções", "prevenir", "prevenção"],
        "O que devo fazer para me proteger?",
        "Lavar as mãos regularmente e manter distância de outras pessoas são as melhores maneiras de se proteger. Em muitos países a recomendação é ficar em casa o maximo possível.",
        "Organização Mundial da Saúde (OMS)",
        "https://news.un.org/pt/story/2020/01/1702002",
    ],
    // 16
    [
        "agua",
        ["beber", "agua", "agua", "tomar", "líquido", "15", "minutos", "estômago", "cura", "previne"],
        "Tomar líquido de 15 em 15 minutos me impede de contrair o vírus?",
        "Não. Essa é uma mentira que circulou pela internet.",
        "Snopes",
        "https://www.snopes.com/fact-check/drinking-water-prevent-coronavirus/?fbclid=IwAR1SbifICw7TjZ8dUwf5WOJjSstWj1r83WzAoSZq5rf4RQX6Le5pQeR8b4A"
    ],
    // 17
    [
        "respiração",
        ["prender", "respiração", "respiracao", "10", "segundos", "fibrose", "pulmão", "pulmonar", "teste"],
        "Prender a respiração por 10 segundos é um teste para fibrose pulmonar?",
        "Não. Essa é uma mentira que circulou pela internet.",
        "Snopes",
        "https://www.snopes.com/fact-check/taiwan-experts-self-check/?fbclid=IwAR3bSl0lZ767Uou5ttMhN_bGc8h2GTdpgDqs5kWxNtQt_lQh0d6ka16pLhs"
    ],
    // 18
    [
        "casos",
        ["casos", "quantos", "confirmados", "virus", "brasil", "mundo", "indice", "número", "infectados", "infectadas", "pessoas", "quantas", "foram", "tem"],
        "Quantos casos da doença existem?",
        "Clique no site abaixo para ver estatísticas do vírus ao vivo.",
        "Covid19stats.live",
        "https://covid19stats.live/"
    ],
    // 19
    [
        "mundo",
        ["casos", "confirmados", "virus", "mundo", "indice", "numero", "número", "infectados", "infectadas", "pessoas", "quantas", "foram", "tem"],
        "Quantos casos da doença existem?",
        "Existem 488426 casos oficiais no mundo, sendo 2563 desses no Brasil (Atualizado: 26/03/2020). Clique no site abaixo para ver as estatísticas oficiais do vírus ao vivo. Especialistas estimam que os números reais podem ser de 10-40 vezes mais altos.",
        "Covid19stats.live",
        "https://covid19stats.live/"
    ],
    // 20
    [
        "brasil",
        ["casos", "confirmados", "virus", "brasil", "mundo", "indice", "número", "infectados", "infectadas", "pessoas", "quantas", "foram", "tem"],
        "Quantos casos da doença existem no Brasil?",
        "Existem 2563 casos confirmados no Brasil, com 60 mortes oficiais (Atualizado: 26/03/2020). Clique no site abaixo para ver as estatísticas oficiais do vírus ao vivo. Especialistas estimam que os números reais podem ser de 10-40 vezes mais altos.",
        "Covid19stats.live",
        "https://covid19stats.live/coronavirus/statistics/brazil"
    ],
    // 21
    [
        "mortes",
        ["mortes", "confirmados", "virus", "brasil", "mundo", "indice", "número", "mortos", "mortes", "pessoas", "quantas", "foram", "morreram"],
        "Quantas pessoas já morreram da doença?",
        "22067 mortes oficiais já foram registradas, sendo 60 dessas no Brasil (Atualizado: 26/03/2020). Clique no site abaixo para ver as estatísticas oficiais do vírus ao vivo. Especialistas estimam que os números reais podem ser de 10-40 vezes mais altos.",
        "Covid19stats.live",
        "https://covid19stats.live"
    ],
    // 22
    [
        "crianças",
        ["índice", "crianças", "risco", "mortes", "idade", "novos", "mais", "jovens", "estão"],
        "Crianças e jovens estão em risco?",
        "O vírus pode causar problemas independente da idade. Porém, a maior parte dos casos graves e mortes afetam os idosos.",
        "Prefeitura do Rio de Janeiro",
        "http://prefeitura.rio/saude/novo-coronavirus-perguntas-e-respostas/"
    ],
    // 23
    [
        "idosos",
        ["índice", "idosos", "risco", "mortes", "idade", "velhos", "avós", "morte", "estão"],
        "Idosos estão em risco?",
        "Sim. A maior parte dos casos graves e mortes afetam os idosos. Acima dos 60 anos, o índice de mortalidade da doença aumenta significantemente.",
        "Prefeitura do Rio de Janeiro",
        "http://prefeitura.rio/saude/novo-coronavirus-perguntas-e-respostas/"
    ],
    // 24
    [
        "alcool",
        ["alcool", "alcool", "gel", "gelzinho", "maos", "mãos", "limpar", "limpeza", "lavar"],
        "Álcool gel substitui lavar as mãos?",
        "Lavar as mãos é a melhor opção. Porém, se não houver como, utilizar álcool gel 70% ou mais já ajuda bastante.",
        "Prefeitura do Rio de Janeiro",
        "http://prefeitura.rio/saude/novo-coronavirus-perguntas-e-respostas/"
    ],
    // 25
    [
        "mascara",
        ["devo", "usar", "utilizar", "mascara", "n95", "cirúrgica", "vale", "pena", "recomendado", "dia"],
        "Devo usar máscaras no dia-a-dia?",
        "Máscaras devem ser utilizadas apenas por pessoas que estiverem doentes e profissionais da saúde.",
        "BBC", 
        "https://www.bbc.com/portuguese/brasil-51673933"
    ],
    // 26
        [
        "hospital",
        ["devo", "ir", "ao", "hospital", "pronto", "socorro", "atendimento", "posto", "saúde", "sintomas", "quando"],
        "Quando devo ir ao hospital?",
        "Você deve ir ao hospital somente se: estiver com dificuldade de respirar ou tenha um sintoma respiratório (exemplo: tosse) e febre por mais de 24 horas.",
        "BBC", 
        "https://www.bbc.com/portuguese/brasil-51673933"
    ],
    // 27
    [
        "mortalidade",
        ["taxa", "mortalidade", "letal", "quão", "indice", "morte", "chance", "probabilidade"],
        "Qual é a taxa de mortalidade do COVID-19?",
        "A taxa de mortalidade varia muito coma a idade mas é estimada no geral entre 1-3%. Ninguém pode saber ao certo. A gripe comum, por sua vez, tem uma taxa de mortalidade de 0.1%.",
        "BBC", 
        "https://www.bbc.com/portuguese/brasil-51673933"
    ],
    // 28
    [
        "grave",
        ["sintomas", "graves", "desenvolvem", "crítico", "morte", "mortes", "sobrevivem", "pessoas", "número", "casos"],
        "Qual porcentagem dos casos é grave?",
        "A estimativa atual é de que 80% dos casos são leves e 20% são graves. Da população total, 5% entra em estado crítico, e por volta de 1-3% morrem.",
        "BBC", 
        "https://www.bbc.com/portuguese/brasil-51673933"
    ],
    // 29
    [
        "duas",
        ["posso", "ser", "infectado", "duas", "várias", "muitas", "vezes", "infeccção", "reinfecção", "recontaminação", "novo", "novamente", "imunidade"],
        "Posso ser infectado duas vezes?",
        "Não sabemos ao certo. Especialistas estão trabalhando para descobrir, mas é melhor se prevenir para o pior cenário.",
        "BBC", 
        "https://www.bbc.com/portuguese/brasil-51673933"
    ],
    // 30
    [
        "transmissão",
        ["transmissão", "infeccção", "infectado", "rapido", "rapida", "como", "acontece", "transmitir", "pegar", "virus", "contaminar", "contaminação", "transmistir", "tosse", "gotículas", "ar", "transmitido", "pegar", "como"],
        "Como ocorre a transmissão?",
        "O vírus é bem contagioso e é transmitido pela contato com as mãos, olhos e boca. Por isso é muito importante lavar as mãos regularmente, evitar tocar o rosto e manter distância de outras pessoas, especialmente as doentes.",
        "BBC", 
        "https://www.bbc.com/portuguese/brasil-51673933"
    ],
    // 31
    [
        "quarentena",
        ["quarentena", "lockdown", "significa", "isolamento", "casa", "familiar", "contato", "isolar", "entrar", "14", "dias"],
        "O que significa quarentena? Como entro em quarentena?",
        "Uma pessoa entra em quarentena ao se isolar de outras pessoas por um período determinado. No caso do COVID-19, é recomendado que pessoas doentes entrem em quarentena até estarem curadas. Pessoas que tiveram contato com alguém doente ou viajaram para o exterior devem ficar 14 dias em quarentena. Durante a quarentena, não se deve ter contato físico com qualquer outra pessoa, incluindo familiares. Na maior parte dos casos, a quarentena pode ser feita em casa e monitorada pelo próprio indivíduo, mas em certos casos ela necessita ser feita em um hospital.",
        "BBC", 
        "https://www.bbc.com/portuguese/brasil-51673933"
    ],
    // 32
    [
        "calor",
        ["morre", "calor", "temperatura", "quente", "alta", "26", "27", "covid19", "virus", "coronavirus", "graus", "acaba", "sobrevive", "não", "verão"],
        "O COVID-19 morre com o calor?",
        "Não sabemos. Alguns outros vírus no passado desapareceram em temperaturas quentes, por várias razões. Porém, ainda não temos prova de que o mesmo irá acontecer com o COVID-19.",
        "BBC", 
        "https://www.bbc.com/portuguese/brasil-51673933"
    ],
    // 33
    [
        "gargarejo",
        ["gargarejo", "gargarejar", "quente", "cha", "agua", "tomar", "vinagre", "sal", "virus", "coronavirus", "mata"],
        "Tomar chá quente ou gargarejar mata o vírus?",
        "Não. Essa é uma mentira que circulou pela internet.",
        "BBC", 
        "https://www.bbc.com/portuguese/brasil-51673933"
    ],
    // 34
    [
        "grávida",
        ["grávida", "bebê", "mulher", "mulheres", "estou", "útero"],
        "Mulheres grávidas devem se preocupar?",
        "Especialistas e autoridades afirmam não haver motivo para acreditar que mulheres grávidas ou os bebês sejam mais vulneráveis aos efeitos do novo coronavírus do que qualquer outra pessoa. Porém, os cuidados básicos se aplicam à todos.",
        "BBC", 
        "https://www.bbc.com/portuguese/brasil-51673933"
    ],
    // 35
    [
        "asma",
        ["asma", "condições", "agravam", "agravar", "diabetes", "bronquite", "risco", "fatores", "hipertensão", "hiv", "autoimune", "pulmão", "respiratória"],
        "Quais fatores agravam os sintomas do vírus?",
        "Diabetes, hipertensão, asma, HIV e outras doenças respiratórias e autoimunes podem agravar os sintomas do COVID-19. Se você estiver preocupado(a) com sua condição, fale com seu doutor.",
        "BBC", 
        "https://www.bbc.com/portuguese/brasil-51673933"
    ],
    // 36
    [
        "origem",
        ["qual", "origem", "onde", "surgiu", "veio", "como", "começou", "wuhan", "morcego"],
        "De onde veio o COVID-19?",
        "A hipótese mais provável é que a epidemia começou em um mercado da cidade chinesa de Wuhan e foi transmitida de um animal vivo para um hospedeiro humano, antes de se espalhar de humano para humano. Uma teoria é de que esse animal foi um morcego.",
        "BBC", 
        "https://www.bbc.com/portuguese/brasil-51673933"
    ],
    // 37
    [
        "cachorro",
        ["pet", "cachorro", "gato", "animal", "estimação", "pegar", "transmitir", "cão", "cães", "gatos"],
        "Pets de estimação podem pegar a doença?",
        "Não há qualquer evidência científica de que cães e gatos possam transmitir o novo coronavírus para humanos ou outros animais.",
        "BBC", 
        "https://www.bbc.com/portuguese/brasil-51673933"
    ],
    // 38
    [
        "ssdfskfdfjc",
        [],
        "",
        "",
        "", 
        ""
    ],
]


var wordsToIgnore = ["são", "é", "do", "da", "com", "e", "que", "quê", "por", "para", "o", "a", "os", "as", "um", "de", "oq", "pq", "vc", "q"];
