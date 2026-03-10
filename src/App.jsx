import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0tWcZtzd20CVJc_LqCfg78UIHustiTHI",
  authDomain: "carrinho-pregacao.firebaseapp.com",
  projectId: "carrinho-pregacao",
  storageBucket: "carrinho-pregacao.firebasestorage.app",
  messagingSenderId: "922460695224",
  appId: "1:922460695224:web:921c92ad1f0a347f90e24d"
};

const app      = initializeApp(firebaseConfig);
const db       = getFirestore(app);
const CARRINHO_IMG = "data:image/jpeg;base64,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";
const DISPLAY_IMG  = "data:image/png;base64,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";

const MOSTRUARIOS = [
  { id: "carrinho1", label: "Carrinho 1", img: CARRINHO_IMG },
  { id: "carrinho2", label: "Carrinho 2", img: CARRINHO_IMG },
  { id: "carrinho3", label: "Carrinho 3", img: CARRINHO_IMG },
  { id: "display",   label: "Display",    img: DISPLAY_IMG  },
];

const LOCAIS = [
  "Supermercado Bem Bom",
  "Praça da Juventude",
  "Tend Tudo",
];

const DIAS_SEMANA = [
  { id: 0, label: "Domingo" },
  { id: 1, label: "Segunda" },
  { id: 2, label: "Terça"   },
  { id: 3, label: "Quarta"  },
  { id: 4, label: "Quinta"  },
  { id: 5, label: "Sexta"   },
  { id: 6, label: "Sábado"  },
];

const HOURS = Array.from({ length: 17 }, (_, i) => {
  const h = i + 6;
  return `${String(h).padStart(2,"0")}:00`;
});

function dateKey(d) { return d.toISOString().slice(0,10); }
function today()    { const d = new Date(); d.setHours(0,0,0,0); return d; }
function addDays(d,n) { const r = new Date(d); r.setDate(r.getDate()+n); return r; }
function fmtDate(d) { return d.toLocaleDateString("pt-BR", { weekday:"long", day:"2-digit", month:"long" }); }
function hoursOverlap(sA,eA,sB,eB) { return sA < eB && eA > sB; }
function diaSemanaDeDate(dateStr) { return new Date(dateStr+"T12:00:00").getDay(); }

const ADMIN_PIN = "@1914";

