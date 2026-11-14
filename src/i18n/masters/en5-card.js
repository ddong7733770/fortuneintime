// Today tab domain cards: one-line leads (score 1–5) · to-dos (up/down) · avoid list, 5× expansion (appended)
const L = s => s.trim().split('\n').map(x => x.trim()).filter(Boolean);
export const LEAD5 = {
  wealth: [
    L(`
Spending piles up today. Pay only for what you must.
Money slips out easily. Leave your cards at home.
Chasing losses may cost more. Stop for today.
Money promises tangle easily. Avoid lending.
Money luck is near the bottom. Focus only on holding on.
You may spend by mood. Look at your cart again tomorrow.
Money worries grow today. Writing numbers down lightens them.
Leaks show up today. Check your auto-payments first.
Calculations go off easily. Check transfers twice.
Greed backfires today. Postpone big deals.
Your wallet thins out easily. Cook at home instead of eating out.
Money arguments flare easily. Pause when emotions rise.
`),
    L(`
A bit more goes out today. Readjust your budget.
Spending temptations keep coming. Hold out for one day.
Small payments stack up. Write down what you spent.
Money moves slowly. Check what you’re owed.
Better for saving than spending. Try a no-spend day.
Money judgment may blur. Trust numbers over talk.
Discounts may sway you. Ask if you really need it.
Spending outruns income. Skim your fixed costs.
Money takes a breather. Push big purchases back.
Expenses tend to pop up. Keep some funds in reserve.
The more you save, the more remains. Record what you saved.
Rushing costs you today. Decide slowly.
`),
    L(`
Money is calm. Manage it as usual.
In and out balance today. Tidy your budget.
Ordinary is good today. Check your savings transfer.
Money flows evenly. Plan for next month.
No big changes. Keep your small saving habits.
A good day to spend as planned. Compare before buying.
Money is stable. Add a little to your emergency fund.
Things run smoothly. Collect your points and perks.
Money quietly builds. Note today’s spending in one line.
Habits become results. Trim one fixed cost.
Things are balanced. Line up income and payment dates.
Your usual rhythm is enough. Review your subscriptions.
`),
    L(`
Good money news may come. Don’t miss any messages.
Your money sense is sharp. Note good terms.
Effort gets rewarded. Request what you’re owed today.
Small gains add up. Save part of them right away.
Deals go smoothly. Send the quote you’ve put off.
Money leans your way. Try negotiating.
Perks stand out today. Check for missed refunds.
Income ideas come easily. Write them down now.
Money luck is rising. Raise your savings goal.
Money talks go well. Wrap up settlements.
A good day to secure real gains. Consider only needed investments.
Good chances show up. Compare terms carefully.
`),
    L(`
Money luck peaks today. Act on what you’ve prepared.
Money gathers today. Save as much as comes in.
A big harvest is in sight. Handle contracts and settlements.
Money energy overflows. Don’t miss the chance.
Effort turns into money. Present your work with confidence.
Negotiations go well. State the terms you want.
Income tends to grow. Decide its use first.
The door to wealth is open. Move ahead with postponed deals.
Your money sense shines. Make a long-term plan.
Good deals keep coming. Build trust while you’re at it.
Unexpected gains may come. Share some thanks too.
Money luck is in full bloom. Stay grounded and keep records.
`),
  ],
  love: [
    L(`
Emotions are sharp today. Don’t reach conclusions.
Hurt grows easily. Don’t guess alone.
Words come out wrong. Reread before sending.
Your heart is tired. Look after yourself first.
Arguments flare easily. Pause before answering.
Hopes may fall flat. Lower your expectations.
Messages keep missing. Wait instead of pushing.
Misunderstandings pile up. Check the facts first.
The relationship feels heavy. Some space is okay.
Old memories surface. Leave the past alone.
Your heart wavers. Talk with a trusted friend.
Emotional wear is high. Resting early is the answer.
`),
    L(`
Expressing yourself is awkward. Keep it short and warm.
Your paces don’t match. Respect their timing.
Small things sting. Let them slide.
Love luck dips a little. Avoid overcommitting.
Waiting feels long. Focus on your own things.
Talk stays on the surface. Change your question.
You feel impatient. Look at the process, not the result.
A little hurt passes by. Think of what you’re grateful for first.
The relationship is quiet. Send just a light hello.
Comparing comes easily. Look only at your own relationship.
Moods swing. Postpone important talks.
Words feel awkward. Show it through actions.
`),
    L(`
The relationship feels easy. Enjoy small talk.
Everyday sweetness today. Share a meal together.
Familiarity feels good. Say thanks out loud.
Your heart is calm. Ask about their day.
Things carry on gently. Keep small promises.
A fair day for connection. Reach out to an old friend.
A peaceful day. Take a walk together.
A good day to look back. Recall good memories.
Things quietly deepen. Hear them out fully.
There’s a sense of stability. Plan your next date.
If you’re single, focus on yourself. Enjoy a hobby.
A comfortable warmth today. Offer a light compliment.
`),
    L(`
Interest goes both ways. Approach with a smile.
Conversations click. Ask what you’re curious about.
Excitement grows. Suggest a plan.
Hearts connect easily. Be honest about your feelings.
New connections appear. Go to a gathering.
You’re getting closer. Make plans together.
Your charm shows. Just be yourself.
Messages are welcome. Reply warmly.
The mood is good. Go somewhere new.
Connection is near. Don’t turn down introductions.
Sincerity gets through. Share your thanks.
Good signs come. Respond without hesitating.
`),
    L(`
Love luck is in full bloom. Share your feelings.
Love shines today. Plan a special date.
Connection is coming. Stay open to new people.
A good day to confess. Find your courage.
The relationship deepens. Talk about the future.
Your charm is at its peak. Be the star of the gathering.
Hearts become one. Spend more time together.
Full of excitement. Make a day to remember.
You and your partner are in sync. Try something new together.
Good people are easy to meet. Make plans.
You’re loved today. Show it back just as much.
The door to connection is open. Reach out first.
`),
  ],
  work: [
    L(`
Work stalls easily. Stick to the basics today.
Mistakes can grow. Recheck before submitting.
Pressure is heavy. Share the work.
Plans go off track. Reset your priorities.
Focus scatters. Turn off notifications.
Opinions clash. Put things in writing.
Energy is low. Postpone big decisions.
Results are slow. Don’t rush.
Work piles up. Finish just three things.
Reviews weigh on you. Focus on what you can do.
A day to endure. Getting through it safely is enough.
Lots of variables. Prepare a plan B.
`),
    L(`
Attention to detail is needed. Check numbers and dates.
The pace is slow. Be accurate.
Work feels a bit heavy. Ask for help.
Deadlines are close. Finish what you started.
Watch for mistakes. Use a checklist.
Focus is weak. Work in short bursts.
Confirmation is needed. Note your instructions.
Tasks overlap. Realign your schedule.
A day for finishing, not starting. Wrap up what’s left.
Be careful. Read to the end before signing.
Save your energy. Do only key tasks in the morning.
Small problems may arise. Keep backups.
`),
    L(`
Work flows calmly. Proceed as planned.
A fair day. Finish small postponed tasks.
Consistency shines. Keep your routine.
A good day to tidy up. Clear files and emails.
Your usual skill is enough. Trust yourself.
A good day to review. Organize what you learned.
Teamwork is fine. Share your progress.
Things flow evenly. Plan next week.
A stable day. Strengthen the basics.
A quiet day. Focus on one hard task.
A balanced day. Keep work and rest apart.
A good day to check in. Revisit your goals.
`),
    L(`
Results show today. Share them.
Ideas shine. Speak up in meetings.
Collaboration goes well. Propose joint work.
Recognition comes easily. Keep up with reports.
Focus is strong. Start with the hardest task.
Chances come. Raise your hand.
You learn fast. Start a new course.
You’re persuasive. Polish your proposal.
Work goes smoothly. Finish what you put off.
Reviews go well. Present with confidence.
The flow is good. Set your next goal.
Help is coming. Say clearly what you need.
`),
    L(`
Work luck peaks today. Do your most important task.
Your skill shows. Step forward.
A day of big results. Show everything you’ve prepared.
Your decisions shine. Make the call you’ve put off.
Your leadership lands. Lead the team.
Great for exams and interviews. Be confident.
Chances abound. Take on a new project.
Results show in numbers. Keep records.
Recognition follows. Credit those who helped too.
Work opens up wide. Scale your plan up a level.
Energy overflows. Take on a tough challenge.
You’re on a roll. Keep it going.
`),
  ],
  health: [
    L(`
Your body feels heavy. Cut your plans boldly.
Fatigue is high. Go to bed early.
Energy is at rock bottom. Postpone strenuous plans.
Your body is sending strong signals. Rest comes first.
You tire easily. Sit and rest often.
Recovery is slow. Settle your stomach with warm food.
You’re running low. Keep exercise light.
Tension builds up. Take deep breaths.
Injuries happen easily. Move slowly.
You need sleep. Turn off screens early.
You may get chilled. Dress warmly.
Rest is the job today. Be kind to yourself.
`),
    L(`
Some fatigue lingers. Take short breaks often.
Save your energy. Avoid overeating.
Your body feels stiff. Stretch it out.
Your rhythm may slip. Keep mealtimes.
You tire easily. Drink water instead of caffeine.
You feel heavy. Take the stairs slowly instead of the elevator.
Focus dips. Rest your eyes often.
Energy is low. Cut back on late plans.
Use your body sparingly. Avoid hard workouts.
Tension lingers. Take a warm shower.
You’re short on sleep. Keep naps short.
A day to manage your condition. Wrap up early.
`),
    L(`
Your body is fine. Keep up your exercise.
You’re in balance. Drink water often.
Your usual rhythm. Look after sleep and meals.
An easy day. Take a light walk.
Your body is steady. Mind your posture.
A stable day. Add one more vegetable.
No strain today. Finish with a stretch.
A quiet day. Check your habits.
Your condition is level. Catch a little sun.
Consistency is needed. Hit your step count.
Your body is calm. Build an early-bed habit.
Health is fine. Pick a healthy snack.
`),
    L(`
Your body feels light. Be more active.
Recovery is quick. Catch up on exercise.
Vitality flows. Get outside.
Energy rises. Try a new workout.
Your body cooperates. Take the stairs.
You feel good. Set a health goal.
A refreshing day. Start with a morning walk.
Energy is ample. Plan a workout with a friend.
You feel refreshed. Eat well.
Great for activity. Enjoy a bike ride or a hike.
You’re getting stronger. Raise the intensity a little.
A feel-good day. Enjoy moving.
`),
    L(`
You’re in top condition. Take on physical challenges.
Vitality overflows. Move as much as you like.
You feel like you could fly. Start a new workout.
Full of energy. Enjoy a good sweat.
Recovery is at its best. Tackle postponed tasks in one go.
Energy overflows. Spend more time outdoors.
Body and mind feel light. Plan a trip or outing.
Your stamina shines. Go for a personal best.
Health luck is in full bloom. Start a good habit.
Your body moves well. Just warm up and enjoy.
Lively energy flows. Get moving with people around you.
A refreshing day. Note how good you feel.
`),
  ],
};

