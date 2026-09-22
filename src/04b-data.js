
/* ===================== QUIZZES (append-only) ===================== */
var QUIZ = {
fi: [
 {tier:"e", q:"The deck maps each activity to the risk it generates. <em>Security trading</em> leads to:", o:["Operational risk","Market risk","Credit risk","Strategic risk"], a:1,
  e:"<b>Security trading → market risk.</b> Operational risk comes from the business <em>process</em>, credit risk from <em>lending</em>, and strategic risk from <em>business strategy</em>."},
 {tier:"e", q:"Which of the two is the <em>monitoring, inspection and enforcement</em> of the rules?", o:["Regulation","Supervision","Both equally","Neither — that is the central bank's separate mandate"], a:1,
  e:"<b>Supervision.</b> Regulation <em>sets the framework</em> — the rules, laws, standards and requirements. Supervision checks whether a particular institution complies and operates safely and soundly."},
 {tier:"e", src:"Hull RMFI 11", q:"Which international body sets standards for <em>banks</em>, and hosts the Basel Committee?", o:["IOSCO","IAIS","BIS","IMF"], a:2,
  e:"<b>BIS</b> — the Bank for International Settlements. IOSCO covers securities markets and IAIS covers insurance. The IMF is not in the deck's list."},
 {tier:"e", q:"How many business days of data does BIS require as a minimum for a market risk model?", o:["100","250","500","1,000"], a:1,
  e:"<b>250 business days</b> — which is why every class workbook has 250 rows. McNeil and Frey (2000) suggest 1,000 would be better, but 250 is the requirement."},
 {tier:"e", q:"The institution is bankrupt at t = 1 when:", o:["The loss exceeds equity","The loss exceeds debt","Revenue falls below costs","Assets fall below their book value"], a:0,
  e:"<b>The loss exceeds equity</b>, equivalently assets fall below debt: Ã₁ &lt; D₀. Rewritten as a return that is r̃<sub>A</sub> &lt; −E₀/A₀ — a left-tail statement, which is what makes it a VaR problem."},
 {tier:"e", q:"An institution has an equity ratio of 8%. Its asset return has μ = 0 and σ = 10%. Using <span class='fx'>=NORMSDIST(-0.08/0.10)</span>, the probability of bankruptcy is about:", o:["8.0%","15.9%","21.2%","31.7%"], a:2,
  e:"NORMSDIST(−0.8) = <b>21.19%</b>. 15.87% is NORMSDIST(−1.0), which you get by forgetting that the equity ratio is 8% not 10%. 8% is just the equity ratio itself."},
 {tier:"e", q:"The deck lists three names for the same risk. Which set?", o:["Market risk, price risk, interest rate risk","Market risk, credit risk, liquidity risk","Strategic risk, group risk, enterprise-wide risk","Operational risk, process risk, model risk"], a:0,
  e:"<b>Market risk = price risk = interest rate risk.</b> Worth knowing, because lectures 3 to 5 spend their time measuring interest rate risk and call the result market risk."},
 {tier:"m", q:"The deck gives BBB a one-year PD of 0.997917%. With μ<sub>A</sub> = 0 and σ<sub>A</sub> = 10%, the required equity ratio is:", o:["9.98%","19.62%","23.27%","30.26%"], a:2,
  e:"z = NORMSINV(0.00997917) = −2.327130, so the capital ratio is −z × 10% = <b>23.27%</b>. 19.62% is BB and 30.26% is A. 9.98% is the PD itself misread as a ratio."},
 {tier:"m", q:"A bank has assets of 100m and debt of 92m. Its asset return has μ = 2% and σ = 10%. The probability of bankruptcy is closest to:", o:["10.0%","15.9%","21.2%","2.3%"], a:1,
  e:"The equity ratio is 8%, so PD = NORMSDIST((−0.08 − 0.02)/0.10) = NORMSDIST(−1.0) = <b>15.87%</b>. 21.19% comes from dropping the positive mean — a drift of +2% genuinely reduces the default probability."},
 {tier:"m", q:"According to the deck, risk is the possibility that the institution makes mistakes in its operations leading to:", o:["Financial loss only","Financial or non-financial loss","A regulatory penalty","A fall in the share price"], a:1,
  e:"<b>Financial or non-financial loss.</b> The inclusion of non-financial loss matters — reputational damage is a risk even when no money moves, which is why operational and strategic risk get their own categories."},
 {tier:"m", q:"Moving a bank's target rating from BB to AAA, at σ<sub>A</sub> = 10% and μ = 0, requires roughly how much extra capital as a share of assets?", o:["2.8 percentage points","8.4 percentage points","16.7 percentage points","24.5 percentage points"], a:2,
  e:"AAA needs 36.32% and BB needs 19.62%, so <b>16.71 percentage points</b>. For contrast, B to BB costs only 2.78 points — the schedule is steeply non-linear."},
 {tier:"m", q:"A trading book's VaR model is sound, but 40% of the book sits with one issuer. The deck would call the <em>amplifier</em> here:", o:["Model risk","Concentration risk","Liquidity risk","Enterprise-wide risk"], a:1,
  e:"<b>Concentration risk</b>, which the deck lists as its own category alongside enterprise-wide and group risk. The underlying source is credit; concentration is what turns one default into a book-ending event."},
 {tier:"d", q:"Why is the capital requirement so steeply non-linear in the target rating?", o:["Because rating agencies charge more for higher ratings","Because the normal density thins out rapidly in the tail, so each extra unit of safety costs progressively more capital","Because regulators impose a surcharge on systemically important banks","Because the asset volatility itself rises as leverage falls"], a:1,
  e:"<b>It is the shape of the tail.</b> The quantile function is steep where the density is thin, so buying the last sliver of safety costs disproportionately. This is the entire economics of bank capital, and it is why almost no bank targets AAA."},
 {tier:"d", q:"A 250-day estimation window is a compromise. What exactly is being traded off?", o:["Computation time against precision","Statistical precision against staleness — a longer window estimates the parameters better but assumes the process has not changed","Regulatory compliance against shareholder return","Data cost against model complexity"], a:1,
  e:"<b>Precision against staleness.</b> The law of large numbers says μ̂ and σ̂ converge as T grows, but the deck immediately warns that return <em>behaviour may differ from expected behaviour</em> — the process itself moves. That tension is exactly what motivates EWMA in lecture 2."},
 {tier:"d", q:"BBB's PD of 0.997917% implies a z of −2.3271, almost exactly the 99% VaR multiplier. The most useful reading of that coincidence is:", o:["Rating agencies calibrate their scales to VaR models","An investment-grade floor is, in effect, a 99%-confidence solvency statement","VaR at 99% was chosen because BBB is the investment-grade boundary","It is a numerical accident with no interpretation"], a:1,
  e:"<b>An investment-grade floor is a 99%-confidence statement.</b> Saying \"hold enough capital to stay BBB\" and \"hold enough capital to cover the 99% one-year VaR\" are nearly the same instruction. The causation in the third option runs the wrong way, and the first is not supported by anything in the deck."}
],

mr: [
 {tier:"e", q:"<span class='fx'>=NORMSINV(0.01)</span> returns:", o:["2.326348","−2.326348","−1.644854","0.010000"], a:1,
  e:"<b>−2.326348.</b> Negative, because it is the left tail. −1.644854 is NORMSINV(0.05). The deck's table rounds it to −2.33, but the workbooks use the function at full precision."},
 {tier:"e", q:"The multiplier 1.96 belongs to which threshold α?", o:["1.0%","2.5%","5.0%","10.0%"], a:1,
  e:"<b>α = 2.5%</b>, confidence 97.5%. A 95% VaR wants <b>1.644854</b>. Using 1.96 for a 95% VaR overstates it by 19.2% — and one lecture-3 slide prints exactly that error."},
 {tier:"e", q:"A stock's return is N(μ = 0.02, σ = 0.05). Using the deck's z = −2.33, the 1% quantile of the return is:", o:["−0.0965","−0.1165","−0.0622","+0.1365"], a:0,
  e:"0.02 + (−2.33 × 0.05) = 0.02 − 0.1165 = <b>−0.0965</b>. −0.1165 is the z·σ term with the mean left out. −0.0622 is the 5% answer. At full precision the 1% figure is −0.096317."},
 {tier:"e", q:"For the same stock, the probability of <em>any</em> loss is <span class='fx'>=NORMSDIST((0-0.02)/0.05)</span>, which is:", o:["0.0965","0.1587","0.3446","0.5000"], a:2,
  e:"NORMSDIST(−0.4) = <b>0.3446</b>. A 34.46% chance of losing money on a stock with a positive expected return. Losing money is ordinary; losing 9.65% is not."},
 {tier:"e", src:"Hull RMFI 11", q:"Which coherence property does VaR fail?", o:["Monotonicity","Translation invariance","Homogeneity","Subadditivity"], a:3,
  e:"<b>Subadditivity.</b> VaR satisfies the other three. Failing subadditivity means merging two books can <em>raise</em> measured risk, so a bank could lower its capital by splitting a desk in two."},
 {tier:"e", src:"Hull RMFI 11", q:"Expected shortfall is:", o:["The largest loss that will not be exceeded at a given confidence","The expected loss given that the loss exceeds VaR","The standard deviation of losses in the tail","The average of all losses over the horizon"], a:1,
  e:"<b>The expected loss given that the loss is greater than the VaR level.</b> Also called conditional VaR, C-VaR or tail loss. The first option is VaR itself."},
 {tier:"e", q:"A daily σ of 0.8359212% annualises, using 252 trading days, to:", o:["2.1060%","13.2698%","21.0652%","0.0527%"], a:1,
  e:"0.8359212% × √252 = 0.8359212% × 15.8745 = <b>13.269837%</b>. 210.65% would be multiplying by 252 instead of √252 — volatility scales with the square root of time."},
 {tier:"m", q:"The expected-shortfall multiplier e<sup>−z²/2</sup>/(√(2π)α) at α = 1% is:", o:["2.326348","2.665214","2.062713","1.145664"], a:1,
  e:"<b>2.665214.</b> 2.326348 is the VaR multiplier, 2.062713 is the ES multiplier at 5%, and 1.145664 is the <em>ratio</em> ES ÷ VaR at 99%."},
 {tier:"m", src:"Hull RMFI 11", q:"A project loses $1m with probability 0.98 and $10m with probability 0.02. Its 97.5% expected shortfall is:", o:["$1.0m","$5.5m","$8.2m","$10.0m"], a:2,
  e:"The worst 2.5% is the whole 2% at $10m plus the remaining 0.5% at $1m: (0.02×10 + 0.005×1)/0.025 = 0.205/0.025 = <b>$8.2m</b>. $5.5m is the unweighted average of 1 and 10, which ignores how much of the tail each occupies."},
 {tier:"m", src:"Hull RMFI 11", q:"Two <em>independent</em> such projects are combined. The portfolio's 97.5% VaR is:", o:["$2m","$11m","$20m","$8.2m"], a:1,
  e:"Outcomes are $2m at 0.9604, $11m at 0.0392, $20m at 0.0004. Since 0.9604 &lt; 0.975 ≤ 0.9996, the quantile jumps to <b>$11m</b>. $2m is the sum of the individual VaRs, and the fact that 11 &gt; 2 is precisely the subadditivity violation."},
 {tier:"m", q:"A one-day VaR uses μ = −0.046% and σ = 0.836%. The correct 10-day 99% figure is:", o:["−6.609%","−6.295%","−2.077%","−19.906%"], a:0,
  e:"μ×10 + z×σ×√10 = −0.4597% − 2.326348 × 0.836% × 3.16228 = <b>−6.609%</b>. −6.295% comes from multiplying the whole one-day VaR of −1.9906% by √10, which wrongly scales the mean by √10 instead of 10. −19.906% scales everything by 10."},
 {tier:"m", q:"The deck tests H₀: μ = 0 with t = μ̂√T/σ̂. With 10 observations, mean 0.0289 and variance 0.002106:", o:["t = 1.9914, and you cannot reject μ = 0","t = 1.9914, so μ is significantly different from zero","t = 43.42, so μ is significantly different from zero","t = 0.6293, and you cannot reject μ = 0"], a:0,
  e:"√10 × 0.0289 / √0.002106 = 0.091383 / 0.045891 = <b>1.9914</b>, below 2.2622 (the two-tailed 5% value at 9 df), so <b>you cannot reject μ = 0</b>. t = 43.42 comes from dividing by the variance instead of the standard deviation. Note the deck's own concluding sentence is garbled on this slide."},
 {tier:"d", q:"VaR fails subadditivity in the deck's two-project example, yet it is subadditive for jointly normal returns. Why?", o:["Because the projects are independent, and independence always breaks subadditivity","Because the loss distributions are discrete and lumpy, so the quantile can jump past a large probability mass rather than moving smoothly","Because the confidence level is 97.5% rather than 99%","Because VaR is only coherent when the mean is set to zero"], a:1,
  e:"<b>It is the lumpiness.</b> With a discrete distribution the 97.5% quantile leaps from $2m to $11m because the $2m outcome carries only 96.04% of the probability. Under normality the quantile is a smooth multiple of σ, and σ is subadditive, so VaR inherits the property. That is why the flaw stays hidden in nearly every other example in this course."},
 {tier:"d", q:"The deck states three conditions for VaR<sub>T</sub> = VaR<sub>1</sub>√T. Which one does this course routinely violate?", o:["Independence across days","Normality","Zero mean","None — the course satisfies all three"], a:2,
  e:"<b>Zero mean.</b> This course keeps μ, so the whole VaR cannot be multiplied by √T: the mean scales with <b>T</b> and the volatility with <b>√T</b>. The class workbooks get this right — the three-day cell reads <span class='fx'>=K22*3+NORMSINV(0.01)*K23*SQRT(3)</span>. Independence and normality are also questionable in reality, but they are not what the course's own arithmetic breaks."},
 {tier:"d", q:"Lowering λ in an EWMA model from 0.97 to 0.94 does what?", o:["Makes the estimate react faster to a volatility spike, and noisier between spikes","Makes the estimate react slower and smoother","Reduces the amount of data that must be stored","Increases the weight on the oldest observations"], a:0,
  e:"<b>Faster and noisier.</b> The first weight is 1 − λ, so it rises from 3% to 6%, and the effective window 1/(1−λ) falls from about 33 days to about 17. Storage is unaffected — the deck's point is that EWMA needs almost none at any λ. And lower λ puts <em>less</em> weight on old data, not more."},
  {tier:"m", q:"Every VaR in these five decks is computed by assuming the risk factors are normal and reducing each instrument to a weight vector over them. In the wider literature that approach is called:", o:["Historical simulation","Model building — the variance-covariance or delta-normal approach","Monte Carlo simulation","Backtesting"], a:1,
   e:"<b>Model building.</b> Historical simulation instead applies the last few hundred days of <em>actual</em> factor moves to today's book and reads a percentile off the result; Monte Carlo draws scenarios from a fitted distribution and reprices properly in each. Backtesting is not an approach at all — it is how you check any of the three afterwards. The course's choice is why an option enters only through Delta and Rho: model building is a <b>first-order</b> approximation."},
  {tier:"d", q:"A bank's 99% one-day VaR produced <b>14 exceptions in 250 trading days</b>. The most defensible conclusion is:", o:["The model is acceptable — exceptions arrive at random","The model understates risk: about 2.5 exceptions were expected","The model overstates risk and is tying up capital needlessly","Nothing can be concluded without also computing expected shortfall"], a:1,
   e:"<b>It understates risk.</b> At 99% confidence you expect 1% of 250 ≈ <b>2.5</b> exceptions a year; fourteen is nearly six times that. Two refinements worth a mark: exceptions should also be <em>independent</em> — four in one week is worse news than four spread across the year, because it means the model missed a regime — and backtesting a ten-day VaR on overlapping ten-day windows is not a fair test, because the windows share data."},
],

fix: [
 {tier:"e", q:"Why can't you estimate a bond's expected return and volatility from its own price history?", o:["Bond prices are not published frequently enough","Time to maturity shrinks daily, so yesterday's price belongs to a different instrument","Bond returns are not normally distributed","Coupon payments make the series discontinuous"], a:1,
  e:"<b>The maturity changes under you.</b> A five-year bond was a 5.004-year bond last week, so the series mixes instruments. Model the <em>yield</em> at a fixed maturity instead, or use the Zero Rate Return index."},
 {tier:"e", q:"Modified duration relates to Macaulay duration how?", o:["D<sub>mod</sub> = D<sub>mac</sub> × (1 + y)","D<sub>mod</sub> = D<sub>mac</sub> / (1 + y)","D<sub>mod</sub> = D<sub>mac</sub> − 1","They are the same thing"], a:1,
  e:"<b>D<sub>mod</sub> = D<sub>mac</sub>/(1 + y)</b>, so modified is always the <em>smaller</em> of the two. Multiplying instead of dividing is a common slip and overstates the VaR by a factor of (1+y)²."},
 {tier:"e", q:"A one-year zero with THB 1,000,000 par at a 3% yield compounded semiannually is worth:", o:["970,661.75","970,873.79","1,030,225.00","985,221.67"], a:0,
  e:"1,000,000/(1 + 0.03/2)² = 1,000,000/1.030225 = <b>970,661.75</b>. 970,873.79 is 1,000,000/1.03, which forgets to halve the rate and double the periods."},
 {tier:"e", q:"That bond's modified duration, in periods of six months, is:", o:["2.0000","1.9704","1.9417","0.9852"], a:1,
  e:"Macaulay is exactly 2 periods (all the PV sits at period 2), so D<sub>mod</sub> = 2/1.015 = <b>1.9704433</b>. 2.0000 is Macaulay, not modified."},
 {tier:"e", q:"For cash flow t of a coupon bond, the weight that multiplies dy<sub>t</sub> is:", o:["PV<sub>t</sub>/B<sub>0</sub>","(PV<sub>t</sub>/B<sub>0</sub>) × (−duration<sub>t</sub>)","−duration<sub>t</sub>","CF<sub>t</sub>/ΣCF"], a:1,
  e:"<b>The PV share times minus the duration.</b> The PV share alone is the portfolio weight; it has to be multiplied by the cash flow's own duration to become the loading on dy<sub>t</sub>. That single product is what these exam questions test."},
 {tier:"e", q:"The adjusted weights of a coupon bond sum to:", o:["1","0","minus the Macaulay duration","minus the modified duration"], a:2,
  e:"<b>Minus the Macaulay duration</b> — under continuous discounting, since Σw<sub>t</sub>(−t) = −Σt·w<sub>t</sub>. On the five-year 3% bond that is −4.7192. A free check on your weight column."},
 {tier:"e", q:"A zero-coupon bond's Macaulay duration equals:", o:["Its maturity","Half its maturity","Its maturity divided by (1+y)","Its coupon-weighted average life"], a:0,
  e:"<b>Its maturity</b>, because all the present value sits at one date. It follows that any <em>coupon</em> bond's duration must be shorter than its maturity — a one-line sanity check on any duration you compute."},
 {tier:"m", q:"For the T-bill with D<sub>mod</sub> = 1.9704433, mean dy = −0.000175 and σ<sub>dy</sub> = 0.000889522323, the 99% VaR in money on a price of 970,661.75 is:", o:["−3,623.18","−3,957.56","−3,958.00","−1,838.71"], a:0,
  e:"μ<sub>B</sub> = +0.00034483 and σ<sub>B</sub> = 0.00175275, so VaR = 0.00034483 − 2.326348 × 0.00175275 = −0.00373269, times 970,661.75 = <b>−3,623.18</b>. −3,957.56 drops the positive mean, which here makes the answer <em>worse</em>."},
 {tier:"m", q:"On the five-year 3% coupon bond, the share of total value sitting in the final cash flow is closest to:", o:["20%","50%","89%","100%"], a:2,
  e:"91.8128/103.3000 = <b>88.88%</b>. Almost all the risk is at the five-year point on the curve, which is why the adjusted weight there (−4.4440) dwarfs the other four."},
 {tier:"m", q:"Component VaRs are useful for allocating risk to desks because:", o:["They are always smaller than standalone VaRs","They sum exactly to the portfolio VaR","They are easier to compute than marginal VaRs","They do not depend on correlations"], a:1,
  e:"<b>They sum exactly</b>, by Euler's theorem, because VaR is homogeneous of degree one in the position sizes. Standalone VaRs do not add up and would over-charge every desk. They very much do depend on correlations — that is the point."},
 {tier:"m", q:"A slide computes a 5% VaR as −0.02636% + (−1.96) × 0.61286% and reports −1.0344%. What happened?", o:["The reported answer is wrong; −1.96 gives −1.2276%","The printed multiplier is wrong; the answer used NORMSINV(0.05) = −1.644854","Both are right — the difference is rounding","The mean was omitted from the reported answer"], a:1,
  e:"<b>The printed multiplier is the error.</b> −1.96 would give −1.22756%; reproducing −1.0344% needs z = −1.644854, which is exactly what the workbook cell contains. Remember −1.96 belongs to α = 2.5%."},
 {tier:"m", q:"Under <em>discrete</em> discounting, the multiplier applied to a cash flow's PV weight should be:", o:["−t","−t/(1 + y<sub>t</sub>)","−t × (1 + y<sub>t</sub>)","−1/t"], a:1,
  e:"<b>−t/(1 + y<sub>t</sub>)</b>, the modified duration. The plain <b>−t</b> is the <em>continuous</em>-compounding multiplier. The class coupon-bond sheet mixes them — discrete PVs with −t — which overstates its VaR by about 2.3%."},
 {tier:"d", q:"On the coupon-bond example, VaR is −0.35251% with the mean and −0.35473% without it. Why is the zero-mean version the <em>more</em> conservative one here?", o:["Because setting the mean to zero always widens the distribution","Because μ̂<sub>P</sub> happens to be positive, so removing it removes a favourable drift","Because the zero-mean formula uses a different z","Because the mean is estimated with error, which the zero-mean version accounts for"], a:1,
  e:"<b>μ̂<sub>P</sub> is positive</b> (+2.23×10⁻⁵), because yields fell on average over the window, which is good for a bond. Strip it out and you lose that cushion. The lesson is general: <b>check the sign of μ̂ before claiming that ignoring it is safe</b> — on the option example the mean runs the other way."},
 {tier:"d", q:"A risk manager asks for \"the VaR contribution of the bond leg\". Component VaR and incremental VaR give different answers. What is the difference?", o:["They are the same quantity computed two ways","Component VaR is the local derivative times the position; incremental VaR is the actual change in portfolio VaR if the position were removed entirely","Incremental VaR ignores correlations while component VaR includes them","Component VaR applies only to linear instruments"], a:1,
  e:"<b>A derivative versus a finite difference.</b> Component VaR is exact as an allocation (the parts sum to the whole) but only approximates what removing the position would do. Incremental VaR answers the removal question directly. On the class equity book: component 1,436,390 against incremental 1,252,264 — both correct, for different questions."},
 {tier:"d", q:"Why can the cash-flow durations be folded into <b>w</b>, leaving <b>Ω</b> as the raw matrix of yield-change covariances?", o:["Because durations are approximately constant over short horizons","Because each bond return is a fixed multiple of a single yield change, so the multipliers factor straight out of every covariance","Because the covariance matrix is symmetric","Because the yields are assumed uncorrelated"], a:1,
  e:"<b>Linearity.</b> Since r<sub>Bi</sub> = −i·dy<sub>i</sub>, Cov(r<sub>Bi</sub>, r<sub>Bj</sub>) = (−i)(−j)Cov(dy<sub>i</sub>, dy<sub>j</sub>) — the durations come out as plain scalars. So you can estimate Ω once from the raw yield data and reuse it for <em>every</em> bond, which is exactly why the class workbooks compute <span class='fx'>varcovar</span> on the dy columns and never on bond returns."}
],

opt: [
 {tier:"e", q:"The delta of a European call is:", o:["N(d₂)","N(d₁)","−N(−d₁)","e<sup>−yT</sup>N(d₂)"], a:1,
  e:"<b>N(d₁)</b>, computed as <span class='fx'>=NORMSDIST(d1)</span>. −N(−d₁) is the <em>put's</em> delta. e<sup>−yT</sup>N(d₂) is the digital call's price."},
 {tier:"e", q:"The rho of a European call is:", o:["T·K·e<sup>−yT</sup>·N(d₂)","S·N(d₁)","−T·K·e<sup>−yT</sup>·N(−d₂)","S·√T·φ(d₁)"], a:0,
  e:"<b>T·K·e<sup>−yT</sup>·N(d₂).</b> The third is the put's rho and the fourth is vega, which this course does not use in the VaR."},
 {tier:"e", q:"The option's weight vector is:", o:["[Δ ; ρ]","[Δ·S/Op ; ρ·1/Op]","[Δ/S ; ρ/Op]","[Δ·Op/S ; ρ·Op]"], a:1,
  e:"<b>[Δ·S/Op ; ρ·1/Op].</b> It comes from dividing dOp = Δ·dS + ρ·dy through by Op and multiplying the first term by S/S, so that the factor becomes r<sub>S</sub> rather than dS."},
 {tier:"e", q:"If d₁ = 0.1801857 and σ√T = 0.1326984, then d₂ is:", o:["0.3128841","0.0474873","1.3578","−0.0474873"], a:1,
  e:"d₂ = d₁ − σ√T = 0.1801857 − 0.1326984 = <b>0.0474873</b>. Adding instead of subtracting gives 0.3128841 — always subtract."},
 {tier:"e", q:"For the class example the call's two weights are 8.4714078 and 9.4714078. Here T = 1. The fact that they differ by exactly 1:", o:["Is a coincidence of these particular inputs","Follows from w_rS − w_dy/T = 1, which always holds — so with T = 1 the weights differ by exactly 1","Holds only for at-the-money options","Indicates a rounding error in the workbook"], a:1,
  e:"<b>It follows from an identity that always holds:</b> since ρ/T = Ke<sup>−yT</sup>N(d₂), w<sub>rS</sub> − w<sub>dy</sub>/T = [S·N(d₁) − Ke<sup>−yT</sup>N(d₂)]/Op = Op/Op = 1, for calls, puts and forwards alike. With T = 1 that is a plain difference of 1. <b>For T ≠ 1 divide the dy weight by T before checking</b> — the raw difference will not be 1."},
 {tier:"e", q:"With σ = 10% per period, the binomial up move u = e<sup>σ</sup> − 1 is:", o:["10.0000%","10.5171%","11.0517%","9.5163%"], a:1,
  e:"e<sup>0.10</sup> − 1 = 1.105171 − 1 = <b>10.5171%</b>. 11.0517% forgets to subtract the 1, and 9.5163% is |d|, the down move."},
 {tier:"e", q:"Which Greeks does this course actually use in an option's VaR?", o:["Delta and Gamma","Delta and Rho","Delta, Gamma and Vega","All five"], a:1,
  e:"<b>Delta and Rho</b> — the sensitivities to the two risk factors, S and y. Gamma, Vega and Theta appear in the class calculator but never enter the weight vector, because the method is a <em>first-order</em> Taylor expansion."},
 {tier:"m", q:"S = K = 1,382.41, y = 1.510592%, σ = 13.269837%, T = 1, N(d₁) = 0.5714966, N(d₂) = 0.5189376. The call is worth:", o:["83.4134","62.6878","790.03","706.63"], a:0,
  e:"1382.41 × 0.5714966 − 1382.41 × e<sup>−0.01510592</sup> × 0.5189376 = 790.0 − 706.6 = <b>83.4134</b>. 62.6878 is the put, 790.03 is just the first term, and 706.63 is Rho."},
 {tier:"m", q:"With S = 1,000, u = 10.5171%, d = −9.5163%, C₁u = 105.17 and C₁d = 0, the replicating delta is:", o:["0.105171","0.524979","0.500000","1.050000"], a:1,
  e:"Δ = (105.17 − 0)/(1000 × (0.105171 + 0.095163)) = 105.17/200.334 = <b>0.524979</b>. Note the denominator is S(u − d) and d is negative, so the bracket <em>adds</em>."},
 {tier:"m", q:"You are long one option with delta Δ. To delta-hedge, you hold:", o:["+Δ shares","−Δ shares","+1/Δ shares","−Δ × S/Op shares"], a:1,
  e:"<b>−Δ shares.</b> Then dPortfolio = dOp − Δ·dS = Δ·dS − Δ·dS = <b>0</b>. The last option confuses the hedge ratio with the option's weight in the VaR, which is a different quantity."},
 {tier:"m", q:"Two assets with μ = 12%, σ = 25% each and ρ = 0.55, held 50/50. The portfolio σ is:", o:["25.00%","22.01%","17.68%","19.36%"], a:1,
  e:"√(2 × 0.5² × 0.25² + 2 × 0.55 × 0.5 × 0.5 × 0.25²) = √0.0484375 = <b>22.0085%</b>. 17.68% is the ρ = 0 answer, so it overstates the benefit; 25% ignores diversification entirely. The resulting VaR is −39.28% against −46.25% for one asset alone."},
 {tier:"m", q:"The deck checks its central-difference method on y = 2x + 1 and gets exactly 2. Why exactly?", o:["Because Δx = 0.1 is small enough","Because the central difference is exact for any linear function, at any step size","Because the function passes through the origin","Because the errors from the up and down steps happen to cancel at x = 10"], a:1,
  e:"<b>Exact for linear functions at any step size</b>, because the second and higher derivatives are zero. For a curved function like an option price, too large a step picks up curvature and too small a step loses precision to rounding. ΔS = 1 on a spot of 1,382 is about 0.07% — a sensible default."},
 {tier:"d", q:"A one-step binomial prices the assignment put at 0.7864 while Black-Scholes gives 3.5367 — a factor of 4.5. Yet the two VaRs agree to within 0.005 percentage points. Why?", o:["Because VaR is insensitive to the option price","Because the price appears in the denominator of every weight, so a price error largely cancels against the leverage it creates","Because both methods use the same delta","Because the errors are offset by the covariance matrix"], a:1,
  e:"<b>The price cancels.</b> Each weight is (sensitivity × value)/Op, so underpricing the option by a factor of 4.5 inflates every weight by about the same factor — and then the whole return distribution is scaled the same way. The <em>relative</em> risk structure survives. It is not the delta: the binomial delta is −0.3455 against Black-Scholes' −0.0937."},
 {tier:"d", q:"The deck says assets with the same source of risk can be offset, while correlated assets can only be diversified. The sharpest statement of the difference is:", o:["Hedging is cheaper than diversification","Hedging removes risk exactly; diversification dilutes it but leaves a residual","Diversification works only for equities","Hedging requires derivatives and diversification does not"], a:1,
  e:"<b>Remove versus dilute.</b> A delta hedge drives the exposure to <em>exactly</em> zero because the two positions share the identical risk factor. Diversification with ρ = 0.55 leaves σ at 22.01% rather than zero, because the second asset brings its own independent variation. Cost is not the distinction, and neither is the instrument type."},
 {tier:"d", q:"Both the ATM call and the ATM put on the index have a one-day VaR near −18%, against the underlying's −1.99%. What does that factor of nine mainly reflect?", o:["The options' gamma","Gearing: the option's value is small relative to the exposure Δ·S it carries","The correlation between r<sub>S</sub> and dy","Time decay over the one-day horizon"], a:1,
  e:"<b>Gearing.</b> The weight Δ·S/Op is about 9.47 for the call, because Δ·S ≈ 790 sits on top of an option worth only 83.4. Gamma never enters this first-order method; the r<sub>S</sub>–dy correlation is only 0.0583 and barely matters; and theta is not a risk factor in this framework at all."}
],

fut: [
 {tier:"e", q:"A forward contract to buy at <sub>0</sub>F<sub>T</sub> is equivalent to:", o:["Long one call and long one put, both struck at <sub>0</sub>F<sub>T</sub>","Long one call and short one put, both struck at <sub>0</sub>F<sub>T</sub>","Short one call and long one put","Long one call only"], a:1,
  e:"<b>Long call + short put</b>, both at K = <sub>0</sub>F<sub>T</sub>. The payoff table shows the portfolio pays S<sub>T</sub> − <sub>0</sub>F<sub>T</sub> in <em>both</em> states, matching the forward exactly. So V<sub>F</sub> = C − P."},
 {tier:"e", q:"A futures contract is equivalent to:", o:["Long the asset and borrowing its spot price","Long the asset and lending its spot price","Short the asset and borrowing","Long a call and long a bond"], a:0,
  e:"<b>Long the asset, borrow S₀.</b> Net cash flow today is zero, matching the futures. No arbitrage then gives <sub>0</sub>F<sub>T</sub> = S₀e<sup>y<sub>T</sub>T</sup>."},
 {tier:"e", q:"A six-month futures on a stock at 100 with y<sub>T</sub> = 3% p.a. has a futures price of:", o:["101.50","101.5113","103.0455","100.0000"], a:1,
  e:"100 × e<sup>(0.03/12)×6</sup> = 100 × e<sup>0.015</sup> = <b>101.5113</b>. 103.0455 uses a full year instead of six months."},
 {tier:"e", q:"Why does this course never compute a percentage return for a futures contract?", o:["Because futures are marked to market daily","Because the contract's value at inception is zero, so there is nothing to divide by","Because futures returns are not normally distributed","Because the margin, not the notional, is the true investment"], a:1,
  e:"<b>Zero initial value.</b> A percentage return would be division by zero — Excel returns <code>#DIV/0!</code>. So futures VaR is computed entirely in <b>money</b>, with w = [S₀ ; T·S₀], and the answer comes out in Baht."},
 {tier:"e", q:"For a futures on an asset, the weight vector is:", o:["[1 ; T]","[S₀ ; T·S₀]","[S₀ ; S₀/T]","[1/S₀ ; T/S₀]"], a:1,
  e:"<b>[S₀ ; T·S₀]</b>, for factors r<sub>S</sub> and dy<sub>T</sub>, in money. It comes from dFu = S₀r<sub>S</sub> + T·S₀·dy<sub>T</sub>. On the deck's example that is [100 ; 50]."},
 {tier:"e", q:"For a ZCB futures with T = 1 and an underlying maturing at 1.5 years, with B₀ = 0.924964, the weights are:", o:["[−1.5 ; +1.0]","[−1.387447 ; +0.924964]","[+1.387447 ; −0.924964]","[−0.924964 ; +1.387447]"], a:1,
  e:"w = [−(T+N) ; +T] × B₀ = [−1.5 ; +1.0] × 0.924964 = <b>[−1.387447 ; +0.924964]</b>. The signs matter: the long bond loses when <em>its</em> yield rises, while the short financing leg gains when the funding yield rises."},
 {tier:"e", q:"Which cash flows of the underlying bond enter a coupon-bond futures price?", o:["All of them","Only those paid before delivery","Only those paid after delivery","Only the final principal repayment"], a:2,
  e:"<b>Only post-delivery cash flows.</b> Coupons paid before delivery go to whoever holds the bond in the meantime, not to the futures buyer."},
 {tier:"m", q:"For a forward, ρ<sub>C</sub> − ρ<sub>P</sub> simplifies to:", o:["T·K·e<sup>−yT</sup>","S","0","T·K·e<sup>−yT</sup>·N(d₂)"], a:0,
  e:"ρ<sub>C</sub> − ρ<sub>P</sub> = TKe<sup>−yT</sup>N(d₂) + TKe<sup>−yT</sup>N(−d₂) = TKe<sup>−yT</sup>[N(d₂) + N(−d₂)] = <b>TKe<sup>−yT</sup></b>, since the two normal terms sum to 1. Similarly Δ<sub>C</sub> − Δ<sub>P</sub> = 1, which is why w<sub>rS</sub> = S/V<sub>F</sub>."},
 {tier:"m", q:"A futures on a bond whose post-delivery cash flows total 108 undiscounted is quoted at 121.42. The quickest objection is:", o:["The discount rates must be negative","The futures price cannot exceed the undiscounted sum of the cash flows when rates are positive","The delivery date must be wrong","The coupon rate is inconsistent with the spot curve"], a:1,
  e:"<b>It exceeds the undiscounted total.</b> The price must sit between the PV of the post-delivery flows (97.53 here) and their face sum (108). 121.42 is outside that range, so no positive rate can produce it. This single check catches the lecture-5 slide."},
 {tier:"m", q:"With T = 2, X<sub>N</sub>B<sub>N</sub> = 1.621168 and X<sub>M</sub>B<sub>M</sub> = 74.067198, the financing element of the weight vector is:", o:["75.6884","151.3767","−151.3767","37.8442"], a:1,
  e:"+T × Σ(X<sub>k</sub>B<sub>k</sub>) = 2 × 75.688366 = <b>151.3767</b>. 75.6884 is what you get by dropping the T — and it is exactly what the deck's slide prints, even though the same slide uses T = 2 correctly in its other two rows."},
 {tier:"m", q:"dFu = dS + T·S₀·dy<sub>T</sub> carries a <em>plus</em> sign on the yield term. That means a long futures position:", o:["Loses when rates rise, like a bond","Gains when rates rise, because it is short a bond","Is unaffected by rates","Gains when rates rise only if the underlying is a bond"], a:1,
  e:"<b>Gains when rates rise.</b> The cost-of-carry portfolio is long the asset and <em>short</em> a bond, so rising rates cut the value of what you owe. Two minus signs — dB = −T·S₀·dy and dFu = dS − dB — make the plus."},
 {tier:"m", q:"The two weights of a ZCB futures sum to −N·B₀ rather than zero. That residual means:", o:["The position is net long duration by exactly the underlying's extra N periods of life","The position is perfectly hedged against rate moves","The financing leg has been double counted","B₀ was computed at the wrong maturity"], a:0,
  e:"<b>Net long duration by N periods.</b> −(T+N)B₀ + T·B₀ = −N·B₀. The exposure that survives is the underlying bond's life <em>beyond</em> the delivery date, and it is the structural source of basis risk in a bond-futures hedge."},
 {tier:"d", q:"A five-year bond is hedged with five ZCB futures contracts. The deck asks whether the net risk can be eliminated completely. The answer, and the reason:", o:["Yes — five contracts for five cash flows is an exact match","No — the bond loads on dy₁…dy₅ but the futures book loads on dy₂…dy₆ plus dy₁ through its shared financing leg, so six factors face five instruments with different loadings","Yes, but only if the correlations between yields are all 1","No, because futures contracts cannot be traded in fractional amounts"], a:1,
  e:"<b>Six factors, five instruments, mismatched loadings.</b> The futures reach a sixth point on the curve that the bond does not touch, and they all share one financing exposure to dy₁ that the bond's own dy₁ loading cannot offset. You can minimise the residual — that is what Solver is for — but not zero it. The residual is basis risk."},
 {tier:"d", q:"Why does the forward's weight vector collapse to w = [S/V<sub>F</sub> ; TKe<sup>−yT</sup>/V<sub>F</sub>], with all the C's and P's disappearing?", o:["Because C and P are approximately equal for an at-the-money forward","Because each leg's share of V<sub>F</sub> is multiplied by a sensitivity divided by that same leg's price, so the prices cancel, and the two deltas and two rhos then combine by put-call symmetry","Because the forward has no value at inception","Because V<sub>F</sub> is defined as C − P"], a:1,
  e:"<b>The prices cancel, then symmetry does the rest.</b> (C/V<sub>F</sub>)·Δ<sub>C</sub>·(S/C) = Δ<sub>C</sub>S/V<sub>F</sub> — the C is gone. Combining the legs gives (Δ<sub>C</sub> − Δ<sub>P</sub>)S/V<sub>F</sub>, and Δ<sub>C</sub> − Δ<sub>P</sub> = N(d₁) − (N(d₁) − 1) = 1. The same happens to the rhos via N(d₂) + N(−d₂) = 1. It has nothing to do with C ≈ P, and a forward entered at the market forward price would have V<sub>F</sub> = 0 exactly, which is a different case."},
 {tier:"d", q:"The lecture-5 slide gives Rho(call) as 25.29 where the correct value is 52.2937. Which check would have caught it fastest, without recomputing Rho?", o:["Comparing Rho(call) with Rho(put)","Checking that the forward's weights satisfy w_rS − w_dy/T = 1 (here T = 1, so they should differ by 1)","Verifying that C − P equals the deck's 0.38","Confirming that Delta(call) − Delta(put) = 1"], a:1,
  e:"<b>The w<sub>rS</sub> − w<sub>dy</sub>/T = 1 check on the weights</b> — with T = 1 here, a plain difference of 1. The deck's pair is 310.52 and 238.47, differing by 72.05 rather than 1 — an immediate red flag. Delta<sub>C</sub> − Delta<sub>P</sub> = 1 does hold on the deck's rounded deltas, so that check passes and tells you nothing; C − P = 0.38 is also correct; and comparing the two rhos is suggestive but not decisive, since they are genuinely different numbers."},
  {tier:"d", q:"A five-year coupon bond is exposed to dy₁ … dy₅. You hedge it with five zero-coupon-bond futures, each of which moves with its own dy<sub>(T+N)</sub> <em>and</em> with the financing rate dy<sub>T</sub>. Can the risk be eliminated completely?", o:["Yes — five contracts for five cash flows is an exact match","No — the position and the contracts together span six factors, so five contracts cannot zero every exposure","Yes, provided the contracts are held all the way to delivery","No, because a futures contract has no percentage return"], a:1,
   e:"<b>No.</b> Each contract carries <em>two</em> exposures, not one: −(T+N)B₀ on its own underlying rate and +T·B₀ on the shared financing rate. Five contracts therefore give you five free numbers against six exposures, and the system is short one instrument. The minimum-variance hedge — choose n to minimise (w + Hn)ᵀΩ(w + Hn) — removes most of the variance and leaves a residual. Saying <em>why</em> the residual exists is the point of the practice problem; a hedge that eliminated everything would mean the futures spanned the whole curve."},
],

xl: [
 {tier:"e", q:"The legacy function <span class='fx'>COVAR</span> is equivalent to which modern function?", o:["COVARIANCE.S","COVARIANCE.P","CORREL","VAR.S"], a:1,
  e:"<b>COVARIANCE.P</b> — the <em>population</em> version, dividing by n. This is the one legacy name in the course whose modern counterpart is not the obvious one, and it is why the class Ω matrices have slightly inconsistent divisors."},
 {tier:"e", q:"Rewriting <span class='fx'>=NORMSDIST(d1)</span> with the modern function requires:", o:["=NORM.S.DIST(d1)","=NORM.S.DIST(d1, TRUE)","=NORM.S.DIST(d1, FALSE)","=NORM.DIST(d1)"], a:1,
  e:"<b>=NORM.S.DIST(d1, TRUE).</b> The modern function requires the cumulative argument; <code>FALSE</code> gives you the <em>density</em> instead, which is how a gamma ends up in a delta cell."},
 {tier:"e", q:"In Excel 2019, entering a nested <span class='fx'>MMULT</span> with plain Enter instead of Ctrl+Shift+Enter gives you:", o:["#VALUE!","The top-left element of the matrix product","Zero","A circular reference warning"], a:1,
  e:"<b>The top-left element</b>, with no error at all. For the quadratic form that means w₁²Ω₁₁ instead of wᵀΩw — and the classic symptom is a portfolio σ that looks far too small."},
 {tier:"e", q:"<span class='fx'>=varcovar(F5:H255)</span> in the class workbooks is:", o:["A standard Excel array function","A VBA user-defined function supplied with the course files","Part of the Analysis ToolPak","A named range"], a:1,
  e:"<b>A VBA user-defined function</b>, which is why those files are saved as <code>.xlsm</code> and need macros enabled. In a blank workbook it returns <code>#NAME?</code>."},
 {tier:"e", q:"The class sheets compute yield changes as <span class='fx'>=(B5-B4)/100</span>. What does the /100 do?", o:["Converts a daily rate to an annual one","Converts a change quoted in percent into a decimal","Annualises the change","Corrects for the 250-day window"], a:1,
  e:"<b>Percent to decimal.</b> The spot rates are quoted as 2.012509 meaning 2.012509%, so the raw difference is in percentage points. Omit the division and every bond VaR is a hundred times too large."},
 {tier:"e", q:"Macaulay duration from a column of periods and a column of PV weights is:", o:["=SUM(weights)","=SUMPRODUCT(periods, weights)","=AVERAGE(periods)","=MMULT(periods, weights)"], a:1,
  e:"<b>=SUMPRODUCT(periods, weights).</b> It multiplies pairwise then adds, which <em>is</em> the definition of a PV-weighted average time. <code>SUM(weights)</code> would give 1."},
 {tier:"e", q:"Why do Excel's <span class='fx'>PRICE</span>, <span class='fx'>DURATION</span> and <span class='fx'>MDURATION</span> never appear in this course?", o:["They are only available with the Analysis ToolPak","They take a single yield to maturity and real settlement dates, while this course discounts each cash flow at its own spot rate over integer periods","They are less accurate than a cash flow table","They cannot handle semiannual coupons"], a:1,
  e:"<b>They cannot express what the course does.</b> A whole-curve valuation — CF<sub>t</sub>/(1+y<sub>t</sub>)<sup>t</sup> with a different y<sub>t</sub> for every t — has no single yield to maturity to feed them. Build the column instead."},
 {tier:"m", q:"<span class='fx'>STDEV</span> and <span class='fx'>STDEVP</span> differ how, and which does the course use?", o:["n−1 and n; the course uses STDEVP","n−1 and n; the course uses STDEV","n and n−1; the course uses STDEV","They are identical; the course uses either"], a:1,
  e:"<b>STDEV divides by n−1, STDEVP by n, and every class workbook uses STDEV</b> — matching the deck's σ̂² = (1/(T−1))Σ(r−μ̂)². Note the deck's later volatility slide writes 1/T instead, which is an internal inconsistency."},
 {tier:"m", q:"<span class='fx'>=MMULT(w, Om)</span> with w a 3×1 column and Ω a 3×3 matrix returns:", o:["The correct row vector","#VALUE!","#REF!","The transpose of the correct answer"], a:1,
  e:"<b>#VALUE!</b> The columns of the first array (1) must equal the rows of the second (3). You need <code>TRANSPOSE(w)</code> to make it a 1×3 row. This is one of the few mistakes here that Excel actually catches."},
 {tier:"m", q:"Your portfolio σ comes out implausibly small. The first thing to check is:", o:["Whether the correlations are too high","Whether the array formula was entered with Ctrl+Shift+Enter","Whether the weights sum to 1","Whether Ω is symmetric"], a:1,
  e:"<b>Ctrl+Shift+Enter.</b> Without it the nested <code>MMULT</code> silently returns one element instead of the full quadratic form, and for a diversified book that is a small fraction of the truth. Weights summing to 1 is not even a requirement here — adjusted weights sum to minus the duration."},
 {tier:"m", q:"Which formula computes σ<sub>P</sub>² without needing <span class='fx'>TRANSPOSE</span> at all?", o:["=SUMPRODUCT(w, MMULT(Om, w))","=SUM(w * Om * w)","=MMULT(w, Om, w)","=SUMSQ(MMULT(Om, w))"], a:0,
  e:"<b>=SUMPRODUCT(w, MMULT(Om, w)).</b> <code>SUMPRODUCT</code> performs the row-times-column step itself, so there is no orientation to get wrong. <code>MMULT</code> only ever takes two arrays, which rules out the third option."},
 {tier:"m", q:"You need to rebuild Ω in a workbook without the course's VBA. Which approach keeps the <em>sample</em> divisor consistently on and off the diagonal?", o:["Data → Data Analysis → Covariance","A grid of =COVARIANCE.S(...)","=COVAR(...) filled across a grid","Data → Data Analysis → Correlation"], a:1,
  e:"<b>A grid of COVARIANCE.S.</b> The ToolPak's Covariance tool writes static values using the <em>population</em> divisor; <code>COVAR</code> is also population. <code>=MMULT(TRANSPOSE(dev),dev)/(n-1)</code> on mean-centred data is the one-formula equivalent."},
 {tier:"d", q:"Pairing <span class='fx'>STDEV^2</span> on the diagonal with <span class='fx'>COVAR</span> off it is described here as a bug rather than a rounding issue. Why?", o:["Because the error compounds with the number of assets","Because the resulting matrix is not a valid covariance matrix of anything, and can in principle fail to be positive semi-definite — which makes a portfolio variance come out negative","Because Excel warns about it","Because it biases the correlations above 1"], a:1,
  e:"<b>The matrix stops being internally consistent.</b> A genuine covariance matrix uses one divisor throughout; mixing them produces a matrix that no dataset could have generated, and positive semi-definiteness is no longer guaranteed. The symptom would be <code>#NUM!</code> from <code>SQRT</code>. In practice the class error is only 0.4% at n = 250 and the VaRs are fine — but the reason to fix it is structural, not numerical."},
 {tier:"d", q:"The option workbook orders w as [dy ; r<sub>S</sub>]. Reversing it produces a wrong answer that Excel does not flag. Why not?", o:["Because MMULT ignores the sign of the weights","Because the dimensions still match, and MMULT has no notion of what each row means","Because the covariance matrix is symmetric, so order cannot matter","Because the two variances are similar in magnitude"], a:1,
  e:"<b>Dimensions match; labels do not exist.</b> A 1×2 times 2×2 times 2×1 chain is valid whichever way round the two elements sit, so Excel computes it happily — pairing the stock weight with the yield variance. Ω's symmetry makes Ω = Ωᵀ but does <em>not</em> make wᵀΩw invariant to permuting w. Checking the labels is the only defence."},
 {tier:"d", q:"A student wants to use <span class='fx'>MDURATION</span> to shortcut the coupon-bond weight vector. What is the deepest objection?", o:["MDURATION needs dates rather than year counts","MDURATION returns modified rather than Macaulay duration","A single portfolio duration collapses five separate yield exposures into one, so you lose the ability to let each point on the curve move differently","MDURATION cannot handle annual coupons"], a:2,
  e:"<b>It destroys the multi-factor structure.</b> The whole method rests on five <em>separate</em> loadings on dy₁…dy₅, so that Ω can express how differently the short and long ends move. One aggregate duration implicitly assumes a parallel shift. The dates issue is real but merely practical, and Macaulay versus modified is a one-line conversion."}
]
};

