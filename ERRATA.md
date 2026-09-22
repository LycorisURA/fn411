# Errata in the course materials

Fifteen figures or conventions in the five lecture decks and nine class workbooks
disagree with an independent recomputation. Every number below was recomputed from
the formulas in the decks before being written down.

Each item is also flagged on the study platform itself, in a `Slide check` or
`Workbook check` box on the panel where it appears, showing the slide's figure
alongside the correct one. **Both figures are shown deliberately** — you may be
marked against the slide.

---

## Lecture decks

### 1. L5 · Forward contract — Rho(call)

| | |
|---|---|
| **Deck says** | `Rho(Call) = 25.29` |
| **Correct** | `52.293678` |
| **Cause** | Digit transposition of 52.29 |

On S = 118, K = 120, σ = 30%, y = 2%, T = 1 the class Black-Scholes calculator itself
returns 52.293678, and `=T*K*EXP(-y*T)*NORMSDIST(d2)` confirms it.

The error propagates. The deck reports the forward's `dy` weight as **238.47**; the
correct figure is **312.70** (or 309.54 using the deck's rounded V_F = 0.38).

**Fastest way to catch it:** a forward's two weights must differ by *exactly 1*, because
`w_rS − w_dy = (S − TKe^(−yT))/V_F = (C − P)/V_F = 1`. The deck's pair differs by 72.05.

### 2. L5 · Coupon-bond futures price

| | |
|---|---|
| **Deck says** | bracket `119.61`, futures price `121.42` |
| **Correct** | bracket `97.531938`, futures price `99.0059` |
| **Cause** | Error in the bracket; the multiplier e^(0.0075×2) = 1.0151 is right |

Both printed figures are impossible: the undiscounted post-delivery cash flows total
only **108** (2 + 2 + 2 + 102), so no positive discount rate can produce 119.61.

Term by term: `2e^(−0.01·3) + 2e^(−0.0125·4) + 2e^(−0.015·5) + 102e^(−0.0175·6)`
= 1.940891 + 1.902459 + 1.855487 + 91.833101 = **97.531938**, × 1.015113 = **99.0059**.

**Sanity check worth memorising:** a futures price must lie between the PV of the
post-delivery cash flows and their undiscounted sum.

### 3. L5 · Coupon-bond futures weight vector

| | |
|---|---|
| **Deck says** | financing element `75.68` |
| **Correct** | `151.3767` |
| **Cause** | The coefficient `T` was dropped |

The slide states T = 2 and uses it correctly in the first two rows, `−(2+1)` and
`−(2+2)`, then computes the third as `1 × (2×0.8106 + 102×0.7261) = 75.68`. It should be
`2 × 75.688366 = 151.3767`.

The companion practice workbook has T = 1, where the coefficient genuinely is 1 —
probably where the slip came from.

Separately, the middle element is printed as **+296.25** where `−(T+M)X_M B_M,0` gives
**−296.2688**; the deck's stray leading minus outside the vector suggests a sign that got
moved rather than applied.

### 4. L3 · Portfolio of basic assets — the 5% multiplier

| | |
|---|---|
| **Deck says** | `−0.02636% + (−1.96) × 0.61286% = −1.0344%` |
| **Correct** | the multiplier is `−1.644854`, not −1.96 |
| **Cause** | −1.96 belongs to α = 2.5%, not 5% |

The reported answer **−1.0344% is right**; the printed multiplier is wrong. −1.96 would
give −1.22756%. The workbook cell contains `=K22+NORMSINV(0.05)*K23`, and
`NORMSINV(0.05) = −1.644854`.

Using −1.96 for a 95% VaR overstates it by **19.2%**.

### 5. L3 · T-bill example — σ labelled as σ²

| | |
|---|---|
| **Deck says** | `σ̂²_y = 0.000892` and `σ̂²_B = 0.001752` |
| **Correct** | these are **standard deviations**, not variances |

The class sheet computes `=STDEV(D7:D16)` = **0.0008895223**. The true variance is
**7.9125 × 10⁻⁷**.

Proof it cannot be a variance: if 0.000892 were one, then `D_mod² × 0.000892 = 0.003463`,
nowhere near the 0.001752 the deck prints on the next line.

The arithmetic and the final **−3,623.18** are correct — only the labels are wrong.

### 6. L4 · Option weight vector — N(d₁) and N(d₂)

| | |
|---|---|
| **Deck says** | call uses `N(d₁) = 0.5714`, put uses `0.5716`, and `N(d₂) = 0.5186` |
| **Correct** | `N(d₁) = 0.5714966`, `N(d₂) = 0.5189376` |

Two different values for N(d₁) for the same option on the same slide. Neither changes the
final VaR at the printed precision, because the deck's w values (9.47, 8.47, −9.45, −10.45)
came from the workbook rather than from the rounded N values.

### 7. L4 · Binomial analysis — mislabelled payoff

The down-state line reads `C1u = Max(0, 904.84 − 1000) = 0.00` when it is the **down**
state and should read `C1d`. The value 0.00 is correct.

Recomputing with unrounded u and d also gives `B = −461.1853` against the deck's
−461.19, and `C = 63.7939` against 63.79 — rounding only.

### 8. L2 · t-test — degrees of freedom

| | |
|---|---|
| **Deck says** | compares t = 1.9914 against `2.31` at 8 df |
| **Correct** | df = T − 1 = **9**, critical value **2.2622** (`=T.INV.2T(0.05,9)`) |

The conclusion is unchanged, since 1.9914 is below both.

### 9. L2 · t-test — garbled conclusion

The slide reads *"we cannot reject the null hypothesis that the expected return of this
stock is significantly different from zero"*. The null **is** that the mean is zero, so the
correct statement is: **we cannot reject the null that μ = 0, so the mean is not
significantly different from zero.**

### 10. L2 · Two different variance formulas

The VaR slide gives `σ̂² = (1/(T−1))Σ(rₜ − μ̂)²`; the later volatility slide gives
`s² = (1/T)Σ(rₜ − r̄)²`. Those are `STDEV.S` and `STDEV.P` and are not the same number.

Every class workbook uses `STDEV`, the **T − 1** version, so follow that. At T = 250 the
gap is 0.2%; on a 10-observation question it is 5.4%.

---

## Class workbooks

### 11. `22/7` used for π in the normal density

Three of the four class option calculators compute

```excel
=EXP(-(d^2)/2)/SQRT(2*22/7)
```

`22/7 = 3.142857` is not `π = 3.141593`. Because it sits in the denominator, the density —
and therefore **Vega** and **Gamma**, the only outputs that use it — come out
**0.02012% too small**.

On the 1382.41 example: Gamma `0.00213928` should be **0.00213971**, and Vega
`542.51655` should be **542.62572**.

The *digital option* sheet already uses `SQRT(2*PI())` correctly, so the fix is a
one-character edit. **Prices, Delta and Rho are unaffected** — they use `NORMSDIST`, not
the density — so every VaR in the course is fine.

### 12. `STDEV^2` paired with `COVAR` in the same Ω

The class sheets build the variance-covariance matrix with `=STDEV(...)^2` on the diagonal
and `=COVAR(...)` off it. Legacy `COVAR` is `COVARIANCE.P` — it divides by **n**, while
`STDEV` divides by **n − 1**.

The off-diagonals are therefore **0.4% too small at n = 250**. On the option example,
`Cov(dy, r_S) = 6.682909e−08` where the consistent sample value is **6.709748e−08**.

The effect on VaR is in the fifth decimal place, so **do not "fix" the class answers** — but
in your own sheets pair `VAR.S` with `COVARIANCE.S`. A mismatched matrix can in principle
stop being positive semi-definite, which makes `SQRT` of the portfolio variance return
`#NUM!`.

### 13. Coupon-bond sheet mixes compounding conventions

The `Example VaR Coupon bond` sheet discounts **discretely**

```excel
=D3/(1+C3/100)^B3
```

but builds the adjusted weight with **−t**, which is the **continuous**-compounding
duration. A consistent discrete treatment needs `−t/(1+y_t)`.

| | |
|---|---|
| **Sheet gives** | VaR = `−0.35251%` |
| **Consistent discrete** | VaR = `−0.34460%` |
| **Overstatement** | about **2.3%** |

The companion futures workbook *is* internally consistent — it discounts with
`EXP(-y*t)` and uses `−t`.

**Rule:** continuous discounting → multiplier `−t`. Discrete discounting → `−t/(1+y_t)`.

### 14. Digital-option Delta uses the CDF instead of the density

In `Exercise_ans`, *digital option* tab, the analytical digital-call Delta is

```excel
=EXP(-F3*D3)*E14/(B3*E3*SQRT(D3))      ← E14 = NORMSDIST(d2), the CDF
```

The correct formula uses the density φ(d₂):  Δ = e^(−yT)·φ(d₂) / (S·σ·√T).

| | |
|---|---|
| **Sheet gives** | `0.0322353` |
| **Correct** | `0.0264945` |
| **Sheet's own numerical Delta** | `0.0264753` — contradicts its analytical value |

Tell-tale sign: with N(d₂) in the numerator, the stock weight Δ·S/Op collapses to
exactly `1/(σ√T) = 8` for any inputs. The correct weight is **6.5753**. The digital Rho in
the same sheet correctly uses φ(d₂) and is right.

### 15. Futures practice key — broken `TRANSPOSE` in the 6×6 Ω

In `Spot Curves_ans2.xlsx` (Sheet1), cell `V268` is `{=TRANSPOSE(U272)}` — a single-cell
array — copied across `V268:Y268`. Row 2 of the 6×6 covariance matrix therefore repeats
Cov(dy₂, dy₆) = 2.9757×10⁻⁸ four times instead of holding Cov(dy₂, dy₃), Cov(dy₂, dy₄),
Cov(dy₂, dy₅), and the matrix is not symmetric.

| | |
|---|---|
| **Key's futures VaR** | `−3.9135563` |
| **With the correct matrix** (same population divisor) | `−3.9137954` |

Small here because the covariances are similar in size, but the matrix is wrong. The
earlier 5×5 block on the same sheet (rows 260–264) is built correctly.

### A convention that changes between files: `VarCovar()`

The lecturer's custom VBA function is not the same in every workbook:

| Workbook | Diagonal | Off-diagonal |
|---|---|---|
| Lecture examples (250-day curve, option example) | `Var` (n−1) | `Covar` (n) — mixed |
| Additional questions | `Var_S` (n−1) | `Covariance_S` (n−1) — consistent |

Not an error in any one file, but it means two keys built on the same data can differ in
the fifth decimal. The Excel solver's Data sheet has a switch for each.

---

## Ambiguity worth asking about

Not an error, but the `Exercise_ans` workbook's *plain vanilla option* sheet asks for
options "at the money, **T = 3 months**" while the answer block prices them with
`Time to Exp = 1` (year), and its binomial leg uses `u = EXP(sigma) - 1` with no time
scaling, which is also one year.

Every price and weight on that sheet changes if the intended horizon really is three
months. Worth confirming with the lecturer before relying on those figures.
