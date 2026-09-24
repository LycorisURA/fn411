<script id="course-search">
/* ============================================================
   Search layer — a full-text, offline search over everything on
   the page (sections, worked problems, every quiz question,
   formulas, flashcards, Excel notes) plus the question finder
   from the Excel solver. Replaces the jump palette's matcher;
   Ctrl+K, / and the ⌕ button all open it. Nothing leaves the page.
   ============================================================ */

/* ---------------- the question finder (same rows as the Excel solver's Start sheet) ----------------
   q: what the question asks · w: words to look for · need: what you need · xl: solver sheet
   go: [topic, heading or worked-problem source to land on, short label]                      */
var FINDER = [
  {g:"One asset or one return · lecture 2", rows:[
    {q:"Find the VaR of one asset whose return has mean μ and SD σ", w:"“normally distributed” · N(μ, σ) · 1% / 5% quantile · VaR in Baht", need:"μ, σ, α, amount", xl:"Normal VaR",
     go:[["mr","The deck's worked example","worked example"],["mr","VaR and ES bench","bench"]]},
    {q:"Find expected shortfall, a 10-day VaR, or the chance of a loss", w:"“expected shortfall” · C-VaR · “10-day” · “probability of a loss”", need:"μ, σ, α, days", xl:"Normal VaR",
     go:[["mr","Expected shortfall, and why","ES"],["mr","Changing the horizon","horizon"]]},
    {q:"Test whether the mean return is significantly different from zero", w:"“t-statistic” · “significantly different” · H₀: μ = 0", need:"n, mean, SD or variance", xl:"Normal VaR",
     go:[["mr","The t-test","t-test"]]}
  ]},
  {g:"Money spread over several assets · lecture 2", rows:[
    {q:"Find the VaR of money invested in two or more assets", w:"“invested $X in … and $Y in …” · gold and silver · daily volatility · correlation", need:"amounts, σ's, ρ's, α, days", xl:"Asset VaR",
     go:[["pset","Additional question 1","additional Q1"]]},
    {q:"Find the diversification benefit, or marginal / component / incremental VaR", w:"“benefit of diversification” · marginal · component · incremental · “increase gold by 1%”", need:"(same as above)", xl:"Asset VaR",
     go:[["fix","Marginal and component VaR","marginal & component"],["pset","Additional question 1","additional Q1"]]},
    {q:"Find the VaR when the weights w and the covariance matrix Ω are given", w:"weight vector · variance-covariance matrix · wᵀΩw", need:"w, μ, Ω", xl:"Custom w",
     go:[["start","The whole course in three symbols","master formula"]]}
  ]},
  {g:"Working from a table of data · lecture 2", rows:[
    {q:"Work out μ, σ, covariances and correlations from past prices or rates", w:"“the table below shows … days of” · estimate · skewness · kurtosis", need:"paste the table", xl:"Data",
     go:[["mr","Estimating μ and σ","estimating"],["xl","The build order","Excel steps"]]},
    {q:"Update a volatility estimate with EWMA", w:"EWMA · λ = 0.94 · exponentially weighted", need:"λ, yesterday's σ and return", xl:"EWMA",
     go:[["mr","EWMA bench","EWMA"]]}
  ]},
  {g:"T-bills and zero-coupon bonds · lecture 3", rows:[
    {q:"Price a T-bill / zero-coupon bond, or find its duration", w:"T-bill · discount rate · Macaulay / modified duration", need:"face, yield, maturity, compounding", xl:"ZCB",
     go:[["fix","The T-bill example","T-bill example"],["fix","From Taylor to duration","duration"]]},
    {q:"Find the VaR of a T-bill / zero-coupon bond", w:"past discount rates · change in yield · VaR of the T-bill", need:"past rates, or μ_dy and σ_dy", xl:"ZCB",
     go:[["fix","The T-bill example","T-bill example"],["fix","Zero-coupon VaR bench","bench"]]}
  ]},
  {g:"Coupon bonds · lecture 3", rows:[
    {q:"Price a coupon bond from spot rates; its weights and duration", w:"coupon · paid annually / semi-annually · spot (zero) curve · portfolio of zeros", need:"face, coupon %, maturity, spot rates", xl:"Coupon Bond",
     go:[["fix","A coupon bond is a portfolio of zeros","portfolio of zeros"],["fix","The five-year coupon bond","5-year bond"]]},
    {q:"Find the VaR of a coupon bond", w:"VaR of the bond · yield changes dy₁ … dyₙ · adjusted weights", need:"+ μ and Ω of the yield changes", xl:"Coupon Bond",
     go:[["fix","The five-year coupon bond","5-year bond"],["pset","Lecture 5 practice","practice problem"]]}
  ]},
  {g:"A portfolio mixing bonds, stocks and options · lectures 3–4", rows:[
    {q:"Find the VaR of a portfolio of bonds AND stocks", w:"“20 one-year ZCBs and 100 shares of …” · additional Q2 · basic assets", need:"one row per holding", xl:"Portfolio A",
     go:[["pset","Additional question 2","additional Q2"],["fix","A portfolio of basic assets","bond + stock"]]},
    {q:"Find the VaR of stocks plus an option — Greeks or building block", w:"“shares plus a put on the index” · additional Q3", need:"one row per holding", xl:"Portfolio B",
     go:[["pset","Additional question 3","additional Q3"]]}
  ]},
  {g:"Options · lecture 4", rows:[
    {q:"Price a call or put with Black-Scholes; Delta, Rho, Gamma, Vega, Theta", w:"Black-Scholes · Greeks · European call / put · d₁, d₂", need:"S, K, y, σ, T", xl:"Option BSM",
     go:[["opt","Black-Scholes-Merton","BSM"],["opt","Two Greeks, not five","Greeks"]]},
    {q:"Find an option's VaR using its Delta and Rho (Greeks method)", w:"“option pricing model approach” · r_Op = Δ(S/Op)·r_S + (ρ/Op)·dy", need:"+ μ and Ω of [r_S ; dy]", xl:"Option BSM",
     go:[["opt","The main example","main example"],["opt","Option VaR bench","bench"]]},
    {q:"Find an option's VaR with the building-block (binomial) method", w:"equivalent asset · replicating portfolio · building block · LEGO · up / down", need:"S, K, σ, y, T", xl:"Option Binomial",
     go:[["opt","The building block route","building block"]]},
    {q:"Price a digital (cash-or-nothing) option; its Delta and Rho", w:"digital · binary · cash-or-nothing · “pays 1 if”", need:"S, K, y, σ, T", xl:"Option BSM",
     go:[["pset","Lecture 4 practice","exercise"]]},
    {q:"Check a Greek numerically by bumping S or y", w:"numerical Greeks · central difference · dS, dy", need:"ΔS, Δy", xl:"Option BSM",
     go:[["opt","Greeks by numerical differentiation","numerical Greeks"]]},
    {q:"Check put-call parity, or say whether the call or the put is riskier", w:"put-call parity · “compare the risk of the call and the put”", need:"(same as Black-Scholes)", xl:"Option BSM",
     go:[["opt","The main example","main example"],["exam","Moderately difficult · 2","exam item"]]},
    {q:"Delta-hedge or rho-hedge an option, or cut the risk another way", w:"delta hedge · rho hedge · reduce exposure · diversify", need:"option inputs, number held", xl:"Hedge",
     go:[["opt","Managing the risk","managing risk"]]}
  ]},
  {g:"Forwards and futures · lecture 5", rows:[
    {q:"Find the value and VaR of a forward contract", w:"forward · long call + short put · delivery price", need:"S, K, σ, y, T", xl:"Forward",
     go:[["fut","The forward example","forward example"],["exam","Difficult · 2","exam item"]]},
    {q:"Price a futures on a stock or index, and find its VaR", w:"futures · cost of carry · TFEX · SET50 futures · weights in money", need:"S₀, y_T, T", xl:"Futures",
     go:[["fut","Cost of carry","cost of carry"]]},
    {q:"Price a futures on a zero-coupon bond; the forward rate", w:"futures on a ZCB · forward rate (T)f(N)", need:"T, N, y_T, y_(T+N)", xl:"Futures",
     go:[["fut","Zero-coupon bond futures","ZCB futures"]]},
    {q:"Price a futures on a coupon bond, or check whether a quote is possible", w:"futures on a coupon bond · “is this price correct?”", need:"cash flows, spot rates", xl:"Futures",
     go:[["fut","Coupon bond futures","CB futures"],["exam","Difficult · 1","exam item"]]}
  ]},
  {g:"Hedging · lectures 4–5", rows:[
    {q:"Minimise a bond's risk with several futures — can the risk be removed?", w:"“minimise the risk” · optimal number of futures · “eliminate” · basis risk", need:"exposures (defaults = the practice)", xl:"Hedge",
     go:[["fut","The practice problem","practice problem"],["pset","Lecture 5 practice","worked"]]},
    {q:"Find the hedge ratio and how many futures contracts to short", w:"hedge ratio · h* = ρσ_S/σ_F · number of contracts", need:"σ_S, σ_F, ρ, sizes", xl:"Hedge", go:[]}
  ]},
  {g:"Other calculations · lectures 1–2", rows:[
    {q:"Find a bank's probability of bankruptcy, or the capital a rating needs", w:"assets · debt · probability of default · BBB rating · equity ratio", need:"A₀, D₀, μ_A, σ_A, rating", xl:"Solvency",
     go:[["fi","Bankruptcy is a statement","bankruptcy"],["fi","Solvency bench","bench"]]},
    {q:"Find VaR and ES from a list of possible losses; is VaR subadditive?", w:"“loses X with probability p” · two projects · subadditive · coherent", need:"losses, probabilities, α", xl:"Discrete VaR-ES",
     go:[["mr","The counterexample, worked in full","counterexample"],["mr","Subadditivity bench","bench"]]}
  ]},
  {g:"Explain-in-words and Excel questions", rows:[
    {q:"Explain the types of risk, or regulation versus supervision", w:"market / credit / operational risk · Basel · BIS · supervision", need:"—", xl:"",
     go:[["fi","Activity in, risk out","risk types"],["fi","Regulation, supervision","regulation"]]},
    {q:"Explain why VaR is not a coherent risk measure, and why ES is", w:"coherent · subadditivity · monotonicity · translation invariance", need:"—", xl:"",
     go:[["mr","Expected shortfall, and why","coherence"]]},
    {q:"Compare historical, parametric and Monte Carlo VaR, or backtesting", w:"historical simulation · Monte Carlo · backtest · exceptions", need:"—", xl:"",
     go:[["mr","Three ways to compute a VaR","three approaches"],["mr","How you find out the model was wrong","backtesting"]]},
    {q:"Which Excel function, or why an array formula returns one number", w:"NORMSINV · MMULT · Ctrl+Shift+Enter · COVAR vs COVARIANCE.S", need:"—", xl:"Formula Sheet",
     go:[["xl","Every function used in the course","functions"],["xl","Array formulas","array formulas"],["xl","The trap list","traps"]]},
    {q:"Practise a full exam-length question (four long questions, every step worked)", w:"mock exam · multi-step · long question · four questions", need:"—", xl:"Practice Qs",
     go:[["exam","A four-question mock","4-question mock"]]},
    {q:"Look up a formula, the Excel function for it, or the order of steps", w:"formula sheet · Excel function · NORMSINV · MMULT · step chain", need:"—", xl:"Formula Sheet",
     go:[["fx","Portfolios: the matrix form","formula bank"],["fx","Multi-step chains","step chains"]]},
    {q:"Practise with the course's own questions (answer keys included)", w:"additional questions · practice problems · mock paper", need:"—", xl:"Practice Qs",
     go:[["pset","Additional questions","worked problems"],["exam","Sit a paper","mock paper"]]}
  ]}
];
var XL_GUIDE = [
  ["Start", "The same question finder, and every sheet's live answer"],
  ["Practice Qs", "The course's own questions with answer keys — a live ✓ self-test"],
  ["Normal VaR", "One asset: VaR, ES, chance of a loss, T-day VaR, t-test of the mean"],
  ["Asset VaR", "Money in several assets: portfolio VaR, diversification, marginal / component / incremental VaR and ES"],
  ["Data", "Paste prices or rates → μ, σ, Ω, correlations, skewness, kurtosis, t-tests"],
  ["ZCB", "T-bill / zero-coupon bond: price, durations, VaR"],
  ["Coupon Bond", "Coupon bond from a spot curve: price, weights, duration, VaR"],
  ["Portfolio A / B", "Any mix of bonds, stocks and options (additional Q2 / Q3)"],
  ["Option BSM", "Black-Scholes price and every Greek, digital options, parity, option VaR"],
  ["Option Binomial", "Building-block (equivalent-asset) option VaR"],
  ["Forward", "Forward = long call + short put: value, weights, VaR"],
  ["Futures", "Futures on an asset, a ZCB or a coupon bond: price, weights, VaR"],
  ["Hedge", "Hedge ratio, best hedge with several futures, delta / rho hedge"],
  ["Custom w", "Any w and Ω you already have → VaR"],
  ["Discrete VaR-ES", "VaR and ES from a list of losses; subadditivity"],
  ["Solvency", "Probability of bankruptcy; capital for a target rating"],
  ["EWMA", "EWMA volatility update"],
  ["Formula Sheet", "Every formula with its Excel function and sheet, the Excel functions, step chains for long questions, your notes checked"]
];

