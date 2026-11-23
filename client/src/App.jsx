import { useMemo, useState } from 'react';
import { apps as initialApps } from './data';
import './App.css';


const categories = [...new Set(initialApps.map(a => a.category))];
const steps = [
  { n: '01', title: 'Discover', desc: 'Search official developer portals and API documentation for each app.' },
  { n: '02', title: 'Extract', desc: 'Capture auth methods, access requirements, API types, MCP support and key prerequisites.' },
  { n: '03', title: 'Classify', desc: 'Normalize findings into consistent fields and assign an agent-toolkit buildability verdict.' },
  { n: '04', title: 'Cite', desc: 'Attach source URLs to each claim; prioritize official documentation.' },
  { n: '05', title: 'Verify', desc: 'Human-review a sample, record hits/misses and correct unsupported claims before reporting accuracy.' },
];

function App() {
  const [items, setItems] = useState(initialApps);
  const [tab, setTab] = useState('Overview');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All categories');
  const [status, setStatus] = useState('All statuses');
  const [selected, setSelected] = useState(null);
  const [verifiedFilter, setVerifiedFilter] = useState(false);

  const researched = items.filter(a => a.status !== 'Pending research').length;
  const verified = items.filter(a => a.verified).length;
  const filtered = useMemo(() => items.filter(a =>
    (category === 'All categories' || a.category === category) &&
    (status === 'All statuses' || a.status === status) &&
    (!verifiedFilter || a.verified) &&
    `${a.name} ${a.category}`.toLowerCase().includes(query.toLowerCase())
  ), [items, category, status, verifiedFilter, query]);

  const exportCsv = () => {
    const cols = ['id','name','category','auth','access','api','mcp','verdict','blocker','evidence','status','verified'];
    const csv = [cols.join(','), ...items.map(row => cols.map(c => `"${String(row[c] ?? '').replaceAll('"','""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'app-integration-research.csv'; link.click(); URL.revokeObjectURL(link.href);
  };

  const markReviewed = (id) => setItems(prev => prev.map(a => a.id === id ? { ...a, verified: !a.verified, status: !a.verified ? 'Human reviewed' : 'Pending research' } : a));


  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-icon">◈</span><div><b>Integration Atlas</b><small>AI Research Workbench</small></div></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav>{['Overview','Research matrix','Agent workflow','Verification'].map((t,i)=><button key={t} className={tab===t?'nav-active':''} onClick={()=>setTab(t)}><span className="nav-icon">{['▦','☷','⌘','✓'][i]}</span>{t}</button>)}</nav>
      <div className="sidebar-bottom"><div className="project-tag"><span className="pulse"/> Research set <b>100 apps</b></div><div className="sidebar-note">Take-home case study<br/>AI Product Ops Intern</div></div>
    </aside>
    <main className="main">
      <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> Integration research</div><div className="top-right"><span className="status-pill"><i/> Starter dataset</span><button className="export-btn" onClick={exportCsv}>↓ Export CSV</button></div></header>
      <div className="content">
        <div className="page-heading"><div><div className="eyebrow">TAKE-HOME PROJECT · RESEARCH PIPELINE</div><h1>{tab === 'Overview' ? 'Integration landscape' : tab}</h1><p>{tab==='Overview'?'A research workspace to assess how ready 100 apps are to become agent-callable tools.':tab==='Research matrix'?'Review the 100-app research set, source hints and field completion status.':tab==='Agent workflow'?'A transparent workflow for researching, structuring and citing integration readiness.':'A human-in-the-loop review area for documenting validation honestly.'}</p></div><div className="deadline-chip"><span className="dot-yellow"/> Research status <b>{researched}/100 started</b></div></div>
        {tab==='Overview' && <>
          <div className="notice"><span>ⓘ</span><div><b>Research has not been run yet.</b><p>This project includes the full 100-app research set and workflow scaffolding. No app findings or accuracy scores are fabricated.</p></div><button onClick={()=>setTab('Research matrix')}>Open research matrix ↗</button></div>
          <section className="stat-grid"><Stat title="Apps in scope" value="100" detail="10 categories · assignment list" icon="▤"/><Stat title="Research started" value={`${researched}`} detail={`${100-researched} apps still pending`} icon="⌕"/><Stat title="Human verified" value={`${verified}`} detail="Review marks recorded locally" icon="✓"/><Stat title="Evidence coverage" value="0%" detail="No claims sourced yet" icon="↗"/></section>
          <div className="two-col"><section className="panel category-panel"><div className="panel-head"><div><h2>Research set by category</h2><p>Scope distribution from the assignment list</p></div><span className="soft-tag">100 apps</span></div><div className="category-bars">{categories.map(c=>{const count=items.filter(a=>a.category===c).length;return <div className="bar-row" key={c}><span>{c}</span><div className="bar-track"><div className="bar-fill" style={{width:`${count/10*100}%`}}/></div><b>{count}</b></div>})}</div></section>
          <section className="panel insight-panel"><div className="panel-head"><div><h2>Early hypotheses to test</h2><p>Not findings — research questions</p></div><span className="spark">✦</span></div><div className="hypothesis"><span>01</span><div><b>OAuth vs API key prevalence</b><p>Which auth pattern dominates by app category?</p></div></div><div className="hypothesis"><span>02</span><div><b>Self-serve access friction</b><p>Are finance, ads and enterprise apps more gated?</p></div></div><div className="hypothesis"><span>03</span><div><b>Buildability blockers</b><p>Scopes, review, rate limits or limited API surface?</p></div></div></section></div>
          <section className="panel recent-panel"><div className="panel-head"><div><h2>Apps in the research queue</h2><p>Quick access to the full application matrix</p></div><button className="text-btn" onClick={()=>setTab('Research matrix')}>View all 100 ↗</button></div><div className="queue-list">{items.slice(0,6).map(a=><div className="queue-item" key={a.id}><div className="app-avatar">{a.name.slice(0,1)}</div><div className="queue-name"><b>{a.name}</b><small>{a.category}</small></div><span className="pending-badge">Pending</span><button className="row-arrow" onClick={()=>setSelected(a)}>↗</button></div>)}</div></section>
        </>}
        {tab==='Research matrix' && <section className="panel matrix-panel"><div className="panel-head"><div><h2>Application research matrix</h2><p>All 100 apps are preloaded. Fields remain unverified until evidence is collected.</p></div><button className="export-btn" onClick={exportCsv}>↓ Export CSV</button></div><div className="filters"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search app or category…"/><select value={category} onChange={e=>setCategory(e.target.value)}><option>All categories</option>{categories.map(c=><option key={c}>{c}</option>)}</select><select value={status} onChange={e=>setStatus(e.target.value)}><option>All statuses</option><option>Pending research</option><option>Human reviewed</option></select><button className={verifiedFilter?'filter-on':'filter-btn'} onClick={()=>setVerifiedFilter(v=>!v)}>✓ Verified only</button></div><div className="table-wrap"><table><thead><tr><th>#</th><th>Application</th><th>Category</th><th>Auth</th><th>Access</th><th>API / MCP</th><th>Buildability</th><th>Status</th></tr></thead><tbody>{filtered.map(a=><tr key={a.id} onClick={()=>setSelected(a)}><td className="number-cell">{String(a.id).padStart(2,'0')}</td><td><b className="app-name-cell">{a.name}</b><small className="sub-cell">{a.url?.replace(/^https?:\/\//,'')||'No source hint'}</small></td><td>{a.category}</td><td><span className="unknown">Unknown</span></td><td><span className="unknown">Unknown</span></td><td><span className="unknown">Not checked</span></td><td><span className="unknown">Pending</span></td><td><span className={a.verified?'reviewed':'pending-badge'}>{a.verified?'Reviewed':'Pending'}</span></td></tr>)}</tbody></table>{filtered.length===0&&<div className="empty-state">No apps match those filters.</div>}</div><div className="table-foot">Showing {filtered.length} of 100 applications · Click a row to open the research record.</div></section>}
        {tab==='Agent workflow' && <><section className="panel workflow-panel"><div className="panel-head"><div><h2>Research agent workflow</h2><p>Proposed pipeline architecture for the assignment</p></div><span className="soft-tag">Human-in-the-loop</span></div><div className="workflow-grid">{steps.map((s,i)=><div className="workflow-step" key={s.n}><div className="step-top"><span>{s.n}</span>{i<steps.length-1&&<div className="step-connector"/>}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div><div className="workflow-callout"><b>Research loop</b><p>For each app, query official docs first, extract structured fields, attach source URLs, flag missing/ambiguous evidence, and route uncertain claims to a reviewer. Re-run after corrections.</p></div></section><div className="two-col"><section className="panel"><h2>Agent responsibilities</h2><ul className="bullet-list"><li>Find official API/auth documentation</li><li>Extract evidence-backed fields into a normalized schema</li><li>Label unknowns instead of guessing</li><li>Suggest toolkit feasibility and likely blocker</li><li>Produce category-level pattern summaries once data is populated</li></ul></section><section className="panel"><h2>Human responsibilities</h2><ul className="bullet-list"><li>Confirm official source domains</li><li>Resolve contradictory or outdated documentation</li><li>Check gated access and scope restrictions</li><li>Sample claims and record misses transparently</li><li>Approve final pattern conclusions</li></ul></section></div></>}
        {tab==='Verification' && <><section className="panel verification-panel"><div className="panel-head"><div><h2>Verification ledger</h2><p>Mark an app as human reviewed after checking its evidence. Review status is stored in this session only.</p></div><span className="soft-tag">Accuracy not measured</span></div><div className="verify-summary"><div><strong>{verified}</strong><span>reviewed</span></div><div><strong>{items.length-verified}</strong><span>unreviewed</span></div><div><strong>—</strong><span>accuracy</span></div></div><div className="verify-list">{items.slice(0,20).map(a=><div className="verify-row" key={a.id}><div className="app-avatar">{a.name[0]}</div><div className="queue-name"><b>{a.name}</b><small>{a.category}</small></div>{a.url&&<a href={a.url} target="_blank" rel="noreferrer" className="source-link">Open source ↗</a>}<button className={a.verified?'review-btn checked':'review-btn'} onClick={()=>markReviewed(a.id)}>{a.verified?'✓ Reviewed':'Mark reviewed'}</button></div>)}</div><p className="verify-note">The review toggle records that you inspected the app’s source hint. It does not calculate factual accuracy; a proper hit/miss comparison requires populated agent claims and a human reference result.</p></section></>}
      </div>
    </main>
    {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><div className="detail-modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelected(null)}>×</button><div className="eyebrow">APP RESEARCH RECORD · #{selected.id}</div><h2>{selected.name}</h2><p className="modal-category">{selected.category}</p><div className="detail-fields">{[['Authentication','Not researched'],['Self-serve / gated','Not researched'],['API surface','Not researched'],['MCP support','Not checked'],['Buildability','Pending research'],['Main blocker','Not assessed']].map(([k,v])=><div className="detail-field" key={k}><small>{k}</small><b>{v}</b></div>)}</div><div className="detail-source"><b>Source starting point</b>{selected.url?<a href={selected.url} target="_blank" rel="noreferrer">{selected.url} ↗</a>:<span>No URL supplied in assignment</span>}<p>Source hint comes from the assignment list. Claims have not been researched or validated.</p></div><button className="export-btn modal-action" onClick={()=>{setSelected(null);setTab('Agent workflow')}}>Review research workflow</button></div></div>}
  </div>;
}
function Stat({title,value,detail,icon}){return <div className="stat-card"><div className="stat-top"><span>{title}</span><i>{icon}</i></div><strong>{value}</strong><small>{detail}</small></div>}
export default App;
