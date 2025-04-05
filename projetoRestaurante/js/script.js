let c = (el)=> {
   return document.querySelector(el)
}

let qt = 1
let pedidos = []
let subTotal = 0

c('#carrinhoImg').addEventListener('click', () => {
    let car = c('.carrinho')
    car.style.marginRight = '-600px'
    car.style.display = 'flex'
    setTimeout( () => {
        car.style.marginRight = '0px'
    }, 100)
    renderPedidos()
    
    c('#finalButton').addEventListener('click', () => {
        pedidos = []
        attPedido()
        
        car.style.display='none'
        car.style.marginRight = '-600px'
        c('#finalBack').style.display = 'flex'     
        c('#topBar').style.animationName = 'mudarWidth'  
        setTimeout( () => {
             c('#finalBack').style.display = 'none'
        }, 3000)
    })
})

// Função de renderização do Modal Carrinho de Compras
function renderPedidos() {  
    subTotal = 0
    let car = c('.carrinho')
    car.querySelector('.pedidos').innerHTML = ''
    car.querySelector('article').style.display = 'none'
    
    if(pedidos.length == 0) {
        car.querySelector('article').style.display = 'flex'
    } else {
        for(let i in pedidos) {
            let atualId = pedidos[i].id
            let pedido = c('.pedido').cloneNode(true)
            pedido.style.display = 'flex'
            
            pedido.setAttribute('data-item', atualId)
            pedido.querySelector('img').src = `img/${comidas[atualId].imagem}`
            pedido.querySelector('h3').innerHTML = comidas[atualId].nome
            pedido.querySelector('.qt p').innerHTML = pedidos[i].quantidade
    
            pedido.querySelectorAll('#qtMais').forEach( item =>{
                item.addEventListener('click', (e) => {
                    let el = (e.target.parentElement).parentElement
                    elId = el.getAttribute('data-item')
                    for(let i in pedidos) {
                        if(elId == pedidos[i].id){
                            pedidos[i].quantidade++
                            renderPedidos()
                        }
                    }
                })
            })
    
            pedido.querySelectorAll('#qtMenos').forEach( item =>{
                item.addEventListener('click', (e) => {
                    let el = (e.target.parentElement).parentElement
                    elId = el.getAttribute('data-item')
                    for(let i in pedidos) {
                        if(elId == pedidos[i].id){
                            if(pedidos[i].quantidade>1) {
                                pedidos[i].quantidade--
                                renderPedidos()
                            } else if (pedidos[i].quantidade = 1) {
                                pedidos = pedidos.filter( e => e.id !== pedidos[i].id)
                                renderPedidos()
                            }
                            
                        }
                    }
                })
            })
            subTotal = subTotal + (pedidos[i].quantidade * comidas[atualId].preco)
            c('.pedidos').append(pedido)
        }
        c('.subTotal p').innerHTML = `R$${(subTotal).toFixed(2)}`
        c('.desconto p').innerHTML = `-R$${(subTotal * 0.1).toFixed(2)}`
        c('.total p').innerHTML = `R$${(subTotal * 0.9).toFixed(2)}`
    }
    c('.fecharCar').addEventListener('click', fecharCarrinho)
}

// Renderizando os Pratos 
function renderFood(x) {
    c('#produtos').innerHTML = ''
    
    // Efeito Cardapio 
    c('#produtos').style.opacity = 0
    setTimeout(()=>{
        c('#produtos').style.transition = '0.8s'
        c('#produtos').style.opacity = 1
    },100)
    c('#produtos').style.transition = 'none'

    for(let i in comidas) {
        if( x ==='todas' || comidas[i].tipo == x) {
            let item = comidas[i]
            let pratos = c('.cardComida').cloneNode(true)
            pratos.style.display = 'flex'
            pratos.setAttribute(`data-item`, item.id)

            //Adicionando informações
            pratos.querySelector('img').src = `img/${item.imagem}`
            pratos.querySelector('.comidaTexto h3').innerHTML = item.nome
            pratos.querySelector('.comidaTexto p').innerHTML =
            item.descricao

            c('#produtos').append(pratos)
            pratos.querySelectorAll('button').forEach( el => { 
                el.addEventListener( "click", (e) => {
                let food = e.target.parentElement 
                food =  food.getAttribute('data-item')
                c('body').style.overflow = 'hidden'

                for(let i in comidas) {
                    if(comidas[i].id == food) {
                        let compras = c('.compras')
                        let addButton = compras.querySelector('button')
                        compras.style.opacity = 0
                        compras.style.display = 'flex'
                        setTimeout( () => {
                            compras.style.opacity = 1
                        }, 150)

                        compras.querySelector('.conteudoModal img').src = `img/${comidas[i].imagemG}`
                        compras.querySelector('.textoModal h2').innerHTML = `${comidas[i].nome}`  
                        compras.querySelector('.textoModal p').innerHTML = `${comidas[i].descricao}` 
                        compras.querySelector('.textoModal .preco h3').innerHTML = innerHTML = `R$ ${(comidas[i].preco).toFixed(2)}`
                        qt = 1
                        compras.querySelector('.qt p').innerHTML = qt 

                        addButton.removeEventListener(`click`, add)
                        addButton.addEventListener('click', add )

                        function add() {
                            compras.style.opacity = 0
                            setTimeout( () => {
                                compras.style.display = 'none'
                            }, 150)
                            c('body').style.overflow = 'visible'
                            
                            !isRepeat(comidas[i].id) && pedidos.push({ id: comidas[i].id, quantidade: qt })
                            
                            attPedido()
                            addButton.removeEventListener(`click`, add)
                        }
                        
                        c('.fechar').addEventListener('click', function fechar() {
                            c('.compras').style.opacity = 0
                            setTimeout( () => {
                                c('.compras').style.display = 'none'
                            }, 150)
                            c('body').style.overflow = 'auto'
                            attPedido()
                            addButton.removeEventListener('click', add)
                        })
                    }
                }
                fecharCarrinho()
            })
    })
        }
    }
}

function isRepeat(e) {
    for(let i in pedidos) {
        if(e === pedidos[i].id) {
            pedidos[i].quantidade += qt
            return true
        }
    }
}

function attPedido() {
    if(pedidos.length > 0) {
        c('.iconeQt').style.display = 'flex'
        c('.iconeQt').innerHTML = pedidos.length
    } else {
        c('.iconeQt').style.display = 'none'
    }
    
}

function fechar() {
    
}

function fecharCarrinho() {
    let car = c('.carrinho')
    let pedidoArea = c('.carrinho .pedidos')
    
    pedidoArea && (pedidoArea.innerHTML = '')
    
    car.style.marginRight = '-600px'
    setTimeout(() =>{
        car.style.display = 'none'
    }, 150)
    attPedido()
}

function hScroll() {
    let header = c('header')
    if (window.scrollY > 150) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

let botoes = document.querySelectorAll('#filtro .especial')
botoes.forEach( item => {
    item.addEventListener('click' , () => {
        botoes.forEach( b => {
            b.classList.remove('active')
        })
        item.classList.add('active')
        
        let id = item.getAttribute('id')
        renderFood(id)
    })
})

c('#qtMenos').addEventListener('click', () => {
    if(qt > 1) {
        qt--
        c('.qt p').innerHTML = qt 
    }
})
c('#qtMais').addEventListener('click', () => {
    qt++
    c('.qt p').innerHTML = qt 
})

window.addEventListener('scroll', hScroll)

renderFood('todas')





