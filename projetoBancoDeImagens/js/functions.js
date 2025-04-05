let imageData = []
let colections = [];

// Recuperar os dados do localStorage (se existirem)
if (localStorage.getItem("colections")) {
  colections = JSON.parse(localStorage.getItem("colections"));
}

// Função para salvar os dados no localStorage
function saveToLocalStorage() {
  localStorage.setItem("colections", JSON.stringify(colections));
}

// Criar elementos das Imagens
function createImages(results, call) {
    const containers = [document.getElementById("con01"), document.getElementById("con02"), document.getElementById("con03")];
    let column = 0;

    // Preencher divImg
    results.forEach((result) => {
        const templateDiv = document.querySelector(".divImg");
        if (!templateDiv) {
            console.error("O elemento .divImg não foi encontrado no DOM.");
            return;
        }

        const divImg = templateDiv.cloneNode(true);
        divImg.setAttribute("rule_id", result.id)

        const imgElement = divImg.querySelector(".img");
        imgElement.src = result.urls.small;
        imgElement.alt = result.alt_description || "Imagem";

        // Adicionar Descrição da Imagem
        const imgText = divImg.querySelector(".imgText p");
        
        if(result.description) {
            if(result.description.length > 30) {
                imgText.textContent = result.description.slice(0, 25) + '...'
            } else {
                imgText.textContent = result.description
            }
        } else {
            imgText.textContent = result.alt_description || "Sem descrição";
        }

        // Botão de Download
        const downloadButton = divImg.querySelector(".imgText button");

        downloadButton.addEventListener("click", () =>{downloadImage(result)}, {once:true} );
        
        containers[column].appendChild(divImg);
        column = (column + 1) % containers.length;
        
        if(divImg.querySelector(".deleteImg")) {
          divImg.querySelector(".deleteImg").addEventListener("click", () => {
            deleteItem(result.newId, "foto", document.querySelector(".colectionModal").getAttribute("data-name"))
          })
        }

        divImg.addEventListener("click", (e) => {
          if(!e.target.classList.contains("deleteIcon") && !e.target.classList.contains("downloadButton")){
            if(call == 'main') {
              fillModal(result.id, imageData) 
            } else {
              fillModal(result.id, results)
            }
          }
          
        })
    });
}

function cleanContainer() {
    document.querySelectorAll('.imgContainer').forEach(el => {
        el.innerHTML = ''
        imageData = []
    })
}

function openCloseModal(event, el) {
    if(event == 'open') {
        document.querySelector(`.${el}`).style.display = 'flex'
        setTimeout(()=>{
            document.querySelector(`.${el}`).style.opacity = 1
        },100)
    } else if(event == 'close') {
        document.querySelector(`.${el}`).style.opacity = 0
        setTimeout(()=>{
            document.querySelector(`.${el}`).style.display = 'none'
        },100)
    } else {
        console.log('Parametros invalidos')
    }
    
}

// Preenchendo os Modais ------ ImgModal / ColecModal
function fillModal(key, array) {
  for(let i in array) {
      if(key == array[i].id){
          el = array[i]
          document.querySelector(".autorInfo img").src = el.user.profile_image.small || '../img/perfilIcon.png'
          document.querySelector(".autorInfo p").innerHTML = el.user.name || 'Autor'
          document.querySelector("#modalImgDesc").innerHTML = el.description || el.alt_description || ''
          document.querySelector("#modalMainImg").src = el.urls.regular || el.urls.small

          document.querySelector("#modalDownload").addEventListener("click", () => downloadImage(el), {once:true})

        // Acionando a aba de salvar itens na Coleção ------- colecOptions
        if(document.querySelector(".colecOptions")){
            document.querySelector(".colecOptions").innerHTML = ''

            if(colections.length > 0) {
                document.querySelector(".colecOptions").style.display = 'flex'
                document.querySelector(".noColec").style.display = 'none'

                colections.forEach( el => {
                    const cDiv = document.querySelector(".cOption")
                    const newItem = cDiv.cloneNode(true)
                
                    newItem.querySelector("img").src = el.fotos?.[0]?.urls?.small || "../img/wallpaper02.jpg"
                    newItem.querySelector("h4").innerHTML = el.name.length > 10 ? el.name.slice(0, 10) + '...' : el.name;
                    newItem.querySelector("button").setAttribute("rule_id", el.name)
                
                    document.querySelector(".colecOptions").appendChild(newItem)
                })
            } else {
                document.querySelector(".colecOptions").style.display = 'none'
                document.querySelector(".noColec").style.display = 'block'
            }
            
        }

        document.querySelectorAll(".save").forEach( button => {
            button.addEventListener("click", (e) => {
              for(let j in colections) {
                    if(e.target.getAttribute("rule_id") == colections[j].name) {
                        let newItem = {
                            id: el.id,
                            newId: colections[j].fotos.length+1,
                            description: el.description,
                            alt_description: el.alt_description,
                            urls: {
                                    regular: el.urls.regular,
                                    small: el.urls.small,
                                    full: el.urls.full
                                  },
                            user: {
                                  id: el.user.id,
                                  name: el.user.name,
                                  username: el.user.username,
                                  profile_image: {
                                    small: el.user.profile_image.small,
                                    regular: el.user.profile_image.regular
                                  }
                            },
                            download: el.download
                        }

                        colections[j].fotos.push(newItem)
                        saveToLocalStorage()
                        openCloseModal("close", "backModalSave")
                    }
                }
            })
        })

        if(document.querySelector(".saveItem")) {
            document.querySelector(".saveItem").addEventListener("click", () => openCloseModal("open", "backModalSave"))
        }
      }
  }
  
  document.querySelectorAll(".closeImgModal").forEach( el => {
      el.addEventListener("click", () => openCloseModal("close", 'backModalImg'))
  })
  openCloseModal('open', 'backModalImg')
}


function deleteItem(id, nivel, col) {
  if(nivel == "col") {
      let newColection = colections.filter(el => el.name != id)
      colections = newColection
      createColections()

  } else if (nivel = "foto") {
      for(let i in colections) {
          if(colections[i].name == col) {
              let newFotos = colections[i].fotos.filter(el => el.id != newId)

              colections[i].fotos = newFotos
              cleanContainer()
              createColections()
              createImages(colections[i].fotos, "colections")
              return
          }  
      }
  }

}

async function downloadImage(result) {
    console.log(result)
    try {
        // Faz uma requisição para obter os dados reais da imagem
        const response = await fetch(result.urls.full); // Usa a URL completa da imagem
        const blob = await response.blob(); // Converte o conteúdo em Blob

        // Cria o link para download usando o Blob
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob); // Cria uma URL temporária para o Blob
        link.download = `${result.id}.jpg`; // Define o nome do arquivo baixado
        link.click(); // Simula o clique no link
        URL.revokeObjectURL(link.href); // Libera a memória usada pela URL do Blob
    } catch (error) {
        console.error("Erro ao baixar a imagem:", error);
    }
}