# Risk scoring & model ranking

Detail reference for the `prioritize-risks` skill, grounded in *Running Lean* (Ch. 4, "Prioritize Where to Start").

## Risk vs. uncertainty

Following Douglas Hubbard (*How to Measure Anything*):
- **Uncertainty** — more than one possible outcome.
- **Risk** — uncertainty where some outcomes involve a loss (opportunity cost or real cost).

You're uncertain about many things that aren't risky. Rank by **risk**: roughly, *probability of the bad outcome × cost if you're wrong*. The Lean Canvas already surfaces the uncertainties; your job is to flag which ones carry real loss and how unproven they are. You don't need statistics — a defensible relative ordering beats a precise model you won't build.

A worked intuition from the book: a high *cost* of being wrong doesn't make something top-risk if the *probability* of being wrong is low. (Maurya didn't treat book pricing as high risk — even though getting it wrong would hurt, he judged the odds of it being wrong as low given a good book — so he tested the table of contents vs. price instead.)

## The three risk types

Every assumption falls into one of three buckets (Figure 4-1 in the book):

| Type | Question | Lives mostly in (canvas) |
|---|---|---|
| **Product risk** | Getting the product right | Problem, Solution, Key Metrics, UVP |
| **Customer risk** | Building a path to customers | Customer Segments, Channels, Early Adopters |
| **Market risk** | Building a viable business | Unfair Advantage, Revenue Streams, Cost Structure |

Early-stage reality check: founders over-weight **product risk** (the solution) because that's what they love building. The riskier buckets are usually **customer** and **market** — *will anyone want it, can you reach them, will they pay?* Unless the technical problem is genuinely hard (a new algorithm, a cure, hard science), assume you can build it and put the market/customer assumptions on top.

## Ranking assumptions within a model

1. List each load-bearing assumption as a near-falsifiable claim.
2. Tag it product / customer / market, and mark **proven / partial / unproven**.
3. Order by risk (loss-if-wrong × how unproven). The **riskiest *untested* assumption** is where you start.
4. For early ventures, this almost always lands on a **problem/customer** assumption → problem interviews are the first experiment.

## Ranking *between* models (multiple canvases)

When you have several Lean Canvas variants (e.g. different customer segments), lay them side by side and rank which to start with. Maurya's weighting order, **highest to lowest**:

1. **Customer pain level (Problem)** — prioritize segments that need the product most; aim for top problems that are *must-haves*.
2. **Ease of reach (Channels)** — an easier path to customers gets you out of the building and learning faster.
3. **Price / gross margin (Revenue & Cost)** — segments that let you keep more per sale need fewer customers to break even.
4. **Market size (Customer Segments)** — big enough for your goals (but note it ranks *below* pain and reach — a huge market you can't reach or that doesn't hurt is worthless early).
5. **Technical feasibility (Solution)** — can you build the minimum feature set? Usually the *least* risky factor, hence last.

Recommend a starting model and name what makes the runner-up tempting (so it can be revisited), and which models to shelve and why.

## Calibrating with advisors (optional)

Before committing, a few **business-model interviews** with advisors/prototypical customers can calibrate the ranking. Walk them through the canvas (don't pitch a 10-slide deck — incrementally reveal the canvas, ~20% talking / 80% listening) and ask:
- What do you consider the riskiest aspect of this plan?
- Have you overcome similar risks? How?
- How would you go about testing these risks?
- Are there other people I should speak with?

The **advisor paradox**: get good advice, but don't blindly follow it — *apply* it. Treat answers as input for identifying and prioritizing risk, not as judgment or validation. You still own the model.