export const TODO5 = {
  wealth: {
    up: L(`
If you’re owed money, reach out today
Compare products with good terms
Decide where incoming money goes first
Write down one side-income idea
Send the quote you’ve put off
Raise your savings target a little
Collect your points and perks
Try negotiating the price
Check for anything you can get refunded
Put a bit more into your emergency fund
Spend 30 minutes learning about money
Thank your clients or customers
Tally this month’s income
Make a long-term savings plan
Buy something you needed at a good price
List items you can sell
Re-price your skills
Check your settlement details carefully
Save part of your earnings right away
Thank the person who shared a good tip
Plan this month’s spare funds
Organize your money paperwork
Prepare to discuss your salary or rates
Record today’s gains
`),
    down: L(`
Wait one day before paying today
Review your auto-payment list
Log today’s spending in your budget
Sort the receipts in your wallet
Reset this week’s budget
Set a no-spend window
Turn off shopping app alerts
Use only cash or a debit card
Write down what you’re owed and what you owe
Buy only what’s on your shopping list
Check your card statement ahead of time
Cook at home instead of eating out
Clear out things you don’t use
Check the account twice before sending money
Check when free trials end
Write down this month’s fixed costs
Count to ten when an urge hits
Check your remaining installments
Agree on group costs in advance
Just photograph things you want to buy
Review your phone or insurance bills
Turn on balance alerts
Compare prices first
Move even a small sum into savings
`),
    no: L(`
Co-signing loans
Investing on hearsay
Retail therapy
Rushed loan inquiries
Limited-edition impulse buys
Paying through unknown links
Paying deposits up front
Juggling credit cards
Spending to show off
Mood-driven drinks bills
Guaranteed-return pitches
Big buys without comparing
Secret spending
Bets left to luck
Rushed money transfers
Deals without a contract
`),
  },
  love: {
    up: L(`
Suggest a plan to someone you’re drawn to
Pick a different date course
Ask one more question when they talk
Give a specific compliment
Share photos you took together
Prepare a small gift
Go to an introduction
Talk about your next plans with your partner
Smile and say hello first
Briefly say that you like them
Suggest a walk together
Eat their favorite food together
Leave a handwritten note
Join a group that shares your interests
Ask about their day first
Pick a movie to watch together
Say thanks for a specific moment
Swap contacts with someone new
Send your partner a message of support
Set a small shared goal
Dress like yourself and head out
Say hi to someone you’ve wanted to reach out to
Try their hobby with them
Plan a day to remember
`),
    down: L(`
Don’t rush their reply today
Look over your message once more before you hit send
Write down hurt feelings and talk tomorrow
Set aside an hour just for yourself
Picture things from their side once
Step away when emotions rise
Talk with a friend you trust
Rest early to calm down
If you owe an apology, say it first
Let go of expectations a little
Send just a short, kind hello
Understand that they’re busy
Close social media for a while
Recall one good memory
Talk in person
Do one thing that cares for you
Walk somewhere quiet
Share feelings starting with “I”
Listen instead of concluding today
Keep one small promise
Write your feelings in a journal
Give them time to think
Rest with a warm cup of tea
Say one thing you’re grateful for first
`),
    no: L(`
Counting messages
Checking their phone
Drunk texting
Testing them
Comparing with other couples
Criticizing them in public
One-sided conclusions
Sarcasm
Gift overload
Talking about exes
Posting feelings online
Going silent
Forcing an answer
Changing plans without telling them
Blaming their friends
Jumping to conclusions
`),
  },
  work: {
    up: L(`
Share the plan you’ve prepared
Start with the hardest task
Volunteer for a new project
Give a short update on results
Sign up for a course you’ve wanted
Swap ideas with coworkers
Polish your presentation slides
Set your next goal in numbers
Thank a coworker who helped
Finish a postponed task today
Speak up first in the meeting
Propose joint work first
Rehearse interviews or exams for real
Record today’s results
Try a new tool
Ask a senior for advice
Update your portfolio
Block out two hours of focus time
Improve one way you work
Talk with a potential mentor
Push your study a bit further
Submit the proposal today
Lift the team with a kind word
Plan tomorrow’s tasks in advance
`),
    down: L(`
Use a pre-submission checklist
Write down instructions you receive
Cut today’s list to three tasks
Check for schedule overlaps
Back up important files
Ask right away when you’re stuck
Read emails aloud before sending
Focus in short bursts
Work with notifications off
Recheck the deadline
Start with yesterday’s leftovers
Schedule your breaks
Double-check numbers and dates
Write up meeting notes right away
Ask coworkers how things are going
Recheck attachments
Set a deadline before taking on work
Postpone key calls when tired
Clear your desk before starting
Fix mistakes right away
Organize your work notes
Allow plenty of travel time
Do just ten minutes of the task you dread
Write down today’s lesson
`),
    no: L(`
Signing without checking
Emotional emails
Juggling too many tasks
Last-minute cramming
Public criticism
Citing unverified sources
Excessive overtime
Gossiping
Skimming reviews
Passing work off on others
Open-ended promises
Sharing security details
Working without saving
Guessing instructions
Ego battles
Impulsive big decisions
`),
  },
  health: {
    up: L(`
Walk a little more than usual
Try a new workout
Start with a morning stretch
Take the stairs
Walk in the fresh air
Make a workout date
Cook with healthy ingredients
Go for a bike ride
Take a light hike
Log your workout
Eat vegetables and fruit
Enjoy an active hobby
Rest well after a sweat
Raise your step goal
Rest in the sunshine
Move your body while tidying the house
Plan a week of workouts
Dance to music you love
Warm up thoroughly
Check your health checkup date
Try swimming or yoga
Plan a walk with a friend
Eat breakfast
Get up early and start the day
`),
    down: L(`
Drop one plan from today
Rest your eyes briefly after lunch
Take a warm shower
Set a bedtime
Keep your phone out of bed
Keep regular mealtimes
Slowly loosen your neck and shoulders
Dress warmly when you go out
Keep a water bottle nearby
Chew slowly and thoroughly
Try a foot soak or half bath
Dim the lights and rest
Stick to light stretching
Postpone late plans
Sit up straight
Take only slow, gentle walks
Keep naps short
Have a cup of warm tea
Take five deep breaths
Close your eyes and listen to music
Shorten today’s to-do list
Wear comfortable shoes
See a professional if something feels off
Leave work early and rest
`),
    no: L(`
Late-night snacks
Crash dieting
Exercise without warming up
Screens late at night
Skipping meals
Too much cold food
Ignoring your body’s signals
Long hours in one position
Late-afternoon caffeine
Weekend sleep binges
Too many sweets
Eating in a rush
Lifting heavy loads
Sleeping with wet hair
Overwork
Too much spicy or rich food
`),
  },
};
