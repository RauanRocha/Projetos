// Variaveis Globais
const acessKey = 'J3E5Bvbs-ixadPTbr5c25WBDOQj6g0-47SjA2SV1Hfk';
let inputEl = document.querySelector(".sActive");

let inputData = "";
let page = 1;
let debounceTimeout;
let isFetching = false; 


document.querySelector("#closeSaveColec").addEventListener("click", () => openCloseModal("close", "backModalSave"))

// Pesquisar fotos API
async function searchImages(search) {
    if(search) {
        inputData=search
        document.querySelector(".filters").style.display = "flex"
    } else {
        inputData = inputEl.value
        document.querySelector(".filters").style.display = "none"
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&per_page=20&client_id=${acessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (page === 1) cleanContainer()

        if (data.results && data.results.length > 0) {
            if(document.querySelector(".imgArea").style.display == 'none'){
                document.querySelector(".imgArea").style.display = 'flex'
                document.querySelector(".vazio").style.display = 'none' 
            }
            imageData = [...imageData, ...data.results];
            createImages(data.results, "main");
            page++;
        } else {
            document.querySelector(".imgArea").style.display = 'none'
            document.querySelector(".vazio").style.display = 'flex'
        }

    } catch (error) {
        console.error("Erro ao buscar imagens:", error);
    }
}

// Metodos de Pesquisa de Imagem

    // Metodo = Botão de busca
    document.querySelectorAll('.iconPesquisa').forEach(el => {
        el.addEventListener('click', () => {
            cleanContainer()
            searchImages()
        });
    })

    // Metodo = Precionando Enter
    document.querySelectorAll('.search').forEach( el => {
        el.addEventListener('keyup', (e) => {
            if(e.key === "Enter") {
                cleanContainer()
                searchImages()
            } 

            inputData = inputEl.value
            document.querySelector("#inputM").value = inputData
            document.querySelector("#inputH").value = inputData
        })
    })

    // Metodo = Scroll da Pagina
    
    window.addEventListener("scroll", () => {
        clearTimeout(debounceTimeout);
    
        debounceTimeout = setTimeout(() => {
            let atualScroll = window.scrollY;
            let totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            let pct = (atualScroll / totalScroll) * 100;
    
            // Verifica se deve fazer a requisição e se não há uma em andamento
            if (pct > 70 && page != 1 && !isFetching) {
                isFetching = true; // Marca que a requisição está em andamento
    
                searchImages(inputData).then(() => {
                    isFetching = false; // Libera o bloqueio após a requisição
                }).catch((error) => {
                    console.error("Erro na requisição:", error);
                    isFetching = false; // Libera o bloqueio mesmo em caso de erro
                });
    
                console.log("Requisição disparada");
            }
    
            // Controle de exibição do cabeçalho fixo
            if (atualScroll > 550) {
                document.querySelector(".headHeader").classList.add("fixedHeader");
                document.querySelector("#searchHead").classList.remove("invisible");
                document.querySelector("#inputM").classList.remove("sActive");
                document.querySelector("#inputH").classList.add("sActive");
    
                inputEl = document.querySelector(".sActive");
            } else if (atualScroll < 550 && document.querySelector(".headHeader").classList.contains("fixedHeader")) {
                document.querySelector(".headHeader").classList.remove("fixedHeader");
                document.querySelector("#searchHead").classList.add("invisible");
                document.querySelector("#inputM").classList.add("sActive");
                document.querySelector("#inputH").classList.remove("sActive");
    
                inputEl = document.querySelector(".sActive");
            }
        }, 200); // Espera 200ms após o último evento
    });
    

// Filtros 
document.querySelectorAll(".filter").forEach( el => {
    el.addEventListener("click", (e) => {
        id = e.target.getAttribute("id")

        // Remover/Adicionar a classe ativa
        document.querySelectorAll(".filter").forEach(el => {
            el.classList.remove("active")
            e.target.classList.add("active")
        })

        cleanContainer()
        searchImages(id)
    })
})

searchImages("Natureza")

