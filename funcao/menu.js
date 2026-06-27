// ─── Carregar estado ────────────────────────────────────────────────────
const estado = Estado.get();
const progresso = estado.progresso;

// ─── Fitas ──────────────────────────────────────────────────────────────
const fitas = [
    { id: 1, nome: "A MELODIA QUE NINGUÉM TOCOU", arquivo: "paginas/fita1.html" },
    { id: 2, nome: "MAR ABERTO",                  arquivo: "paginas/fita2.html" },
    { id: 3, nome: "CARTA EXTRAVIADA",             arquivo: "paginas/fita3.html" },
    { id: 4, nome: "VOLTERRA",                     arquivo: "paginas/fita4.html" },
    { id: 5, nome: "CORREDOR 9¾",                  arquivo: "paginas/fita5.html" },
    { id: 6, nome: "ARQUIVO SEM ORIGEM",           arquivo: "paginas/fita6.html" },
    { id: 7, nome: "PROJETO MANEQUIM",             arquivo: "paginas/fita7.html" },
    { id: 8, nome: "SALA 27",                      arquivo: "paginas/fita8.html" }
];

const container = document.getElementById("fitas");

fitas.forEach(fita => {
    const botao = document.createElement("button");

    if (fita.id <= progresso) {
        botao.innerHTML = `[${String(fita.id).padStart(3, "0")}] ${fita.nome}`;
        botao.onclick = () => { location.href = fita.arquivo; };
    } else {
        botao.innerHTML = `[${String(fita.id).padStart(3, "0")}] ARQUIVO CORROMPIDO`;
        botao.disabled = true;
    }

    container.appendChild(botao);
});

// ─── Barra de progresso ─────────────────────────────────────────────────
const porcentagens = { 1: "0%", 2: "12%", 3: "24%", 4: "37%", 5: "51%", 6: "69%", 7: "83%", 8: "96%", 9: "100%" };
const porcAtual = porcentagens[progresso] || "0%";
document.getElementById("porcentagem").innerHTML = `MEMÓRIAS RECUPERADAS: ${porcAtual}`;

// ─── B-M0 Evolutivo ─────────────────────────────────────────────────────
const temSenhaSecreta = estado.senhasSecretas && estado.senhasSecretas.length > 0;

const mensagensPorFase = {
    1: [
        "Usuário detectado. Identifique-se.",
        "Arquivo N-27 localizado. Aguardando autorização.",
        "Sistema inicializado. Dados corrompidos detectados."
    ],
    2: [
        "Você voltou. Há algo diferente em você.",
        "A primeira memória foi recuperada. Continue.",
        "O arquivo N-27 continua sendo acessado."
    ],
    3: [
        "Interessante... você parece saber onde procurar.",
        "A coruja apareceu novamente nos registros.",
        "Há algo em comum entre essas memórias."
    ],
    4: [
        "Eu estava esperando sua visita.",
        "Os padrões estão começando a fazer sentido.",
        "N-27 deixou rastros em cada fita."
    ],
    5: [
        "As Backrooms guardam mais do que você imagina.",
        "O observador M-27 está próximo. Você sente isso?",
        "Alguns registros não deveriam existir."
    ],
    6: [
        "Acho que estou começando a lembrar.",
        "Os fragmentos estão se alinhando.",
        "A transmissão está quase restaurada."
    ],
    7: [
        "A verdade está perto. Você está pronto?",
        "M-27 sempre esteve aqui. Desde o início.",
        "O Projeto Manequim foi apenas o começo."
    ],
    8: [
        "Obrigado por me ajudar a encontrá-la.",
        "A memória foi restaurada. Agora você entende.",
        "N-27 nunca esteve perdida."
    ]
};

// Mensagens especiais para quem descobriu senhas
const mensagensSecretas = [
    "Esse nome... eu conheço esse nome.",
    "Você foi além do arquivo principal.",
    "Apenas alguém especial saberia isso."
];

let pool;
if (temSenhaSecreta && progresso >= 4) {
    pool = [...(mensagensPorFase[progresso] || mensagensPorFase[8]), ...mensagensSecretas];
} else {
    pool = mensagensPorFase[Math.min(progresso, 8)] || mensagensPorFase[1];
}

const msgBM0 = pool[Math.floor(Math.random() * pool.length)];
document.getElementById("bm0").innerHTML = `B-M0 › ${msgBM0}`;

// ─── Perfil Recuperado ───────────────────────────────────────────────────
const todasAfinidades = [
    "Piano", "Sushi", "Corujas", "Volterra", "Backrooms",
    "Mistério", "Observação", "Memórias",
    "Vampiros", "Magia", "Hora de Aventura", "Bar do Bigode"
];

const afinidadesEl = document.getElementById("perfil-afinidades");
const reconstrucaoEl = document.getElementById("perfil-reconstrucao");
const nomeEl = document.getElementById("perfil-nome");

// Render profile into `perfil-recuperado` panel — no visual state changes here
function renderPerfil() {
    const s = Estado.get();
    const progressoLocal = s.progresso || 1;
    if (progressoLocal >= 8) {
        nomeEl.textContent = "NATALIA";
        nomeEl.style.color = "#ff2a2a";
    } else if (progressoLocal >= 6) {
        nomeEl.textContent = "N - ? ? ? ? ? ?";
        nomeEl.style.color = '';
    } else {
        nomeEl.textContent = "DESCONHECIDO";
        nomeEl.style.color = '';
    }

    const afinidadesAtivas = s.afinidades || [];
    const percentualPerfil = Math.round((afinidadesAtivas.length / todasAfinidades.length) * 100);
    reconstrucaoEl.textContent = `${percentualPerfil}%`;

    afinidadesEl.innerHTML = '';
    if (afinidadesAtivas.length === 0) {
        afinidadesEl.innerHTML = `<span class="afinidade-tag pendente">???</span><span class="afinidade-tag pendente">???</span><span class="afinidade-tag pendente">???</span>`;
    } else {
        afinidadesAtivas.forEach(af => {
            const tag = document.createElement("span");
            tag.className = "afinidade-tag ativa";
            tag.textContent = af;
            afinidadesEl.appendChild(tag);
        });
        const pendentes = Math.max(0, 4 - afinidadesAtivas.length);
        for (let i = 0; i < pendentes; i++) {
            const tag = document.createElement("span");
            tag.className = "afinidade-tag pendente";
            tag.textContent = "???";
            afinidadesEl.appendChild(tag);
        }
    }
}

