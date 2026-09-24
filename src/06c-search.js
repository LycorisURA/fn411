<script id="course-search">
/* ============================================================
   Search layer — a full-text, offline search over everything on
   the page (sections, worked problems, every quiz question,
   formulas, flashcards, Excel notes) plus the question finder
   from the Excel solver, the solver's Solve Guide (35 class questions,
   cell by cell), the workbook's sheet table and the deep links the
   workbook uses (#go=topic:heading · #sg=n · #xl=Sheet). Replaces the jump palette's matcher;
   Ctrl+K, / and the ⌕ button all open it. Nothing leaves the page.
   ============================================================ */

/* ---------------- the question finder (same rows as the Excel solver's Start sheet) ----------------
   q: what the question asks · w: words to look for · need: what you need · xl: solver sheet
   go: [topic, heading or worked-problem source to land on, short label]                      */
var FINDER = [
  {g:"One asset or one return · lecture 2", rows:[
    {q:"Find the VaR of one asset whose return has mean μ and SD σ", cell:"Normal VaR!B7", sg:[4], w:"“normally distributed” · N(μ, σ) · 1% / 5% quantile · VaR in Baht", need:"μ, σ, α, amount", xl:"Normal VaR",
     go:[["mr","The deck's worked example","worked example"],["mr","VaR and ES bench","bench"]]},
    {q:"Find expected shortfall, a 10-day VaR, or the chance of a loss", cell:"Normal VaR!B23", sg:[4], w:"“expected shortfall” · C-VaR · “10-day” · “probability of a loss”", need:"μ, σ, α, days", xl:"Normal VaR",
     go:[["mr","Expected shortfall, and why","ES"],["mr","Changing the horizon","horizon"]]},
    {q:"Test whether the mean return is significantly different from zero", cell:"Normal VaR!B62", sg:[5, 6], w:"“t-statistic” · “significantly different” · H₀: μ = 0", need:"n, mean, SD or variance", xl:"Normal VaR",
     go:[["mr","The t-test","t-test"]]}
  ]},
  {g:"Money spread over several assets · lecture 2", rows:[
    {q:"Find the VaR of money invested in two or more assets", cell:"Asset VaR!B7", sg:[2, 3, 32], w:"“invested $X in … and $Y in …” · gold and silver · daily volatility · correlation", need:"amounts, σ's, ρ's, α, days", xl:"Asset VaR",
     go:[["pset","Additional question 1","additional Q1"]]},
    {q:"Find the diversification benefit, or marginal / component / incremental VaR", cell:"Asset VaR!B136", sg:[2, 3], w:"“benefit of diversification” · marginal · component · incremental · “increase gold by 1%”", need:"(same as above)", xl:"Asset VaR",
     go:[["fix","Marginal and component VaR","marginal & component"],["pset","Additional question 1","additional Q1"]]},
    {q:"Find the VaR when the weights w and the covariance matrix Ω are given", cell:"Custom w!B7", sg:[], w:"weight vector · variance-covariance matrix · wᵀΩw", need:"w, μ, Ω", xl:"Custom w",
     go:[["start","The whole course in three symbols","master formula"]]}
  ]},
  {g:"Working from a table of data · lecture 2", rows:[
    {q:"Work out μ, σ, covariances and correlations from past prices or rates", cell:"Data!B6", sg:[6, 7, 14], w:"“the table below shows … days of” · estimate · skewness · kurtosis", need:"paste the table", xl:"Data",
     go:[["mr","Estimating μ and σ","estimating"],["xl","The build order","Excel steps"]]},
    {q:"Update a volatility estimate with EWMA", cell:"EWMA!B7", sg:[9, 10], w:"EWMA · λ = 0.94 · exponentially weighted", need:"λ, yesterday's σ and return", xl:"EWMA",
     go:[["mr","EWMA bench","EWMA"]]}
  ]},
  {g:"T-bills and zero-coupon bonds · lecture 3", rows:[
    {q:"Price a T-bill / zero-coupon bond, or find its duration", cell:"ZCB!B7", sg:[11], w:"T-bill · discount rate · Macaulay / modified duration", need:"face, yield, maturity, compounding", xl:"ZCB",
     go:[["fix","The T-bill example","T-bill example"],["fix","From Taylor to duration","duration"]]},
    {q:"Find the VaR of a T-bill / zero-coupon bond", cell:"ZCB!B19", sg:[11, 7], w:"past discount rates · change in yield · VaR of the T-bill", need:"past rates, or μ_dy and σ_dy", xl:"ZCB",
     go:[["fix","The T-bill example","T-bill example"],["fix","Zero-coupon VaR bench","bench"]]}
  ]},
  {g:"Coupon bonds · lecture 3", rows:[
    {q:"Price a coupon bond from spot rates; its weights and duration", cell:"Coupon Bond!B7", sg:[12, 13, 33], w:"coupon · paid annually / semi-annually · spot (zero) curve · portfolio of zeros", need:"face, coupon %, maturity, spot rates", xl:"Coupon Bond",
     go:[["fix","A coupon bond is a portfolio of zeros","portfolio of zeros"],["fix","The five-year coupon bond","5-year bond"]]},
    {q:"Find the VaR of a coupon bond", cell:"Coupon Bond!B107", sg:[12, 13, 28, 33], w:"VaR of the bond · yield changes dy₁ … dyₙ · adjusted weights", need:"+ μ and Ω of the yield changes", xl:"Coupon Bond",
     go:[["fix","The five-year coupon bond","5-year bond"],["pset","Lecture 5 practice","practice problem"]]}
  ]},
  {g:"A portfolio mixing bonds, stocks and options · lectures 3–4", rows:[
    {q:"Find the VaR of a portfolio of bonds AND stocks", cell:"Portfolio A!B6", sg:[14, 15], w:"“20 one-year ZCBs and 100 shares of …” · additional Q2 · basic assets", need:"one row per holding", xl:"Portfolio A",
     go:[["pset","Additional question 2","additional Q2"],["fix","A portfolio of basic assets","bond + stock"]]},
    {q:"Find the VaR of stocks plus an option — Greeks or building block", cell:"Portfolio B!B6", sg:[16, 17], w:"“shares plus a put on the index” · additional Q3", need:"one row per holding", xl:"Portfolio B",
     go:[["pset","Additional question 3","additional Q3"]]}
  ]},
  {g:"Options · lecture 4", rows:[
    {q:"Price a call or put with Black-Scholes; Delta, Rho, Gamma, Vega, Theta", cell:"Option BSM!B7", sg:[18, 22], w:"Black-Scholes · Greeks · European call / put · d₁, d₂", need:"S, K, y, σ, T", xl:"Option BSM",
     go:[["opt","Black-Scholes-Merton","BSM"],["opt","Two Greeks, not five","Greeks"]]},
    {q:"Find an option's VaR using its Delta and Rho (Greeks method)", cell:"Option BSM!B108", sg:[18, 19, 34], w:"“option pricing model approach” · r_Op = Δ(S/Op)·r_S + (ρ/Op)·dy", need:"+ μ and Ω of [r_S ; dy]", xl:"Option BSM",
     go:[["opt","The main example","main example"],["opt","Option VaR bench","bench"]]},
    {q:"Find an option's VaR with the building-block (binomial) method", cell:"Option Binomial!B7", sg:[20, 22, 34], w:"equivalent asset · replicating portfolio · building block · LEGO · up / down", need:"S, K, σ, y, T", xl:"Option Binomial",
     go:[["opt","The building block route","building block"]]},
    {q:"Price a digital (cash-or-nothing) option; its Delta and Rho", cell:"Option BSM!B49", sg:[21], w:"digital · binary · cash-or-nothing · “pays 1 if”", need:"S, K, y, σ, T", xl:"Option BSM",
     go:[["pset","Lecture 4 practice","exercise"]]},
    {q:"Check a Greek numerically by bumping S or y", cell:"Option BSM!B57", sg:[18], w:"numerical Greeks · central difference · dS, dy", need:"ΔS, Δy", xl:"Option BSM",
     go:[["opt","Greeks by numerical differentiation","numerical Greeks"]]},
    {q:"Check put-call parity, or say whether the call or the put is riskier", cell:"Option BSM!B270", sg:[18, 19], w:"put-call parity · “compare the risk of the call and the put”", need:"(same as Black-Scholes)", xl:"Option BSM",
     go:[["opt","The main example","main example"],["exam","Moderately difficult · 2","exam item"]]},
    {q:"Delta-hedge or rho-hedge an option, or cut the risk another way", cell:"Hedge!B202", sg:[23, 34], w:"delta hedge · rho hedge · reduce exposure · diversify", need:"option inputs, number held", xl:"Hedge",
     go:[["opt","Managing the risk","managing risk"]]}
  ]},
  {g:"Forwards and futures · lecture 5", rows:[
    {q:"Find the value and VaR of a forward contract", cell:"Forward!B7", sg:[24, 35], w:"forward · long call + short put · delivery price", need:"S, K, σ, y, T", xl:"Forward",
     go:[["fut","The forward example","forward example"],["exam","Difficult · 2","exam item"]]},
    {q:"Price a futures on a stock or index, and find its VaR", cell:"Futures!B7", sg:[25, 35], w:"futures · cost of carry · TFEX · SET50 futures · weights in money", need:"S₀, y_T, T", xl:"Futures",
     go:[["fut","Cost of carry","cost of carry"]]},
    {q:"Price a futures on a zero-coupon bond; the forward rate", cell:"Futures!B88", sg:[26, 29, 35], w:"futures on a ZCB · forward rate (T)f(N)", need:"T, N, y_T, y_(T+N)", xl:"Futures",
     go:[["fut","Zero-coupon bond futures","ZCB futures"]]},
    {q:"Price a futures on a coupon bond, or check whether a quote is possible", cell:"Futures!B180", sg:[27], w:"futures on a coupon bond · “is this price correct?”", need:"cash flows, spot rates", xl:"Futures",
     go:[["fut","Coupon bond futures","CB futures"],["exam","Difficult · 1","exam item"]]}
  ]},
  {g:"Hedging · lectures 4–5", rows:[
    {q:"Minimise a bond's risk with several futures — can the risk be removed?", cell:"Hedge!B32", sg:[30], w:"“minimise the risk” · optimal number of futures · “eliminate” · basis risk", need:"exposures (defaults = the practice)", xl:"Hedge",
     go:[["fut","The practice problem","practice problem"],["pset","Lecture 5 practice","worked"]]},
    {q:"Find the hedge ratio and how many futures contracts to short", cell:"Hedge!B7", sg:[31], w:"hedge ratio · h* = ρσ_S/σ_F · number of contracts", need:"σ_S, σ_F, ρ, sizes", xl:"Hedge", go:[]}
  ]},
  {g:"Other calculations · lectures 1–2", rows:[
    {q:"Find a bank's probability of bankruptcy, or the capital a rating needs", cell:"Solvency!B7", sg:[1], w:"assets · debt · probability of default · BBB rating · equity ratio", need:"A₀, D₀, μ_A, σ_A, rating", xl:"Solvency",
     go:[["fi","Bankruptcy is a statement","bankruptcy"],["fi","Solvency bench","bench"]]},
    {q:"Find VaR and ES from a list of possible losses; is VaR subadditive?", cell:"Discrete VaR-ES!B7", sg:[8], w:"“loses X with probability p” · two projects · subadditive · coherent", need:"losses, probabilities, α", xl:"Discrete VaR-ES",
     go:[["mr","The counterexample, worked in full","counterexample"],["mr","Subadditivity bench","bench"]]}
  ]},
  {g:"Beyond the decks · textbook context · Extras sheet", rows:[
    {q:"Historical-simulation VaR and ES from a column of past changes; backtest a VaR", w:"historical simulation · “how many exceptions” · backtest · Basel traffic light", need:"a Data series, α, the VaR to test", xl:"Extras", cell:"Extras!B8", sg:[],
     go:[["mr","Three ways to compute a VaR","three approaches"],["mr","How you find out the model was wrong","backtesting"]]},
    {q:"Update a variance with GARCH(1,1); long-run variance and a k-day forecast", w:"GARCH · ω, α, β · long-run variance · mean reversion", need:"ω, α, β, yesterday's σ and return", xl:"Extras", cell:"Extras!B47", sg:[],
     go:[["mr","Is standard deviation the right volatility measure","EWMA and GARCH"],["fx","GARCH","formula"]]},
    {q:"Bond price change with duration AND convexity", w:"convexity · second-order · “large yield change” · Taylor", need:"D_mod, convexity, Δy (or the Coupon Bond sheet)", xl:"Extras", cell:"Extras!B72", sg:[],
     go:[["fix","The term duration throws away","convexity"]]},
    {q:"Option price change with Delta AND Gamma (delta-gamma)", w:"delta-gamma · curvature · “large move in S” · long option right-skewed", need:"S, K, y, σ, T, ΔS (or the Option BSM sheet)", xl:"Extras", cell:"Extras!B96", sg:[],
     go:[["opt","What two Greeks cannot see","Gamma"]]},
    {q:"Implied volatility: the σ that reproduces a quoted option price", w:"implied volatility · “market price of the option” · invert Black-Scholes · Goal Seek", need:"market price, S, K, y, T", xl:"Extras", cell:"Extras!B126", sg:[],
     go:[["opt","The risk factor this course does not model","Vega and implied σ"]]}
  ]},
  {g:"Explain-in-words and Excel questions", rows:[
    {q:"Explain the types of risk, or regulation versus supervision", w:"market / credit / operational risk · Basel · BIS · supervision", need:"—", xl:"",
     go:[["fi","Activity in, risk out","risk types"],["fi","Regulation, supervision","regulation"]]},
    {q:"Explain why VaR is not a coherent risk measure, and why ES is", cell:"Discrete VaR-ES!B140", sg:[8], w:"coherent · subadditivity · monotonicity · translation invariance", need:"—", xl:"",
     go:[["mr","Expected shortfall, and why","coherence"]]},
    {q:"Compare historical, parametric and Monte Carlo VaR, or backtesting", cell:"Extras!B8", sg:[], w:"historical simulation · Monte Carlo · backtest · exceptions", need:"—", xl:"",
     go:[["mr","Three ways to compute a VaR","three approaches"],["mr","How you find out the model was wrong","backtesting"]]},
    {q:"Which Excel function, or why an array formula returns one number", cell:"Formula Sheet!B82", sg:[], w:"NORMSINV · MMULT · Ctrl+Shift+Enter · COVAR vs COVARIANCE.S", need:"—", xl:"Formula Sheet",
     go:[["xl","Every function used in the course","functions"],["xl","Array formulas","array formulas"],["xl","The trap list","traps"]]},
    {q:"Practise a full exam-length question (four long questions, every step worked)", cell:"Practice Qs!B16", sg:[32, 33, 34, 35], w:"mock exam · multi-step · long question · four questions", need:"—", xl:"Practice Qs",
     go:[["exam","A four-question mock","4-question mock"]]},
    {q:"Look up a formula, the Excel function for it, or the order of steps", cell:"Formula Sheet!B4", sg:[], w:"formula sheet · Excel function · NORMSINV · MMULT · step chain", need:"—", xl:"Formula Sheet",
     go:[["fx","Portfolios: the matrix form","formula bank"],["fx","Multi-step chains","step chains"]]},
    {q:"Practise with the course's own questions (answer keys included)", cell:"Practice Qs!B5", sg:[], w:"additional questions · practice problems · mock paper", need:"—", xl:"Practice Qs",
     go:[["pset","Additional questions","worked problems"],["exam","Sit a paper","mock paper"]]}
  ]}
];
var XL_GUIDE = [
 [
  "Start",
  "The same question finder as this page's GO panel; every sheet's live answer; settings (z mode, trading days, the path to this page); symbols; the five checks",
  "①",
  "③",
  [
   7
  ],
  null
 ],
 [
  "Solve Guide",
  "Every class question step by step: which cell, what to type, what to read — with a live ✓ (also below on this page)",
  "contents",
  "steps",
  [],
  [
   "xl",
   "Working with the Excel solver"
  ]
 ],
 [
  "Practice Qs",
  "The course's own questions with answer keys — a live ✓ self-test",
  "—",
  "G7:G28",
  [],
  [
   "pset",
   "Additional questions"
  ]
 ],
 [
  "Normal VaR",
  "One asset: VaR, ES, chance of a loss, T-day VaR, t-test of the mean",
  "C8:C17 · C63:C68",
  "C24:C34 · C71:C76",
  [
   4,
   5
  ],
  [
   "mr",
   "The deck's worked example"
  ]
 ],
 [
  "Asset VaR",
  "Money in several assets: portfolio VaR, diversification, marginal / component / incremental VaR and ES",
  "C8:C13 · B16:E25 · D29",
  "C81:C92 · C138:C153",
  [
   2,
   3,
   32
  ],
  [
   "fix",
   "Marginal and component VaR"
  ]
 ],
 [
  "Data",
  "Paste prices or rates → μ, σ, Ω, correlations, skewness, kurtosis, t-tests",
  "C7:C10 · C13:N17 · C90:N1089",
  "C21:N34 · Ω at C37",
  [
   6,
   7,
   14,
   15,
   16,
   17
  ],
  [
   "mr",
   "Estimating μ and σ"
  ]
 ],
 [
  "ZCB",
  "T-bill / zero-coupon bond: price, durations, VaR",
  "C8:C16 · rates at C113",
  "C20:C34",
  [
   11
  ],
  [
   "fix",
   "The T-bill example"
  ]
 ],
 [
  "Coupon Bond",
  "Coupon bond from a spot curve: price, weights, duration, VaR",
  "C8:C16 · E21:E50 · C110",
  "C54:C58 · C207:C218",
  [
   12,
   13,
   28,
   33
  ],
  [
   "fix",
   "The five-year coupon bond"
  ]
 ],
 [
  "Portfolio A",
  "Any mix of bonds, stocks and options (default: additional Q2)",
  "B10:K25 · C105 · C132:C133",
  "C150:C161",
  [
   14,
   15
  ],
  [
   "pset",
   "Additional question 2"
  ]
 ],
 [
  "Portfolio B",
  "Stocks + an option, Greeks or building block (default: additional Q3)",
  "B10:K25 · C105 · C132:C133",
  "C150:C161",
  [
   16,
   17
  ],
  [
   "pset",
   "Additional question 3"
  ]
 ],
 [
  "Option BSM",
  "Black-Scholes price and every Greek, digital options, numerical Greeks, parity, option VaR",
  "C8:C23 · C100 · C109:C112",
  "C28:C65 · C115:C139 · C271:C278",
  [
   18,
   19,
   21,
   34
  ],
  [
   "opt",
   "The main example"
  ]
 ],
 [
  "Option Binomial",
  "Building-block (equivalent-asset) option VaR",
  "C8:C24 · C72 · C79:C80",
  "C28:C48 · C87:C98",
  [
   20,
   22
  ],
  [
   "opt",
   "The building block route"
  ]
 ],
 [
  "Forward",
  "Forward = long call + short put: value, weights, VaR",
  "C8:C13 · C57 · C64:C65",
  "C16:C30 · C72:C83",
  [
   24,
   35
  ],
  [
   "fut",
   "The forward example"
  ]
 ],
 [
  "Futures",
  "Futures on an asset, a ZCB or a coupon bond: price, weights, VaR",
  "C8:C11 · C89:C94 · C181:C207",
  "C14:C16 · C97:C102 · C209:C212",
  [
   25,
   26,
   27,
   29,
   35
  ],
  [
   "fut",
   "Cost of carry"
  ]
 ],
 [
  "Hedge",
  "Hedge ratio, best hedge with several futures, delta / rho hedge",
  "C8:C12 · C34:C35 · rows 58–86 · C204:C210",
  "C15:C19 · C157:C187 · C213:C220",
  [
   23,
   30,
   31
  ],
  [
   "fut",
   "The practice problem"
  ]
 ],
 [
  "Custom w",
  "Any w and Ω you already have → VaR",
  "C8:C25 · C28:C41",
  "C71:C82",
  [],
  [
   "start",
   "The whole course in three symbols"
  ]
 ],
 [
  "Discrete VaR-ES",
  "VaR and ES from a list of losses; subadditivity",
  "C8 · B10:E22",
  "C141:C148",
  [
   8
  ],
  [
   "mr",
   "The counterexample, worked in full"
  ]
 ],
 [
  "Solvency",
  "Probability of bankruptcy; capital for a target rating",
  "C8:C12 · C15:C21",
  "C25:C30",
  [
   1
  ],
  [
   "fi",
   "Bankruptcy is a statement"
  ]
 ],
 [
  "EWMA",
  "EWMA volatility update, one step or a whole series",
  "C8:C10 · C28:C30 · C82:C1081",
  "C13:C16 · C33:C39",
  [
   9,
   10
  ],
  [
   "mr",
   "Is standard deviation the right volatility measure"
  ]
 ],
 [
  "Extras",
  "NEW · historical-simulation VaR/ES and a backtest, GARCH(1,1), convexity, delta-gamma, implied volatility",
  "C9:C13 · C48:C53 · C73:C77 · C97:C104 · C127:C133",
  "C17:C38 · C56:C65 · C80:C88 · C107:C118 · C136:C143",
  [],
  [
   "mr",
   "Three ways to compute a VaR"
  ]
 ],
 [
  "Formula Sheet",
  "Every formula with its Excel function and sheet, the Excel functions, step chains, your notes checked, and (new) the textbook formulas",
  "—",
  "—",
  [],
  [
   "fx",
   "Formulas & functions"
  ]
 ]
];