/* ===================== WORKED PROBLEMS ===================== */
var PSET = {
add: [
 {src:"Additional question 1", tier:"m",
  q:"A position consists of a <b>$300,000</b> investment in gold and a <b>$500,000</b> investment in silver. Daily volatilities are <b>1.8%</b> and <b>1.2%</b>, and the correlation between their returns is <b>0.6</b>. What is the <b>10-day 97.5% VaR</b> for the portfolio? By how much does diversification reduce the VaR? Find the <b>marginal VaR</b> and <b>component VaR</b> of gold and silver.",
  a:"<b>Step 1 · weights and z.</b> W₀ = 300,000 + 500,000 = 800,000, so w = [0.375 ; 0.625]. The sheet uses <span class='fx'>=NORM.S.INV(0.025)</span> = <b>−1.9599639845</b>."
    +"<div class='eq'>Ω = <span class='fr'><span>0.018² &nbsp; 0.018×0.012×0.6</span><span>0.018×0.012×0.6 &nbsp; 0.012²</span></span> = <span class='fr'><span>0.000324 &nbsp; 0.0001296</span><span>0.0001296 &nbsp; 0.000144</span></span><span class='lbl'>=D9^2, =D9*D10*D12, =D10^2 — build the matrix from the volatilities and the correlation, not from returns.</span></div>"
    +"<b>Step 2 · individual VaRs.</b> Each is z × σ × value, then × √10 for ten days."
    +"<div class='tablewrap'><table class='q'><thead><tr><th>Asset</th><th class='r'>1-day VaR ($)</th><th class='r'>1-day VaR (%)</th><th class='r'>10-day VaR ($)</th></tr></thead><tbody>"
    +"<tr><td>Gold</td><td class='r'>−10,583.81</td><td class='r'>−3.52794%</td><td class='r'>−33,468.93</td></tr>"
    +"<tr><td>Silver</td><td class='r'>−11,759.78</td><td class='r'>−2.35196%</td><td class='r'>−37,187.70</td></tr>"
    +"<tr class='pick'><td>Sum of parts</td><td class='r'>−22,343.59</td><td class='r'>—</td><td class='r'>−70,656.63</td></tr></tbody></table></div>"
    +"<b>Step 3 · portfolio σ.</b> <span class='fx'>{=SQRT(MMULT(MMULT(TRANSPOSE(w),Om),w))}</span>"
    +"<div class='eq'>σ<sub>P</sub>² = 0.375²(0.000324) + 2(0.375)(0.625)(0.0001296) + 0.625²(0.000144)<span class='lbl'>= 0.0000455625 + 0.00006075 + 0.00005625 = 0.0001625625, so σ<sub>P</sub> = <b>0.01275</b> exactly — a pleasingly round 1.275% per day.</span></div>"
    +"<b>Step 4 · portfolio VaR.</b>"
    +"<div class='eq'>1-day: −1.9599640 × 0.01275 × 800,000 = <b>−19,991.63</b>&nbsp;&nbsp;&nbsp;(−2.498954%)<br>10-day: −19,991.63 × √10 = <b>−63,219.09</b>&nbsp;&nbsp;&nbsp;(−7.902387%)<span class='lbl'>=$B$14*$B$22*B$11 then =B25*SQRT(10). Note the mean is zero throughout — this question gives no drift.</span></div>"
    +"<div class='note'><span class='eyebrow'>Benefit of diversification</span><b>−63,219.09 − (−70,656.63) = 7,437.54</b> over ten days. That is 10.5% of the undiversified sum. It would be zero at ρ = 1 and larger at ρ = 0.</div>"
    +"<b>Step 5 · marginal VaR.</b> The derivative of portfolio VaR with respect to the weight: <span class='fx'>{=B14/B22*MMULT(F9:G10,C9:C10)}</span>"
    +"<div class='eq'>marginal<sub>i</sub> = <span class='fr'><span>z<sub>α</sub></span><span>σ<sub>P</sub></span></span> (<b>Ω</b><b>w</b>)<sub>i</sub><span class='lbl'>Ωw = [0.375(0.000324) + 0.625(0.0001296) ; 0.375(0.0001296) + 0.625(0.000144)] = [0.00020250 ; 0.00013860]</span></div>"
    +"<div class='tablewrap'><table class='q'><thead><tr><th>Asset</th><th class='r'>Marginal (per unit weight)</th><th class='r'>Marginal ($ on 800,000)</th></tr></thead><tbody>"
    +"<tr><td>Gold</td><td class='r'>−0.0311288</td><td class='r'>−24,903.07</td></tr>"
    +"<tr><td>Silver</td><td class='r'>−0.0213060</td><td class='r'>−17,044.77</td></tr></tbody></table></div>"
    +"<b>Step 6 · component VaR.</b> Marginal × weight, then × W₀."
    +"<div class='tablewrap'><table class='q'><thead><tr><th>Asset</th><th class='r'>Component (%)</th><th class='r'>Component ($)</th><th class='r'>Share of VaR</th></tr></thead><tbody>"
    +"<tr><td>Gold</td><td class='r'>−1.167331%</td><td class='r'>−9,338.65</td><td class='r'>46.71%</td></tr>"
    +"<tr><td>Silver</td><td class='r'>−1.331623%</td><td class='r'>−10,652.98</td><td class='r'>53.29%</td></tr>"
    +"<tr class='pick'><td>Total</td><td class='r'>−2.498954%</td><td class='r'>−19,991.63</td><td class='r'>100.00%</td></tr></tbody></table></div>"
    +"<div class='note'><span class='eyebrow'>The check that matters</span>The components sum to <b>exactly</b> the portfolio VaR of −19,991.63. That is Euler's theorem, and it is the only thing that makes component VaR usable for allocation. If your two components do not sum to the total, the arithmetic is wrong.</div>"
    +"<div class='note'><span class='eyebrow'>Reading the answer</span>Gold is <b>37.5%</b> of the money but only <b>46.71%</b> of the risk — less disproportionate than its 1.8% volatility alone would suggest, because the 0.6 correlation means silver is not much of a diversifier. The sheet's own comment notes that raising gold's weight by 1% raises the one-day VaR, which follows directly from gold's larger marginal VaR.</div>"},

 {src:"Additional question 2", tier:"d",
  q:"Eleven days of 1-year and 2-year spot rates and the prices of stocks A and B are given. A portfolio holds <b>20 one-year ZCBs</b>, <b>20 two-year ZCBs</b> (FV THB 1,000 each), <b>100 shares of A</b> and <b>100 shares of B</b>. Find the VaR for a <b>one-day</b> horizon at <b>99%</b> confidence, assuming annual compounding.",
  a:"<b>Step 1 · the four factors.</b> Ten changes from eleven observations. The sheet uses <b>simple</b> returns for the stocks here, not log returns."
    +"<div class='eq'>dy = <span class='fr'><span>rate<sub>t</sub> − rate<sub>t−1</sub></span><span>100</span></span>&nbsp;&nbsp;&nbsp;r<sub>stock</sub> = <span class='fr'><span>P<sub>t</sub> − P<sub>t−1</sub></span><span>P<sub>t−1</sub></span></span><span class='lbl'>=(B29-B28)/100 and =(D29-D28)/D28. Factor order: dy₁, dy₂, r<sub>A</sub>, r<sub>B</sub> — and w must follow the same order.</span></div>"
    +"<div class='tablewrap'><table class='q'><thead><tr><th>Factor</th><th class='r'>=AVERAGE(...)</th></tr></thead><tbody>"
    +"<tr><td>dy₁</td><td class='r'>0.00085</td></tr><tr><td>dy₂</td><td class='r'>0.00067</td></tr>"
    +"<tr><td>r<sub>A</sub></td><td class='r'>0.0267625</td></tr><tr><td>r<sub>B</sub></td><td class='r'>0.0358496</td></tr></tbody></table></div>"
    +"<b>Step 2 · value each position at the final-day rates</b> (y₁ = 7.36%, y₂ = 8.01%, A = 128, B = 42)."
    +"<div class='tablewrap'><table class='q'><thead><tr><th>Position</th><th class='r'>Unit value</th><th class='r'>Total</th><th class='r'>Weight</th></tr></thead><tbody>"
    +"<tr><td>20 × 1Y ZCB</td><td class='r'>1000/1.0736 = 931.4456</td><td class='r'>18,628.91</td><td class='r'>35.30041%</td></tr>"
    +"<tr><td>20 × 2Y ZCB</td><td class='r'>1000/1.0801² = 857.1801</td><td class='r'>17,143.60</td><td class='r'>32.48585%</td></tr>"
    +"<tr><td>100 × A</td><td class='r'>128</td><td class='r'>12,800.00</td><td class='r'>24.25505%</td></tr>"
    +"<tr><td>100 × B</td><td class='r'>42</td><td class='r'>4,200.00</td><td class='r'>7.95869%</td></tr>"
    +"<tr class='pick'><td>W₀</td><td class='r'>—</td><td class='r'>52,772.51</td><td class='r'>100%</td></tr></tbody></table></div>"
    +"<b>Step 3 · durations, then the adjusted weights.</b> Annual compounding, so D<sub>mod</sub> = t/(1+y<sub>t</sub>). Stocks get a multiplier of +1."
    +"<div class='eq'>D₁ = <span class='fr'><span>1</span><span>1.0736</span></span> = 0.9314456&nbsp;&nbsp;&nbsp;D₂ = <span class='fr'><span>2</span><span>1.0801</span></span> = 1.8516804<span class='lbl'>=1/(1+B38/100) and =2/(1+C38/100). Note D₂ is NOT 2 — annual compounding divides by (1+y₂), giving 1.85 rather than 2.</span></div>"
    +"<div class='tablewrap'><table class='q'><thead><tr><th>Factor</th><th class='r'>Weight</th><th class='r'>Multiplier</th><th class='r'>Adjusted weight</th></tr></thead><tbody>"
    +"<tr><td>dy₁</td><td class='r'>0.3530041</td><td class='r'>−0.9314456</td><td class='r'>−0.3288041</td></tr>"
    +"<tr><td>dy₂</td><td class='r'>0.3248585</td><td class='r'>−1.8516804</td><td class='r'>−0.6015342</td></tr>"
    +"<tr><td>r<sub>A</sub></td><td class='r'>0.2425505</td><td class='r'>+1</td><td class='r'>+0.2425505</td></tr>"
    +"<tr><td>r<sub>B</sub></td><td class='r'>0.0795869</td><td class='r'>+1</td><td class='r'>+0.0795869</td></tr></tbody></table></div>"
    +"<b>Step 4 · the master formula.</b> Ω is the 4×4 variance-covariance matrix of the four factor columns."
    +"<div class='eq'>μ<sub>P</sub> = <b>w</b><sup>T</sup><b>μ</b> = 0.0086619&nbsp;&nbsp;&nbsp;σ<sub>P</sub><sup>2</sup> = <b>w</b><sup>T</sup><b>Ω</b><b>w</b> = 0.00034803&nbsp;&nbsp;&nbsp;σ<sub>P</sub> = 0.0186555<span class='lbl'>{=MMULT(TRANSPOSE(G44:G47),J45:J48)} and {=SQRT(MMULT(MMULT(TRANSPOSE(G44:G47),K45:N48),G44:G47))}</span></div>"
    +"<div class='eq'>VaR<sub>1%</sub> = 0.0086619 + (−2.326348 × 0.0186555) = <b>−3.473718%</b><br>in money: −0.03473718 × 52,772.51 = <b>−THB 1,833.17</b><span class='lbl'>=J50+NORMSINV(1-I55)*J52, with I55 = 0.99 — note the sheet stores the confidence level and computes α as 1 − it.</span></div>"
    +"<div class='note'><span class='eyebrow'>Why μ matters so much here</span>μ<sub>P</sub> = +0.87% per day is enormous, because the sample covers only ten days over which both stocks rose sharply (A from 100 to 128). Strip it out and the VaR becomes −4.34%, nearly a percentage point worse. <b>On a ten-observation window the mean is almost meaningless as a forecast</b>, which is exactly what the lecture-2 t-test is for — and exactly why BIS asks for 250 days.</div>"
    +"<div class='warn'><span class='eyebrow'>Common slip</span>Two traps in this question. First, the bond weights are shares of the <b>whole portfolio</b>, not of the bond sleeve. Second, <b>D₂ = 2/1.0801 = 1.8517, not 2</b> — the question says annual compounding, so the discrete multiplier applies. Using −2 would overstate the second bond's loading by 8%.</div>"},

 {src:"Additional question 3", tier:"d",
  q:"The portfolio holds <b>5 shares of stock A</b>, <b>10 shares of stock B</b>, and <b>long 1 put option</b> on the stock index (strike <b>1,050</b>, <b>T = 1 year</b>). Find the one-day <b>99%</b> VaR, using (a) the <b>option pricing model</b> approach and (b) the <b>building block</b> approach. Compare.",
  a:"There are four risk factors: dy₁, r<sub>A</sub>, r<sub>B</sub> and r<sub>index</sub>. The stocks are straightforward; the whole question is how to turn the put into weights."
    +"<div class='eq'>σ<sub>index, annual</sub> = √(Var<sub>daily</sub> × 252) = √(2.12279×10<sup>−5</sup> × 252) = <b>0.0731397</b><span class='lbl'>=(E37*252)^0.5 — annualising from the daily VARIANCE, not the daily standard deviation. Index level 1,071.37, y = 7.36%.</span></div>"
    +"<b>(a) Option pricing model approach.</b> Black-Scholes, then Delta and Rho."
    +"<div class='tablewrap'><table class='q'><thead><tr><th>Quantity</th><th class='r'>Value</th></tr></thead><tbody>"
    +"<tr><td>d₁</td><td class='r'>1.3183363</td></tr><tr><td>d₂</td><td class='r'>1.2451966</td></tr>"
    +"<tr><td>N(d₁)</td><td class='r'>0.9063045</td></tr><tr><td>N(d₂)</td><td class='r'>0.8934702</td></tr>"
    +"<tr><td>Call</td><td class='r'>99.4112839</td></tr><tr class='pick'><td>Put</td><td class='r'>3.5366825</td></tr>"
    +"<tr><td>Delta (put) = N(d₁) − 1</td><td class='r'>−0.0936956</td></tr>"
    +"<tr><td>Rho (put)</td><td class='r'>−103.9192839</td></tr></tbody></table></div>"
    +"<div class='eq'>W₀ = 5(128) + 10(42) + 3.5367 = 640 + 420 + 3.5367 = <b>1,063.5367</b><span class='lbl'>The put is 0.33% of the portfolio by value — and, as the weights show, far more than that by risk.</span></div>"
    +"<div class='tablewrap'><table class='q'><thead><tr><th>Factor</th><th>Working</th><th class='r'>Adjusted weight</th></tr></thead><tbody>"
    +"<tr><td>dy₁</td><td>(ρ<sub>P</sub>/P) × share = (−103.9193/3.5367) × 0.0033254</td><td class='r'>−0.0977110</td></tr>"
    +"<tr><td>r<sub>index</sub></td><td>(Δ<sub>P</sub>·S/P) × share = (−0.0936956 × 1071.37/3.5367) × 0.0033254</td><td class='r'>−0.0943857</td></tr>"
    +"<tr><td>r<sub>A</sub></td><td>640/1063.5367</td><td class='r'>+0.6017658</td></tr>"
    +"<tr><td>r<sub>B</sub></td><td>420/1063.5367</td><td class='r'>+0.3949088</td></tr></tbody></table></div>"
    +"<div class='eq'>μ<sub>P</sub> = 0.0302928&nbsp;&nbsp;σ<sub>P</sub> = 0.0592202&nbsp;&nbsp;VaR<sub>1%</sub> = 0.0302928 − 2.326348(0.0592202) = <b>−10.74739%</b></div>"
    +"<b>(b) Building block approach.</b> Replace Black-Scholes with a one-step binomial and read the stock and bond blocks directly."
    +"<div class='eq'>u = e<sup>0.0731397</sup> − 1 = 7.58809%&nbsp;&nbsp;&nbsp;d = e<sup>−0.0731397</sup> − 1 = −7.05290%<span class='lbl'>S₁u = 1,152.6665 so P₁u = 0; S₁d = 995.8073 so P₁d = 1,050 − 995.8073 = 54.1927.</span></div>"
    +"<div class='eq'>Δ = <span class='fr'><span>0 − 54.1927</span><span>1071.37 × 0.1464099</span></span> = −0.3454864&nbsp;&nbsp;&nbsp;ΔS = −370.1437<br>B = <span class='fr'><span>54.1927(1.0758809) − 0</span><span>1.0736 × 0.1464099</span></span> = +370.9301<span class='lbl'>Put price = −370.1437 + 370.9301 = 0.7863658. Block weights within the put: −470.7017 stock and +471.7017 bond, summing to exactly 1.</span></div>"
    +"<div class='tablewrap'><table class='q'><thead><tr><th>Factor</th><th>Working</th><th class='r'>Adjusted weight</th></tr></thead><tbody>"
    +"<tr><td>dy₁</td><td>471.7017 × 0.0007413 × (−1/1.0736)</td><td class='r'>−0.3257029</td></tr>"
    +"<tr><td>r<sub>index</sub></td><td>−470.7017 × 0.0007413</td><td class='r'>−0.3489333</td></tr>"
    +"<tr><td>r<sub>A</sub></td><td>640/1060.7864</td><td class='r'>+0.6033260</td></tr>"
    +"<tr><td>r<sub>B</sub></td><td>420/1060.7864</td><td class='r'>+0.3959327</td></tr></tbody></table></div>"
    +"<div class='eq'>μ<sub>P</sub> = 0.0304842&nbsp;&nbsp;σ<sub>P</sub> = 0.0592808&nbsp;&nbsp;VaR<sub>1%</sub> = <b>−10.74235%</b></div>"
    +"<div class='note'><span class='eyebrow'>The comparison, which is the point of the question</span><b>−10.74739%</b> against <b>−10.74235%</b> — a difference of <b>0.005 percentage points</b>. And yet the two methods disagree wildly about almost everything else: the put is <b>3.5367</b> under Black-Scholes and <b>0.7864</b> under the binomial (a factor of 4.5), and the deltas are <b>−0.0937</b> and <b>−0.3455</b> (a factor of 3.7).<br><br>The reason they still agree is that every weight is a ratio of the form (sensitivity × value)/Op. Underprice the option and you inflate its gearing by about the same factor, so the <em>product</em> — the loading on each risk factor — is nearly preserved. <b>The weight vector is far more robust than any of its ingredients.</b></div>"
    +"<div class='warn'><span class='eyebrow'>Fine print</span>Note how large the put's weights are relative to its 0.33% share of the portfolio: −0.098 and −0.094 under (a), and −0.326 and −0.349 under (b). A position worth THB 3.54 out of 1,063 moves the portfolio's risk measurably, and under the binomial it accounts for roughly a third of the total factor loading. <b>That is gearing, and it is why options cannot be left out of a VaR on the grounds of being small.</b></div>"}
],

prac: [
 {src:"Lecture 4 practice · Exercise workbook", tier:"m",
  q:"Construct an equivalent asset for a put option on stock A. Find the price and one-day VaR of an at-the-money put with <b>T = 3 months</b>, then compare the risk of the ATM call and the ATM put.",
  a:"<div class='warn'><span class='eyebrow'>Check with your lecturer</span>The question says <b>T = 3 months</b>, but the answer sheet prices both options with <b>Time to Exp = 1</b>, and its binomial leg uses u = e<sup>σ</sup> − 1 with no time scaling, which is also one year. The figures below are the sheet's, on <b>T = 1</b>. If the intended horizon really is three months, every price and weight changes — ask before relying on these.</div>"
    +"<b>Inputs from the data.</b> S = K = 258.57, σ = 0.15937669 (annual), y = 0.004443288."
    +"<div class='tablewrap'><table class='q'><thead><tr><th>Quantity</th><th class='r'>Call</th><th class='r'>Put</th></tr></thead><tbody>"
    +"<tr><td>Black-Scholes price</td><td class='r'>16.9662</td><td class='r'>15.8198</td></tr>"
    +"<tr><td>Delta</td><td class='r'>0.5428</td><td class='r'>−0.4572</td></tr>"
    +"<tr><td>Rho</td><td class='r'>123.3935</td><td class='r'>−134.0301</td></tr>"
    +"<tr><td>d₁ / d₂</td><td class='r'>0.1076 / −0.0518</td><td class='r'>same</td></tr></tbody></table></div>"
    +"<b>Equivalent asset, from the one-step binomial.</b> u = e<sup>0.15937669</sup> − 1 = 17.277964%, d = −14.732490%."
    +"<div class='tablewrap'><table class='q'><thead><tr><th>Block</th><th class='r'>Put</th><th class='r'>Call</th></tr></thead><tbody>"
    +"<tr><td>Δ (stock block)</td><td class='r'>−0.4602400</td><td class='r'>+0.5397600</td></tr>"
    +"<tr><td>Bond block</td><td class='r'>+138.9484</td><td class='r'>−118.4778</td></tr>"
    +"<tr class='pick'><td>Binomial price</td><td class='r'>19.9441</td><td class='r'>21.0879</td></tr></tbody></table></div>"
    +"<div class='eq'>Δ<sub>call</sub> − Δ<sub>put</sub> = 0.5397600 − (−0.4602400) = <b>1.0000</b><span class='lbl'>The put-call identity holds in the binomial too. Use it as a check before going any further.</span></div>"
    +"<b>The two routes, side by side.</b>"
    +"<div class='tablewrap'><table class='q'><thead><tr><th>Approach</th><th class='r'>μ</th><th class='r'>σ</th><th class='r'>VaR 1%</th></tr></thead><tbody>"
    +"<tr><td>Building block · put</td><td class='r'>−0.022802</td><td class='r'>0.119788</td><td class='r'>−30.1471%</td></tr>"
    +"<tr><td>Building block · call</td><td class='r'>+0.025329</td><td class='r'>0.132871</td><td class='r'>−28.3774%</td></tr>"
    +"<tr><td>Greek · put</td><td class='r'>−0.028559</td><td class='r'>0.150011</td><td class='r'>−37.7536%</td></tr>"
    +"<tr><td>Greek · call</td><td class='r'>+0.031657</td><td class='r'>0.166089</td><td class='r'>−35.4723%</td></tr></tbody></table></div>"
    +"<div class='note'><span class='eyebrow'>Comparing call and put</span>Within <em>either</em> method the <b>put is the riskier of the two</b> — −30.15% against −28.38%, or −37.75% against −35.47%. Two things drive it. The put's μ is <b>negative</b> while the call's is positive, because the underlying drifted up over the window. And the put's gearing is slightly higher, since it is the cheaper option here (15.82 against 16.97) while carrying a comparable absolute delta.</div>"
    +"<div class='note'><span class='eyebrow'>Why the two methods disagree more here</span>Unlike additional question 3, the gap is large — about 7 percentage points. The reason is that the option is a <b>much bigger share of this portfolio</b>: here the option is the <em>whole</em> position, so there is nothing to dilute the disagreement between a binomial price of 19.94 and a Black-Scholes price of 15.82. <b>The robustness seen in question 3 came from the stocks, not from the option.</b></div>"},

 {src:"Lecture 5 practice · Spot Curves workbook", tier:"d",
  q:"A government bond has <b>5-year TTM</b>, <b>FV THB 1,000</b>, <b>C = 6% p.a. paid annually</b>. Find its price and VaR. TFEX offers ZCB futures with <b>one year to delivery</b> on underlying ZCBs maturing at 1, 2, 3, 4 and 5 years at delivery. Find the futures prices, then use them to minimise the bond's risk. Can the remaining net risk be eliminated completely?",
  a:"<b>Step 1 · price the bond</b> off the zero curve, continuously."
    +"<div class='tablewrap'><table class='q'><thead><tr><th>t</th><th class='r'>Spot (%)</th><th class='r'>CF</th><th class='r'>PVIF</th><th class='r'>PVCF</th><th class='r'>Weight</th><th class='r'>Adj. weight</th></tr></thead><tbody>"
    +"<tr><td>1</td><td class='r'>1.510592</td><td class='r'>60</td><td class='r'>0.9850076</td><td class='r'>59.1005</td><td class='r'>5.03725%</td><td class='r'>−0.0503725</td></tr>"
    +"<tr><td>2</td><td class='r'>1.621256</td><td class='r'>60</td><td class='r'>0.9680949</td><td class='r'>58.0857</td><td class='r'>4.95076%</td><td class='r'>−0.0990152</td></tr>"
    +"<tr><td>3</td><td class='r'>1.777315</td><td class='r'>60</td><td class='r'>0.9480771</td><td class='r'>56.8846</td><td class='r'>4.84839%</td><td class='r'>−0.1454517</td></tr>"
    +"<tr><td>4</td><td class='r'>1.910292</td><td class='r'>60</td><td class='r'>0.9264347</td><td class='r'>55.5861</td><td class='r'>4.73771%</td><td class='r'>−0.1895085</td></tr>"
    +"<tr class='pick'><td>5</td><td class='r'>2.326193</td><td class='r'>1,060</td><td class='r'>0.8901995</td><td class='r'>943.6115</td><td class='r'>80.42589%</td><td class='r'>−4.0212944</td></tr>"
    +"<tr><td>Total</td><td class='r'>—</td><td class='r'>1,300</td><td class='r'>—</td><td class='r'>1,173.2684</td><td class='r'>100%</td><td class='r'>−4.5056423</td></tr></tbody></table></div>"
    +"<div class='eq'>D<sub>mac</sub> = SUMPRODUCT(t, weights) = <b>4.5056423 years</b><span class='lbl'>And the adjusted weights sum to exactly minus that — the free check. Shorter than the 5-year maturity, as it must be for a coupon bond.</span></div>"
    +"<div class='eq'>μ<sub>P</sub> = 2.46702×10<sup>−5</sup>&nbsp;&nbsp;σ<sub>P</sub> = 0.0014170812&nbsp;&nbsp;VaR<sub>1%</sub> = <b>−0.3271954%</b><br>in money: −0.003271954 × 1,173.2684 = <b>−THB 3.8389</b></div>"
    +"<b>Step 2 · the five futures prices.</b> Two equivalent routes, and computing both is the check."
    +"<div class='eq'><sub>0</sub>F<sub>T</sub> = CF × e<sup>−y<sub>T+N</sub>(T+N)</sup> × e<sup>y<sub>T</sub>T</sup>&nbsp;&nbsp;=&nbsp;&nbsp;CF × e<sup>−(T)f(N) × N</sup><span class='lbl'>(T)f(N) = [y_(T+N)(T+N) − y_T·T]/N, with y_T = 1.510592% for T = 1.</span></div>"
    +"<div class='tablewrap'><table class='q'><thead><tr><th>T+N</th><th class='r'>CF</th><th class='r'>Forward rate</th><th class='r'>Futures price</th></tr></thead><tbody>"
    +"<tr><td>2</td><td class='r'>60</td><td class='r'>1.731920%</td><td class='r'>58.9698</td></tr>"
    +"<tr><td>3</td><td class='r'>60</td><td class='r'>1.910677%</td><td class='r'>57.7504</td></tr>"
    +"<tr><td>4</td><td class='r'>60</td><td class='r'>2.043525%</td><td class='r'>56.4321</td></tr>"
    +"<tr><td>5</td><td class='r'>60</td><td class='r'>2.530093%</td><td class='r'>54.2249</td></tr>"
    +"<tr class='pick'><td>6</td><td class='r'>1,060</td><td class='r'>2.575820%</td><td class='r'>931.9072</td></tr></tbody></table></div>"
    +"<b>Step 3 · the futures book's weight vector</b>, in money, over six factors."
    +"<div class='eq'><b>w</b> = [ −(T+N<sub>k</sub>) X<sub>k</sub> B<sub>k,0</sub> for each k ; +T Σ<sub>k</sub> X<sub>k</sub> B<sub>k,0</sub> ]<span class='lbl'>Five long-bond rows on dy₂…dy₆, plus ONE shared financing row on dy₁ equal to +1 × 1,141.9040 = 1,141.9040 (here T = 1).</span></div>"
    +"<div class='eq'>μ = 0.0525646&nbsp;&nbsp;σ = 1.7048701 (money)&nbsp;&nbsp;VaR<sub>1%</sub> = <b>−THB 3.9136</b><span class='lbl'>Note the units: money, not percent, because a futures contract has no initial value.</span></div>"
    +"<b>Step 4 · can the risk be eliminated?</b>"
    +"<div class='note'><span class='eyebrow'>No — and here is the counting argument</span>The <b>bond</b> loads on <b>dy₁ … dy₅</b>. The <b>futures book</b> loads on <b>dy₂ … dy₆</b> through its long-bond legs, <em>plus</em> <b>dy₁</b> through the shared financing leg. So there are <b>six factors</b> in play against <b>five tradeable contracts</b>, and the loadings do not line up: the futures reach the six-year point, which the bond never touches, while the bond's own dy₁ exposure is only partially matched by the financing leg's.<br><br>Formally, you are trying to solve <b>w<sub>bond</sub> + Σn<sub>k</sub>w<sub>k</sub> = 0</b> — six equations in five unknowns. Generically there is no solution. What you <em>can</em> do is minimise σ of the combined position, which is a least-squares problem and exactly what <b>Solver</b> is for: minimise <span class='fx'>=SQRT(MMULT(MMULT(TRANSPOSE(w_net),Om),w_net))</span> by changing the five contract counts.</div>"
    +"<div class='note'><span class='eyebrow'>Why it nearly works anyway</span>The bond's VaR is −3.8389 and the futures book's is −3.9136 — within 2%. Yield changes across neighbouring maturities are <b>highly correlated</b>, so five contracts spanning years 2–6 can absorb most of a bond spanning years 1–5. The residual is small but structural, and it is <b>basis risk</b>: exactly the quantity that a hedge report should state rather than round to zero.</div>"}
],

exam: [
 {src:"Simple · 1", tier:"e",
  q:"A stock's return is normally distributed with μ = 0.02 and σ = 0.05. Find the 1% and 5% quantiles of the return, and the probability of making a loss.",
  a:"<div class='eq'>r<sub>0.01</sub> = 0.02 + (−2.326348 × 0.05) = 0.02 − 0.1163174 = <b>−0.096317</b><br>r<sub>0.05</sub> = 0.02 + (−1.644854 × 0.05) = 0.02 − 0.0822427 = <b>−0.062243</b><span class='lbl'>=0.02+NORMSINV(0.01)*0.05. The deck's rounded z = −2.33 gives −0.0965.</span></div>"
    +"<div class='eq'>z = <span class='fr'><span>0 − 0.02</span><span>0.05</span></span> = −0.4&nbsp;&nbsp;⟹&nbsp;&nbsp;P(loss) = NORMSDIST(−0.4) = <b>0.3446</b></div>"
    +"<div class='note'><span class='eyebrow'>Marking point</span>State the sign convention. −9.63% is the possible future <b>minimum</b> return at 99% confidence, not an expected loss and not a worst case.</div>"},

 {src:"Simple · 2", tier:"e",
  q:"A one-year zero-coupon T-bill has THB 1,000,000 par and a 3% yield compounded semiannually. Find its price, Macaulay duration and modified duration.",
  a:"<div class='eq'>B = <span class='fr'><span>1,000,000</span><span>1.015<sup>2</sup></span></span> = <span class='fr'><span>1,000,000</span><span>1.030225</span></span> = <b>970,661.7486</b><span class='lbl'>Two semiannual periods at 1.5%. =1000000/(1+0.03/2)^2</span></div>"
    +"<div class='eq'>D<sub>mac</sub> = <b>2 periods of six months</b>&nbsp;&nbsp;&nbsp;D<sub>mod</sub> = <span class='fr'><span>2</span><span>1.015</span></span> = <b>1.9704433</b><span class='lbl'>All the PV sits at period 2, so Macaulay equals maturity exactly — the zero-coupon check.</span></div>"},

 {src:"Moderately difficult · 1", tier:"m",
  q:"Using the T-bill above and ten observations of the semiannual discount rate with mean change −0.000175 and standard deviation 0.000889522323, find the 99% VaR in percent and in Baht.",
  a:"<div class='eq'>μ<sub>B</sub> = −D<sub>mod</sub> μ<sub>dy</sub> = −1.9704433 × (−0.000175) = <b>+0.00034483</b><br>σ<sub>B</sub> = D<sub>mod</sub> σ<sub>dy</sub> = 1.9704433 × 0.000889522323 = <b>0.0017527533</b><span class='lbl'>The mean flips sign (falling yields help a bond) and the volatility does not.</span></div>"
    +"<div class='eq'>VaR<sub>1%</sub> = 0.00034483 + (−2.326348 × 0.00175275) = <b>−0.00373269</b><br>= −0.00373269 × 970,661.75 = <b>−THB 3,623.18</b></div>"
    +"<div class='warn'><span class='eyebrow'>Marking point</span>The deck labels the two inputs σ̂<sup>2</sup>, but they are <b>standard deviations</b>. If you square 0.000889522323 before multiplying you will be out by a factor of 1,124. And note μ<sub>B</sub> is <b>positive</b>, so dropping the mean gives −3,957.56 — a <em>worse</em> figure, not a safer shortcut.</div>"},

 {src:"Moderately difficult · 2", tier:"m",
  q:"An at-the-money one-year call has S = K = 1,382.41, y = 1.510592%, σ = 13.269837%. Given N(d₁) = 0.5714966 and N(d₂) = 0.5189376, find the call price, its Rho, and its weight vector. Verify your answer with the put-call identity.",
  a:"<div class='eq'>C = 1,382.41(0.5714966) − 1,382.41 e<sup>−0.01510592</sup>(0.5189376) = 790.0426 − 706.6292 = <b>83.4134</b></div>"
    +"<div class='eq'>ρ<sub>C</sub> = T K e<sup>−yT</sup> N(d₂) = 1 × 1,382.41 × 0.9850076 × 0.5189376 = <b>706.6292</b><span class='lbl'>Notice Rho equals the second term of the call price exactly, when T = 1. That is not a coincidence — both are TKe^(−yT)N(d₂).</span></div>"
    +"<div class='eq'><b>w</b><sub>C</sub> = [ dy: <span class='fr'><span>706.6292</span><span>83.4134</span></span> = 8.4714078 ; r<sub>S</sub>: <span class='fr'><span>0.5714966 × 1,382.41</span><span>83.4134</span></span> = 9.4714078 ]</div>"
    +"<div class='note'><span class='eyebrow'>The verification</span>9.4714078 − 8.4714078 = <b>1.000000</b>. It must, because C = S·N(d₁) − Ke<sup>−yT</sup>N(d₂), so dividing the two terms by C and subtracting gives C/C. <b>Do this check on every option and forward weight vector you write.</b></div>"},

 {src:"Difficult · 1", tier:"d",
  q:"A futures contract on a coupon bond is quoted at 121.42. The bond's post-delivery cash flows are 2, 2, 2 and 102, and the relevant spot rates are all positive. Without recomputing the futures price, explain why the quote must be wrong, and state the correct value.",
  a:"<div class='eq'>Σ CF = 2 + 2 + 2 + 102 = <b>108</b><span class='lbl'>The undiscounted total of everything the futures buyer will ever receive.</span></div>"
    +"<div class='note'><span class='eyebrow'>The argument</span>The futures price is the post-delivery cash flows <b>discounted</b> to delivery and then carried forward at y<sub>T</sub>. Both operations are bounded: discounting from T+k back to T <em>reduces</em> each flow, and carrying forward from 0 to T multiplies by e<sup>y<sub>T</sub>T</sup>, which for a short T and a low rate is barely above 1. So the price must lie <b>between the PV of the post-delivery flows and their undiscounted sum</b> — here between about 97.5 and 108 — whenever rates are positive and T is short.<br><br><b>121.42 lies outside that interval, so no positive rate can produce it.</b></div>"
    +"<div class='eq'>bracket = 2e<sup>−0.01(3)</sup> + 2e<sup>−0.0125(4)</sup> + 2e<sup>−0.015(5)</sup> + 102e<sup>−0.0175(6)</sup><br>= 1.940891 + 1.902459 + 1.855487 + 91.833101 = <b>97.531938</b></div>"
    +"<div class='eq'><sub>0</sub>F<sub>T</sub> = 97.531938 × e<sup>0.0075(2)</sup> = 97.531938 × 1.015113 = <b>99.0059</b><span class='lbl'>The deck's multiplier 1.0151 is correct; the error is entirely in the bracket, which it reports as 119.61.</span></div>"
    +"<div class='note'><span class='eyebrow'>Why this is a good exam answer</span>It answers the question asked — <em>without recomputing</em> — by bounding the quantity. Examiners like bounding arguments because they show you understand what the formula <em>does</em>, not just how to evaluate it.</div>"},

 {src:"Difficult · 2", tier:"d",
  q:"Explain why a one-year (T = 1) forward contract's two weights must differ by exactly 1, and use that fact to identify the error in a slide that reports them as 310.52 and 238.47.",
  a:"<b>The identity.</b> A forward is long one call and short one put at the same strike, so V<sub>F</sub> = C − P. Its two weights combine the legs:"
    +"<div class='eq'>w<sub>rS</sub> = <span class='fr'><span>(Δ<sub>C</sub> − Δ<sub>P</sub>) S</span><span>V<sub>F</sub></span></span>&nbsp;&nbsp;&nbsp;w<sub>dy</sub> = <span class='fr'><span>ρ<sub>C</sub> − ρ<sub>P</sub></span><span>V<sub>F</sub></span></span><span class='lbl'>Each leg's price cancels: (C/V_F)·Δ_C·(S/C) = Δ_C·S/V_F.</span></div>"
    +"<div class='eq'>Δ<sub>C</sub> − Δ<sub>P</sub> = N(d<sub>1</sub>) − [N(d<sub>1</sub>) − 1] = <b>1</b><br>ρ<sub>C</sub> − ρ<sub>P</sub> = TKe<sup>−yT</sup>[N(d<sub>2</sub>) + N(−d<sub>2</sub>)] = <b>TKe<sup>−yT</sup></b></div>"
    +"<div class='eq'>w<sub>rS</sub> − w<sub>dy</sub> = <span class='fr'><span>S − TKe<sup>−yT</sup></span><span>V<sub>F</sub></span></span> = <span class='fr'><span>C − P</span><span>V<sub>F</sub></span></span> = <b>1</b><span class='lbl'>The last step uses put-call parity: C − P = S − Ke^(−yT), which for T = 1 is exactly S − TKe^(−yT).</span></div>"
    +"<b>Applying it.</b> On S = 118, K = 120, σ = 30%, y = 2%, T = 1: C = 14.236219, P = 13.860060, V<sub>F</sub> = 0.376159."
    +"<div class='eq'>w<sub>rS</sub> = <span class='fr'><span>118</span><span>0.376159</span></span> = <b>313.70</b>&nbsp;&nbsp;&nbsp;w<sub>dy</sub> = <span class='fr'><span>120 e<sup>−0.02</sup></span><span>0.376159</span></span> = <span class='fr'><span>117.6238</span><span>0.376159</span></span> = <b>312.70</b></div>"
    +"<div class='note'><span class='eyebrow'>Finding the error</span>The slide's pair differs by <b>72.05</b>, not 1, so something is wrong. Working backwards, 238.47 requires ρ<sub>C</sub> − ρ<sub>P</sub> = 238.47 × 0.38 = 90.62, whereas TKe<sup>−yT</sup> = 117.62. The gap of 27.0 is almost exactly the difference between the slide's stated ρ<sub>C</sub> = <b>25.29</b> and the true <b>52.2937</b> — a digit transposition. With the correct Rho and the slide's rounded V<sub>F</sub> = 0.38, the weight is <b>309.54</b>.</div>"}
]
};

