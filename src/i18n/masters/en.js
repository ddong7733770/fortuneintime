import TODAY from './en-today.js';
import TYPES from './en-types.js';
import YEAR from './en-year.js';
import { REL, FOCUS_NONE, ADVICE_DOM, ADVICE_YONG } from './en-focus.js';
// Master reading lines (English). Personas show only through voice, never explained on screen.
// · fortune (Today tab): neutral, friendly guide
// · haewoon: direct, clipped, weighty / hana: bright and warm / dohan: concise and strategic, never absolute
import MORE from './en-more.js';
import { FORTUNE_DOM, HANA_TODAY } from './en-dom.js';
import W5 from './en5-wealth.js';
import L5 from './en5-love.js';
import K5 from './en5-work.js';
import H5 from './en5-health.js';
import { LEAD5, TODO5 } from './en5-card.js';
import DATE from './en-date.js';
const EN = {
  ui: {
    tab: 'Masters',
    pick: 'Who would you like to ask today?',
    name: { haewoon: 'Haewoon', hana: 'Hana', dohan: 'Dohan' },
    field: { haewoon: 'Saju · Hourly luck', hana: 'Love · Relationships', dohan: 'Career · Business' },
    title: { haewoon: 'Haewoon’s saju reading', hana: 'Hana’s love reading', dohan: 'Dohan’s career reading' },
    badge: { free: 'Free today', ad: 'Unlock with ad', open: 'Unlocked' },
    unlock: 'Watch an ad to see the full reading',
    unlockNote: 'After one short ad, you won’t need to watch again during this time window (until {t}).',
    unlockFree: 'Today you can read either Hana or Dohan for free.',
    adFail: 'The ad couldn’t load, so we opened it for you this time.',
    fold: { haewoon: 'Review my saju basics', hana: 'Review my love style', dohan: 'Review my work style' },
    compatTitle: 'Compatibility — relationship dynamics',
    compatSub: 'Choose the relationship and enter their birthday to see how your two charts meet. The score and one-line reading are free.',
    compatUnlock: 'Watch an ad for compatibility',
    compatNote: 'Compatibility unlocks separately from Hana’s reading. Once opened, it stays open during this time window (until {t}).',
    relKind: 'Relationship', relKinds: { some: 'Crush', lover: 'Partner', idol: 'Bias', friend: 'Friend', coworker: 'Coworker', boss: 'Boss · Team', family: 'Family' },
    siunTitle: 'Siun — today’s hour-by-hour luck',
    siunHint: 'Tap a time slot on the dial to see the luck for that hour.',
    siunNow: 'Now',
    bestTag: 'Best hour', worstTag: 'Hour to watch',
    sleepRange: '23:00–05:00',
    teaserSiun: 'What is your best hour today?',
    cardsTitle: 'Ask the masters more',
    goMaster: 'See reading',
    monthsTitle: 'The months ahead',
    secs: {
      pillars: 'Four Pillars', overall: 'Overall reading', siun: 'Hourly luck',
      temper: 'My love temperament', type: 'Who draws you, who suits you', today: 'Today’s love flow', timing: 'When connections arrive', people: 'Who helps you, who to keep at a distance',
      style: 'Your work style', fields: 'Fields and roles that fit', hours: 'Best times for reports · meetings · contracts', flow: 'Career flow this month · this year', collab: 'Who to team up with, who to avoid',
    },
    good: 'Good hours', avoid: 'Hours to avoid', thisMonth: 'This month', thisYear: 'This year', next3: 'Next 3 months',
    band: ['Heavy', 'Steady', 'Bright', 'Very bright'],
    kinds: { report: 'reports', meeting: 'meetings', contract: 'contracts' },
    disclaimer: 'The flow read from saju is for reference. Make important decisions by looking at the facts and your situation too.',
    month: '{m}',
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    seasons: ['Spring', 'Summer', 'Autumn', 'Winter'],
    loveStar: { m: 'Your partner star, Wealth (財星),', f: 'Your partner star, Authority (官星),', none: 'The star of connection' },
    lucky: { color: 'Color', dir: 'Direction', num: 'Numbers', act: 'Activities' },
    toc: 'Contents',
    or: ' or ',
  },

  // ════════ Today tab: neutral, friendly guide ════════
  fortune: {
    weekend: MORE.weekend,
    flow: [
      ['A good day to slow your pace a little.', 'Today favors protecting what you have over starting something new.', 'Energy gathers inward today, so it’s wise to trim a packed schedule.', 'Today the flow wavers less when you sort things out one at a time.'],
      ['A smooth day without big ups and downs.', 'Keeping your usual rhythm is enough today.', 'A calm flow, good for clearing small things you’ve put off.', 'Energy slowly begins to rise today.'],
      ['A fairly smooth-flowing day.', 'Results tend to follow as much as you move today.', 'A decent flow for picking up what you’ve been putting off.', 'People and work mesh well today.'],
      ['Today’s energy fits your chart well.', 'Few obstacles today, and things tend to go smoothly.', 'If you’ve been preparing something, it’s a good day to take a step.', 'Overall, luck flows gently today.'],
    ],
    tenDay: [
      ['A day when working with like-minded people gives you strength.', 'Stubbornness and rivalry rise easily, so hear others out once more.'],
      ['You gain momentum today, good for pushing ahead.', 'People or money issues may cost you, so look over promises and spending.'],
      ['Work becomes fun and your mind finds some ease today.', 'It’s easy to slack off, so start with what you need to do.'],
      ['Your way with words and your ideas stand out today.', 'Words run ahead easily, so think once more before speaking in important settings.'],
      ['An unexpected chance or side income may catch your eye today.', 'The urge for big money rises easily, so hold off on risky investments.'],
      ['Your honest effort pays you back today.', 'What comes in may also go out, so keep an eye on spending.'],
      ['A good day to tackle hard things head-on.', 'Pressure and tension build easily, so don’t carry everything alone.'],
      ['A good day to earn trust and recognition.', 'Responsibility may feel heavy. Keep rules and promises carefully.'],
      ['Intuition and ideas come easily today.', 'Thoughts multiply and motivation dips easily today.'],
      ['Learning, documents and getting help go smoothly today.', 'You may want to lean on others, so make time to sort things out yourself.'],
    ],
    domName: { wealth: 'money', love: 'love and connections', work: 'work and study', health: 'health' },
    title: 'Today’s Fortune', focus: 'What to watch today', advice: 'Today’s advice',
    dom: {
      wealth: {
        flow: [['Money flows out a little more strongly today.', 'Money luck pulls back for a moment today.'], ['Money stays calm without big changes.', 'What comes in and goes out roughly balances today.'], ['Money is flowing open today.', 'There’s a welcome flow around money and deals.']],
        why: {
          pyeon: 'Windfall Wealth is moving, so moving money like side income and deals stands out.',
          jeong: 'Steady Wealth arrives, bringing money that returns in proportion to your work.',
          bad: 'The Wealth star arrives, but it weighs on you, so the less you crave, the more you keep.',
          rob: 'Rival slips in, so money leaks easily through people or competition.',
          output: 'Output is moving, so talent and skills turn into income easily.',
          doc: 'Resource arrives, linking you to money settled through documents and contracts.',
          none: 'The Wealth star isn’t moving directly today, so spend only as planned.',
        },
        caution: ['Avoid impulse buys and investments based only on someone else’s word.', 'Double-check any paperwork with numbers on it.', 'Don’t trust promises of guaranteed returns until you’ve checked them yourself.'],
        tip: ['Set aside part of what comes in right away.', 'Small savings today add up and change the flow.', 'Try tidying up your list of expenses.'],
      },
      love: {
        flow: [['Hearts cross paths easily today.', 'Emotional temperature rises and falls easily today.'], ['The flow of connection is calm.', 'Relationships follow their familiar grain.'], ['Hearts connect well today.', 'There’s a warm flow toward connection.']],
        why: {
          star: '{star} arrives, so meetings and conversations flow naturally.',
          bad: 'The star of connection arrives but feels heavy, so it’s better to approach slowly.',
          dohwa: 'Magnetic Peach Blossom energy arrives, so more eyes are on you than usual.',
          dayHap: 'Harmony touches your partner’s place (the Day branch), so you click easily with someone close.',
          dayChung: 'Your partner’s place (the Day branch) takes a clash, so friction with someone close comes easily.',
          stemHap: 'Energy that unites with your Day Master arrives, so someone you warm to may appear.',
          none: 'The star of connection is quiet today, a good day to care for the relationships you have.',
        },
        chance: ['A new connection is likely to come naturally in a familiar place.', 'If things have been awkward with someone, it’s a good time to reach out first.', 'Rather than guessing how someone feels, ask them.'],
        tip: ['Feelings travel first through your tone.', 'Let go of impatience and the right person comes into view.', 'Relationships grow stronger in the process, not the conclusion.'],
      },
      work: {
        flow: [['Work moves slower than expected today.', 'There are small stumbling blocks in today’s work.'], ['Work moves at its usual pace.', 'A day you can handle your tasks without trouble.'], ['Results at work are easy to see today.', 'The chance to show what you can do is open.']],
        why: {
          kwan: 'Authority arrives, a good time to earn trust and recognition.',
          kwanBad: 'Authority arrives, so responsibility and pressure grow easily.',
          output: 'Output is moving, so plans, proposals and finished work come out well.',
          study: 'Resource arrives, adding strength to study, qualifications and documents.',
          monthChung: 'Your place of work (the Month branch) takes a clash, so talk of changes at work may come up.',
          rob: 'Peers arrive, so rivalry or clashing opinions with colleagues come easily.',
          none: 'The stars of work aren’t moving much today, so go in the order you planned.',
        },
        caution: ['Move on facts you’ve checked yourself rather than on hearsay.', 'If there’s a contract or promise, read the terms to the end.', 'Postpone decisions you’re not ready for.'],
        tip: ['The one thing you finish today sets tomorrow’s pace.', 'Put your energy into what you do well.', 'Try shortening your to-do list.'],
      },
      health: {
        flow: [['Your body tires easily today.', 'Your condition rises and falls easily today.'], ['Your body’s flow is steady.', 'Keeping your usual rhythm is enough today.'], ['Body and mind gain strength today.', 'Recovery is quick today.']],
        why: {
          excess: 'More {el} energy, already plentiful in you, is added, so your {organ} may be strained.',
          lack: '{el} energy you lack comes in and fills out your balance.',
          chung: 'Your own place (the Day branch) takes a clash, so you may tire easily.',
          hyeong: 'There’s Friction energy today, so watch out for bumps and small injuries.',
          none: 'The balance of the Five Elements doesn’t waver much today.',
        },
        tip: ['If the same symptom keeps coming back, see a doctor before reading any fortune.', 'Drink water often and stretch whenever you can.', 'Skip late-night snacks and heavy drinking.'],
      },
    },
  },

  // ════════ Haewoon: direct, clipped, weighty ════════
  haewoon: {
    card: ['Today there is one unusually bright hour. Know when it is.', 'Today the hour to avoid is clear. Check it before you move.', 'Luck differs by the hour. Look at your timetable for today.'],
    ov: {
      now: 'You stand now in the {gz} cycle that began around age {age}. {desc}.',
      nowTone: ['A tailwind. Don’t let this wind slip by.', 'A wind that leans neither way. Your skill becomes your result.', 'A headwind. Holding steady is also a skill. Don’t force the game bigger.'],
      year: 'This year, the {gz} year: {tone}',
      yearTone: ['it is on your side. Bring out what you have put off.', 'it is steady. Just want a little less.', 'it carries weight. Measure big decisions once more.'],
      next: 'Around age {age}, you move into the {gz} cycle. {desc}. {tone}',
      nextTone: ['The wind turns gentler. Prepare now for that time.', 'A grain much like now. Keep doing what you do, steadily.', 'A headwind is coming. Build your foundation before it arrives.'],
      way: 'Let me be clear. The energy your chart needs most is {el}. {why} {close}',
      wayClose: ['Opening late is not bad luck. The flow never stays in one place.', 'Luck is decided not when it comes, but when you use it. Trust your strengths first.', 'Rush, and you scatter. One thing at a time. That is your way.', 'Don’t match anyone else’s pace. This part is yours.'],
    },
    siun: {
      summary: 'Of your hours today, {best} carries the brightest energy and {worst} the heaviest.',
      summaryTail: ['Put important things in the bright hours.', 'In the heavy hours, hold off on decisions. That’s all.', 'Choosing your hours alone steadies half your luck.'],
      tg: [
        ['Your own side lends strength. Move together with people.', 'Stubbornness rises this hour. Don’t insist only you are right.'],
        ['Driving force builds. Clear what you put off, now.', 'Rivalry raises its head. Grab only your share and you lose.'],
        ['Your hands loosen and work is enjoyable. Finish what you started.', 'Your body slackens. Finish just one must-do first.'],
        ['Words and talent come alive. Bring them out now.', 'Words run ahead this hour. Slow down a beat in front of seniors.'],
        ['An unexpected chance passes by. Keep your eyes open.', 'Craving big money clouds judgment. Keep your wallet closed.'],
        ['Honest money moves. Do your settling and sums now.', 'Money heading out is visible. Buy only what you need.'],
        ['An hour to break through hard things head-on. Don’t avoid them.', 'Pressure piles up. Don’t carry it all alone.'],
        ['Luck with seniors is with you. Reports and approvals belong here.', 'Responsibility weighs heavy. Make no promises you can’t keep.'],
        ['Intuition flashes. Write down what comes to mind right away.', 'Thoughts chase their tails. Pass decisions to the next hour.'],
        ['Your head clears. Finish study and paperwork now.', 'You will want to lean on others. Sort it out yourself.'],
      ],
      rel: {
        hap: 'Harmony meets your Day branch. Bring up that favor you put off, now.',
        samhap: 'An hour that joins hands with your Day branch. Shared work goes easily.',
        chung: 'A clash with your Day branch. Don’t raise your voice. Don’t rush on the road either.',
        hyeong: 'Friction is in play. A small slip of the tongue spreads wide.',
        hae: 'Harm is mixed in. Misunderstandings come easily, so confirm before moving on.',
      },
      doIt: ['Teamwork, exercise', 'Clearing backlog', 'Wrapping up, meal plans', 'Planning, presenting', 'Sales, reviewing new offers', 'Settling accounts, shopping', 'Tough negotiations', 'Reports, approvals', 'Jotting down ideas', 'Study, sorting paperwork'],
      avoid: ['Lending money', 'Slips in front of seniors', 'Impulse spending', 'Promises you can’t keep', 'Putting off decisions'],
      avoidChung: 'Important talks, rushed travel',
      doLabel: 'Good for', avoidLabel: 'Avoid',
      dawn: 'An hour to wake the body. Plan your day now.',
      sleep: 'An hour to rest. Sleep itself refills your luck.',
    },
  },

  // ════════ Hana: bright and warm (empathy → reason → small action) ════════
  hana: {
    card: [['Feeling a bit tangled lately? It’s okay to take it easy today.', 'Today a single word lands bigger than usual. Want to look together?'], ['The love flow is calm. But there’s one thing you should see.', 'Today, a hint shows up from someone familiar.'], ['Today’s love flow is pretty good! Don’t miss it.', 'Hearts connect well today. Aren’t you curious with whom?']],
    temper: {
      palace: [
        'Your partner’s place holds energy like your own (Peers). A friend-like romance suits you. You feel at ease walking side by side, not with one person leading the other.',
        'Your partner’s place holds the energy of expression (Output). You want an affectionate love that shows itself in words and actions. Around someone who never expresses anything, you can feel let down fast.',
        'Your partner’s place holds the energy of wealth (Wealth). You’re practical even in love. You feel loved through caring actions more than words.',
        'Your partner’s place holds the energy of responsibility (Authority). Your heart goes to people who are dependable and keep their promises. Once you commit, you tend to protect it for a long time.',
        'Your partner’s place holds the energy of care (Resource). You want someone who understands you and lets you lean on them. You take time to open up, but once you do, it runs deep.',
      ],
      dohwa: 'And you have Peach Blossom, the star of attraction. You might not notice, but people often show interest in you first.',
      many: 'You have several partnership stars, so you’re fairly popular. Your heart can sway easily, though, so it helps to set one standard of your own.',
      none: 'Your partnership star is on the light side, so your own goals often come before dating. That’s okay. Yours is a chart that spots the right person when you don’t rush.',
      express: 'Your expressive energy is strong, so it shows when you like someone. That honesty is your charm.',
      think: 'Your thinking energy is strong, so you mull over your feelings for a long time before showing them. Sometimes it’s fine to speak before you overthink.',
    },
    elPerson: [
      'someone full of dreams who keeps growing, someone who makes plans with you',
      'someone bright and openly expressive, someone who lifts the mood',
      'someone steady and consistent, someone who keeps promises',
      'someone with clear standards and a tidy style, someone who decides quickly',
      'someone thoughtful and easy to talk to, someone flexible',
    ],
    type: {
      attract: 'You’re drawn to {p}. Your partnership star is {el} energy, so your eyes naturally go to people like that.',
      match: 'The one who suits you long-term is {p}. That’s someone who fills in the {el} energy you need.',
      animals: 'By zodiac sign, you mesh well with the {a}. You may not notice at first, but it gets more comfortable over time.',
      tip: 'If the one who draws you and the one who suits you are the same, wonderful. If not, the one who lasts is the second. Remember this.',
    },
    today: {
      flow: [['Your heart may be a little sensitive today.', 'Emotions go up and down easily today.', 'Today the love flow crosses a little.'], ['Today’s love flow is calm.', 'Today, familiar relationships feel comfortable without big changes.', 'Today is good for quietly sorting out your feelings.'], ['Today’s love flow is good.', 'Hearts connect well today.', 'Today a warm energy flows between people.']],
      why: {
        star: '{star} arrives, so meetings and conversations flow naturally.',
        bad: 'The star of connection does arrive, but it’s a bit heavy for you. So rushing can tangle things.',
        dohwa: 'Peach Blossom energy arrives, so more eyes are on you. Put in a little extra effort before you head out today.',
        dayHap: 'Harmony touches your partner’s place, so you click with someone close.',
        dayChung: 'Your partner’s place takes a clash, so friction with someone close comes easily. Not because they’re bad, it’s just today’s energy.',
        stemHap: 'Energy that unites with your Day Master arrives, so someone you warm to may appear.',
        none: 'The star of connection is quiet today. A good day to look after the people already beside you rather than meet new ones.',
      },
      caution: ['If something hurtful is about to slip out, take one breath before you speak.', 'Today, a conversation where you listen beats one where you reach a conclusion.', 'Even if a reply is slow, don’t read too much into it today.'],
      chance: ['A good day to reach out first. A short hello is enough.', 'Someone new may catch your eye in a familiar place.', 'Tell someone you’ve been grateful to how you feel.'],
      tip: ['Feelings travel first through your tone.', 'Just be a little sweet. That’s the biggest thing.', 'Relationships are about the process, not the conclusion.'],
    },
    timing: {
      lead: 'I picked out the months in the next six when connection energy comes in.',
      sig: {
        star: 'Your partnership star comes in as energy that helps you. Say yes to introductions and invitations.',
        dohwa: 'Peach Blossom arrives, a month when eyes gather on you.',
        dayHap: 'Harmony touches your partner’s place this month, so a relationship easily moves a step closer.',
        stemHap: 'A month when someone you’re drawn to may appear.',
      },
      warn: {
        dayChung: 'Your partner’s place takes a clash this month. Settle arguments the same day.',
        starHeavy: 'Connection energy comes in as a burden. Be careful of relationships that pull you along.',
      },
      none: 'Over the next six months, connection energy doesn’t move much. Times like this, investing in yourself calls in the next connection.',
      year: { good: 'Looking at the whole year, connection energy is coming in.', mid: 'This year, connection energy is calm. Let things happen naturally rather than forcing them.', warn: 'This year, relationships change easily. Talking often is enough to protect what you have.' },
    },
    people: {
      noble: 'The person who helps you in hard times is likely born in the year of the {a}. That’s your Heavenly Noble position, so sharing your worries opens a path.',
      match: 'People born in the year of the {a} are easy to get along with.',
      clash: 'You may clash with people born in the year of the {a}. Not because they’re bad people, but because your energies are opposite. Writing important things down cuts down on misunderstandings.',
      style: [
        'You’re loyal and treasure friends and colleagues. Just don’t take on everyone else’s problems.',
        'You’re the one who brings the mood alive with words. Sometimes try listening to their story more than telling yours.',
        'You make friends sensibly. Having at least one friend you meet with no agenda puts your mind at ease.',
        'You’re polite and respect boundaries. That’s why getting close takes you a little time.',
        'You look after people and welcome them warmly. If a relationship only takes, it’s okay to let it go.',
      ],
    },
    compat: {
      lead: ['Let’s look at you two together.', 'Okay, let’s put both charts side by side.'],
      score: ['A pair that needs a bit of effort.', 'A pair that’s plenty good if you adjust to each other.', 'A pair that fits well.', 'A pair that fits really well!'],
      axes: { pull: 'Attraction', talk: 'Communication', clash: 'Friction points', grow: 'Growing together' },
      starOf: [
        'To you, they are Peers: friend-like energy. Equal and comfortable, but it gets tense when you’re both stubborn.',
        'To you, they are Output: energy you care for and express yourself to. Around them, you become sweeter.',
        'To you, they are Wealth: energy you want to look after and protect in practical ways.',
        'To you, they are Authority: energy that steadies you and sets a standard. Reassuring, though sometimes a little heavy.',
        'To you, they are Resource: energy that understands and supports you. Easy to lean on, so say thank you often.',
      ],
      el: { help: 'By the Five Elements, they fill in the {el} energy you lack.', same: 'By the Five Elements, your energies are similar, so much is understood without words.', strain: 'By the Five Elements, their {el} energy is a little heavy for you. It helps to keep some time to yourselves.' },
      day: { hap: 'Your Day branches (partner’s places) are in harmony. A relationship that gets more comfortable the more time you spend together.', samhap: 'Your Day branches join hands in the same direction. Set goals together and things roll along well.', chung: 'Your Day branches clash. The attraction is strong, and so is the friction. Make up on the same day you argue.', hyeong: 'Your Day branches form Friction. Small words can hurt easily, so even be careful with jokes.', hae: 'Your Day branches form Harm. Talk often before hurt feelings pile up.', none: 'Your Day branches neither clash nor pull much. The time you build together defines the relationship.' },
      kind: {
        lover: { good: 'As partners, you put each other at ease. Everyday sweetness matters more than anniversaries.', bad: 'As partners, there are things to adjust. Make a rule to say what hurts right away.' },
        some: { good: 'If it’s a crush, the flow is good right now. It’s fine to suggest meeting once more.', bad: 'If it’s a crush, don’t rush. Matching their pace a little helps.' },
        friend: { good: 'As friends, you’re a pair that lasts. You can be each other’s safe place.', bad: 'As friends, you may bump heads sometimes but make up fast. Just be careful with money between you.' },
        coworker: { good: 'As coworkers, you work in sync. Split roles and the synergy grows.', bad: 'As coworkers, your work styles differ. Put tasks in writing rather than just talking.' },
        boss: { good: 'As boss and team member, you can trust each other with things. Short, frequent updates make it even better.', bad: 'As boss and team member, your standards differ, so misunderstandings come easily. Align expectations first.' },
        family: { good: 'As family, you can lean on and rely on each other.', bad: 'As family, you’re so close that it’s easy to hurt each other. Say thank you one more time.' },
        idol: { good: 'You and your bias share energy that clicks. The more you cheer them on, the more energy you get too.', bad: 'You and your bias have energies of different colors, which is exactly why you’re drawn in.' },
      },
      do: 'What keeps this relationship alive', dont: 'What to avoid',
      doList: [['active dates where you move together', 'learning something new together', 'complimenting each other'], ['eating something delicious together', 'putting feelings into words', 'small gifts'], ['making plans together', 'being on time', 'sharing chores and roles'], ['respecting each other’s principles', 'allowing each other personal time', 'calm, organized talks'], ['deep conversations', 'traveling', 'quiet time together']],
      dontList: [['pride battles', 'letting money issues slide'], ['throwing out emotional words', 'comparing them to others'], ['trying to control', 'a calculating attitude'], ['ignoring their way of doing things', 'breaking promises'], ['going silent to think alone', 'letting hurt feelings pile up']],
      hour: 'A good time for you two to be together is {h}.',
      idolNote: 'Enter your bias’s publicly known birthday. What you enter stays only on this device.',
      idolName: 'Bias name (nickname)',
      inviteLead: 'Send the link and they can enter just their birthday to see your compatibility right away.',
      shareBtn: 'Make a compatibility card',
      shareText: 'Our compatibility score is in! Try it too',
      detailTitle: 'Hana’s detailed reading',
      lockDesc: 'See the four compatibility measures, a detailed reading for your relationship, what to do and avoid together, and good times to be together.',
      lockBtn: 'Watch an ad for the detailed reading',
      cardTitle: 'Our compatibility',
      kindMore: {
        some: { good: ['There’s a fluttery energy between you two right now. Keep the conversation going with light questions.', 'This is a pair where they’re likely to feel drawn to you too. Make one plan that’s just for the two of you.', 'The right moment to confess is a day when you’re laughing a lot together. Trust the mood.'], bad: ['This pair does better going a little slower. Don’t read too much into how fast they reply.', 'You express things differently, so misunderstandings come easily. If you’re curious, ask directly instead of hinting.', 'Getting comfortable in a group first can help before meeting one-on-one.'] },
        lover: { good: ['Partners who make each other more comfortable the more time you spend together. Sharing everyday moments grows your love.', 'You fill in what the other lacks. Say what you’re grateful for out loud, often.', 'A good pair for talking about the future. Start by making small plans together.'], bad: ['You love in different ways, so hurt feelings come easily. Promise to say what hurts on the same day.', 'Arguments tend to drag on for this pair. Agree on one signal for making up.', 'Respecting each other’s personal time actually brings you closer.'] },
        idol: { good: ['Your energy clicks with your bias. Time spent cheering them on gives you strength too.', 'Your bias’s energy fills in what you lack. Fandom becomes everyday energy.', 'A connection that gets more fun the longer you love them. Keep a record of your moments.'], bad: ['You and your bias have energies of different colors. That’s why you’re drawn in.', 'Getting too absorbed in fandom can wear you out. Make time to take care of yourself too.', 'A pair where every new side of your bias feels fresh and exciting.'] },
        friend: { good: ['Friends who understand each other without words. It only deepens with time.', 'You’re likely to be the first person each thinks of in hard times. Check in first.', 'Trying something new together makes the friendship stronger.'], bad: ['Friends who bump heads sometimes but make up fast. Just be careful with money and being on time.', 'You’re different in many ways, so there’s a lot to learn from each other.', 'Don’t let hurt feelings pile up. Talk about them lightly.'] },
        coworker: { good: ['Coworkers who work in sync. Split roles and the synergy grows.', 'A good pair for bouncing ideas around. Build on each other in meetings.', 'Projects you do together tend to be well received.'], bad: ['Your pace and way of working differ. Keep tasks in writing.', 'Split responsibilities clearly from the start.', 'Talking in terms of facts rather than feelings makes things much easier.'] },
        boss: { good: ['A relationship where you can trust each other with things. Short, frequent updates build trust.', 'You recognize each other’s strengths. Don’t hold back on praise.', 'Set goals together and results come easily.'], bad: ['Your standards differ, so misunderstandings come easily. Align expectations first.', 'For feedback, talk through the process, not just the result.', 'Keeping work settings and personal settings separate makes it easier.'] },
        family: { good: ['Family who can lean on and rely on each other. Share meals together often.', 'You know each other’s hearts without words. Still, say thank you often.', 'A trip together makes the bond even warmer.'], bad: ['You’re so close that it’s easy to hurt each other. Say it once more, gently.', 'Respecting each other’s choices reduces conflict.', 'Offer words of support instead of nagging.'] },
      },
    },
  },

  // ════════ Dohan: concise and strategic (conclusion → basis → action, never absolute) ════════
  dohan: {
    hours2: MORE.hours2,
    flow2: MORE.flow2,
    card: [['There are variables in today’s work. Choosing the right time can reduce them.', 'Today favors organizing over deciding. Let me set the order for you.'], ['A steady flow. Still, some hours are more favorable than others.', 'Your usual pace is enough today. Just pick the right time to report.'], ['Results at work are easy to see. Pick your moment.', 'Today tends to favor making proposals. Check the time slots.']],
    style: {
      org: 'You lean toward the organization type. Authority and Resource weigh heavily, so you deliver when you build trust inside a structure. What to prepare: your reputation. Promises and deadlines are your assets.',
      biz: 'You lean toward the business type. Output and Wealth are active in your chart, so you gain strength when you set up the game and create deals yourself. The variable is speed. Look at cash flow before expansion.',
      pro: 'You lean toward the specialist type. Resource and Output back you up, so your value grows when you dig deep into knowledge and skills. What to prepare: proof. Leave it as qualifications or a portfolio.',
      mix: 'Your second tendency ({t}) also comes out close. Rather than committing to one, mixing both in your current work tends to work better.',
      name: { org: 'organization type', biz: 'business type', pro: 'specialist type' },
    },
    fields: {
      lead: 'Luck tends to stick in fields where your Yongsin, {el}, comes alive.',
      list: ['education, publishing, content, design, the environment', 'media, IT, marketing, beauty, energy', 'real estate, construction, brokerage, consulting, food', 'finance, law, machinery, healthcare, manufacturing', 'trade, distribution, research, travel, logistics'],
      role: ['growing people and starting projects', 'standing in front to inform and persuade', 'coordinating and keeping trust', 'setting standards and organizing', 'gathering information and connecting'],
      roleLine: 'The role that fits: {r}.',
      strength: 'The Ten God that looks like your strength is {t}. {trait}',
    },
    flow: {
      daeun: 'In the bigger picture, you are within the {gz} cycle. {desc}.',
      short: ['Teamwork', 'Results · proposals', 'Income · deals', 'Reviews · responsibility', 'Documents · learning'],
      tone: ['Careful', 'Steady', 'Favorable'],
    },
    collab: {
      noble: 'People born in the year of the {a} tend to be helpful in practical work. Ask for their opinion when you get stuck.',
      match: 'People born in the year of the {a} tend to be in sync with you. Good for splitting roles on joint work.',
      clash: 'With people born in the year of the {a}, work styles tend to run opposite. Put tasks in writing rather than verbally.',
      rob: 'Your chart has strong Peers, so be careful with partnerships. Agree on shares, roles and how to settle up in writing before you start.',
      alone: 'Your chart has weak Peers, so you tend to try to do everything yourself. One partner to hand execution to can raise your efficiency a lot.',
      mid: 'Your chart balances teamwork and independence. Choosing partners project by project suits you.',
    },
  },
};