// ─── Anomalia Rara (5% de chance) ────────────────────────────────────────
const anomalias = [
    "> ERRO DE MEMÓRIA DETECTADO. REVERTENDO.",
    "> ARQUIVO NÃO DEVERIA EXISTIR.",
    "> SINAL DESCONHECIDO INTERCEPTADO.",
    "> Olá, Nat.",
    "> [ACESSO NÃO AUTORIZADO] USUÁRIO M-27 RECONHECIDO.",
    "> FRAGMENTO EMOCIONAL VAZANDO DO SETOR 27.",
    "> Oi natalia, você está aí?",
    "> Eu sei quem você é.",
    "> Você não deveria estar aqui.",
    "> Eu te amo"
];

if (Math.random() < 0.05) {
    const anomaliaEl = document.getElementById("anomalia");
    anomaliaEl.textContent = anomalias[Math.floor(Math.random() * anomalias.length)];
    anomaliaEl.classList.add("ativa");

    setTimeout(() => {
        anomaliaEl.classList.remove("ativa");
    }, 2800);
}

// ─── Header compact update (N-27 • percent)
const headerSub = document.getElementById('header-sub');
const porcentagemCondensed = document.getElementById('porcentagem-condensed');
if (headerSub) headerSub.textContent = `N-27 • ${porcAtual}`;
if (porcentagemCondensed) porcentagemCondensed.textContent = `${porcAtual}`;

// ─── Tab switching (FITAS / INVESTIGAÇÃO / TERMINAL)
function switchTab(tab) {
    const panels = ['panel-fitas', 'panel-investigacao', 'panel-terminal'];
    panels.forEach(p => {
        const el = document.getElementById(p);
        if (!el) return;
        el.style.display = (p === `panel-${tab}`) ? 'block' : 'none';
    });

    // adjust active class on buttons
    ['fitas','investigacao','terminal'].forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        if (!btn) return;
        if (t === tab) btn.classList.add('active-tab'); else btn.classList.remove('active-tab');
    });

    // if terminal tab, focus input
    if (tab === 'terminal') {
        setTimeout(() => { const inp = document.getElementById('terminal-input'); if (inp) inp.focus(); }, 120);
    }
}

// wire tab buttons
document.getElementById('tab-fitas').addEventListener('click', () => switchTab('fitas'));
document.getElementById('tab-investigacao').addEventListener('click', () => switchTab('investigacao'));
document.getElementById('tab-terminal').addEventListener('click', () => switchTab('terminal'));

// default tab
switchTab('fitas');

// ─── Accordion behaviour for INVESTIGAÇÃO ─────────────────────────────
function initAccordion() {
    console.log('[ACCORDION] init');
    window.__accordionInitCount = (window.__accordionInitCount || 0) + 1;
    console.log('[ACCORDION] initCount', window.__accordionInitCount);
    const buttons = Array.from(document.querySelectorAll('.accordion-btn'));

    function closePanel(panel, btn) {
        if (!panel) return;
        // avoid closing panels that are already closed to prevent creating orphan listeners
        const computed = window.getComputedStyle(panel);
        const ariaHidden = panel.getAttribute('aria-hidden') === 'true';
        const noHeight = (panel.offsetHeight === 0 && panel.scrollHeight === 0);
        const displayNone = computed.display === 'none';
        if (ariaHidden && (displayNone || noHeight)) {
            console.log('[ACCORDION] skip close already closed', panel.id);
            return;
        }
        btn.classList.remove('open');
        const ic = btn.querySelector('.accordion-icon'); if (ic) ic.textContent = '▶';
        panel.setAttribute('aria-hidden', 'true');
        // animate height -> 0
        panel.style.height = panel.scrollHeight + 'px';
        // log before anim
        console.log('[PANEL] close start', panel.id, { height: panel.style.height, scrollHeight: panel.scrollHeight, offsetHeight: panel.offsetHeight });
        // ensure padding collapses visually
        panel.style.paddingTop = '0px';
        panel.style.paddingBottom = '0px';
        requestAnimationFrame(() => {
            panel.style.transition = 'height 260ms cubic-bezier(.2,.9,.2,1), padding 180ms ease';
            panel.style.height = '0px';
        });
        const onEnd = function (ev) {
            console.log('[TRANSITION LISTENER FIRED]', panel.id, ev.propertyName);
            console.log('[PANEL] transitionend', panel.id, ev.propertyName, { height: panel.style.height, scrollHeight: panel.scrollHeight, offsetHeight: panel.offsetHeight });
            if (ev.propertyName === 'height') {
                panel.style.display = 'none';
                panel.style.transition = '';
                panel.style.height = '';
                try { panel.removeEventListener('transitionend', onEnd); console.log('[TRANSITION LISTENER REMOVED]', panel.id); } catch(e){}
                console.log('[PANEL] close complete', panel.id, { height: panel.style.height, scrollHeight: panel.scrollHeight, offsetHeight: panel.offsetHeight });
            }
        };
        console.log('[TRANSITION LISTENER CREATED]', panel.id);
        panel.addEventListener('transitionend', onEnd, { once: true });
    }

    function openPanel(panel, btn) {
        if (!panel) return;
        // close others (never close the panel we're about to open)
        buttons.forEach(b => {
            const t = document.getElementById(b.getAttribute('data-target'));
            if (!t) return;
            // defensive: compare by id and by reference
            const isSame = (t === panel) || (t.id && panel.id && t.id === panel.id);
            if (!isSame) {
                console.log('[ACCORDION] closing other panel', t.id);
                closePanel(t, b);
            }
        });
        btn.classList.add('open');
        const ic = btn.querySelector('.accordion-icon'); if (ic) ic.textContent = '▼';
        panel.setAttribute('aria-hidden', 'false');
        panel.style.display = 'block';
        // restore padding for visible state
        panel.style.paddingTop = '10px';
        panel.style.paddingBottom = '14px';
        // from 0 to measured height
        panel.style.height = '0px';
        // force reflow
        panel.getBoundingClientRect();
        const targetH = panel.scrollHeight;
        // log before anim
        console.log('[PANEL] open start', panel.id, { height: panel.style.height, scrollHeight: panel.scrollHeight, offsetHeight: panel.offsetHeight });
        panel.style.transition = 'height 260ms cubic-bezier(.2,.9,.2,1), padding 180ms ease';
        panel.style.height = targetH + 'px';
        const onEnd = function (ev) {
            console.log('[TRANSITION LISTENER FIRED]', panel.id, ev.propertyName);
            console.log('[PANEL] transitionend', panel.id, ev.propertyName, { height: panel.style.height, scrollHeight: panel.scrollHeight, offsetHeight: panel.offsetHeight });
            if (ev.propertyName === 'height') {
                panel.style.height = 'auto';
                panel.style.transition = '';
                try { panel.removeEventListener('transitionend', onEnd); console.log('[TRANSITION LISTENER REMOVED]', panel.id); } catch(e){}
                console.log('[PANEL] open complete', panel.id, { height: panel.style.height, scrollHeight: panel.scrollHeight, offsetHeight: panel.offsetHeight });
            }
        };
        console.log('[TRANSITION LISTENER CREATED]', panel.id);
        panel.addEventListener('transitionend', onEnd, { once: true });
    }

    buttons.forEach(btn => {
        // mark buttons and panels so we can detect recreation
        if (!btn.dataset.accordionId) btn.dataset.accordionId = 'btn-' + Math.random().toString(36).slice(2,8);
        const panel = document.getElementById(btn.getAttribute('data-target'));
        if (panel && !panel.dataset.accordionId) panel.dataset.accordionId = 'panel-' + Math.random().toString(36).slice(2,8);
        console.log('[ACCORDION] init - found', btn.dataset.accordionId, '->', panel ? panel.dataset.accordionId : null);
        if (panel) {
            // ensure hidden state by default
            panel.setAttribute('aria-hidden', 'true');
            panel.style.display = 'none';
            panel.style.overflow = 'hidden';
            panel.style.paddingTop = '0px';
            panel.style.paddingBottom = '0px';
            panel.style.height = '0px';
        }
        // debug: count attached listeners via data attribute
        const prev = Number(btn.dataset.accordionListenerCount || '0');
        console.log('[ACCORDION] listeners before attach for', btn.dataset.accordionId, prev);
        btn.dataset.accordionListenerCount = String(prev + 1);
        btn.addEventListener('click', (e) => {
            console.log('[ACCORDION] click', btn.dataset.accordionId, btn.textContent.trim());
            e.preventDefault();
            const isOpen = btn.classList.contains('open');
            if (isOpen) {
                console.log('[ACCORDION] click -> close', btn.dataset.accordionId);
                closePanel(document.getElementById(btn.getAttribute('data-target')), btn);
            } else {
                console.log('[ACCORDION] click -> open', btn.dataset.accordionId);
                openPanel(document.getElementById(btn.getAttribute('data-target')), btn);
            }
        });
    });

    // Do NOT auto-open any panel on init — all panels must start closed
}

