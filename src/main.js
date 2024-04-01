let file = "";
let fileUrl = "https://pdf-temp-files.s3.us-west-2.amazonaws.com/QBTSHWOSYON0NVPTM7E0G9QNKU2Q9G7T/file.dat?X-Amz-Expires=3600&X-Amz-Security-Token=FwoGZXIvYXdzECIaDCdmLmeAm3En%2FpjbNyKCAddxV%2FnCxP8UVIoskumfcxw7qMUveX7OkU40%2FFvs6ruqd0mSWVJlDrfL6OaYLwS%2BOZ7ZLEwxULvjpq0p0Bs8okpvdpRJgaq3jCcTHp5HwrpWu2sWE1EBt6aPqRr%2FX%2BVXk31s0HE8k6Zk5FUChbL8dKoHwrOvzuGfPB9xBsPZ6xmPp5YojoiosAYyKHMuf0bb1tHijh%2BGnoPEsoCRk59jX674iM9vwSS%2FTBTK%2BFp0BbTdhSE%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4NRRSZPHATAUTIUL/20240401/us-west-2/s3/aws4_request&X-Amz-Date=20240401T004710Z&X-Amz-SignedHeaders=host&X-Amz-Signature=bab07ab0cebcf641cac3343949c375579c35e89e746eb4daaa86a9684f9e7af6";
const baseUrl = "https://api.pdf.co/v1";
const upButton = document.querySelector("#getFileBtn");
const fileInput = document.querySelector("#getFile");
const checkButton = document.querySelector("#check");
checkButton.addEventListener("click", () => {
    setTimeout(() => {

        if (fileUrl) {
            let rawBody = {
                url: fileUrl,
                searchString: "teste"
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
                        throw new Error('Erro ao enviar requisição');
                    }
                    return response.json(); // Se a resposta for JSON
                })
                .then(data => {
                    documentData = data;
                    console.log('Arquivo lido com sucesso:', data);
                })
                .catch(error => {
                    console.error('Erro:', error);
                });
        } else {
            console.error('Nenhum arquivo selecionado');
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
                console.log('Arquivo enviado com sucesso:', data);
                // Faça algo com a resposta do servidor, se necessário
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    } else {
        console.error('Nenhum arquivo selecionado');
    }
});
