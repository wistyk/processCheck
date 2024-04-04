let file = "";
let fileUrl = "boliho2878@evimzo.com_74tFGanRRB7kfF1369fuUQDZmaYyHwjKVl3LWZq06i78VY4FFt8urPF8D5cR3x4A";
let textToFetch = document.querySelector("#textToFetch");
let fetchText = "";
const authorization = "juilet@mailcuk.com_GCXoygQf8JGKlH3l1lE1BKJacl7J90V97KU5f218ItoC64sPPS6KNr0PcF93iYgk";
const baseUrl = "https://api.pdf.co/v1";
const upButton = document.querySelector("#getFileBtn");
const fileInput = document.querySelector("#getFile");
const checkButton = document.querySelector("#check");
const isString = document.querySelector("#isString");
const pages = document.querySelector("#pages");

textToFetch.addEventListener("input", () => {
    fetchText = textToFetch.value;
});

checkButton.addEventListener("click", () => {
    pages.value = "";
    isString.value = "";
    setTimeout(() => {

        if (fileUrl) {
            let rawBody = {
                url: fileUrl,
                searchString: fetchText,
                wordMatchingMode: "SmartMatch"
            }
            let jsonBody = JSON.stringify(rawBody);
            const requestOptions = {
                method: 'POST',
                headers: {
                    'x-api-key': authorization,
                    'Content-Type': 'application/json'
                    // Adicione outros cabeçalhos conforme necessário
                },
                body: jsonBody
            };

            fetch(`${baseUrl}/pdf/find`, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        isString.value = "Erro ao enviar requisição";
                        throw new Error(response.message);
                    }
                    return response.json(); // Se a resposta for JSON
                })
                .then(data => {
                    documentData = data;
                    if (data.body.length > 0) {
                        isString.value = "Sim";
                        data.body.forEach((element, i) => {

                            if (i != 0) {
                                if (i != element.pageIndex +1) {
                                    pages.value += ", ";
                                }
                            }
                            pages.value += element.pageIndex + 1
                        });
                    } else {
                        isString.value = "Não";
                    }
                })
                .catch(error => {
                    console.error('Erro:', error);
                });
        } else {
            isString.value = "Nenhum arquivo selecionado";
            pages.value = "Nenhum arquivo selecionado";
        }

    }, 2000)
});

upButton.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", (e) => {
    file = e.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const requestOptions = {
            method: 'POST',
            headers: {
                'x-api-key': authorization
                // Adicione outros cabeçalhos conforme necessário
            },
            body: formData
        };

        fetch(`${baseUrl}/file/upload`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao fazer upload do arquivo');
                }
                return response.json(); // Se a resposta for JSON
            })
            .then(data => {
                fileUrl = data.url;
                // Faça algo com a resposta do servidor, se necessário
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    } else {
        console.error('Nenhum arquivo selecionado');
    }
});
