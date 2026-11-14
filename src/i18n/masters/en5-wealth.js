// Today tab · wealth lines, 5× expansion (appended to the existing sets). One line = one sentence
const L = s => s.trim().split('\n').map(x => x.trim()).filter(Boolean);
export default {
  flow: [
    L(`
Your wallet may get lighter faster than you expect today.
The way out for money is wider than the way in today.
Small payments can pile up into a burden today.
Money luck takes a short breather today.
Your money math may be off more than usual today.
Spending tends to follow your mood today.
Money energy is weak, so holding on matters today.
Talk about money may weigh on your mind today.
Money owed to you arrives late while bills arrive early today.
Unplanned costs tend to pop up today.
Your heart wavers easily in front of money today.
The flow of money may feel blocked for a while.
Plugging leaks matters as much as earning today.
Money matters may not run as smoothly as you hoped today.
Small losses may bother you today.
Impulse purchases tend to sneak in today.
Quietly holding on to money works best today.
Money moves slowly and may feel frustrating today.
Spending on others tends to grow today.
You may buy by mood rather than by price tag today.
The more you chase money today, the further it drifts.
Plans that involve money may hit a snag today.
Money luck runs low, so don’t push it today.
Simply postponing spending is a gain today.
`),
    L(`
Money moves at its usual pace today.
The flow of money stays level today.
Income and spending balance each other today.
Money luck is average, so habits decide the result today.
Not much news on the money front today.
You neither earn big nor spend big today.
Money flow holds its place calmly today.
Stick to the plan and you’ll have no regrets today.
Your usual judgment is enough for money matters today.
Money is quiet, but small management pays off today.
What should come in comes in, and what should go out goes out.
Today’s money luck moves within the range you expect.
There’s no reason to rush on money today.
Money energy flows evenly and your mind is at ease.
Sticking to your budget comes easily today.
Money is quiet but steady today.
Small savings easily turn into visible results today.
Money in and out is easy to see at a glance today.
Money keeps its usual pace today.
A good day to balance spending and saving.
No big ups and downs in money flow today.
A good day to reset your spending rules.
Money luck is fair, so steadiness is your strength today.
Your familiar way with money suits you best today.
`),
    L(`
Money energy comes alive and bright today.
Money-related messages tend to arrive as good news today.
Small gains tend to come one after another today.
A tailwind blows through your money flow today.
Your sense for money is sharper than usual today.
Money you’ve been waiting for may come in today.
Good terms catch your eye easily today.
Things go smoothly on the money side today.
Effort is easily rewarded today.
Money talks tend to go smoothly today.
Money luck rises, a good day to act on plans.
Things you bought wisely tend to satisfy you today.
Money flow opens wide, with plenty of options today.
Your money judgments tend to hit the mark today.
Unexpected perks or discounts may come your way today.
Money luck is lively, so moving more pays off today.
Ideas for more income come easily today.
Settlements and deals tend to wrap up cleanly today.
A little luck follows you on the money side today.
The flow of money leans your way today.
The trust you’ve built may turn into gains today.
Money luck is good, so you gain strength in negotiations today.
Money gathers faster today.
Money energy is ample and your mind feels roomy too.
`),
  ],
  more: [
    L(`
If something catches your eye today, leave it in the cart and let a day pass.
On tired days, spending as a reward tends to grow.
Before spending on someone, ask whether that plan is really needed.
Even small auto-payments can become a burden when they stack up.
Think of the money you save today as next week’s breathing room.
Raising your voice over money tends to make the loss bigger.
A decision you postpone pays off more than one you rush today.
If cutting back is hard, use cash or a debit card just for today.
Simply checking your balance changes how you spend.
The urge to buy what others buy runs high today.
Think of today as a day for protecting money and you’ll feel lighter.
Rushing to make up a loss tends to lead to a bigger one.
`),
    L(`
A good day to skim your spending and gauge this month’s flow.
On days when money barely moves, small habits make the difference.
A planned purchase is fine to go ahead with today.
Lining up income and payment dates makes next month easier.
Quiet days are good for the money tidying you’ve put off.
Splitting today’s spent and unspent money gives you a standard.
Small adjustments suit today better than big decisions.
If you need something, comparing prices first won’t make you late.
Money luck is even, so you could raise your savings rate a little.
Money worries look simpler once you write them down as numbers.
Steady management beats big ambitions today.
Mark payday or settlement dates on your calendar to see the flow.
`),
    L(`
On good-flow days, decide where incoming money goes first and it lasts longer.
Money talks you’ve put off tend to go smoothly today.
A small side gig or sharing a skill could turn into income.
If you see good terms, note them and check them today.
The better your money luck, the more keeping records helps next time.
A good day to use up the points or perks you’ve saved.
Move part of today’s extra into your emergency fund for peace of mind.
If you have something to negotiate, state the terms you want clearly.
Even when money flows well, think twice about big unplanned spending.
Gratitude for what comes in tends to invite the next flow.
Record today’s small gain with a smile.
Sharing good information with people around you widens your chances.
`),
  ],
  why: {
    pyeon: L(`
Indirect Wealth arrives, so money changing hands picks up speed.
Indirect Wealth comes alive, so chances show up in deals and sales.
Thanks to Indirect Wealth, money talk tends to come through people.
Indirect Wealth enters today, so the more active you are, the bigger the flow.
Indirect Wealth moves, so money outside your fixed income stands out.
Indirect Wealth spreads wide, a good time to find a new source of income.
Indirect Wealth gains strength, so outside activities tend to pay off.
Indirect Wealth arrives, so you may get to handle bigger sums.
Indirect Wealth opens up, so your feel for bargaining is sharp.
Indirect Wealth sparkles, so unexpected perks may come in.
With Indirect Wealth here, the wider your circle, the wider your money paths.
Indirect Wealth is in the air, so moving is the better choice today.
`),
    jeong: L(`
Direct Wealth arrives, so steady work tends to come back as reward.
Direct Wealth is stable, so planned money management fits well.
Direct Wealth gains strength, so regular income stacks up neatly.
Direct Wealth enters today, so diligence turns into wealth.
Thanks to Direct Wealth, settlements and payments tend to go smoothly.
Direct Wealth comes alive, so your power to save frugally grows.
Direct Wealth moves, so promised money tends to arrive on time.
Direct Wealth flows well, so a budget you set tends to hold.
Direct Wealth arrives, good for balancing living costs and savings.
Direct Wealth is solid, so even small money doesn’t leak away.
Direct Wealth settles in, so sensible choices pay off today.
With Direct Wealth here, money tends to move through trustworthy places.
`),
    bad: L(`
The wealth star arrives but feels heavy, so the tighter you grip, the more leaks.
Wealth energy weighs on you, so thinking about money may tire you.
Wealth comes in but is hard to handle, so overreaching plans may backfire.
The wealth star acts as a burden, so spending pressure may grow.
Wealth energy comes in strong, so greed may outrun judgment.
Wealth stars crowd in today, so money matters may demand more attention.
The wealth star presses on you, so stepping back helps today.
Wealth energy overflows, so your power to manage it may fall short.
Wealth comes in as a burden, so be careful handling large sums.
The wealth star feels heavy, so keeping beats spending today.
Wealth energy is a lot to carry, so stay out of others’ money matters.
Wealth comes in, but tend to your energy and mood first to protect your money.
`),
    rob: L(`
Rob Wealth arrives, so money may get tangled with people close to you.
Rob Wealth is strong, so competition may push spending up.
Rob Wealth moves today, so your share of shared costs may grow.
Rob Wealth cuts in, so others’ requests may open your wallet.
With Rob Wealth around, protecting your share needs clear lines.
Rob Wealth arrives, so you may spend just to save face.
Rob Wealth gains strength, so be careful with partnerships or joint investing.
Rob Wealth is in the air, so fuzzy math tends to cost you.
Rob Wealth enters today, so group costs may run higher than expected.
Rob Wealth moves, so you may get swept up in others’ spending.
With Rob Wealth around, avoid lending money today.
Rob Wealth is present, so put money promises in writing to be safe.
`),
    output: L(`
Output comes alive, so your skills and ideas can turn into income.
Output energy flows into wealth, so your work’s value gets recognized.
Output moves, so sales and promotion tend to bring results.
Output supports wealth today, so the more you show your skills, the better.
Output arrives, so a side gig or shared skill may turn into money.
Thanks to Output, your words and writing can connect to income.
Output feeds Wealth today, so what you make tends to sell well.
Output is lively, so new income ideas come easily.
Output flows well, a good day to polish your service or product.
Output arrives, a good time to re-price your skills.
Output is alive, so results show in proportion to effort.
Output leads to wealth today, so finishing your work brings reward.
`),
    doc: L(`
Resource arrives, so contracts and records help sort out money matters.
Thanks to Resource, money confirmed on paper is reliable.
Resource moves, so paperwork like insurance, refunds or grants tends to clear.
Resource enters today, so what you’ve learned helps protect your money.
Resource flows well, a good day to read contract terms carefully.
Resource gains strength, so advice from elders helps your finances.
With Resource around, promises in writing carry weight.
Resource arrives, good for sorting papers on a home or big purchase.
Resource comes alive, a good day to study money matters.
Thanks to Resource, checking pays off more than rushing.
Resource moves, good for wrapping up title or contract matters.
With Resource here, keeping receipts and records is money management itself.
`),
    none: L(`
The wealth star rests today, so keeping your usual spending is enough.
Wealth energy is calm today, so no big hopes or big worries are needed.
Wealth energy isn’t moving, so your set budget is the best guide.
The wealth star is quiet, so review existing plans rather than starting new ones.
Money energy is calm today, so living by habit works fine.
Wealth energy barely moves in or out, good for calm management.
The wealth star catches its breath, so there’s no need to hurry.
Money flow is level today, so small savings stay with you.
Wealth energy is calm, so you can set money thoughts aside for a while.
The wealth star stays put, so plugging leaks is enough.
Little change on the money side today, good for sorting and checking.
Wealth energy is quiet, so just avoid unplanned spending.
`),
  },
  caution: L(`
Before paying, ask yourself once more if you really need it.
Check small costs like fees and shipping carefully.
Note the date your free trial ends.
Don’t open payment requests that come through unfamiliar links.
Avoid co-signing for anyone today.
Don’t rush to pay just because it says limited edition.
For promises involving big money, check the contract first.
Be careful not to max out your card.
Decide in advance how to split group costs.
Hold off on purchases whose refund policy you haven’t checked.
Check account numbers twice before sending.
Push shopping on low-mood days to tomorrow.
Be especially wary of anything promising guaranteed returns today.
Don’t answer right away when asked to lend money.
Hold off on big purchases you haven’t price-compared.
Keep receipts and transaction records instead of tossing them.
Don’t share your app payment password with anyone.
Top up prepaid balances only as much as you need.
Check for old subscriptions still running.
Avoid paying on someone else’s behalf today.
When money talk heats up, pause the conversation for a moment.
Watch out for dining or drinks bills driven by the mood.
Check that auto-transfer dates match your balance.
Hold off on browsing loan products in a rush.
Check whether an unusually low price has a catch.
For group buys or split bills, settle the amounts first.
Act on money tips from others only after checking them yourself.
Hold off on opening a new card or payment method today.
Steer clear of small bets or money left to chance today.
Keep gift spending within your budget.
Double-check your orders and deliveries.
Send deposits or down payments only after checking the terms.
Payments made while tired tend to have mistakes.
Look at remaining installments together with this month’s bills.
Keep a record of money promises even with family or friends.
Make sure you don’t leave your wallet or cards behind.
`),
  tip: L(`
Add a one-line note to each expense today.
Turn on your budget app alerts, even for just one day.
Clear out the cards in your wallet you never use.
Set a weekly budget and split it into daily amounts.
Keep a separate list of things you want to buy.
Move spare change and small sums into a separate savings account.
Write this month’s fixed costs on one page.
When an urge hits, count to ten and think again.
Swap one meal out for a home-cooked one.
Sell things you no longer use secondhand.
Set a target amount for your emergency fund.
Looking at when you spend reveals your habits.
Check your fridge before you shop.
Using one payment method makes the flow easier to see.
Sort spending into must-have, nice-to-have and can-skip.
Build the habit of saving first on payday.
Jot down how much you saved today in a little box.
Check that you didn’t buy the same thing twice.
Write your money goal in one sentence.
Build the habit of checking spending alerts right away.
Choose gifts for the thought rather than the price.
Set a separate budget for small pleasures.
If delivery fees bug you, order for pickup.
Review old bills like your phone plan or insurance.
Pick one no-spend day this week.
Mark money-in and money-out days on your calendar.
Keeping receipt photos in one place makes sorting easy.
Photograph what you want and look again in a week.
Enjoy the fun of saving small amounts.
Review your spending on the same day each month.
Check whether there’s a refund or money owed to you.
Ask whether items sitting in your cart for ages are really needed.
Check that similar subscriptions don’t overlap.
When you hit a savings goal, give yourself a small pat on the back.
Read one book or article about money.
Pick the single biggest item in your spending and trim it.
`),
  act: [
    L(`
Leave your cart as it is for just one day.
Write down what’s left of this week’s budget in numbers.
Look again at your five most recent payments.
Keep only one plan that costs money today and push the rest.
Open your auto-payment list and cancel at least one.
Use only cash or a debit card today.
Match today’s spending against the receipts in your wallet.
Make a note of money you lent or are owed.
Pause unplanned payments for today.
Turn off shopping app notifications for a while.
Move one big expense this month to next month.
If money worries you, lay out the situation in numbers.
`),
    L(`
Split this month’s spending into simple categories.
Check the amount of your automatic savings transfer.
See if you have unused points.
Write down next week’s planned expenses in advance.
Match your bank balance against upcoming card payments.
Move even a small amount into savings.
Make a shopping list and buy exactly that.
Recheck this month’s savings goal.
Compare prices and buy one thing you truly need.
Catch up on a week of budget entries at once.
Open your insurance or phone bill statement.
If a big expense is coming next month, set aside funds now.
`),
    L(`
If you’re owed money or a refund, request it today.
Write down one concrete way to increase your income.
Move part of what comes in straight into your emergency fund.
If you see a product with good terms, compare it carefully.
Look into a side gig that uses your talents.
Prepare to bring up your salary or rates.
Record today’s gain and decide what it’s for.
Send the quotes or invoices you’ve put off today.
Set one long-term savings goal.
Spend an hour learning about money.
Thank the person who tipped you off to a good deal.
Plan what to do with this month’s spare funds.
`),
  ],
};
