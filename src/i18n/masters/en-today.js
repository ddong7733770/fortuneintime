// Short lines for the Today tab (conclusion → key point → details). Areas: wealth · love · work · health
export default {
  badge: [[80, 'A great day', 'good'], [68, 'A good day', 'good'], [52, 'An average day', 'mid'], [40, 'A day for care', 'warn'], [0, 'A day to rest', 'warn']],
  lvl: { good: 'Good', mid: 'Fair', warn: 'Careful' },
  sumTitle: 'Today in 3 lines',
  sumBest: 'Best area',
  sumCare: 'Area to watch',
  sumNone: 'Nothing major to watch',
  sumHour: 'Best hour',
  domTitle: 'Fortune by area',
  domHint: 'Tap for details',
  more: 'Read more',
  less: 'Show less',
  basisFold: 'Today’s saju basis',
  word: {
    wealth: ['Leaky day', 'Saving day', 'Steady day', 'Incoming day', 'Abundant day'],
    love: ['Crossed day', 'Careful day', 'Cozy day', 'Fluttery day', 'Glowing day'],
    work: ['Hold-on day', 'Detail day', 'Tidy-up day', 'Recognition day', 'Lead-the-way day'],
    health: ['Rest day', 'Easy day', 'Steady day', 'Lively day', 'Full-power day'],
  },
  care: { wealth: 'Watch impulse spending', love: 'Watch your words', work: 'Watch slips and deadlines', health: 'Watch overwork' },
  lead: {
    wealth: [
      ['Money leaks easily today. Keep your wallet closed.', 'Unexpected expenses come up easily. Push payments to tomorrow.', 'Money worries may rush you today. Avoid big decisions.'],
      ['Spending temptation runs high. Put big decisions off until tomorrow.', 'What comes in goes out easily. Buy only what you need.', 'Keeping is earning today. Watch the small expenses first.'],
      ['Money flows steadily. Spending as planned is enough.', 'Nothing much rises or falls. Keep up your saving habit.', 'Your usual rhythm is fine. Don’t put off settling up.'],
      ['Money may come your way today. Take care of settlements.', 'A good money flow. Bring up that money talk you’ve put off.', 'Real gains fill up today. Don’t miss small chances.'],
      ['Money luck is wide open. Grab the chance when it comes.', 'Money and opportunity arrive together. Good for contracts and settlements.', 'A big harvest day. Set part of what comes in aside.'],
    ],
    love: [
      ['Hearts cross easily today. When emotions run high, say less.', 'Misunderstandings come easily. Ask instead of guessing.', 'Relationships feel sensitive. Take some time for yourself.'],
      ['Rushing throws things off today. Keep your own pace.', 'Expressing yourself may feel clumsy. Keep it short and kind.', 'Expectations run ahead easily. Keep small promises first.'],
      ['More comfort than butterflies today. Enjoy everyday sweetness.', 'Relationships are calm. Say one word of thanks.', 'A smooth day. Spend time with someone close.'],
      ['Hearts connect well today. Reach out first.', 'Butterflies are on the way. Make a plan to meet.', 'A good day to show you like someone. Be brave.'],
      ['Your charm shines today. Great for confessions and dates.', 'Love luck is wide open. Go toward the one you’re drawn to.', 'Love deepens today. Make some special time.'],
    ],
    work: [
      ['Work tangles easily today. Focus on the basics.', 'Heavy pressure today. Holding on is a skill too.', 'Mistakes grow easily. Check twice.'],
      ['A day that needs care. Recheck documents and deadlines.', 'Rushing costs you today. Handle things in order.', 'A day to finish ongoing work rather than start new things.'],
      ['You’ll handle your tasks just fine. Clear the backlog.', 'Your usual skill is enough. Write down tomorrow’s to-dos.', 'A good day to tidy up. Clear your desk and calendar.'],
      ['A good day for recognition. Prepare reports and presentations.', 'Teamwork goes well. Ask for help.', 'Results show today. Raise your hand when the chance comes.'],
      ['Work flows smoothly. Do the important things today.', 'Your skills shine. Step forward.', 'Everything you take on pays off. Make a big move.'],
    ],
    health: [
      ['Your body tires first today. Resting is your job.', 'Your condition dips. Cut back your schedule.', 'Overdoing it brings trouble. Get to bed early.'],
      ['Fatigue builds easily. Take breaks often.', 'Save your energy. Avoid overeating and heavy drinking.', 'Your body feels heavy. Loosen up with light stretching.'],
      ['Your condition is steady. Keep up your usual exercise.', 'Your body is in balance. Drink water often.', 'Nothing much wrong. Just look after sleep and meals.'],
      ['Recovery is quick. Move a bit more than usual.', 'Energy picks up. Try a new workout.', 'Your body feels light. Walks and outdoor time are great.'],
      ['Full of energy. Take on something physical.', 'Peak condition. Do that workout you put off.', 'Body and mind feel light. Move as much as you like.'],
    ],
  },
  todo: {
    wealth: {
      up: ['Take care of overdue settlements or refunds', 'Bring up money talk today', 'Look into another source of income', 'Note down good deals', 'Set part of what comes in aside right away', 'Compare prices once more'],
      down: ['Jot down what you spent today before bed', 'Let your cart sit for a day before checking out', 'Review your subscriptions', 'Skim your fixed expenses', 'Check your cash flow', 'List only what you truly need'],
      no: ['Big investment or loan decisions', 'Impulse buys', 'Lending money', 'Buying on installments'],
    },
    love: {
      up: ['Send a hello first', 'Say thanks for something out loud', 'Make plans to meet', 'Notice small changes in them', 'Go to a new gathering', 'Show that you like them'],
      down: ['Sort out hurt feelings before you share them', 'Listen to them until the end', 'Take some time for yourself', 'Reread messages before sending', 'Pause when emotions run high', 'Keep small promises first'],
      no: ['Emotional decisions', 'Bringing up the past', 'Pushing for a reply', 'Comparing'],
    },
    work: {
      up: ['Give important reports today', 'Share your ideas actively', 'Handle tasks that need teamwork first', 'Raise your hand when a chance comes', 'Do the hard stuff in your focus hours', 'Write down what you learned today'],
      down: ['Double-check documents and deadlines', 'Pick and write down just three tasks', 'Ask right away when unsure', 'Finish what you started first', 'Set reminders for key appointments', 'Tidy your desk and files'],
      no: ['Hasty decisions', 'Overpromising', 'Submitting without checking', 'Emotional replies'],
    },
    health: {
      up: ['Take a light walk or workout', 'Get a little sun', 'Start a new workout', 'Drink water often', 'Start the day with stretching', 'Spend more time outdoors'],
      down: ['Go to bed early', 'Put breaks between plans', 'Comfort your stomach with warm food', 'Loosen your shoulders and neck often', 'Rest your eyes after long screen time', 'Take time to breathe deeply'],
      no: ['All-nighters', 'Overeating and heavy drinking', 'Pushing your workout too hard', 'Too much caffeine'],
    },
  },
};