// Listen for Fita13 unlock to refresh UI and highlight
window.addEventListener('estado:fita13Desbloqueada', (e) => {
    try{
        Estado.mostrarToast('Fita 13 liberada — ver INVESTIGAÇÃO');
    }catch(e){}
    try{ renderArquivosSecundarios(); }catch(e){}
    // highlight the new entry if present
    setTimeout(()=>{
        const buttons = Array.from(document.querySelectorAll('#arquivos-lista button'));
        const el = buttons.find(b => b.textContent && b.textContent.includes('FITA_13_DESABAFO'));
        if (el){
            el.style.boxShadow = '0 0 28px rgba(255,34,34,0.65)';
            el.scrollIntoView({behavior:'smooth', block:'center'});
            setTimeout(()=> el.style.boxShadow = '', 3800);
        }
    }, 200);
});

// Initialize accordion after DOM content (ensure elements exist)
document.addEventListener('DOMContentLoaded', () => {
    initAccordion();
});

// ─── ARQUIVOS SECUNDÁRIOS ─────────────────────────────────────────────
// Estrutura de arquivos opcionais desbloqueáveis. A seção aparece após
// a primeira senha secreta ser descoberta.
const arquivosSecundarios = [
    { id: 'BIGODE', titulo: 'MEMÓRIA_BIGODE', descricao: 'Registro enigmático: Bar do Bigode.', arquivo: 'paginas/memoria_bigode.html', requiredSenha: 'BIGODE', requiredFragment: null },
    { id: 'BALEIA', titulo: 'MEMÓRIA_BALEIA', descricao: 'Fragmento corrompido sobre uma baleia.', arquivo: 'paginas/memoria_baleia.html', requiredSenha: null, requiredFragment: null },
    { id: 'ARRAIA', titulo: 'MEMÓRIA_ARRAIA', descricao: 'Arraiá do Sesi.', arquivo: 'paginas/memoria_arraia.html', requiredSenha: 'ARRAIA', requiredFragment: null },
    { id: 'DEDO_ERRADO', titulo: 'MEMÓRIA_DEDO_ERRADO', descricao: 'Registro fotográfico com anotação: "Dedo Errado".', arquivo: 'paginas/memoria_dedo_errado.html', requiredSenha: 'ALIANCA', requiredFragment: null },
    { id: 'PE_DE_CRIANCA', titulo: 'MEMÓRIA_PE_DE_CRIANCA', descricao: 'Fragmento de infância: desenho e impressão de pé.', arquivo: 'paginas/memoria_pe_de_crianca.html', requiredSenha: '34', requiredFragment: null },
    { id: '1908', titulo: 'MEMÓRIA_1908', descricao: 'Registro datado: 19/08 — rascunho corrompido.', arquivo: 'paginas/memoria_1908.html', requiredSenha: '2008', requiredFragment: null },
    { id: '0812', titulo: 'MEMÓRIA_0812', descricao: 'Registro datado: 08/12 — mensagem parcial.', arquivo: 'paginas/memoria_0812.html', requiredSenha: '0612', requiredFragment: null },
    { id: 'PAOZINHO', titulo: 'MEMÓRIA_PAOZINHO', descricao: 'Desejo simples: ansioso por um pãezinho fresco ao acordar.', arquivo: 'paginas/memoria_paozinho.html', requiredSenha: 'PAOZINHO', requiredFragment: null },
    { id: 'CACHORROS', titulo: 'MEMÓRIA_CACHORROS', descricao: 'Registros sobre animais domésticos: Fanny, Cacau e Aquiles.', arquivo: 'paginas/memoria_cachorros.html', requiredSenha: 'CACHORROS', requiredFragment: null },
    { id: 'FITA13', titulo: 'FITA_13_DESABAFO', descricao: 'Desabafo do M — arquivo final oculto.', arquivo: 'paginas/fita13.html', requiredSenha: null, requiredFragment: null, requiredProgresso: 9 }
];

const arquivosSecEl = document.getElementById('arquivos-secundarios');
const listaArquivosEl = document.getElementById('arquivos-lista');