/* ---------------- the Excel solver's Solve Guide (generated from the workbook) ----------------
   n: example number · t: title · src: where it comes from · sheets: solver sheets it uses · go: [topic, heading] that explains it
   steps: [what to do, sheet!cell, value to type or answer to read, 1 = a 'Read ▸' step] */
var SOLVE_GUIDE = [{"n": 1, "t": "Probability of bankruptcy and the capital a BBB rating needs", "src": "Lecture 1", "q": "A bank has assets of 100m and debt of 92m. Asset returns are normal with μ_A = 2% and σ_A = 10% a year. Probability of bankruptcy? How much equity for a BBB rating?", "need": "assets A₀, debt D₀, mean and SD of the asset return, the target rating.", "how": "Bankrupt when the asset return < −(A₀ − D₀)/A₀ = −8%, so PD = N((−8% − μ_A)/σ_A). The rating's default probability gives the equity ratio: (E/A) = −(μ_A + z·σ_A).", "sheets": ["Solvency"], "go": ["fi", "Bankruptcy is a statement"], "steps": [["▸ Open the Solvency sheet (link).", "Solvency!B6", "", 0], ["Assets A₀: type 100000000 — the question's 'assets of 100m' written out in full.", "Solvency!C8", "100000000", 0], ["Debt D₀: type 92000000 — 'debt of 92m'. Equity is A₀ − D₀ = 8m.", "Solvency!C9", "92000000", 0], ["Mean asset return μ_A: 2% as a decimal → 0.02.", "Solvency!C10", "0.02", 0], ["SD of the asset return σ_A: 10% as a decimal → 0.10.", "Solvency!C11", "0.1", 0], ["Target rating (▾): choose BBB — the sheet looks up the one-year default probability of that rating.", "Solvency!C12", "BBB", 0], ["Read ▸ Probability of bankruptcy = N(−1): about 15.87%.", "Solvency!C27", "0.15865525", 1], ["Read ▸ Equity ratio a BBB rating needs — equity must be this share of assets.", "Solvency!C29", "0.212713", 1]]}, {"n": 2, "t": "Gold and silver: portfolio VaR, diversification, marginal and component VaR", "src": "Additional question 1", "q": "$300,000 in gold and $500,000 in silver; daily σ 1.8% and 1.2%; correlation 0.6. 10-day 97.5% VaR, the benefit of diversification, marginal and component VaR.", "need": "the money in each asset, each asset's daily σ, the correlation, the confidence level (→ α) and the horizon in days. No means are given, so μ = 0.", "how": "w = money / total;  σ_P = √(wᵀΩw);  VaR = z·σ_P·W₀·√T;  benefit = Σ individual VaRs − portfolio VaR;  marginal = z·(Ωw)ᵢ/σ_P;  component = marginal × money in the asset.", "sheets": ["Asset VaR"], "go": ["pset", "Additional question 1"], "steps": [["▸ Open the Asset VaR sheet (link) and stay in the yellow INPUTS band at the top.", "Asset VaR!B6", "", 0], ["Tail probability α: the question says 97.5% confidence, so α = 1 − 0.975 = 0.025 (as a decimal).", "Asset VaR!C8", "0.025", 0], ["Horizon T: type 10 — '10-day VaR'. The sheet scales by √T.", "Asset VaR!C9", "10", 0], ["Positions are given as (▾): choose 'Money amounts' — the question gives $300,000 and $500,000, not weights.", "Asset VaR!C10", "Money amounts", 0], ["Risk is given as (▾): choose 'σ's and correlations' — the question gives each σ and one correlation (not a covariance matrix).", "Asset VaR!C12", "σ's and correlations", 0], ["μ, σ are (▾): choose 'Daily' — 'daily volatility 1.8%'.", "Asset VaR!C13", "Daily", 0], ["Asset table, row 1, Name: type Gold (a label only).", "Asset VaR!B16", "Gold", 0], ["Row 1, Money: type 300000 — '$300,000 in gold' (no $ or commas).", "Asset VaR!C16", "300000", 0], ["Row 1, σ: gold's daily volatility 1.8% as a decimal → 0.018.", "Asset VaR!D16", "0.018", 0], ["Row 1, μ: type 0 — no expected return is given, so the course sets μ = 0.", "Asset VaR!E16", "0", 0], ["Row 2, Name: type Silver.", "Asset VaR!B17", "Silver", 0], ["Row 2, Money: type 500000 — '$500,000 in silver'.", "Asset VaR!C17", "500000", 0], ["Row 2, σ: silver's daily volatility 1.2% as a decimal → 0.012.", "Asset VaR!D17", "0.012", 0], ["Row 2, μ: type 0.", "Asset VaR!E17", "0", 0], ["Correlation box, row 1 (Gold) · column 2 (Silver): type 0.6. Type only above the diagonal; the diagonal is 1 and the lower half fills itself.", "Asset VaR!D29", "0.6", 0], ["Read ▸ σ_P, the daily SD of the portfolio return (ANSWERS band): 1.275%.", "Asset VaR!C83", "0.01275", 1], ["Read ▸ 1-day VaR in money. The class writes the loss as a positive number: $19,991.63.", "Asset VaR!C87", "-19991.63264231", 1], ["Read ▸ 10-day VaR in money = 1-day × √10: $63,219.09 — the answer to part 1.", "Asset VaR!C90", "-63219.09329507", 1], ["Read ▸ Benefit of diversification over 10 days = (gold VaR + silver VaR) − portfolio VaR.", "Asset VaR!C151", "7437.54038765", 1], ["Read ▸ Marginal VaR of gold (per-asset table, 'Marginal VaR (by weight)' column): VaR rises about 0.0311 per 1 of extra weight.", "Asset VaR!F138", "-0.03112884", 1], ["Read ▸ Component VaR of gold in money (1 day). Gold + silver components add up to the portfolio VaR.", "Asset VaR!I138", "-9338.65192634", 1]]}, {"n": 3, "t": "MS and ATT: portfolio VaR, ES, marginal, component and incremental VaR", "src": "03_VaR workbook · Equity portfolio", "q": "10,000,000 in MS and 5,000,000 in ATT; daily σ 2% and 1%; correlation 0.3; 99%; 10-day horizon.", "need": "the money in each stock, their daily σ's, the correlation, 99% (→ α = 0.01) and 10 days. μ = 0 (not given).", "how": "Same as the gold/silver question, plus ES = σ_P·φ(z)/α·W₀ and incremental VaR = VaR_P − VaR(portfolio without the asset).", "sheets": ["Asset VaR"], "go": ["fix", "Marginal and component VaR"], "steps": [["▸ Open the Asset VaR sheet (link).", "Asset VaR!B6", "", 0], ["Tail probability α: 99% confidence → 0.01 (as a decimal).", "Asset VaR!C8", "0.01", 0], ["Horizon T: type 10 — '10-day horizon'.", "Asset VaR!C9", "10", 0], ["Positions are given as (▾): 'Money amounts' — the question gives Baht invested.", "Asset VaR!C10", "Money amounts", 0], ["Risk is given as (▾): 'σ's and correlations'.", "Asset VaR!C12", "σ's and correlations", 0], ["μ, σ are (▾): 'Daily' — the σ's are daily.", "Asset VaR!C13", "Daily", 0], ["Asset table row 1, Name: MS.", "Asset VaR!B16", "MS", 0], ["Row 1, Money: 10000000 — the investment in MS.", "Asset VaR!C16", "10000000", 0], ["Row 1, σ: MS daily SD 2% as a decimal → 0.02.", "Asset VaR!D16", "0.02", 0], ["Row 1, μ: 0 (not given).", "Asset VaR!E16", "0", 0], ["Row 2, Name: ATT.", "Asset VaR!B17", "ATT", 0], ["Row 2, Money: 5000000 — the investment in ATT.", "Asset VaR!C17", "5000000", 0], ["Row 2, σ: ATT daily SD 1% as a decimal → 0.01.", "Asset VaR!D17", "0.01", 0], ["Row 2, μ: 0.", "Asset VaR!E17", "0", 0], ["Correlation box, row 1 · column 2: type 0.3 (the MS–ATT correlation).", "Asset VaR!D29", "0.3", 0], ["Read ▸ 1-day portfolio VaR in money. The class shows it as the positive loss 512,324.97.", "Asset VaR!C87", "-512324.97489", 1], ["Read ▸ 10-day portfolio VaR in money (× √10).", "Asset VaR!C90", "-1.62011e+06", 1], ["Read ▸ Marginal VaR of MS by weight (per-asset table). 'Marginal × W₀' beside it is the money version (681,339.40).", "Asset VaR!F138", "-0.04542263", 1], ["Read ▸ Component VaR of MS, 1 day; 'Share of VaR' next to it gives 88.66%.", "Asset VaR!I138", "-454226.2664", 1], ["Read ▸ Portfolio expected shortfall, 1 day, money.", "Asset VaR!C92", "-586952.54642", 1], ["Read ▸ Portfolio expected shortfall, 10 days, money.", "Asset VaR!C152", "-1.85611e+06", 1]]}, {"n": 4, "t": "VaR of one normal return, and the chance of a loss", "src": "Deck examples · Simple 1", "q": "r ~ N(0.02, 0.05): the 1% and 5% quantiles and the probability of a loss.", "need": "the mean 0.02 and SD 0.05 of the return, the tail probability, and the loss threshold (0 = any loss).", "how": "r_α = μ + z_α·σ with z = NORMSINV(α);  P(loss) = P(r < 0) = N((0 − μ)/σ).", "sheets": ["Normal VaR"], "go": ["mr", "The deck's worked example"], "steps": [["▸ Open the Normal VaR sheet (link).", "Normal VaR!B6", "", 0], ["Take μ and σ from (▾): 'Typed below' — the question gives μ and σ directly (not a data series).", "Normal VaR!C8", "Typed below", 0], ["Mean μ: type 0.02 — the first number in N(0.02, 0.05) (as a decimal).", "Normal VaR!C10", "0.02", 0], ["SD σ: type 0.05 — the second number in N(0.02, 0.05). (If a question gives the VARIANCE, type its square root.)", "Normal VaR!C11", "0.05", 0], ["μ and σ are per (▾): 'Day' — no time unit is given, so treat them as one period.", "Normal VaR!C12", "Day", 0], ["α: the 1% quantile → 0.01 (as a decimal).", "Normal VaR!C13", "0.01", 0], ["W₀: any amount (1000000) — only needed for the money figures; the quantile does not depend on it.", "Normal VaR!C14", "1000000", 0], ["Horizon: 1 (one period).", "Normal VaR!C15", "1", 0], ["Horizon unit (▾): 'Day', the same unit as μ and σ.", "Normal VaR!C16", "Day", 0], ["Threshold X: 0 — 'probability of a loss' means P(r < 0).", "Normal VaR!C17", "0", 0], ["Read ▸ the 1% quantile r_α = 0.02 − 2.3263 × 0.05 = −9.6317%.", "Normal VaR!C25", "-0.09631739", 1], ["Read ▸ P(loss) = N(−0.4) = 34.46%.", "Normal VaR!C34", "0.34457826", 1]]}, {"n": 5, "t": "t-test: is the mean return different from zero?", "src": "Deck example", "q": "10 observations, mean 0.0289, variance 0.002106. Test H₀: μ = 0 at 5%.", "need": "the number of observations, the sample mean, the sample variance (or SD) and the significance level.", "how": "t = mean·√n / SD;  reject H₀ when |t| > the critical t (two-tailed) with n − 1 degrees of freedom.", "sheets": ["Normal VaR"], "go": ["mr", "The t-test"], "steps": [["▸ Open the Normal VaR sheet at the t-test section (link).", "Normal VaR!B61", "", 0], ["Number of observations: 10.", "Normal VaR!C63", "10", 0], ["Sample mean: 0.0289 (as given).", "Normal VaR!C64", "0.0289", 0], ["Sample variance: 0.002106 — the question gives the VARIANCE, so it goes in this box.", "Normal VaR!C65", "0.002106", 0], ["SD box: leave EMPTY (delete anything in it) — use it instead of the variance box only when the question gives an SD.", "Normal VaR!C66", "(blank)", 0], ["Significance level: 5% → 0.05 (as a decimal).", "Normal VaR!C67", "0.05", 0], ["Degrees of freedom (▾): 'T − 1' = 9 — the usual rule for testing one mean.", "Normal VaR!C68", "T − 1", 0], ["Read ▸ t-statistic = 0.0289·√10/√0.002106 = 1.9914.", "Normal VaR!C72", "1.99144657", 1], ["Read ▸ critical t at 5%, df 9 = 2.2622. |t| < critical → cannot reject H₀: the mean is not significantly different from 0.", "Normal VaR!C74", "2.26215716", 1]]}, {"n": 6, "t": "SET index: mean, SD and t-test from 746 daily returns", "src": "03_VaR workbook · SET index", "q": "The SET index's daily % changes over 746 days: is the mean return significantly different from zero?", "need": "the column of 746 daily changes (the class file's SET sheet), and how the class computes SD and df (STDEV.P, n − 2).", "how": "The Data sheet computes n, mean, SD, t = mean·√n/SD, df, critical t and the p-value for every pasted column.", "sheets": ["Data"], "go": ["mr", "Estimating μ and σ"], "steps": [["▸ Open the Data sheet (link). The paste block starts at the first row of the yellow table, column C; every column is one series.", "Data!B5", "", 0], ["Delete the old table first: select the whole yellow paste block (C to N, down to the last filled row) and press Delete — otherwise old rows get mixed into the new data.", "Data!C90", "select & Delete", 0], ["Copy the 746 daily changes of the SET index (the class file's return column, as decimals) — oldest row at the top, numbers only (no dates, no headings) — then click the linked cell and paste. If the source cells hold formulas, use Paste Special ▸ Values (Ctrl+Alt+V, V, Enter).   (746 × 1)", "Data!C90", "paste the table", 0], ["Row 'Becomes a factor via', column of series 1 (SET changes): choose 'As is' — the column already holds returns / changes, so they are used unchanged.", "Data!C15", "As is", 0], ["Ω divisor (top of the Data sheet): choose 'Sample' — the class answer uses the n − 1 (VAR.S / COVARIANCE.S) covariance.", "Data!C7", "Sample", 0], ["SD used in the t-test (▾): 'population (n)' — the class file uses STDEV.P.", "Data!C9", "population (n)", 0], ["t-test degrees of freedom (▾): 'n − 2' — as the class file.", "Data!C8", "n − 2", 0], ["Read ▸ n (column C of the statistics table): 746 changes.", "Data!C21", "746", 1], ["Read ▸ mean daily change.", "Data!C22", "-0.00026193", 1], ["Read ▸ t-statistic.", "Data!C25", "-0.81176509", 1], ["Read ▸ two-tailed p-value (0.417 > 0.05).", "Data!C29", "0.41718607", 1], ["Read ▸ critical t at 5%: |t| = 0.81 < 1.96 → cannot reject H₀: μ = 0.", "Data!C27", "1.96315763", 1]]}, {"n": 7, "t": "Thai spot rates: statistics and zero-coupon VaR for 8 maturities", "src": "250 Days of Index & Yield of Thai Bonds · Spot Rates", "q": "251 days of the 1M…5Y zero-coupon yield curve. Mean, SD, skewness, kurtosis and the zero-mean VaR of a ZCB at each maturity (table z −2.33).", "need": "the table of 251 daily spot rates in % for the 8 maturities, each maturity in years, and the z the class uses (−2.33 from the table).", "how": "Each column → daily change dy = Δrate/100; mean, SD, SKEW, KURT; ZCB VaR (zero mean) = z·σ(dy)·maturity (modified duration ≈ maturity).", "sheets": ["Data", "Start"], "go": ["mr", "Estimating μ and σ"], "steps": [["▸ Open the Data sheet (link). The paste block starts at the first row of the yellow table, column C; every column is one series.", "Data!B5", "", 0], ["Delete the old table first: select the whole yellow paste block (C to N, down to the last filled row) and press Delete — otherwise old rows get mixed into the new data.", "Data!C90", "select & Delete", 0], ["Copy the 251 × 8 block of spot rates in % (columns 1M, 3M, 6M, 1Y, 2Y, 3Y, 4Y, 5Y, left to right) — oldest row at the top, numbers only (no dates, no headings) — then click the linked cell and paste. If the source cells hold formulas, use Paste Special ▸ Values (Ctrl+Alt+V, V, Enter).   (251 × 8)", "Data!C90", "paste the table", 0], ["Row 'Becomes a factor via', column of series 1 (1M): choose 'Rate%-dy' — the column holds rates in % (e.g. 7.36), so the factor is the change in the rate as a decimal, (y_t − y_t−1)/100.", "Data!C15", "Rate%-dy", 0], ["Row 'Becomes a factor via', column of series 2 (3M): choose 'Rate%-dy' — the column holds rates in % (e.g. 7.36), so the factor is the change in the rate as a decimal, (y_t − y_t−1)/100.", "Data!D15", "Rate%-dy", 0], ["Row 'Becomes a factor via', column of series 3 (6M): choose 'Rate%-dy' — the column holds rates in % (e.g. 7.36), so the factor is the change in the rate as a decimal, (y_t − y_t−1)/100.", "Data!E15", "Rate%-dy", 0], ["Row 'Becomes a factor via', column of series 4 (1Y): choose 'Rate%-dy' — the column holds rates in % (e.g. 7.36), so the factor is the change in the rate as a decimal, (y_t − y_t−1)/100.", "Data!F15", "Rate%-dy", 0], ["Row 'Becomes a factor via', column of series 5 (2Y): choose 'Rate%-dy' — the column holds rates in % (e.g. 7.36), so the factor is the change in the rate as a decimal, (y_t − y_t−1)/100.", "Data!G15", "Rate%-dy", 0], ["Row 'Becomes a factor via', column of series 6 (3Y): choose 'Rate%-dy' — the column holds rates in % (e.g. 7.36), so the factor is the change in the rate as a decimal, (y_t − y_t−1)/100.", "Data!H15", "Rate%-dy", 0], ["Row 'Becomes a factor via', column of series 7 (4Y): choose 'Rate%-dy' — the column holds rates in % (e.g. 7.36), so the factor is the change in the rate as a decimal, (y_t − y_t−1)/100.", "Data!I15", "Rate%-dy", 0], ["Row 'Becomes a factor via', column of series 8 (5Y): choose 'Rate%-dy' — the column holds rates in % (e.g. 7.36), so the factor is the change in the rate as a decimal, (y_t − y_t−1)/100.", "Data!J15", "Rate%-dy", 0], ["Ω divisor (top of the Data sheet): choose 'Sample' — the class answer uses the n − 1 (VAR.S / COVARIANCE.S) covariance.", "Data!C7", "Sample", 0], ["Row '÷ periods', series 1 (1M): 1 — the rates are already per year, nothing to divide.", "Data!C16", "1", 0], ["Row '÷ periods', series 2 (3M): 1 — the rates are already per year, nothing to divide.", "Data!D16", "1", 0], ["Row '÷ periods', series 3 (6M): 1 — the rates are already per year, nothing to divide.", "Data!E16", "1", 0], ["Row '÷ periods', series 4 (1Y): 1 — the rates are already per year, nothing to divide.", "Data!F16", "1", 0], ["Row '÷ periods', series 5 (2Y): 1 — the rates are already per year, nothing to divide.", "Data!G16", "1", 0], ["Row '÷ periods', series 6 (3Y): 1 — the rates are already per year, nothing to divide.", "Data!H16", "1", 0], ["Row '÷ periods', series 7 (4Y): 1 — the rates are already per year, nothing to divide.", "Data!I16", "1", 0], ["Row '÷ periods', series 8 (5Y): 1 — the rates are already per year, nothing to divide.", "Data!J16", "1", 0], ["Row 'Maturity (years)', series 1: 1M = 0.0833333 years (months ÷ 12).", "Data!C17", "0.08333333", 0], ["Row 'Maturity (years)', series 2: 3M = 0.25 years (months ÷ 12).", "Data!D17", "0.25", 0], ["Row 'Maturity (years)', series 3: 6M = 0.5 years (months ÷ 12).", "Data!E17", "0.5", 0], ["Row 'Maturity (years)', series 4: 1Y = 1 years (months ÷ 12).", "Data!F17", "1", 0], ["Row 'Maturity (years)', series 5: 2Y = 2 years (months ÷ 12).", "Data!G17", "2", 0], ["Row 'Maturity (years)', series 6: 3Y = 3 years (months ÷ 12).", "Data!H17", "3", 0], ["Row 'Maturity (years)', series 7: 4Y = 4 years (months ÷ 12).", "Data!I17", "4", 0], ["Row 'Maturity (years)', series 8: 5Y = 5 years (months ÷ 12).", "Data!J17", "5", 0], ["Start sheet ▸ z-value mode (▾): 'Table' — the class uses the table value −2.33 instead of NORMSINV's −2.3263.", "Start!C79", "Table", 0], ["Data sheet ▸ α for the per-series VaR row: 0.01 (99%, as a decimal).", "Data!C10", "0.01", 0], ["Read ▸ ZCB VaR at the 1M maturity (row 'ZCB VaR', column 1).", "Data!C34", "-2.68641e-05", 1], ["Read ▸ ZCB VaR at the 3M maturity (row 'ZCB VaR', column 2).", "Data!D34", "-8.13111e-05", 1], ["Read ▸ ZCB VaR at the 6M maturity (row 'ZCB VaR', column 3).", "Data!E34", "-0.00017103", 1], ["Read ▸ ZCB VaR at the 1Y maturity (row 'ZCB VaR', column 4).", "Data!F34", "-0.00031944", 1], ["Read ▸ ZCB VaR at the 2Y maturity (row 'ZCB VaR', column 5).", "Data!G34", "-0.00082648", 1], ["Read ▸ ZCB VaR at the 3Y maturity (row 'ZCB VaR', column 6).", "Data!H34", "-0.00145698", 1], ["Read ▸ ZCB VaR at the 4Y maturity (row 'ZCB VaR', column 7).", "Data!I34", "-0.00282538", 1], ["Read ▸ ZCB VaR at the 5Y maturity (row 'ZCB VaR', column 8).", "Data!J34", "-0.00387712", 1], ["Read ▸ SD of the 1Y rate changes (row 'SD', column 4).", "Data!F23", "0.0001371", 1], ["Read ▸ skewness of the 1Y changes — strongly negative, so the normal assumption is doubtful.", "Data!F32", "-8.11368656", 1]]}, {"n": 8, "t": "Two projects: VaR, ES, and why VaR is not subadditive", "src": "Hull 11.5 / 11.7", "q": "Each project loses 10 with probability 2% and 1 otherwise. VaR and ES at 97.5%, alone and together.", "need": "each possible loss with its probability, and the confidence level.", "how": "Sort the losses; VaR = the smallest loss with P(loss ≥ it) covering the tail; ES = average loss in the worst α of outcomes. Both projects together: the sheet builds the joint distribution.", "sheets": ["Discrete VaR-ES"], "go": ["mr", "The counterexample, worked in full"], "steps": [["▸ Open the Discrete VaR-ES sheet (link).", "Discrete VaR-ES!B6", "", 0], ["α: 97.5% confidence → 0.025 (as a decimal).", "Discrete VaR-ES!C8", "0.025", 0], ["Project B (▾): 'Same as A' — both projects have the same outcomes and are independent.", "Discrete VaR-ES!C9", "Same as A", 0], ["Project A table, row 1, Loss: 1 — 'loses 1 otherwise'.", "Discrete VaR-ES!C11", "1", 0], ["Row 1, Probability: 0.98 = 1 − 0.02 (as a decimal).", "Discrete VaR-ES!D11", "0.98", 0], ["Row 2, Loss: 10.", "Discrete VaR-ES!C12", "10", 0], ["Row 2, Probability: 0.02 — '2%'.", "Discrete VaR-ES!D12", "0.02", 0], ["Read ▸ VaR of one project = 1.", "Discrete VaR-ES!C141", "1", 1], ["Read ▸ ES of one project = 8.2.", "Discrete VaR-ES!C142", "8.2", 1], ["Read ▸ VaR of both projects together = 11.", "Discrete VaR-ES!C145", "11", 1], ["Read ▸ ES of both together = 11.144.", "Discrete VaR-ES!C146", "11.144", 1]]}, {"n": 9, "t": "EWMA: update today's volatility", "src": "Deck example", "q": "λ = 0.94, yesterday's σ = 1%, yesterday's return −2%.", "need": "λ, yesterday's volatility estimate and yesterday's return.", "how": "σ²_today = λ·σ²_yesterday + (1 − λ)·u²_yesterday.", "sheets": ["EWMA"], "go": ["mr", "Is standard deviation the right volatility measure"], "steps": [["▸ Open the EWMA sheet (link), top section 'one step'.", "EWMA!B6", "", 0], ["λ: 0.94.", "EWMA!C8", "0.94", 0], ["Yesterday's σ: 1% as a decimal → 0.01.", "EWMA!C9", "0.01", 0], ["Yesterday's return u: −2% as a decimal → −0.02 (the sign does not matter; it is squared).", "EWMA!C10", "-0.02", 0], ["Read ▸ today's σ = √(0.94·0.01² + 0.06·0.02²) = 1.0863%.", "EWMA!C14", "0.01086278", 1]]}, {"n": 10, "t": "EWMA over 250 daily returns: recursive, weighted sum, equal weight", "src": "EWMA Volatility_rev workbook", "q": "250 daily returns, λ = 0.97: the EWMA volatility both ways, and the equal-weight volatility.", "need": "the column of daily returns (oldest first), λ, and how the recursion starts.", "how": "Recursive: σ²_t = λσ²_t−1 + (1−λ)u²_t−1 from a seed.  Weighted sum: Σλ^(k−1)u² / Σλ^(k−1).  Equal weight: √(Σu²/n).", "sheets": ["EWMA"], "go": ["mr", "Is standard deviation the right volatility measure"], "steps": [["▸ Open the EWMA sheet (link) and scroll to the series section.", "EWMA!B6", "", 0], ["λ for the series: 0.97.", "EWMA!C28", "0.97", 0], ["Starting variance (▾): 'First return squared' — the class file starts the recursion with u₁².", "EWMA!C29", "First return squared", 0], ["Copy the 250 daily returns (decimals, OLDEST first) and paste into column C of the series table (linked cell).   (250 × 1)", "EWMA!C82", "paste the table", 0], ["Read ▸ EWMA σ on the last day (the class file's Sheet2 figure).", "EWMA!C34", "0.01295473", 1], ["Read ▸ EWMA σ by the weighted sum (the class file's Sheet1 figure).", "EWMA!C36", "0.01293627", 1], ["Read ▸ equal-weight σ = √(Σu²/n), for comparison.", "EWMA!C37", "0.01145299", 1]]}, {"n": 11, "t": "T-bill: price, durations and VaR from past rates", "src": "Simple 2 + Moderately difficult 1 · 03_VaR workbook · Bond_duration", "q": "One-year T-bill, par 1,000,000, 3% semiannual; eleven semiannual discount rates. Price, D_mac, D_mod, 99% VaR in % and Baht.", "need": "par value, yield, maturity, compounding, and the history of 11 rates (in % per year).", "how": "B = F/(1+y/2)^(2T);  D_mod = D_mac/(1+y/2) in half-years;  dy = change in (rate/2/100);  VaR = −D_mod·μ_dy + z·D_mod·σ_dy.", "sheets": ["ZCB"], "go": ["fix", "The T-bill example"], "steps": [["▸ Open the ZCB sheet (link).", "ZCB!B6", "", 0], ["Face value F: 1000000 — 'par 1,000,000'.", "ZCB!C8", "1000000", 0], ["Yield: 3 — '3%' (in %, number only).", "ZCB!C9", "3", 0], ["Maturity: 1 (years) — 'one-year T-bill'.", "ZCB!C10", "1", 0], ["Compounding (▾): 'Semiannual' — the yield compounds twice a year, so there are 2 periods.", "ZCB!C11", "Semiannual", 0], ["α: 99% → 0.01.", "ZCB!C12", "0.01", 0], ["Horizon: 1 period.", "ZCB!C13", "1", 0], ["Take μ_dy and σ_dy from (▾): 'Rate history below' — the question gives past rates, not μ and σ.", "ZCB!C14", "Rate history below", 0], ["Scroll down to the rate-history table (the link): type or paste the 11 discount rates in % per year, first date at the top: 5.05, 5.08, 5.29, … 4.70.   (11 × 1)", "ZCB!C112", "paste the table", 0], ["Read ▸ price B = 1,000,000/1.015² = 970,661.75.", "ZCB!C23", "970661.74864714", 1], ["Read ▸ D_mod in half-years = 2/1.015.", "ZCB!C25", "1.97044335", 1], ["Read ▸ VaR as a return (%).", "ZCB!C31", "-0.00373269", 1], ["Read ▸ VaR in Baht = VaR% × B.", "ZCB!C32", "-3623.17603298", 1]]}, {"n": 12, "t": "The five-year 3% coupon bond: price, weights, duration, VaR", "src": "Deck example · Thai bond workbook 'Example VaR Coupon bond'", "q": "FV 100, 3% annual coupon, 5 years, Thai zero curve; μ and Ω of the five yield changes from 250 days.", "need": "face value, coupon rate, payments a year, maturity, the spot rate for each cash-flow date, and μ and Ω of the daily changes of those spot rates.", "how": "Price each cash flow at its own spot rate; w_t = PV_t/B; adjusted weight = −t·w_t; μ_P = wᵀμ, σ_P = √(wᵀΩw), VaR = μ_P + z·σ_P.", "sheets": ["Coupon Bond"], "go": ["fix", "The five-year coupon bond"], "steps": [["▸ Open the Coupon Bond sheet (link).", "Coupon Bond!B6", "", 0], ["Face value: 100.", "Coupon Bond!C8", "100", 0], ["Coupon: 3 — '3% annual coupon' (in %, number only).", "Coupon Bond!C9", "3", 0], ["Payments per year: 1 (annual).", "Coupon Bond!C10", "1", 0], ["Maturity: 5 years → 5 cash flows.", "Coupon Bond!C11", "5", 0], ["Discounting (▾): 'Discrete' — PV = CF/(1+y)^t, as the class file.", "Coupon Bond!C12", "Discrete", 0], ["Adjusted-weight rule (▾): '-t (formula sheet)' — the formula sheet's −t·w.", "Coupon Bond!C13", "-t (formula sheet)", 0], ["Number held: 1.", "Coupon Bond!C14", "1", 0], ["α: 0.01 (99%).", "Coupon Bond!C15", "0.01", 0], ["Horizon: 1 day.", "Coupon Bond!C16", "1", 0], ["Spot-rate table, year 1: 1.510592 — the 1Y zero rate on the last day of the data, in %, number only.", "Coupon Bond!E21", "1.510592", 0], ["Spot-rate table, year 2: 1.621256 — the 2Y zero rate on the last day of the data, in %, number only.", "Coupon Bond!E22", "1.621256", 0], ["Spot-rate table, year 3: 1.777315 — the 3Y zero rate on the last day of the data, in %, number only.", "Coupon Bond!E23", "1.777315", 0], ["Spot-rate table, year 4: 1.910292 — the 4Y zero rate on the last day of the data, in %, number only.", "Coupon Bond!E24", "1.910292", 0], ["Spot-rate table, year 5: 2.326193 — the 5Y zero rate on the last day of the data, in %, number only.", "Coupon Bond!E25", "2.326193", 0], ["μ box, factor 1 = dy1: type its MEAN as a decimal — from the class file's statistics of the daily spot-rate changes.", "Coupon Bond!D112", "-2.00767e-05", 0], ["μ box, factor 2 = dy2: type its MEAN as a decimal (same source).", "Coupon Bond!D113", "-1.62792e-05", 0], ["μ box, factor 3 = dy3: type its MEAN as a decimal (same source).", "Coupon Bond!D114", "-1.81798e-05", 0], ["μ box, factor 4 = dy4: type its MEAN as a decimal (same source).", "Coupon Bond!D115", "-2.13406e-05", 0], ["μ box, factor 5 = dy5: type its MEAN as a decimal (same source).", "Coupon Bond!D116", "-3.81928e-06", 0], ["Ω box, row 1 · column 1: type the VARIANCE of dy1 as a decimal — from the class file's statistics of the daily spot-rate changes.", "Coupon Bond!E112", "1.87956e-08", 0], ["Ω box, row 1 · column 2: type the COVARIANCE of dy1 and dy2 as a decimal.  Type only on and above the diagonal; the lower half fills itself.", "Coupon Bond!F112", "1.50247e-08", 0], ["Ω box, row 1 · column 3: type the COVARIANCE of dy1 and dy3 as a decimal.", "Coupon Bond!G112", "1.2406e-08", 0], ["Ω box, row 1 · column 4: type the COVARIANCE of dy1 and dy4 as a decimal.", "Coupon Bond!H112", "1.21055e-08", 0], ["Ω box, row 1 · column 5: type the COVARIANCE of dy1 and dy5 as a decimal.", "Coupon Bond!I112", "1.52979e-08", 0], ["Ω box, row 2 · column 2: type the VARIANCE of dy2 as a decimal.", "Coupon Bond!F113", "3.14553e-08", 0], ["Ω box, row 2 · column 3: type the COVARIANCE of dy2 and dy3 as a decimal.", "Coupon Bond!G113", "2.41576e-08", 0], ["Ω box, row 2 · column 4: type the COVARIANCE of dy2 and dy4 as a decimal.", "Coupon Bond!H113", "3.43298e-08", 0], ["Ω box, row 2 · column 5: type the COVARIANCE of dy2 and dy5 as a decimal.", "Coupon Bond!I113", "4.08221e-08", 0], ["Ω box, row 3 · column 3: type the VARIANCE of dy3 as a decimal.", "Coupon Bond!G114", "4.34465e-08", 0], ["Ω box, row 3 · column 4: type the COVARIANCE of dy3 and dy4 as a decimal.", "Coupon Bond!H114", "4.98189e-08", 0], ["Ω box, row 3 · column 5: type the COVARIANCE of dy3 and dy5 as a decimal.", "Coupon Bond!I114", "4.63237e-08", 0], ["Ω box, row 4 · column 4: type the VARIANCE of dy4 as a decimal.", "Coupon Bond!H115", "9.19013e-08", 0], ["Ω box, row 4 · column 5: type the COVARIANCE of dy4 and dy5 as a decimal.", "Coupon Bond!I115", "7.97353e-08", 0], ["Ω box, row 5 · column 5: type the VARIANCE of dy5 as a decimal.", "Coupon Bond!I116", "1.10756e-07", 0], ["Read ▸ bond price.", "Coupon Bond!G51", "103.30004897", 1], ["Read ▸ Macaulay duration (years).", "Coupon Bond!C55", "4.71917746", 1], ["Read ▸ VaR as a return.", "Coupon Bond!C211", "-0.00352505", 1], ["Read ▸ VaR with μ = 0, if the question ignores the mean.", "Coupon Bond!C212", "-0.00354732", 1]]}, {"n": 13, "t": "1.5-year semiannual T-bond: price, weights, modified-duration VaR", "src": "03_VaR workbook · Bond portfolio", "q": "Par 1,000, 5% coupon paid semiannually, 1.5 years; spots 4%, 5%, 6% (6M, 1Y, 1.5Y); μ(dy) = −0.02, 0.05, −0.01; Ω as given; 99%.", "need": "par, coupon rate, payments a year, maturity, the spot rate for each of the 3 payment dates, μ and Ω of the rate changes.", "how": "CF = 25, 25, 1025 at 6M, 1Y, 1.5Y;  PV_t = CF/(1+y_t/2)^t;  adjusted weight = −w_t·t/(1+y_t/2) (modified duration);  VaR = wᵀμ + z√(wᵀΩw).", "sheets": ["Coupon Bond"], "go": ["fix", "A coupon bond is a portfolio of zeros"], "steps": [["▸ Open the Coupon Bond sheet (link).", "Coupon Bond!B6", "", 0], ["Face value: 1000 — 'par 1,000'.", "Coupon Bond!C8", "1000", 0], ["Coupon: 5 — '5% coupon' per year (in %, number only); the sheet pays 2.5% each half-year.", "Coupon Bond!C9", "5", 0], ["Payments per year: 2 — 'paid semiannually'.", "Coupon Bond!C10", "2", 0], ["Maturity: 1.5 years → 3 half-year cash flows.", "Coupon Bond!C11", "1.5", 0], ["Discounting (▾): 'Discrete'.", "Coupon Bond!C12", "Discrete", 0], ["Adjusted-weight rule (▾): '-t/(1+y) modified' — the class file multiplies each weight by −D_mod.", "Coupon Bond!C13", "-t/(1+y) modified", 0], ["Number held: 1.", "Coupon Bond!C14", "1", 0], ["α: 0.01.", "Coupon Bond!C15", "0.01", 0], ["Horizon: 1.", "Coupon Bond!C16", "1", 0], ["Spot-rate table, payment 1 (6M): 4 (in %, number only).", "Coupon Bond!E21", "4", 0], ["Payment 2 (1Y): 5.", "Coupon Bond!E22", "5", 0], ["Payment 3 (1.5Y): 6.", "Coupon Bond!E23", "6", 0], ["μ box, factor 1 = dy(6M): type its MEAN as a decimal — from the question's 'Mu (y)' column and VaR-Covar matrix (the diagonal is 0.05², 0.07², 0.076²).", "Coupon Bond!D112", "-0.02", 0], ["μ box, factor 2 = dy(1Y): type its MEAN as a decimal (same source).", "Coupon Bond!D113", "0.05", 0], ["μ box, factor 3 = dy(1.5Y): type its MEAN as a decimal (same source).", "Coupon Bond!D114", "-0.01", 0], ["Ω box, row 1 · column 1: type the VARIANCE of dy(6M) as a decimal — from the question's 'Mu (y)' column and VaR-Covar matrix (the diagonal is 0.05², 0.07², 0.076²).", "Coupon Bond!E112", "0.0025", 0], ["Ω box, row 1 · column 2: type the COVARIANCE of dy(6M) and dy(1Y) as a decimal.  Type only on and above the diagonal; the lower half fills itself.", "Coupon Bond!F112", "0.0001", 0], ["Ω box, row 1 · column 3: type the COVARIANCE of dy(6M) and dy(1.5Y) as a decimal.", "Coupon Bond!G112", "0.0002", 0], ["Ω box, row 2 · column 2: type the VARIANCE of dy(1Y) as a decimal.", "Coupon Bond!F113", "0.0049", 0], ["Ω box, row 2 · column 3: type the COVARIANCE of dy(1Y) and dy(1.5Y) as a decimal.", "Coupon Bond!G113", "0.0003", 0], ["Ω box, row 3 · column 3: type the VARIANCE of dy(1.5Y) as a decimal.", "Coupon Bond!G114", "0.005776", 0], ["Read ▸ price = 986.33.", "Coupon Bond!G51", "986.32536466", 1], ["Read ▸ D_mac in half-year periods.", "Coupon Bond!C55", "2.92617551", 1], ["Read ▸ VaR as a return.", "Coupon Bond!C211", "-0.46455565", 1], ["Read ▸ VaR in money = VaR% × price.", "Coupon Bond!C213", "-458.2030221", 1]]}, {"n": 14, "t": "Bonds and stocks from eleven days of data", "src": "Additional question 2", "q": "Eleven days of 1Y and 2Y spot rates and prices of A and B. 20 one-year ZCBs, 20 two-year ZCBs (FV 1,000, annual), 100 A, 100 B. One-day 99% VaR.", "need": "the 11-day table (1Y %, 2Y %, price A, price B, index), the holdings (how many, face value, maturity), and the LAST day's rates and prices.", "how": "Data sheet → μ and Ω of (dy1, dy2, r_A, r_B).  Each ZCB: value = 20 × 1000/(1+y)^T, multiplier −D_mod;  each stock: value = shares × price, multiplier 1.  w = value/W₀ × multiplier;  VaR = wᵀμ + z√(wᵀΩw).", "sheets": ["Data", "Portfolio A"], "go": ["pset", "Additional question 2"], "steps": [["▸ Open the Data sheet (link). The paste block starts at the first row of the yellow table, column C; every column is one series.", "Data!B5", "", 0], ["Delete the old table first: select the whole yellow paste block (C to N, down to the last filled row) and press Delete — otherwise old rows get mixed into the new data.", "Data!C90", "select & Delete", 0], ["Copy the 11 rows of the question's table: 1Y, 2Y, A, B, index (5 columns) — oldest row at the top, numbers only (no dates, no headings) — then click the linked cell and paste. If the source cells hold formulas, use Paste Special ▸ Values (Ctrl+Alt+V, V, Enter).   (11 × 5)", "Data!C90", "paste the table", 0], ["Row 'Becomes a factor via', column of series 1 (1Y spot): choose 'Rate%-dy' — the column holds rates in % (e.g. 7.36), so the factor is the change in the rate as a decimal, (y_t − y_t−1)/100.", "Data!C15", "Rate%-dy", 0], ["Row 'Becomes a factor via', column of series 2 (2Y spot): choose 'Rate%-dy' — the column holds rates in % (e.g. 7.36), so the factor is the change in the rate as a decimal, (y_t − y_t−1)/100.", "Data!D15", "Rate%-dy", 0], ["Row 'Becomes a factor via', column of series 3 (stock A): choose 'Simple return' — the column holds prices and the question works with simple returns (P_t − P_t−1)/P_t−1.", "Data!E15", "Simple return", 0], ["Row 'Becomes a factor via', column of series 4 (stock B): choose 'Simple return' — the column holds prices and the question works with simple returns (P_t − P_t−1)/P_t−1.", "Data!F15", "Simple return", 0], ["Row 'Becomes a factor via', column of series 5 (index): choose 'Simple return' — the column holds prices and the question works with simple returns (P_t − P_t−1)/P_t−1.", "Data!G15", "Simple return", 0], ["Ω divisor (top of the Data sheet): choose 'Sample' — the class answer uses the n − 1 (VAR.S / COVARIANCE.S) covariance.", "Data!C7", "Sample", 0], ["▸ Open Portfolio A (link) — one row per holding, in the yellow holdings table.", "Portfolio A!B6", "", 0], ["Holdings row 1, column 'Name': type 1Y ZCB (label).", "Portfolio A!B10", "1Y ZCB", 0], ["Holdings row 1, column 'Type ▾': choose ZCB.", "Portfolio A!C10", "ZCB", 0], ["Holdings row 1, column 'Quantity': 20 — '20 one-year ZCBs'.", "Portfolio A!D10", "20", 0], ["Holdings row 1, column 'Price / S / FV': 1000 — the face value.", "Portfolio A!E10", "1000", 0], ["Holdings row 1, column 'Maturity T (yrs)': 1 — one year.", "Portfolio A!F10", "1", 0], ["Holdings row 1, column 'y %': 7.36 — the 1Y spot on the LAST day (day 0) of the table (in %, number only).", "Portfolio A!G10", "7.36", 0], ["Holdings row 1, column 'Compounding ▾': choose Annual.", "Portfolio A!H10", "Annual", 0], ["Holdings row 1, column 'Factor # (price or rate)': 1 — this bond moves with Data series 1 (the 1Y rate).", "Portfolio A!K10", "1", 0], ["Holdings row 2, column 'Name': type 2Y ZCB.", "Portfolio A!B11", "2Y ZCB", 0], ["Holdings row 2, column 'Type ▾': choose ZCB.", "Portfolio A!C11", "ZCB", 0], ["Holdings row 2, column 'Quantity': 20.", "Portfolio A!D11", "20", 0], ["Holdings row 2, column 'Price / S / FV': 1000.", "Portfolio A!E11", "1000", 0], ["Holdings row 2, column 'Maturity T (yrs)': 2.", "Portfolio A!F11", "2", 0], ["Holdings row 2, column 'y %': 8.01 — the 2Y spot on the last day.", "Portfolio A!G11", "8.01", 0], ["Holdings row 2, column 'Compounding ▾': choose Annual.", "Portfolio A!H11", "Annual", 0], ["Holdings row 2, column 'Factor # (price or rate)': 2 — Data series 2 (the 2Y rate).", "Portfolio A!K11", "2", 0], ["Holdings row 3, column 'Name': type Stock A.", "Portfolio A!B12", "Stock A", 0], ["Holdings row 3, column 'Type ▾': choose Stock.", "Portfolio A!C12", "Stock", 0], ["Holdings row 3, column 'Quantity': 100 shares.", "Portfolio A!D12", "100", 0], ["Holdings row 3, column 'Price / S / FV': 128 — A's price on the last day.", "Portfolio A!E12", "128", 0], ["Holdings row 3, column 'Factor # (price or rate)': 3 — Data series 3 (A's returns).", "Portfolio A!K12", "3", 0], ["Holdings row 4, column 'Name': type Stock B.", "Portfolio A!B13", "Stock B", 0], ["Holdings row 4, column 'Type ▾': choose Stock.", "Portfolio A!C13", "Stock", 0], ["Holdings row 4, column 'Quantity': 100 shares.", "Portfolio A!D13", "100", 0], ["Holdings row 4, column 'Price / S / FV': 42 — B's price on the last day.", "Portfolio A!E13", "42", 0], ["Holdings row 4, column 'Factor # (price or rate)': 4 — Data series 4.", "Portfolio A!K13", "4", 0], ["Below the holdings, factor block ▸ Source of μ and Ω (▾): 'Data' — pull them from the Data sheet you just filled.", "Portfolio A!C105", "Data", 0], ["α: 0.01 (99%).", "Portfolio A!C132", "0.01", 0], ["Horizon: 1 day.", "Portfolio A!C133", "1", 0], ["Read ▸ VaR as a return: −3.47372%.", "Portfolio A!C154", "-0.03473718", 1], ["Read ▸ VaR in Baht = VaR% × W₀.", "Portfolio A!C156", "-1833.16841533", 1]]}, {"n": 15, "t": "Portfolio of basic assets: a 2-year bond and the SET index", "src": "Example — Portfolio of Basic Assets", "q": "252 days of 1Y and 2Y spot rates (%) and the SET index; a 2-year 3% annual bond (FV 1,000: cash flows 30 and 1,030) priced continuously, plus one unit of the index. VaR at 99% and 95% (1 day) and 99% (3 days).", "need": "the 252-day table (1Y %, 2Y %, SET index), the bond's cash flows by year, the last day's spot rates and index level.", "how": "Split the coupon bond into one zero-coupon bond per cash flow: 30 at year 1 (1Y rate) and 1,030 at year 2 (2Y rate), each continuous (D_mod = T). The index is a stock. Data sheet → μ and Ω; VaR = wᵀμ·H + z√(wᵀΩw)·√H.", "sheets": ["Data", "Portfolio A"], "go": ["fix", "A portfolio of basic assets"], "steps": [["▸ Open the Data sheet (link). The paste block starts at the first row of the yellow table, column C; every column is one series.", "Data!B5", "", 0], ["Delete the old table first: select the whole yellow paste block (C to N, down to the last filled row) and press Delete — otherwise old rows get mixed into the new data.", "Data!C90", "select & Delete", 0], ["Copy the 252 rows of 1Y %, 2Y % and the SET index (3 columns, oldest first) — oldest row at the top, numbers only (no dates, no headings) — then click the linked cell and paste. If the source cells hold formulas, use Paste Special ▸ Values (Ctrl+Alt+V, V, Enter).   (252 × 3)", "Data!C90", "paste the table", 0], ["Row 'Becomes a factor via', column of series 1 (1Y spot): choose 'Rate%-dy' — the column holds rates in % (e.g. 7.36), so the factor is the change in the rate as a decimal, (y_t − y_t−1)/100.", "Data!C15", "Rate%-dy", 0], ["Row 'Becomes a factor via', column of series 2 (2Y spot): choose 'Rate%-dy' — the column holds rates in % (e.g. 7.36), so the factor is the change in the rate as a decimal, (y_t − y_t−1)/100.", "Data!D15", "Rate%-dy", 0], ["Row 'Becomes a factor via', column of series 3 (SET index): choose 'Log return' — the column holds prices and the question takes LN(P_t / P_t−1).", "Data!E15", "Log return", 0], ["Ω divisor (top of the Data sheet): choose 'Sample' — the class answer uses the n − 1 (VAR.S / COVARIANCE.S) covariance.", "Data!C7", "Sample", 0], ["▸ Open Portfolio A (link). The coupon bond goes in as TWO rows — one zero-coupon bond per cash flow.", "Portfolio A!B6", "", 0], ["Holdings row 1, column 'Name': type Bond CF1.", "Portfolio A!B10", "Bond CF1", 0], ["Holdings row 1, column 'Type ▾': choose ZCB — the year-1 coupon behaves like a 1-year zero.", "Portfolio A!C10", "ZCB", 0], ["Holdings row 1, column 'Quantity': 1.", "Portfolio A!D10", "1", 0], ["Holdings row 1, column 'Price / S / FV': 30 — the year-1 cash flow (3% × 1,000).", "Portfolio A!E10", "30", 0], ["Holdings row 1, column 'Maturity T (yrs)': 1 — paid in year 1.", "Portfolio A!F10", "1", 0], ["Holdings row 1, column 'y %': 1.5106 — the 1Y spot on the last day (in %, number only).", "Portfolio A!G10", "1.5106", 0], ["Holdings row 1, column 'Compounding ▾': choose Continuous — the class file discounts with EXP(−yT).", "Portfolio A!H10", "Continuous", 0], ["Holdings row 1, column 'Factor # (price or rate)': 1 — moves with the 1Y rate (Data series 1).", "Portfolio A!K10", "1", 0], ["Holdings row 2, column 'Name': type Bond CF2.", "Portfolio A!B11", "Bond CF2", 0], ["Holdings row 2, column 'Type ▾': choose ZCB.", "Portfolio A!C11", "ZCB", 0], ["Holdings row 2, column 'Quantity': 1.", "Portfolio A!D11", "1", 0], ["Holdings row 2, column 'Price / S / FV': 1030 — the last coupon 30 plus the face value 1,000.", "Portfolio A!E11", "1030", 0], ["Holdings row 2, column 'Maturity T (yrs)': 2 — paid in year 2.", "Portfolio A!F11", "2", 0], ["Holdings row 2, column 'y %': 1.6213 — the 2Y spot on the last day.", "Portfolio A!G11", "1.6213", 0], ["Holdings row 2, column 'Compounding ▾': choose Continuous.", "Portfolio A!H11", "Continuous", 0], ["Holdings row 2, column 'Factor # (price or rate)': 2 — the 2Y rate (Data series 2).", "Portfolio A!K11", "2", 0], ["Holdings row 3, column 'Name': type SET.", "Portfolio A!B12", "SET", 0], ["Holdings row 3, column 'Type ▾': choose Stock — one unit of the index behaves like a share.", "Portfolio A!C12", "Stock", 0], ["Holdings row 3, column 'Quantity': 1 unit.", "Portfolio A!D12", "1", 0], ["Holdings row 3, column 'Price / S / FV': 1381.41 — the index on the last day.", "Portfolio A!E12", "1381.41", 0], ["Holdings row 3, column 'Factor # (price or rate)': 3 — the SET returns (Data series 3).", "Portfolio A!K12", "3", 0], ["Holdings row 4: select the whole row (Name to Custom mult 2) and press Delete, so no old holding is left in the portfolio.", "Portfolio A!B13", "select & Delete", 0], ["Factor block ▸ Source of μ and Ω (▾): 'Data'.", "Portfolio A!C105", "Data", 0], ["α: 0.01 (99%).", "Portfolio A!C132", "0.01", 0], ["Horizon: 3 — the 3-day figure is on the 'T-period' line; the 1-day figures are still shown.", "Portfolio A!C133", "3", 0], ["Read ▸ VaR 99%, 1 day.", "Portfolio A!C154", "-0.01452077", 1], ["Read ▸ VaR 95%, 1 day — from the small 'other confidence levels' table next to the answers.", "Portfolio A!M154", "-0.01034417", 1], ["Read ▸ VaR 99%, 3 days = 3μ_P + z·σ_P·√3.", "Portfolio A!C158", "-0.02548488", 1]]}, {"n": 16, "t": "Two stocks plus an index put — option pricing model", "src": "Additional question 3 (a)", "q": "5 shares of A, 10 of B and one long put on the index (K 1,050, T 1 year). One-day 99% VaR by the Greeks.", "need": "the same 11-day table as additional question 2, the holdings, the strike and life of the put, and the last day's 1Y rate and index level.", "how": "Put by Black-Scholes: price P, Delta, Rho.  Put's weights: w·(Delta·S/P) on the index return and w·(Rho/P) on dy.  Stocks: weight on their own return.  VaR = wᵀμ + z√(wᵀΩw).", "sheets": ["Data", "Portfolio B"], "go": ["pset", "Additional question 3"], "steps": [["▸ Open the Data sheet (link). The paste block starts at the first row of the yellow table, column C; every column is one series.", "Data!B5", "", 0], ["Delete the old table first: select the whole yellow paste block (C to N, down to the last filled row) and press Delete — otherwise old rows get mixed into the new data.", "Data!C90", "select & Delete", 0], ["Copy the 11 rows of the question's table: 1Y, 2Y, A, B, index (5 columns) — oldest row at the top, numbers only (no dates, no headings) — then click the linked cell and paste. If the source cells hold formulas, use Paste Special ▸ Values (Ctrl+Alt+V, V, Enter).   (11 × 5)", "Data!C90", "paste the table", 0], ["Row 'Becomes a factor via', column of series 1 (1Y spot): choose 'Rate%-dy' — the column holds rates in % (e.g. 7.36), so the factor is the change in the rate as a decimal, (y_t − y_t−1)/100.", "Data!C15", "Rate%-dy", 0], ["Row 'Becomes a factor via', column of series 2 (2Y spot): choose 'Rate%-dy' — the column holds rates in % (e.g. 7.36), so the factor is the change in the rate as a decimal, (y_t − y_t−1)/100.", "Data!D15", "Rate%-dy", 0], ["Row 'Becomes a factor via', column of series 3 (stock A): choose 'Simple return' — the column holds prices and the question works with simple returns (P_t − P_t−1)/P_t−1.", "Data!E15", "Simple return", 0], ["Row 'Becomes a factor via', column of series 4 (stock B): choose 'Simple return' — the column holds prices and the question works with simple returns (P_t − P_t−1)/P_t−1.", "Data!F15", "Simple return", 0], ["Row 'Becomes a factor via', column of series 5 (index): choose 'Simple return' — the column holds prices and the question works with simple returns (P_t − P_t−1)/P_t−1.", "Data!G15", "Simple return", 0], ["Ω divisor (top of the Data sheet): choose 'Sample' — the class answer uses the n − 1 (VAR.S / COVARIANCE.S) covariance.", "Data!C7", "Sample", 0], ["▸ Open Portfolio B (link) — one row per holding.", "Portfolio B!B6", "", 0], ["Holdings row 1, column 'Name': type Stock A.", "Portfolio B!B10", "Stock A", 0], ["Holdings row 1, column 'Type ▾': choose Stock.", "Portfolio B!C10", "Stock", 0], ["Holdings row 1, column 'Quantity': 5 — '5 shares of A'.", "Portfolio B!D10", "5", 0], ["Holdings row 1, column 'Price / S / FV': 128 — A's last price.", "Portfolio B!E10", "128", 0], ["Holdings row 1, column 'Factor # (price or rate)': 3 — A's returns are Data series 3.", "Portfolio B!K10", "3", 0], ["Holdings row 2, column 'Name': type Stock B.", "Portfolio B!B11", "Stock B", 0], ["Holdings row 2, column 'Type ▾': choose Stock.", "Portfolio B!C11", "Stock", 0], ["Holdings row 2, column 'Quantity': 10 — '10 shares of B'.", "Portfolio B!D11", "10", 0], ["Holdings row 2, column 'Price / S / FV': 42 — B's last price.", "Portfolio B!E11", "42", 0], ["Holdings row 2, column 'Factor # (price or rate)': 4 — Data series 4.", "Portfolio B!K11", "4", 0], ["Holdings row 3, column 'Name': type Index put.", "Portfolio B!B12", "Index put", 0], ["Holdings row 3, column 'Type ▾': choose 'Put (BSM)' — part (a) values the put with Black-Scholes (the option pricing model).", "Portfolio B!C12", "Put (BSM)", 0], ["Holdings row 3, column 'Quantity': 1 — one put contract.", "Portfolio B!D12", "1", 0], ["Holdings row 3, column 'Price / S / FV': 1071.37 — S = the index level on the last day.", "Portfolio B!E12", "1071.37", 0], ["Holdings row 3, column 'Maturity T (yrs)': 1 — one year to expiry.", "Portfolio B!F12", "1", 0], ["Holdings row 3, column 'y %': 7.36 — the risk-free rate = the last 1Y spot (in %, number only).", "Portfolio B!G12", "7.36", 0], ["Holdings row 3, column 'Strike K': 1050 — the strike.", "Portfolio B!I12", "1050", 0], ["Holdings row 3, column 'σ annual': leave the formula =INDEX(Data…) — it takes the index's daily SD from the Data sheet × √252. (Or type a σ if the question gives one.)", "Portfolio B!J12", "σ from Data", 0], ["Holdings row 3, column 'Factor # (price or rate)': 5 — the put's underlying is the index, Data series 5.", "Portfolio B!K12", "5", 0], ["Holdings row 3, column 'Factor # (dy)': 1 — its interest-rate factor dy is the 1Y rate, Data series 1.", "Portfolio B!L12", "1", 0], ["Factor block ▸ Source of μ and Ω (▾): 'Data'.", "Portfolio B!C105", "Data", 0], ["α: 0.01.", "Portfolio B!C132", "0.01", 0], ["Horizon: 1 day.", "Portfolio B!C133", "1", 0], ["Read ▸ VaR as a return: −10.74739%.", "Portfolio B!C154", "-0.10747392", 1]]}, {"n": 17, "t": "The same portfolio — building-block approach", "src": "Additional question 3 (b)", "q": "As (a), but value the put with a one-step binomial tree.", "need": "everything from part (a).", "how": "The put = Δ index units + B in bonds (one-step tree with u = e^σ − 1, d = e^−σ − 1).  Weights: ΔS/P on the index, −(B/P)·T/(1+y) on dy.", "sheets": ["Data", "Portfolio B"], "go": ["pset", "Additional question 3"], "steps": [["▸ Open the Data sheet (link). The paste block starts at the first row of the yellow table, column C; every column is one series.", "Data!B5", "", 0], ["Delete the old table first: select the whole yellow paste block (C to N, down to the last filled row) and press Delete — otherwise old rows get mixed into the new data.", "Data!C90", "select & Delete", 0], ["Copy the same 11-row table as part (a) — oldest row at the top, numbers only (no dates, no headings) — then click the linked cell and paste. If the source cells hold formulas, use Paste Special ▸ Values (Ctrl+Alt+V, V, Enter).   (11 × 5)", "Data!C90", "paste the table", 0], ["Row 'Becomes a factor via', column of series 1 (1Y spot): choose 'Rate%-dy' — the column holds rates in % (e.g. 7.36), so the factor is the change in the rate as a decimal, (y_t − y_t−1)/100.", "Data!C15", "Rate%-dy", 0], ["Row 'Becomes a factor via', column of series 2 (2Y spot): choose 'Rate%-dy' — the column holds rates in % (e.g. 7.36), so the factor is the change in the rate as a decimal, (y_t − y_t−1)/100.", "Data!D15", "Rate%-dy", 0], ["Row 'Becomes a factor via', column of series 3 (stock A): choose 'Simple return' — the column holds prices and the question works with simple returns (P_t − P_t−1)/P_t−1.", "Data!E15", "Simple return", 0], ["Row 'Becomes a factor via', column of series 4 (stock B): choose 'Simple return' — the column holds prices and the question works with simple returns (P_t − P_t−1)/P_t−1.", "Data!F15", "Simple return", 0], ["Row 'Becomes a factor via', column of series 5 (index): choose 'Simple return' — the column holds prices and the question works with simple returns (P_t − P_t−1)/P_t−1.", "Data!G15", "Simple return", 0], ["Ω divisor (top of the Data sheet): choose 'Sample' — the class answer uses the n − 1 (VAR.S / COVARIANCE.S) covariance.", "Data!C7", "Sample", 0], ["▸ Open Portfolio B (link) and fill it exactly as in part (a) (the steps above for (a)); then change one cell:", "Portfolio B!B6", "", 0], ["Holdings row 1, column 'Name': type Stock A.", "Portfolio B!B10", "Stock A", 0], ["Holdings row 1, column 'Type ▾': choose Stock.", "Portfolio B!C10", "Stock", 0], ["Holdings row 1, column 'Quantity': 5 — '5 shares of A'.", "Portfolio B!D10", "5", 0], ["Holdings row 1, column 'Price / S / FV': 128 — A's last price.", "Portfolio B!E10", "128", 0], ["Holdings row 1, column 'Factor # (price or rate)': 3 — A's returns are Data series 3.", "Portfolio B!K10", "3", 0], ["Holdings row 2, column 'Name': type Stock B.", "Portfolio B!B11", "Stock B", 0], ["Holdings row 2, column 'Type ▾': choose Stock.", "Portfolio B!C11", "Stock", 0], ["Holdings row 2, column 'Quantity': 10 — '10 shares of B'.", "Portfolio B!D11", "10", 0], ["Holdings row 2, column 'Price / S / FV': 42 — B's last price.", "Portfolio B!E11", "42", 0], ["Holdings row 2, column 'Factor # (price or rate)': 4 — Data series 4.", "Portfolio B!K11", "4", 0], ["Holdings row 3, column 'Name': type Index put.", "Portfolio B!B12", "Index put", 0], ["Holdings row 3, column 'Type ▾': choose 'Put (BSM)' — part (a) values the put with Black-Scholes (the option pricing model).", "Portfolio B!C12", "Put (BSM)", 0], ["Holdings row 3, column 'Quantity': 1 — one put contract.", "Portfolio B!D12", "1", 0], ["Holdings row 3, column 'Price / S / FV': 1071.37 — S = the index level on the last day.", "Portfolio B!E12", "1071.37", 0], ["Holdings row 3, column 'Maturity T (yrs)': 1 — one year to expiry.", "Portfolio B!F12", "1", 0], ["Holdings row 3, column 'y %': 7.36 — the risk-free rate = the last 1Y spot (in %, number only).", "Portfolio B!G12", "7.36", 0], ["Holdings row 3, column 'Strike K': 1050 — the strike.", "Portfolio B!I12", "1050", 0], ["Holdings row 3, column 'σ annual': leave the formula =INDEX(Data…) — it takes the index's daily SD from the Data sheet × √252. (Or type a σ if the question gives one.)", "Portfolio B!J12", "σ from Data", 0], ["Holdings row 3, column 'Factor # (price or rate)': 5 — the put's underlying is the index, Data series 5.", "Portfolio B!K12", "5", 0], ["Holdings row 3, column 'Factor # (dy)': 1 — its interest-rate factor dy is the 1Y rate, Data series 1.", "Portfolio B!L12", "1", 0], ["Factor block ▸ Source of μ and Ω (▾): 'Data'.", "Portfolio B!C105", "Data", 0], ["α: 0.01.", "Portfolio B!C132", "0.01", 0], ["Horizon: 1 day.", "Portfolio B!C133", "1", 0], ["Holdings row 3, 'Type ▾': change it to 'Put (binomial)' — nothing else changes.", "Portfolio B!C12", "Put (binomial)", 0], ["Read ▸ VaR as a return: −10.74235%.", "Portfolio B!C154", "-0.1074235", 1]]}, {"n": 18, "t": "ATM call and put: price, Greeks, weights and VaR", "src": "Moderately difficult 2 · VaR of Call and Put Options workbook", "q": "S = K = 1,382.41, y = 1.510592%, σ = 13.269837%, T = 1. Price, Rho, the weights (check w_rS − w_dy/T = 1), and each option's one-day 99% VaR.", "need": "S, K, y, σ (annual), T, and μ and Ω of the daily stock return r_S and rate change dy (from the class data).", "how": "BSM price, Delta, Rho;  w_rS = Delta·S/C,  w_dy = Rho/C;  VaR = wᵀμ + z√(wᵀΩw).", "sheets": ["Option BSM"], "go": ["exam", "Moderately difficult · 2"], "steps": [["▸ Open the Option BSM sheet (link).", "Option BSM!B6", "", 0], ["Stock price S: 1382.41 (the last price in the data).", "Option BSM!C8", "1382.41", 0], ["Strike K: 1382.41 — at the money, K = S.", "Option BSM!C9", "1382.41", 0], ["Risk-free y: 1.510592% as a decimal → 0.01510592.", "Option BSM!C10", "0.01510592", 0], ["σ: the ANNUAL volatility as a decimal, 0.1327 (= daily SD × √252 from the data).", "Option BSM!C11", "0.13269837", 0], ["T: 1 year.", "Option BSM!C12", "1", 0], ["σ, y and T come from (▾): 'As typed above' — they are already annual and in years.", "Option BSM!C16", "As typed above", 0], ["Position A type (▾): Call.", "Option BSM!C109", "Call", 0], ["Position B type (▾): Put.", "Option BSM!C190", "Put", 0], ["μ box, factor 1 = r_S (daily stock return): type its MEAN as a decimal — from the class file's averages and covariance of the daily data.", "Option BSM!D102", "-0.00045969", 0], ["μ box, factor 2 = dy (daily change of the 1Y rate): type its MEAN as a decimal (same source).", "Option BSM!D103", "-2.00767e-05", 0], ["Ω box, row 1 · column 1: type the VARIANCE of r_S (daily stock return) as a decimal — from the class file's averages and covariance of the daily data.", "Option BSM!E102", "6.98764e-05", 0], ["Ω box, row 1 · column 2: type the COVARIANCE of r_S (daily stock return) and dy (daily change of the 1Y rate) as a decimal.  Type only on and above the diagonal; the lower half fills itself.", "Option BSM!F102", "6.68291e-08", 0], ["Ω box, row 2 · column 2: type the VARIANCE of dy (daily change of the 1Y rate) as a decimal.", "Option BSM!F103", "1.87956e-08", 0], ["Read ▸ call price.", "Option BSM!C37", "83.41343163", 1], ["Read ▸ Rho of the call.", "Option BSM!C41", "706.6291939", 1], ["Read ▸ call weight on r_S = Delta·S/C.", "Option BSM!C118", "9.47140778", 1], ["Read ▸ call weight on dy = Rho/C (check: w_rS − w_dy/T = 1).", "Option BSM!C119", "8.47140778", 1], ["Read ▸ VaR of the call (Position A answers).", "Option BSM!C132", "-0.18888641", 1], ["Read ▸ VaR of the put (Position B answers).", "Option BSM!C213", "-0.17942957", 1]]}, {"n": 19, "t": "ATM 3-month call and put, in 3-month periods — the Greeks approach", "src": "Lecture 4 practice · Exercise_ans workbook", "q": "S = K = 258.57; daily log returns of A (variance 0.00040319) and the latest 3M rate 1.777315%; T = 3 months. Prices and one-day 99% VaR of both options.", "need": "the last price of A, the daily variance of its returns, the latest 3M rate, the option life, μ and Ω of (r_S, dy).", "how": "Work in 3-month periods as the answer sheet: σ_3M = σ_daily·√(252×0.25), y_3M = y×0.25, T = 1.  Then BSM → Delta, Rho → w = [Delta·S/C ; Rho/C] → VaR.", "sheets": ["Option BSM"], "go": ["pset", "Lecture 4 practice"], "steps": [["▸ Open the Option BSM sheet (link).", "Option BSM!B6", "", 0], ["Stock price S: 258.57 — A's last price.", "Option BSM!C8", "258.57", 0], ["Strike K: 258.57 — at the money.", "Option BSM!C9", "258.57", 0], ["σ, y and T come from (▾): 'Build — in periods (T = 1)' — the answer sheet measures time in 3-month periods.", "Option BSM!C16", "Build — in periods (T = 1)", 0], ["Builder ▸ σ given: the DAILY SD = √0.00040319 = 0.02008 (the square root of the variance of A's daily returns).", "Option BSM!C17", "0.02007958", 0], ["Builder ▸ that σ is (▾): 'Daily'.", "Option BSM!C18", "Daily", 0], ["Builder ▸ rate: 1.777315 — the latest 3M spot (in %, number only, per year).", "Option BSM!C19", "1.777315", 0], ["Builder ▸ option life in months: 3.", "Option BSM!C20", "3", 0], ["Position A (▾): Call.", "Option BSM!C109", "Call", 0], ["Position B (▾): Put.", "Option BSM!C190", "Put", 0], ["μ box, factor 1 = r_S (A's daily return): type its MEAN as a decimal — from the data: AVERAGE, VAR and COVAR of the two change columns.", "Option BSM!D102", "0.00384261", 0], ["μ box, factor 2 = dy (daily change of the 3M rate): type its MEAN as a decimal (same source).", "Option BSM!D103", "-1.81798e-05", 0], ["Ω box, row 1 · column 1: type the VARIANCE of r_S (A's daily return) as a decimal — from the data: AVERAGE, VAR and COVAR of the two change columns.", "Option BSM!E102", "0.00040319", 0], ["Ω box, row 1 · column 2: type the COVARIANCE of r_S (A's daily return) and dy (daily change of the 3M rate) as a decimal.  Type only on and above the diagonal; the lower half fills itself.", "Option BSM!F102", "-9.55259e-08", 0], ["Ω box, row 2 · column 2: type the VARIANCE of dy (daily change of the 3M rate) as a decimal.", "Option BSM!F103", "4.34465e-08", 0], ["Read ▸ call price.", "Option BSM!C37", "16.96616535", 1], ["Read ▸ put price.", "Option BSM!C38", "15.81981317", 1], ["Read ▸ call weight on r_S.", "Option BSM!C118", "8.27291896", 1], ["Read ▸ call weight on dy (period units, T = 1).", "Option BSM!C119", "7.27291896", 1], ["Read ▸ VaR of the call.", "Option BSM!C132", "-0.35472344", 1], ["Read ▸ VaR of the put — the put is riskier.", "Option BSM!C213", "-0.37753586", 1]]}, {"n": 20, "t": "The same 3-month put — equivalent asset (building block)", "src": "Lecture 4 practice · Exercise_ans workbook", "q": "Construct the equivalent asset for the ATM 3-month put and find its one-day 99% VaR.", "need": "the same inputs as the Greeks version: S, K, daily σ, the 3M rate, life, μ and Ω.", "how": "One-step tree in 3-month periods: u = e^σ − 1, d = e^−σ − 1;  Δ = (P_u − P_d)/(S(u − d));  B = bond part;  put = ΔS + B;  w = [ΔS/P ; −(B/P)·T].", "sheets": ["Option Binomial"], "go": ["pset", "Lecture 4 practice"], "steps": [["▸ Open the Option Binomial sheet (link).", "Option Binomial!B6", "", 0], ["S₀: 258.57.", "Option Binomial!C8", "258.57", 0], ["K: 258.57.", "Option Binomial!C9", "258.57", 0], ["Option type (▾): Put.", "Option Binomial!C13", "Put", 0], ["Bond duration term (▾): 'T (continuous)' — the answer sheet multiplies the bond weight by −T with T = 1.", "Option Binomial!C14", "T (continuous)", 0], ["σ, y and T come from (▾): 'Build — in periods (T = 1)'.", "Option Binomial!C17", "Build — in periods (T = 1)", 0], ["Builder ▸ σ given: the daily SD √0.00040319 = 0.02008.", "Option Binomial!C18", "0.02007958", 0], ["Builder ▸ that σ is (▾): 'Daily'.", "Option Binomial!C19", "Daily", 0], ["Builder ▸ rate: 1.777315 (in %, number only).", "Option Binomial!C20", "1.777315", 0], ["Builder ▸ life in months: 3.", "Option Binomial!C21", "3", 0], ["α: 0.01.", "Option Binomial!C79", "0.01", 0], ["μ box, factor 1 = r_S (A's daily return): type its MEAN as a decimal — the same μ and Ω as the Greeks version.", "Option Binomial!D74", "0.00384261", 0], ["μ box, factor 2 = dy (daily change of the 3M rate): type its MEAN as a decimal (same source).", "Option Binomial!D75", "-1.81798e-05", 0], ["Ω box, row 1 · column 1: type the VARIANCE of r_S (A's daily return) as a decimal — the same μ and Ω as the Greeks version.", "Option Binomial!E74", "0.00040319", 0], ["Ω box, row 1 · column 2: type the COVARIANCE of r_S (A's daily return) and dy (daily change of the 3M rate) as a decimal.  Type only on and above the diagonal; the lower half fills itself.", "Option Binomial!F74", "-9.55259e-08", 0], ["Ω box, row 2 · column 2: type the VARIANCE of dy (daily change of the 3M rate) as a decimal.", "Option Binomial!F75", "4.34465e-08", 0], ["Read ▸ Δ: hold −0.46024 shares (short).", "Option Binomial!C34", "-0.46023995", 1], ["Read ▸ B: lend 138.95 in bonds.", "Option Binomial!C36", "138.94836762", 1], ["Read ▸ put value = ΔS + B.", "Option Binomial!C37", "19.94412279", 1], ["Read ▸ weight on dy = −(B/P)·T.", "Option Binomial!C46", "-6.96688288", 1], ["Read ▸ VaR of the put.", "Option Binomial!C91", "-0.30147062", 1]]}, {"n": 21, "t": "Digital (cash-or-nothing) call and put: price, Delta, Rho", "src": "Lecture 4 exercise · Exercise_ans workbook", "q": "S = K = 120, y = 1.25%, σ = 25%, T = 3 months.", "need": "S, K, y, σ and T (in years: 3 months = 0.25).", "how": "Digital call = e^−yT·N(d₂);  Delta = e^−yT·φ(d₂)/(Sσ√T);  Rho = −T·price + e^−yT·φ(d₂)·√T/σ.", "sheets": ["Option BSM"], "go": ["pset", "Lecture 4 practice"], "steps": [["▸ Open the Option BSM sheet at the digital-options section (link); the inputs are at the top of the sheet.", "Option BSM!B49", "", 0], ["S: 120.", "Option BSM!C8", "120", 0], ["K: 120.", "Option BSM!C9", "120", 0], ["y: 1.25% as a decimal → 0.0125.", "Option BSM!C10", "0.0125", 0], ["σ: 25% as a decimal → 0.25.", "Option BSM!C11", "0.25", 0], ["T: 0.25 — 3 months in years.", "Option BSM!C12", "0.25", 0], ["σ, y and T come from (▾): 'As typed above'.", "Option BSM!C16", "As typed above", 0], ["Read ▸ digital call price.", "Option BSM!C50", "0.48352978", 1], ["Read ▸ digital call Delta (uses φ(d₂)).", "Option BSM!C52", "0.02649453", 1], ["Read ▸ digital call Rho.", "Option BSM!C53", "0.67395355", 1], ["Read ▸ digital put Rho.", "Option BSM!C55", "-0.92317352", 1]]}, {"n": 22, "t": "The deck's one-step binomial call", "src": "Deck example · Binomial Option Pricing workbook", "q": "S₀ = K = 1,000, σ = 10%, y = 3%, T = 1.", "need": "S₀, K, σ, y and T.", "how": "u = e^σ − 1, d = e^−σ − 1;  Δ = (C_u − C_d)/(S(u − d));  B = (C_d(1+u) − C_u(1+d))/((1+y)(u − d));  C = ΔS + B.", "sheets": ["Option Binomial"], "go": ["opt", "The building block route"], "steps": [["▸ Open the Option Binomial sheet (link).", "Option Binomial!B6", "", 0], ["S₀: 1000.", "Option Binomial!C8", "1000", 0], ["K: 1000.", "Option Binomial!C9", "1000", 0], ["σ: 10% as a decimal → 0.10.", "Option Binomial!C10", "0.1", 0], ["y: 3% as a decimal → 0.03.", "Option Binomial!C11", "0.03", 0], ["T: 1.", "Option Binomial!C12", "1", 0], ["Option type (▾): Call.", "Option Binomial!C13", "Call", 0], ["Bond duration term (▾): 'T/(1+y) (formula sheet)'.", "Option Binomial!C14", "T/(1+y) (formula sheet)", 0], ["σ, y and T come from (▾): 'As typed above'.", "Option Binomial!C17", "As typed above", 0], ["Read ▸ Δ: buy 0.525 shares.", "Option Binomial!C34", "0.52497919", 1], ["Read ▸ B: borrow 461.19.", "Option Binomial!C36", "-461.18525487", 1], ["Read ▸ call value = ΔS + B = 63.79.", "Option Binomial!C37", "63.7939326", 1]]}, {"n": 23, "t": "Delta and rho hedge of one long call", "src": "Lecture 4 · managing the risk", "q": "One long ATM call, S = K = 1,382.41, y = 1.510592%, σ = 13.2698%, T = 1.", "need": "the option inputs and how many options are held.", "how": "Delta hedge: hold −n·Delta shares.  Rho hedge: hold n·Rho/(T·e^−yT) zero-coupon bonds of face 1.", "sheets": ["Hedge"], "go": ["opt", "Managing the risk"], "steps": [["▸ Open the Hedge sheet, section 3 (link).", "Hedge!B201", "", 0], ["Option type (▾): Call.", "Hedge!C204", "Call", 0], ["S: 1382.41.", "Hedge!C205", "1382.41", 0], ["K: 1382.41.", "Hedge!C206", "1382.41", 0], ["y as a decimal: 0.01510592.", "Hedge!C207", "0.01510592", 0], ["σ as a decimal: 0.13269837.", "Hedge!C208", "0.13269837", 0], ["T: 1.", "Hedge!C209", "1", 0], ["Options held n: 1 (long; type a negative number for a short position).", "Hedge!C210", "1", 0], ["Read ▸ shares to hold: −0.5715 (sell 0.5715 shares).", "Hedge!C217", "-0.5714966", 1], ["Read ▸ zero-coupon bonds to hold for the rho hedge.", "Hedge!C218", "717.38450822", 1]]}, {"n": 24, "t": "A one-year forward as a call minus a put", "src": "Difficult 2 · Call-Put Portfolio is Forward Contract", "q": "S = 118, delivery price 120, σ = 30%, y = 2%, T = 1. Value and weights; why do they differ by 1?", "need": "S₀, the delivery price K, σ, y and T.", "how": "Long forward = long call − short put (same K, T):  V_F = C − P = S − K·e^−yT;  weights w_rS = S/V_F, w_dy = T·K·e^−yT/V_F.", "sheets": ["Forward"], "go": ["fut", "The forward example"], "steps": [["▸ Open the Forward sheet (link).", "Forward!B6", "", 0], ["S₀: 118.", "Forward!C8", "118", 0], ["Delivery price K: 120.", "Forward!C9", "120", 0], ["σ as a decimal: 0.30.", "Forward!C10", "0.3", 0], ["y as a decimal: 0.02.", "Forward!C11", "0.02", 0], ["T: 1 year.", "Forward!C12", "1", 0], ["Read ▸ call price.", "Forward!C18", "14.23621889", 1], ["Read ▸ put price.", "Forward!C19", "13.86005968", 1], ["Read ▸ forward value V_F = C − P.", "Forward!C24", "0.3761592", 1], ["Read ▸ weight on r_S.", "Forward!C26", "313.69696394", 1], ["Read ▸ weight on dy — exactly 1 less than w_rS, because V_F = S − K·e^−yT.", "Forward!C27", "312.69696394", 1]]}, {"n": 25, "t": "Futures on an asset: cost of carry and money weights", "src": "Deck example", "q": "S₀ = 100, y = 3% p.a., 6 months to delivery.", "need": "spot price, the rate to delivery, time to delivery in years, number of contracts.", "how": "F₀ = S₀·e^(y·T);  money weights: +S₀ on r_S and −T·S₀ on dy (plus a financing leg).", "sheets": ["Futures"], "go": ["fut", "Cost of carry"], "steps": [["▸ Open the Futures sheet, section 1 (link).", "Futures!B6", "", 0], ["S₀: 100.", "Futures!C8", "100", 0], ["y_T as a decimal: 0.03.", "Futures!C9", "0.03", 0], ["T: 0.5 — 6 months in years.", "Futures!C10", "0.5", 0], ["Contracts: 1.", "Futures!C11", "1", 0], ["Read ▸ futures price = 100·e^0.015.", "Futures!C14", "101.5113065", 1], ["Read ▸ money weight on r_S.", "Futures!C15", "100", 1]]}, {"n": 26, "t": "Futures on a zero-coupon bond", "src": "Deck example", "q": "T = 1, N = 0.5, y_T = 5%, y_(T+N) = 5.2%, face 1.", "need": "delivery date T, the bond's life N after delivery, the spot rates to T and to T+N, face value.", "how": "F = X·e^(y_T·T − y_(T+N)·(T+N));  forward rate f = (y_(T+N)(T+N) − y_T·T)/N;  weights on dy_T and dy_(T+N).", "sheets": ["Futures"], "go": ["fut", "Zero-coupon bond futures"], "steps": [["▸ Open the Futures sheet, section 2 (link).", "Futures!B87", "", 0], ["Face X: 1.", "Futures!C89", "1", 0], ["T (delivery, years): 1.", "Futures!C90", "1", 0], ["N (bond life after delivery, years): 0.5.", "Futures!C91", "0.5", 0], ["y_T as a decimal: 0.05.", "Futures!C92", "0.05", 0], ["y_(T+N) as a decimal: 0.052.", "Futures!C93", "0.052", 0], ["Contracts: 1.", "Futures!C94", "1", 0], ["Read ▸ futures price.", "Futures!C98", "0.972388", 1], ["Read ▸ forward rate 5.6%.", "Futures!C99", "0.056", 1], ["Read ▸ money weight on dy_(T+N) = −(T+N)·price.", "Futures!C101", "-1.38744664", 1]]}, {"n": 27, "t": "Coupon-bond futures: is a quote of 121.42 possible?", "src": "Difficult 1", "q": "Delivery in 1 year (2 half-year periods); post-delivery cash flows 2, 2, 2, 102; spots 2%, 2.5%, 3%, 3.5% p.a.; y_T = 1.5%.", "need": "delivery date in periods, periods a year, the spot rate to delivery, each cash flow after delivery and its spot rate.", "how": "F = Σ PV(cash flows after delivery) grown to T at y_T.", "sheets": ["Futures"], "go": ["fut", "Coupon bond futures"], "steps": [["▸ Open the Futures sheet, section 3 (link).", "Futures!B179", "", 0], ["Delivery date T in periods: 2 — 1 year = 2 half-years.", "Futures!C181", "2", 0], ["Periods per year: 2.", "Futures!C182", "2", 0], ["Spot rate to delivery y_T: 1.5 (in %, number only).", "Futures!C183", "1.5", 0], ["Cash-flow table row 1, cash flow: 2.", "Futures!D186", "2", 0], ["Row 1, spot rate for that date: 2.0 (in %, number only).", "Futures!E186", "2", 0], ["Cash-flow table row 2, cash flow: 2.", "Futures!D187", "2", 0], ["Row 2, spot rate for that date: 2.5 (in %, number only).", "Futures!E187", "2.5", 0], ["Cash-flow table row 3, cash flow: 2.", "Futures!D188", "2", 0], ["Row 3, spot rate for that date: 3.0 (in %, number only).", "Futures!E188", "3", 0], ["Cash-flow table row 4, cash flow: 102.", "Futures!D189", "102", 0], ["Row 4, spot rate for that date: 3.5 (in %, number only).", "Futures!E189", "3.5", 0], ["Rows 5 onward of the cash-flow table: select them and press Delete, so no old cash flows remain.", "Futures!D190", "select & Delete", 0], ["Read ▸ futures price.", "Futures!C210", "99.0059", 1]]}, {"n": 28, "t": "The 5-year 6% government bond: price and VaR", "src": "Lecture 5 practice (a) · Spot Curves workbook", "q": "FV 1,000, 6% annual, 5 years, continuous discounting off the Thai zero curve; μ and Ω of the five yield changes.", "need": "face, coupon, maturity, the spot rate for each year, μ and Ω of the five spot-rate changes.", "how": "PV_t = CF_t·e^(−y_t·t);  w_t = PV_t/B;  adjusted −t·w_t;  VaR = wᵀμ + z√(wᵀΩw), × B for money.", "sheets": ["Coupon Bond"], "go": ["pset", "Lecture 5 practice"], "steps": [["▸ Open the Coupon Bond sheet (link).", "Coupon Bond!B6", "", 0], ["Face value: 1000.", "Coupon Bond!C8", "1000", 0], ["Coupon: 6 (in %, number only).", "Coupon Bond!C9", "6", 0], ["Payments per year: 1.", "Coupon Bond!C10", "1", 0], ["Maturity: 5.", "Coupon Bond!C11", "5", 0], ["Discounting (▾): 'Continuous' — the class file uses EXP(−y·t).", "Coupon Bond!C12", "Continuous", 0], ["Adjusted-weight rule (▾): '-t (formula sheet)' (with continuous discounting D_mod = t).", "Coupon Bond!C13", "-t (formula sheet)", 0], ["Number held: 1.", "Coupon Bond!C14", "1", 0], ["α: 0.01.", "Coupon Bond!C15", "0.01", 0], ["Horizon: 1.", "Coupon Bond!C16", "1", 0], ["Spot-rate table, year 1: 1.510592 (in %, number only) — the 1Y zero rate on the last day.", "Coupon Bond!E21", "1.510592", 0], ["Spot-rate table, year 2: 1.621256 (in %, number only) — the 2Y zero rate on the last day.", "Coupon Bond!E22", "1.621256", 0], ["Spot-rate table, year 3: 1.777315 (in %, number only) — the 3Y zero rate on the last day.", "Coupon Bond!E23", "1.777315", 0], ["Spot-rate table, year 4: 1.910292 (in %, number only) — the 4Y zero rate on the last day.", "Coupon Bond!E24", "1.910292", 0], ["Spot-rate table, year 5: 2.326193 (in %, number only) — the 5Y zero rate on the last day.", "Coupon Bond!E25", "2.326193", 0], ["μ box, factor 1 = dy1: type its MEAN as a decimal — from the Spot Curves file's averages and covariance of the daily rate changes.", "Coupon Bond!D112", "-2.00767e-05", 0], ["μ box, factor 2 = dy2: type its MEAN as a decimal (same source).", "Coupon Bond!D113", "-1.62792e-05", 0], ["μ box, factor 3 = dy3: type its MEAN as a decimal (same source).", "Coupon Bond!D114", "-1.81798e-05", 0], ["μ box, factor 4 = dy4: type its MEAN as a decimal (same source).", "Coupon Bond!D115", "-2.13406e-05", 0], ["μ box, factor 5 = dy5: type its MEAN as a decimal (same source).", "Coupon Bond!D116", "-3.81928e-06", 0], ["Ω box, row 1 · column 1: type the VARIANCE of dy1 as a decimal — from the Spot Curves file's averages and covariance of the daily rate changes.", "Coupon Bond!E112", "1.87204e-08", 0], ["Ω box, row 1 · column 2: type the COVARIANCE of dy1 and dy2 as a decimal.  Type only on and above the diagonal; the lower half fills itself.", "Coupon Bond!F112", "1.50247e-08", 0], ["Ω box, row 1 · column 3: type the COVARIANCE of dy1 and dy3 as a decimal.", "Coupon Bond!G112", "1.2406e-08", 0], ["Ω box, row 1 · column 4: type the COVARIANCE of dy1 and dy4 as a decimal.", "Coupon Bond!H112", "1.21055e-08", 0], ["Ω box, row 1 · column 5: type the COVARIANCE of dy1 and dy5 as a decimal.", "Coupon Bond!I112", "1.52979e-08", 0], ["Ω box, row 2 · column 2: type the VARIANCE of dy2 as a decimal.", "Coupon Bond!F113", "3.13294e-08", 0], ["Ω box, row 2 · column 3: type the COVARIANCE of dy2 and dy3 as a decimal.", "Coupon Bond!G113", "2.41576e-08", 0], ["Ω box, row 2 · column 4: type the COVARIANCE of dy2 and dy4 as a decimal.", "Coupon Bond!H113", "3.43298e-08", 0], ["Ω box, row 2 · column 5: type the COVARIANCE of dy2 and dy5 as a decimal.", "Coupon Bond!I113", "4.08221e-08", 0], ["Ω box, row 3 · column 3: type the VARIANCE of dy3 as a decimal.", "Coupon Bond!G114", "4.32727e-08", 0], ["Ω box, row 3 · column 4: type the COVARIANCE of dy3 and dy4 as a decimal.", "Coupon Bond!H114", "4.98189e-08", 0], ["Ω box, row 3 · column 5: type the COVARIANCE of dy3 and dy5 as a decimal.", "Coupon Bond!I114", "4.63237e-08", 0], ["Ω box, row 4 · column 4: type the VARIANCE of dy4 as a decimal.", "Coupon Bond!H115", "9.15337e-08", 0], ["Ω box, row 4 · column 5: type the COVARIANCE of dy4 and dy5 as a decimal.", "Coupon Bond!I115", "7.97353e-08", 0], ["Ω box, row 5 · column 5: type the VARIANCE of dy5 as a decimal.", "Coupon Bond!I116", "1.10313e-07", 0], ["Read ▸ bond price.", "Coupon Bond!G51", "1173.26836461", 1], ["Read ▸ D_mac (years).", "Coupon Bond!C55", "4.5056423", 1], ["Read ▸ VaR in Baht.", "Coupon Bond!C213", "-3.83887978", 1]]}, {"n": 29, "t": "TFEX zero-coupon-bond futures on each cash flow", "src": "Lecture 5 practice (b)", "q": "One year to delivery, ZCBs maturing 1–5 years after delivery (the bond's cash flows 60, 60, 60, 60, 1,060); spots 1Y…6Y.", "need": "for each contract: face (the cash flow), T = 1, N = 1…5, the 1Y spot and the (1+N)Y spot.", "how": "Each contract is a ZCB future: F = X·e^(y_T·T − y_(T+N)·(T+N)). Price them one at a time.", "sheets": ["Futures"], "go": ["pset", "Lecture 5 practice"], "steps": [["▸ Open the Futures sheet, section 2 (link). Do one contract at a time; this is the first.", "Futures!B87", "", 0], ["Face X: 60 — the first cash flow of the bond.", "Futures!C89", "60", 0], ["T: 1 (delivery in one year).", "Futures!C90", "1", 0], ["N: 1 (the ZCB matures 1 year after delivery).", "Futures!C91", "1", 0], ["y_T: the 1Y spot as a decimal (0.01510592).", "Futures!C92", "0.01510592", 0], ["y_(T+N): the 2Y spot as a decimal (0.01621256).", "Futures!C93", "0.01621256", 0], ["Contracts: 1.", "Futures!C94", "1", 0], ["Read ▸ futures price of contract 1.", "Futures!C98", "58.96979492", 1]]}, {"n": 30, "t": "Minimise the bond's risk with the five futures", "src": "Lecture 5 practice (c)", "q": "Use the five ZCB futures to minimise the 6% bond's risk. Can it be eliminated?", "need": "the bond's money weights, the futures' money weights and Ω of dy1…dy6 — already the sheet's defaults.", "how": "Choose contract numbers n to minimise σ of (bond + Σ n_k·futures_k): n* = −(FᵀΩF)⁻¹FᵀΩb.", "sheets": ["Hedge"], "go": ["fut", "The practice problem"], "steps": [["▸ Open the Hedge sheet, section 2 (link). The default inputs are this problem, so there is nothing to type.", "Hedge!B31", "", 0], ["Read ▸ σ of the bond before hedging (money).", "Hedge!C176", "1.66261656", 1], ["Read ▸ σ after the best hedge.", "Hedge!C178", "0.15129079", 1], ["Read ▸ share of the risk removed: 90.9%.", "Hedge!C184", "0.9090044", 1]]}, {"n": 31, "t": "Hedge ratio and number of contracts", "src": "Hull", "q": "σ_S = 0.0065, σ_F = 0.0081, ρ = 0.8; hedge 1,000,000 units with contracts of 50,000.", "need": "σ of spot changes, σ of futures changes, their correlation, the exposure and the contract size.", "how": "h* = ρ·σ_S/σ_F;  contracts N* = h*·Q_A/Q_F.", "sheets": ["Hedge"], "go": ["fut", "The practice problem"], "steps": [["▸ Open the Hedge sheet, section 1 (link).", "Hedge!B6", "", 0], ["σ_S: 0.0065.", "Hedge!C8", "0.0065", 0], ["σ_F: 0.0081.", "Hedge!C9", "0.0081", 0], ["ρ: 0.8.", "Hedge!C10", "0.8", 0], ["Q_A (units to hedge): 1000000.", "Hedge!C11", "1000000", 0], ["Q_F (units per contract): 50000.", "Hedge!C12", "50000", 0], ["Read ▸ optimal hedge ratio h*.", "Hedge!C15", "0.64197531", 1], ["Read ▸ contracts to short: 12.84 → about 13.", "Hedge!C16", "12.83950617", 1]]}, {"n": 32, "t": "Mock Q1 · three stocks", "src": "Mock exam", "q": "4.0m / 2.5m / 3.5m in X, Y, Z; daily μ 0.05/0.03/0.04%; σ 1.6/1.1/2.0%; ρ 0.4/0.25/0.5; 99%; 10 days.", "need": "the money in each stock, daily μ and σ, the three correlations, 99%, 10 days.", "how": "As the gold/silver question with three assets and non-zero μ.", "sheets": ["Asset VaR"], "go": ["exam", "Mock Q1"], "steps": [["▸ Open the Asset VaR sheet (link).", "Asset VaR!B6", "", 0], ["α: 0.01 (99%).", "Asset VaR!C8", "0.01", 0], ["Horizon T: 10 days.", "Asset VaR!C9", "10", 0], ["Positions are given as (▾): 'Money amounts'.", "Asset VaR!C10", "Money amounts", 0], ["Risk is given as (▾): 'σ's and correlations'.", "Asset VaR!C12", "σ's and correlations", 0], ["μ, σ are (▾): 'Daily'.", "Asset VaR!C13", "Daily", 0], ["Asset table row 1, Name: X.", "Asset VaR!B16", "X", 0], ["Row 1, Money: 4000000.", "Asset VaR!C16", "4000000", 0], ["Row 1, σ: 1.6% as a decimal → 0.016.", "Asset VaR!D16", "0.016", 0], ["Row 1, μ: 0.05% as a decimal → 0.0005.", "Asset VaR!E16", "0.0005", 0], ["Asset table row 2, Name: Y.", "Asset VaR!B17", "Y", 0], ["Row 2, Money: 2500000.", "Asset VaR!C17", "2500000", 0], ["Row 2, σ: 1.1% as a decimal → 0.011.", "Asset VaR!D17", "0.011", 0], ["Row 2, μ: 0.03% as a decimal → 0.0003.", "Asset VaR!E17", "0.0003", 0], ["Asset table row 3, Name: Z.", "Asset VaR!B18", "Z", 0], ["Row 3, Money: 3500000.", "Asset VaR!C18", "3500000", 0], ["Row 3, σ: 2% as a decimal → 0.02.", "Asset VaR!D18", "0.02", 0], ["Row 3, μ: 0.04% as a decimal → 0.0004.", "Asset VaR!E18", "0.0004", 0], ["Correlation box row 1 · column 2 (X–Y): 0.4.", "Asset VaR!D29", "0.4", 0], ["Row 1 · column 3 (X–Z): 0.25.", "Asset VaR!E29", "0.25", 0], ["Row 2 · column 3 (Y–Z): 0.5.", "Asset VaR!E30", "0.5", 0], ["Read ▸ 1-day VaR (money).", "Asset VaR!C87", "-283840.68583813", 1], ["Read ▸ 10-day VaR (money).", "Asset VaR!C90", "-869206.51216248", 1], ["Read ▸ ES (return).", "Asset VaR!C91", "-0.03257907", 1], ["Read ▸ benefit of diversification (1 day).", "Asset VaR!C150", "87714.49581947", 1], ["Read ▸ component VaR of Z (money).", "Asset VaR!I140", "-129814.49658992", 1], ["Read ▸ incremental VaR of Z.", "Asset VaR!K140", "-102525.99038567", 1]]}, {"n": 33, "t": "Mock Q2 · coupon bond", "src": "Mock exam", "q": "3-year 6% annual bond, FV 1,000; spots 2.5/3.0/3.4%; dy μ and Ω as given; 50 bonds; 99%.", "need": "face, coupon, maturity, the three spots, μ and Ω of dy1…dy3, bonds held.", "how": "Price at spots → weights → −t·w → VaR; money = VaR% × price × 50.", "sheets": ["Coupon Bond"], "go": ["exam", "Mock Q2"], "steps": [["▸ Open the Coupon Bond sheet (link).", "Coupon Bond!B6", "", 0], ["Face value: 1000.", "Coupon Bond!C8", "1000", 0], ["Coupon: 6 (in %, number only).", "Coupon Bond!C9", "6", 0], ["Payments per year: 1.", "Coupon Bond!C10", "1", 0], ["Maturity: 3.", "Coupon Bond!C11", "3", 0], ["Discounting (▾): 'Discrete'.", "Coupon Bond!C12", "Discrete", 0], ["Adjusted-weight rule (▾): '-t (formula sheet)'.", "Coupon Bond!C13", "-t (formula sheet)", 0], ["Number held: 50.", "Coupon Bond!C14", "50", 0], ["α: 0.01.", "Coupon Bond!C15", "0.01", 0], ["Horizon: 1.", "Coupon Bond!C16", "1", 0], ["Spot-rate table, year 1: 2.5 (in %, number only).", "Coupon Bond!E21", "2.5", 0], ["Spot-rate table, year 2: 3 (in %, number only).", "Coupon Bond!E22", "3", 0], ["Spot-rate table, year 3: 3.4 (in %, number only).", "Coupon Bond!E23", "3.4", 0], ["μ box, factor 1 = dy1: type its MEAN as a decimal — as given in the question.", "Coupon Bond!D112", "-1e-05", 0], ["μ box, factor 2 = dy2: type its MEAN as a decimal (same source).", "Coupon Bond!D113", "-2e-05", 0], ["μ box, factor 3 = dy3: type its MEAN as a decimal (same source).", "Coupon Bond!D114", "1e-05", 0], ["Ω box, row 1 · column 1: type the VARIANCE of dy1 as a decimal — as given in the question.", "Coupon Bond!E112", "1.6e-07", 0], ["Ω box, row 1 · column 2: type the COVARIANCE of dy1 and dy2 as a decimal.  Type only on and above the diagonal; the lower half fills itself.", "Coupon Bond!F112", "1.6e-07", 0], ["Ω box, row 1 · column 3: type the COVARIANCE of dy1 and dy3 as a decimal.", "Coupon Bond!G112", "1.44e-07", 0], ["Ω box, row 2 · column 2: type the VARIANCE of dy2 as a decimal.", "Coupon Bond!F113", "2.5e-07", 0], ["Ω box, row 2 · column 3: type the COVARIANCE of dy2 and dy3 as a decimal.", "Coupon Bond!G113", "2.55e-07", 0], ["Ω box, row 3 · column 3: type the VARIANCE of dy3 as a decimal.", "Coupon Bond!G114", "3.6e-07", 0], ["Read ▸ price.", "Coupon Bond!G51", "1073.92815779", 1], ["Read ▸ yield to maturity.", "Coupon Bond!C56", "0.03367907", 1], ["Read ▸ D_mod.", "Coupon Bond!C57", "2.74584598", 1], ["Read ▸ VaR %.", "Coupon Bond!C211", "-0.00389858", 1], ["Read ▸ VaR in money for 50 bonds.", "Coupon Bond!C213", "-209.33961242", 1]]}, {"n": 34, "t": "Mock Q3 · options", "src": "Mock exam", "q": "S 50, K 52, T 0.5, σ 30%, y 4%; daily r_S and dy statistics as given; 99%.", "need": "S, K, T, σ, y, and μ and Ω of (r_S, dy).", "how": "BSM → Delta, Rho → w → VaR for the call and the put.", "sheets": ["Option BSM"], "go": ["exam", "Mock Q3"], "steps": [["▸ Open the Option BSM sheet (link).", "Option BSM!B6", "", 0], ["S: 50.", "Option BSM!C8", "50", 0], ["K: 52.", "Option BSM!C9", "52", 0], ["y as a decimal: 0.04.", "Option BSM!C10", "0.04", 0], ["σ as a decimal: 0.30.", "Option BSM!C11", "0.3", 0], ["T: 0.5 years.", "Option BSM!C12", "0.5", 0], ["σ, y and T come from (▾): 'As typed above'.", "Option BSM!C16", "As typed above", 0], ["Position A (▾): Call.", "Option BSM!C109", "Call", 0], ["Position B (▾): Put.", "Option BSM!C190", "Put", 0], ["μ box, factor 1 = r_S: type its MEAN as a decimal — as given in the question.", "Option BSM!D102", "0.0006", 0], ["μ box, factor 2 = dy: type its MEAN as a decimal (same source).", "Option BSM!D103", "1e-05", 0], ["Ω box, row 1 · column 1: type the VARIANCE of r_S as a decimal — as given in the question.", "Option BSM!E102", "0.000361", 0], ["Ω box, row 1 · column 2: type the COVARIANCE of r_S and dy as a decimal.  Type only on and above the diagonal; the lower half fills itself.", "Option BSM!F102", "-1.9e-06", 0], ["Ω box, row 2 · column 2: type the VARIANCE of dy as a decimal.", "Option BSM!F103", "2.5e-07", 0], ["Read ▸ call price.", "Option BSM!C37", "3.79674466", 1], ["Read ▸ put price.", "Option BSM!C38", "4.76707567", 1], ["Read ▸ call weight on r_S.", "Option BSM!C118", "6.66580098", 1], ["Read ▸ VaR of the call.", "Option BSM!C132", "-0.28996335", 1], ["Read ▸ VaR of the put.", "Option BSM!C213", "-0.23138954", 1]]}, {"n": 35, "t": "Mock Q4 · futures and a forward", "src": "Mock exam", "q": "Index futures (900, 2.5%, 3 months, 5 contracts); ZCB futures (T 1, N 2, 2.2%/2.8%); forward (60, 58, 25%, 3%, 1 year).", "need": "for each part its own inputs, plus μ and Ω of the factors.", "how": "Three separate sections: cost-of-carry futures, ZCB futures, forward = call − put.", "sheets": ["Forward", "Futures"], "go": ["exam", "Mock Q4"], "steps": [["▸ Part 1: open the Futures sheet, section 1 (link).", "Futures!B6", "", 0], ["S₀: 900.", "Futures!C8", "900", 0], ["y_T as a decimal: 0.025.", "Futures!C9", "0.025", 0], ["T: 0.25 — 3 months in years.", "Futures!C10", "0.25", 0], ["Contracts: 5.", "Futures!C11", "5", 0], ["μ box, factor 1 = r_S: type its MEAN as a decimal — as given in the question.", "Futures!D29", "0.0004", 0], ["μ box, factor 2 = dy: type its MEAN as a decimal (same source).", "Futures!D30", "1e-05", 0], ["Ω box, row 1 · column 1: type the VARIANCE of r_S as a decimal — as given in the question.", "Futures!E29", "0.000144", 0], ["Ω box, row 1 · column 2: type the COVARIANCE of r_S and dy as a decimal.  Type only on and above the diagonal; the lower half fills itself.", "Futures!F29", "4.8e-07", 0], ["Ω box, row 2 · column 2: type the VARIANCE of dy as a decimal.", "Futures!F30", "1.6e-07", 0], ["Read ▸ futures price.", "Futures!C14", "905.6426148", 1], ["Read ▸ VaR (money).", "Futures!C45", "-123.92053547", 1], ["▸ Part 2: the same sheet, section 2 (link).", "Futures!B87", "", 0], ["Face X: 1000.", "Futures!C89", "1000", 0], ["T: 1.", "Futures!C90", "1", 0], ["N: 2.", "Futures!C91", "2", 0], ["y_T as a decimal: 0.022.", "Futures!C92", "0.022", 0], ["y_(T+N) as a decimal: 0.028.", "Futures!C93", "0.028", 0], ["Contracts: 1.", "Futures!C94", "1", 0], ["μ box, factor 1 = dy_T: type its MEAN as a decimal — as given in the question.", "Futures!D121", "2e-05", 0], ["μ box, factor 2 = dy_(T+N): type its MEAN as a decimal (same source).", "Futures!D122", "1e-05", 0], ["Ω box, row 1 · column 1: type the VARIANCE of dy_T as a decimal — as given in the question.", "Futures!E121", "2.5e-07", 0], ["Ω box, row 1 · column 2: type the COVARIANCE of dy_T and dy_(T+N) as a decimal.  Type only on and above the diagonal; the lower half fills itself.", "Futures!F121", "1.8e-07", 0], ["Ω box, row 2 · column 2: type the VARIANCE of dy_(T+N) as a decimal.", "Futures!F122", "1.6e-07", 0], ["Read ▸ ZCB futures price.", "Futures!C98", "939.88288679", 1], ["Read ▸ forward rate.", "Futures!C99", "0.031", 1], ["Read ▸ VaR.", "Futures!C137", "-2.51269092", 1], ["▸ Part 3: open the Forward sheet (link).", "Forward!B6", "", 0], ["S: 60.", "Forward!C8", "60", 0], ["K: 58.", "Forward!C9", "58", 0], ["σ as a decimal: 0.25.", "Forward!C10", "0.25", 0], ["y as a decimal: 0.03.", "Forward!C11", "0.03", 0], ["T: 1.", "Forward!C12", "1", 0], ["Read ▸ forward value V_F.", "Forward!C24", "3.71415905", 1], ["Read ▸ weight on r_S.", "Forward!C26", "16.15439703", 1]]}];

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
var SR_KIND = {finder:"finder", solve:"solve", topic:"section", section:"section", bench:"formula", formula:"formula", excel:"formula",
               trap:"formula", erratum:"formula", problem:"problem", question:"question", card:"card"};
