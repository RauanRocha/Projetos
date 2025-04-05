// Função para criar coleções (atualizada)
function createColections() {
    document.querySelector(".newColsArea").innerHTML = '';
    colections.forEach(i => {
        const cDiv = document.querySelector(".cCard");

        const divCol = cDiv.cloneNode(true);

        divCol.querySelector(".cardImg img").src = i.fotos?.[0]?.urls?.small || "../img/wallpaper02.jpg"

        divCol.setAttribute("key-name", i.name)

        divCol.querySelector("h2").innerHTML = i.name.length > 10 ? i.name.slice(0, 10) + '...' : i.name;

        divCol.querySelector("p").innerHTML = `${i.fotos.length} Fotos`;

        divCol.querySelector(".deleteCol").addEventListener("click", () => {
            deleteItem(divCol.getAttribute("key-name"), 'col');
        });

        document.querySelector(".newColsArea").appendChild(divCol);
    });

    // Abrir colectionModal
    document.querySelectorAll(".cCard").forEach(el => {
        el.addEventListener("click", (e) => {
            document.querySelectorAll(".imgContainer").forEach(el => {
                el.innerHTML = '';
            });
            for (let i in colections) {
                if (e.currentTarget.querySelector("h2").innerHTML == colections[i].name) {
                    if(colections[i].fotos.length > 0) {
                        // mostrando aba de coleções
                        document.querySelector(".imgArea").style.display = 'flex'
                        document.querySelector(".vazio").style.display = 'none'

                        // Criando as imagens
                        createImages(colections[i].fotos, "colections");
                    } else {
                        // Escondendo aba de coleções ---- Vazio
                        document.querySelector(".imgArea").style.display = 'none'
                        document.querySelector(".vazio").style.display = 'flex'
                    }

                    document.querySelector(".closeColectionModal").addEventListener("click", () => openCloseModal("close", "backModalColection"));
                }
            }

            if (!e.target.classList.contains("deleteIcon")) {

                document.querySelector(".colectionModal h2").innerHTML = e.currentTarget.getAttribute("key-name");

                document.querySelector(".colectionModal").setAttribute("data-name", e.currentTarget.querySelector("h2").innerHTML);

                openCloseModal("open", "backModalColection");
            }
        });
    });
}

// Adicionar nova coleção (atualizado)
document.querySelector(".addCard").addEventListener("click", () => {
    let nameCol = window.prompt("Digite o nome da nova Coleção: ");
    for(let i in colections) {
        if(nameCol == colections[i].name) {
            window.alert("Já existe uma coleção com esse nome, tente outro.")
            return
        }
    }
    if (nameCol) {
        let newCol = {
            name: nameCol,
            fotos: []
        };
        colections.push(newCol);
        saveToLocalStorage(); // Salvar no localStorage
        createColections();
    }
});

// Função para deletar coleção ou foto (atualizado)
function deleteItem(id, nivel, col) {
    if (nivel == "col") {
        colections = colections.filter(el => el.name != id);
        saveToLocalStorage(); // Salvar no localStorage
        createColections();
    } else if (nivel === "foto") {
        for (let i in colections) {
            if (colections[i].name == col) {
                colections[i].fotos = colections[i].fotos.filter(el => el.newId != id);

                if(colections[i].fotos.length <= 0) {
                    // mostrando aba de coleções
                    document.querySelector(".imgArea").style.display = 'none'
                    document.querySelector(".vazio").style.display = 'flex'
                }

                saveToLocalStorage(); // Salvar no localStorage
                cleanContainer();
                createColections();
                createImages(colections[i].fotos, "colections");
                return;
            }
        }
    }
}

// Inicializar
createColections();