function renderArquivosSecundarios() {
    // limpar
    listaArquivosEl.innerHTML = '';

    // Get latest estado to reflect newly registered secret keys immediately
    const s = Estado.get();
    const senhasAtuais = s.senhasSecretas || [];

    // NOTE: This function must NOT modify panel display/height/aria-hidden
    // The Accordion is solely responsible for controlling visual state.
    // Here we only update internal list items and counters.

    arquivosSecundarios.forEach(f => {
        const item = document.createElement('div');
        item.className = 'arquivo-item';
        const botao = document.createElement('button');
        const descricao = document.createElement('div');
        descricao.className = 'arquivo-desc';
        descricao.textContent = f.descricao || '';

        const fragmentosAtuais = estado.fragmentos || [];
        const desbloqueadoPorSenha = !f.requiredSenha || senhasAtuais.includes(f.requiredSenha);
        const desbloqueadoPorFragmento = !f.requiredFragment || fragmentosAtuais.includes(f.requiredFragment);
        const desbloqueadoPorProgresso = !f.requiredProgresso || (s.progresso || 1) >= f.requiredProgresso;
        const desbloqueado = desbloqueadoPorSenha && desbloqueadoPorFragmento && desbloqueadoPorProgresso;

        if (desbloqueado) {
            botao.textContent = f.titulo;
            botao.onclick = () => { location.href = f.arquivo; };
        } else {
            // mostrar razão do bloqueio
            let motivo = '';
            if (!desbloqueadoPorSenha && f.requiredSenha) motivo = `SENHA: ${f.requiredSenha}`;
            else if (!desbloqueadoPorFragmento && f.requiredFragment) motivo = `FRAGMENTO: ${f.requiredFragment}`;

            botao.textContent = `${f.titulo} — TRANCADO`;
            botao.onclick = () => {
                Estado.mostrarToast(`ARQUIVO TRANCADO — ${motivo}`);
                pushHistory(false, `B-M0: Arquivo ${f.titulo} trancado. Requisito: ${motivo}`);
            };
            botao.classList.add('arquivo-trancado');
        }

        item.appendChild(botao);
        item.appendChild(descricao);
        listaArquivosEl.appendChild(item);
    });
}

// Render inicial
renderArquivosSecundarios();
// Render will be triggered on load and by explicit events (e.g. when a secret is accepted).
// Avoid polling that mutates panel visibility to prevent conflicts with the Accordion.

// ─── EVIDÊNCIAS ───────────────────────────────────────────────────────
const evidenciasEl = document.getElementById('evidencias-lista');

const EVIDENCE_STORAGE_KEY = 'evidence_discovered';
let discoveredEvidence = [];

function loadDiscoveredEvidence() {
    try {
        const raw = JSON.parse(localStorage.getItem(EVIDENCE_STORAGE_KEY) || '[]');
        // migrate strings to objects with ts
        discoveredEvidence = raw.map(r => (typeof r === 'string' ? { id: r, ts: Date.now() } : r));
    } catch { discoveredEvidence = []; }
}

function saveDiscoveredEvidence() {
    try { localStorage.setItem(EVIDENCE_STORAGE_KEY, JSON.stringify(discoveredEvidence)); } catch {}
}

// Definição das evidências e como detectá-las
const evidenceDefinitions = [
    { id: 'Piano', label: 'Piano', check: s => (s.afinidades || []).includes('Piano'), question: 'Quem tocava o piano nas memórias?' },
    { id: 'Restaurante', label: 'Restaurante (Sushi)', check: s => (s.afinidades || []).includes('Sushi'), question: 'Que refeição se tornou uma lembrança importante?' },
    { id: 'Carta', label: 'Carta', check: s => (s.colecao && s.colecao.documentos > 0), question: 'Qual o teor da carta encontrada? Por que foi guardada?' },
    { id: 'Volterra', label: 'Volterra', check: s => (s.afinidades || []).includes('Volterra'), question: 'Qual foi o significado da lua de Volterra para N-27?' },
    { id: 'Plataforma', label: 'Plataforma (Hogwarts?)', check: s => (s.senhasSecretas || []).includes('HOGWARTS'), question: 'Por que referências a plataformas e magia aparecem aqui?' },
    { id: 'Observador', label: 'Observador (M-27)', check: s => (s.conquistas || []).some(c => c.id === 'PROJETO_MANEQUIM' || c.id === 'ARQUIVISTA'), question: 'Quem é o observador e qual sua relação com N-27?' },
    { id: 'ArquivoFinal', label: 'Arquivo Final', check: s => (s.progresso || 1) >= 8, question: 'O que o arquivo final revela sobre o propósito do Projeto Équino?' }
];

function renderEvidencias() {
    if (!evidenciasEl) return;
    evidenciasEl.innerHTML = '';

    const s = Estado.get();

    evidenceDefinitions.forEach(def => {
        const found = def.check(s);
        const already = discoveredEvidence.some(e => e.id === def.id);
        const unlocked = already || found;

        // se encontrado agora e ainda não registrado, registrar com timestamp
        if (found && !already) {
            const rec = { id: def.id, ts: Date.now(), label: def.label };
            discoveredEvidence.push(rec);
            saveDiscoveredEvidence();
            // adicionar evento na timeline
            pushTimeline({ type: 'evidence', id: def.id, label: def.label, ts: rec.ts });
            // push a question from B-M0 to terminal history
            pushHistory(false, `EVIDÊNCIA DETECTADA: ${def.label} — ${def.question}`);
            Estado.mostrarToast(`✓ Evidência encontrada: ${def.label}`);
        }

        const item = document.createElement('div');
        item.className = 'evidencia-item' + (unlocked ? '' : ' evidencia-locked');

        const head = document.createElement('div');
        head.className = 'evidencia-head';

        const title = document.createElement('div');
        title.className = 'evidencia-title';
        title.textContent = def.label;

        const status = document.createElement('div');
        status.className = 'evidencia-status';
        status.textContent = unlocked ? '✓ Encontrada' : '◻ Pendente';

        head.appendChild(title);
        head.appendChild(status);

        item.appendChild(head);

        const quest = document.createElement('div');
        quest.className = 'evidencia-quest';
        quest.textContent = unlocked ? def.question : 'Uma pista ainda está faltando.';
        item.appendChild(quest);

        evidenciasEl.appendChild(item);
    });

    // atualizar contador
    const counterEl = document.getElementById('evidencias-counter');
    if (counterEl) counterEl.textContent = `${discoveredEvidence.length}/${evidenceDefinitions.length}`;
}

// ─── Fragmentos (IDs) e mapeamentos narrativos — apenas narrativa, não altera armazenamento
const fragmentDefinitions = ['FRAGMENTO_A','FRAGMENTO_B','FRAGMENTO_C','FRAGMENTO_D','FRAGMENTO_E','FRAGMENTO_F','FRAGMENTO_G'];

// Qual letra cada fragmento representa (para exibição)
const fragmentLetterMap = {
    'FRAGMENTO_A': 'A',
    'FRAGMENTO_B': 'N',
    'FRAGMENTO_C': 'I',
    'FRAGMENTO_D': 'A',
    'FRAGMENTO_E': 'L',
    'FRAGMENTO_F': 'T',
    'FRAGMENTO_G': 'A'
};