export default function App() {
  const [view,         setView]        = useState("agenda");
  const [agendamentos, setAgendamentos]= useState([]); // agendamentos normais (data especifica)
  const [fixos,        setFixos]       = useState([]); // agendamentos fixos (por dia da semana)
  const [membros,      setMembros]     = useState([]);
  const [loading,      setLoading]     = useState(true);
  const [modal,        setModal]       = useState(null); // {type:"normal"|"fixo", data:...}
  const [editModal,    setEditModal]   = useState(null); // agendamento sendo editado
  const [agendaOffset, setAgendaOffset]= useState(0);

  const [adminOk,  setAdminOk]  = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [nomeError,setNomeError]= useState("");

  const [form, setForm] = useState({
    nome:"", dupla:"", mostruario:"", local:"",
    fixo: false,
    // normal
    data: dateKey(today()), horaInicio:"09:00", horaFim:"11:00",
    // fixo
    diaSemana: 1,
  });
  const [formError,   setFormError]   = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    const s = document.createElement("style");
    s.innerHTML = "* { margin:0; padding:0; box-sizing:border-box; } body,#root { width:100%; min-height:100vh; background:#f0f4f8; }";
    document.head.appendChild(s);

    const unsubAg = onSnapshot(collection(db, "agendamentos"), snap => {
      setAgendamentos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    const unsubFx = onSnapshot(collection(db, "fixos"), snap => {
      setFixos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubMb = onSnapshot(doc(db, "config", "membros"), snap => {
      if (snap.exists() && snap.data().lista?.length) setMembros(snap.data().lista);
    });

    return () => { unsubAg(); unsubFx(); unsubMb(); };
  }, []);

  async function saveMembros(lista) { await setDoc(doc(db, "config", "membros"), { lista }); setMembros(lista); }

  // Verifica conflito considerando tanto normais quanto fixos
  function hasConflict(data, hI, hF, mos, excludeId) {
    const diaSem = diaSemanaDeDate(data);
    // conflito com normais
    const normalConflict = agendamentos.some(a =>
      a.id !== excludeId && a.data === data && a.mostruario === mos &&
      hoursOverlap(hI, hF, a.horaInicio, a.horaFim)
    );
    // conflito com fixos
    const fixoConflict = fixos.some(f =>
      f.id !== excludeId && f.diaSemana === diaSem && f.mostruario === mos &&
      hoursOverlap(hI, hF, f.horaInicio, f.horaFim)
    );
    return normalConflict || fixoConflict;
  }

  function hasConflictFixo(diaSem, hI, hF, mos, excludeId) {
    // conflito com outros fixos
    const fixoConflict = fixos.some(f =>
      f.id !== excludeId && f.diaSemana === diaSem && f.mostruario === mos &&
      hoursOverlap(hI, hF, f.horaInicio, f.horaFim)
    );
    // conflito com normais nesse dia da semana (nos proximos 60 dias)
    const normalConflict = agendamentos.some(a => {
      if (a.mostruario !== mos) return false;
      if (diaSemanaDeDate(a.data) !== diaSem) return false;
      return hoursOverlap(hI, hF, a.horaInicio, a.horaFim);
    });
    return fixoConflict || normalConflict;
  }

  async function handleSubmit() {
    setFormError("");
    if (!form.nome)       return setFormError("Selecione seu nome.");
    if (!form.dupla)      return setFormError("Selecione a dupla.");
    if (form.nome===form.dupla) return setFormError("Você e a dupla nao podem ser a mesma pessoa.");
    if (!form.mostruario) return setFormError("Selecione o mostruário.");
    if (!form.local)      return setFormError("Selecione o local.");
    if (form.horaInicio >= form.horaFim) return setFormError("Horário final deve ser maior que o inicial.");

    if (form.fixo) {
      if (hasConflictFixo(form.diaSemana, form.horaInicio, form.horaFim, form.mostruario))
        return setFormError("Já existe agendamento neste dia/horário/mostruário.");
      await addDoc(collection(db, "fixos"), {
        nome: form.nome, dupla: form.dupla, mostruario: form.mostruario,
        local: form.local, diaSemana: form.diaSemana,
        horaInicio: form.horaInicio, horaFim: form.horaFim,
        criadoEm: new Date().toISOString(),
      });
    } else {
      if (!form.data) return setFormError("Selecione a data.");
      if (hasConflict(form.data, form.horaInicio, form.horaFim, form.mostruario))
        return setFormError("Já existe agendamento neste dia/horário/mostruário.");
      await addDoc(collection(db, "agendamentos"), {
        nome: form.nome, dupla: form.dupla, mostruario: form.mostruario,
        local: form.local, data: form.data,
        horaInicio: form.horaInicio, horaFim: form.horaFim,
        criadoEm: new Date().toISOString(),
      });
    }
    setFormSuccess(true);
    setTimeout(() => { setFormSuccess(false); setView("agenda"); }, 2000);
  }

  async function handleCancelar() {
    if (modal.type === "fixo") {
      await deleteDoc(doc(db, "fixos", modal.data.id));
    } else {
      await deleteDoc(doc(db, "agendamentos", modal.data.id));
    }
    setModal(null);
  }

  function handleEditar() {
    const a = modal.data;
    setEditModal({ ...modal });
    setModal(null);
  }

  async function handleSalvarEdicao(editForm) {
    const { type, data } = editModal;
    const colecao = type === "fixo" ? "fixos" : "agendamentos";
    const campos = type === "fixo"
      ? { nome: editForm.nome, dupla: editForm.dupla, mostruario: editForm.mostruario, local: editForm.local, diaSemana: editForm.diaSemana, horaInicio: editForm.horaInicio, horaFim: editForm.horaFim }
      : { nome: editForm.nome, dupla: editForm.dupla, mostruario: editForm.mostruario, local: editForm.local, data: editForm.data, horaInicio: editForm.horaInicio, horaFim: editForm.horaFim };
    await updateDoc(doc(db, colecao, data.id), campos);
    setEditModal(null);
  }

  async function handleAdicionarMembro() {
    setNomeError("");
    const nome = novoNome.trim();
    if (!nome) return setNomeError("Digite um nome.");
    if (membros.some(m => m.toLowerCase() === nome.toLowerCase())) return setNomeError("Este nome ja existe.");
    await saveMembros([...membros, nome].sort((a,b)=>a.localeCompare(b)));
    setNovoNome("");
  }

  async function handleRemoverMembro(nome) {
    if (!window.confirm(`Remover "${nome}" da lista?`)) return;
    await saveMembros(membros.filter(m => m !== nome));
  }


  function gerarPDF() {
    const dias = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
    const mostruarioNome = id => MOSTRUARIOS.find(m=>m.id===id)?.label || id;

    // Sort normais by data+hora
    const normais = [...agendamentos].sort((a,b)=>(a.data+a.horaInicio).localeCompare(b.data+b.horaInicio));
    // Sort fixos by diaSemana+hora
    const fixosList = [...fixos].sort((a,b)=> a.diaSemana!==b.diaSemana ? a.diaSemana-b.diaSemana : a.horaInicio.localeCompare(b.horaInicio));

    const rows_normais = normais.map(a => {
      const d = new Date(a.data+"T12:00:00");
      const dataFmt = d.toLocaleDateString("pt-BR", {weekday:"long",day:"2-digit",month:"2-digit",year:"numeric"});
      return `<tr><td>${dataFmt}</td><td>${a.horaInicio} - ${a.horaFim}</td><td>${mostruarioNome(a.mostruario)}</td><td>${a.local||"-"}</td><td>${a.nome}</td><td>${a.dupla}</td></tr>`;
    }).join("");

    const rows_fixos = fixosList.map(f =>
      `<tr style="background:#fffaf0"><td>Toda ${dias[f.diaSemana]}</td><td>${f.horaInicio} - ${f.horaFim}</td><td>${mostruarioNome(f.mostruario)}</td><td>${f.local||"-"}</td><td>${f.nome}</td><td>${f.dupla}</td></tr>`
    ).join("");

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
    <title>Agendamentos - Carrinho de Publicações</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 24px; color: #1a2a3a; }
      h1 { font-size: 20px; color: #1a6abf; margin-bottom: 4px; }
      p.sub { color: #7a9ab8; font-size: 13px; margin-bottom: 24px; }
      h2 { font-size: 15px; color: #1a6abf; margin: 24px 0 8px; border-bottom: 2px solid #dce6f0; padding-bottom: 6px; }
      table { width: 100%; border-collapse: collapse; font-size: 13px; }
      th { background: #1a6abf; color: #fff; padding: 8px 10px; text-align: left; }
      td { padding: 7px 10px; border-bottom: 1px solid #dce6f0; }
      tr:hover td { background: #f5f9ff; }
      .fixo-tag { background: #fff8e0; color: #8a6a00; border: 1px solid #f0d890; border-radius: 4px; padding: 2px 6px; font-size: 11px; }
      @media print { button { display: none; } }
    </style></head><body>
    <h1>Carrinho de Publicações — Agendamentos</h1>
    <p class="sub">Gerado em ${new Date().toLocaleString("pt-BR")}</p>
    <h2>📅 Agendamentos por Data (${normais.length})</h2>
    <table><thead><tr><th>Data</th><th>Horario</th><th>Mostruario</th><th>Local</th><th>Responsavel</th><th>Dupla</th></tr></thead>
    <tbody>${rows_normais||"<tr><td colspan=6 style='color:#aaa;text-align:center'>Nenhum agendamento</td></tr>"}</tbody></table>
    <h2>🔁 Agendamentos Fixos (${fixosList.length})</h2>
    <table><thead><tr><th>Dia</th><th>Horario</th><th>Mostruario</th><th>Local</th><th>Responsavel</th><th>Dupla</th></tr></thead>
    <tbody>${rows_fixos||"<tr><td colspan=6 style='color:#aaa;text-align:center'>Nenhum agendamento fixo</td></tr>"}</tbody></table>
    <br><button onclick="window.print()">Imprimir</button>
    </body></html>`;

    const blob = new Blob([html], {type:"text/html"});
    const url  = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }

  function handlePin() {
    if (pinInput === ADMIN_PIN) { setAdminOk(true); setPinError(false); setPinInput(""); }
    else setPinError(true);
  }

  const agendaDays = Array.from({ length: 7 }, (_,i) => addDays(today(), agendaOffset*7+i));

  // Build agenda cards for a day: normais + fixos que batem com o dia da semana
  function getCardsForDay(dateStr) {
    const diaSem = diaSemanaDeDate(dateStr);
    const normais = agendamentos.filter(a => a.data === dateStr);
    const fixosDia = fixos.filter(f => f.diaSemana === diaSem);
    const normaisCards = normais.map(a => ({ type:"normal", data:a }));
    const fixosCards   = fixosDia.map(f => ({ type:"fixo",   data:f }));
    return [...normaisCards, ...fixosCards].sort((a,b) =>
      a.data.horaInicio.localeCompare(b.data.horaInicio)
    );
  }

  if (loading) return (
    <div style={{...S.root, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:16}}>
      <div style={{width:40,height:40,borderRadius:"50%",border:"3px solid #2a90ff",borderTopColor:"transparent",animation:"spin 0.8s linear infinite"}} />
      <style>{"@keyframes spin { to { transform: rotate(360deg) } }"}</style>
      <p style={{color:"#1a6abf",fontSize:14}}>Conectando...</p>
    </div>
  );

  return (
    <div style={S.root}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        select option { background: #ffffff; }
        input, select { font-size: 16px !important; }
        ::-webkit-scrollbar { width:6px } ::-webkit-scrollbar-track { background:#f0f4f8 }
        ::-webkit-scrollbar-thumb { background:#b0c4de; border-radius:3px }
        @media (max-width: 600px) {
          .mob-header  { padding: 14px 16px !important; }
          .mob-main    { padding: 14px 12px 100px !important; }
          .mob-nav-btn { flex: 1 !important; font-size: 11px !important; padding: 12px 4px !important; }
          .mob-row2    { flex-direction: column !important; }
          .mob-row3    { flex-direction: column !important; }
          .mob-mgrid   { grid-template-columns: 1fr 1fr !important; }
          .mob-formcard{ padding: 18px 14px !important; }
          .mob-addrow  { flex-direction: column !important; }
          .mob-addrow button { width: 100% !important; }
          .mob-weeknav { flex-wrap: wrap !important; justify-content: center !important; }
        }
      `}</style>

      <header style={S.header} className="mob-header">
        <div style={{...S.hInner, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div>
            <div style={S.hTag}>Testemunho Público</div>
            <h1 style={S.hTitle}>Carrinho de Publicações</h1>
          </div>

        </div>
      </header>

      <nav style={S.nav}>
        {[["agenda","Agenda"],["agendar","Agendar"],["disponivel","Livre"],["meus","Meus"],["admin","Admin"]].map(([v,lb]) => (
          <button key={v} className="mob-nav-btn" style={{...S.navBtn,...(view===v?S.navActive:{})}} onClick={()=>setView(v)}>
            {lb}
          </button>
        ))}
      </nav>

      <main style={S.main} className="mob-main">

        {/* AGENDA */}
        {view==="agenda" && (
          <div>
            <div style={S.weekNav} className="mob-weeknav">
              <button style={S.wBtn} onClick={()=>setAgendaOffset(o=>o-1)} disabled={agendaOffset<=0}>Anterior</button>
              <span style={{color:"#4a7aaa",fontSize:13}}>
                {fmtDate(agendaDays[0]).split(",")[1]?.trim()} -- {fmtDate(agendaDays[6]).split(",")[1]?.trim()}
              </span>
              <button style={S.wBtn} onClick={()=>setAgendaOffset(o=>o+1)}>Proxima</button>
            </div>
            <div style={S.dGrid}>
              {agendaDays.map(dia => {
                const key = dateKey(dia);
                const cards = getCardsForDay(key);
                const isToday = key===dateKey(today());
                return (
                  <div key={key} style={{...S.dayCard,...(isToday?S.dayToday:{})}}>
                    <div style={S.dayHead}>
                      <span style={S.dayName}>{isToday?"Hoje — ":""}{fmtDate(dia)}</span>
                      {cards.length===0 && <span style={{color:"#aac0d8",fontSize:11,fontStyle:"italic"}}>Sem agendamentos</span>}
                    </div>
                    {cards.length>0 && (
                      <div style={{padding:"8px 10px",display:"flex",flexDirection:"column",gap:6}}>
                        {cards.map((card,i) => {
                          const a  = card.data;
                          const ms = MOSTRUARIOS.find(m=>m.id===a.mostruario);
                          const isOwner = true;
                          return (
                            <div key={a.id||i} style={{...S.agCard,...(isOwner?{borderLeft:"3px solid #2a90ff"}:{}),...(card.type==="fixo"?{background:"#fffaf0",borderTop:"1px solid #f0d890"}:{})}} onClick={()=>setModal(card)}>
                              <div style={{fontSize:12,fontWeight:"bold",color:"#1a6abf",minWidth:90}}>
                                {a.horaInicio} - {a.horaFim}
                              </div>
                              {ms?.img && <img src={ms.img} alt={ms.label} style={{width:22,height:30,objectFit:"contain"}} />}
                              <div style={{flex:1,display:"flex",flexDirection:"column",gap:2}}>
                                <span style={{fontSize:13,color:"#1a2a3a",fontWeight:500}}>{ms?.label}</span>
                                <span style={{fontSize:11,color:"#5a8aaa"}}>{a.nome} e {a.dupla}</span>
                                {a.local && <span style={{fontSize:11,color:"#1a6abf"}}>📍 {a.local}</span>}
                              </div>
                              {card.type==="fixo" && <span style={S.fixoTag}>Fixo</span>}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* AGENDAR */}
        {view==="agendar" && (
          <div style={S.formWrap}>
            <div style={S.formCard} className="mob-formcard">
              <h2 style={S.formTitle}>Novo Agendamento</h2>
              {formSuccess ? (
                <div style={S.successBox}>Agendamento realizado com sucesso!</div>
              ) : (
                <div>
                  {/* Tipo: normal ou fixo */}
                  <div style={{display:"flex",gap:8,marginBottom:8}}>
                    <button style={{...S.tipoBtn,...(!form.fixo?S.tipoBtnActive:{})}} onClick={()=>setForm(f=>({...f,fixo:false}))}>
                      📅 Data especifica
                    </button>
                    <button style={{...S.tipoBtn,...(form.fixo?S.tipoBtnActive:{})}} onClick={()=>setForm(f=>({...f,fixo:true}))}>
                      🔁 Fixo (toda semana)
                    </button>
                  </div>

                  <div style={S.row2} className="mob-row2">
                    <div style={{flex:1}}>
                      <label style={S.lbl}>Seu nome</label>
                      <select style={S.sel} value={form.nome} onChange={e=>setForm(f=>({...f,nome:e.target.value}))}>
                        <option value="">Selecione...</option>
                        {membros.map(m=><option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div style={{flex:1}}>
                      <label style={S.lbl}>Dupla de trabalho</label>
                      <select style={S.sel} value={form.dupla} onChange={e=>setForm(f=>({...f,dupla:e.target.value}))}>
                        <option value="">Selecione...</option>
                        {membros.filter(m=>m!==form.nome).map(m=><option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>

                  <label style={S.lbl}>Mostruário</label>
                  <div style={S.mGrid} className="mob-mgrid">
                    {MOSTRUARIOS.map(m => (
                      <button key={m.id} style={{...S.mBtn,...(form.mostruario===m.id?S.mBtnActive:{})}}
                        onClick={()=>setForm(f=>({...f,mostruario:m.id}))}>
                        <img src={m.img} alt={m.label} style={{width:36,height:48,objectFit:"contain"}} />
                        <span style={{fontSize:11,marginTop:4,color:form.mostruario===m.id?"#1a6abf":"#7a9ab8"}}>{m.label}</span>
                      </button>
                    ))}
                  </div>

                  <label style={S.lbl}>Local</label>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:6}}>
                    {LOCAIS.map(l => (
                      <button key={l} style={{...S.localBtn,...(form.local===l?S.localBtnActive:{})}}
                        onClick={()=>setForm(f=>({...f,local:l}))}>
                        📍 {l}
                      </button>
                    ))}
                  </div>

                  {!form.fixo ? (
                    <div style={S.row3} className="mob-row3">
                      <div style={{flex:"0 0 160px"}}>
                        <label style={S.lbl}>Data</label>
                        <input type="date" style={S.inp} min={dateKey(today())} value={form.data}
                          onChange={e=>setForm(f=>({...f,data:e.target.value}))} />
                      </div>
                      <div style={{flex:1}}>
                        <label style={S.lbl}>Horário inicial</label>
                        <select style={S.sel} value={form.horaInicio} onChange={e=>setForm(f=>({...f,horaInicio:e.target.value}))}>
                          {HOURS.map(h=><option key={h} value={h}>{h}</option>)}
                        </select>
                      </div>
                      <div style={{flex:1}}>
                        <label style={S.lbl}>Horário final</label>
                        <select style={S.sel} value={form.horaFim} onChange={e=>setForm(f=>({...f,horaFim:e.target.value}))}>
                          {HOURS.filter(h=>h>form.horaInicio).map(h=><option key={h} value={h}>{h}</option>)}
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label style={S.lbl}>Dia da semana</label>
                      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:6}}>
                        {DIAS_SEMANA.map(d => (
                          <button key={d.id} style={{...S.diaBtn,...(form.diaSemana===d.id?S.diaBtnActive:{})}}
                            onClick={()=>setForm(f=>({...f,diaSemana:d.id}))}>
                            {d.label}
                          </button>
                        ))}
                      </div>
                      <div style={S.row2} className="mob-row2">
                        <div style={{flex:1}}>
                          <label style={S.lbl}>Horário inicial</label>
                          <select style={S.sel} value={form.horaInicio} onChange={e=>setForm(f=>({...f,horaInicio:e.target.value}))}>
                            {HOURS.map(h=><option key={h} value={h}>{h}</option>)}
                          </select>
                        </div>
                        <div style={{flex:1}}>
                          <label style={S.lbl}>Horário final</label>
                          <select style={S.sel} value={form.horaFim} onChange={e=>setForm(f=>({...f,horaFim:e.target.value}))}>
                            {HOURS.filter(h=>h>form.horaInicio).map(h=><option key={h} value={h}>{h}</option>)}
                          </select>
                        </div>
                      </div>
                      <div style={{marginTop:12,padding:"10px 14px",background:"#fffaf0",border:"1px solid #f0d890",borderRadius:8,fontSize:13,color:"#8a6a00"}}>
                        🔁 Este agendamento aparecerá toda <strong>{DIAS_SEMANA.find(d=>d.id===form.diaSemana)?.label}</strong> de {form.horaInicio} às {form.horaFim}
                      </div>
                    </div>
                  )}

                  {formError && <div style={S.errBox}>{formError}</div>}
                  <button style={S.subBtn} onClick={handleSubmit}>Confirmar Agendamento</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* DISPONIVEL */}
        {view==="disponivel" && (
          <DisponibilidadeView
            agendamentos={agendamentos}
            fixos={fixos}
          />
        )}

        {/* MEUS */}
        {view==="meus" && (
          <div>
            <div style={{...S.formCard,maxWidth:500,marginBottom:16}} className="mob-formcard">
              <h2 style={S.formTitle}>Meus Agendamentos</h2>
              <p style={{color:"#7a9ab8",fontSize:13,marginTop:4}}>Selecione seu nome para ver seus agendamentos</p>
              <label style={{...S.lbl,marginTop:16}}>Seu nome</label>
              <select style={S.sel} value={form.nome} onChange={e=>setForm(f=>({...f,nome:e.target.value}))}>
                <option value="">Selecione...</option>
                {membros.map(m=><option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            {form.nome && fixos.filter(f=>f.nome===form.nome||f.dupla===form.nome).length > 0 && (
              <div style={{marginBottom:16}}>
                <p style={{color:"#8a6a00",fontSize:12,letterSpacing:2,textTransform:"uppercase",marginBottom:8,fontWeight:600}}>🔁 Agendamentos Fixos</p>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {fixos.filter(f=>f.nome===form.nome||f.dupla===form.nome).map(f => {
                    const ms = MOSTRUARIOS.find(m=>m.id===f.mostruario);
                    const dia = DIAS_SEMANA.find(d=>d.id===f.diaSemana);
                    return (
                      <div key={f.id} style={{...S.agCard,background:"#fffaf0",borderLeft:"3px solid #f0c040",border:"1px solid #f0d890",borderLeft:"3px solid #f0c040"}} onClick={()=>setModal({type:"fixo",data:f})}>
                        <div style={{fontSize:12,fontWeight:"bold",color:"#8a6a00",minWidth:90}}>{f.horaInicio} - {f.horaFim}</div>
                        {ms?.img && <img src={ms.img} alt={ms.label} style={{width:22,height:30,objectFit:"contain"}} />}
                        <div style={{flex:1,display:"flex",flexDirection:"column",gap:2}}>
                          <span style={{fontSize:13,color:"#1a2a3a",fontWeight:500}}>{ms?.label} — toda {dia?.label}</span>
                          <span style={{fontSize:11,color:"#5a8aaa"}}>{f.nome} e {f.dupla}</span>
                          {f.local && <span style={{fontSize:11,color:"#1a6abf"}}>📍 {f.local}</span>}
                        </div>
                        <span style={S.fixoTag}>Fixo</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {form.nome && (() => {
              const meus = agendamentos.filter(a=>a.nome===form.nome||a.dupla===form.nome)
                .sort((a,b)=>(a.data+a.horaInicio).localeCompare(b.data+b.horaInicio));
              if (!meus.length && fixos.filter(f=>f.nome===form.nome||f.dupla===form.nome).length===0)
                return <p style={{color:"#7a9ab8",textAlign:"center",marginTop:24}}>Nenhum agendamento encontrado.</p>;
              if (!meus.length) return null;
              return (
                <div>
                  <p style={{color:"#4a7aaa",fontSize:12,letterSpacing:2,textTransform:"uppercase",marginBottom:8,fontWeight:600}}>📅 Datas Especificas</p>
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    {meus.map(a => {
                      const ms = MOSTRUARIOS.find(m=>m.id===a.mostruario);
                      const d  = new Date(a.data+"T12:00:00");
                      return (
                        <div key={a.id} style={{...S.agCard,borderLeft:"3px solid #2a90ff"}} onClick={()=>setModal({type:"normal",data:a})}>
                          <div style={{fontSize:12,fontWeight:"bold",color:"#1a6abf",minWidth:90}}>{a.horaInicio} - {a.horaFim}</div>
                          {ms?.img && <img src={ms.img} alt={ms.label} style={{width:22,height:30,objectFit:"contain"}} />}
                          <div style={{flex:1,display:"flex",flexDirection:"column",gap:2}}>
                            <span style={{fontSize:13,color:"#1a2a3a",fontWeight:500}}>{ms?.label} — {fmtDate(d)}</span>
                            <span style={{fontSize:11,color:"#5a8aaa"}}>{a.nome} e {a.dupla}</span>
                            {a.local && <span style={{fontSize:11,color:"#1a6abf"}}>📍 {a.local}</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ADMIN */}
        {view==="admin" && (
          <div style={S.formWrap}>
            <div style={S.formCard} className="mob-formcard">
              <h2 style={S.formTitle}>Administração</h2>
              {!adminOk ? (
                <div style={{textAlign:"center",padding:"24px 0"}}>
                  <p style={{color:"#4a7aaa",marginBottom:24,fontSize:14}}>Digite o PIN de administrador.</p>
                  <input type="password" placeholder="PIN" value={pinInput}
                    onChange={e=>{ setPinInput(e.target.value); setPinError(false); }}
                    onKeyDown={e=>e.key==="Enter" && handlePin()}
                    style={{...S.inp,textAlign:"center",fontSize:24,letterSpacing:10,maxWidth:180,display:"inline-block"}} />
                  {pinError && <p style={{color:"#c03030",fontSize:13,marginTop:12}}>PIN incorreto.</p>}
                  <div><button style={{...S.subBtn,marginTop:16,maxWidth:200,display:"inline-block"}} onClick={handlePin}>Entrar</button></div>
                </div>
              ) : (
                <div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                    <p style={{color:"#4a7aaa",fontSize:13}}>{membros.length} participante{membros.length!==1?"s":""}</p>
                    <button onClick={()=>setAdminOk(false)}
                      style={{background:"none",border:"1px solid #c8daea",color:"#1a6abf",padding:"6px 14px",borderRadius:6,cursor:"pointer",fontSize:12}}>
                      Sair
                    </button>
                  </div>
                  <button onClick={gerarPDF}
                    style={{width:"100%",padding:"11px",background:"linear-gradient(90deg,#1a7a40,#2aaa60)",border:"none",borderRadius:8,color:"#fff",fontWeight:600,cursor:"pointer",fontSize:14,marginBottom:20,boxShadow:"0 2px 8px rgba(42,170,96,0.3)"}}>
                    📄 Gerar PDF com todos os agendamentos
                  </button>
                  <label style={S.lbl}>Adicionar participante</label>
                  <div style={{display:"flex",gap:8,marginTop:6}} className="mob-addrow">
                    <input type="text" placeholder="Nome completo..." value={novoNome}
                      onChange={e=>{ setNovoNome(e.target.value); setNomeError(""); }}
                      onKeyDown={e=>e.key==="Enter" && handleAdicionarMembro()}
                      style={{...S.inp,flex:1}} />
                    <button onClick={handleAdicionarMembro}
                      style={{padding:"10px 20px",background:"linear-gradient(90deg,#1a6abf,#2a90ff)",border:"none",borderRadius:7,color:"#fff",fontWeight:600,cursor:"pointer",fontSize:14,whiteSpace:"nowrap"}}>
                      + Adicionar
                    </button>
                  </div>
                  {nomeError && <div style={S.errBox}>{nomeError}</div>}
                  <label style={{...S.lbl,marginTop:28}}>Participantes ({membros.length})</label>
                  <div style={{display:"flex",flexDirection:"column",gap:6,marginTop:8}}>
                    {[...membros].sort((a,b)=>a.localeCompare(b)).map(m => {
                      const agCount = agendamentos.filter(a=>a.nome===m||a.dupla===m).length
                                    + fixos.filter(f=>f.nome===m||f.dupla===m).length;
                      return (
                        <div key={m} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 14px",background:"#f8fbff",border:"1px solid #dce6f0",borderRadius:8}}>
                          <div style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#2a90ff,#1a6abf)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff",fontWeight:700,flexShrink:0}}>
                            {m.charAt(0).toUpperCase()}
                          </div>
                          <div style={{flex:1}}>
                            <span style={{color:"#1a2a3a",fontSize:14,fontWeight:500}}>{m}</span>
                            <span style={{color:"#7aa8b8",fontSize:11,marginLeft:10}}>{agCount} agendamento{agCount!==1?"s":""}</span>
                          </div>
                          <button onClick={()=>handleRemoverMembro(m)}
                            style={{background:"#fff0f0",border:"1px solid #f0b8b8",color:"#c03030",padding:"6px 12px",borderRadius:6,cursor:"pointer",fontSize:12}}>
                            Remover
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* MODAL */}
      {modal && (() => {
        const a  = modal.data;
        const ms = MOSTRUARIOS.find(m=>m.id===a.mostruario);
        const isOwner = true;
        const isFixo  = modal.type === "fixo";
        const dia = isFixo ? DIAS_SEMANA.find(d=>d.id===a.diaSemana) : null;
        const d   = !isFixo ? new Date(a.data+"T12:00:00") : null;
        return (
          <div style={S.overlay} onClick={()=>setModal(null)}>
            <div style={{...S.modalCard,...(isFixo?{borderTop:"4px solid #f0c040"}:{})}} onClick={e=>e.stopPropagation()}>
              {ms?.img && <img src={ms.img} alt={ms.label} style={{width:60,height:80,objectFit:"contain",marginBottom:10}} />}
              <h3 style={{margin:"0 0 4px",fontSize:20,fontWeight:700,color:"#1a2a3a"}}>{ms?.label}</h3>
              {isFixo
                ? <p style={{color:"#8a6a00",fontSize:13,margin:"4px 0"}}>🔁 Toda {dia?.label}</p>
                : <p style={{color:"#1a6abf",fontSize:13,margin:"4px 0",textTransform:"capitalize"}}>{fmtDate(d)}</p>
              }
              <p style={{fontSize:17,margin:"10px 0 4px",color:"#1a2a3a",fontWeight:"bold"}}>{a.horaInicio} - {a.horaFim}</p>
              <p style={{fontSize:14,margin:"6px 0 4px",color:"#5a8aaa"}}>{a.nome} e {a.dupla}</p>
              {a.local && <p style={{fontSize:13,margin:"4px 0 8px",color:"#1a6abf"}}>📍 {a.local}</p>}
              {isFixo && <p style={{fontSize:12,color:"#c09020",margin:"4px 0 8px"}}>Cancelar remove de todas as semanas</p>}
              <div style={{display:"flex",gap:8,marginTop:16,flexWrap:"wrap"}}>
                {(isOwner || adminOk) && (
                  <button style={{flex:1,padding:11,background:"#fff0f0",border:"1px solid #f0b8b8",borderRadius:8,color:"#c03030",cursor:"pointer",fontSize:13}}
                    onClick={handleCancelar}>Cancelar</button>
                )}
                {(isOwner || adminOk) && (
                  <button style={{flex:1,padding:11,background:"#fff8e0",border:"1px solid #f0d890",borderRadius:8,color:"#8a6a00",cursor:"pointer",fontSize:13,fontWeight:600}}
                    onClick={handleEditar}>✏️ Editar</button>
                )}
                <button style={{flex:1,padding:11,background:"#e8f3ff",border:"1px solid #90c0f0",borderRadius:8,color:"#1a6abf",cursor:"pointer",fontSize:13}}
                  onClick={()=>setModal(null)}>Fechar</button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* MODAL EDITAR */}
      {editModal && <EditarModal
        editModal={editModal}
        membros={membros}
        onSalvar={handleSalvarEdicao}
        onFechar={()=>setEditModal(null)}
        adminOk={adminOk}
      />}
    </div>
  );
}

function DisponibilidadeView({ agendamentos, fixos }) {
  const MOSTRUARIOS_LIST = [
    { id:"carrinho1", label:"Carrinho 1" },
    { id:"carrinho2", label:"Carrinho 2" },
    { id:"carrinho3", label:"Carrinho 3" },
    { id:"display",   label:"Display"    },
  ];
  const horas = Array.from({length:17},(_,i)=>`${String(i+6).padStart(2,"0")}:00`);

  const [dispMode,   setDispMode]   = useState("data");
  const [dispData,   setDispData]   = useState(dateKey(today()));
  const [dispDiaSem, setDispDiaSem] = useState(new Date().getDay());

  function isOcupado(mostruarioId, hora) {
    const horaFim = `${String(parseInt(hora)+1).padStart(2,"0")}:00`;
    if (dispMode === "data") {
      const diaSem = diaSemanaDeDate(dispData);
      const normalOcup = agendamentos.some(a =>
        a.data === dispData && a.mostruario === mostruarioId &&
        hoursOverlap(hora, horaFim, a.horaInicio, a.horaFim)
      );
      const fixoOcup = fixos.some(f =>
        f.diaSemana === diaSem && f.mostruario === mostruarioId &&
        hoursOverlap(hora, horaFim, f.horaInicio, f.horaFim)
      );
      return { ocupado: normalOcup || fixoOcup, fixo: fixoOcup && !normalOcup };
    } else {
      const fixoOcup = fixos.some(f =>
        f.diaSemana === dispDiaSem && f.mostruario === mostruarioId &&
        hoursOverlap(hora, horaFim, f.horaInicio, f.horaFim)
      );
      return { ocupado: fixoOcup, fixo: fixoOcup };
    }
  }

  function getInfo(mostruarioId, hora) {
    const horaFim = `${String(parseInt(hora)+1).padStart(2,"0")}:00`;
    if (dispMode === "data") {
      const diaSem = diaSemanaDeDate(dispData);
      const ag = agendamentos.find(a =>
        a.data === dispData && a.mostruario === mostruarioId &&
        hoursOverlap(hora, horaFim, a.horaInicio, a.horaFim)
      );
      if (ag) return `${ag.nome} e ${ag.dupla}`;
      const fx = fixos.find(f =>
        f.diaSemana === diaSem && f.mostruario === mostruarioId &&
        hoursOverlap(hora, horaFim, f.horaInicio, f.horaFim)
      );
      if (fx) return `${fx.nome} e ${fx.dupla} (fixo)`;
    } else {
      const fx = fixos.find(f =>
        f.diaSemana === dispDiaSem && f.mostruario === mostruarioId &&
        hoursOverlap(hora, horaFim, f.horaInicio, f.horaFim)
      );
      if (fx) return `${fx.nome} e ${fx.dupla}`;
    }
    return null;
  }

  return (
    <div>
      <div style={{background:"#fff",borderRadius:12,padding:"16px 20px",marginBottom:16,border:"1px solid #dce6f0",boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          <button onClick={()=>setDispMode("data")}
            style={{flex:1,padding:"9px 8px",background:dispMode==="data"?"#e8f3ff":"#f5f9ff",border:`1px solid ${dispMode==="data"?"#2a90ff":"#c8daea"}`,borderRadius:8,cursor:"pointer",fontSize:13,color:dispMode==="data"?"#1a6abf":"#4a7aaa",fontWeight:dispMode==="data"?600:400}}>
            📅 Por data
          </button>
          <button onClick={()=>setDispMode("semana")}
            style={{flex:1,padding:"9px 8px",background:dispMode==="semana"?"#e8f3ff":"#f5f9ff",border:`1px solid ${dispMode==="semana"?"#2a90ff":"#c8daea"}`,borderRadius:8,cursor:"pointer",fontSize:13,color:dispMode==="semana"?"#1a6abf":"#4a7aaa",fontWeight:dispMode==="semana"?600:400}}>
            🔁 Por dia da semana
          </button>
        </div>
        {dispMode==="data" ? (
          <input type="date" value={dispData} onChange={e=>setDispData(e.target.value)}
            style={{width:"100%",padding:"10px 12px",background:"#f5f9ff",border:"1px solid #c8daea",borderRadius:7,color:"#1a2a3a",fontSize:14,boxSizing:"border-box"}} />
        ) : (
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {["Domingo","Segunda","Terca","Quarta","Quinta","Sexta","Sabado"].map((d,i)=>(
              <button key={i} onClick={()=>setDispDiaSem(i)}
                style={{flex:1,minWidth:60,padding:"8px 4px",background:dispDiaSem===i?"#e8f3ff":"#f5f9ff",border:`1px solid ${dispDiaSem===i?"#2a90ff":"#c8daea"}`,borderRadius:8,cursor:"pointer",fontSize:12,color:dispDiaSem===i?"#1a6abf":"#4a7aaa",fontWeight:dispDiaSem===i?600:400}}>
                {d}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{display:"flex",gap:12,marginBottom:12,flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:"#4a7aaa"}}>
          <div style={{width:14,height:14,borderRadius:3,background:"#d0f0d8",border:"1px solid #60b878"}}></div> Livre
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:"#4a7aaa"}}>
          <div style={{width:14,height:14,borderRadius:3,background:"#ffd8d8",border:"1px solid #e08080"}}></div> Ocupado
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:"#4a7aaa"}}>
          <div style={{width:14,height:14,borderRadius:3,background:"#fff0c0",border:"1px solid #d0a830"}}></div> Fixo
        </div>
      </div>

      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:400}}>
          <thead>
            <tr>
              <th style={{padding:"8px 10px",background:"#1a6abf",color:"#fff",textAlign:"left",minWidth:60}}>Horário</th>
              {MOSTRUARIOS_LIST.map(m=>(
                <th key={m.id} style={{padding:"8px 10px",background:"#1a6abf",color:"#fff",textAlign:"center",minWidth:90}}>{m.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horas.map((hora,hi) => (
              <tr key={hora} style={{background:hi%2===0?"#fff":"#f8fbff"}}>
                <td style={{padding:"7px 10px",fontWeight:600,color:"#4a7aaa",borderBottom:"1px solid #eef2f8",whiteSpace:"nowrap"}}>{hora}</td>
                {MOSTRUARIOS_LIST.map(m => {
                  const {ocupado, fixo} = isOcupado(m.id, hora);
                  const info = getInfo(m.id, hora);
                  const bg = fixo ? "#fff0c0" : ocupado ? "#ffd8d8" : "#d0f0d8";
                  const border = fixo ? "1px solid #d0a830" : ocupado ? "1px solid #e08080" : "1px solid #60b878";
                  return (
                    <td key={m.id} style={{padding:"5px 8px",borderBottom:"1px solid #eef2f8",textAlign:"center"}}>
                      <div style={{background:bg,border,borderRadius:6,padding:"4px 6px",minHeight:28,display:"flex",alignItems:"center",justifyContent:"center"}}>
                        {info
                          ? <span style={{fontSize:10,color:fixo?"#8a6a00":ocupado?"#c03030":"#207040",lineHeight:1.3,textAlign:"center"}}>{info}</span>
                          : <span style={{fontSize:11,color:"#207040"}}>✓</span>
                        }
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EditarModal({ editModal, membros, onSalvar, onFechar }) {
  const { type, data } = editModal;
  const isFixo = type === "fixo";

  const MOSTRUARIOS = [
    { id: "carrinho1", label: "Carrinho 1" },
    { id: "carrinho2", label: "Carrinho 2" },
    { id: "carrinho3", label: "Carrinho 3" },
    { id: "display",   label: "Display"    },
  ];
  const LOCAIS = ["Supermercado Bem Bom","Praca da Juventude","Tendi Tudo"];
  const DIAS_SEMANA = [
    {id:0,label:"Domingo"},{id:1,label:"Segunda"},{id:2,label:"Terca"},
    {id:3,label:"Quarta"},{id:4,label:"Quinta"},{id:5,label:"Sexta"},{id:6,label:"Sabado"},
  ];
  const HOURS = Array.from({length:17},(_,i)=>`${String(i+6).padStart(2,"0")}:00`);

  const [f, setF] = useState({
    nome:       data.nome,
    dupla:      data.dupla,
    mostruario: data.mostruario,
    local:      data.local || "",
    horaInicio: data.horaInicio,
    horaFim:    data.horaFim,
    data:       data.data || "",
    diaSemana:  data.diaSemana ?? 1,
  });
  const [erro, setErro] = useState("");

  function salvar() {
    if (!f.nome)       return setErro("Selecione seu nome.");
    if (!f.dupla)      return setErro("Selecione a dupla.");
    if (f.nome===f.dupla) return setErro("Voce e a dupla nao podem ser iguais.");
    if (!f.mostruario) return setErro("Selecione o mostruario.");
    if (!f.local)      return setErro("Selecione o local.");
    if (f.horaInicio >= f.horaFim) return setErro("Horario final deve ser maior que o inicial.");
    onSalvar(f);
  }

  const lbl = { display:"block", fontSize:10, letterSpacing:2.5, textTransform:"uppercase", color:"#1a6abf", marginBottom:6, marginTop:16, opacity:0.9 };
  const sel = { width:"100%", padding:"10px 12px", background:"#f5f9ff", border:"1px solid #c8daea", borderRadius:7, color:"#1a2a3a", fontSize:14 };
  const inp = { width:"100%", padding:"10px 12px", background:"#f5f9ff", border:"1px solid #c8daea", borderRadius:7, color:"#1a2a3a", fontSize:14 };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(10,30,60,0.6)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:16}}
      onClick={onFechar}>
      <div style={{background:"#fff",borderRadius:14,padding:"28px 24px",maxWidth:480,width:"100%",boxShadow:"0 8px 40px rgba(0,0,0,0.18)",maxHeight:"90vh",overflowY:"auto"}}
        onClick={e=>e.stopPropagation()}>
        <h3 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:"#1a2a3a"}}>✏️ Editar Agendamento</h3>
        {isFixo && <p style={{fontSize:12,color:"#8a6a00",marginBottom:4}}>🔁 Agendamento fixo — alteração vale para todas as semanas</p>}

        <div style={{display:"flex",gap:12,marginTop:4}}>
          <div style={{flex:1}}>
            <label style={lbl}>Seu nome</label>
            <select style={sel} value={f.nome} onChange={e=>setF(x=>({...x,nome:e.target.value}))}>
              <option value="">Selecione...</option>
              {membros.map(m=><option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div style={{flex:1}}>
            <label style={lbl}>Dupla</label>
            <select style={sel} value={f.dupla} onChange={e=>setF(x=>({...x,dupla:e.target.value}))}>
              <option value="">Selecione...</option>
              {membros.filter(m=>m!==f.nome).map(m=><option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        <label style={lbl}>Mostruario</label>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginTop:6}}>
          {MOSTRUARIOS.map(m=>(
            <button key={m.id} onClick={()=>setF(x=>({...x,mostruario:m.id}))}
              style={{padding:"10px 4px",background:f.mostruario===m.id?"#e8f3ff":"#f5f9ff",border:`1px solid ${f.mostruario===m.id?"#2a90ff":"#c8daea"}`,borderRadius:8,cursor:"pointer",fontSize:12,color:f.mostruario===m.id?"#1a6abf":"#4a7aaa",fontWeight:f.mostruario===m.id?600:400}}>
              {m.label}
            </button>
          ))}
        </div>

        <label style={lbl}>Local</label>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:6}}>
          {LOCAIS.map(l=>(
            <button key={l} onClick={()=>setF(x=>({...x,local:l}))}
              style={{padding:"8px 14px",background:f.local===l?"#e8f3ff":"#f5f9ff",border:`1px solid ${f.local===l?"#2a90ff":"#c8daea"}`,borderRadius:8,cursor:"pointer",fontSize:13,color:f.local===l?"#1a6abf":"#4a7aaa",fontWeight:f.local===l?600:400}}>
              📍 {l}
            </button>
          ))}
        </div>

        {isFixo ? (
          <div>
            <label style={lbl}>Dia da semana</label>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:6}}>
              {DIAS_SEMANA.map(d=>(
                <button key={d.id} onClick={()=>setF(x=>({...x,diaSemana:d.id}))}
                  style={{padding:"7px 10px",background:f.diaSemana===d.id?"#e8f3ff":"#f5f9ff",border:`1px solid ${f.diaSemana===d.id?"#2a90ff":"#c8daea"}`,borderRadius:8,cursor:"pointer",fontSize:12,color:f.diaSemana===d.id?"#1a6abf":"#4a7aaa",fontWeight:f.diaSemana===d.id?600:400}}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <label style={lbl}>Data</label>
            <input type="date" style={inp} value={f.data} onChange={e=>setF(x=>({...x,data:e.target.value}))} />
          </div>
        )}

        <div style={{display:"flex",gap:12,marginTop:4}}>
          <div style={{flex:1}}>
            <label style={lbl}>Horario inicial</label>
            <select style={sel} value={f.horaInicio} onChange={e=>setF(x=>({...x,horaInicio:e.target.value}))}>
              {HOURS.map(h=><option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          <div style={{flex:1}}>
            <label style={lbl}>Horario final</label>
            <select style={sel} value={f.horaFim} onChange={e=>setF(x=>({...x,horaFim:e.target.value}))}>
              {HOURS.filter(h=>h>f.horaInicio).map(h=><option key={h} value={h}>{h}</option>)}
            </select>
          </div>
        </div>

        {erro && <div style={{marginTop:12,padding:"10px 14px",background:"#fff0f0",border:"1px solid #f0b8b8",borderRadius:7,fontSize:13,color:"#c03030"}}>{erro}</div>}

        <div style={{display:"flex",gap:10,marginTop:20}}>
          <button onClick={salvar}
            style={{flex:2,padding:13,background:"linear-gradient(90deg,#1a6abf,#2a90ff)",border:"none",borderRadius:8,color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",boxShadow:"0 4px 12px rgba(42,144,255,0.3)"}}>
            Salvar alterações
          </button>
          <button onClick={onFechar}
            style={{flex:1,padding:13,background:"#f5f9ff",border:"1px solid #c8daea",borderRadius:8,color:"#4a7aaa",fontSize:14,cursor:"pointer"}}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

const S = {
  root:       { width:"100%", minHeight:"100vh", background:"#f0f4f8", fontFamily:"'Segoe UI',sans-serif", color:"#1a2a3a" },
  header:     { width:"100%", background:"linear-gradient(90deg,#1a6abf,#2a90ff)", padding:"18px 20px", boxShadow:"0 2px 12px rgba(42,144,255,0.25)" },
  hInner:     { maxWidth:1200, margin:"0 auto" },
  hTag:       { fontSize:10, letterSpacing:4, textTransform:"uppercase", color:"rgba(255,255,255,0.75)", marginBottom:4 },
  hTitle:     { margin:0, fontSize:22, fontWeight:700, color:"#ffffff", letterSpacing:0.5 },
  nav:        { display:"flex", justifyContent:"center", background:"#ffffff", borderBottom:"1px solid #dce6f0", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" },
  navBtn:     { flex:"0 0 130px", padding:"13px 8px", background:"none", border:"none", color:"#7a9ab8", cursor:"pointer", fontSize:13, display:"flex", alignItems:"center", justifyContent:"center", gap:6, borderBottom:"2px solid transparent", transition:"all 0.2s" },
  navActive:  { color:"#1a6abf", borderBottom:"2px solid #2a90ff", background:"#f5f9ff" },
  main:       { width:"100%", maxWidth:1200, margin:"0 auto", padding:"24px 20px 80px" },
  weekNav:    { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, gap:8 },
  wBtn:       { background:"#ffffff", border:"1px solid #c8daea", color:"#1a6abf", padding:"7px 16px", borderRadius:6, cursor:"pointer", fontSize:12, boxShadow:"0 1px 3px rgba(0,0,0,0.06)" },
  dGrid:      { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:12 },
  dayCard:    { background:"#ffffff", border:"1px solid #dce6f0", borderRadius:10, overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,0.05)" },
  dayToday:   { border:"1px solid #2a90ff", boxShadow:"0 0 0 3px rgba(42,144,255,0.12)" },
  dayHead:    { padding:"10px 14px", background:"#f5f9ff", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #dce6f0" },
  dayName:    { fontSize:12, color:"#4a7aaa", textTransform:"capitalize", letterSpacing:0.5, fontWeight:600 },
  agCard:     { display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:"#f8fbff", border:"1px solid #dce6f0", borderRadius:8, cursor:"pointer" },
  fixoTag:    { fontSize:10, letterSpacing:1, textTransform:"uppercase", background:"#fff8e0", color:"#8a6a00", border:"1px solid #f0d890", borderRadius:4, padding:"2px 6px" },
  formWrap:   { display:"flex", justifyContent:"center" },
  formCard:   { background:"#ffffff", border:"1px solid #dce6f0", borderRadius:12, padding:"28px 24px", width:"100%", maxWidth:700, boxSizing:"border-box", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" },
  formTitle:  { margin:"0 0 20px", fontSize:18, fontWeight:700, color:"#1a2a3a" },
  lbl:        { display:"block", fontSize:10, letterSpacing:2.5, textTransform:"uppercase", color:"#1a6abf", marginBottom:6, marginTop:16, opacity:0.9 },
  sel:        { width:"100%", padding:"10px 12px", background:"#f5f9ff", border:"1px solid #c8daea", borderRadius:7, color:"#1a2a3a", fontSize:14 },
  inp:        { width:"100%", padding:"10px 12px", background:"#f5f9ff", border:"1px solid #c8daea", borderRadius:7, color:"#1a2a3a", fontSize:14 },
  row2:       { display:"flex", gap:12 },
  row3:       { display:"flex", gap:12, marginTop:4 },
  mGrid:      { display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:8, marginTop:8 },
  mBtn:       { display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"12px 6px", background:"#f5f9ff", border:"1px solid #c8daea", borderRadius:8, cursor:"pointer", transition:"all 0.2s" },
  mBtnActive: { border:"1px solid #2a90ff", background:"#e8f3ff", boxShadow:"0 0 0 3px rgba(42,144,255,0.12)" },
  errBox:     { marginTop:14, padding:"10px 14px", background:"#fff0f0", border:"1px solid #f0b8b8", borderRadius:7, fontSize:13, color:"#c03030" },
  successBox: { padding:20, textAlign:"center", background:"#f0fff5", border:"1px solid #90d0a8", borderRadius:8, fontSize:16, color:"#207040" },
  subBtn:     { marginTop:20, width:"100%", padding:14, background:"linear-gradient(90deg,#1a6abf,#2a90ff)", border:"none", borderRadius:8, color:"#fff", fontSize:15, fontWeight:600, cursor:"pointer", letterSpacing:0.5, boxShadow:"0 4px 12px rgba(42,144,255,0.3)" },
  overlay:    { position:"fixed", inset:0, background:"rgba(10,30,60,0.5)", backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, padding:16 },
  localBtn:   { padding:"9px 16px", background:"#f5f9ff", border:"1px solid #c8daea", borderRadius:8, color:"#4a7aaa", cursor:"pointer", fontSize:13 },
  localBtnActive: { border:"1px solid #2a90ff", background:"#e8f3ff", color:"#1a6abf", fontWeight:600 },
  tipoBtn:    { flex:1, padding:"10px 8px", background:"#f5f9ff", border:"1px solid #c8daea", borderRadius:8, color:"#4a7aaa", cursor:"pointer", fontSize:13 },
  tipoBtnActive: { border:"1px solid #2a90ff", background:"#e8f3ff", color:"#1a6abf", fontWeight:600 },
  diaBtn:     { padding:"8px 12px", background:"#f5f9ff", border:"1px solid #c8daea", borderRadius:8, color:"#4a7aaa", cursor:"pointer", fontSize:13 },
  diaBtnActive: { border:"1px solid #2a90ff", background:"#e8f3ff", color:"#1a6abf", fontWeight:600 },
  modalCard:  { background:"#ffffff", border:"1px solid #dce6f0", borderRadius:14, padding:"28px 24px", maxWidth:380, width:"100%", textAlign:"center", boxShadow:"0 8px 40px rgba(0,0,0,0.15)" },
};