function mergeDom(base, add) {
  base.flow = base.flow.map((a, c) => [...a, ...add.flow[c]]);
  base.more = add.more; base.act = add.act;
  for (const [k, v] of Object.entries(add.why)) base.why[k] = [base.why[k], ...v];
  for (const k of ['caution', 'chance', 'tip']) if (add[k]) base[k] = [...(base[k] || []), ...add[k]];
}
for (const k of Object.keys(FORTUNE_DOM)) mergeDom(EN.fortune.dom[k], FORTUNE_DOM[k]);
mergeDom(EN.hana.today, HANA_TODAY);
// 5× domain lines: appended after the existing sets (used with the anti-repeat rotation)
function add5(base, add) {
  for (const k of ['flow', 'more', 'act']) if (add[k]) base[k] = base[k].map((a, c) => [...a, ...add[k][c]]);
  for (const [k, v] of Object.entries(add.why || {})) base.why[k] = [...base.why[k], ...v];
  for (const k of ['caution', 'chance', 'tip']) if (add[k]) base[k] = [...(base[k] || []), ...add[k]];
  if (add.tipLow) { base.tip = base.tip.slice(1); base.tipLow = add.tipLow; }
}
for (const [k, v] of Object.entries({ wealth: W5, love: L5, work: K5, health: H5 })) add5(EN.fortune.dom[k], v);
EN.hana.date = DATE;
EN.ui.secs.date = DATE.title;
EN.fortune.rel = REL; EN.fortune.focusNone = FOCUS_NONE; EN.fortune.adviceDom = ADVICE_DOM; EN.fortune.adviceYong = ADVICE_YONG;
EN.today = TODAY;
for (const k of Object.keys(LEAD5)) {
  TODAY.lead[k] = TODAY.lead[k].map((a, n) => [...a, ...LEAD5[k][n]]);
  for (const t of ['up', 'down', 'no']) TODAY.todo[k][t] = [...TODAY.todo[k][t], ...TODO5[k][t]];
}
EN.types = TYPES;
EN.year = YEAR;
export default EN;
