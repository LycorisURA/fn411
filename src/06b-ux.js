<script id="course-ux">
/* ============================================================
   UX layer — jump palette, keyboard shortcuts, the revision
   planner, the weak-spot list and the printable one-page sheet.
   Runs after boot(); nothing here touches the engine's data.
   ============================================================ */

/* ---------------- revision plans ---------------- */
var PLANS = [
  {mins:20, label:"20 min", blurb:"The night-before skim. Read, then take one short paper.", steps:[
    {m:4,  topic:"exam", find:"The A4 sheet", t:"Read <b>the A4 sheet</b> top to bottom. Ten lines; everything else is a way of filling in <b>w</b>."},
    {m:3,  topic:"cram", find:"The five checks", t:"The <b>five checks</b>. They cost nothing and they catch sign errors, unit errors and wrong-order weights."},
    {m:5,  topic:"start", find:"The whole course in three symbols", t:"The <b>build-w table</b> — six instruments, six weight vectors. If you can rebuild this table you can start any question."},
    {m:8,  topic:"exam", find:"Sit a paper", t:"A <b>12-question paper</b>. Filter to Easy and Medium; you are checking recall, not stamina."}
  ]},
  {mins:45, label:"45 min", blurb:"One pass over the machinery, then a short paper.", steps:[
    {m:4,  topic:"exam", find:"The A4 sheet", t:"The <b>A4 sheet</b>."},
    {m:4,  topic:"start", find:"Two conventions", t:"The <b>two conventions</b> that are not the textbook's: VaR is negative here, and the mean stays in."},
    {m:3,  topic:"cram", find:"What kind of question", t:"The <b>question router</b>. Practise naming the risk factors out loud for three or four question types."},
    {m:8,  topic:"fix", find:"The five-year coupon bond, worked", t:"The <b>five-year coupon bond</b>, worked. This is the fixed-income question in its most examinable form."},
    {m:8,  topic:"opt", find:"The main example, worked", t:"The <b>option example</b>, both the Greeks route and the building-block route. Check the two weights against w<sub>rS</sub> − w<sub>dy</sub>/T = 1."},
    {m:3,  topic:"fut", find:"Cost of carry", t:"<b>Futures weights are in money.</b> Read the cost-of-carry block until that sentence is obvious."},
    {m:15, topic:"exam", find:"Sit a paper", t:"A <b>12-question paper</b>, all tiers, marked at the end."}
  ]},
  {mins:90, label:"90 min", blurb:"Every instrument once, the traps, and a full-length paper.", steps:[
    {m:5,  topic:"exam", find:"The A4 sheet", t:"The <b>A4 sheet</b>, then cover it and write the master formula from memory."},
    {m:8,  topic:"mr",  find:"The deck's worked example", t:"<b>VaR and ES from μ and σ</b> — the worked example, and the ES multiplier."},
    {m:6,  topic:"mr",  find:"The counterexample, worked in full", t:"<b>Why VaR is not subadditive</b>. A favourite non-calculation question."},
    {m:10, topic:"fix", find:"The T-bill example", t:"<b>T-bill</b>: price, D_mac, D_mod, VaR in percent and in Baht."},
    {m:10, topic:"fix", find:"The five-year coupon bond, worked", t:"<b>Coupon bond</b> as a portfolio of zeros; then marginal and component VaR just below it."},
    {m:12, topic:"opt", find:"The main example, worked", t:"<b>Option VaR</b> both ways, then the numerical-Greeks check."},
    {m:10, topic:"fut", find:"The forward example", t:"<b>Forward and futures</b>: the two decompositions, the weights in money, and the deck's two big errors."},
    {m:6,  topic:"xl",  find:"The trap list", t:"The <b>trap list</b>. Read it as a list of marks you are about to lose."},
    {m:23, topic:"exam", find:"Sit a paper", t:"A <b>20-question paper</b> across everything, timed."}
  ]},
  {mins:180, label:"3 hours", blurb:"The full pass: measure every tail, then sit a long paper.", steps:[
    {m:10, topic:"fi",  find:"Bankruptcy is a statement", t:"<b>Lecture 1</b>: bankruptcy as a left-tail statement, and the capital-versus-rating table."},
    {m:25, topic:"mr",  find:"Returns first", t:"<b>Lecture 2</b> end to end, then its quiz to 80%."},
    {m:25, topic:"fix", find:"Why you cannot just take the return", t:"<b>Lecture 3</b> end to end, then its quiz to 80%."},
    {m:25, topic:"opt", find:"Payoffs, and why leverage", t:"<b>Lecture 4</b> end to end, then its quiz to 80%."},
    {m:25, topic:"fut", find:"Two decompositions", t:"<b>Lecture 5</b> end to end, then its quiz to 80%."},
    {m:15, topic:"xl",  find:"The build order", t:"<b>The spreadsheet layer</b>: the eight-step skeleton and the trap list."},
    {m:25, topic:"pset", find:"Additional questions", t:"The <b>three additional questions</b>, worked. Cover the answer and try each one first."},
    {m:30, topic:"exam", find:"Sit a paper", t:"A <b>40-question paper</b> across everything. Mark it, then reread only what you got wrong."}
  ]}
];

