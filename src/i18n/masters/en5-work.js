// Today tab · work & study lines, 5× expansion (appended to the existing sets). One line = one sentence
const L = s => s.trim().split('\n').map(x => x.trim()).filter(Boolean);
export default {
  flow: [
    L(`
The order of tasks may keep getting tangled today.
Unexpected requests tend to cut in today.
Your focus scatters easily today.
Results may not show right away for your effort today.
Deadline pressure may feel heavy today.
Small mistakes may add to your workload today.
Differing opinions may slow work down today.
The flow of work sits heavy today.
Planned tasks may get only halfway done today.
What you study may not stick well today.
Hoped-for responses may come late today.
Your workload may feel bigger than usual today.
Decisions get delayed and may feel frustrating today.
Rushing may leave you redoing things today.
Work calls for staying power today.
Small misunderstandings may tangle work today.
Devices or software may act up today.
Evaluations may weigh on your mind today.
Schedule changes may break your rhythm today.
Holding steady beats trying new things today.
Fatigue may lower your focus at work today.
Moments needing help may come up today.
Results may not stand out, which can feel disappointing today.
Accuracy matters more than speed today.
`),
    L(`
Work flows in its set order today.
The flow of work runs much like usual today.
Both study and work move along without strain today.
A good day to get things done with no surprises.
Your work rhythm holds steady today.
Progress tends to match your plan today.
Doing your part well is enough today.
Tasks quietly stack up and get sorted today.
Everyday habits create results today.
Consistency shines more than big wins today.
A good day to balance work and study.
You and your coworkers stay reasonably in step today.
The pace of work is just right and your mind is at ease.
A good day to tick off small tasks one by one.
Today’s work moves within the range you expect.
A good day for organizing and checking.
The day at work tends to pass without big ups and downs.
A calm day for reviewing what you’ve learned.
A good day to strengthen the basics of your work.
Results come out at your usual level today.
Work flows evenly, a good day to make plans.
Carrying on with what you’re doing is enough today.
Meetings and updates tend to wrap up smoothly today.
A good day to keep the line between work and rest.
`),
    L(`
Work picks up speed today.
Ideas come easily today.
Effort tends to turn into visible results today.
Your focus lasts a long time today.
Collaboration runs smoothly today.
Even hard tasks may show a lead today.
Your role tends to stand out today.
What you study sinks right in today.
Your proposals tend to be welcomed today.
Evaluations or presentations may draw a good response today.
The flow of work leans your way today.
A good day to clear out postponed tasks in one go.
New opportunities may knock today.
Decisions get made quickly today.
A chance to have your skills recognized may come today.
Work flows so well the day feels short.
Ask for help and someone will gladly lend a hand today.
You may come one step closer to your goal today.
A good day to show your skills in exams or interviews.
Work results may show up in numbers today.
A good day to show leadership.
You learn faster today.
The direction of your work looks clear today.
Your energy goes straight into your work today.
`),
  ],
  more: [
    L(`
Today, put your energy into protecting the tasks you already have rather than taking on more.
If you’re stuck, step away for a moment and look again; a path tends to appear.
A day to check the process for mistakes rather than the result.
If instructions are vague, one clarifying question saves a lot of time.
Write today’s unfinished work at the top of tomorrow’s list and your mind will ease.
When tired, moving important judgments to the afternoon is one option.
One small win changes the flow of the day.
If you got criticism, note only the content, not the feelings.
The more tasks pile up, the more five minutes spent setting order pays off.
Hitting the deadline matters more than perfection today.
Asking for help may be faster than solving it alone.
On tiring days, let go of work thoughts after hours.
`),
    L(`
A good day to readjust this week’s schedule.
On days without big changes, small improvements make a big difference.
Finding a way to cut repetitive work makes tomorrow easier.
Asking coworkers about their progress smooths collaboration.
If you’re studying, review fits better than new material today.
The materials you organize today become the base for the next task.
Leaving work notes helps you do the same task faster next time.
On ordinary days, sketching your next goal works well.
If there’s a meeting, prepare one question in advance.
Setting small deadlines for yourself makes focus easier.
Sticking to your usual way is most efficient today.
Drawing a clear line between work and rest lifts tomorrow’s focus.
`),
    L(`
On good-flow days, tackle the hard task you’ve been putting off first.
An idea you share today may lead to the next opportunity.
If you have a presentation or report, open confidently with the key point.
If you’re offered a new role, consider it positively.
If you’re studying, it’s a good day to push a little further.
Mentioning coworkers who helped lifts the team mood.
If results are good, write down how you got there.
Trust you build today tends to last.
If there’s something to negotiate or coordinate, try it today.
A good time to start a skill you’ve wanted to learn.
If you have energy to spare, get a head start on next week.
Even when results show, be sure to do the final check.
`),
  ],
  why: {
    kwan: L(`
Authority comes in as helpful energy, so you earn trust in your role.
Authority comes alive, a good time to show your ability in a responsible position.
Thanks to Authority, recognition from superiors tends to follow.
Authority enters today, so following the rules looks good on you.
Authority moves, so talk of promotions or reviews may come up.
Authority flows well, so your place in the organization grows firmer.
Authority arrives, so the weight of your role may turn into opportunity.
Authority sparkles, so you may leave a good impression in formal settings.
Authority is stable, so doing things by the book brings good results.
Authority gains strength, a good day to take on a leading role.
With Authority here, keeping promises and deadlines is your best tool.
Authority is alive, so an upright manner stands out in exams or interviews.
`),
    kwanBad: L(`
Authority comes in heavy, so responsibilities may pile up at once.
Authority weighs on you, so pressure around evaluations may grow.
Authority presses on you, so work pressure may feel intense.
Authority acts as a burden, so tread carefully with superiors today.
Authority comes in strong, so rules and orders may wear you out.
Authority crowds in today, so tasks may suddenly multiply.
Authority is a lot to carry, so worries about mistakes may grow.
Authority arrives but is hard to handle, so share the load.
Authority is heavy today, so avoid overcommitting.
Authority comes in as a burden, so tension may stiffen your shoulders.
Authority is strong, so simply holding steady is enough today.
Authority is heavy today, so don’t push yourself too hard.
`),
    output: L(`
Output comes alive, so plans and ideas come easily.
Thanks to Output, your power to persuade in words and writing grows.
Output enters today, a good day to produce results.
Output moves, so creative solutions come to mind.
Output flows well, so presentations and reports go smoothly.
Output gains strength, so hands-on work comes out polished.
Output shines, a good day to try a new approach.
Output arrives, so the more you express your ideas, the more doors open.
Output sparkles, so postponed creative or organizing work goes well.
With Output around, teaching juniors or coworkers carries weight too.
Output is alive, a good day to turn ideas into concrete plans.
Output moves, so let your hands move before your head today.
`),
    study: L(`
Resource arrives, so new knowledge sinks in easily.
Thanks to Resource, it’s a good day for focused study.
Resource comes alive, so prep for certifications or exams gains momentum.
Resource enters today, so documents and materials get organized well.
Resource moves, so advice from seniors or superiors tends to help.
Resource flows well, so deep-thinking work suits you.
Resource gains strength, so parts you didn’t understand may click.
Resource is stable, a good day to finish the study load you planned.
Resource arrives, a good day to review contracts or official papers.
Resource sparkles, so books or lectures may inspire you.
With Resource around, it’s a good day to calmly build your foundation.
Resource is alive, so what you learn turns straight into skill.
`),
    monthChung: L(`
Your work palace (month branch) takes a clash, so the direction of work may change suddenly.
Your month branch is shaken, so stay flexible with schedule changes.
Your work palace takes a clash, so talk of transfers or new duties may come up.
A clash hits your month branch, so your familiar way of working may waver.
Your work palace is shaken, so trips or outside work may come up.
Your month branch takes a clash today, so having a backup plan helps.
A clash reaches your work palace, so sudden requests may cut in.
Your month branch is in conflict, so make decisions only after checking.
Your work palace takes a clash, so news of organizational change may come.
Your month branch is shaken, so seeing change as opportunity helps.
With a clash on your work palace, the order of ongoing tasks may shift.
A clash hits your month branch today, so back up important files in advance.
`),
    rob: L(`
Peer energy arrives, so you may clash with coworkers over opinions.
Peers move, so pride may get ahead of you in competitive moments.
Peer energy is strong, so the urge to do things only your way may grow.
Peers enter today, so sharing credit may bother you.
Peers gain strength, so make roles clear in shared work.
With Peers in the air, you may be compared with people of similar skill.
Peers arrive, so stubbornness about going solo may slow work down.
With Peer energy around, opinions in the team need coordinating.
Peers move today, so cooperation brings bigger results than competition.
With Peers here, help from coworkers may speed things up.
Peer energy is strong today, so soften your tone.
With Peers present, sharing credit builds trust.
`),
    none: L(`
The work star rests today, so handling set tasks step by step is best.
Work energy is calm today, so organizing suits better than expanding.
The work star is quiet, so keeping your routine is enough.
Work energy is still, a good day to make next plans.
The flow of work is level today, so small improvements stand out.
The work star stays put, a good day for postponed tidying.
Work energy is calm, good for focusing on the basics.
The work star isn’t moving, so no need to rush big decisions.
Work energy is quiet, so thoroughness becomes your biggest result.
The work star catches its breath, a good day to work in tune with your condition.
Little change at work today, a good time to spend on learning.
Work energy is calm, good for syncing with coworkers.
`),
  },
  caution: L(`
Double-check deadline dates and times.
Review materials with numbers and units once more.
Jot down meeting notes right after it ends.
Check file names and versions before uploading to shared folders.
Don’t send replies while emotions are running high.
Don’t promise schedules you’re not sure of.
Don’t skip checks just because you’re in a hurry.
Avoid pointing out others’ mistakes in public.
Don’t send passwords or security details over messenger.
Clarify the scope and deadline before taking on work.
Read important emails aloud once before sending.
Doing several things at once tends to cause mistakes.
Don’t cite sources you haven’t checked.
If a superior’s instructions are unclear, ask again right away.
Check the deadline on requests that come in just before you leave.
Be careful that offhand remarks aren’t misunderstood.
Check page order before printing or submitting.
Charge your laptop or phone ahead of time.
Pay attention to security when receiving outside files.
Keep your phone away while you study.
Recheck the location and time of exams or interviews.
Hold back on judging others’ work today.
Put contracts and agreements in writing.
Focus tomorrow beats overtime tonight.
Save often if your work doesn’t autosave.
Check in the morning that meeting times haven’t changed.
Make sure no required documents are missing.
Check once on the progress of tasks you handed off.
Be careful not to mix up group and private chats.
Write down even small promises so you don’t forget.
Don’t make important decisions while worn out.
Stay alert especially with familiar tasks.
Don’t count on someone else to check for you.
Don’t bottle up complaints; raise them calmly at the right moment.
When schedules overlap, set priorities first.
Allow plenty of travel time for traffic.
`),
  tip: L(`
Choose your single most important task in the morning.
Clear your desk once before you start.
Batch similar tasks together.
Turn off notifications to make focus time.
Before leaving, sum up today’s work in three lines.
Break hard tasks into small steps.
After lunch, start with lighter tasks.
Keep frequently used materials in one place.
Look up unfamiliar terms right away and note them.
When stuck, try explaining it to someone else.
Clearing your inbox clears your head too.
Give yourself credit for today’s small wins.
Short, frequent study sessions stick longer.
Write what you’ll say in one line before a meeting.
Put breaks on your schedule too.
Good questions lead to good results.
Block repeated mistakes with a checklist.
When you finish something, write down the next task right away.
Learning from coworkers’ strengths grows your skills.
Make the day before the deadline your own deadline.
Decide what you can do in spare minutes.
Organize what you learned as if teaching it.
When there’s a lot, start with what’s easiest to begin.
Note feedback and apply it one item at a time.
Don’t sit in one position for long; get up often.
Say a quick thanks to a coworker who helped today.
Put your weekly goal on a sticky note.
Start the task you dread by saying you’ll do just ten minutes.
Set your screen brightness to something easy on the eyes.
Find a quiet time slot and put hard tasks there.
A naming rule for files makes them easy to find.
Write down good ideas the moment they come.
When studying, set a target time and use a timer.
Split today’s list into must-finish and can-wait.
Learn one shortcut in a tool you use for work.
Checking off even small tasks builds motivation.
`),
  act: [
    L(`
Cut today’s list to three tasks and finish only those.
Make a pre-submission checklist and tick items off.
Decide whom to ask about the task you’re stuck on.
Pick one thing on today’s schedule you can postpone.
If you made a mistake, correct it right away.
Back up important files.
Put two short breaks into your workday.
Rewrite the instructions you received as notes.
Check your calendar for any overlaps.
Finish current work before taking on anything new today.
Write the order of tasks on paper before starting.
Write down one lesson you learned today.
`),
    L(`
Sort the rest of this week’s tasks by priority.
Sync up briefly with a coworker on progress.
Find one way to cut down repetitive work.
Recheck this month’s study goals.
Clear out piled-up emails and messages.
Prepare the agenda for your next meeting in advance.
Organize your work folders.
Finish yesterday’s leftover task in the morning.
Summarize what you learned on one page.
Sketch out next week’s schedule ahead of time.
Update your work manual or notes.
End the day by checking off what you finished.
`),
    L(`
Share the plan you’ve prepared today.
Use your best focus hours for the hardest task.
Raise your hand for a new role or project.
Give your superior a brief update on your results.
Sign up for the certificate or course you’ve put off.
Propose the task that needs collaboration first.
Add today’s results to your portfolio.
Set your next goal as a concrete number.
If you have an interview or exam coming, practice as if it’s real.
Share useful information with coworkers.
Try out an idea you’ve mulled over for a long time.
Polish the key lines of your presentation.
`),
  ],
};
