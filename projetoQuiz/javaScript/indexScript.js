const lottieElements = document.querySelectorAll('.lottieElement');
const lottieAnimations = [];
const animationStates = new Map(); // Armazena o estado (true = em execução, false = parada)

// Carrega todas as animações
lottieElements.forEach((element) => {
  const animation = lottie.loadAnimation({
    container: element,
    renderer: 'svg',
    loop: true,
    autoplay: false, // Inicialmente desativado
    path: element.getAttribute('data-lottie'),
  });

  // Adiciona a animação e estado inicial (false = parado)
  lottieAnimations.push(animation);
  animationStates.set(animation, false);
});

// Configura o Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const index = Array.from(lottieElements).indexOf(entry.target);
    const animation = lottieAnimations[index];

    if (entry.isIntersecting) {
      if (!animationStates.get(animation)) {
        animation.play(); // Dá play na animação
        animationStates.set(animation, true); // Marca como em execução
      }
    } else {
      if (animationStates.get(animation)) {
        animation.pause(); // Pausa a animação
        animationStates.set(animation, false); // Marca como parada
      }
    }
  });
});

// Observa os elementos
lottieElements.forEach((element) => observer.observe(element));