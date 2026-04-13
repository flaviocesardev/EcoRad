document.addEventListener("DOMContentLoaded", function () {

    const unidades = [        
        { 
            nome: "Unidade Campo Grande", 
            tel: "5581997050491", 
            telFormatado: "(81) 99705-0491",
            //email: "Substituirpeloemail",
            endereco: "R. Jerônimo Viléla, 86 - Campo Grande, Recife - PE, 52040-180",
            mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.684725668774!2d-34.88392452421364!3d-8.031405580186167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab1866f8a79925%3A0xe82861d6496ad1e6!2sR.%20Jer%C3%B4nimo%20Vil%C3%A9la%2C%2086%20-%20Campo%20Grande%2C%20Recife%20-%20PE%2C%2052040-180!5e0!3m2!1spt-BR!2sbr!4v1775362454657!5m2!1spt-BR!2sbr",
            horarios: {
                0: "24h",
                1: "24h",
                2: "24h",
                3: "24h",
                4: "24h",
                5: "24h",
                6: "24h"
            }
        },
        { 
            nome: "Unidade Tabajara", 
            tel: "5581991545553", 
            telFormatado: "(81) 99154-5553",
            //email: "Substituirpeloemail",
            endereco: "Av. Dr. Joaquim Nabuco, 316 - Tabajara, Paulista - PE, 53402-105",
            mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.284879265566!2d-34.86937862421439!3d-7.969482479439333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab17d41531b939%3A0xb61c23fe3170cd0d!2sAv.%20Dr.%20Joaquim%20Nabuco%2C%20316%20-%20Fragoso%2C%20Paulista%20-%20PE%2C%2053401-435!5e0!3m2!1spt-BR!2sbr!4v1775362489593!5m2!1spt-BR!2sbr",
            horarios: {
                0: "Fechado",
                1: "09h - 17h",
                2: "09h - 12h",
                3: "09h - 12h",
                4: "09h - 12h",
                5: "09h - 17h",
                6: "09h - 13h"
            }
        },
        { 
            nome: "Unidade Tamarineira", 
            tel: "5581981373040", 
            telFormatado: "(81) 98137-3040",
            //email: "",
            endereco: "R. São Vicente, 213 - Tamarineira, Recife - PE, 52051-130",
            mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.7134691697634!2d-34.9086566242138!3d-8.02845068015041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab1852d1d4709d%3A0x89785920286fa7c4!2sR.%20S%C3%A3o%20Vicente%2C%20213%20-%20Tamarineira%2C%20Recife%20-%20PE%2C%2052051-160!5e0!3m2!1spt-BR!2sbr!4v1775362404940!5m2!1spt-BR!2sbr",
            horarios: {
                0: "Fechado",
                1: "15h - 18h",
                2: "Fechado",
                3: "Fechado",
                4: "17h - 18h",
                5: "Fechado",
                6: "Fechado"
            }
        },
    ];

    const contatosWhats = [
        { nome: "Unidade Volante", tel: "5581995217789" },
        { nome: "Raio X digital volante", tel: "5581997001125" }
    ];

    const whatsappParceiro = {
        tel: "5581995217789",
        mensagem: (origem = "site da EcoRad") =>
            `Olá! Vim pelo ${origem} e tenho interesse em me tornar um parceiro(a).`
    };

    const mensagemPadrao = "Olá! Vim pelo site da EcoRad e gostaria de agendar um exame de imagem.";

    const modalWhats = new bootstrap.Modal(document.getElementById('modalWhats'));
    const listaModal = document.getElementById('lista-unidades-modal');
    const botoesMapaContainer = document.getElementById('botoes-mapa');
    const iframeMapa = document.getElementById('iframe-mapa');
    
    const enderecoTxt = document.getElementById('txt-endereco');
    //const emailTxt = document.getElementById('txt-email');
    const telTxt = document.getElementById('txt-tel');
    const listaHorarios = document.getElementById('lista-horarios');
    const tituloUnidade = document.getElementById('titulo-unidade-ativa');
    const btnWhatsUnidade = document.getElementById('btn-whats-unidade');
    const btnParceiro = document.getElementById('btn-parceiro');

    if (btnParceiro) {
        btnParceiro.href = `https://wa.me/${whatsappParceiro.tel}?text=${encodeURIComponent(whatsappParceiro.mensagem("site da EcoRad"))}`;
        btnParceiro.target = "_blank";
    }

    function atualizarInterface(u) {
        tituloUnidade.innerText = u.nome;
        enderecoTxt.innerText = u.endereco;
        //emailTxt.innerText = u.email;
        telTxt.innerText = u.telFormatado || u.tel;
        iframeMapa.src = u.mapa;

        if (btnWhatsUnidade) {
            btnWhatsUnidade.href = `https://wa.me/${u.tel}?text=${encodeURIComponent(mensagemPadrao)}`;
        }

        const diasSemana = [
            "Domingo",
            "Segunda-feira",
            "Terça-feira",
            "Quarta-feira",
            "Quinta-feira",
            "Sexta-feira",
            "Sábado"
        ];

        listaHorarios.innerHTML = '';

        diasSemana.forEach((diaNome, index) => {
            const horario = u.horarios[index] || "Fechado";

            const li = document.createElement('li');
            li.className = "d-flex justify-content-between border-bottom py-2";

            const spanDia = document.createElement('span');
            spanDia.innerText = diaNome;

            const strongHorario = document.createElement('strong');
            strongHorario.innerText = horario;

            const texto = horario.toLowerCase();

            if (texto.includes("fechado")) {
                strongHorario.classList.add('text-danger');
            } else if (texto.includes("24")) {
                strongHorario.classList.add('text-success');
            }

            li.appendChild(spanDia);
            li.appendChild(strongHorario);

            listaHorarios.appendChild(li);
        });
    }

    function initMapa() {
        botoesMapaContainer.innerHTML = '';

        unidades.forEach((u, index) => {
            const btn = document.createElement('button');
            btn.className = `btn btn-outline-primary btn-sm fw-bold ${index === 0 ? 'active' : ''}`;
            btn.innerText = u.nome;

            btn.onclick = () => {
                document.querySelectorAll('#botoes-mapa .btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                atualizarInterface(u);
            };

            botoesMapaContainer.appendChild(btn);
        });

        if (unidades.length > 0) atualizarInterface(unidades[0]);
    }

    document.querySelectorAll('.whatsapp-trigger').forEach(btn => {
        btn.addEventListener('click', () => {

            listaModal.innerHTML = '';

            const listaCompleta = [
                ...unidades.map(u => ({ nome: u.nome, tel: u.tel })),
                ...contatosWhats
            ];

            listaCompleta.forEach(item => {
                const a = document.createElement('a');
                a.className = "btn btn-light border p-3 text-start fw-bold shadow-sm d-block mb-2 text-decoration-none text-dark";
                a.href = `https://wa.me/${item.tel}?text=${encodeURIComponent(mensagemPadrao)}`;
                a.target = "_blank";
                a.innerHTML = `<i class="bi bi-whatsapp text-success me-2"></i> ${item.nome}`;
                
                listaModal.appendChild(a);
            });

            modalWhats.show();
        });
    });

    const navbar = document.querySelector('#mainNav');
    const reveals = document.querySelectorAll(".reveal");

    function handleScroll() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        reveals.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add("active");
            }
        });
    }

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    const sections = document.querySelectorAll("section, header");
    const navLinksSpy = document.querySelectorAll("#mainNav .nav-link");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinksSpy.forEach(link => link.classList.remove("active"));

                const id = entry.target.getAttribute("id");
                const activeLink = document.querySelector(`#mainNav .nav-link[href="#${id}"]`);

                if (activeLink) activeLink.classList.add("active");
            }
        });
    }, {
        rootMargin: "-40% 0px -55% 0px"
    });

    sections.forEach(section => observer.observe(section));

    // FECHA MENU MOBILE
    const navLinksMenu = document.querySelectorAll('.nav-link');
    const menuCollapse = document.getElementById('navbarNav');
    const bsCollapse = new bootstrap.Collapse(menuCollapse, { toggle: false });

    navLinksMenu.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                bsCollapse.hide();
            }
        });
    });

    const galeriaImagens = [
        "img/galeria/1.jpeg",
        "img/galeria/2.jpeg",
        "img/galeria/3.jpeg",
        "img/galeria/4.jpeg",
        "img/galeria/5.jpeg",
        "img/galeria/6.jpeg",
        "img/galeria/7.jpeg",
        "img/galeria/8.jpeg",
        "img/galeria/9.jpeg",
        "img/galeria/10.jpeg",
        "img/galeria/11.jpeg",
        "img/galeria/12.jpeg",
       
    ];

    const galeriaContainer = document.getElementById("galeria-dinamica");

    if (galeriaContainer && galeriaImagens.length > 0) {
        // Divide as fotos no meio. Math.floor joga a diferença pro 2º array se for ímpar.
        const meio = Math.floor(galeriaImagens.length / 2);
        const metadeDireita = galeriaImagens.slice(0, meio);
        const metadeEsquerda = galeriaImagens.slice(meio);

        // Estilos CSS dinâmicos para a animação do carrossel
        const style = document.createElement('style');
        style.innerHTML = `
            .carrossel-wrapper {
                display: flex;
                overflow: hidden;
                width: 100%;
                margin-bottom: 20px;
                white-space: nowrap;
                position: relative;
            }
            .carrossel-track {
                display: flex;
                width: max-content;
            }
            .carrossel-track img {
                height: 350px; /* Aumentado para ficarem maiores */
                width: 350px;  /* Definido largura igual a altura para ficarem quadradas */
                object-fit: cover; /* Garante que a imagem preencha o quadrado sem distorcer */
                margin: 0 10px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            /* Pausa a animação ao passar o mouse */
            .carrossel-wrapper:hover .carrossel-track {
                animation-play-state: paused;
            }
            .anim-direita {
                animation: scrollRight 40s linear infinite;
            }
            .anim-esquerda {
                animation: scrollLeft 40s linear infinite;
            }
            /* Ajustado para 25% pois multiplicamos as imagens por 4 */
            @keyframes scrollLeft {
                0% { transform: translateX(0); }
                100% { transform: translateX(-25%); }
            }
            @keyframes scrollRight {
                0% { transform: translateX(-25%); }
                100% { transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);

        // Função para construir o HTML de cada carrossel
        function criarCarrossel(imagens, direcao) {
            const wrapper = document.createElement('div');
            wrapper.className = 'carrossel-wrapper';

            const track = document.createElement('div');
            track.className = `carrossel-track anim-${direcao}`;

            // Multiplicando as imagens 4 vezes para garantir que nunca falte imagem na direita
            const imagensDuplicadas = [...imagens, ...imagens, ...imagens, ...imagens];

            imagensDuplicadas.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.loading = "lazy";
                track.appendChild(img);
            });

            wrapper.appendChild(track);
            return wrapper;
        }

        // Renderiza os dois carrosseis na tela
        galeriaContainer.appendChild(criarCarrossel(metadeDireita, 'direita'));
        galeriaContainer.appendChild(criarCarrossel(metadeEsquerda, 'esquerda'));
    }

    initMapa();

});