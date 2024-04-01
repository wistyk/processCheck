let file = "";
const baseUrl = "https://api.pdf.co/v1";
const upButton = document.querySelector("#getFileBtn");
const fileInput = document.querySelector("#getFile");
const checkButton = document.querySelector("#check");
checkButton.addEventListener("click", () => {
    alert('Ok');
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