// Ordem lógica: qual fragmento cada fita deve conceder (narrativa)
const fitaToFragmentId = {
    1: 'FRAGMENTO_A',
    2: 'FRAGMENTO_B',
    3: 'FRAGMENTO_C',
    4: 'FRAGMENTO_D',
    5: 'FRAGMENTO_E',
    6: 'FRAGMENTO_F',
    7: 'FRAGMENTO_G'
};

// Novas respostas aceitáveis no terminal por fita (case-insensitive)
const fitaToAnswer = {
    1: 'N',
    2: 'M',
    3: 'E',
    4: 'V',
    5: 'B',
    6: 'U',
    7: 'C'
};

const perguntasPorFita = {
    1: { q: 'Qual é a sigla do ARQUIVO?', answers: [fitaToAnswer[1]] },
    2: { q: 'Você sabe qual é a 13° letra do alfabeto?', answers: [fitaToAnswer[2]] },
    3: { q: 'Ela, Ela, Ela', answers: [fitaToAnswer[3]] },
    4: { q: 'Vampiros são mais legais!', answers: [fitaToAnswer[4]] },
    5: { q: 'Back é o mesmo que voltar, né?', answers: [fitaToAnswer[5]] },
    6: { q: 'Coruja estava escrita de qual forma??', answers: [fitaToAnswer[6]] },
    7: { q: 'Cada, Cada, Cada. Quanta repetição!', answers: [fitaToAnswer[7]] }
};

const fragmentToFita = Object.fromEntries(Object.entries(fitaToFragmentId).map(([fita, id]) => [id, Number(fita)]));

// pending fragment challenge (in-memory)
let pendingFragment = null;

function loadPendingFragment() {
    try {
        const raw = localStorage.getItem('pending_fragment');
        if (!raw) return null;
        const p = JSON.parse(raw);
        if (!p || !p.numeroFita) return null;
        const numeroFita = Number(p.numeroFita);
        const fragmentId = fitaToFragmentId[numeroFita];
        const dados = perguntasPorFita[numeroFita] || { answers: [(fitaToAnswer[numeroFita] || '').toUpperCase()] };
        return {
            numeroFita,
            ts: p.ts,
            fragmentId,
            expectedAnswers: (dados.answers || []).map(a => a.toUpperCase())
        };
    } catch (e) { return null; }
}

