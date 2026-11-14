// Today tab · health lines, 5× expansion (appended to the existing sets). One line = one sentence
// No diagnoses, medicine or treatment claims. If something feels off, point to a professional first
const L = s => s.trim().split('\n').map(x => x.trim()).filter(Boolean);
export default {
  flow: [
    L(`
Your body may be asking for rest today.
Small fatigue may pile up and feel heavy today.
Your energy may run out quickly today.
Even your usual tasks may feel like a lot today.
Your body and mind may be out of step today.
Your condition sits low today.
Lack of sleep may show today.
Your body may react sensitively to weather or changes around you.
Tension tends to build up in your body today.
Recovery needs more time today.
Overdoing it may carry fatigue into tomorrow.
You may get chilled easily today.
Your focus may blur quickly today.
A day to use your body sparingly.
Watch out for small bumps or twists today.
Meals may get irregular today.
Mental fatigue may show up in your body today.
You need rest more than activity today.
Your body feels heavy and you may not want to move.
A day to spread your energy out.
Your condition may differ a lot between morning and afternoon.
Tiredness may show on your face today.
Protecting your stamina is the main task today.
Taking a break is actually getting ahead today.
`),
    L(`
Your body keeps its usual rhythm today.
Your condition doesn’t swing much today.
Your body stays evenly balanced today.
A good day to get through without strain.
Health luck is average, so habits set your condition today.
Looking after meals and sleep is enough today.
Your body keeps pace with your familiar speed.
You can end the day without much fatigue.
Body and mind find a calm balance today.
Light activity suits you today.
Your condition is stable, a good day to keep your routine.
Health flows quietly today.
A good day to check your daily habits.
Your energy holds at a comfortable level.
As long as you don’t overdo it, it’s an easy day.
Regular routines pay off today.
The signals your body sends are calm today.
A good day to keep up your usual exercise.
No big changes in your health flow today.
A good day to go about things while checking in with your body.
Energy used and energy restored roughly match today.
A good day to shake off fatigue ahead of time.
Small movements throughout the day protect your condition.
Your body is in fair shape, so you can move as planned.
`),
    L(`
Strength fills your body today.
Your condition brightens up today.
You may feel light from the morning today.
The more active you are, the more energy you get.
Recovery is strong, so fatigue fades fast today.
The joy of moving grows today.
Energy is ample and the day feels long.
Body and mind both feel refreshed today.
You may feel the benefits of exercise clearly today.
The outdoor air feels especially fresh today.
Focus and stamina both improve today.
A good day to try a new activity.
Feeling good shows on your face today.
Your body is in good balance today.
The refreshed feeling after sleep lasts long today.
Your vitality brightens the people around you.
Your body feels light and your steps are lively.
A good day to start a healthy habit.
Even physical work doesn’t tire you easily today.
Your body cooperates well today.
Energy spreads evenly and the day feels easy.
Activities that make you sweat lift your mood too.
You feel good, so both work and rest go well.
Health energy is wide open today.
`),
  ],
  more: [
    L(`
Close your eyes and rest for a few minutes between tasks today.
On heavy days, lower the intensity and focus on stretching.
A warm shower eases tension noticeably.
Simply not staring at screens late tonight helps you recover.
Start by not skipping meals and eating slowly.
The more tired you are, the more you should reach for water before caffeine.
Politely postponing plans that are too much is a way to protect yourself.
Watch your step and move slowly on stairs or slippery paths.
Protect your body heat with warm clothes today.
If your mind is tired, rest while listening to music you like.
Getting to bed a little earlier makes tomorrow lighter.
Put rest ahead of the chores you’ve been putting off today.
`),
    L(`
Even a little more walking today makes your body happy.
Keeping regular mealtimes steadies your condition.
Build the habit of shifting position once an hour.
Loosen a stiff back and shoulders with light stretches.
Keep a water bottle nearby and sip often.
Dimming the lights before bed tends to deepen sleep.
Ordinary days are good for checking your habits.
Add one more vegetable or fruit to your day.
Pick one thing your body enjoys and do it today.
A little sunlight lifts both mood and rhythm.
Walk part of your commute today.
On a day off, moving your body lightly helps.
`),
    L(`
On good days, start the exercise you’ve been putting off.
Setting a new routine while you feel light helps it last.
Increase your activity, but always warm up.
While you have good energy, set one health goal.
Make it a pleasant day with outdoor activity or a walk.
Sleep as soundly as you sweat today.
Even with energy to spare, don’t forget to hydrate.
Finding an exercise buddy makes it easier to stick with.
Noting how good you feel helps you find your rhythm.
On light days, even tidying and cleaning can be fun.
While energized, plan healthy meals ahead.
The more you move today, the clearer your mind tends to feel.
`),
  ],
  why: {
    excess: L(`
{el} energy leans to one side, so your {organ} may tire easily.
More {el} energy is added to what’s already ample, so go easy on your {organ}.
{el} energy overflows today, so rest your {organ} and don’t overdo it.
{el} energy runs high today, so check in on your {organ}.
Plenty of {el} energy overlaps, so your {organ} may be sensitive.
{el} energy tips the balance today, so cut back on habits that strain your {organ}.
{el} energy fills up today, so your {organ} may tire easily.
Excess {el} energy arrives, so be gentle with your {organ}.
{el} energy grows strong today, so give your {organ} some rest.
{el} energy piles on today, so ease fatigue in your {organ} ahead of time.
{el} energy increases today, so don’t overwork your {organ}.
{el} energy crowds in at once, so listen to signals from your {organ}.
`),
    lack: L(`
{el} energy you lacked arrives, so your body’s balance tends to settle.
{el} energy fills in today, so your condition tends to steady.
Missing {el} energy is topped up, so your body tends to feel at ease.
{el} energy arrives and fills the gap today.
{el} energy is replenished today, so recovery tends to come easier.
{el} energy that was empty comes in, and your body welcomes it.
{el} energy is added, so your five elements tend to even out.
With {el} energy filled in, a usually weak rhythm tends to revive.
{el} energy arrives today, so your body tends to feel light.
Lacking {el} energy is added, so rest restores you well.
{el} energy arrives, a good day to balance body and mind.
{el} energy fills in today, a good day to start a healthy habit.
`),
    chung: L(`
Your self palace (day branch) takes a clash, so your condition may go up and down.
Your day branch is shaken today, so you may tire more easily than usual.
A clash hits your day branch, so sleep or daily rhythm may get thrown off.
Your self palace takes a clash, so tension in your body may grow.
Your day branch is in conflict, so lots of travel may pile up fatigue.
Your day branch takes a clash today, so be sure to leave rest gaps between plans.
Your self palace is shaken, so mental fatigue may reach your body.
With a clash on your day branch, sudden schedule changes may tire you out.
Your day branch is shaken today, so take care not to get hurt rushing around.
Your self palace takes a clash, so you need more rest than usual.
A clash hits your day branch today, so avoid strenuous exercise.
Your day branch is in conflict today, so soothing your body is the way to go.
`),
    hyeong: L(`
Punishment energy is present, so rushing may lead to bumps today.
Punishment arrives today, so take care with sharp tools.
Because of Punishment energy, small injuries may happen, so move slowly.
With Punishment around, be sure to warm up before exercise.
Punishment energy is present, so tension may stiffen your body.
Punishment arrives, so watch your footing on stairs and streets.
Punishment energy is in the air, so don’t hold strained positions for long.
With Punishment around, leave extra room when driving.
Because of Punishment energy, built-up fatigue may lead to slips.
Punishment arrives today, so take care lifting heavy things.
Punishment energy is present, so body and mind may both feel on edge.
With Punishment around, put safety first today.
`),
    none: L(`
Your five elements stay evenly balanced today, a fair day.
Health energy isn’t shaken much, so your usual habits are enough.
Your body’s energy is calm, a good day to keep your rhythm.
The five elements flow evenly, so the day tends to pass comfortably.
No big change in health energy today, a good day for a check-in.
Your body’s energy is calm, so light activity suits you.
The flow of the elements is level, so just don’t overdo it.
Health energy is quiet, so keep up steady sleep and meals.
Your energy is stable, a good day to continue your usual exercise.
The elements are in balance, so your body’s signals are calm too.
Little change in health today, a good time to firm up good habits.
Energy spreads evenly through your body, so the day tends to feel easy.
`),
  },
  tip: L(`
Take a short walk after meals instead of lying down right away.
Once a day, look up at the sky and take a deep breath.
Wash your hands and feet in warm water before bed.
Keep your back straight when you sit.
Make the text on your screen a little bigger.
Set times to drink water.
Open the window to air out the room when you wake up.
Swap snacks for fruit or nuts.
Take the stairs instead of the elevator for a floor or two.
Dim the lights an hour before bed.
Roll your neck and shoulders slowly.
Catch a little sunlight at lunchtime.
Cut back a little on salty food today.
Chew slowly and thoroughly.
Gently roll your ankles and wrists.
Once a day, move to a song you love.
Air your pillow and blanket in the sun.
Avoid caffeine late in the day.
Keep your phone in your pocket while you walk.
Close your eyes and focus only on your breath for a minute.
If your bag is heavy, lighten the load.
Have one meal with a warm soup.
Do some light stretching before bed.
Keep your alarm time consistent.
Warm up with a bath or foot soak.
Adjust the height of your work chair.
Get off one stop early on the way home and walk.
Check your step count once today.
If you feel cold, layer thin clothes.
Make a break with your favorite tea today.
Spend more time standing tall.
Rest with your eyes closed for five minutes after lunch.
Writing tomorrow’s plan before bed eases your mind.
Change the mood of your room with a pleasant scent.
On weekends, wake at the same time instead of catching up on sleep.
Start one small habit for your body today.
`),
  // Last line on low-health days: a fortune is no substitute for a doctor (rotating wording)
  tipLow: L(`
If the same symptom keeps coming back, see a doctor before reading any fortune.
If discomfort lingers, talk to a professional before relying on a fortune.
If you notice unusual pain or discomfort, getting checked at a clinic is best.
A fortune is only a guide, so if something feels off, see a doctor first.
If fatigue hasn’t lifted for days, have a professional check how you’re doing.
`),
  act: [
    L(`
Clear one item from today’s plans and rest in that time.
Set a bedtime and an alarm for it.
Close your eyes and rest for ten minutes after lunch.
Have one warm meal today.
Slowly loosen your neck and shoulders for three minutes.
Take a light walk instead of hard exercise.
Cut back on evening plans and rest at home.
Aim to drink eight glasses of water.
Relax with a half bath or a warm shower.
Leave your phone outside the bed when you sleep.
If your body feels heavy, shorten today’s to-do list.
Take five slow, deep breaths.
`),
    L(`
Get up and stretch once an hour.
Set a step goal for today.
Set mealtimes and stick to them.
Stretch for ten minutes in the evening.
Make a short exercise plan for this week.
Swap one snack for something healthy.
Tidy your bed and lie down early.
Fill a water bottle and keep it on your desk.
Get some sun on a lunchtime walk.
Set a reminder to fix your posture.
Jot down what you ate today.
Take a lap around your neighborhood this evening.
`),
    L(`
Walk or exercise 20 minutes more than usual.
Follow a new workout class or video.
Work up a light sweat climbing stairs.
Make a workout date with a friend.
Set one health goal for this week.
Enjoy an outdoor activity like cycling or a light hike.
Cook with healthy ingredients.
Create a morning stretching routine.
Log today’s activity in a fitness app.
Try a move you couldn’t do before.
Use your good energy to tidy or clean the house.
Check the date of your next health checkup.
`),
  ],
};
