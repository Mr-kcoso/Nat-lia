/**
 * ESTADO.JS — Motor Central do Projeto Équino
 * Gerencia todo o estado persistente do jogo via localStorage.
 */

const Estado = (() => {

    const CHAVE = "projeto_equino_estado";

    // Estado inicial padrão
    const padrao = {
        progresso: 1,
        afinidades: [],
        conquistas: [],
        fragmentos: [],
        senhasSecretas: [],
        colecao: {
            corujas: 0,
            bilhetes: 0,
            documentos: 0,
            fitas: 0
        }
    };

    // ─── Carregar e salvar ─────────────────────────────────────────

    function carregar() {
        try {
            const raw = localStorage.getItem(CHAVE);
            if (!raw) return { ...padrao };
            return { ...padrao, ...JSON.parse(raw) };
        } catch {
            return { ...padrao };
        }
    }

    function salvar(estado) {
        try {
            localStorage.setItem(CHAVE, JSON.stringify(estado));
            // Manter compatibilidade com o sistema antigo de progresso
            localStorage.setItem("progresso", estado.progresso);
        } catch (e) {
            console.warn("Estado: erro ao salvar.", e);
        }
    }

    // ─── API Pública ───────────────────────────────────────────────

    function get() {
        const estado = carregar();
        // Sincronizar progresso com o sistema legado
        const progressoLegado = Number(localStorage.getItem("progresso")) || 1;
        if (progressoLegado > estado.progresso) {
            estado.progresso = progressoLegado;
            salvar(estado);
        }
        return estado;
    }

    function setProgresso(valor) {
        const estado = carregar();
        const anterior = estado.progresso || 1;
        if (valor > estado.progresso) {
            estado.progresso = valor;
            salvar(estado);
            // If we've just reached the final milestone (100% / codigo 9), notify
            try{
                if (anterior < 9 && valor >= 9){
                    mostrarToast('✓ FITA 13 DESBLOQUEADA — DESABAFO DO M');
                    try{ window.dispatchEvent(new CustomEvent('estado:fita13Desbloqueada', { detail: { progresso: valor } })); }catch(e){}
                }
            }catch(e){}
        }
    }

    function addAfinidade(nome) {
        const estado = carregar();
        if (!estado.afinidades.includes(nome)) {
            estado.afinidades.push(nome);
            salvar(estado);
            mostrarToast(`✓ AFINIDADE IDENTIFICADA: ${nome}`);
            try { window.dispatchEvent(new CustomEvent('estado:afinidade', { detail: { nome } })); } catch(e){}
            return true;
        }
        return false;
    }

    function addConquista(id, nome, icone, descricao) {
        const estado = carregar();
        const jaExiste = estado.conquistas.some(c => c.id === id);
        if (!jaExiste) {
            estado.conquistas.push({ id, nome, icone, descricao });
            salvar(estado);
            mostrarConquistaToast(icone, nome, descricao);
            try { window.dispatchEvent(new CustomEvent('estado:conquista', { detail: { id, nome, icone, descricao } })); } catch(e){}
            return true;
        }
        return false;
    }

    function addFragmento(id) {
        const estado = carregar();
        if (!estado.fragmentos.includes(id)) {
            estado.fragmentos.push(id);
            salvar(estado);
            mostrarToast(`🔴 FRAGMENTO ${id} RECUPERADO`);
            try { window.dispatchEvent(new CustomEvent('estado:fragmento', { detail: { id } })); } catch(e){}
            return true;
        }
        return false;
    }

    function registrarSenhaSecreta(senha) {
        const estado = carregar();
        if (!estado.senhasSecretas.includes(senha)) {
            estado.senhasSecretas.push(senha);
            salvar(estado);
            try { window.dispatchEvent(new CustomEvent('estado:senha', { detail: { senha } })); } catch(e){}
        }
    }

    function jaDescobriu(senha) {
        return carregar().senhasSecretas.includes(senha);
    }

    function addColecao(tipo) {
        const estado = carregar();
        if (estado.colecao[tipo] !== undefined) {
            estado.colecao[tipo]++;
            salvar(estado);
            try { window.dispatchEvent(new CustomEvent('estado:colecao', { detail: { tipo, valor: estado.colecao[tipo] } })); } catch(e){}
        }
    }

    // ─── Senhas Secretas ───────────────────────────────────────────

    const senhasSecretas = {
        // Novas senhas integradas — chaves em forma CANÔNICA (maiúsculas)
        "ALIANCA": {
            mensagem: "> ACESSO: Registro de aliança localizado.\n> MEMÓRIA: Dedo marcado.\n> Arquivo secundário liberado.",
            conquista: { id: "DEDO_ERRADO", nome: "💍 DEDO ERRADO", icone: "💍", descricao: "Recuperou a memória da aliança." },
            afinidade: null
        },
        "34": {
            mensagem: "> REFERÊNCIA NUMÉRICA DETECTADA: 34.\n> MEMÓRIA: Pegada infantil localizada.\n> Arquivo secundário liberado.",
            conquista: { id: "PE_DE_CRIANCA", nome: "👟 PÉ DE CRIANÇA", icone: "👟", descricao: "Recuperou a memória do número 34." },
            afinidade: null
        },
        "2008": {
            mensagem: "> DATA CRÍTICA IDENTIFICADA: 20/08.\n> Registro datado localizado.\n> Arquivo secundário liberado.",
            conquista: { id: "ARQUIVO_1908", nome: "📅 19 DE AGOSTO", icone: "📅", descricao: "Encontrou uma data importante." },
            afinidade: null
        },
        "0612": {
            mensagem: "> DATA CRÍTICA IDENTIFICADA: 06/12.\n> Registro preservado localizado.\n> Arquivo secundário liberado.",
            conquista: { id: "ARQUIVO_0812", nome: "📆 08 DE DEZEMBRO", icone: "📆", descricao: "Recuperou uma memória preservada pelo tempo." },
            afinidade: null
        },
        "NATALIA": {
            mensagem: "> N-27 IDENTIFICADA.\n> CORRESPONDÊNCIA: 100%.\n> Bem-vinda, Nat.",
            conquista: { id: "OBSERVADORA", nome: "OBSERVADORA", icone: "👁", descricao: "Você descobriu quem é N-27." },
            afinidade: null
        },
        "MARCOS": {
            mensagem: "> CREDENCIAIS DE M-27 RECONHECIDAS.\n> O observador está ativo.",
            conquista: { id: "ARQUIVISTA", nome: "ARQUIVISTA", icone: "📼", descricao: "O observador se revelou." },
            afinidade: null
        },
        "BMO": {
            mensagem: "> B-M0 REAGE: ESSE NOME...\n> POR QUE PARECE FAMILIAR?\n> MEMÓRIA CRUZADA DETECTADA.",
            conquista: { id: "CORUJA_VIU", nome: "A CORUJA VIU VOCÊ", icone: "🦉", descricao: "B-M0 reconheceu o nome." },
            afinidade: "Hora de Aventura"
        },
        "EDWARD": {
            mensagem: "> REGISTRO DE VOLTERRA ENCONTRADO.\n> SUJEITO N-27 IDENTIFICADO NOS ARQUIVOS.",
            conquista: null,
            afinidade: "Vampiros"
        },
        "DRACULA": {
            mensagem: "> ACESSO AOS ARQUIVOS DE VOLTERRA CONCEDIDO.\n> A FIGURA NA PRAÇA FOI CATALOGADA.",
            conquista: null,
            afinidade: "Vampiros"
        },
        "HOGWARTS": {
            mensagem: "> PLATAFORMA 9 RESSOA.\n> MEMÓRIA CRUZADA DETECTADA.\n> N-27 CONHECIA O CAMINHO.",
            conquista: null,
            afinidade: "Magia"
        },
        "BABY": {
            mensagem: "> ACESSO EMOCIONAL DETECTADO.\n> PROTOCOLO DE EMPATIA ATIVADO.\n> ...",
            conquista: { id: "NAO_DEVERIA", nome: "VOCÊ NÃO DEVERIA SABER DISSO", icone: "🔴", descricao: "Você encontrou o arquivo restrito." },
            afinidade: null
        },
        "AMOR": {
            mensagem: "> ESTE ARQUIVO ESTÁ PROTEGIDO.\n> CHAVE DE ACESSO: SENTIMENTO.\n> ACESSO CONCEDIDO.",
            conquista: null,
            afinidade: null
        },
        "FOGOIO": {
            mensagem: "> DADO NÃO CATALOGADO ENCONTRADO.\n> APELIDO: [CLASSIFICADO]\n> B-M0: \"Esse... eu conheço esse nome.\"",
            conquista: { id: "CORUJA_VIU", nome: "A CORUJA VIU VOCÊ", icone: "🦉", descricao: "B-M0 reconheceu o nome." },
            afinidade: null
        },
        "NAT": {
            mensagem: "> N-27 RESPONDE AO CHAMADO.\n> ...",
            conquista: null,
            afinidade: null
        },
        "BIGODE": {
            mensagem: "> MEMÓRIA RECUPERADA: BAR DO BIGODE.\n> FRAGMENTO EMOCIONAL REGISTRADO.",
            conquista: null,
            afinidade: "Bar do Bigode"
        }
        ,
        "ARRAIA": {
            mensagem: "> REGISTRO RECENTE: Arraiá do Sesi (Junho/2026).\n> MEMÓRIA: Suco de laranja muito doce; duas pessoas no balanço; praça cheia de crianças.\n> Arquivo secundário liberado.",
            conquista: { id: "ARRAIA", nome: "🎉 ARRAIÁ DO SESI", icone: "🎉", descricao: "Registrou o Arraiá do Sesi — suco de laranja doce; duas pessoas no balanço; praça cheia de crianças." },
            afinidade: null
        }
        ,
        "PAOZINHO": {
            mensagem: "> DESEJO REGISTRADO: Pão quente ao amanhecer.\n> MEMÓRIA SENSÓRIA: Ansiedade doce, ritual matinal.\n> Arquivo secundário liberado.",
            conquista: { id: "PAOZINHO", nome: "PÃEZINHO", icone: "🥐", descricao: "Recuperou a memória do pãezinho fresco e do ritual matinal." },
            afinidade: null
        }
        ,
        "CACHORROS": {
            mensagem: "> AFEIÇÃO REGISTRADA: Animais domésticos — Fanny, Cacau, Aquiles.\n> MEMÓRIA: Rotinas de carinho, passeios e latidos gentis.\n> Arquivo secundário liberado.",
            conquista: { id: "CACHORROS", nome: "AMIGOS DE QUATRO PATAS", icone: "🐶", descricao: "Recuperou lembranças calorosas sobre animais domésticos." },
            afinidade: "Animais"
        }
    };

    function normalizeSenhaKey(raw) {
        if (!raw) return raw;
        const s = raw.toUpperCase().trim();
        // mapas especiais: aceitar variantes e normalizar para chave canônica
        if (s === 'ALIANÇA' || s === 'ALIANCA') return 'ALIANCA';
        if (/^20[\/.\-]?08$/.test(s) || s === '2008') return '2008';
        if (/^06[\/.\-]?12$/.test(s) || s === '0612') return '0612';
        if (s === '34') return '34';
        // aceitar variantes para liberar a memória do Arraiá (Sesi / Arraiá / Festa Junina)
        if (s.includes('SESI') || s.includes('ARRAI') || s.includes('FESTA')) return 'ARRAIA';
        // aceitar variantes para liberar a memória do pãezinho (pao, pão, paozinho)
        if (s.includes('PAO') || s.includes('PÃO') || s.includes('PAOZINHO')) return 'PAOZINHO';
        // aceitar variantes relacionadas a cachorros / cães (cachorro, cachorros, fanny, cacau, aquiles)
        if (s.includes('CACH') || s.includes('CÃO') || s.includes('CAO') || s.includes('CACHORR')) return 'CACHORROS';
        return s;
    }

    function verificarSenhaSecreta(input) {
        const key = normalizeSenhaKey(input);
        const dados = senhasSecretas[key];
        if (!dados) return null;

        // registrar usando a chave canônica para consistência entre variantes
        registrarSenhaSecreta(key);

        if (dados.conquista) {
            addConquista(
                dados.conquista.id,
                dados.conquista.nome,
                dados.conquista.icone,
                dados.conquista.descricao
            );
        }

        if (dados.afinidade) {
            addAfinidade(dados.afinidade);
        }

        // Adicionar ao arquivo de arquivos secundários
        addColecao("documentos");

        return dados.mensagem;
    }

    // ─── Dados de Afinidades por Fita ──────────────────────────────

    const afinidadesPorFita = {
        1: "Piano",
        2: "Sushi",
        3: "Corujas",
        4: "Volterra",
        5: "Backrooms",
        6: "Mistério",
        7: "Observação",
        8: "Memórias"
    };

    function registrarConclusaoDeFita(numeroFita) {
        const afinidade = afinidadesPorFita[numeroFita];
        if (afinidade) {
            addAfinidade(afinidade);
        }
        addColecao("fitas");
        setProgresso(numeroFita + 1);
        // Mark a pending fragment challenge so the menu can present a terminal question
        try {
            localStorage.setItem('pending_fragment', JSON.stringify({ numeroFita: numeroFita, ts: Date.now() }));
        } catch (e) { /* ignore */ }
        try { window.dispatchEvent(new CustomEvent('estado:fitaConcluida', { detail: { numeroFita } })); } catch(e){}
    }

    // ─── Toast de notificação ──────────────────────────────────────

    function mostrarToast(mensagem) {
        // Só mostra se o DOM já carregou
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => mostrarToast(mensagem));
            return;
        }

        const toast = document.createElement("div");
        toast.className = "estado-toast";
        toast.textContent = mensagem;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add("visivel");
        });

        setTimeout(() => {
            toast.classList.remove("visivel");
            setTimeout(() => toast.remove(), 600);
        }, 3000);
    }

    function mostrarConquistaToast(icone, nome, descricao) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => mostrarConquistaToast(icone, nome, descricao));
            return;
        }

        const toast = document.createElement("div");
        toast.className = "conquista-toast";
        toast.innerHTML = `
            <span class="conquista-icone">${icone}</span>
            <div class="conquista-info">
                <div class="conquista-nome">${nome}</div>
                <div class="conquista-desc">${descricao}</div>
            </div>
        `;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add("visivel");
        });

        setTimeout(() => {
            toast.classList.remove("visivel");
            setTimeout(() => toast.remove(), 700);
        }, 4000);
    }

    // ─── Glitch de senha secreta ───────────────────────────────────

    function mostrarMensagemSecreta(mensagem) {
        const overlay = document.createElement("div");
        overlay.className = "senha-secreta-overlay";
        overlay.innerHTML = `<pre class="senha-secreta-texto">${mensagem}</pre>`;
        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.classList.add("visivel");
        });

        setTimeout(() => {
            overlay.classList.remove("visivel");
            setTimeout(() => overlay.remove(), 700);
        }, 4500);
    }

    // ─── Retorno público ───────────────────────────────────────────

    return {
        get,
        setProgresso,
        addAfinidade,
        addConquista,
        addFragmento,
        addColecao,
        verificarSenhaSecreta,
        registrarConclusaoDeFita,
        mostrarToast,
        mostrarMensagemSecreta
    };

})();