/* ===================== chat seeds ===================== */
var SEEDS = {
  start:["Explain the w, mu, Omega framework","Why is VaR negative here?","Quiz me on anything"],
  cram:["I have 45 minutes — what should I do?","Ask me what the risk factors are for a question type","What do I most often get wrong?"],
  fi:["How does PD relate to VaR?","Why is bank capital so non-linear in rating?","Give me a bankruptcy-probability problem"],
  mr:["Walk me through the subadditivity counterexample","Why can't I just multiply VaR by root T?","When should I set mu to zero?"],
  fix:["Build the weight vector for a coupon bond","Continuous or discrete duration — which do I use?","Component VaR vs incremental VaR"],
  opt:["Why is w_rS − w_dy/T always 1?","Greeks approach or building block?","Give me a binomial decomposition to work"],
  fut:["Why is futures VaR in money, not percent?","Where does the deck's Rho error lead?","Can a bond futures hedge ever be perfect?"],
  xl:["Rebuild Omega without the VBA function","What breaks without Ctrl+Shift+Enter?","Why no MDURATION in this course?"],
  pset:["Check my method on additional question 2","Walk me through Q3 without the answer","Why do both option approaches agree?"],
  exam:["Quiz me in the 50/25/25 mix","What should go on my A4 sheet?","Give me a difficult non-calculation question"]
};