/* ---------------- text normalising and synonyms ---------------- */
var SR_SUB = {"₀":"0","₁":"1","₂":"2","₃":"3","₄":"4","₅":"5","₆":"6","₇":"7","₈":"8","₉":"9","⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","ᵀ":"t","ₙ":"n","ₜ":"t","−":"-","–":"-","—":"-","‑":"-","’":"'","“":"\"","”":"\""};
function srNorm(s){
  s = String(s || "").replace(/[₀-₉⁰-⁹¹²³ᵀₙₜ−–—‑’“”]/g, function(c){ return SR_SUB[c] || c; });
  try{ s = s.normalize("NFKD").replace(/[̀-ͯ]/g, ""); }catch(e){}
  return s.toLowerCase().replace(/\s+/g, " ");
}
var SR_STOP = {"the":1,"a":1,"an":1,"of":1,"to":1,"and":1,"in":1,"on":1,"for":1,"is":1,"it":1,"how":1,"what":1,"do":1,"i":1,"find":1,"with":1,"by":1,"my":1,"this":1,"that":1,"are":1,"be":1,"from":1,"at":1,"its":1};
var SR_SYN = {
  "sigma":["σ","sd","standard deviation","volatility"], "σ":["sigma","sd","volatility","standard deviation"],
  "sd":["σ","standard deviation"], "vol":["volatility","σ"], "volatility":["σ","vol"],
  "mu":["μ","mean"], "μ":["mu","mean"], "mean":["μ","average"],
  "omega":["ω","covariance","varcovar"], "ω":["omega","covariance"], "cov":["covariance","ω","covar"], "covariance":["ω","covar","varcovar"],
  "corr":["correlation","ρ"], "correlation":["ρ","corr"], "rho":["ρ"], "ρ":["rho"],
  "delta":["δ","Δ"], "δ":["delta"], "gamma":["γ"], "alpha":["α","confidence"], "α":["alpha"], "lambda":["λ"], "λ":["lambda","ewma"],
  "var":["value at risk"], "es":["expected shortfall","cvar","c-var"], "cvar":["expected shortfall","c-var"], "shortfall":["es"],
  "bsm":["black-scholes","black scholes"], "bs":["black-scholes"], "blackscholes":["black-scholes"],
  "zcb":["zero-coupon","zero coupon","t-bill"], "zero":["zcb"], "tbill":["t-bill","treasury bill"], "bill":["t-bill"],
  "dmod":["d_mod","modified duration"], "dmac":["d_mac","macaulay"], "duration":["d_mod","d_mac"],
  "binomial":["building block","equivalent asset","up and down"], "lego":["building block"], "replicating":["equivalent asset","building block"],
  "greeks":["delta","rho"], "greek":["delta","rho"], "digital":["cash-or-nothing","binary"], "binary":["digital","cash-or-nothing"],
  "pd":["probability of default","bankruptcy"], "bankrupt":["bankruptcy","default"], "default":["bankruptcy"],
  "ytm":["yield to maturity"], "spot":["zero curve","spot rate"], "fwd":["forward"], "futures":["future"], "carry":["cost of carry"],
  "hedging":["hedge"], "hedge":["hedging"], "array":["ctrl+shift+enter","mmult"], "mmult":["array","matrix"],
  "normsinv":["norm.s.inv","z"], "ttest":["t-test","t-stat"], "t-test":["t-stat","t-statistic"], "tstat":["t-stat","t-statistic"],
  "coherent":["subadditivity","subadditive"], "subadditive":["subadditivity","coherent"], "backtest":["backtesting","exceptions"],
  "montecarlo":["monte carlo"], "mc":["monte carlo"], "hist":["historical simulation"], "ewma":["λ","exponentially weighted"]
};
function srEsc(s){ return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function srTerms(q){
  var n = srNorm(q).replace(/black[\s-]scholes(-merton)?/g, "black-scholes").replace(/monte carlo/g, "montecarlo")
                   .replace(/t[\s-]test/g, "t-test").replace(/cash[\s-]or[\s-]nothing/g, "cash-or-nothing");
  return n.split(/[\s,;:()]+/).filter(function(t){ return t && !SR_STOP[t]; }).map(function(t){
    var alts = [t].concat((SR_SYN[t] || []).map(srNorm));
    var stem = t.replace(/(ments?|ings?|ed|es|s|ly)$/, "");   /* invested → invest (matches investment) */
    if(stem !== t && stem.length >= 4) alts.push(stem);
    if(t === "montecarlo") alts.push("monte carlo");
    return {t:t, alts:alts, res:alts.map(function(a){
      return /^[a-z0-9]{1,2}$/.test(a) ? new RegExp("(^|[^a-z0-9])" + srEsc(a) + "([^a-z0-9]|$)") : null;
    })};
  });
}
function srHas(text, term){
  for(var i = 0; i < term.alts.length; i++){
    if(term.res[i] ? term.res[i].test(text) : text.indexOf(term.alts[i]) >= 0) return i;
  }
  return -1;
}
/* regex over the ORIGINAL text for highlighting (case-insensitive, whole alternatives) */
function srMarkRe(terms){
  var parts = [];
  terms.forEach(function(t){ t.alts.forEach(function(a){ if(a.length > 2 || /[^\x00-\x7f]/.test(a)) parts.push(srEsc(a)); }); });
  if(!parts.length) return null;
  parts.sort(function(a, b){ return b.length - a.length; });
  return new RegExp("(" + parts.join("|") + ")", "gi");
}
function srHi(s, re){
  s = String(s);
  if(!re) return esc(s);
  var out = "", last = 0, m;
  re.lastIndex = 0;
  while((m = re.exec(s))){
    if(!m[0]){ re.lastIndex++; continue; }
    out += esc(s.slice(last, m.index)) + "<mark>" + esc(m[0]) + "</mark>";
    last = m.index + m[0].length;
  }
  return out + esc(s.slice(last));
}
function srSnip(body, re, n){
  body = String(body).replace(/\s+/g, " ").trim();
  n = n || 180;
  if(!body) return "";
  var i = -1;
  if(re){ re.lastIndex = 0; var m = re.exec(body); if(m) i = m.index; }
  if(i < 0) return uxClip(body, n);
  var a = Math.max(0, i - 60), b = Math.min(body.length, a + n);
  if(a > 0){ var sp = body.indexOf(" ", a); if(sp > 0 && sp < i) a = sp + 1; }
  return (a > 0 ? "…" : "") + body.slice(a, b).trim() + (b < body.length ? "…" : "");
}

/* ---------------- where a finder row lands ---------------- */
function srTarget(topic, find){
  var t = TOPICS.filter(function(x){ return x.id === topic; })[0];
  var panel = t ? $("#" + t.panel) : null;
  var low = find.toLowerCase();
  function look(root){
    return $$("h3, h4, caption, .pset .src", root).filter(function(h){
      return (h.textContent || "").toLowerCase().indexOf(low) >= 0;
    })[0];
  }
  var hit = (panel && look(panel)) || look(document);   /* fall back to anywhere on the page */
  if(!hit) return null;
  return hit.closest(".pset") || hit.closest(".tool") || hit.closest("section.block") || hit;
}
function srTopicLabel(id){
  var t = TOPICS.filter(function(x){ return x.id === id; })[0];
  return t ? (isNumbered(t) ? COURSE.unit + " " + t.n : t.n) : "";
}

/* ---------------- the index ---------------- */
var SR_IDX = null;
var SR_KIND = {finder:"finder", topic:"section", section:"section", bench:"formula", formula:"formula", excel:"formula",
               trap:"formula", erratum:"formula", problem:"problem", question:"question", card:"card"};
var SR_WEIGHT = {finder:9, topic:7, section:5, problem:5, bench:4, formula:4, excel:3, trap:3, erratum:2, question:2, card:1};
function srIndex(){
  if(SR_IDX) return SR_IDX;
  var out = [];
  function add(kind, lab, body, topic, node, extra){
    lab = String(lab || "").replace(/\s+/g, " ").trim();
    body = String(body || "").replace(/\s+/g, " ").trim();
    if(lab.length < 3) return;
    var e = {kind:kind, lab:lab, body:body, topic:topic, node:node, labN:srNorm(lab), bodyN:srNorm(body)};
    if(extra) Object.assign(e, extra);
    out.push(e);
  }
  function textOf(node, drop){
    var c = node.cloneNode(true);
    $$(drop || "", c).forEach(function(x){ x.remove(); });
    $$("button.btn, .keys", c).forEach(function(x){ x.remove(); });
    return c.textContent;
  }
  FINDER.forEach(function(g){ g.rows.forEach(function(r){
    add("finder", r.q, r.w + " · need: " + r.need + (r.xl ? " · Excel sheet: " + r.xl : "") + " · " + g.g +
        " · " + r.go.map(function(x){ return x[1]; }).join(" · "), r.go[0] ? r.go[0][0] : "cram", null, {row:r});
  }); });
  TOPICS.forEach(function(t){
    var p = $("#" + t.panel), lede = p ? $(".lede", p) : null;
    add("topic", (isNumbered(t) ? COURSE.unit + " " + t.n + " · " : "") + t.t, lede ? lede.textContent : "", t.id, p ? $(".panel-head", p) : null);
  });
  var DROP = ".qitem, .pset, .fc, .tool, [data-quiz], [data-flash], .quiz-h, .tierbar";
  $$(".panel section.block").forEach(function(b){
    if(b.id === "finderBlock") return;   /* its rows are indexed above; its instructions would match everything */
    var h = b.querySelector("h3");
    add("section", h ? h.textContent : "", textOf(b, DROP), uxTopicOf(b), b);
  });
  $$(".panel .tool").forEach(function(tl){
    var h = tl.querySelector(".tool-h h4");
    add("bench", h ? h.textContent : "", textOf(tl, "select, .num"), uxTopicOf(tl), tl);
  });
  $$(".panel .fb-row").forEach(function(r){
    var n = r.querySelector(".fb-n"), fm = r.querySelector(".fb-f"), w = r.querySelector(".fb-w");
    add("formula", (n ? n.textContent.replace("in your notes", "") : "") + " — " + (fm ? fm.textContent : ""), w ? w.textContent : "", uxTopicOf(r), r);
  });
  $$(".panel .chain").forEach(function(c){
    var h = c.querySelector(".chain-h b");
    add("section", "Step chain: " + (h ? h.textContent : ""), c.textContent, uxTopicOf(c), c);
  });
  $$(".panel .eq").forEach(function(e){
    var lbl = e.querySelector(".lbl"), head = e.cloneNode(true);
    $$(".lbl", head).forEach(function(x){ x.remove(); });
    add("formula", head.textContent, lbl ? lbl.textContent : "", uxTopicOf(e), e);
  });
  $$(".panel .fxrow").forEach(function(r){
    var c = r.querySelector("code"), d = r.querySelector("div");
    add(r.classList.contains("trap") ? "trap" : "excel", c ? c.textContent : "", d ? d.textContent : "", uxTopicOf(r), r);
  });
  $$(".panel .warn").forEach(function(w){
    add("erratum", uxClip(w.textContent.replace(/^(Slide check|Workbook check|Check with your lecturer)/, ""), 110), w.textContent, uxTopicOf(w), w);
  });
  $$(".panel .pset").forEach(function(p){
    var src = p.querySelector(".src"), q = p.querySelector(".pset-q"), a = p.querySelector(".pset-a");
    var qt = q ? textOf(q, ".src, .btn") : "";
    add("problem", (src ? src.textContent.replace(/\s+/g, " ").trim() + " — " : "") + uxClip(qt, 110), qt + " " + (a ? a.textContent : ""), uxTopicOf(p), p);
  });
  $$(".panel .qitem").forEach(function(q){
    var qq = q.querySelector(".qq");
    if(!qq) return;
    var c = qq.cloneNode(true);
    $$(".n, .qsrc, .tier", c).forEach(function(x){ x.remove(); });
    var opts = $$(".opt", q).map(function(o){ return o.textContent; }).join(" · ");
    add("question", c.textContent, "Options: " + opts, uxTopicOf(q), q);
  });
  $$(".panel .fc").forEach(function(c){
    var t = c.querySelector(".fct"), h = c.querySelector(".fcb");
    add("card", t ? t.textContent : "", (h ? h.textContent : "") + " " + c.textContent, uxTopicOf(c), c);
  });
  SR_IDX = out;
  return out;
}
function srSearch(q){
  var terms = srTerms(q);
  if(!terms.length) return {terms:terms, hits:[]};
  var whole = srNorm(q).trim();
  var hits = [];
  srIndex().forEach(function(e){
    var score = SR_WEIGHT[e.kind] || 0;
    for(var i = 0; i < terms.length; i++){
      var inLab = srHas(e.labN, terms[i]);
      if(inLab >= 0){
        var a = terms[i].alts[inLab], at = e.labN.indexOf(a);
        score += 12 - (inLab ? 3 : 0);
        if(at === 0) score += 3;
        if(at >= 0 && (at === 0 || e.labN.charAt(at - 1) === " ")) score += 4;   /* whole word beats part of a word */
        continue;
      }
      var inBody = srHas(e.bodyN, terms[i]);
      if(inBody < 0) return;
      score += 4 - (inBody ? 1 : 0);
    }
    if(terms.length > 1 && whole.length > 3){
      if(e.labN.indexOf(whole) >= 0) score += 18;
      else if(e.bodyN.indexOf(whole) >= 0) score += 7;
    }
    hits.push([score, e]);
  });
  hits.sort(function(a, b){ return b[0] - a[0]; });
  return {terms:terms, hits:hits.map(function(h){ return h[1]; })};
}

/* ---------------- highlight the words on the page you land on ---------------- */
function srMarkIn(node, re){
  if(!node || !re) return;
  var walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {acceptNode:function(t){
    return t.parentNode && /^(SCRIPT|STYLE|TEXTAREA|INPUT)$/.test(t.parentNode.nodeName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
  }});
  var texts = [], t, n = 0;
  while((t = walker.nextNode())) texts.push(t);
  texts.forEach(function(tn){
    if(n > 40) return;
    re.lastIndex = 0;
    var s = tn.nodeValue;
    if(!re.test(s)) return;
    re.lastIndex = 0;
    var frag = document.createDocumentFragment(), last = 0, m;
    while((m = re.exec(s))){
      if(!m[0]){ re.lastIndex++; continue; }
      frag.appendChild(document.createTextNode(s.slice(last, m.index)));
      var mk = document.createElement("mark"); mk.className = "srch-hit"; mk.textContent = m[0];
      frag.appendChild(mk); n++;
      last = m.index + m[0].length;
    }
    frag.appendChild(document.createTextNode(s.slice(last)));
    tn.parentNode.replaceChild(frag, tn);
  });
  setTimeout(function(){
    $$("mark.srch-hit", node).forEach(function(mk){
      var p = mk.parentNode; if(!p) return;
      p.replaceChild(document.createTextNode(mk.textContent), mk);
      p.normalize();
    });
  }, 6000);
}
function srReveal(node){
  if(!node) return;
  if(node.classList.contains("qitem") && node.hidden){   /* hidden by a tier filter: switch the filter to All */
    var bar = node.parentNode && node.parentNode.querySelector(".tierbar");
    var all = bar && bar.querySelector("button");
    if(all) all.click();
  }
  var pa = node.closest(".pset") && node.closest(".pset").querySelector(".pset-a");
  if(pa && pa.hidden){ var b = node.closest(".pset").querySelector(".pset-q .btn"); if(b) b.click(); }
}
function srLand(topic, node, re){
  if(!node) return;
  srReveal(node);
  uxJump(topic, null, node);
  setTimeout(function(){ srMarkIn(node, re); }, topic && topic !== state.topic ? 160 : 60);
}
function srGoFinder(row, k){
  var g = row.go[k || 0];
  if(!g) return;
  var node = srTarget(g[0], g[1]);
  if(node) srLand(uxTopicOf(node) || g[0], node, null);
  else uxJump(g[0], g[1]);
}

/* ---------------- the search overlay (takes over the jump palette) ---------------- */
var SR = null, srShown = [], srSel = 0, srFilter = "all", srLast = "", srRe = null;
var SR_CHIPS = [["all","All"],["finder","Question finder"],["section","Sections"],["problem","Worked problems"],
                ["question","Quiz questions"],["formula","Formulas & Excel"],["card","Flashcards"]];
function srRender(){
  var q = $("#srInput").value, list = $("#palList"), res = srSearch(q);
  srLast = q;
  srRe = srMarkRe(res.terms);
  var counts = {all:res.hits.length};
  res.hits.forEach(function(e){ var k = SR_KIND[e.kind]; counts[k] = (counts[k] || 0) + 1; });
  $$(".srch-chips button", SR).forEach(function(b){
    var k = b.dataset.k, n = counts[k] || 0;
    b.textContent = b.dataset.lab + (q.trim() ? " · " + n : "");
    b.setAttribute("aria-pressed", String(k === srFilter));
    b.disabled = !!q.trim() && !n && k !== "all";
  });
  list.innerHTML = "";
  srSel = 0;
  if(!q.trim()){
    $("#srCount").textContent = "";
    var tips = el("div", "srch-tips");
    tips.innerHTML = 'Search <b>everything on the page</b> — every section, worked problem, quiz question, formula, flashcard and Excel note — or type words from an exam question to find its type. ' +
      'Several words must all match; <b>σ</b>, <b>sigma</b> and <b>volatility</b> count as the same thing. Works offline.<div class="try"></div>';
    ["expected shortfall", "equivalent asset", "invested in gold", "coupon bond VaR", "put-call parity", "t-test", "Ctrl+Shift+Enter", "121.42", "cost of carry"].forEach(function(s){
      var b = el("button", null, s); b.type = "button";
      b.addEventListener("click", function(){ $("#srInput").value = s; srRender(); $("#srInput").focus(); });
      $(".try", tips).appendChild(b);
    });
    list.appendChild(tips);
    srShown = srIndex().filter(function(e){ return e.kind === "finder" || e.kind === "topic"; });
    if(srFilter !== "all") srShown = srShown.filter(function(e){ return SR_KIND[e.kind] === srFilter; });
  } else {
    srShown = res.hits.filter(function(e){ return srFilter === "all" || SR_KIND[e.kind] === srFilter; });
    $("#srCount").textContent = srShown.length + (srShown.length === 1 ? " match" : " matches");
    if(!srShown.length){
      list.innerHTML = '<div class="pal-empty">Nothing matches “' + esc(q) + '”' + (srFilter !== "all" ? " in this group — try All." : ". Try fewer words, a symbol (σ, ρ, Ω), a number from the slides, or an Excel function.") + '</div>';
      return;
    }
  }
  srShown.slice(0, 80).forEach(function(it, i){
    var b = el("div", "pal-item");
    b.setAttribute("role", "option");
    b.setAttribute("aria-selected", String(i === 0));
    var snip = "", labHit = false;
    if(srRe){ srRe.lastIndex = 0; labHit = srRe.test(it.lab); }
    if(it.kind === "finder") snip = srHi(it.row.w + (it.row.xl ? "  ·  Excel: " + it.row.xl : ""), srRe);
    /* long entries always show where the words matched; short ones only when the title did not */
    else if(q.trim() && it.body && (!labHit || it.kind === "section" || it.kind === "problem")) snip = srHi(srSnip(it.body, srRe), srRe);
    b.innerHTML = '<span class="kind' + (it.kind === "finder" ? " k-finder" : "") + '">' + (it.kind === "finder" ? "question type" : it.kind) + '</span>' +
      '<span class="lab">' + srHi(uxClip(it.lab, 120), srRe) + (snip ? '<span class="snip">' + snip + '</span>' : '') + '</span>' +
      '<span class="where">' + esc(srTopicLabel(it.topic)) + '</span>';
    b.addEventListener("mouseenter", function(){ palSelect(i); });
    b.addEventListener("click", function(){ srGo(i); });
    list.appendChild(b);
  });
}
function srGo(i){
  var it = srShown[i == null ? srSel : i];
  if(!it) return;
  var re = srRe;
  palClose();
  if(it.kind === "finder") srGoFinder(it.row, 0);
  else srLand(it.topic, it.node, re);
  react("jump", false, {vars:{what: esc(uxClip(it.lab, 60))}});
}
function srOpen(prefill){
  if(!SR){
    SR = el("div", "pal-back");
    SR.innerHTML = '<div class="pal" role="dialog" aria-label="Search the page">' +
      '<div class="srch-top"><input id="srInput" type="search" placeholder="Search questions, keywords, formulas, numbers…" autocomplete="off" spellcheck="false" aria-label="Search the page"><span class="srch-count" id="srCount"></span></div>' +
      '<div class="srch-chips" role="group" aria-label="Filter results"></div>' +
      '<div class="pal-list" id="palList" role="listbox"></div>' +
      '<div class="pal-foot"><span><span class="keys">↑</span><span class="keys">↓</span> move</span><span><span class="keys">↵</span> open</span><span><span class="keys">Tab</span> next filter</span><span><span class="keys">Esc</span> close</span><span>searches this page only · works offline</span></div></div>';
    document.body.appendChild(SR);
    SR_CHIPS.forEach(function(c){
      var b = el("button", null, c[1]); b.type = "button"; b.dataset.k = c[0]; b.dataset.lab = c[1];
      b.addEventListener("click", function(){ srFilter = c[0]; srRender(); $("#srInput").focus(); });
      $(".srch-chips", SR).appendChild(b);
    });
    SR.addEventListener("click", function(ev){ if(ev.target === SR) palClose(); });
    var inp = $("#srInput", SR), timer = null;
    inp.addEventListener("input", function(){ clearTimeout(timer); timer = setTimeout(srRender, 70); });
    inp.addEventListener("keydown", function(ev){
      if(ev.key === "ArrowDown"){ ev.preventDefault(); palSelect(srSel + 1); }
      else if(ev.key === "ArrowUp"){ ev.preventDefault(); palSelect(srSel - 1); }
      else if(ev.key === "Enter"){ ev.preventDefault(); srGo(); }
      else if(ev.key === "Escape"){ ev.preventDefault(); palClose(); }
      else if(ev.key === "Tab"){
        ev.preventDefault();
        var ks = $$(".srch-chips button", SR).filter(function(b){ return !b.disabled; }).map(function(b){ return b.dataset.k; });
        var j = ks.indexOf(srFilter);
        srFilter = ks[(j + (ev.shiftKey ? ks.length - 1 : 1)) % ks.length] || "all";
        srRender();
      }
    });
  }
  PAL = SR;
  SR.style.display = "flex";
  var inp = $("#srInput");
  if(typeof prefill === "string"){ inp.value = prefill; srFilter = "all"; }
  else inp.value = srLast;
  srRender();
  inp.focus();
  inp.select();
  react("palette", true);
}
/* the palette's selection helper drives this list too */
palSelect = function(i){
  var items = $$(".pal-item", $("#palList"));
  srSel = Math.max(0, Math.min(items.length - 1, i));
  items.forEach(function(n, j){ n.setAttribute("aria-selected", String(j === srSel)); });
  if(items[srSel]) items[srSel].scrollIntoView({block:"nearest"});
};
palOpen = function(){ srOpen(); };
palClose = function(){ if(SR) SR.style.display = "none"; };
palIsOpen = function(){ return !!SR && SR.style.display !== "none"; };

/* ---------------- the finder, rendered in the GO panel ---------------- */
function finderPaint(){
  var host = $("#finderList");
  if(!host) return;
  var q = $("#finderInput").value, terms = srTerms(q), re = srMarkRe(terms), shown = 0, total = 0;
  host.innerHTML = "";
  FINDER.forEach(function(g){
    var rows = g.rows.filter(function(r){
      total++;
      if(!terms.length) return true;
      var hay = srNorm([r.q, r.w, r.need, r.xl, g.g].concat(r.go.map(function(x){ return x[1] + " " + x[2]; })).join(" · "));
      return terms.every(function(t){ return srHas(hay, t) >= 0; });
    });
    if(!rows.length) return;
    host.appendChild(el("div", "fg-h", esc(g.g)));
    rows.forEach(function(r){
      shown++;
      var row = el("div", "fg-row");
      var qb = el("button", "fg-q"); qb.type = "button"; qb.innerHTML = srHi(r.q, re);
      qb.addEventListener("click", function(){ r.go.length ? srGoFinder(r, 0) : null; });
      if(!r.go.length){ qb.disabled = true; qb.title = "Covered by the Excel solver only"; qb.style.cursor = "default"; }
      var w = el("div", "fg-w", srHi(r.w, re) + '<span class="need">you need: ' + esc(r.need) + '</span>');
      var goes = el("div", "fg-go");
      r.go.forEach(function(x, k){
        var b = el("button", null, esc(srTopicLabel(x[0]) + " · " + x[2]) + " ▸"); b.type = "button";
        b.title = "Open: " + x[1];
        b.addEventListener("click", function(){ srGoFinder(r, k); });
        goes.appendChild(b);
      });
      if(r.xl) goes.appendChild(el("span", "xl", "Excel · " + esc(r.xl)));
      row.appendChild(qb); row.appendChild(w); row.appendChild(goes);
      host.appendChild(row);
    });
  });
  $("#finderCount").textContent = terms.length ? shown + " of " + total : total + " question types";
  if(!shown){
    var e = el("div", "fg-empty", 'No question type matches “' + esc(q) + '”. ');
    var b = el("button", "btn ghost", "Search the whole page for it"); b.type = "button";
    b.addEventListener("click", function(){ srOpen(q); });
    e.appendChild(b);
    host.appendChild(e);
  }
}
function finderInit(){
  if(!$("#finderList")) return;
  var t = null;
  $("#finderInput").addEventListener("input", function(){ clearTimeout(t); t = setTimeout(finderPaint, 60); });
  $("#finderInput").addEventListener("keydown", function(ev){
    if(ev.key === "Enter"){ ev.preventDefault(); var first = $("#finderList .fg-q:not([disabled])"); if(first) first.click(); }
    if(ev.key === "Escape"){ this.value = ""; finderPaint(); }
  });
  $("#finderFull").addEventListener("click", function(){ srOpen($("#finderInput").value); });
  var tb = $("#xlGuide");
  if(tb) XL_GUIDE.forEach(function(r){ tb.appendChild(el("tr", null, '<td class="l"><b>' + esc(r[0]) + '</b></td><td class="l">' + esc(r[1]) + '</td>')); });
  finderPaint();
}
var _bootBeforeSearch = boot;
boot = function(){
  _bootBeforeSearch();
  try{ finderInit(); }catch(e){ console.warn("Search layer failed:", e); }
};
</script>
