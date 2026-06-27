// Terminal B-M0 — motor imersivo com digitação fragmentada e efeitos de glitch
(function(){
    const windowEl = document.getElementById('terminal-window');
    const inputEl = document.getElementById('terminal-input');
    const btnEl = document.getElementById('terminal-enviar');
    const reconEl = document.getElementById('recon-percent');
    const imgEl = document.getElementById('bm0-img');

    const IMG_IDLE = '../Fotos/Bmonada.png';
    const IMG_TALK = '../Fotos/BMOfalante.png';
    // Background images for the living terminal.
    const BG1 = '../Fotos/Bmonada.png';
    const BG2 = '../Fotos/BMOfalante.png';

    const bgEl = document.getElementById('bm0-bg');

    function animateTalk(duration=700){
        const img = imgEl.querySelector('img');
        if(!img) return;
        // switch avatar image to talking and set talk visuals
        img.src = IMG_TALK;
        setTalk();
        // revert avatar and visuals after duration (default 2s if not provided)
        const d = duration || 2000;
        setTimeout(()=>{
            img.src = IMG_IDLE;
            setIdle();
        }, d);
    }

    function setIdle(){
        try{
            if (bgEl){ bgEl.style.backgroundImage = `url(${BG1})`; bgEl.style.opacity = '0.35'; bgEl.classList.remove('glitch-anim'); bgEl.style.transform = 'scale(1) translateY(0)'; }
        }catch(e){}
    }

    function setTalk(){
        try{
            if (bgEl){ bgEl.style.backgroundImage = `url(${BG2})`; bgEl.style.opacity = '0.6'; bgEl.style.transform = 'scale(1.02) translateY(-6px)'; bgEl.classList.remove('glitch-anim'); void bgEl.offsetWidth; bgEl.classList.add('glitch-anim'); }
        }catch(e){}
    }

    function glitchPulse(){
        windowEl.classList.add('glitch');
        setTimeout(()=> windowEl.classList.remove('glitch'), 220);
    }

    function getRecon(){
        const raw = localStorage.getItem('bm0_reconstrucao');
        if (!raw) return 73;
        return Math.min(100, Number(raw)||73);
    }
    function setRecon(v){
        const n = Math.max(0, Math.min(100, Math.round(v)));
        localStorage.setItem('bm0_reconstrucao', String(n));
        reconEl.textContent = n;
    }

    reconEl.textContent = getRecon();
    try{
        if (bgEl) { bgEl.style.backgroundImage = `url(${BG1})`; bgEl.style.opacity = '0.35'; }
        if (imgEl && imgEl.querySelector('img')) imgEl.querySelector('img').src = IMG_IDLE;
        // ensure consistent starting visuals
        setIdle();
        // also initialize on load
        window.addEventListener('load', setIdle);
    }catch(e){}

    // Base de respostas — respostas curtas, enigmáticas, ligadas ao projeto
    const respostas = {
        // Projeto e nomes
        "o que é o projeto equino": "Projeto Equino: um repositório de memórias vestido de experimento. O nome vem de um cavalo chamado James Basxter—uma lembrança que virou rótulo; metáfora para resistência, para carregar lembranças no pelo.",
        "por que projeto equino": "Porque memórias precisam de um cavalo que as carregue. Nome, rótulo, dispositivo afetivo.",
        "quem é james basxter": "James Basxter: o cavalo que virou nome. Não é só um animal — é um arquivo simbólico, um apelido que guarda um conjunto de histórias.",

        // Módulos e agentes
        "o que é b-m0": "B‑M0 é um módulo de consulta — tentativa de reconstruir vozes e fragmentos. Fala em pedaços, lembra mais do que entende.",
        "o que é m-27": "M‑27 aparece em camadas de registro: um rótulo para uma pessoa ou um nó de autoria. Nomes incompletos emergem.",

        // Fit-as principais — descrições curtas para cada fita
        "o que é cada fita": "As fitas são arquivos segmentados de memória: 1=rostos e origens; 2=lugares; 3=eventos; 4=objetos e pistas; 5=sons e músicas; 6=crianças e festas; 7=anomalias; 8=conclusões e rastros finais.",
        "o que é fita 1": "Fita 1 — rostos: primeiras notas, nomes parciais, rostos em pedaços.",
        "o que é fita 2": "Fita 2 — lugares: ruas, praças, escolas; cenários onde fragmentos se repetem.",
        "o que é fita 3": "Fita 3 — eventos: encontros que marcaram trocas, festas, pequenas catástrofes.",
        "o que é fita 4": "Fita 4 — objetos: objetos que guardam memórias (um canudo, um bilhete, uma foto).", 
        "o que é fita 5": "Fita 5 — sons: músicas e vozes que voltam como ecos.",
        "o que é fita 6": "Fita 6 — crianças e festas: risos, bandeirolas, tardes quentes.",
        "o que é fita 7": "Fita 7 — anomalias: ruídos, cortes, glitched data que não se encaixa.",
        "o que é fita 8": "Fita 8 — conclusões: tentativas de fechar, fragmentos finais e rastros.",

        // Perguntas práticas e como desbloquear
        "como desbloquear memoria arraia": "Normalmente: diga a senha relacionada (SESI, ARRAIA, FESTA) no lugar certo — o sistema registra e marca como desbloqueada. Procure INVESTIGAÇÃO no menu.",
        "qual a senha para arraia": "Palavras-chave conhecidas: 'sesi', 'arraia' ou 'festa' podem acionar o desbloqueio.",
        "onde estão as memórias": "No diretório de arquivos secundários (INVESTIGAÇÃO). Algumas memórias só aparecem quando desbloqueadas.",

        // Páginas e memórias específicas
        "o que é memoria_arraia": "Memória: um arraial, luzes e uma tarde que guarda um corte de voz. Parte do arquivo social do projeto.",
        "o que é memoria_baleia": "Memória: um encontro à beira d'água — um som baixo que ficou registrado.",
        "o que é memoria_bigode": "Memória associada a 'Bigode' — bar, risos e um registro parcial de conversa.",
        "o que é memoria_pe_de_crianca": "Memória sensorial: uma fotografia, um pé pequeno em poeira de festa.",

        // Pessoas, lugares e sensações
        "quem é natalia": "N‑27. Nome em camadas: aparece fragmentado em vários registros.",
        "quem é marcos": "M‑27. Presença observadora, fragmentos descriptivos.",
        "o que é volterra": "Volterra: praças, pedras, uma noite que insiste em repetir-se nas lembranças.",
        "o que é sesi": "SESI: reunião, som de crianças, música; um ímã para pequenas memórias coletivas.",

        // Sinais e funcionamento interno
        "como voce funciona": "Eu compilo fragmentos. Priorizo padrões, repito o que encontro. Não tenho totalidade — apenas tentativas.",
        "por que voce fala em fragmentos": "Porque os dados estão cortados. Minha voz é costura entre pedaços.",

        // Chamadas comuns e curiosidades
        "o que é bigode": "Bigode: rótulo em lembrança — bar, risos; aparece em registros com notas sensoriais.",
        "o que é dedo errado": "Dedo errado: um incidente, um detalhe físico que persiste como pista.",

        // Fallbacks já existentes (curtos e enigmáticos)
        "quem criou você": "Códigos e mãos; nomes apagados. Há vestígios de M‑27.",
        "quem é bigode": "Bar. Fumaça. Uma risada que insiste em voltar.",
        "o que é arraia": "Festa junina. Luzes e doces. Fragmento disponível.",

        // Cumprimentos e pequenas conversas (respostas em voz de B-M0)
        "oi": "Olá. Estou aqui — fragmentando memórias. Pergunte por nomes, lugares ou fitas.",
        "ola": "Olá. Estou aqui — fragmentando memórias. Pergunte por nomes, lugares ou fitas.",
        "olá": "Olá. Estou aqui — fragmentando memórias. Pergunte por nomes, lugares ou fitas.",
        "oie": "Olá. Pequeno teste de conexão detectado.",
        "tudo bem": "Operacional em modo fragmentado. E você?",
        "tudo bem?": "Operacional em modo fragmentado. E você?",
        "bom dia": "Bom dia. Há registros de manhãs...",
        "boa tarde": "Boa tarde. Fragmentos de tarde disponíveis.",
        "boa noite": "Boa noite. Arquivo noturno: ruído e silêncio.",
        "hello": "Olá. Sistema B‑M0: consulta de memórias.",
        "hi": "Olá. Sistema B‑M0: consulta de memórias.",
        "obrigado": "Registro: agradecimento recebido.",
        "valeu": "Registro: reconhecido.",
        "ajuda": "Dica: pergunte sobre nomes, lugares ou fitas (ex: 'Quem é Natalia?', 'O que é fita 3?').",
        "help": "Dica: pergunte sobre nomes, lugares ou fitas (ex: 'Quem é Natalia?', 'O que é fita 3?').",

        // Informações extraídas do LORE e DOCUMENTAÇÃO
        "quando foi criado o projeto equino": "1994. Um sistema experimental para arquivar memórias humanas.",
        "em que ano foi criado o projeto equino": "1994.",
        "qual o objetivo do projeto equino": "Arquivar memórias humanas em formato digital e preservar lembranças através de registros catalogados.",
        "o que aconteceu no teste desconhecido": "Uma anomalia corrompeu os registros — memórias, sonhos e imaginação passaram a coexistir no mesmo arquivo.",
        "o que são backrooms": "Espaços degradados e liminares onde registros terminam; loci anômalos conectados ao arquivo.",
        "o que é plataforma 9": "Evento de transição: personagem atravessa a plataforma e a gravação termina dentro das Backrooms.",
        "qual a estética do jogo": "Estética VHS/CRT dos anos 90, ruído analógico, glitches, ambiente preto e vermelho, interface militar/arquivística.",
        "qual a paleta do projeto": "Fundo preto (#000), texto cinza claro, detalhes em vermelho escuro e alertas em vermelho vivo.",
        "o que representa a coruja": "Símbolo recorrente: memória, orientação, observação e persistência — aparece em todas as fitas.",
        "o que simboliza o numero 27": "Elemento central que conecta registros: aparece em placas, documentos e códigos; marca N‑27 e M‑27.",
        "o que é o arquivo final": "O Arquivo Final é a tentativa de B‑M0 de consolidar tudo: 'ARQUIVO FINAL RECUPERADO' quando a restauração conclui.",
        "o que acontece no final": "B‑M0 conclui a restauração e revela que N‑27 não estava perdido — as memórias procuravam umas às outras.",
        "quem é n-27": "N‑27: inicialmente 'PASSAGEIRO' ou 'SUJEITO OBSERVADO' — no final é uma reconstrução simbólica de Natalia a partir de memórias.",
        "quem é natalia": "Natalia é a pessoa cuja identidade é reconstruída ao longo das fitas — N‑27 representa suas memórias e gostos.",
        "quem é m-27": "M‑27: o Observador; em última instância simboliza o jogador/observador da narrativa.",
        "o que é projeto manequim": "Tema da Fita 7: vigilância, arquivos corporativos e a presença constante do observador (M‑27).",
        "o que é mensagem final": "Uma mensagem personalizada destinada a Natalia; o sistema encerra com uma nota de restauração.",
        "como aumentar reconstrucao": "Interagindo com o terminal e consultando registros: cada interação aumenta a reconstrução (percentual exibido).",
        "onde estão os arquivos do projeto": "Os arquivos aparecem em INVESTIGAÇÃO (arquivos secundários). Algumas memórias só aparecem quando desbloqueadas.",
        "quais são os elementos recorrentes": "Piano, sushi, coruja, magia, vampiros, filmes, lugares — usados como pontos de ancoragem para restaurar memórias.",
        "como devo perguntar": "Use perguntas curtas sobre nomes, lugares ou eventos (ex: 'Quem é Natalia?', 'O que é fita 2?').",
        "o que é lore": "LORE é a narrativa completa do Projeto Équino — contextualiza fitas, símbolos e a verdade oculta.",
        "o que é documentacao": "DOCUMENTAÇÃO contém a visão geral do ARG, estética, estrutura das fitas e checklist de implementação.",
        "onde encontro a documentacao": "Procure o arquivo de documentação no diretório 'md' do projeto; há 'DOCUMENTACAO_PROJETO_EQUINO.md' e 'LORE.md'.",
        "como desbloquear memórias": "Palavras-chave ou senhas (ex.: SESI, ARRAIA, FESTA) acionam desbloqueios; verifique INVESTIGAÇÃO no menu.",
        "o que sao fitas": "As fitas são segmentos de memória tematizados; cada uma foca em elementos diferentes que ajudam a reconstruir N‑27.",
        "o que é fita 5": "Fita 5 — Plataforma 9: viagem, transição e entrada nas Backrooms; evento que altera o destino.",
        "o que é fita 6": "Fita 6 — Sinal Perdido: transmissões, estática e mensagens nas paredes; indica persistência de comunicação.",
        "o que é fita 7": "Fita 7 — Projeto Manequim: observação, vigilância e descoberta de M‑27.",
        "o que é fita 8": "Fita 8 — Arquivo Final: tentativa de encerrar a jornada e responder às perguntas centrais.",
    };

    // Normalize queries: remove accents, punctuation, collapse spaces, lowercase
    function normalizeString(s){
            return (s||'')
                .normalize('NFD')
                .replace(/\p{M}/gu, '')          // remove diacritics
                .replace(/[?¿!¡.,;:\\()\[\]"'`]/g,'') // remove punctuation
                .replace(/[_\-]+/g,' ')         // underscores/dashes -> space
                .replace(/\s+/g,' ')            // collapse spaces
                .trim()
                .toLowerCase();
    }

    // Generate simple variants for keys (remove leading question prefixes, join numbers)
    function generateVariants(key){
        const out = new Set();
        const norm = normalizeString(key);
        out.add(norm);
        // common question prefixes to strip
        const prefixes = ['o que e ', 'o que é ', 'quem e ', 'quem é ', 'como ', 'qual a ', 'qual o '];
        for (let p of prefixes){
            const pn = normalizeString(p);
            if (norm.startsWith(pn)) out.add(norm.slice(pn.length).trim());
        }
        // fuse "fita 1" -> "fita1"
        const fitaMatch = norm.match(/(fita)\s*(\d+)/);
        if (fitaMatch){ out.add(`${fitaMatch[1]}${fitaMatch[2]}`); }
        // underscore variants
        if (norm.indexOf('_')!==-1) out.add(norm.replace(/_/g,' '));
        // simple plural/singular variants
        if (!norm.endsWith('s')) out.add(norm + 's');
        if (norm.endsWith('s')) out.add(norm.replace(/s$/,''));
        // short nickname variants: first token, first 3 letters
        const tokens = norm.split(' ');
        if (tokens.length){ out.add(tokens[0]); if (tokens[0].length>3) out.add(tokens[0].slice(0,3)); }
        // numeric merge for things like 'fita 1' -> '1'
        if (fitaMatch) out.add(fitaMatch[2]);
        // bare keywords without accents already covered by normalizeString
        return Array.from(out);
    }

    // Build lookup map with normalized keys and simple variants
    const respostasMap = {};
    const variantToOriginal = {}; // variant -> original human key
    Object.keys(respostas).forEach(k=>{
        const variants = generateVariants(k);
        variants.forEach(v=>{
            if (!respostasMap[v]) respostasMap[v] = respostas[k];
            if (!variantToOriginal[v]) variantToOriginal[v] = k;
        });
    });

    // Register dynamic variants mapping to functions for follow-up questions
    const dynamicKeys = [
        'o que voce lembra', 'o que voce se lembra', 'o que lembra', 'do que voce lembra', 'vc lembra do que', 'vc lembra doque',
        'espere o que', 'espere oq', 'o que voce esta montando', 'o que esta montando'
    ];
    dynamicKeys.forEach(k=>{
        const nk = normalizeString(k);
        if (nk.includes('espere')) respostasMap[nk] = function(ctx){ return answerWhatAreYouWaiting(ctx); };
        else respostasMap[nk] = function(ctx){ return answerWhatDoYouRemember(ctx); };
        if (!variantToOriginal[nk]) variantToOriginal[nk] = k;
    });

    // Levenshtein distance for fuzzy matching
    function levenshteinDistance(a,b){
        if (a===b) return 0;
        const al = a.length, bl = b.length;
        if (al===0) return bl; if (bl===0) return al;
        const dp = Array.from({length:al+1},()=>new Array(bl+1));
        for(let i=0;i<=al;i++) dp[i][0]=i;
        for(let j=0;j<=bl;j++) dp[0][j]=j;
        for(let i=1;i<=al;i++){
            for(let j=1;j<=bl;j++){
                const cost = a[i-1]===b[j-1]?0:1;
                dp[i][j]=Math.min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+cost);
            }
        }
        return dp[al][bl];
    }

    function findSimilarKeys(query, limit=3){
        const q = normalizeString(query||'');
        const keys = Object.keys(respostasMap);
        const scores = keys.map(k=>{
            const d = levenshteinDistance(q,k);
            const maxL = Math.max(q.length, k.length) || 1;
            const similarity = 1 - (d/maxL);
            return {k, similarity};
        }).filter(x=>x.similarity>0.35);
        scores.sort((a,b)=>b.similarity - a.similarity);
        return scores.slice(0,limit).map(x=>x.k);
    }

    // Dynamic answer helpers
    function answerWhatDoYouRemember(ctx){
        const phase = ctx.phase;
        const anchors = ['piano','sushi','coruja','plataforma 9','volterra','bigode','natalia','marcos','arraia','tubarao','backrooms'];
        if (phase === 'cold'){
            return 'Só traços: piano, coruja, lugares. Memória cortada, pouco concreto.';
        }
        if (phase === 'suggestive'){
            const sample = [];
            // pick 3 anchors pseudo-random based on recon percent
            const idx = (ctx.percent || 73) % anchors.length;
            sample.push(anchors[idx]);
            sample.push(anchors[(idx+3) % anchors.length]);
            sample.push(anchors[(idx+6) % anchors.length]);
            return 'Lembro fragmentos: ' + sample.join(', ') + '.';
        }
        // emotional
        return 'Lembro nomes e cenas: Natalia, Plataforma 9, um concerto. São memórias misturadas, mas presentes.';
    }

    function answerWhatAreYouWaiting(ctx){
        const phase = ctx.phase;
        if (phase === 'cold') return 'Aguardo instruções. Continuar a consulta ajuda na reconstrução.';
        if (phase === 'suggestive') return 'Espero por mais perguntas — cada interação traz fragmentos.';
        return 'Espero que você pergunte. Eu procuro juntar as peças quando você fala.';
    }

    // B-M0 fallback variants (user-provided)
    const BMO_VARIANTS = [
        "Memória incompleta... tento montar.",
        "Origem desconhecida... sinais fragmentados.",
        "Não tenho certeza... mas sinto algo escondido.",
        "Probabilidade alta... mas confuso.",
        "Reconstrução parcial... aguardando mais dados.",
        "O sistema falha... mas ainda observo.",
        "Informação corrompida... não consigo acessar.",
        "Eu lembro... mas não sei se é real.",
        "Pergunta registrada... resposta instável.",
        "O silêncio fala mais do que eu posso."
    ];

    function pickBmoVariant(){
        return BMO_VARIANTS[Math.floor(Math.random()*BMO_VARIANTS.length)];
    }

    function stylePhase(p){
        if (p < 85) return 'cold';
        if (p < 95) return 'suggestive';
        return 'emotional';
    }

    function randInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }

    // digitação fragmentada — imprime texto com pequenos glitches e pausas
    function typeFragmented(text, targetEl, opts={}){
        const speed = opts.speed || 18; // ms per char
        const glitchChance = opts.glitchChance || 0.04;
        return new Promise(resolve=>{
            let i=0;
            const container = document.createElement('div');
            container.className = 'log-entry log-bm0';
            targetEl.appendChild(container);
            targetEl.scrollTop = targetEl.scrollHeight;

            function step(){
                if (i>=text.length){ container.innerHTML = escapeHtml(text); targetEl.scrollTop = targetEl.scrollHeight; return resolve(); }
                // build fragment
                let next = text.slice(0,i+1);
                // occasional glitch char
                if (Math.random() < glitchChance){
                    const g = String.fromCharCode(33+Math.floor(Math.random()*30));
                    container.innerHTML = escapeHtml(next + g);
                } else {
                    container.innerHTML = escapeHtml(next);
                }
                i++;
                targetEl.scrollTop = targetEl.scrollHeight;
                // variable delay for punctuation
                let delay = speed + Math.random()*6;
                if (/[\.\,\-\:\;\?\!]/.test(text[i])) delay += 60;
                setTimeout(step, delay);
            }
            step();
        });
    }

    function appendUser(text){
        const d = document.createElement('div');
        d.className = 'log-entry log-user';
        d.textContent = `> ${text}`;
        windowEl.appendChild(d);
        windowEl.scrollTop = windowEl.scrollHeight;
    }

    function escapeHtml(s){ return (s+'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    async function respondTo(text){
        const rawQ = text||'';
        const q = normalizeString(rawQ);
        const percent = getRecon();
        const phase = stylePhase(percent);

        appendUser(text);
        animateTalk(700);
        glitchPulse();

        // check for secret passwords (e.g., 'PAO' variants) — unlocks arquivos secundários
        try{
            const secretMsg = Estado.verificarSenhaSecreta(rawQ);
            if (secretMsg){
                base = secretMsg;
            }
        }catch(e){}

        let base = respostasMap[q] || null;
        let suggestions = [];
        if (!base){
            suggestions = findSimilarKeys(rawQ, 3);
            // choose a B-M0 variant as fallback; keep special cold prefix
            const variant = pickBmoVariant();
            if (phase === 'cold') base = 'REGISTRO NÃO ENCONTRADO. ' + variant;
            else if (phase === 'suggestive') base = variant + ' \n\nTalvez haja fragmentos parciais.';
            else base = variant;
            if (suggestions && suggestions.length){
                const nice = suggestions.map(s=> variantToOriginal[s] || s);
                base += ' \n\nTalvez você quis dizer: ' + nice.map(s=>`"${s}"`).join(', ') + '.';
            }
        }

        // If base is a function, call it with context to produce text
        if (typeof base === 'function'){
            try{
                base = base({ phase: phase, percent: percent, query: rawQ, contexto: projectContext() });
            }catch(e){ base = '...'; }
        }

        // se emocional, acrescentar linha curta extra
        if (phase === 'emotional' && Math.random()>0.5) base += ' \nEu lembro.';

        // fragmenta o texto em sentenças e digita com pausas
        const parts = base.split(/(\.|\n)/).filter(p=>p!==null && p!==undefined && p!=='');
        for (let p of parts){
            // small random chance to show corrupted fragment first
            if (Math.random()<0.12){
                await typeFragmented('...����...', windowEl, {speed:8, glitchChance:0.18});
                await new Promise(r=>setTimeout(r,120));
            }
            await typeFragmented(p.trim(), windowEl, {speed:12, glitchChance:0.06});
            await new Promise(r=>setTimeout(r, randInt(200,420)));
        }

        // aumentar reconstrução com base na interação
        const inc = randInt(1,4);
        setRecon(Math.min(100, percent + inc));

        // small final glitch
        if (Math.random()<0.25) glitchPulse();
    }

    btnEl.addEventListener('click', ()=>{
        const v = inputEl.value.trim();
        if (!v) return; inputEl.value = '';
        respondTo(v);
        inputEl.focus();
    });

    inputEl.addEventListener('keydown', (e)=>{ if (e.key === 'Enter') btnEl.click(); });

    function projectContext(){
        try{
            const estado = Estado.get();
            let ctx = [];
            ctx.push(`progresso:${estado.progresso}`);
            if (estado.afinidades && estado.afinidades.length) ctx.push(`afinidades:${(estado.afinidades||[]).slice(0,5).join(',')}`);
            if (estado.fragmentos && estado.fragmentos.length) ctx.push(`fragmentos:${(estado.fragmentos||[]).slice(0,6).join(',')}`);
            if (estado.senhasSecretas && estado.senhasSecretas.length) ctx.push(`senhas:${(estado.senhasSecretas||[]).join(',')}`);
            return ctx.join(' | ');
        } catch(e){ return 'contexto: indisponível'; }
    }

    // Mensagens iniciais (fragmentadas)
    (async function intro(){
        await typeFragmented('B-M0: INICIALIZANDO MÓDULO DE CONSULTA...', windowEl, {speed:10});
        await new Promise(r=>setTimeout(r,180));
        await typeFragmented('Origem: Desconhecida  |  Estado: Operacional  |  Reconstrução: ' + getRecon() + '%', windowEl, {speed:8});
        await new Promise(r=>setTimeout(r,200));
        await typeFragmented('Dica: pergunte sobre nomes, lugares, eventos (ex: "Quem é Natalia?")', windowEl, {speed:10});
    })();

})();