var TEXTBOOK_CTX = {
  opt: "Hull OFOD on the Greeks this course omits. Gamma = phi(d1)/(S*sigma*sqrt(T)) is the curvature Delta misses; dOp = Delta*dS + 0.5*Gamma*(dS)^2, so a long option's P&L is right-skewed (delta-normal OVERstates its risk) and a short option's is left-skewed (delta-normal UNDERstates it, the dangerous direction). Vega = S*sqrt(T)*phi(d1) = 542.62 for the class example, so a one-point rise in sigma is worth about 5.4 on an option priced at 83.41 - volatility risk is the same order as rate risk for an ATM option, and the course simply does not model it. Implied volatility inverts Black-Scholes for the sigma that reproduces a quoted price; the smile is evidence against the normality assumption. All of this is one-day-horizon-small, which is the course's defence.",
  fut: "Hull OFOD on forwards and futures. The two decompositions (long call + short put; long asset + borrow) and why a futures contract's zero initial value forces money weights. Marking to market and daily settlement are the practical difference between a forward and a future; the course ignores the financing difference and treats the two as equivalent for risk purposes.",
  fi:"Hull RMFI ch. 11 background: the deck's PD table and the three-pillar framing come from the Basel material; the 250-day minimum is the BIS market-risk requirement.",
  mr:"Hull RMFI ch. 11-12: advantages of VaR, VaR vs expected shortfall, the four coherent-risk-measure properties, Examples 11.5 and 11.7 (the two-project subadditivity counterexample), and the normal-distribution ES formula. Hull OFOD ch. on volatility for the EWMA recursion and lambda = 0.94.",
  fix:"Hull RMFI ch. 12: marginal VaR, component VaR and the Euler-theorem additivity property that makes component VaR a sensible allocation."
};