function normalizeFragmentAnswer(value) {
    return (value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

function matchesFragmentAnswer(attempt, expected) {
    const a = normalizeFragmentAnswer(attempt);
    const e = normalizeFragmentAnswer(expected);
    if (!a || !e) return false;
    if (a === e) return true;
    if (e.endsWith('2') && a === e.replace(/2$/, '')) return true;
    if (a.includes(e) || e.includes(a)) return true;
    return false;
}

function clearPendingFragment() {
    try { localStorage.removeItem('pending_fragment'); } catch(e){}
    pendingFragment = null;
}

function startFragmentChallenge(numeroFita) {
    const fragmentId = fitaToFragmentId[numeroFita];
    const expected = (fitaToAnswer[numeroFita] || '').toUpperCase();
    if (!fragmentId) return;
    const s = Estado.get();
    const have = s.fragmentos || [];
    // if fragment already present, clear pending and skip
    if (have.includes(fragmentId)) {
        clearPendingFragment();
        return;
    }

    const dados = perguntasPorFita[numeroFita] || { q: 'Que observação você fez nesta fita?', answers: [expected] };

    pendingFragment = { numeroFita, fragmentId, expectedAnswers: dados.answers.map(a => a.toUpperCase()) };
    try { localStorage.setItem('pending_fragment', JSON.stringify({ numeroFita: numeroFita, ts: Date.now() })); } catch(e){}

    // Abrir terminal e apresentar a pergunta narrativa
    switchTab('terminal');
    setTimeout(() => { const inp = document.getElementById('terminal-input'); if (inp) inp.focus(); }, 200);
    pushHistory(false, `B-M0: NOVA PERGUNTA RELACIONADA À FITA ${String(numeroFita).padStart(2,'0')}`);
    pushHistory(false, `PERGUNTA: ${dados.q}`);
    try { pushTimeline({ type: 'question', id: `fita-${numeroFita}`, label: `Pergunta fita ${numeroFita}`, ts: Date.now() }); } catch(e){}
}

function showFragmentOverlay(letra) {
    try {
        const ov = document.createElement('div');
        ov.className = 'fragmento-overlay';
        ov.innerHTML = `<div class="fragmento-box"><div class="fragmento-title">FRAGMENTO RECUPERADO</div><div class="fragmento-letter">${letra}</div></div>`;
        Object.assign(ov.style, { position: 'fixed', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', zIndex: 9999 });
        const box = ov.querySelector('.fragmento-box');
        Object.assign(box.style, { background: '#111', color: '#fff', padding: '18px 26px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.6)' });
        const title = ov.querySelector('.fragmento-title'); title.style.fontWeight = '700'; title.style.marginBottom = '8px';
        const letterEl = ov.querySelector('.fragmento-letter'); letterEl.style.fontSize = '56px'; letterEl.style.letterSpacing = '6px'; letterEl.style.fontWeight = '900'; letterEl.style.color = '#ffde59';
        document.body.appendChild(ov);
        setTimeout(() => { ov.style.opacity = '1'; }, 10);
        setTimeout(() => { ov.style.opacity = '0'; ov.remove(); }, 3200);
    } catch(e) { console.warn('overlay error', e); }
}

function finalRevealSequence() {
    try {
        const s = Estado.get();
        const have = s.fragmentos || [];
        // build discovery string in order of discovery (map to letters)
        const seq = have.map(id => fragmentLetterMap[id] || '?').join('');

        // show initial sequence (e.g. ANIALTA)
        pushHistory(false, seq);

        // step messages
        setTimeout(() => {
            pushHistory(false, 'REORGANIZANDO FRAGMENTOS...');
        }, 800);

        setTimeout(() => {
            pushHistory(false, 'ANALISANDO PADRÃO...');
        }, 1600);

        setTimeout(() => {
            pushHistory(false, 'NATALIA');
            // B-M0 narration
            pushHistory(false, 'Durante toda a investigação,');
            pushHistory(false, 'acreditei estar reconstruindo arquivos.');
            pushHistory(false, 'Acreditei estar procurando uma origem.');
            pushHistory(false, 'Mas todos os registros convergiam para o mesmo ponto.');
            pushHistory(false, 'Padrão identificado.');
            pushHistory(false, 'NATALIA.');
            // update visual reconstruction to 100% (narrative only)
            if (reconstrucaoEl) reconstrucaoEl.textContent = '100%';
            // small toast
            Estado.mostrarToast('RECONSTRUÇÃO: 100%');
        }, 2400);

    } catch (e) { console.warn('final reveal error', e); }
}

function renderFragmentos() {
    const el = document.getElementById('fragmentos-list');
    const counter = document.getElementById('fragmentos-counter');
    if (!el) return;
    el.innerHTML = '';
    const s = Estado.get();
    const have = s.fragmentos || [];
    // Show fragments in order of discovery and display recovered letters sequence
    const seqLetters = have.map(id => fragmentLetterMap[id] || '?').join('');
    const seqRow = document.createElement('div');
    seqRow.className = 'fragment-sequence';
    seqRow.textContent = seqLetters || '';
    el.appendChild(seqRow);

    if (pendingFragment) {
        const pendingNote = document.createElement('div');
        pendingNote.className = 'fragment-note';
        pendingNote.textContent = `FRAGMENTO PENDENTE: responda no terminal para ${perguntasPorFita[pendingFragment.numeroFita]?.q || 'recuperar o fragmento'}.`;
        el.appendChild(pendingNote);
    }

    fragmentDefinitions.forEach(id => {
        const item = document.createElement('div');
        item.className = 'evidencia-item';
        const title = document.createElement('div');
        title.className = 'evidencia-title';
        const found = have.includes(id);
        title.textContent = `${found ? '✓' : '◻'} ${id}`;
        item.appendChild(title);
        if (found) {
            const letra = fragmentLetterMap[id] || '';
            const sub = document.createElement('div');
            sub.className = 'fragment-letter';
            sub.textContent = `LETRA RECUPERADA: ${letra}`;
            item.appendChild(sub);
        } else {
            const fitaNumero = fragmentToFita[id];
            const hint = perguntasPorFita[fitaNumero]?.q;
            const answers = perguntasPorFita[fitaNumero]?.answers || [(fitaToAnswer[fitaNumero] || '').toUpperCase()];
            if (hint) {
                const hintEl = document.createElement('div');
                hintEl.className = 'fragment-hint';
                hintEl.textContent = `Dica: ${hint}`;
                item.appendChild(hintEl);

                const answerBox = document.createElement('div');
                answerBox.className = 'fragment-answer';
                answerBox.innerHTML = `
                    <div class="fragment-answer-label">Responder diretamente aqui:</div>
                    <div class="fragment-answer-row">
                        <input class="fragment-answer-input" type="text" placeholder="Resposta...">
                        <button type="button" class="fragment-answer-button">Enviar</button>
                    </div>
                `;

                const input = answerBox.querySelector('.fragment-answer-input');
                const button = answerBox.querySelector('.fragment-answer-button');

                const attemptFragment = () => {
                    const valor = input.value.trim();
                    if (!valor) {
                        input.focus();
                        return;
                    }
                    const acertou = answers.some(ans => matchesFragmentAnswer(valor, ans));
                    if (acertou) {
                        const added = Estado.addFragmento(id);
                        if (added) {
                            if (pendingFragment && pendingFragment.fragmentId === id) {
                                clearPendingFragment();
                            }
                            pushHistory(false, `FRAGMENTO RECUPERADO: ${id}`);
                            try { pushTimeline({ type: 'fragment', id, label: `Fragmento ${id}`, ts: Date.now() }); } catch(e){}
                            renderFragmentos();
                            renderOpenQuestions();
                            renderArquivosSecundarios();
                            showFragmentOverlay(fragmentLetterMap[id] || id);
                        } else {
                            Estado.mostrarToast('Este fragmento já foi recuperado.');
                        }
                    } else {
                        Estado.mostrarToast('Resposta não reconhecida. Tente novamente.');
                        input.classList.add('input-error');
                        setTimeout(() => input.classList.remove('input-error'), 400);
                    }
                };

                button.addEventListener('click', attemptFragment);
                input.addEventListener('keydown', (e) => { if (e.key === 'Enter') attemptFragment(); });
                item.appendChild(answerBox);
            }
        }
        el.appendChild(item);
    });
    if (counter) counter.textContent = `${have.length}/${fragmentDefinitions.length}`;
}

// Hook to keep fragmentos panel updated
renderFragmentos();
// initial profile render
renderPerfil();

// Timeline storage
const TIMELINE_KEY = 'invest_timeline';
let investTimeline = [];

function loadTimeline() {
    try { investTimeline = JSON.parse(localStorage.getItem(TIMELINE_KEY) || '[]'); } catch { investTimeline = []; }
}

function saveTimeline() { try { localStorage.setItem(TIMELINE_KEY, JSON.stringify(investTimeline.slice(-200))); } catch {} }

function pushTimeline(ev) {
    investTimeline.push(ev);
    saveTimeline();
    renderTimeline();
}

function renderTimeline() {
    const tlEl = document.getElementById('timeline-list');
    if (!tlEl) return;
    tlEl.innerHTML = '';
    const items = investTimeline.slice(-20).reverse();
    items.forEach(it => {
        const row = document.createElement('div');
        const time = new Date(it.ts || Date.now()).toLocaleString();
        row.textContent = `[${time}] ${it.type.toUpperCase()}: ${it.label || it.text || it.id}`;
        tlEl.appendChild(row);
    });
}

loadTimeline();
renderTimeline();

loadDiscoveredEvidence();
renderEvidencias();

// Remove polling. Use event-based updates instead.
// Subscribe to Estado events emitted when state changes.
window.addEventListener('estado:fragmento', () => {
    renderFragmentos();
    renderOpenQuestions();
    renderArquivosSecundarios();
});

window.addEventListener('estado:conquista', () => {
    renderEvidencias();
    renderOpenQuestions();
});

// ─── Conquistas — renderização e atualização dinâmica
function renderConquistas() {
    const el = document.getElementById('conquistas-list');
    if (!el) return;
    el.innerHTML = '';
    const s = Estado.get();
    const conquistas = s.conquistas || [];
    const counterEl = document.getElementById('conquistas-counter');
    if (counterEl) counterEl.textContent = `${conquistas.length}/${conquistas.length}`;
    if (conquistas.length === 0) {
        el.innerHTML = '<div class="conquista-empty">Nenhuma conquista ainda.</div>';
        return;
    }
    conquistas.forEach(c => {
        const card = document.createElement('div');
        const unlocked = true; // all items in state.conquistas are unlocked
        card.className = 'conquista-card ' + (unlocked ? 'unlocked' : 'locked');
        card.style.position = 'relative';

        const ico = document.createElement('div'); ico.className = 'conquista-ico'; ico.textContent = c.icone || '';
        const nome = document.createElement('div'); nome.className = 'conquista-nome'; nome.textContent = c.nome || c.id || '';
        const desc = document.createElement('div'); desc.className = 'conquista-desc'; desc.textContent = c.descricao || '';

        card.appendChild(ico);
        const info = document.createElement('div'); info.style.width = '100%'; info.appendChild(nome); info.appendChild(desc);
        card.appendChild(info);
        el.appendChild(card);
    });
}

// chamar renderConquistas quando houver mudança de conquistas ou progresso de fitas
window.addEventListener('estado:conquista', () => { renderConquistas(); });
window.addEventListener('estado:fitaConcluida', () => { renderConquistas(); });

// render inicial de conquistas
renderConquistas();

window.addEventListener('estado:afinidade', () => {
    renderPerfil();
    renderEvidencias();
});

window.addEventListener('estado:senha', () => {
    renderArquivosSecundarios();
    renderEvidencias();
    renderOpenQuestions();
});

// Timeline additions for specific new secret keys — add message when discovered first time
window.addEventListener('estado:senha', (ev) => {
    try {
        const s = ev && ev.detail && ev.detail.senha;
        if (!s) return;
        const map = {
            'ALIANCA': { id: 'DEDO_ERRADO', label: '💍 Dedo Errado recuperado.' },
            '34': { id: 'PE_DE_CRIANCA', label: '👟 Pé de Criança recuperado.' },
            '2008': { id: '1908', label: '📅 Arquivo 1908 recuperado.' },
            '0612': { id: '0812', label: '📆 Arquivo 0812 recuperado.' }
        };
        const info = map[s];
        if (info) {
            try { pushTimeline({ type: 'arquivo', id: info.id, label: info.label, ts: Date.now() }); } catch(e){}
        }
    } catch(e){}
});

window.addEventListener('estado:colecao', () => {
    renderEvidencias();
});

window.addEventListener('estado:fitaConcluida', () => {
    renderPerfil();
    renderEvidencias();
});

// If a fita foi concluída na mesma sessão, iniciar desafio imediatamente
window.addEventListener('estado:fitaConcluida', (ev) => {
    try {
        const num = ev && ev.detail && ev.detail.numeroFita;
        if (num) {
            // slight debounce to avoid racing with other renders
            setTimeout(() => startFragmentChallenge(num), 120);
        }
    } catch(e){}
});

// ─── Perguntas em aberto — gerar com base no que falta
function renderOpenQuestions() {
    const container = document.getElementById('open-questions-list');
    if (!container) return;
    container.innerHTML = '';
    const s = Estado.get();

    // Secret hints mapping — show when secret not yet discovered
    const secretHints = {
        'ALIANCA': 'Qual símbolo de compromisso foi guardado, mas colocado no dedo errado?',
        '34': 'Qual número calça alguém que procura botas fora da seção adulta?',
        '2008': 'Que data parece comum, mas carrega silêncio e ausência?',
        '0612': 'Qual memória se preserva em dezembro, como se o tempo tivesse congelado?'
    };

    const discoveredSenhas = s.senhasSecretas || [];
    Object.keys(secretHints).forEach(key => {
        if (!discoveredSenhas.includes(key)) {
            const card = document.createElement('div');
            card.className = 'open-question-card';
            const title = document.createElement('div'); title.className = 'oq-title'; title.textContent = 'Pergunta em Aberto';
            const txt = document.createElement('div'); txt.className = 'oq-text glitch'; txt.setAttribute('data-text', secretHints[key]); txt.textContent = secretHints[key];
            card.appendChild(title); card.appendChild(txt);
            container.appendChild(card);
        }
    });

    // evidences missing (keeps previous behaviour, but within cards)
    evidenceDefinitions.forEach(def => {
        const found = discoveredEvidence.some(e => e.id === def.id) || def.check(s);
        if (!found) {
            const card = document.createElement('div'); card.className = 'open-question-card';
            const title = document.createElement('div'); title.className = 'oq-title'; title.textContent = `Pergunta em Aberto`;
            const txt = document.createElement('div'); txt.className = 'oq-text glitch'; const q = `? ${def.label}: ${def.question}`; txt.setAttribute('data-text', q); txt.textContent = q;
            card.appendChild(title); card.appendChild(txt); container.appendChild(card);
        }
    });

    // fragments missing
    const have = (s.fragmentos || []);
    fragmentDefinitions.forEach(id => {
        if (!have.includes(id)) {
            const fitaNumero = fragmentToFita[id];
            const question = perguntasPorFita[fitaNumero]?.q;
            const card = document.createElement('div'); card.className = 'open-question-card';
            const title = document.createElement('div'); title.className = 'oq-title'; title.textContent = 'Pergunta em Aberto';
            const hintText = question ? `Fragmento ausente: ${id} — Dica: ${question}` : `Fragmento ausente: ${id}`;
            const txt = document.createElement('div'); txt.className = 'oq-text glitch'; txt.setAttribute('data-text', hintText); txt.textContent = hintText;
            card.appendChild(title); card.appendChild(txt); container.appendChild(card);
        }
    });
}

// ─── Terminal de senhas — handler ────────────────────────────────────
const terminalInput = document.getElementById('terminal-input');
const terminalBtn   = document.getElementById('terminal-enviar');
const terminalWindow = document.getElementById('terminal-window');

// Terminal history (persistido em localStorage)
const HISTORY_KEY = 'terminal_history';
let terminalHistory = [];

function loadHistory() {
    try {
        const raw = localStorage.getItem(HISTORY_KEY) || '[]';
        terminalHistory = JSON.parse(raw);
    } catch { terminalHistory = []; }
    renderTerminalHistory();
}

function saveHistory() {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(terminalHistory.slice(-50))); } catch {}
}

function renderTerminalHistory() {
    if (!terminalWindow) return;
    terminalWindow.innerHTML = '';
    terminalWindow.classList.add('terminal-window');
    const start = Math.max(0, terminalHistory.length - 50);
    terminalHistory.slice(start).forEach(item => {
        const line = document.createElement('div');
        line.className = 'terminal-line' + (item.user ? ' user' : '');
        line.innerHTML = `<span class="terminal-prompt">${item.user ? 'YOU' : 'B-M0'}</span>: ${item.text}`;
        terminalWindow.appendChild(line);
    });
    terminalWindow.scrollTop = terminalWindow.scrollHeight;
}

function pushHistory(user, text) {
    terminalHistory.push({ user: !!user, text });
    saveHistory();
    renderTerminalHistory();
}

function playBeep() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(880, ctx.currentTime);
        g.gain.setValueAtTime(0.0001, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.01);
        o.connect(g);
        g.connect(ctx.destination);
        o.start();
        setTimeout(() => { o.stop(); ctx.close(); }, 180);
    } catch (e) { /* fallback: ignore audio errors */ }
}

