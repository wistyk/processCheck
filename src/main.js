let file = "";
let rawPageIndex = "";
let fileUrl = "";
const baseUrl = "https://api.pdf.co/v1";
const upButton = document.querySelector("#getFileBtn");
const fileInput = document.querySelector("#getFile");
const checkButton = document.querySelector("#check");
const isString = document.querySelector("#isString");
const pages = document.querySelector("#pages");
checkButton.addEventListener("click", () => {
    setTimeout(() => {

        if (fileUrl) {
            let rawBody = {
                url: fileUrl,
                searchString: "departament",
                wordMatchingMode: "SmartMatch"
            }
            let jsonBody = JSON.stringify(rawBody);
            const requestOptions = {
                method: 'POST',
                headers: {
                    'x-api-key': 'wistykest@yahoo.fr_r8PXNFh28OU2t3ggJ84VgL1RYu7L7W1CJTDKvKgDf34V406xLlUnXZdtMMHy80lP',
                    'Content-Type': 'application/json'
                    // Adicione outros cabeçalhos conforme necessário
                },
                body: jsonBody
            };

            fetch(`${baseUrl}/pdf/find`, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        isString.value = "Erro ao enviar requisição";
                        throw new Error('Erro ao enviar requisição');
                    }
                    return response.json(); // Se a resposta for JSON
                })
                .then(data => {
                    documentData = data;
                    if (data.body.length > 0) {
                        isString.value = "Sim";
                        data.body.forEach((element, i) => {
                            if (i != 0) {
                                if (rawPageIndex != element.pageIndex) {
                                    pages.value += ", ";
                                }
                            }
                            pages.value += element.pageIndex +1
                            rawPageIndex = element.pageIndex
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
                'x-api-key': 'wistykest@yahoo.fr_r8PXNFh28OU2t3ggJ84VgL1RYu7L7W1CJTDKvKgDf34V406xLlUnXZdtMMHy80lP'
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
