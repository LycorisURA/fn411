<script id="course-tools">
/* ============================================================
   COURSE TOOLS — one function per bench, plus a TOOL_TALK entry
   keyed by the exact <h4> title. All maths mirrors the class
   workbooks: VaR = mu + z*sigma, reported NEGATIVE.
   ============================================================ */

/* ---- shared statistics helpers (Excel equivalents in comments) ---- */
function npdf(x){ return Math.exp(-x*x/2)/Math.sqrt(2*Math.PI); }          /* =EXP(-x^2/2)/SQRT(2*PI()) */
function normsdist(x){                                                      /* =NORMSDIST(x) — Hart, double precision */
  var z = Math.abs(x), c, e, b, d;
  if(z > 37) c = 0;
  else {
    e = Math.exp(-z*z/2);
    if(z < 7.07106781186547){
      b = 3.52624965998911e-02*z + 0.700383064443688;
      b = b*z + 6.37396220353165;  b = b*z + 33.912866078383;
      b = b*z + 112.079291497871;  b = b*z + 221.213596169931;
      b = b*z + 220.206867912376;
      d = 8.83883476483184e-02*z + 1.75566716318264;
      d = d*z + 16.064177579207;   d = d*z + 86.7807322029461;
      d = d*z + 296.564248779674;  d = d*z + 637.333633378831;
      d = d*z + 793.826512519948;  d = d*z + 440.413735824752;
      c = e*b/d;
    } else {
      b = z + 0.65; b = z + 4/b; b = z + 3/b; b = z + 2/b; b = z + 1/b;
      c = e/(b*2.506628274631);
    }
  }
  return x > 0 ? 1 - c : c;
}
function normsinv(p){                                                       /* =NORMSINV(p) */
  if(!(p > 0 && p < 1)) return NaN;
  var a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
  var b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
  var c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
  var d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];
  var pl = 0.02425, x, q, r;
  if(p < pl){ q = Math.sqrt(-2*Math.log(p)); x = (((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) / ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1); }
  else if(p <= 1-pl){ q = p-0.5; r = q*q; x = (((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])*q / (((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1); }
  else { q = Math.sqrt(-2*Math.log(1-p)); x = -(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) / ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1); }
  var e = normsdist(x) - p;                                                  /* one Newton step for full precision */
  return x - e/npdf(x);
}
function esMult(a){ return npdf(normsinv(a))/a; }                            /* =EXP(-z^2/2)/(SQRT(2*PI())*alpha) */
function alphaOf(sel, dflt){ var c = num(sel, dflt); return Math.min(0.4999, Math.max(0.0001, (100 - c)/100)); }
function signed(x, d){ return (x < 0 ? "−" : "") + fmt(Math.abs(x), d); }  /* Unicode minus, so tn() cannot misread it */
function isNeg(sel){ return tv(sel).charAt(0) === "−"; }

/* ============================================================
   Tail 01 · Solvency bench
   ============================================================ */
var RATINGS = [["AAA",0.00014038],["AA",0.00020902],["A",0.00123945],["BBB",0.00997917],["BB",0.02488875],["B",0.04611472],["CCC",0.30848573]];
function ratingFor(pd){
  for(var i = 0; i < RATINGS.length; i++) if(pd <= RATINGS[i][1]) return RATINGS[i][0];
  return "below CCC";
}
function solvencyBench(){
  var A = Math.max(1, num("#svA",100000000)), D = Math.max(0, num("#svD",92000000));
  var mu = num("#svM",2)/100, sd = Math.max(0.0001, num("#svS",10)/100), tgt = +$("#svR").value;
  var eq = (A - D)/A;
  var z = (-eq - mu)/sd, pd = normsdist(z);
  var req = -(mu + normsinv(tgt)*sd);
  $("#svEq").textContent = fmt(eq*100,2) + "%";
  $("#svPd").textContent = pd < 0.0001 ? fmt(pd*100,6) + "%" : fmt(pd*100,4) + "%";
  $("#svRat").textContent = ratingFor(pd);
  $("#svReq").textContent = fmt(req*100,2) + "%";
  $("#svGap").textContent = signed((req - eq)*A, 0);
  $("#svFx").innerHTML = "=<b>NORMSDIST</b>((" + fmt(-eq,4) + " − " + fmt(mu,4) + ")/" + fmt(sd,4) + ") = <b>" + (pd < 0.0001 ? fmt(pd*100,6) : fmt(pd*100,4)) + "%</b>"
    + " &nbsp;·&nbsp; target: −(" + fmt(mu,4) + " + <b>NORMSINV</b>(" + tgt + ")×" + fmt(sd,4) + ") = <b>" + fmt(req*100,2) + "%</b>";
  var ok = eq >= req;
  var vn = $("#svNote");
  vn.className = "verdict " + (ok ? "good" : "bad");
  vn.innerHTML = "Equity ratio <b>" + fmt(eq*100,2) + "%</b> against <b>" + fmt(req*100,2) + "%</b> needed for "
    + $("#svR").options[$("#svR").selectedIndex].text.split(" ·")[0] + ". "
    + (ok ? "Surplus of <b>" + fmt((eq-req)*A,0) + "</b>." : "Shortfall of <b>" + fmt((req-eq)*A,0) + "</b> — raise capital or cut asset volatility.");
  drawSolvency(eq, req, mu, sd);
}
function drawSolvency(eq, req, mu, sd){
  var svg = $("#svChart"), pts = [], i, lo = 1e9, hi = -1e9;
  for(i = 0; i <= 60; i++){
    var p = 0.0001 + (0.35 - 0.0001)*i/60;
    var r = -(mu + normsinv(p)*sd);
    pts.push([p*100, r*100]);
    if(r*100 < lo) lo = r*100; if(r*100 > hi) hi = r*100;
  }
  lo = Math.min(lo, eq*100, 0); hi = Math.max(hi, eq*100);
  if(!(hi > lo)) hi = lo + 1;
  var yt = [], xt = [0,5,10,15,20,25,30,35];
  for(i = 0; i <= 4; i++) yt.push(lo + (hi-lo)*i/4);
  var sc = frame(svg, {W:560, H:220, m:{l:56,r:14,t:18,b:34}, x0:0, x1:35, y0:lo, y1:hi, yticks:yt, xticks:xt,
    yfmt:function(v){ return fmt(v,0) + "%"; }, xfmt:function(v){ return v + "%"; }, xlab:"target PD", ylab:"capital"});
  series(svg, pts, sc, cssVar("--accent"), {w:2.4});
  var tgt = +$("#svR").value;
  if(tgt*100 <= 35){
    svg.appendChild(svgEl("line",{x1:sc.x(tgt*100), x2:sc.x(tgt*100), y1:18, y2:186, stroke:cssVar("--gold"), "stroke-width":2, "stroke-dasharray":"5 4"}));
  }
  svg.appendChild(svgEl("line",{x1:56, x2:546, y1:sc.y(eq*100), y2:sc.y(eq*100), stroke:cssVar("--bad"), "stroke-width":2, "stroke-dasharray":"3 3"}));
}
["#svA","#svD","#svM","#svS","#svR"].forEach(function(s){ $(s).addEventListener("input", solvencyBench); });
CHARTS.push(solvencyBench); solvencyBench();

TOOL_TALK["Solvency bench"] = function(target){
  var pd = tn("#svPd"), eq = tn("#svEq"), req = tn("#svReq"), rat = tv("#svRat");
  if(!isFinite(pd)) return ["sad","Give me assets above debt and a positive volatility, and I'll find the tail for you (｡•́ - •̀｡)"];
  if(num("#svD",0) >= num("#svA",1)) return ["intense","Debt at or above assets means it is <b>already</b> insolvent — equity is zero or negative, so the probability of bankruptcy is not a forecast any more."];
  var want = $("#svR").options[$("#svR").selectedIndex].text.split(" ·")[0];
  if(target && target.id === "svR") return ["smug","Targeting <b>" + want + "</b>? That wants <b>" + tv("#svReq") + "</b> of capital against the <b>" + tv("#svEq") + "</b> you hold. Slide the rating up one notch and watch how much the last sliver of safety costs~"];
  if(pd < 0.05) return ["happy","PD <b>" + tv("#svPd") + "</b> — that is <b>" + rat + "</b> territory on the deck's table. Equity <b>" + tv("#svEq") + "</b> against <b>" + tv("#svReq") + "</b> required ♪"];
  if(pd > 20) return ["intense","A <b>" + tv("#svPd") + "</b> chance of bankruptcy. Below CCC. Notice the shape of the curve: getting <em>out</em> of here is cheap, and the last step to AAA is not."];
  return ["intense","PD <b>" + tv("#svPd") + "</b>, so roughly <b>" + rat + "</b>. Remember what this really is — <b>NORMSDIST</b> of minus the equity ratio. It is a VaR statement read backwards."];
};

/* ============================================================
   Tail 02 · VaR and ES bench
   ============================================================ */
function varEsBench(){
  var W = num("#zbW",1000000), mu = num("#zbM",2)/100, sd = Math.abs(num("#zbS",5)/100);
  var a = alphaOf("#zbC",99), T = Math.max(1, Math.round(num("#zbT",1))), zero = $("#zbZero").value === "1";
  var z = normsinv(a), m = zero ? 0 : mu*T, s = sd*Math.sqrt(T);
  var v = m + z*s, es = m - esMult(a)*s;
  $("#zbZ").textContent = signed(z,6);
  $("#zbV").textContent = signed(v*100,4) + "%";
  $("#zbVm").textContent = signed(v*W,2);
  $("#zbE").textContent = signed(es*100,4) + "%";
  $("#zbEm").textContent = signed(es*W,2);
  $("#zbP").textContent = sd > 0 ? fmt(normsdist((0 - m)/s)*100,2) + "%" : "—";
  $("#zbFx").innerHTML = "=" + (zero ? "0" : fmt(mu,6) + "*" + T) + " + <b>NORMSINV</b>(" + fmt(a,4) + ")*" + fmt(sd,6) + "*<b>SQRT</b>(" + T + ")"
    + " = <b>" + signed(v*100,4) + "%</b> &nbsp;·&nbsp; ES multiplier " + fmt(esMult(a),6);
  var vn = $("#zbNote");
  vn.className = "verdict";
  vn.innerHTML = "VaR = " + (zero ? "0" : fmt(m*100,4) + "%") + " + (" + signed(z,6) + " × " + fmt(s*100,4) + "%) = <b>" + signed(v*100,4) + "%</b>"
    + ", i.e. <b>" + signed(v*W,2) + "</b> on " + fmt(W,0) + ". ES is <b>" + signed(es*100,4) + "%</b>, a ratio of <b>"
    + (v !== 0 ? fmt(es/v,4) : "—") + "</b> to the VaR.";
  drawVarEs(m, s, z, a);
}
function drawVarEs(m, s, z, a){
  var svg = $("#zbChart"), i, lo = m - 4*s, hi = m + 4*s, pts = [];
  if(!(hi > lo)){ hi = lo + 1; }
  if(s > 0) for(i = 0; i <= 80; i++){ var x = lo + (hi-lo)*i/80; pts.push([x*100, npdf((x-m)/s)]); }
  var pk = npdf(0), yt = [0, pk/2, pk], xt = [];
  for(i = -4; i <= 4; i += 2) xt.push((m + i*s)*100);
  var sc = frame(svg, {W:560, H:220, m:{l:44,r:14,t:18,b:34}, x0:lo*100, x1:hi*100, y0:0, y1:pk*1.08, yticks:yt, xticks:xt,
    yfmt:function(){ return ""; }, xfmt:function(v){ return fmt(v,1) + "%"; }, xlab:"return", ylab:""});
  var vq = (m + z*s)*100, eq = (m - esMult(a)*s)*100;
  if(s > 0){                                     /* with zero volatility there is no tail to shade */
    var tail = [[vq, 0]], j;
    for(j = 0; j <= 30; j++){ var xx = lo*100 + (vq - lo*100)*j/30; tail.push([xx, npdf((xx/100-m)/s)]); }
    tail.push([lo*100, 0]);
    var d = tail.map(function(p,k){ return (k ? "L" : "M") + sc.x(p[0]).toFixed(2) + " " + sc.y(p[1]).toFixed(2); }).join(" ") + " Z";
    svg.appendChild(svgEl("path",{d:d, fill:cssVar("--bad"), opacity:"0.18", stroke:"none"}));
  }
  series(svg, pts, sc, cssVar("--accent"), {w:2.4});
  if(isFinite(vq)) svg.appendChild(svgEl("line",{x1:sc.x(vq), x2:sc.x(vq), y1:18, y2:186, stroke:cssVar("--bad"), "stroke-width":2}));
  if(s > 0 && eq >= lo*100) svg.appendChild(svgEl("line",{x1:sc.x(eq), x2:sc.x(eq), y1:18, y2:186, stroke:cssVar("--gold"), "stroke-width":2, "stroke-dasharray":"5 4"}));
}
["#zbW","#zbM","#zbS","#zbC","#zbT","#zbZero"].forEach(function(s){ $(s).addEventListener("input", varEsBench); });
CHARTS.push(varEsBench); varEsBench();

TOOL_TALK["VaR and ES bench"] = function(target){
  var z = tn("#zbZ"), T = Math.round(num("#zbT",1)), a = alphaOf("#zbC",99);
  if(!isFinite(z)) return ["sad","I need a confidence level strictly between 50 and 100 to find a quantile (｡•́ - •̀｡)"];
  if(num("#zbS",0) === 0) return ["smug","Zero volatility, so the whole distribution collapses to the mean and VaR is just <b>" + tv("#zbV") + "</b>. No tail, nothing to measure. Disappointing~"];
  if(target && target.id === "zbZero"){
    return $("#zbZero").value === "1"
      ? ["intense","Mean dropped. VaR is now <b>" + tv("#zbV") + "</b>. Whether that is <em>worse</em> depends entirely on the sign of μ — on the coupon bond μ is positive, so zero‑mean is the conservative one there."]
      : ["happy","Mean back in ♪ <b>" + tv("#zbV") + "</b>. This is the course's default, and it is why you cannot just multiply by √T."];
  }
  if(target && target.id === "zbT" && T > 1)
    return ["intense","Horizon <b>" + T + "</b> periods: <b>" + tv("#zbV") + "</b>. The mean scaled by <b>" + T + "</b> and the volatility by <b>√" + T + " = " + fmt(Math.sqrt(T),6) + "</b>. Scaling the whole VaR by √T instead would be wrong~"];
  if(target && target.id === "zbC"){
    var lbl = Math.abs(a - 0.025) < 1e-9 ? " — and <b>this</b> is the row 1.96 belongs to, not the 5% one" : "";
    return ["smug","<b>NORMSINV</b>(" + fmt(a,4) + ") = <b>" + tv("#zbZ") + "</b>" + lbl + ". VaR <b>" + tv("#zbV") + "</b>, ES <b>" + tv("#zbE") + "</b>."];
  }
  return ["happy","VaR <b>" + tv("#zbV") + "</b> and ES <b>" + tv("#zbE") + "</b> — a ratio of about <b>" + fmt(esMult(a)/Math.abs(z),4) + "</b> before the mean. In money: <b>" + tv("#zbVm") + "</b>."];
};

/* ============================================================
   Tail 02 · Subadditivity bench (Hull 11.5 / 11.7)
   ============================================================ */
function discreteVaR(outcomes, a){   /* outcomes: [[loss, prob], ...] sorted ascending by loss */
  var cum = 0, i;
  for(i = 0; i < outcomes.length; i++){ cum += outcomes[i][1]; if(cum >= 1 - a - 1e-12) return outcomes[i][0]; }
  return outcomes[outcomes.length-1][0];
}
function discreteES(outcomes, a){    /* average of the worst a of the distribution */
  var need = a, acc = 0, i;
  for(i = outcomes.length - 1; i >= 0 && need > 1e-12; i--){
    var take = Math.min(outcomes[i][1], need);
    acc += take*outcomes[i][0]; need -= take;
  }
  return acc/a;
}
function subaddBench(){
  var L = num("#sbL",1), H = num("#sbH",10), p = Math.min(0.5, Math.max(0.001, num("#sbP",0.02)));
  var a = alphaOf("#sbC",97.5);
  var one = [[L, 1-p], [H, p]];
  if(H < L){ one = [[H, p], [L, 1-p]]; }
  var port = [[2*L, (1-p)*(1-p)], [L+H, 2*p*(1-p)], [2*H, p*p]].sort(function(x,y){ return x[0]-y[0]; });
  var v1 = discreteVaR(one, a), e1 = discreteES(one, a);
  var v2 = discreteVaR(port, a), e2 = discreteES(port, a);
  $("#sbV1").textContent = fmt(v1,4);
  $("#sbE1").textContent = fmt(e1,4);
  $("#sbV2").textContent = fmt(v2,4);
  $("#sbE2").textContent = fmt(e2,4);
  $("#sbGv").textContent = signed(2*v1 - v2, 4);
  $("#sbGe").textContent = signed(2*e1 - e2, 4);
  var tailBig = Math.min(p, a), tailSmall = a - tailBig;
  $("#sbFx").innerHTML = "one project, worst " + fmt(a*100,2) + "%: " + fmt(tailBig*100,2) + "% at " + fmt(H,2)
    + " + " + fmt(tailSmall*100,2) + "% at " + fmt(L,2) + " &nbsp;⇒&nbsp; ES = <b>" + fmt(e1,4) + "</b>";
  var broken = 2*v1 - v2 < -1e-9, esOk = 2*e1 - e2 >= -1e-9;
  var vn = $("#sbNote");
  vn.className = "verdict " + (broken ? "bad" : "good");
  vn.innerHTML = broken
    ? "<b>Subadditivity violated.</b> Two projects have VaR " + fmt(v1,2) + " + " + fmt(v1,2) + " = <b>" + fmt(2*v1,2)
      + "</b> apart but <b>" + fmt(v2,2) + "</b> merged — worse by " + fmt(v2 - 2*v1,2) + ". ES: " + fmt(2*e1,4) + " apart against "
      + fmt(e2,4) + " merged, so ES " + (esOk ? "holds" : "also fails, which should not happen") + "."
    : "<b>No violation at these settings.</b> VaR " + fmt(2*v1,2) + " apart against " + fmt(v2,2) + " merged. Push P(big loss) just below "
      + fmt((1-a),4) + " — the failure appears when the small-loss outcome no longer reaches the confidence level on its own.";
}
["#sbL","#sbH","#sbP","#sbC"].forEach(function(s){ $(s).addEventListener("input", subaddBench); });
subaddBench();

TOOL_TALK["Subadditivity bench"] = function(){
  var gv = tn("#sbGv"), ge = tn("#sbGe");
  var vNeg = isNeg("#sbGv"), eNeg = isNeg("#sbGe");
  if(!isFinite(gv)) return ["sad","Give me two loss sizes and a probability and I'll build the joint distribution (｡•́ - •̀｡)"];
  if(vNeg && !eNeg) return ["intense","There it is. <b>VaR is worse merged than apart by " + tv("#sbGv").replace("−","") + "</b>, while ES is <b>better</b> merged by " + tv("#sbGe") + ". Three properties out of four, and it is the fourth one that matters for capital~"];
  if(vNeg && eNeg) return ["fluster","Both look violated, which usually means the tail probability has run past the confidence level (・・；) Try a smaller P(big loss)."];
  return ["smug","No violation here — VaR sums to <b>" + tv("#sbGv") + "</b> more than the merged figure, so it behaves. Now nudge P(big loss) towards <b>" + fmt(1 - alphaOf("#sbC",97.5),4) + "</b> and watch the quantile jump."];
};

/* ============================================================
   Tail 02 · EWMA bench
   ============================================================ */
function ewmaBench(){
  var lam = Math.min(0.999, Math.max(0.5, num("#ewL",0.94)));
  var q = Math.abs(num("#ewQ",0.8))/100, k = num("#ewK",-5)/100, dd = Math.max(0, Math.round(num("#ewD",5)));
  var v0 = lam*q*q + (1-lam)*k*k;                        /* variance immediately after the shock */
  var vt = Math.pow(lam, dd)*v0 + (1 - Math.pow(lam, dd))*q*q;
  $("#ewW").textContent = fmt((1-lam)*100,2) + "%";
  $("#ewN").textContent = fmt(1/(1-lam),2) + " days";
  $("#ewS0").textContent = fmt(Math.sqrt(v0)*100,4) + "%";
  $("#ewSt").textContent = fmt(Math.sqrt(vt)*100,4) + "%";
  $("#ewH").textContent = fmt(Math.log(0.5)/Math.log(lam),2) + " days";
  $("#ewFx").innerHTML = "=" + fmt(lam,3) + "*prev_var + " + fmt(1-lam,3) + "*return^2 &nbsp;→&nbsp; σ today <b>"
    + fmt(Math.sqrt(vt)*100,4) + "%</b> against a quiet-period <b>" + fmt(q*100,4) + "%</b>";
  var lift = Math.sqrt(vt)/q;
  var vn = $("#ewNote");
  vn.className = "verdict " + (lift > 1.25 ? "bad" : "good");
  vn.innerHTML = "A " + fmt(k*100,2) + "% day lifts σ from <b>" + fmt(q*100,4) + "%</b> to <b>" + fmt(Math.sqrt(v0)*100,4)
    + "%</b> immediately. " + dd + " days later it is <b>" + fmt(Math.sqrt(vt)*100,4) + "%</b>, still <b>" + fmt((lift-1)*100,1)
    + "%</b> above quiet. Variance half-life is <b>" + fmt(Math.log(0.5)/Math.log(lam),2) + " days</b>.";
  drawEwma(lam, q, v0);
}
function drawEwma(lam, q, v0){
  var svg = $("#ewChart"), i, N = 60, pts = [], hi = Math.sqrt(v0)*100*1.1, lo = q*100*0.85;
  if(!(hi > lo)) hi = lo + 1;
  for(i = 0; i <= N; i++){
    var v = Math.pow(lam,i)*v0 + (1 - Math.pow(lam,i))*q*q;
    pts.push([i, Math.sqrt(v)*100]);
  }
  var yt = [], xt = [0,10,20,30,40,50,60];
  for(i = 0; i <= 4; i++) yt.push(lo + (hi-lo)*i/4);
  var sc = frame(svg, {W:560, H:220, m:{l:56,r:14,t:18,b:34}, x0:0, x1:N, y0:lo, y1:hi, yticks:yt, xticks:xt,
    yfmt:function(v){ return fmt(v,2) + "%"; }, xfmt:function(v){ return v + "d"; }, xlab:"days after shock", ylab:"σ"});
  svg.appendChild(svgEl("line",{x1:56, x2:546, y1:sc.y(q*100), y2:sc.y(q*100), stroke:cssVar("--gold"), "stroke-width":2, "stroke-dasharray":"5 4"}));
  series(svg, pts, sc, cssVar("--accent"), {w:2.4});
  var dd = Math.max(0, Math.round(num("#ewD",5)));
  if(dd <= N) svg.appendChild(svgEl("line",{x1:sc.x(dd), x2:sc.x(dd), y1:18, y2:186, stroke:cssVar("--bad"), "stroke-width":2}));
}
["#ewL","#ewQ","#ewK","#ewD"].forEach(function(s){ $(s).addEventListener("input", ewmaBench); });
CHARTS.push(ewmaBench); ewmaBench();

TOOL_TALK["EWMA bench"] = function(target){
  var lam = num("#ewL",0.94);
  if(target && target.id === "ewL"){
    if(lam <= 0.85) return ["intense","λ = <b>" + fmt(lam,3) + "</b> gives an effective window of only <b>" + tv("#ewN") + "</b>. Very fast, very jumpy — your VaR will move every time one loud day arrives."];
    if(lam >= 0.98) return ["smug","λ = <b>" + fmt(lam,3) + "</b>, so <b>" + tv("#ewN") + "</b> of memory. Smooth, and slow to notice a crisis. That is the whole trade‑off in one slider~"];
    return ["happy","λ = <b>" + fmt(lam,3) + "</b>: weight <b>" + tv("#ewW") + "</b> on yesterday, effective window <b>" + tv("#ewN") + "</b>. The deck's 0.94 gives 16.67 days ♪"];
  }
  if(Math.abs(num("#ewK",0)) < 0.01) return ["smug","A shock of nothing leaves σ at <b>" + tv("#ewSt") + "</b>, which is where it started. Give me a proper bad day~"];
  return ["intense","σ is <b>" + tv("#ewSt") + "</b> today against <b>" + tv("#ewS0") + "</b> right after the shock. Half‑life <b>" + tv("#ewH") + "</b> — that is why a rolling SD stays elevated so much longer than this does."];
};

/* ============================================================
   Tail 03 · Zero-coupon VaR bench
   ============================================================ */
function zcbBench(){
  var F = num("#zcF",1000000), y = num("#zcY",3)/100, T = Math.max(0.01, num("#zcT",1)), m = +$("#zcM").value;
  var mu = num("#zcMu",-0.000175), sd = Math.abs(num("#zcSd",0.0008895223)), a = alphaOf("#zcC",99);
  var B, dmac, dmod, unit;
  if(m === 0){ B = F*Math.exp(-y*T); dmac = T; dmod = T; unit = "years"; }
  else { var n = T*m, per = y/m; B = F/Math.pow(1+per, n); dmac = n; dmod = n/(1+per); unit = m === 2 ? "half-years" : (m === 4 ? "quarters" : "years"); }
  var mb = -dmod*mu, sb = dmod*sd, z = normsinv(a);
  var v = mb + z*sb, v0 = z*sb;
  $("#zcB").textContent = fmt(B,2);
  $("#zcDmac").textContent = fmt(dmac,4);
  $("#zcDmod").textContent = fmt(dmod,7);
  $("#zcMb").textContent = signed(mb,7);
  $("#zcSb").textContent = fmt(sb,7);
  $("#zcV").textContent = signed(v*100,5) + "%";
  $("#zcVm").textContent = signed(v*B,2);
  $("#zcV0").textContent = signed(v0*100,5) + "%";
  $("#zcFx").innerHTML = "D<sub>mod</sub> = " + fmt(dmac,4) + "/(1+" + fmt(m === 0 ? 0 : y/m,6) + ") = <b>" + fmt(dmod,7) + "</b> " + unit
    + " &nbsp;·&nbsp; =" + fmt(mb,7) + "+<b>NORMSINV</b>(" + fmt(a,4) + ")*" + fmt(sb,7) + " = <b>" + signed(v*100,5) + "%</b>";
  var vn = $("#zcNote");
  vn.className = "verdict";
  vn.innerHTML = "μ<sub>B</sub> = −D<sub>mod</sub>μ<sub>dy</sub> = <b>" + signed(mb,7) + "</b> and σ<sub>B</sub> = D<sub>mod</sub>σ<sub>dy</sub> = <b>"
    + fmt(sb,7) + "</b>, so VaR = <b>" + signed(v*100,5) + "%</b> = <b>" + signed(v*B,2) + "</b>. Zero‑mean version: <b>" + signed(v0*100,5) + "%</b>"
    + (v0 < v ? " — <b>more</b> negative, because μ<sub>dy</sub> is negative so μ<sub>B</sub> helps you." : " — less negative, because μ<sub>B</sub> is working against you.");
}
["#zcF","#zcY","#zcT","#zcM","#zcMu","#zcSd","#zcC"].forEach(function(s){ $(s).addEventListener("input", zcbBench); });
zcbBench();

TOOL_TALK["Zero-coupon VaR bench"] = function(target){
  var dmod = tn("#zcDmod"), dmac = tn("#zcDmac"), m = +$("#zcM").value;
  if(!isFinite(dmod)) return ["sad","I need a positive maturity and a sensible yield before duration means anything (｡•́ - •̀｡)"];
  if(target && target.id === "zcM" && m === 0)
    return ["intense","Continuous compounding, so <b>duration is maturity exactly</b> — D<sub>mac</sub> = D<sub>mod</sub> = " + tv("#zcDmod") + ". That is the case where the bond price cancels out of r<sub>B</sub> = −T·dy entirely."];
  if(num("#zcMu",0) > 0)
    return ["smug","A <em>positive</em> mean yield change, so μ<sub>B</sub> = <b>" + tv("#zcMb") + "</b> is negative and the mean is hurting you. Zero‑mean VaR of <b>" + tv("#zcV0") + "</b> now looks optimistic~"];
  if(Math.abs(dmac - dmod) < 1e-9 && m !== 0)
    return ["fluster","D<sub>mac</sub> and D<sub>mod</sub> are the same, which only happens at a zero yield (・・；)"];
  return ["happy","D<sub>mac</sub> <b>" + tv("#zcDmac") + "</b> against D<sub>mod</sub> <b>" + tv("#zcDmod") + "</b> — modified is always the smaller one. VaR <b>" + tv("#zcV") + "</b>, or <b>" + tv("#zcVm") + "</b> in money ♪"];
};

/* ============================================================
   Tail 04 · Option VaR bench
   ============================================================ */
function bsm(S,K,y,sg,T){
  var d1 = (Math.log(S/K) + (y + sg*sg/2)*T)/(sg*Math.sqrt(T)), d2 = d1 - sg*Math.sqrt(T);
  var Nd1 = normsdist(d1), Nd2 = normsdist(d2);
  return {d1:d1, d2:d2, Nd1:Nd1, Nd2:Nd2,
    c: S*Nd1 - K*Math.exp(-y*T)*Nd2,
    p: K*Math.exp(-y*T)*(1-Nd2) - S*(1-Nd1),
    dc: Nd1, dp: Nd1 - 1,
    rc: T*K*Math.exp(-y*T)*Nd2, rp: -T*K*Math.exp(-y*T)*(1-Nd2)};
}
function optionVarBench(){
  var S = Math.max(0.01, num("#ovS",1382.41)), K = Math.max(0.01, num("#ovK",1382.41));
  var y = num("#ovY",1.510592)/100, sg = Math.max(0.0001, num("#ovV",13.269837)/100), T = Math.max(0.01, num("#ovT",1));
  var isCall = $("#ovType").value === "c";
  var ms = num("#ovMs",-0.000459693), ss = Math.abs(num("#ovSs",0.008359212));
  var my = num("#ovMy",-0.0000200767), sy = Math.abs(num("#ovSy",0.000137097));
  var rho = Math.max(-1, Math.min(1, num("#ovR",0.0583))), a = alphaOf("#ovC",99);
  var b = bsm(S,K,y,sg,T);
  var px = isCall ? b.c : b.p, dl = isCall ? b.dc : b.dp, rh = isCall ? b.rc : b.rp;
  var wy = rh/px, ws = dl*S/px;                                 /* order: dy first, then rS — as the class sheet does */
  var mu = wy*my + ws*ms;
  var varP = wy*wy*sy*sy + 2*wy*ws*rho*sy*ss + ws*ws*ss*ss;
  var sp = Math.sqrt(Math.max(0, varP)), z = normsinv(a);
  var v = mu + z*sp, vs = ms + z*ss;
  $("#ovPx").textContent = fmt(px,6);
  $("#ovD").textContent = signed(dl,7);
  $("#ovRho").textContent = signed(rh,4);
  $("#ovWy").textContent = signed(wy,7);
  $("#ovWs").textContent = signed(ws,7);
  $("#ovChk").textContent = fmt(ws - wy,7);
  $("#ovSig").textContent = fmt(sp*100,6) + "%";
  $("#ovVar").textContent = signed(v*100,5) + "%";
  $("#ovVs").textContent = signed(vs*100,5) + "%";
  $("#ovGear").textContent = vs !== 0 ? fmt(v/vs,2) + "×" : "—";
  $("#ovFx").innerHTML = "w = [ dy " + signed(wy,6) + " ; r<sub>S</sub> " + signed(ws,6) + " ] &nbsp;·&nbsp; σ<sub>P</sub> = <b>"
    + fmt(sp*100,6) + "%</b> &nbsp;·&nbsp; =μ+<b>NORMSINV</b>(" + fmt(a,4) + ")*σ = <b>" + signed(v*100,5) + "%</b>";
  var vn = $("#ovNote");
  vn.className = "verdict " + (Math.abs(ws - wy - 1) < 1e-6 ? "good" : "bad");
  vn.innerHTML = (isCall ? "Call" : "Put") + " worth <b>" + fmt(px,4) + "</b>, Δ = <b>" + signed(dl,6) + "</b>, ρ = <b>" + signed(rh,3)
    + "</b>. Weights <b>" + signed(wy,5) + "</b> on dy and <b>" + signed(ws,5) + "</b> on r<sub>S</sub>, differing by <b>" + fmt(ws-wy,7)
    + "</b>" + (Math.abs(ws-wy-1) < 1e-6 ? " — exactly 1, as it must be." : " — <b>that should be 1.</b>")
    + " VaR <b>" + signed(v*100,5) + "%</b> against the stock's <b>" + signed(vs*100,5) + "%</b>.";
  drawOption(S,K,y,sg,T,isCall,px,dl,ss,z);
}
function drawOption(S,K,y,sg,T,isCall,px,dl,ss,z){
  var svg = $("#ovChart"), i, lo = S*0.7, hi = S*1.3, pts = [], tan = [], vlo = 1e18, vhi = -1e18;
  for(i = 0; i <= 60; i++){
    var x = lo + (hi-lo)*i/60, bb = bsm(x,K,y,sg,T), v = isCall ? bb.c : bb.p;
    pts.push([x, v]);
    var t = px + dl*(x - S); tan.push([x, t]);
    if(v < vlo) vlo = v; if(v > vhi) vhi = v;
    if(t < vlo) vlo = t; if(t > vhi) vhi = t;
  }
  if(!(vhi > vlo)) vhi = vlo + 1;
  var yt = [], xt = [];
  for(i = 0; i <= 4; i++) yt.push(vlo + (vhi-vlo)*i/4);
  for(i = 0; i <= 4; i++) xt.push(lo + (hi-lo)*i/4);
  var sc = frame(svg, {W:560, H:220, m:{l:56,r:14,t:18,b:34}, x0:lo, x1:hi, y0:vlo, y1:vhi, yticks:yt, xticks:xt,
    yfmt:function(v){ return fmt(v,0); }, xfmt:function(v){ return fmt(v,0); }, xlab:"underlying S", ylab:"value"});
  series(svg, tan, sc, cssVar("--gold"), {dash:"5 4"});
  series(svg, pts, sc, cssVar("--accent"), {w:2.4});
  svg.appendChild(svgEl("line",{x1:sc.x(S), x2:sc.x(S), y1:18, y2:186, stroke:cssVar("--bad"), "stroke-width":2}));
  var adv = S*(1 + z*ss);
  if(adv > lo && adv < hi) svg.appendChild(svgEl("line",{x1:sc.x(adv), x2:sc.x(adv), y1:18, y2:186, stroke:cssVar("--bad"), "stroke-width":1.4, "stroke-dasharray":"3 3"}));
}
["#ovS","#ovK","#ovY","#ovV","#ovT","#ovType","#ovMs","#ovSs","#ovMy","#ovSy","#ovR","#ovC"].forEach(function(s){ $(s).addEventListener("input", optionVarBench); });
CHARTS.push(optionVarBench); optionVarBench();

TOOL_TALK["Option VaR bench"] = function(target){
  var chk = tn("#ovChk"), gear = tn("#ovGear"), isCall = $("#ovType").value === "c";
  if(!isFinite(chk)) return ["sad","I need a positive spot, strike, volatility and maturity before Black‑Scholes means anything (｡•́ - •̀｡)"];
  if(Math.abs(chk - 1) > 1e-5) return ["fluster","The two weights differ by <b>" + tv("#ovChk") + "</b> and they should differ by <b>exactly 1</b> (・・；) Something upstream is off."];
  if(target && target.id === "ovType")
    return ["smug","Switched to the <b>" + (isCall ? "call" : "put") + "</b>. Weights <b>" + tv("#ovWy") + "</b> and <b>" + tv("#ovWs") + "</b> — still exactly 1 apart, because C = S·N(d₁) − Ke<sup>−yT</sup>N(d₂) does not care which option you picked~"];
  if(target && target.id === "ovR")
    return ["intense","Correlation now <b>" + fmt(num("#ovR",0),4) + "</b>, giving σ<sub>P</sub> = <b>" + tv("#ovSig") + "</b>. The class data has only <b>0.0583</b>, which is why the yield leg barely matters there."];
  if(isFinite(gear) && Math.abs(gear) > 5)
    return ["intense","VaR <b>" + tv("#ovVar") + "</b> against the stock's <b>" + tv("#ovVs") + "</b> — about <b>" + tv("#ovGear") + "</b> the risk. That is gearing: Δ·S sits on top of an option worth only <b>" + tv("#ovPx") + "</b>."];
  return ["happy","Option <b>" + tv("#ovPx") + "</b>, Δ <b>" + tv("#ovD") + "</b>, ρ <b>" + tv("#ovRho") + "</b>. VaR <b>" + tv("#ovVar") + "</b> ♪ The gold dashed line is the Δ tangent — the first‑order approximation this whole method rests on."];
};

/* ============================================================
   Tail 05 · Futures VaR bench
   ============================================================ */
function futuresBench(){
  var kind = $("#fuKind").value, S = Math.max(0.0001, num("#fuS",100));
  var T = Math.max(0.05, num("#fuT",0.5)), y = num("#fuY",3)/100;
  var N = Math.max(0, num("#fuN",0.5)), yn = num("#fuYn",5.2)/100;
  var ss = Math.abs(num("#fuSs",0.008359212)), sy = Math.abs(num("#fuSy",0.000137097));
  var sy2 = Math.abs(num("#fuSy2",0.000177)), rho = Math.max(-1, Math.min(1, num("#fuR",0.8)));
  var a = alphaOf("#fuC",99), z = normsinv(a);
  var F, w1, w2, s1, s2, fwd, lbl1, lbl2, B0;
  if(kind === "asset"){
    F = S*Math.exp(y*T);
    w1 = S; w2 = T*S; s1 = ss; s2 = sy; fwd = NaN;
    lbl1 = "S₀ on r<sub>S</sub>"; lbl2 = "T·S₀ on dy<sub>T</sub>";
  } else {
    B0 = S*Math.exp(-yn*(T+N));
    F = S*Math.exp(-yn*(T+N) + y*T);
    w1 = -(T+N)*B0; w2 = T*B0; s1 = sy2; s2 = sy;
    fwd = N > 0 ? (yn*(T+N) - y*T)/N : NaN;
    lbl1 = "−(T+N)·B₀ on dy<sub>T+N</sub>"; lbl2 = "+T·B₀ on dy<sub>T</sub>";
  }
  var varF = w1*w1*s1*s1 + 2*w1*w2*rho*s1*s2 + w2*w2*s2*s2;
  var sf = Math.sqrt(Math.max(0, varF)), v = z*sf;
  $("#fuF").textContent = fmt(F,6);
  $("#fuFwd").textContent = isFinite(fwd) ? fmt(fwd*100,6) + "%" : "—";
  $("#fuW1").textContent = signed(w1,6);
  $("#fuW2").textContent = signed(w2,6);
  $("#fuSig").textContent = fmt(sf,6);
  $("#fuVar").textContent = signed(v,4);
  $("#fuFx").innerHTML = (kind === "asset"
      ? "=" + fmt(S,4) + "*<b>EXP</b>(" + fmt(y,6) + "*" + fmt(T,4) + ") = <b>" + fmt(F,6) + "</b>"
      : "=<b>EXP</b>(−" + fmt(yn,6) + "*" + fmt(T+N,4) + " + " + fmt(y,6) + "*" + fmt(T,4) + ")*" + fmt(S,2) + " = <b>" + fmt(F,6) + "</b>")
    + " &nbsp;·&nbsp; w = [ " + signed(w1,4) + " ; " + signed(w2,4) + " ] in <b>money</b>";
  var vn = $("#fuNote");
  vn.className = "verdict";
  vn.innerHTML = "Weights <b>" + signed(w1,4) + "</b> (" + lbl1 + ") and <b>" + signed(w2,4) + "</b> (" + lbl2 + "). σ of dFu = <b>"
    + fmt(sf,6) + "</b>, so VaR = <b>" + signed(v,4) + "</b> — <b>in money, not percent</b>, because the contract is worth nothing at inception."
    + (kind === "zcb" ? " The two weights sum to <b>" + signed(w1+w2,6) + "</b> = −N·B₀, so the position is net long duration by the underlying's extra " + fmt(N,2) + " years." : "");
  drawFutures(kind, S, T, y, N, yn);
}
function drawFutures(kind, S, T, y, N, yn){
  var svg = $("#fuChart"), i, Tmax = Math.max(1, T*2), pts = [], lo = 1e18, hi = -1e18, base;
  base = kind === "asset" ? S : S*Math.exp(-yn*(T+N));
  for(i = 0; i <= 60; i++){
    var t = Tmax*i/60, f;
    if(kind === "asset") f = S*Math.exp(y*t);
    else f = S*Math.exp(-yn*(t+N) + y*t);
    pts.push([t, f]);
    if(f < lo) lo = f; if(f > hi) hi = f;
  }
  lo = Math.min(lo, base); hi = Math.max(hi, base);
  if(!(hi > lo)) hi = lo + 1;
  var yt = [], xt = [];
  for(i = 0; i <= 4; i++) yt.push(lo + (hi-lo)*i/4);
  for(i = 0; i <= 4; i++) xt.push(Tmax*i/4);
  var sc = frame(svg, {W:560, H:220, m:{l:62,r:14,t:18,b:34}, x0:0, x1:Tmax, y0:lo, y1:hi, yticks:yt, xticks:xt,
    yfmt:function(v){ return fmt(v, hi > 200 ? 0 : 2); }, xfmt:function(v){ return fmt(v,2) + "y"; }, xlab:"time to delivery", ylab:"futures price"});
  svg.appendChild(svgEl("line",{x1:62, x2:546, y1:sc.y(base), y2:sc.y(base), stroke:cssVar("--gold"), "stroke-width":2, "stroke-dasharray":"5 4"}));
  series(svg, pts, sc, cssVar("--accent"), {w:2.4});
  svg.appendChild(svgEl("line",{x1:sc.x(T), x2:sc.x(T), y1:18, y2:186, stroke:cssVar("--bad"), "stroke-width":2}));
}
["#fuKind","#fuS","#fuT","#fuY","#fuN","#fuYn","#fuSs","#fuSy","#fuSy2","#fuR","#fuC"].forEach(function(s){ $(s).addEventListener("input", futuresBench); });
CHARTS.push(futuresBench); futuresBench();

TOOL_TALK["Futures VaR bench"] = function(target){
  var kind = $("#fuKind").value, w1 = tn("#fuW1"), w2 = tn("#fuW2");
  if(!isFinite(w1) || !isFinite(w2)) return ["sad","I need a positive spot, a positive time to delivery and sensible rates (｡•́ - •̀｡)"];
  if(target && target.id === "fuKind")
    return kind === "zcb"
      ? ["intense","Now a bond futures, so <b>two yields</b>: the underlying's at T+N and the financing rate at T. Weights <b>" + tv("#fuW1") + "</b> and <b>" + tv("#fuW2") + "</b> — opposite signs, and they do <em>not</em> cancel."]
      : ["happy","Futures on an asset ♪ w = [S₀ ; T·S₀] = [<b>" + tv("#fuW1") + "</b> ; <b>" + tv("#fuW2") + "</b>]. Both in money, because there is no percentage return to compute."];
  if(kind === "zcb" && num("#fuN",0) === 0)
    return ["smug","N = 0, so the underlying matures exactly at delivery and the weights become <b>" + tv("#fuW1") + "</b> and <b>" + tv("#fuW2") + "</b> — they cancel. <b>That is the one case where a bond futures hedge can be exact.</b>"];
  if(target && target.id === "fuY" && num("#fuY",0) < 0)
    return ["fluster","A negative financing rate (・・；) The futures price now falls below spot — the carry works against you instead of for you."];
  if(kind === "asset")
    return ["happy","<sub>0</sub>F<sub>T</sub> = <b>" + tv("#fuF") + "</b> by cost of carry. VaR <b>" + tv("#fuVar") + "</b> in money. Remember the sign on dy: a long futures is <b>short a bond</b>, so it <em>gains</em> when rates rise~"];
  return ["intense","<sub>0</sub>F<sub>T</sub> = <b>" + tv("#fuF") + "</b>, forward rate <b>" + tv("#fuFwd") + "</b> — discounting at that rate reproduces the same price, which is your check. VaR <b>" + tv("#fuVar") + "</b> in money."];
};
</script>