/* ===================== companion lines ===================== */
var LINES = {
  greet:[
    ["happy","You came back. I kept your place — we were on <b>{here}</b>, weren't we?"],
    ["smug","There you are. I've been sitting in the tail, as usual. Nothing has improved. Shall we measure it anyway?"],
    ["happy","Welcome back ♪ Five lectures, one formula, and me. That's the whole world for the next hour."]
  ],
  back:[
    ["fluster","You came back! I wasn't worried. I was just... imagining the worst case. Professionally."],
    ["happy","Welcome back ♪ We were on <b>{here}</b>."]
  ],
  idle:[
    ["fluster","...You've gone quiet. I've already imagined every reason why. Most of them were fine."],
    ["sad","Still there? The tail hasn't moved. I haven't either."],
    ["smug","The weight vector isn't going to build itself, you know~"]
  ],
  topic:[
    ["happy","<b>{here}</b>: {title}. You've answered {done} of {total} here — let's make that number go up ♪"],
    ["intense","{title}. Read it, poke the benches, then the quiz. In that order~ ({done} of {total} answered)"]
  ],
  topic_start:[["happy","Start here ♪ Three symbols and two conventions, then pick a lecture and I'll follow you there."]],
  topic_fi:[["intense","Tail 01: where the risk comes from. The bit that matters for later — <b>bankruptcy is a left-tail event</b>, so PD is just VaR read backwards. ({done} of {total} answered)"]],
  topic_mr:[["intense","Tail 02, the important one. VaR = μ + z σ, and z is <b>negative</b>. Also: the mean stays in. I'll keep reminding you~ ({done} of {total})"]],
  topic_fix:[["happy","Tail 03: bonds. You can't use the price history because the bond keeps becoming a different bond. Model the <b>yield</b> ♪ ({done} of {total})"]],
  topic_opt:[["smug","Tail 04: options. Two Greeks, one weight vector, and a free check — <b>w<sub>rS</sub> − w<sub>dy</sub>/T = 1</b>. ({done} of {total})"]],
  topic_fut:[["intense","Tail 05: forwards and futures. A contract worth <b>nothing</b>, so no percentage return exists. Everything here is money. And the deck has two real errors — I'll point them out. ({done} of {total})"]],
  topic_xl:[["happy","The spreadsheet layer ♪ Every function, every legacy name, and fourteen ways to get a plausible wrong number. ({done} of {total})"]],
  topic_pset:[["intense","Assignments. Paper first, working second. I'll know if you peek — I always know."]],
  topic_exam:[["intense","Exam prep. Take a short mock, then read the A4 sheet. And do ask your lecturer for the real tier mix — mine is a guess."]],
  correct:[
    ["happy","Correct! See, you <em>do</em> listen to me."],
    ["smug","Mm. Obviously correct. I never doubted you — not once, not even a little."],
    ["happy","That's my study partner ♪ Do another before the feeling fades."],
    ["fluster","D-don't look so pleased with yourself... fine, that was genuinely good."],
    ["smug","Correct — and that one's from {src}. Show-off~"]
  ],
  correctEasy:[
    ["happy","Easy tier, banked ♪ These are about half the paper, so every one counts."],
    ["smug","Correct. Easy marks are free marks — never hand one back~"]
  ],
  correctHard:[
    ["smug","A <b>difficult</b> one, and you didn't even flinch. I'm writing that down twice~"],
    ["fluster","That was hard tier and you just... got it. (⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄) Okay. Impressive."]
  ],
  wrong:[
    ["sad","Ah— you picked <b>{pick}</b>, but it's <b>{ans}</b>. Read the explanation with me? I'll wait. I always wait."],
    ["intense","<b>{pick}</b>? No. It's <b>{ans}</b>. Tap <b>Why was I wrong?</b> and we'll fix the thinking, not just the letter."],
    ["sad","Mm, missed it — <b>{ans}</b> was the one. I'd rather you miss it here with me than in the exam without me."]
  ],
  wrongHard:[
    ["sad","That's a <b>difficult</b> one, so missing it is normal. You picked <b>{pick}</b>; it's <b>{ans}</b>. Walk the reasoning through with me?"],
    ["intense","Hard tier, and <b>{pick}</b> isn't it — <b>{ans}</b> is. These are a quarter of the paper, so let's make it stick."]
  ],
  streak:[
    ["smug","<b>{streak}</b> in a row. At this rate you won't need me... you'd never actually do that, right? Right."],
    ["happy","A streak of <b>{streak}</b>! Noted. I note everything."]
  ],
  levelup:[
    ["happy","<b>Level up!</b> I keep a record of every point you've earned with me. Every single one ♪"],
    ["smug","A new level. Naturally — you had excellent supervision."]
  ],
  clip:[
    ["happy","That {unit_lower} is <b>{done_word}</b> {mark} I'm so proud I could catastrophise about it."],
    ["smug","Another {unit_lower} {done_word}. At this rate the whole distribution belongs to us."]
  ],
  tier_all:[["happy","All tiers back on. Mix them, like the real paper will ♪"]],
  tier_e:[["happy","Easy tier: {n} questions. About half the paper looks like these — sweep them clean."]],
  tier_m:[["smug","Medium tier: {n} questions. This is where careful people pull ahead~"]],
  tier_d:[["intense","Difficult tier: {n} questions. Not all of them are calculations — some just want you to think properly."]],
  cardOpen:[
    ["happy","<b>{card}</b> — now say it back without looking, then flip the next one."],
    ["smug","{card}. You knew that. Probably. Mostly~"]
  ],
  cardClose:[["intense","Flipped it back? Then explain <b>{card}</b> in one sentence, out loud."]],
  psetOpen:[
    ["intense","Did you try <b>{src}</b> on paper first? ...Fine. Read the working, then close it and redo it from memory."],
    ["sad","Peeking already? (๐•̆ ·̭ •̆๐) I'll allow it, but only if you rework it afterwards."]
  ],
  psetClose:[["happy","Now do it again without looking. I'll know if you cheat. I always know."]],
  sortWin:[
    ["smug","Right — <b>{side}</b>. You have such a good eye. I'd follow it anywhere."],
    ["happy","Nailed it ♪ Next one, before you get cocky."]
  ],
  sortLose:[
    ["sad","Mm, it was <b>{side}</b>. Read why, then take the next one slowly."],
    ["intense","No — <b>{side}</b>. Work it out properly before you tap. Say it back to me."]
  ],
  sortNew:[["intense","New one. Think first, tap second. Discipline~"],["happy","Fresh round. I'll be judging you ♪"]],
  mockStart:[
    ["intense","<b>{n}</b> questions, about <b>{mins}</b> minutes at exam pace. Notes away. Go~"],
    ["happy","Mock started ♪ Simple ones first, like a real paper. I won't say a word about answers until you submit."]
  ],
  mockPick:[["smug","Locked in. {left} to go~"],["happy","Noted. {left} left — and no, I'm not telling you if it's right ♪"]],
  mockAllIn:[["fluster","Everything's answered! Re-check the difficult ones, then submit (⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)"]],
  mockUnanswered:[["sad","You've left <b>{left}</b> blank. On a real paper a reasoned guess beats a blank — press Submit again if you're sure."]],
  mockGreat:[["smug","<b>{pct}%</b>. I'd say you're ready, but I'm biased. Simple tier {easy} — keep it that clean on the day~"]],
  mockOk:[["happy","<b>{pct}%</b> — a solid base. Weakest area: <b>{weak}</b>. Open that tail and drill its difficult tier next."]],
  mockLow:[["sad","<b>{pct}%</b>. That's exactly what mocks are for (｡•́ - •̀｡) Start with <b>{weak}</b>, read the explanations above, then take a fresh one."]],
  mockTool:[["happy","<b>{n}</b> questions from {cover}, in a 50/25/25 mix. Start when you're ready — not a word from me until you submit~"]],
  deep:[["happy","Textbook depth — <b>{book}</b>. This is where exam questions like to dig."]],
  jump:[["happy","Taking you to <b>{what}</b> ♪"],["smug","<b>{what}</b>. I knew you'd want that one."],["happy","There — <b>{what}</b>. Anything else, just hit <b>Ctrl+K</b> again~"]],
  palette:[["happy","Type anything — a formula, a trap, a number from a slide. It's all indexed (｡•ᴗ•｡)"],["smug","Faster than scrolling, isn't it."]],
  sheetOpen:[["intense","The whole course on one page. If you can rebuild these cards from memory you are ready."],["happy","Print it, fold it, carry it. Then try to write it out from memory — that's the part that actually works ♪"],["smug","Sixteen cards. That's the entire syllabus. I did warn you it was small."]],
  planPick:[["intense","<b>{mins} minutes</b>, <b>{n} steps</b>. I'll keep time — you keep moving (๑•̀ᗜ•́)ง"],["happy","{mins} minutes it is. Work top to bottom; the order isn't decorative."]],
  planTick:[["happy","{mins} minutes down ♪"],["smug","One less thing between you and the exam."],["happy","Ticked. Next one."]],
  planDone:[["intense","Plan finished ( ˶^ᵕ^˵ ) Sit one more paper, then only reread what you got wrong."],["happy","That's the whole plan done. I'm a little proud of you, which is embarrassing for both of us~"]],
  planTool:[["happy","The <b>{mins}-minute</b> plan: <b>{done} of {total}</b> steps ticked. Each line jumps to the exact section it names."],["smug","{done}/{total}. The clock doesn't care how you feel about it (¬‿¬)"]],
  weakRetry:[["intense","Cleared — <b>{tail}</b>, one more time. Getting it wrong twice is how it sticks."],["happy","Blank again. Try it without scrolling up first ♪"]],
  quizAhead:[["intense","Quiz ahead. Answer from memory first — no scrolling back up. I'll know~"]],
  warnAhead:[["sad","Careful with this box — it's where the slide slips, or where you will."]],
  foot:[["smug","You read all the way to the bottom? ...I noticed. I notice everything."]],
  select:[["happy","Highlighting something? Tap <b>Ask about this</b> and I'll unpack it for you ♪"]],
  copy:[["smug","Copying my notes? Rewrite them in your own words — it sticks better, trust me~"]],
  themeDark:[["fluster","Lights down... cosier like this, just us and the tail (・・；)"]],
  themeLight:[["happy","Bright mode! Easier on the small print ♪"]],
  chatThinking:[["smug","Hm, one moment — I'm answering you in the chat."]],
  chatDone:[["happy","Answered in the chat ♪ Tell me if it clicked — or if it didn't."]],
  chatClosed:[["happy","I'll be right here whenever you need me ♪"]],
  toolDefault:[["happy","Mm, I saw that. Change one number at a time so you can tell what moved what."],["intense","Keep poking it until the numbers stop surprising you."]]
};
</script>