/* ---------------- the one-page sheet ---------------- */
var SHEET_CARDS = [
  {h:"The master formula", b:'<span class="f"><b>VaR<sub>α</sub> = μ<sub>P</sub> + z<sub>α</sub> σ<sub>P</sub></b></span><span class="f">μ<sub>P</sub> = w<sup>T</sup>μ &nbsp;&nbsp; σ<sub>P</sub><sup>2</sup> = w<sup>T</sup>Ωw</span><p>Negative output. The mean stays in. Everything below is a way of building <b>w</b>.</p>'},
  {h:"Quantiles and ES", b:'<span class="f">z: 1% −2.326348 · 2.5% −1.959964<br>5% −1.644854 · 10% −1.281552</span><span class="f">ES = μ − σ·φ(z<sub>α</sub>)/α</span><span class="f">multiplier: 2.665214 (1%) · 2.337803 (2.5%) · 2.062713 (5%)</span><p>−1.96 is the 2.5% value, never the 5% one.</p>'},
  {h:"Horizon", b:'<span class="f">μ<sub>T</sub> = μ·T &nbsp;&nbsp; σ<sub>T</sub> = σ·√T &nbsp;&nbsp; σ<sub>ann</sub> = σ<sub>daily</sub>√252</span><p>Scale the pieces, never the VaR itself. Needs iid returns.</p>'},
  {h:"Returns and the linear rule", b:'<span class="f">discrete r = (P₁ + D − P₀)/P₀ &nbsp; continuous r = ln((P₁+D)/P₀)</span><span class="f">y = a + b·r → μ<sub>y</sub> = a + bμ, σ<sub>y</sub>² = b²σ²</span><p>Price is linear in return, which is why one rule carries the whole course.</p>'},
  {h:"Building w", b:'<span class="f">stock &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; w = share of W₀<br>ZCB &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; w = −D<sub>mod</sub> × share<br>coupon bond w<sub>t</sub> = (PV<sub>t</sub>/B)(−t)<br>option &nbsp;&nbsp;&nbsp; w = [Δ·S/Op ; ρ/Op]<br>forward &nbsp;&nbsp; w = [S/V<sub>F</sub> ; TKe<sup>−yT</sup>/V<sub>F</sub>]<br>futures &nbsp;&nbsp; w = [S₀ ; T·S₀] in money</span>'},
  {h:"Fixed income", b:'<span class="f">D<sub>mac</sub> = Σ t·w<sub>t</sub> &nbsp;&nbsp; D<sub>mod</sub> = D<sub>mac</sub>/(1+y)</span><span class="f">r<sub>B</sub> = −D<sub>mod</sub>·dy</span><p>Continuous discounting pairs with multiplier −t; discrete with −t/(1+y<sub>t</sub>). Each cash flow is discounted at <b>its own</b> spot rate.</p>'},
  {h:"Black-Scholes", b:'<span class="f">C = S·N(d₁) − Ke<sup>−yT</sup>N(d₂)</span><span class="f">d₁ = [ln(S/K) + (y + σ²/2)T] / (σ√T)<br>d₂ = d₁ − σ√T</span><span class="f">Δ<sub>C</sub> = N(d₁) &nbsp; Δ<sub>P</sub> = −N(−d₁)<br>ρ<sub>C</sub> = TKe<sup>−yT</sup>N(d₂) &nbsp; ρ<sub>P</sub> = −TKe<sup>−yT</sup>N(−d₂)</span>'},
  {h:"Building block", b:'<span class="f">u = e<sup>σ</sup> − 1, d = e<sup>−σ</sup> − 1</span><span class="f">Δ = (X₁u − X₁d)/(S(u−d))</span><span class="f">B = [X₁d(1+u) − X₁u(1+d)]/[(1+y)(u−d)]</span><span class="f">w = [ΔS/Op ; −(B/Op)·T/(1+y)]</span><p>Price = ΔS + B. The two block weights sum to 1.</p>'},
  {h:"Futures", b:'<span class="f">asset: ₀F<sub>T</sub> = S₀e<sup>y<sub>T</sub>T</sup>, w = [S₀ ; T·S₀]</span><span class="f">ZCB: w = [−(T+N)B₀ ; +T·B₀]</span><span class="f">coupon bond: w = [… −(T+k)X<sub>k</sub>B<sub>k</sub> … ; +T·ΣX<sub>k</sub>B<sub>k</sub>]</span><span class="f">(T)f(N) = [y<sub>T+N</sub>(T+N) − y<sub>T</sub>T]/N</span><p>Weights in money, so the VaR is in money. The financing row carries a factor of T.</p>'},
  {h:"Decomposing VaR", b:'<span class="f">marginal<sub>i</sub> = μ<sub>i</sub> + z(Ωw)<sub>i</sub>/σ<sub>P</sub></span><span class="f">component<sub>i</sub> = w<sub>i</sub> × marginal<sub>i</sub></span><span class="f">Σ components = VaR (Euler)</span><p>Incremental VaR is different: portfolio VaR minus the VaR of the book without that position.</p>'},
  {h:"Institutions", b:'<span class="f">bankrupt ⟺ r<sub>A</sub> &lt; −E₀/A₀</span><span class="f">PD = N((−E₀/A₀ − μ<sub>A</sub>)/σ<sub>A</sub>)</span><span class="f">capital = −(μ<sub>A</sub> + N<sup>−1</sup>(PD)·σ<sub>A</sub>)</span><p>The BBB default probability of 0.9979% is almost exactly the 1% tail, so its z is the 99% VaR multiplier.</p>'},
  {h:"Volatility", b:'<span class="f">EWMA: σ²<sub>n</sub> = λσ²<sub>n−1</sub> + (1−λ)u²<sub>n−1</sub></span><p>λ = 0.94; effective window 1/(1−λ) ≈ 16.7 days. BIS wants at least 250 business days of data.</p>'},
  {h:"Discrete distributions", b:'<p>VaR at 1−α = the smallest loss L with P(loss ≤ L) ≥ 1−α. ES = the average of the worst α.</p><p><b>VaR is not subadditive:</b> two projects each losing 10 with probability 2% have VaR 1 apiece and 11 combined. ES never does this.</p>'},
  {h:"Excel", b:'<span class="f">=NORMSINV(α) · =NORMSDIST(z)</span><span class="f">=MMULT(TRANSPOSE(w),mu)</span><span class="f">=SQRT(MMULT(MMULT(TRANSPOSE(w),Om),w))</span><span class="f">density: =EXP(-(d^2)/2)/SQRT(2*PI())</span><p>Array formulas need <b>Ctrl+Shift+Enter</b> in Excel 2019 and earlier, or you silently get the top-left element. COVAR is the <b>population</b> version.</p>'},
  {h:"The five checks", cls:"trap", b:'<ul><li>Is VaR negative?</li><li>Do σ, y and T share one time unit?</li><li>Is w in the same order as Ω?</li><li>w<sub>rS</sub> − w<sub>dy</sub>/T = 1 for an option or forward.</li><li>Σ component VaR = portfolio VaR; a futures price sits between the PV and the undiscounted sum.</li></ul>'},
  {h:"Slips in the materials", cls:"trap", b:'<ul><li>Forward Rho 25.29 should be <b>52.2937</b> (weights 313.70 / 312.70).</li><li>Coupon-bond futures quoted 121.42 when the flows only total 108; correct <b>99.0059</b>.</li><li>Financing weight 75.68 drops the factor T; correct <b>151.3767</b>.</li><li>−1.96 used for a 95% VaR; the 5% value is <b>−1.644854</b>.</li><li>Digital Delta printed with N(d₂) instead of φ(d₂): 0.0322 should be <b>0.0265</b>.</li></ul>'}
];

