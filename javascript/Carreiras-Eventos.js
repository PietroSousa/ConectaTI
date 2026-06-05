document.addEventListener('DOMContentLoaded', () => {

    /* ==========================
       LÓGICA DO CARROSSEL INFINITO
       ========================== */
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    // 1. Criar clones do primeiro e do último slide
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    // Adiciona identificadores invisíveis para o código reconhecer os clones
    firstClone.id = 'first-clone';
    lastClone.id = 'last-clone';

    // 2. Colar os clones no início e no fim da trilha original
    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    // Recalcula a lista de slides agora que os clones estão lá
    const allSlides = Array.from(track.children);

    // 3. Iniciar no índice 1 (que agora é o primeiro slide verdadeiro)
    let currentIndex = 1;
    let isTransitioning = false; // Trava de segurança contra cliques super rápidos
    const slideIntervalTime = 5000; // 5 segundos
    let slideInterval;

    // Posiciona o carrossel no slide correto logo ao carregar (sem animação)
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    function moveToSlide(index) {
        // Se já estiver no meio de uma animação, ignora o clique para não bugar
        if (isTransitioning) return;
        isTransitioning = true;

        // Garante que a transição suave está ligada para o movimento visual
        track.style.transition = 'transform 0.5s ease-in-out';
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // 4. A MÁGICA: O Teletransporte
    // Esse evento dispara exatamente quando o carrossel termina de deslizar
    track.addEventListener('transitionend', () => {
        isTransitioning = false; // Libera a trava para novos cliques

        // Se o slide atual for o CLONE DO PRIMEIRO (lá no finalzão)
        if (allSlides[currentIndex].id === 'first-clone') {
            track.style.transition = 'none'; // Desliga a animação para o usuário não ver o pulo
            currentIndex = 1; // Pula invisivelmente para o primeiro verdadeiro
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // Se o slide atual for o CLONE DO ÚLTIMO (lá no comecinho)
        if (allSlides[currentIndex].id === 'last-clone') {
            track.style.transition = 'none'; // Desliga a animação
            currentIndex = allSlides.length - 2; // Pula invisivelmente para o último verdadeiro
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    });

    // Passar para o próximo
    nextBtn.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
        resetInterval();
    });

    // Voltar para o anterior
    prevBtn.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
        resetInterval();
    });

    // Passagem automática
    function startInterval() {
        slideInterval = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, slideIntervalTime);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    startInterval(); // Inicia assim que a página carrega


    /* ==============================================
       LÓGICA DAS ABAS (TABS) / ACORDEÃO (ACCORDION)
       ============================================== */

    const tabWrappers = document.querySelectorAll('.tabs-wrapper');

    tabWrappers.forEach(wrapper => {
        const buttons = wrapper.querySelectorAll('.tab-btn');
        const contents = wrapper.querySelectorAll('.tab-content');

        buttons.forEach(button => {
            button.addEventListener('click', () => {

                const targetId = button.getAttribute('data-target');
                const targetContent = document.getElementById(targetId);
                const isActive = button.classList.contains('active');

                buttons.forEach(btn => btn.classList.remove('active'));
                contents.forEach(content => content.classList.remove('active'));

                if (!isActive) {
                    button.classList.add('active');
                    targetContent.classList.add('active');
                }
            });
        });
    });


    /* ==============================================
       LÓGICA DE AGRUPAMENTO (PARES E TRIOS)
       ============================================== */
    const professionLists = document.querySelectorAll('.profession-list');

    professionLists.forEach(list => {
        const count = list.children.length;

        if (count === 3) {
            list.classList.add('layout-three');
        } else if (count === 5) {
            list.classList.add('layout-five');
        }
    });

});