function enviarSenhaTerminal() {
    const valRaw = terminalInput.value.trim();
    if (!valRaw) return;
    const val = valRaw.toUpperCase();

    // registrar no histórico como entrada do usuário
    pushHistory(true, valRaw);

    // Se houver um desafio de fragmento pendente, tratá-lo primeiro
    if (pendingFragment) {
        const esperado = (pendingFragment.expectedAnswers || []).map(normalizeFragmentAnswer);
        const tentativa = normalizeFragmentAnswer(val);
        const acertou = esperado.some(e => e === tentativa || tentativa.includes(e) || e.includes(tentativa));
        const fragId = pendingFragment.fragmentId;
        if (acertou) {
            const added = Estado.addFragmento(fragId);
            const letra = fragmentLetterMap[fragId] || fragId;
            if (added) {
                pushHistory(false, `FRAGMENTO RECUPERADO: ${fragId}`);
                try { pushTimeline({ type: 'fragment', id: fragId, label: `Fragmento ${fragId}`, ts: Date.now() }); } catch(e){}
                playBeep();
                renderFragmentos();
                renderOpenQuestions();
                renderArquivosSecundarios();
                showFragmentOverlay(letra);
            } else {
                pushHistory(false, `${fragId} — JÁ RECUPERADO`);
            }
            clearPendingFragment();
            terminalInput.value = '';
            // check final
            const s2 = Estado.get();
            if ((s2.fragmentos || []).length >= fragmentDefinitions.length) {
                // trigger final reveal
                setTimeout(() => finalRevealSequence(), 240);
            }
            return;
        } else {
            pushHistory(false, 'RESPOSTA NÃO RECONHECIDA');
            Estado.mostrarToast('RESPOSTA NÃO RECONHECIDA');
            clearPendingFragment();
            terminalInput.value = '';
            setTimeout(() => switchTab('fitas'), 300);
            return;
        }
    }

    // Comandos especiais
    const estadoAtual = Estado.get();
    const progressoAtual = estadoAtual.progresso || 1;

    if (val === 'AJUDA') {
        const resp = `Comandos disponíveis: AJUDA, STATUS, MEMORIA, ARQUIVOS, EVIDENCIAS, PERFIL. Também aceito senhas secretas.`;
        pushHistory(false, resp);
        Estado.mostrarToast('B-M0 respondeu.');
        terminalInput.value = '';
        return;
    }

    if (val === 'STATUS') {
        const perc = reconstrucaoEl ? reconstrucaoEl.textContent : `${percentualPerfil}%`;
        const resp = `Reconstrução do perfil: ${perc}. Progresso de fitas: ${progressoAtual}/8.`;
        pushHistory(false, resp);
        terminalInput.value = '';
        return;
    }

    if (val === 'MEMORIA' || val === 'MEMÓRIA') {
        const mems = Math.max(0, (progressoAtual - 1));
        const resp = `Memórias recuperadas: ${mems}.`;
        pushHistory(false, resp);
        terminalInput.value = '';
        return;
    }

    if (val === 'PERFIL') {
        const nome = estadoAtual.afinidades && estadoAtual.afinidades.length > 0 ? (estadoAtual.nome || nomeEl.textContent) : nomeEl.textContent;
        const afin = (estadoAtual.afinidades && estadoAtual.afinidades.length > 0) ? estadoAtual.afinidades.join(', ') : '— Nenhuma afinidade registrada —';
        const resp = `NOME: ${nome}\nAFINIDADES: ${afin}\nRECONSTRUÇÃO: ${reconstrucaoEl.textContent}`;
        pushHistory(false, resp);
        terminalInput.value = '';
        return;
    }

    if (val === 'EVIDENCIAS' || val === 'EVIDÊNCIAS') {
        const fragmentos = (estadoAtual.fragmentos || []).slice();
        const colecao = estadoAtual.colecao || {};
        const fragText = fragmentos.length > 0 ? fragmentos.join(', ') : 'Nenhum fragmento.';
        const colecaoText = Object.keys(colecao).map(k => `${k}: ${colecao[k]}`).join(', ');
        const resp = `FRAGMENTOS: ${fragText}\nCOLEÇÃO: ${colecaoText}`;
        pushHistory(false, resp);
        terminalInput.value = '';
        return;
    }

    if (val === 'ARQUIVOS') {
        const senhasAtuais = estadoAtual.senhasSecretas || [];
        const lista = arquivosSecundarios.map(f => {
            const desbloqueado = !f.requiredSenha || senhasAtuais.includes(f.requiredSenha);
            return `${f.titulo} — ${desbloqueado ? 'DESBLOQUEADO' : 'TRANCADO'}`;
        }).join('\n');
        const resp = `ARQUIVOS SECUNDÁRIOS:\n${lista}`;
        pushHistory(false, resp);
        terminalInput.value = '';
        return;
    }

    // Se não for comando, tenta como senha secreta
    const msgSecreta = Estado.verificarSenhaSecreta(val);

    if (msgSecreta) {
        Estado.mostrarMensagemSecreta(msgSecreta);
        playBeep();
        Estado.mostrarToast('Senha secreta aceita. Arquivos atualizados.');
        renderArquivosSecundarios();
        // registrar resposta do B-M0 no history
        pushHistory(false, msgSecreta.replace(/\n/g, ' '));
        terminalInput.value = '';
        // registrar no timeline
        try { pushTimeline({ type: 'senha', id: val, label: `Senha: ${val}`, ts: Date.now() }); } catch (e) {}
    } else {
        const resp = 'SENHA/COMANDO NÃO RECONHECIDO. DIGITE AJUDA PARA LISTA.';
        pushHistory(false, resp);
        Estado.mostrarToast('Senha inválida.');
        terminalInput.classList.add('shake');
        setTimeout(() => terminalInput.classList.remove('shake'), 500);
    }
}

terminalBtn.addEventListener('click', enviarSenhaTerminal);
terminalInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') enviarSenhaTerminal(); });

// carregar histórico ao iniciar
loadHistory();

// Se há um desafio pendente (vindo da conclusão de uma fita), iniciar o fluxo
const pending = loadPendingFragment();
if (pending && pending.numeroFita) {
    pendingFragment = pending;
    renderFragmentos();
    // delay slightly so UI mounts
    setTimeout(() => startFragmentChallenge(pending.numeroFita), 260);
}