var SR_WEIGHT = {finder:9, solve:6, topic:7, section:5, problem:5, bench:4, formula:4, excel:3, trap:3, erratum:2, question:2, card:1};
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
    add("finder", r.q, r.w + " · need: " + r.need + (r.xl ? " · Excel sheet: " + r.xl + (r.cell ? " " + r.cell : "") : "") + ((r.sg || []).length ? " · Solve Guide #" + r.sg.join(", #") : "") + " · " + g.g +
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
  SOLVE_GUIDE.forEach(function(ex){
    add("solve", "Solve Guide #" + ex.n + " · " + ex.t, ex.q + " · " + ex.src + " · sheets: " + ex.sheets.join(", ") + " · " + ex.how + " · " +
        ex.steps.map(function(s){ return s[0] + (s[1] ? " [" + s[1] + "]" : "") + (s[2] ? " → " + s[2] : ""); }).join(" · "), "xl", null, {sg:ex.n});
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
  var d = node.closest ? node.closest("details") : null;
  while(d){ d.open = true; d = d.parentElement ? d.parentElement.closest("details") : null; }
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
var SR_CHIPS = [["all","All"],["finder","Question finder"],["solve","Excel Solve Guide"],["section","Sections"],["problem","Worked problems"],
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
    b.innerHTML = '<span class="kind' + (it.kind === "finder" ? " k-finder" : "") + '">' + (it.kind === "finder" ? "question type" : it.kind === "solve" ? "Excel solve guide" : it.kind) + '</span>' +
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
  else if(it.kind === "solve") sgOpen(it.sg);
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
      if(r.xl){
        var xs = el("span", "xl", "Excel · " + esc(r.xl) + (r.cell ? " › " + esc(r.cell.split("!")[1]) : ""));
        xs.title = r.cell ? "In the solver workbook: sheet " + r.xl + ", from cell " + r.cell.split("!")[1] : "In the solver workbook";
        goes.appendChild(xs);
      }
      (r.sg || []).slice(0, 3).forEach(function(n){
        var sb = el("button", "sg", "Solve Guide #" + n + " ▸"); sb.type = "button";
        sb.title = "Open the step-by-step walk-through of example " + n + " (XL panel)";
        sb.addEventListener("click", function(){ sgOpen(n); });
        goes.appendChild(sb);
      });
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
  xlTablePaint($("#xlGuide"), false);
  xlTablePaint($("#xlSheets"), true);
  sgInit();
  finderPaint();
}

/* ---------------- the workbook's sheets, as a table ---------------- */
function xlPageBtn(go, label){
  var b = el("button", "xl-go", esc(label || (srTopicLabel(go[0]) + " · " + go[1])) + " ▸"); b.type = "button";
  b.title = "Open the section that explains it: " + go[1];
  b.addEventListener("click", function(){ var node = srTarget(go[0], go[1]); if(node) srLand(uxTopicOf(node) || go[0], node, null); else uxJump(go[0], go[1]); });
  return b;
}
function xlTablePaint(tb, full){
  if(!tb) return;
  tb.innerHTML = "";
  XL_GUIDE.forEach(function(r){
    var tr = el("tr", r[0] === "Extras" ? "pick" : null);
    tr.appendChild(el("td", "l", "<b>" + esc(r[0]) + "</b>"));
    tr.appendChild(el("td", "l", esc(r[1])));
    if(full){
      tr.appendChild(el("td", "l xl-cells", esc(r[2])));
      tr.appendChild(el("td", "l xl-cells", esc(r[3])));
      var sg = el("td", "l");
      (r[4] || []).forEach(function(n){ var b = el("button", "sg", "#" + n); b.type = "button"; b.title = "Solve Guide example " + n; b.addEventListener("click", function(){ sgOpen(n); }); sg.appendChild(b); });
      if(!(r[4] || []).length) sg.textContent = "—";
      tr.appendChild(sg);
    }
    var pg = el("td", "l");
    if(r[5]) pg.appendChild(xlPageBtn(r[5]));
    tr.appendChild(pg);
    tb.appendChild(tr);
  });
}

/* ---------------- the Solve Guide index (XL panel) ---------------- */
var sgFilterSheet = "";
function sgPaint(){
  var host = $("#sgIndex");
  if(!host) return;
  var q = ($("#sgFilter") || {}).value || "", terms = srTerms(q), re = srMarkRe(terms), shown = 0;
  host.innerHTML = "";
  SOLVE_GUIDE.forEach(function(ex){
    if(sgFilterSheet && ex.sheets.indexOf(sgFilterSheet) < 0) return;
    if(terms.length){
      var hay = srNorm([ex.n, ex.t, ex.src, ex.q, ex.how, ex.sheets.join(" ")].concat(ex.steps.map(function(s){ return s[0]; })).join(" · "));
      if(!terms.every(function(t){ return srHas(hay, t) >= 0; })) return;
    }
    shown++;
    var d = el("details", "sg"); d.id = "sg-" + ex.n;
    var sm = el("summary", null, '<span class="sg-n">#' + ex.n + '</span> ' + srHi(ex.t, re) +
      '<span class="sg-src">' + esc(ex.src) + '</span><span class="sg-sheets">' + esc(ex.sheets.join(" · ")) + '</span>');
    d.appendChild(sm);
    var body = el("div", "sg-body");
    body.appendChild(el("p", "sg-q", srHi(ex.q, re)));
    body.appendChild(el("p", "sg-meta", "<b>From the question you need</b> " + esc(ex.need)));
    body.appendChild(el("p", "sg-meta", "<b>How it is solved</b> " + srHi(ex.how, re)));
    var wrap = el("div", "sheet sg-steps"), tbl = el("table");
    tbl.innerHTML = '<thead><tr><th>#</th><th class="l">Do this in the workbook</th><th class="l">Cell</th><th class="l">Type · or read</th></tr></thead>';
    var tb = el("tbody");
    ex.steps.forEach(function(s, i){
      var tr = el("tr", s[3] ? "sg-read" : null);
      tr.innerHTML = "<td>" + (i + 1) + '</td><td class="l">' + srHi(s[0], re) + '</td><td class="l sg-cell">' + esc(s[1]) + '</td><td class="l sg-val">' + esc(s[2]) + "</td>";
      tb.appendChild(tr);
    });
    tbl.appendChild(tb); wrap.appendChild(tbl); body.appendChild(wrap);
    var foot = el("div", "sg-foot");
    foot.appendChild(el("span", "sg-hint", "Read the steps here, type them in the workbook. Rows shaded green are answers to read; the ✓ column in the workbook confirms them live."));
    foot.appendChild(xlPageBtn(ex.go, "Explained: " + srTopicLabel(ex.go[0]) + " · " + ex.go[1]));
    body.appendChild(foot);
    d.appendChild(body);
    host.appendChild(d);
  });
  var c = $("#sgCount");
  if(c) c.textContent = (terms.length || sgFilterSheet) ? shown + " of " + SOLVE_GUIDE.length : SOLVE_GUIDE.length + " worked examples";
  if(!shown) host.appendChild(el("div", "fg-empty", "No example matches. Try fewer words, or clear the sheet filter."));
}
function sgInit(){
  var inp = $("#sgFilter"), chips = $("#sgSheets");
  if(!inp) return;
  var t = null;
  inp.addEventListener("input", function(){ clearTimeout(t); t = setTimeout(sgPaint, 60); });
  inp.addEventListener("keydown", function(ev){ if(ev.key === "Escape"){ this.value = ""; sgFilterSheet = ""; sgPaint(); } });
  if(chips){
    var names = [];
    SOLVE_GUIDE.forEach(function(ex){ ex.sheets.forEach(function(s){ if(names.indexOf(s) < 0) names.push(s); }); });
    names.sort();
    [""].concat(names).forEach(function(nm){
      var b = el("button", "chip", nm || "All sheets"); b.type = "button"; b.dataset.sheet = nm;
      b.setAttribute("aria-pressed", String(nm === sgFilterSheet));
      b.addEventListener("click", function(){
        sgFilterSheet = nm;
        $$("button", chips).forEach(function(x){ x.setAttribute("aria-pressed", String(x.dataset.sheet === nm)); });
        sgPaint();
      });
      chips.appendChild(b);
    });
  }
  sgPaint();
}
/* open example n: XL panel → the index → that <details>, expanded and flashed */
function sgOpen(n){
  var d = $("#sg-" + n);
  if(!d){ sgFilterSheet = ""; var inp = $("#sgFilter"); if(inp) inp.value = ""; $$("#sgSheets button").forEach(function(x){ x.setAttribute("aria-pressed", String(!x.dataset.sheet)); }); sgPaint(); d = $("#sg-" + n); }
  if(!d) return;
  d.open = true;
  srLand("xl", d, null);
}

/* ---------------- deep links from the workbook: #go=topic:heading-slug · #sg=n · #xl=Sheet ---------------- */
function srSlug(s){ return srNorm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
function srHashGo(){
  var h = decodeURIComponent(location.hash || "").replace(/^#/, "");
  if(!h) return false;
  var m;
  if((m = h.match(/^sg=(\d+)$/))){ sgOpen(+m[1]); return true; }
  if((m = h.match(/^xl=(.+)$/))){
    sgFilterSheet = m[1].trim(); var inp = $("#sgFilter"); if(inp) inp.value = "";
    $$("#sgSheets button").forEach(function(x){ x.setAttribute("aria-pressed", String(x.dataset.sheet === sgFilterSheet)); });
    sgPaint();
    var blk = $("#xlSolverBlock"); if(blk) srLand("xl", blk, null); else go("xl");
    return true;
  }
  if((m = h.match(/^go=([a-z]+)(?::(.*))?$/))){
    var topic = m[1], want = srSlug(m[2] || "");
    if(!TOPICS.some(function(t){ return t.id === topic; })) return false;
    if(!want){ go(topic); return true; }
    var t = TOPICS.filter(function(x){ return x.id === topic; })[0], panel = $("#" + t.panel);
    function look(root){
      var hs = $$("h3, h4, caption, .pset .src", root), best = null;
      hs.forEach(function(x){ var s = srSlug(x.textContent); if(!best && (s.indexOf(want) === 0 || s.indexOf(want) >= 0 || want.indexOf(s) === 0)) best = x; });
      return best;
    }
    var hit = (panel && look(panel)) || look(document);
    if(hit){ var node = hit.closest(".pset") || hit.closest(".tool") || hit.closest("section.block") || hit; srLand(uxTopicOf(node) || topic, node, null); }
    else go(topic);
    return true;
  }
  return false;
}
window.addEventListener("hashchange", function(){ try{ srHashGo(); }catch(e){ console.warn("deep link failed:", e); } });
var _bootBeforeSearch = boot;
boot = function(){
  _bootBeforeSearch();
  try{ finderInit(); }catch(e){ console.warn("Search layer failed:", e); }
  try{ srHashGo(); }catch(e){ console.warn("deep link failed:", e); }
};
</script>