/* ---------------- own storage (the engine's payload() is left alone) ---------------- */
var UX = {clock:45, done:{}};
function uxKey(){ return COURSE.storageKey + ".ux"; }
function uxLoad(){ try{ var r = localStorage.getItem(uxKey()); if(r) Object.assign(UX, JSON.parse(r)); }catch(e){} }
function uxSave(){ try{ localStorage.setItem(uxKey(), JSON.stringify(UX)); }catch(e){} }

/* ---------------- helpers ---------------- */
function uxTopicOf(node){
  var p = node && node.closest ? node.closest(".panel") : null;
  if(!p) return null;
  var hit = TOPICS.filter(function(t){ return t.panel === p.id; })[0];
  return hit ? hit.id : null;
}
function uxClip(s, n){
  s = String(s).replace(/\s+/g, " ").trim();
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
function uxFlash(node){
  if(!node) return;
  node.classList.remove("jumped");
  void node.offsetWidth;
  node.classList.add("jumped");
  setTimeout(function(){ node.classList.remove("jumped"); }, 1700);
}
/* go to a topic, then scroll to the first heading whose text contains `find` */
function uxJump(topic, find, node){
  if(topic && topic !== state.topic) go(topic);
  setTimeout(function(){
    var target = node || null;
    if(!target && find){
      var panel = $("#" + (TOPICS.filter(function(t){ return t.id === topic; })[0] || {}).panel);
      if(panel){
        var low = find.toLowerCase();
        target = $$("h3, h4, caption, code", panel).filter(function(h){
          return (h.textContent || "").toLowerCase().indexOf(low) >= 0;
        })[0];
        if(target && target.closest("section.block")) target = target.closest("section.block");
      }
    }
    if(!target) return;
    var y = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({top: Math.max(0, y), behavior: "smooth"});
    uxFlash(target);
  }, topic && topic !== state.topic ? 90 : 0);
}

/* ---------------- jump palette ---------------- */
var PAL = null, palItems = null, palSel = 0, palShown = [];
function palIndex(){
  if(palItems) return palItems;
  var out = [];
  TOPICS.forEach(function(t){
    out.push({kind:"tail", lab:(isNumbered(t) ? COURSE.unit + " " + t.n + " · " : "") + t.t, topic:t.id, node:null, w:0});
  });
  $$(".panel section.block > h3").forEach(function(h){
    out.push({kind:"section", lab:uxClip(h.textContent, 90), topic:uxTopicOf(h), node:h.closest("section.block"), w:1});
  });
  $$(".panel .tool-h h4").forEach(function(h){
    out.push({kind:"bench", lab:uxClip(h.textContent, 60), topic:uxTopicOf(h), node:h.closest(".tool"), w:1});
  });
  $$(".panel .eq").forEach(function(e){
    var lbl = e.querySelector(".lbl");
    var head = e.cloneNode(true);
    $$(".lbl", head).forEach(function(x){ x.remove(); });
    out.push({kind:"formula", lab:uxClip(head.textContent, 88) + (lbl ? " — " + uxClip(lbl.textContent, 50) : ""), topic:uxTopicOf(e), node:e, w:2});
  });
  $$(".panel .fxrow").forEach(function(r){
    var c = r.querySelector("code"), d = r.querySelector("div");
    out.push({kind:r.classList.contains("trap") ? "trap" : "excel",
              lab:uxClip(c ? c.textContent : "", 44) + " — " + uxClip(d ? d.textContent : "", 72),
              topic:uxTopicOf(r), node:r, w:2});
  });
  $$(".panel .warn").forEach(function(w){
    out.push({kind:"erratum", lab:uxClip(w.textContent.replace(/^(Slide check|Workbook check|Check with your lecturer)/, ""), 100), topic:uxTopicOf(w), node:w, w:2});
  });
  $$(".panel .pset").forEach(function(p){
    var src = p.querySelector(".src"), q = p.querySelector(".pset-q");
    out.push({kind:"problem", lab:uxClip(src ? src.textContent : "", 34) + " — " + uxClip(q ? q.textContent.replace(/Show working/, "") : "", 84),
              topic:uxTopicOf(p), node:p, w:1});
  });
  $$(".panel .fc").forEach(function(c){
    var t = c.querySelector(".fct"), h = c.querySelector(".fcb");
    out.push({kind:"card", lab:uxClip(t ? t.textContent : "", 60) + (h ? " — " + uxClip(h.textContent, 60) : ""),
              topic:uxTopicOf(c), node:c, w:3});
  });
  $$(".panel .qitem").forEach(function(q){
    var qq = q.querySelector(".qq");
    if(!qq) return;
    var clone = qq.cloneNode(true);
    $$(".n, .qsrc, .tier", clone).forEach(function(x){ x.remove(); });
    out.push({kind:"question", lab:uxClip(clone.textContent, 104), topic:uxTopicOf(q), node:q, w:4});
  });
  palItems = out.filter(function(x){ return x.lab && x.lab.length > 2; });
  return palItems;
}
function palScore(item, q){
  var s = item.lab.toLowerCase(), i = s.indexOf(q);
  if(i < 0){
    var parts = q.split(/\s+/).filter(Boolean);
    if(parts.length > 1 && parts.every(function(p){ return s.indexOf(p) >= 0; })) return 60 + item.w;
    return -1;
  }
  return i + item.w * 3 + (i === 0 ? -10 : 0);
}
function palRender(q){
  var list = $("#palList");
  q = (q || "").trim().toLowerCase();
  var items = palIndex();
  if(!q){
    palShown = items.filter(function(x){ return x.kind === "tail"; })
      .concat(items.filter(function(x){ return x.kind === "bench" || x.kind === "problem"; }).slice(0, 10));
  } else {
    palShown = items.map(function(x){ return [palScore(x, q), x]; })
      .filter(function(p){ return p[0] >= 0; })
      .sort(function(a, b){ return a[0] - b[0]; })
      .slice(0, 45).map(function(p){ return p[1]; });
  }
  palSel = 0;
  if(!palShown.length){ list.innerHTML = '<div class="pal-empty">Nothing matches “' + esc(q) + '”. Try a formula name, an instrument, or a number from the slides.</div>'; return; }
  list.innerHTML = "";
  palShown.forEach(function(it, i){
    var t = TOPICS.filter(function(x){ return x.id === it.topic; })[0];
    var b = el("div", "pal-item");
    b.setAttribute("role", "option");
    b.setAttribute("aria-selected", String(i === 0));
    var lab = esc(it.lab);
    if(q){
      var i0 = it.lab.toLowerCase().indexOf(q);
      if(i0 >= 0) lab = esc(it.lab.slice(0, i0)) + "<b>" + esc(it.lab.slice(i0, i0 + q.length)) + "</b>" + esc(it.lab.slice(i0 + q.length));
    }
    b.innerHTML = '<span class="kind">' + it.kind + '</span><span class="lab">' + lab + '</span><span class="where">' +
      (t ? esc(isNumbered(t) ? COURSE.unit + " " + t.n : t.n) : "") + '</span>';
    b.addEventListener("mouseenter", function(){ palSelect(i); });
    b.addEventListener("click", function(){ palGo(i); });
    list.appendChild(b);
  });
}
function palSelect(i){
  palSel = Math.max(0, Math.min(palShown.length - 1, i));
  $$(".pal-item", $("#palList")).forEach(function(n, j){ n.setAttribute("aria-selected", String(j === palSel)); });
  var cur = $$(".pal-item", $("#palList"))[palSel];
  if(cur) cur.scrollIntoView({block:"nearest"});
}
function palGo(i){
  var it = palShown[i == null ? palSel : i];
  if(!it) return;
  palClose();
  uxJump(it.topic, null, it.node);
  react("jump", false, {vars:{what: esc(uxClip(it.lab, 60))}});
}
function palOpen(){
  if(!PAL){
    PAL = el("div", "pal-back");
    PAL.innerHTML = '<div class="pal" role="dialog" aria-label="Jump to anything">' +
      '<input id="palInput" placeholder="Jump to a formula, a trap, a worked problem, a flashcard…" autocomplete="off" aria-label="Search the page">' +
      '<div class="pal-list" id="palList" role="listbox"></div>' +
      '<div class="pal-foot"><span><span class="keys">↑</span><span class="keys">↓</span> move</span><span><span class="keys">↵</span> jump</span><span><span class="keys">Esc</span> close</span><span>everything on the page is in here</span></div></div>';
    document.body.appendChild(PAL);
    PAL.addEventListener("click", function(ev){ if(ev.target === PAL) palClose(); });
    $("#palInput", PAL).addEventListener("input", function(){ palRender(this.value); });
    $("#palInput", PAL).addEventListener("keydown", function(ev){
      if(ev.key === "ArrowDown"){ ev.preventDefault(); palSelect(palSel + 1); }
      else if(ev.key === "ArrowUp"){ ev.preventDefault(); palSelect(palSel - 1); }
      else if(ev.key === "Enter"){ ev.preventDefault(); palGo(); }
      else if(ev.key === "Escape"){ ev.preventDefault(); palClose(); }
    });
  }
  PAL.style.display = "flex";
  $("#palInput").value = "";
  palRender("");
  $("#palInput").focus();
  react("palette", true);
}
function palClose(){ if(PAL) PAL.style.display = "none"; }
function palIsOpen(){ return PAL && PAL.style.display !== "none"; }

/* ---------------- one-page sheet ---------------- */
var SHEET = null;
function sheetOpen(){
  if(!SHEET){
    SHEET = el("div", "sheet-back");
    var cards = SHEET_CARDS.map(function(c){
      return '<div class="card' + (c.cls ? " " + c.cls : "") + '"><h4>' + c.h + '</h4>' + c.b + '</div>';
    }).join("");
    SHEET.innerHTML = '<div class="sheet-bar"><h3>The whole course on one page</h3>' +
      '<button class="btn sm" type="button" id="sheetPrint">Print</button>' +
      '<button class="btn sm ghost" type="button" id="sheetClose">Close</button>' +
      '<span class="esc">Esc</span></div>' +
      '<div class="a4">' + cards + '</div>';
    document.body.appendChild(SHEET);
    $("#sheetClose", SHEET).addEventListener("click", sheetClose);
    $("#sheetPrint", SHEET).addEventListener("click", function(){
      try{ window.print(); }
      catch(e){ toast("Printing is blocked here — use your browser's print menu"); }
    });
  }
  SHEET.classList.add("open");
  document.body.style.overflow = "hidden";
  react("sheetOpen");
}
function sheetClose(){
  if(SHEET) SHEET.classList.remove("open");
  document.body.style.overflow = "";
}
function sheetIsOpen(){ return SHEET && SHEET.classList.contains("open"); }

/* ---------------- revision planner ---------------- */
function planPaint(){
  var P = UX;
  var plan = PLANS.filter(function(p){ return p.mins === P.clock; })[0] || PLANS[1];
  $$("#clockBtns button").forEach(function(b){ b.setAttribute("aria-pressed", String(+b.dataset.mins === P.clock)); });
  var list = $("#planList");
  list.innerHTML = "";
  var doneMins = 0;
  plan.steps.forEach(function(s, i){
    var key = P.clock + ":" + i, done = !!P.done[key];
    if(done) doneMins += s.m;
    var li = el("li", done ? "done" : "");
    var tick = el("button", "tick", done ? "✓" : "");
    tick.type = "button";
    tick.setAttribute("aria-pressed", String(done));
    tick.setAttribute("aria-label", done ? "Mark as not done" : "Mark as done");
    tick.addEventListener("click", function(ev){
      ev.stopPropagation();
      if(P.done[key]) delete P.done[key]; else P.done[key] = 1;
      uxSave();
      planPaint();
      if(P.done[key]) react(Object.keys(P.done).filter(function(k){ return k.indexOf(P.clock + ":") === 0; }).length >= plan.steps.length ? "planDone" : "planTick", false, {vars:{mins:s.m}});
    });
    var mins = el("span", "mins", s.m + " min");
    var what = el("span", "what");
    what.innerHTML = '<a role="button" tabindex="0">' + s.t + '</a>';
    var jump = function(){ uxJump(s.topic, s.find); };
    $("a", what).addEventListener("click", jump);
    $("a", what).addEventListener("keydown", function(ev){ if(ev.key === "Enter") jump(); });
    li.appendChild(tick); li.appendChild(mins); li.appendChild(what);
    list.appendChild(li);
  });
  var total = plan.steps.reduce(function(a, s){ return a + s.m; }, 0);
  $("#planSum").textContent = doneMins + " of " + total + " minutes ticked off · " + plan.blurb;
  $("#planScore").textContent = Object.keys(P.done).length + " steps done";
  var left = total - doneMins;
  $("#planNote").className = "verdict" + (left === 0 ? " good" : "");
  $("#planNote").innerHTML = left === 0
    ? "<strong>Plan finished.</strong> Sit one more paper if there is time, and reread only the questions you got wrong."
    : "<strong>" + left + " minutes left in this plan.</strong> Work top to bottom — the order is deliberate, each step assumes the one above it.";
}
function planInit(){
  var host = $("#clockBtns");
  if(!host) return;
  PLANS.forEach(function(p){
    var b = el("button", "btn sm ghost", p.label);
    b.type = "button";
    b.dataset.mins = p.mins;
    b.addEventListener("click", function(){
      UX.clock = p.mins;
      uxSave();
      planPaint();
      react("planPick", false, {vars:{mins:p.mins, n:p.steps.length}});
    });
    host.appendChild(b);
  });
  planPaint();
  TOOL_TALK["Revision planner"] = function(){
    var P = UX;
    var plan = PLANS.filter(function(x){ return x.mins === P.clock; })[0] || PLANS[1];
    var n = Object.keys(P.done).filter(function(k){ return k.indexOf(P.clock + ":") === 0; }).length;
    return pick(LINES.planTool).map(function(x, i){ return i === 0 ? x : fill(x, {mins:P.clock, done:n, total:plan.steps.length}); });
  };
}

/* ---------------- weak spots ---------------- */
function resetQuestion(key, i){
  delete state.answers[key + ":" + i];
  save();
  var host = $('[data-quiz="' + key + '"]');
  if(host){
    var item = $$(".qitem", host)[i];
    if(item){
      var why = $(".why", item);
      if(why) why.remove();
      $$(".opt", item).forEach(function(o){ o.disabled = false; o.classList.remove("right", "wrong", "picked"); });
    }
    updateScore(key);
  }
  refreshProgress();
}
function weakPaint(){
  var host = $("#weakSpots");
  if(!host) return;
  var rows = [];
  Object.keys(QUIZ).forEach(function(k){
    QUIZ[k].forEach(function(q, i){
      var a = state.answers[k + ":" + i];
      if(a != null && a !== q.a) rows.push({k:k, i:i, q:q});
    });
  });
  host.innerHTML = "";
  if(!rows.length){
    host.innerHTML = '<div class="verdict good">Nothing wrong yet — either you have not started, or you are having a very good day. Answer a quiz and anything you miss will collect here.</div>';
    return;
  }
  rows.forEach(function(r){
    var t = TOPICS.filter(function(x){ return x.id === r.k; })[0];
    var row = el("div", "weak-row");
    row.innerHTML = '<span><span class="eyebrow">' + esc(t ? (isNumbered(t) ? COURSE.unit + " " + t.n : t.n) + " · " + t.t : r.k) + '</span>' +
      uxClip(stripTags(r.q.q), 130) + '</span>';
    var b = el("button", "btn sm ghost", "Retry");
    b.type = "button";
    b.addEventListener("click", function(){
      resetQuestion(r.k, r.i);
      weakPaint();
      uxJump(r.k, null, $$(".qitem", $('[data-quiz="' + r.k + '"]'))[r.i]);
      react("weakRetry", false, {vars:{tail: t ? t.t.toLowerCase() : "that tail"}});
    });
    row.appendChild(b);
    host.appendChild(row);
  });
  var all = el("div", "sorter-btns");
  var clearAll = el("button", "btn sm", "Retry all " + rows.length);
  clearAll.type = "button";
  clearAll.addEventListener("click", function(){
    rows.forEach(function(r){ resetQuestion(r.k, r.i); });
    weakPaint();
    react("weakRetry", false, {vars:{tail:"everything you missed"}});
  });
  all.appendChild(clearAll);
  host.appendChild(all);
}

/* ---------------- keyboard ---------------- */
function uxKeys(){
  document.addEventListener("keydown", function(ev){
    var tag = (ev.target.tagName || "").toLowerCase();
    var typing = tag === "input" || tag === "textarea" || tag === "select" || ev.target.isContentEditable;
    if((ev.key === "k" || ev.key === "K") && (ev.metaKey || ev.ctrlKey)){ ev.preventDefault(); palIsOpen() ? palClose() : palOpen(); return; }
    if(ev.key === "Escape"){
      if(palIsOpen()){ palClose(); return; }
      if(sheetIsOpen()){ sheetClose(); return; }
      if(!$("#cpPanel").hidden){ closeChat(); return; }
      return;
    }
    if(typing || ev.metaKey || ev.ctrlKey || ev.altKey) return;
    if(ev.key === "/"){ ev.preventDefault(); palOpen(); return; }
    if(ev.key === "?"){ ev.preventDefault(); uxJump("cram", "Shortcuts"); return; }
    if(ev.key === "s" || ev.key === "S"){ ev.preventDefault(); sheetIsOpen() ? sheetClose() : sheetOpen(); return; }
    if(ev.key === "t" || ev.key === "T"){ $("#themeBtn").click(); return; }
    if(ev.key === "c" || ev.key === "C"){ ev.preventDefault(); $("#cpPanel").hidden ? openChat() : closeChat(); return; }
    if(ev.key === "[" || ev.key === "]"){
      var idx = TOPICS.map(function(t){ return t.id; }).indexOf(state.topic);
      var next = (idx + (ev.key === "]" ? 1 : TOPICS.length - 1)) % TOPICS.length;
      go(TOPICS[next].id);
      return;
    }
    if(/^[0-9]$/.test(ev.key)){
      var t = TOPICS[ev.key === "0" ? 9 : +ev.key - 1];
      if(t) go(t.id);
    }
  });
}

/* ---------------- boot hook ---------------- */
function initUX(){
  uxLoad();
  planInit();
  weakPaint();
  uxKeys();
  $("#palBtn").addEventListener("click", palOpen);
  $("#sheetBtn").addEventListener("click", sheetOpen);
  var ob = $("#openSheetBtn"), op = $("#openPalBtn");
  if(ob) ob.addEventListener("click", sheetOpen);
  if(op) op.addEventListener("click", palOpen);
  /* the quiz buttons call `answer` by name, so wrapping the global keeps the weak-spot list live */
  var answerBase = answer;
  answer = function(key, i, choice, item){
    answerBase(key, i, choice, item);
    weakPaint();
  };
}
var _bootBeforeUX = boot;
boot = function(){
  _bootBeforeUX();
  try{ initUX(); }catch(e){ console.warn("UX layer failed:", e); }
};
</script>
