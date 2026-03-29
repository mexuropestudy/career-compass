import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const BRAND = {
  navy: '#0f3b6f',
  navyDark: '#0b2c54',
  blueText: '#2a5d93',
  text: '#17304f',
  soft: '#eef5fc',
  page: '#f6f9fd',
  white: '#ffffff',
  line: '#d8e4f0',
  softGreen: '#eef8f1',
  softRed: '#fff4f4',
}

const DISCLAIMER =
  'Це не означає, що ти не зможеш там працювати. Це означає, що тобі доведеться витрачати в 3 рази більше зусиль, щоб отримати той самий результат, який у “твоїй” сфері прийде легше.'

const TYPES = ['R', 'I', 'A', 'S', 'E', 'C']

function useViewport() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  )

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return {
    width,
    isMobile: width <= 768,
    isTablet: width > 768 && width <= 1100,
  }
}

const SCENES = [
  {
    id: 1,
    text: 'У класі дали спільний проєкт. Частина команди зависла, хтось робить щось своє, і поки не дуже зрозуміло, що з цього вийде. Що ти робиш?',
    options: [
      { text: '«Окей, давайте зробимо це нормально» — збираю всіх і розподіляю ролі.', type: 'E' },
      { text: 'Спочатку хочу зрозуміти, що ми взагалі робимо — лізу в тему і структурую.', type: 'I' },
      { text: 'Я вже бачу, як це можна подати цікаво — беру ідею і оформлення.', type: 'A' },
      { text: 'Я краще просто зроблю свою частину і не буду чекати інших.', type: 'R' },
      { text: 'Мені важливо, щоб усі включились — пробую підтягнути інших.', type: 'S' },
      { text: 'Мене бісить хаос — відкриваю нотатки і розписую план.', type: 'C' },
    ],
  },
  {
    id: 2,
    text: 'У тебе раптом повністю вільний день. Немає уроків, термінових справ і ніхто нічого не просить. Що тобі реально хочеться робити?',
    options: [
      { text: 'Щось створити: візуал, текст, ідею.', type: 'A' },
      { text: 'Розібрати нову тему, яка давно цікавить.', type: 'I' },
      { text: 'Поспілкуватися з людьми або кудись вибратись.', type: 'S' },
      { text: 'Придумати щось і запустити.', type: 'E' },
      { text: 'Навести порядок у своїх справах.', type: 'C' },
      { text: 'Щось зробити руками або протестити.', type: 'R' },
    ],
  },
  {
    id: 3,
    text: 'У чаті по спільному завданню всі сперечаються, а нормального рішення досі немає. Що ти робиш?',
    options: [
      { text: 'Кидаю нову ідею, яка може всіх зібрати.', type: 'A' },
      { text: 'Хочу зрозуміти, чому ми взагалі застрягли.', type: 'I' },
      { text: 'Беру ініціативу і починаю вести.', type: 'E' },
      { text: 'Пишу чітко: хто що робить.', type: 'C' },
      { text: 'Пробую знизити напругу між усіма.', type: 'S' },
      { text: 'Просто закриваю свою частину.', type: 'R' },
    ],
  },
  {
    id: 4,
    text: 'Тобі дали завдання, яке ти ще ніколи не робив(ла). Яка в тебе перша реакція?',
    options: [
      { text: 'Відкриваю і пробую одразу.', type: 'R' },
      { text: 'Хочу спочатку зрозуміти логіку.', type: 'I' },
      { text: 'Думаю, як зробити це цікавіше.', type: 'A' },
      { text: 'Питаю або обговорюю з кимось.', type: 'S' },
      { text: 'Беру і починаю організовувати процес.', type: 'E' },
      { text: 'Шукаю інструкцію або план.', type: 'C' },
    ],
  },
  {
    id: 5,
    text: 'У який момент ти ловиш себе на думці: «О, це реально кайф»?',
    options: [
      { text: 'Коли видно реальний результат.', type: 'R' },
      { text: 'Коли зрозумів(ла) щось складне.', type: 'I' },
      { text: 'Коли вийшло красиво або незвично.', type: 'A' },
      { text: 'Коли комусь реально допоміг(ла).', type: 'S' },
      { text: 'Коли змінив(ла) ситуацію і щось зрушив(ла).', type: 'E' },
      { text: 'Коли все чітко і по поличках.', type: 'C' },
    ],
  },
  {
    id: 6,
    text: 'Хтось із класу каже: «Я взагалі не розумію цю тему». Що ти робиш?',
    options: [
      { text: 'Показую на прикладі.', type: 'R' },
      { text: 'Пояснюю логіку.', type: 'I' },
      { text: 'Придумую просте порівняння або образ.', type: 'A' },
      { text: 'Сідаю і розбираю разом.', type: 'S' },
      { text: 'Беру процес у свої руки.', type: 'E' },
      { text: 'Розкладаю все по кроках.', type: 'C' },
    ],
  },
  {
    id: 7,
    text: 'Проєкт горить. До здачі — година. Половина не готова. Що ти робиш?',
    options: [
      { text: 'Швидко ріжу зайве і збираю структуру.', type: 'C' },
      { text: 'Беру відповідальність і домовляюся.', type: 'E' },
      { text: 'Мовчки доробляю, що можу.', type: 'R' },
      { text: 'Шукаю нестандартний вихід.', type: 'A' },
      { text: 'Заспокоюю інших, щоб не розсипались.', type: 'S' },
      { text: 'Аналізую, що реально можна врятувати.', type: 'I' },
    ],
  },
  {
    id: 8,
    text: 'Якби можна було обрати майбутню сферу без страху і тиску, тебе б більше тягнуло туди, де...',
    options: [
      { text: 'є практика і видно результат', type: 'R' },
      { text: 'треба думати і розбиратися глибоко', type: 'I' },
      { text: 'можна створювати і придумувати', type: 'A' },
      { text: 'є люди і жива взаємодія', type: 'S' },
      { text: 'можна впливати і вести', type: 'E' },
      { text: 'є система, порядок і ясність', type: 'C' },
    ],
  },
]

const PROFILE_LIBRARY = {
  EAS: {
    label: 'EAS — дії, люди, ідеї',
    who: 'Ти заряджаєшся від руху, людей і можливості запускати щось нове. Тобі добре там, де є драйв, комунікація і простір для рішень.',
    strengths: ['ініціативність', 'контактність', 'уміння зрушити процес', 'ідеї', 'вплив'],
    future:
      'Твій ранок через 5 років: Ти прокидаєшся у ритмі насиченого дня. Попереду не нудний маршрут, а зустрічі, рішення, запуск нового і живий рух. Ти презентуєш ідеї, збираєш людей навколо себе і відчуваєш, як твій драйв заряджає команду. Ти — людина-двигун, яка створює можливості там, де інші бачать проблеми.',
  },
  ICR: {
    label: 'ICR — логіка, система, результат',
    who: 'Ти сильний(а) там, де треба розібратися глибоко, побачити закономірність і зібрати систему, яка реально працює.',
    strengths: ['логіка', 'точність', 'аналітика', 'концентрація', 'системність'],
    future:
      'Твій ранок: Ти заходиш у сучасний простір, де важливі точність, логіка і сильні рішення. На твоїх екранах — дані, які сьогодні стануть відповіддю на велику задачу. Твій спокій і точність захоплюють. Ти знаєш, як працює цей світ “під капотом”, і отримуєш задоволення від того, що створюєш архітектуру майбутнього, яка працює ідеально.',
  },
  SAE: {
    label: 'SAE — люди, підтримка, контакт',
    who: 'Ти добре відчуваєш людей і не проходиш повз, коли комусь потрібна опора. Твоя сила — у взаємодії, турботі та змісті.',
    strengths: ['емпатія', 'контакт', 'пояснення', 'підтримка', 'витримка'],
    future:
      'Твій ранок: Ти збираєшся на роботу, де головна цінність — люди. Твоя суперсила — бачити потенціал у людях. Сьогодні ти допоможеш комусь знайти свій шлях або відновити сили. Ти відчуваєш глибокий сенс у кожній хвилині, бо твоя робота — це вдячні очі людей та реальні зміни в їхніх долях.',
  },
  AES: {
    label: 'AES — креатив, стиль, візуал',
    who: 'Ти бачиш світ не так, як більшість. Тобі важлива форма, атмосфера, подача і можливість створювати щось впізнаване.',
    strengths: ['креативність', 'візуальне мислення', 'смак', 'ідеї', 'нестандартний погляд'],
    future:
      'Твій ранок: Ти заходиш у простір, де навколо — ескізи, мудборди, кольори, сенси і візуальні рішення. Ти не просто працюєш, ти створюєш візуальну мову майбутнього. Твій день — це пошук ідеальної форми та кольору. Ти бачиш світ інакше, і люди готові платити за твій унікальний погляд.',
  },
  CIS: {
    label: 'CIS — порядок, точність, система',
    who: 'Ти спокійний(а) там, де є ясність, структура і відповідальність. Коли інші губляться, ти наводиш порядок.',
    strengths: ['увага до деталей', 'порядок', 'контроль', 'точність', 'надійність'],
    future:
      'Твій ранок: Ти відкриваєш звіти, показники і задачі, де все має бути точно. Навколо — порядок і чіткість. Поки інші губляться в хаосі, ти спокійно тримаєш усе під контролем. Ти — той самий фундамент, на якому тримається великий процес. Твоя стабільність і системність — це твоя сильна сторона.',
  },
  AIR: {
    label: 'AIR — інтерес, відкриття, нове',
    who: 'Тебе тягне туди, де ще немає готових відповідей. Ти любиш досліджувати, пробувати нове і поєднувати те, що інші не поєднують.',
    strengths: ['дослідницький інтерес', 'сміливість до нового', 'ідеї', 'гнучкість', 'експеримент'],
    future:
      'Твій ранок: Ти працюєш над проєктом, якого ще рік тому не існувало. Це поєднання науки та дизайну, або технологій та мистецтва. Ти — дослідник, який не боїться експериментів. Твій день — це лабораторія ідей, де ти щоразу винаходиш новий спосіб вирішення складних задач.',
  },
  ESC: {
    label: 'ESC — управління, відповідальність, рамка',
    who: 'Ти вмієш тримати рамку, брати відповідальність і збирати процес так, щоб він працював, а не сипався.',
    strengths: ['управління', 'відповідальність', 'рамка', 'рішення', 'системний вплив'],
    future:
      'Твій ранок: Ти заходиш у простір, де приймаються важливі рішення. Ти знаєш правила гри і вмієш керувати процесами так, щоб система працювала як годинник. Ти несеш відповідальність і відчуваєш силу свого впливу.',
  },
  IAS: {
    label: 'IAS — аналітика, сенси, комунікація',
    who: 'Ти поєднуєш глибину думки з умінням пояснити складне так, щоб це мало сенс для інших.',
    strengths: ['аналітика', 'сенси', 'пояснення', 'інтелектуальна глибина', 'комунікація'],
    future:
      'Твій ранок: Ти готуєш аналітичний матеріал, виступ або пояснення для людей, яким важлива глибина. Ти поєднуєш знання з умінням донести їх до інших. Ти — експерт, до думки якого прислухаються.',
  },
  ERC: {
    label: 'ERC — дія, техніка, конкретика',
    who: 'Ти любиш реальний результат. Не просто говорити, а будувати, запускати, налаштовувати, реалізовувати.',
    strengths: ['практичність', 'дія', 'технічне мислення', 'витривалість', 'конкретика'],
    future:
      'Твій ранок: Ти там, де ідеї стають реальними конструкціями, системами або технічними рішеннями. Ти любиш бачити, як цифри на папері перетворюються на щось справжнє. Твоя робота — це надійність і результат.',
  },
  SCI: {
    label: 'SCI — турбота, відповідальність, опора',
    who: 'Ти вмієш бути опорою. Там, де потрібні терпіння, відповідальність і реальна користь для інших, ти розкриваєшся дуже сильно.',
    strengths: ['турбота', 'відповідальність', 'терпіння', 'стійкість', 'надійність'],
    future:
      'Твій ранок: Ти перевіряєш план допомоги, відновлення або підтримки для людей, яким справді важлива твоя присутність. Ти — та людина, якій довіряють найцінніше. Ти створюєш безпечний простір, де люди відновлюються і зростають.',
  },
  ESA: {
    label: 'ESA — дія, вплив, люди',
    who: 'Ти швидко включаєшся, добре комунікуєш і любиш бути в центрі процесу. Тобі важливо не просто бути присутнім(ьою), а реально вести.',
    strengths: ['лідерство', 'енергія', 'вплив', 'контактність', 'швидкі рішення'],
    future:
      'Твій ранок через 5 років: У тебе перший дзвінок ще до кави. Ти в русі, у процесі, в контакті з людьми. Ти збираєш команду, запускаєш рішення і бачиш, як твоя енергія рухає все вперед.',
  },
  IAR: {
    label: 'IAR — логіка, креатив, рішення',
    who: 'Ти не просто думаєш — ти придумуєш розумно. У тебе сильне поєднання логіки і нестандартного мислення.',
    strengths: ['системне мислення', 'креативність', 'концептуальність', 'розв’язання складних задач', 'дослідницький інтерес'],
    future:
      'Твій ранок через 5 років: Перед тобою задача, яку більшість назвала б занадто складною. А ти бачиш у ній не проблему, а конструкцію. Ти поєднуєш ідеї, дані і нестандартні рішення так, ніби це твоя природна мова.',
  },
}

const SPECIALTIES = [
  { title: 'маркетинг', group: 'Креатив і комунікації', weights: { E: 0.28, A: 0.24, S: 0.18, I: 0.12, C: 0.1, R: 0.08 } },
  { title: 'digital marketing', group: 'Креатив і комунікації', weights: { E: 0.24, A: 0.24, I: 0.18, S: 0.16, C: 0.1, R: 0.08 } },
  { title: 'медіа', group: 'Креатив і комунікації', weights: { A: 0.26, E: 0.2, I: 0.16, S: 0.18, C: 0.1, R: 0.1 } },
  { title: 'журналістика', group: 'Креатив і комунікації', weights: { I: 0.22, A: 0.2, E: 0.16, S: 0.18, C: 0.14, R: 0.1 } },

  { title: 'менеджмент', group: 'Бізнес і управління', weights: { E: 0.3, C: 0.2, S: 0.18, I: 0.14, A: 0.1, R: 0.08 } },
  { title: 'бізнес-адміністрування', group: 'Бізнес і управління', weights: { E: 0.28, C: 0.22, S: 0.16, I: 0.14, A: 0.1, R: 0.1 } },
  { title: 'підприємництво', group: 'Бізнес і управління', weights: { E: 0.34, A: 0.16, S: 0.16, C: 0.14, I: 0.12, R: 0.08 } },
  { title: 'HR', group: 'Бізнес і управління', weights: { S: 0.26, E: 0.22, C: 0.18, I: 0.14, A: 0.12, R: 0.08 } },

  { title: 'комп’ютерні науки', group: 'IT і технології', weights: { I: 0.34, C: 0.2, R: 0.18, A: 0.12, E: 0.08, S: 0.08 } },
  { title: 'програмна інженерія', group: 'IT і технології', weights: { I: 0.34, C: 0.2, R: 0.2, A: 0.1, E: 0.08, S: 0.08 } },
  { title: 'data science', group: 'IT і технології', weights: { I: 0.36, C: 0.22, R: 0.14, A: 0.12, E: 0.08, S: 0.08 } },
  { title: 'UX/UI', group: 'IT і технології', weights: { A: 0.32, I: 0.18, S: 0.18, C: 0.14, E: 0.1, R: 0.08 } },

  { title: 'медицина', group: 'Люди, здоров’я і підтримка', weights: { S: 0.28, I: 0.22, C: 0.18, R: 0.14, E: 0.08, A: 0.1 } },
  { title: 'психологія', group: 'Люди, здоров’я і підтримка', weights: { S: 0.3, I: 0.18, A: 0.14, C: 0.14, E: 0.12, R: 0.12 } },
  { title: 'соціальна робота', group: 'Люди, здоров’я і підтримка', weights: { S: 0.32, E: 0.16, I: 0.14, C: 0.14, A: 0.12, R: 0.12 } },
  { title: 'реабілітація', group: 'Люди, здоров’я і підтримка', weights: { S: 0.26, R: 0.2, I: 0.16, C: 0.14, E: 0.1, A: 0.14 } },

  { title: 'машинобудування', group: 'Інженерія і практика', weights: { R: 0.32, I: 0.22, C: 0.18, E: 0.12, A: 0.1, S: 0.06 } },
  { title: 'робототехніка', group: 'Інженерія і практика', weights: { R: 0.28, I: 0.24, C: 0.18, A: 0.1, E: 0.1, S: 0.1 } },
  { title: 'архітектура', group: 'Інженерія і практика', weights: { A: 0.24, R: 0.22, I: 0.18, C: 0.14, E: 0.12, S: 0.1 } },
  { title: 'цивільне будівництво', group: 'Інженерія і практика', weights: { R: 0.3, C: 0.2, I: 0.2, E: 0.12, A: 0.1, S: 0.08 } },

  { title: 'дошкільна освіта', group: 'Освіта і допомога', weights: { S: 0.34, I: 0.18, C: 0.2, E: 0.1, A: 0.12, R: 0.06 } },
  { title: 'педагогіка', group: 'Освіта і допомога', weights: { S: 0.32, I: 0.2, C: 0.18, E: 0.1, A: 0.12, R: 0.08 } },
  { title: 'предметне викладання', group: 'Освіта і допомога', weights: { S: 0.28, I: 0.24, C: 0.18, E: 0.1, A: 0.12, R: 0.08 } },
  { title: 'освітні технології', group: 'Освіта і допомога', weights: { I: 0.26, S: 0.2, C: 0.2, E: 0.12, A: 0.12, R: 0.1 } },

  { title: 'право', group: 'Право і державні системи', weights: { I: 0.24, E: 0.22, C: 0.22, S: 0.14, A: 0.08, R: 0.1 } },
  { title: 'державне управління', group: 'Право і державні системи', weights: { E: 0.26, C: 0.24, S: 0.16, I: 0.16, A: 0.08, R: 0.1 } },
  { title: 'міжнародне право', group: 'Право і державні системи', weights: { I: 0.22, E: 0.22, C: 0.2, S: 0.16, A: 0.1, R: 0.1 } },
  { title: 'поліцейська справа', group: 'Право і державні системи', weights: { E: 0.22, R: 0.2, C: 0.2, S: 0.16, I: 0.12, A: 0.1 } },

  { title: 'дизайн', group: 'Мистецтво і візуал', weights: { A: 0.38, I: 0.14, E: 0.14, C: 0.12, R: 0.12, S: 0.1 } },
  { title: 'мода', group: 'Мистецтво і візуал', weights: { A: 0.36, E: 0.16, S: 0.14, I: 0.12, C: 0.1, R: 0.12 } },
  { title: 'графіка', group: 'Мистецтво і візуал', weights: { A: 0.38, I: 0.14, E: 0.14, C: 0.12, R: 0.12, S: 0.1 } },
  { title: 'музика', group: 'Мистецтво і візуал', weights: { A: 0.34, S: 0.18, E: 0.14, I: 0.1, C: 0.1, R: 0.14 } },
]

function calculateScores(answers) {
  const base = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
  answers.forEach((a) => {
    if (a?.type && base[a.type] !== undefined) {
      base[a.type] += 1
    }
  })
  return base
}

function buildHybridCode(scores) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const first = sorted[0]
  const second = sorted[1]
  const third = sorted[2]

  if (!first || !second) return ''

  const secondScore = second[1]
  const thirdScore = third?.[1] ?? 0
  const includeThird =
    secondScore > 0 &&
    Math.abs(secondScore - thirdScore) / secondScore <= 0.15

  return includeThird
    ? `${first[0]}${second[0]}${third[0]}`
    : `${first[0]}${second[0]}`
}

function similarity(codeA, codeB) {
  const setA = new Set(codeA.split(''))
  const setB = new Set(codeB.split(''))
  let score = 0
  setA.forEach((letter) => {
    if (setB.has(letter)) score += 1
  })
  return score
}

function resolveProfile(code) {
  if (PROFILE_LIBRARY[code]) return { code, ...PROFILE_LIBRARY[code] }

  const best = Object.keys(PROFILE_LIBRARY)
    .map((key) => ({ key, score: similarity(code, key) }))
    .sort((a, b) => b.score - a.score)[0]

  if (best?.key) return { code: best.key, ...PROFILE_LIBRARY[best.key] }

  return {
    code,
    label: 'Твій профіль формується',
    who: 'У тебе змішаний профіль. Це не мінус. Це означає, що в тебе кілька сильних сторін і важливо знайти середовище, де вони складуться в сильну комбінацію.',
    strengths: ['гнучкість', 'адаптивність', 'поєднання кількох сильних сторін'],
    future:
      'Ти не вписуєшся в один шаблон — і це нормально. У тебе більш багатошарова картина. Тут важливо не вгадати професію навмання, а побачити, де твоя комбінація здібностей дає максимум.',
  }
}

function specialityScore(userScores, spec) {
  const totalUser = TYPES.reduce((sum, type) => sum + userScores[type], 0) || 1
  let raw = 0

  TYPES.forEach((type) => {
    raw += (userScores[type] / totalUser) * (spec.weights[type] || 0)
  })

  return Math.round(raw * 100)
}

function rankedSpecialties(userScores) {
  return SPECIALTIES.map((spec) => ({
    ...spec,
    percent: specialityScore(userScores, spec),
  })).sort((a, b) => b.percent - a.percent)
}

function groupSpecialties(items) {
  const byGroup = {}

  items.forEach((item) => {
    if (!byGroup[item.group]) byGroup[item.group] = []
    byGroup[item.group].push(item)
  })

  return Object.entries(byGroup)
    .map(([group, list]) => {
      const avg = Math.round(
        list.reduce((sum, item) => sum + item.percent, 0) / list.length
      )

      const label = list
        .sort((a, b) => b.percent - a.percent)
        .slice(0, 3)
        .map((item) => item.title)
        .join(' / ')

      return { group, label, percent: avg }
    })
    .sort((a, b) => b.percent - a.percent)
}

function Shell({ children, stage = 'start' }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: `linear-gradient(180deg, ${BRAND.soft} 0%, ${BRAND.white} 54%, #f7fbff 100%)`,
        color: BRAND.text,
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.18,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(15,59,111,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,59,111,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <Character stage={stage} />
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  )
}

function LogoMark() {
  const { isMobile } = useViewport()

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
      <img
        src="/logo-max-europe-study.png"
        alt="MAX Europe Study"
        style={{
          width: isMobile ? 68 : 86,
          height: isMobile ? 68 : 86,
          objectFit: 'contain',
          display: 'block',
        }}
      />
      <div style={{ lineHeight: 1.02 }}>
        <div
          style={{
            fontSize: isMobile ? 26 : 34,
            fontWeight: 800,
            color: '#000',
            letterSpacing: '0.01em',
          }}
        >
          MAX
        </div>
        <div
          style={{
            fontSize: isMobile ? 24 : 30,
            fontWeight: 400,
            color: '#000',
          }}
        >
          Europe Study
        </div>
      </div>
    </div>
  )
}

function Character({ stage = 'start' }) {
  const { isMobile } = useViewport()

  const stageBubble = {
    start: 'Тут не треба вгадувати. Просто обирай чесно.',
    intro: 'Зараз буде коротко і по ділу — без нудного тесту.',
    onboarding: 'Ще кілька питань про тебе — і підемо далі.',
    scenes: 'Обирай те, що справді схоже на тебе.',
    analysis: 'Зараз я збираю твою картину.',
    result: 'Ось що я бачу по тобі.',
  }

  const bubblePosition = isMobile
    ? { right: 88, bottom: stage === 'result' ? 120 : 108 }
    : stage === 'result'
    ? { right: 180, bottom: 150 }
    : stage === 'scenes'
    ? { right: 190, bottom: 138 }
    : { right: 188, bottom: 128 }

  return (
    <motion.div
      initial={{ x: 18, opacity: 0 }}
      animate={{ x: [0, -4, 0], y: [0, -6, 0], opacity: 1 }}
      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        right: isMobile ? 10 : 20,
        bottom: isMobile ? 10 : 14,
        zIndex: 30,
        pointerEvents: 'none',
      }}
    >
      <motion.div
        key={stage}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{
          position: 'absolute',
          ...bubblePosition,
          width: isMobile ? 168 : 260,
          background: '#fff',
          border: `1px solid ${BRAND.line}`,
          borderRadius: 18,
          padding: isMobile ? '10px 12px' : '12px 14px',
          boxShadow: '0 14px 30px rgba(15,59,111,0.10)',
          color: BRAND.blueText,
          fontSize: isMobile ? 12 : 14,
          lineHeight: 1.35,
        }}
      >
        {stageBubble[stage] || 'Йдемо далі.'}
      </motion.div>

      <div style={{ filter: 'drop-shadow(0 16px 30px rgba(15,59,111,0.14))' }}>
        <svg
          width={isMobile ? '112' : '170'}
          height={isMobile ? '124' : '188'}
          viewBox="0 0 160 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="80" cy="68" r="34" fill={BRAND.soft} stroke={BRAND.navy} strokeWidth="4" />
          <circle cx="68" cy="65" r="3.5" fill={BRAND.navyDark} />
          <circle cx="92" cy="65" r="3.5" fill={BRAND.navyDark} />
          <path d="M68 84C72 89 76 91 80 91C84 91 88 89 92 84" stroke={BRAND.navyDark} strokeWidth="3" strokeLinecap="round" />
          <path d="M45 128C45 109 60 94 79 94H81C100 94 115 109 115 128V148H45V128Z" fill={BRAND.white} stroke={BRAND.navy} strokeWidth="4" />
          <path d="M18 44L80 18L142 44L80 62L18 44Z" fill={BRAND.navy} />
          <path d="M47 44V72C55 64 66 60 80 60C94 60 105 64 113 72V44" fill={BRAND.navy} />
          <path d="M140 44V92" stroke={BRAND.navy} strokeWidth="4" strokeLinecap="round" />
          <circle cx="140" cy="95" r="4" fill={BRAND.navy} />
        </svg>
      </div>
    </motion.div>
  )
}

function StartScreen({ onStart }) {
  const { isMobile, isTablet } = useViewport()

  return (
    <Shell stage="start">
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: isMobile ? '20px 14px 110px' : '40px 24px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 1240,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns:
              isMobile || isTablet
                ? '1fr'
                : 'minmax(0, 1.15fr) minmax(360px, 0.85fr)',
            gap: isMobile ? 18 : 36,
            alignItems: 'start',
          }}
        >
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ marginBottom: 14 }}>
              <LogoMark />
            </div>

            <h1
              style={{
                fontSize: isMobile ? 36 : 'clamp(34px, 5.2vw, 58px)',
                lineHeight: 1.08,
                margin: '16px 0 12px',
                fontWeight: 800,
                color: BRAND.navyDark,
                maxWidth: 760,
              }}
            >
              Кар’єрний компас
            </h1>

            <p
              style={{
                fontSize: isMobile ? 18 : 21,
                lineHeight: 1.6,
                color: BRAND.blueText,
                margin: '0 0 18px',
                maxWidth: 760,
                textAlign: 'left',
              }}
            >
              Це коротка, жива діагностика для тих, хто не хоче вибирати навмання.
              Вона допоможе краще зрозуміти себе, побачити сильні сторони і напрями,
              які справді можуть підійти.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, auto)',
                gap: 10,
                marginBottom: 22,
              }}
            >
              {[
                'Свій кар’єрний код',
                'Напрями з відсотками співпадіння',
                'Анти-напрями без тиску',
                'Сценарій «Майбутнє Я»',
              ].map((item) => (
                <span
                  key={item}
                  style={{
                    borderRadius: 18,
                    background: '#fff',
                    padding: isMobile ? '10px 12px' : '10px 14px',
                    fontSize: isMobile ? 13 : 14,
                    lineHeight: 1.35,
                    border: `1px solid ${BRAND.line}`,
                    color: BRAND.blueText,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>

            <button
              onClick={onStart}
              style={{
                border: 'none',
                borderRadius: 18,
                padding: isMobile ? '15px 22px' : '16px 28px',
                color: '#fff',
                fontSize: 18,
                fontWeight: 700,
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #0f3b6f, #1b5da0)',
                boxShadow: '0 16px 32px rgba(15,59,111,0.20)',
                width: isMobile ? '100%' : 'auto',
              }}
            >
              Почати
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: '#fff',
              border: `1px solid ${BRAND.line}`,
              borderRadius: 28,
              padding: isMobile ? 18 : 30,
              boxShadow: '0 18px 48px rgba(15,59,111,0.10)',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -12,
                right: 14,
                borderRadius: 999,
                padding: isMobile ? '8px 12px' : '9px 14px',
                fontSize: isMobile ? 13 : 14,
                color: '#fff',
                background: BRAND.navy,
              }}
            >
              8–11 клас
            </div>

            <div
              style={{
                display: 'grid',
                gap: 14,
                lineHeight: 1.6,
                fontSize: isMobile ? 16 : 18,
                color: BRAND.text,
                textAlign: 'left',
              }}
            >
              <p style={{ margin: 0 }}>Для тебе, якщо не знаєш, ким хочеш бути.</p>
              <p style={{ margin: 0 }}>
                Для тебе, якщо в голові вже є кілька варіантів, але вибрати один складно.
              </p>
              <p style={{ margin: 0 }}>
                Для тебе, якщо не хочеш вибирати навмання і хочеш краще зрозуміти себе без тиску.
              </p>
            </div>

            <div
              style={{
                marginTop: 18,
                borderRadius: 18,
                padding: isMobile ? 14 : 16,
                background: BRAND.soft,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: isMobile ? 14 : 15,
                  lineHeight: 1.6,
                  color: BRAND.blueText,
                  textAlign: 'left',
                }}
              >
                Наприкінці ти побачиш свій кар’єрний код, напрями з відсотками співпадіння,
                напрями, де буде складніше, і сценарій твого «Майбутнього Я».
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Shell>
  )
}

function IntroScreen({ onNext }) {
  const { isMobile } = useViewport()

  return (
    <Shell stage="intro">
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: isMobile ? '22px 14px 110px' : '40px 24px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            maxWidth: 1000,
            width: '100%',
            margin: '0 auto',
            background: '#0b1325',
            color: '#fff',
            borderRadius: 28,
            padding: isMobile ? '24px 18px' : '40px 42px',
            boxShadow: '0 22px 54px rgba(2, 6, 23, 0.35)',
            textAlign: 'left',
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? 34 : 'clamp(34px, 5vw, 58px)',
              margin: '0 0 18px',
              lineHeight: 1.08,
            }}
          >
            Уяви, що це не тест
          </h2>

          <div
            style={{
              display: 'grid',
              gap: 14,
              fontSize: isMobile ? 17 : 21,
              lineHeight: 1.65,
              color: '#d8e5f6',
              maxWidth: 820,
              marginBottom: 24,
            }}
          >
            <p style={{ margin: 0 }}>Це схоже на невелику гру про тебе самого або саму себе.</p>
            <p style={{ margin: 0 }}>
              Тут будуть різні ситуації зі шкільного життя. У них немає «правильно» чи «неправильно» —
              важливо тільки, як би вчинив(ла) саме ти.
            </p>
            <p style={{ margin: 0 }}>
              Твоє завдання — не вгадати красиву відповідь, а вибрати те, як ти насправді поводишся в житті.
            </p>
            <p style={{ margin: 0 }}>Тоді результат буде чесним і справді корисним.</p>
          </div>

          <button
            onClick={onNext}
            style={{
              border: 'none',
              borderRadius: 18,
              padding: isMobile ? '15px 22px' : '16px 28px',
              background: '#fff',
              color: '#0b1325',
              fontSize: 18,
              fontWeight: 700,
              cursor: 'pointer',
              width: isMobile ? '100%' : 'auto',
            }}
          >
            Поїхали
          </button>
        </motion.div>
      </div>
    </Shell>
  )
}

function QuestionBlock({ title, children }) {
  const { isMobile } = useViewport()

  return (
    <div>
      <div
        style={{
          fontSize: isMobile ? 18 : 20,
          fontWeight: 700,
          marginBottom: 12,
          color: BRAND.navyDark,
          lineHeight: 1.35,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  )
}

function ChoiceGrid({ items, value, onPick }) {
  const { isMobile } = useViewport()

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(5, minmax(0, 1fr))',
        gap: 10,
      }}
    >
      {items.map((item) => (
        <SelectButton key={item} active={value === item} onClick={() => onPick(item)}>
          {item}
        </SelectButton>
      ))}
    </div>
  )
}

function ChoiceStack({ items, value, onPick }) {
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {items.map((item) => (
        <SelectButton key={item} active={value === item} onClick={() => onPick(item)}>
          {item}
        </SelectButton>
      ))}
    </div>
  )
}

function SelectButton({ active, onClick, children }) {
  const { isMobile } = useViewport()

  return (
    <button
      onClick={onClick}
      style={{
        border: `1px solid ${BRAND.line}`,
        borderRadius: 18,
        padding: isMobile ? '14px 14px' : '16px 18px',
        cursor: 'pointer',
        fontSize: isMobile ? 15 : 16,
        lineHeight: 1.45,
        transition: 'all 0.2s ease',
        background: active ? BRAND.navy : '#fff',
        color: active ? '#fff' : BRAND.text,
        textAlign: 'left',
        minHeight: isMobile ? 64 : 'auto',
        wordBreak: 'break-word',
      }}
    >
      {children}
    </button>
  )
}

function OnboardingScreen({ onSubmit }) {
  const { isMobile } = useViewport()
  const [form, setForm] = useState({
    grade: '',
    difficulty: '',
    priority: '',
  })

  const ready = form.grade && form.difficulty && form.priority

  return (
    <Shell stage="onboarding">
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: isMobile ? '20px 14px 110px' : '40px 24px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            maxWidth: 920,
            width: '100%',
            margin: '0 auto',
            background: '#fff',
            border: `1px solid ${BRAND.line}`,
            borderRadius: 28,
            padding: isMobile ? 18 : 32,
            boxShadow: '0 18px 48px rgba(15,59,111,0.10)',
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? 34 : 42,
              margin: '0 0 10px',
              color: BRAND.navyDark,
              lineHeight: 1.08,
            }}
          >
            Налаштуємо компас під тебе
          </h2>

          <p
            style={{
              color: BRAND.blueText,
              fontSize: isMobile ? 17 : 18,
              margin: '0 0 24px',
            }}
          >
            Кілька коротких запитань — і далі підемо в сам квест.
          </p>

          <div style={{ display: 'grid', gap: 24 }}>
            <QuestionBlock title="У якому ти класі?">
              <ChoiceGrid
                items={['8', '9', '10', '11', 'вже закінчив(ла)']}
                value={form.grade}
                onPick={(item) => setForm((s) => ({ ...s, grade: item }))}
              />
            </QuestionBlock>

            <QuestionBlock title="Що тебе найбільше бісить у виборі майбутнього?">
              <ChoiceStack
                items={[
                  'Я взагалі не розумію, ким бути',
                  'Є варіанти, але не можу вибрати',
                  'Боюся зробити неправильний вибір',
                  'Не розумію, в чому я сильний(а)',
                  'На мене тиснуть з вибором',
                ]}
                value={form.difficulty}
                onPick={(item) => setForm((s) => ({ ...s, difficulty: item }))}
              />
            </QuestionBlock>

            <QuestionBlock title="Якби можна було обрати ідеально, що для тебе важливо?">
              <ChoiceStack
                items={[
                  'Щоб було цікаво',
                  'Щоб приносило гроші',
                  'Щоб було стабільно',
                  'Щоб була свобода',
                  'Щоб можна було вчитись за кордоном',
                  'Щоб це мало сенс',
                ]}
                value={form.priority}
                onPick={(item) => setForm((s) => ({ ...s, priority: item }))}
              />
            </QuestionBlock>
          </div>

          <button
            disabled={!ready}
            onClick={() => onSubmit(form)}
            style={{
              marginTop: 24,
              border: 'none',
              borderRadius: 18,
              padding: isMobile ? '15px 22px' : '16px 28px',
              fontSize: 18,
              fontWeight: 700,
              color: '#fff',
              cursor: ready ? 'pointer' : 'not-allowed',
              background: ready
                ? 'linear-gradient(135deg, #0f3b6f, #1b5da0)'
                : '#cbd5e1',
              width: isMobile ? '100%' : 'auto',
            }}
          >
            Далі
          </button>
        </motion.div>
      </div>
    </Shell>
  )
}

function Progress({ current, total }) {
  const percent = Math.round((current / total) * 100)

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 14,
          color: BRAND.blueText,
          marginBottom: 8,
        }}
      >
        <span>Твоя подорож</span>
        <span>
          {current}/{total}
        </span>
      </div>
      <div
        style={{
          height: 12,
          width: '100%',
          borderRadius: 999,
          background: '#dfe9f3',
          overflow: 'hidden',
        }}
      >
        <motion.div
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.35 }}
          style={{
            height: '100%',
            borderRadius: 999,
            background: BRAND.navy,
          }}
        />
      </div>
    </div>
  )
}

function SceneScreen({ scene, index, total, onAnswer }) {
  const { isMobile } = useViewport()

  return (
    <Shell stage="scenes">
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: isMobile ? '18px 14px 110px' : '36px 24px',
        }}
      >
        <div style={{ width: '100%', maxWidth: 1120, margin: '0 auto' }}>
          <Progress current={index + 1} total={total} />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: '#fff',
              border: `1px solid ${BRAND.line}`,
              borderRadius: 28,
              boxShadow: '0 18px 48px rgba(15,59,111,0.10)',
              marginTop: 18,
              padding: isMobile ? 18 : 34,
              textAlign: 'left',
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? 24 : 'clamp(28px, 4vw, 52px)',
                lineHeight: 1.2,
                margin: '0 0 12px',
                color: BRAND.navyDark,
                textAlign: 'left',
                wordBreak: 'break-word',
              }}
            >
              {scene.text}
            </h2>

            <p
              style={{
                fontSize: isMobile ? 15 : 16,
                margin: '0 0 18px',
                color: BRAND.blueText,
                lineHeight: 1.55,
                textAlign: 'left',
              }}
            >
              Обирай не ту відповідь, яка звучить правильно, а ту, яка реально найбільше схожа на тебе.
            </p>

            <div style={{ display: 'grid', gap: 10 }}>
              {scene.options.map((option, i) => (
                <motion.button
                  key={option.text}
                  onClick={() => onAnswer(option)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  style={{
                    border: `1px solid ${BRAND.line}`,
                    borderRadius: 18,
                    padding: isMobile ? '16px 14px' : '18px 20px',
                    textAlign: 'left',
                    background: '#fff',
                    color: BRAND.text,
                    fontSize: isMobile ? 16 : 18,
                    cursor: 'pointer',
                    lineHeight: 1.45,
                    wordBreak: 'break-word',
                  }}
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Shell>
  )
}

function AnalysisScreen({ onDone }) {
  const { isMobile } = useViewport()

  useEffect(() => {
    const timer = setTimeout(onDone, 1700)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <Shell stage="analysis">
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: isMobile ? '22px 14px 110px' : '40px 24px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            maxWidth: 900,
            margin: '0 auto',
            width: '100%',
            background: '#0b1325',
            color: '#fff',
            borderRadius: 28,
            padding: isMobile ? '24px 18px' : '40px 42px',
            textAlign: 'left',
            boxShadow: '0 22px 54px rgba(2, 6, 23, 0.35)',
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? 34 : 'clamp(34px, 5vw, 58px)',
              margin: '0 0 20px',
              lineHeight: 1.08,
            }}
          >
            Твій компас уже показує напрямок
          </h2>

          <p
            style={{
              fontSize: isMobile ? 18 : 20,
              color: '#d8e5f6',
              lineHeight: 1.6,
              margin: '0 0 28px',
              maxWidth: 700,
            }}
          >
            Зараз ми не просто рахуємо бали. Ми збираємо твою картину.
          </p>

          <div
            style={{
              height: 10,
              width: '100%',
              maxWidth: 560,
              borderRadius: 999,
              background: '#1e293b',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: '5%' }}
              animate={{ width: '82%' }}
              transition={{ duration: 1.5 }}
              style={{
                height: '100%',
                borderRadius: 999,
                background: '#fff',
              }}
            />
          </div>
        </motion.div>
      </div>
    </Shell>
  )
}

function ScoreBox({ label, value }) {
  const { isMobile } = useViewport()

  return (
    <div
      style={{
        borderRadius: 18,
        padding: isMobile ? '12px 14px' : '14px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        border: `1px solid ${BRAND.line}`,
        background: BRAND.soft,
        color: BRAND.text,
        minWidth: 0,
      }}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function InfoCard({ title, children }) {
  const { isMobile } = useViewport()

  return (
    <section
      style={{
        background: '#fff',
        border: `1px solid ${BRAND.line}`,
        borderRadius: 24,
        padding: isMobile ? 18 : 28,
        boxShadow: '0 14px 36px rgba(15,59,111,0.08)',
        minWidth: 0,
      }}
    >
      <h2
        style={{
          fontSize: isMobile ? 22 : 30,
          margin: '0 0 16px',
          color: BRAND.navyDark,
          lineHeight: 1.15,
          wordBreak: 'break-word',
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

function SpecialityBlock({ ranked }) {
  const { isMobile } = useViewport()
  const grouped = groupSpecialties(ranked)
  const top = grouped.slice(0, 5)
  const anti = grouped.slice(-5).reverse()

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))',
        gap: 20,
      }}
    >
      <InfoCard title="Які напрями тобі підходять найбільше">
        <div style={{ display: 'grid', gap: 12 }}>
          {top.map((item, index) => (
            <div
              key={item.group}
              style={{
                display: 'grid',
                gridTemplateColumns: '28px minmax(0,1fr) auto',
                alignItems: 'center',
                gap: 12,
                padding: isMobile ? '12px 12px' : '14px 16px',
                borderRadius: 18,
                border: `1px solid ${BRAND.line}`,
                background: index < 3 ? BRAND.softGreen : '#fff',
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  background: '#fff',
                  border: `1px solid ${BRAND.line}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: BRAND.navy,
                  fontWeight: 700,
                }}
              >
                {index + 1}
              </div>
              <span
                style={{
                  color: BRAND.text,
                  fontSize: isMobile ? 15 : 17,
                  lineHeight: 1.35,
                  wordBreak: 'break-word',
                }}
              >
                {item.label}
              </span>
              <strong
                style={{
                  color: BRAND.navy,
                  fontSize: isMobile ? 16 : 18,
                }}
              >
                {item.percent}%
              </strong>
            </div>
          ))}
        </div>
      </InfoCard>

      <InfoCard title="Напрями, де тобі буде складніше">
        <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
          {anti.map((item) => (
            <div
              key={item.group}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0,1fr) auto',
                alignItems: 'center',
                gap: 12,
                padding: isMobile ? '12px 12px' : '14px 16px',
                borderRadius: 18,
                border: '1px solid #f2caca',
                background: BRAND.softRed,
                minWidth: 0,
              }}
            >
              <span
                style={{
                  color: BRAND.text,
                  fontSize: isMobile ? 15 : 17,
                  lineHeight: 1.35,
                  wordBreak: 'break-word',
                }}
              >
                {item.label}
              </span>
              <strong
                style={{
                  color: '#a94442',
                  fontSize: isMobile ? 16 : 18,
                }}
              >
                {item.percent}%
              </strong>
            </div>
          ))}
        </div>

        <p
          style={{
            margin: 0,
            color: BRAND.blueText,
            lineHeight: 1.7,
            fontSize: isMobile ? 15 : 17,
            textAlign: 'left',
          }}
        >
          {DISCLAIMER}
        </p>
      </InfoCard>
    </div>
  )
}

function ResultScreen({ profileCode, scores, profile, ranked, onRestart }) {
  const { isMobile } = useViewport()

  return (
    <Shell stage="result">
      <div
        style={{
          padding: isMobile ? '18px 14px 110px' : '36px 24px 70px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 1180,
            margin: '0 auto',
            display: 'grid',
            gap: 20,
          }}
        >
          <section
            style={{
              background: '#fff',
              border: `1px solid ${BRAND.line}`,
              borderRadius: 28,
              padding: isMobile ? 18 : 30,
              boxShadow: '0 18px 48px rgba(15,59,111,0.10)',
            }}
          >
            <h1
              style={{
                fontSize: isMobile ? 28 : 'clamp(34px, 5vw, 60px)',
                margin: '0 0 14px',
                lineHeight: 1.08,
                color: BRAND.navyDark,
                wordBreak: 'break-word',
              }}
            >
              Твій кар’єрний код — {profileCode}
            </h1>

            <p
              style={{
                fontSize: isMobile ? 16 : 18,
                color: BRAND.blueText,
                lineHeight: 1.6,
                margin: '0 0 10px',
                textAlign: 'left',
              }}
            >
              Це не ярлик і не вирок. Це твій поточний патерн: як ти думаєш,
              дієш і в якому середовищі розкриваєшся сильніше.
            </p>

            <p
              style={{
                fontSize: isMobile ? 18 : 21,
                color: BRAND.text,
                lineHeight: 1.6,
                margin: '0 0 18px',
                textAlign: 'left',
                fontWeight: 600,
              }}
            >
              {profile.label}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile
                  ? 'repeat(2, minmax(0, 1fr))'
                  : 'repeat(6, minmax(0, 1fr))',
                gap: 10,
              }}
            >
              {TYPES.map((type) => (
                <ScoreBox key={type} label={type} value={scores[type]} />
              ))}
            </div>
          </section>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))',
              gap: 20,
            }}
          >
            <InfoCard title="Хто ти">
              <p
                style={{
                  margin: 0,
                  color: BRAND.text,
                  lineHeight: 1.7,
                  fontSize: isMobile ? 16 : 18,
                  textAlign: 'left',
                }}
              >
                {profile.who}
              </p>
            </InfoCard>

            <InfoCard title="Де ти сильний(а)">
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 22,
                  color: BRAND.text,
                  lineHeight: 1.8,
                  fontSize: isMobile ? 16 : 18,
                  textAlign: 'left',
                }}
              >
                {profile.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </InfoCard>
          </div>

          <SpecialityBlock ranked={ranked} />

          <section
            style={{
              borderRadius: 24,
              padding: isMobile ? 18 : 28,
              color: '#fff',
              background: 'linear-gradient(135deg, #0b2c54, #0f3b6f)',
              boxShadow: '0 18px 48px rgba(15,59,111,0.20)',
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? 22 : 30,
                margin: '0 0 16px',
              }}
            >
              Сценарій «Майбутнє Я»
            </h2>

            <p
              style={{
                margin: 0,
                color: '#eaf2fb',
                lineHeight: 1.75,
                fontSize: isMobile ? 16 : 19,
                textAlign: 'left',
              }}
            >
              {profile.future}
            </p>
          </section>

          <InfoCard title="Що можна зробити вже зараз">
            <p
              style={{
                margin: '0 0 14px',
                color: BRAND.blueText,
                fontSize: isMobile ? 15 : 17,
                textAlign: 'left',
              }}
            >
              Ось кілька кроків, які допоможуть перевірити результат не тільки в теорії,
              а й у реальному житті.
            </p>

            <div style={{ display: 'grid', gap: 12 }}>
              <div
                style={{
                  padding: isMobile ? '12px 12px' : '14px 16px',
                  borderRadius: 18,
                  border: `1px solid ${BRAND.line}`,
                  background: BRAND.soft,
                }}
              >
                <strong
                  style={{
                    display: 'block',
                    marginBottom: 6,
                    color: BRAND.navyDark,
                  }}
                >
                  1. Подивись на реальних людей
                </strong>
                <span
                  style={{
                    color: BRAND.text,
                    lineHeight: 1.6,
                    fontSize: isMobile ? 15 : 16,
                  }}
                >
                  Знайди 2–3 блоги, відео або інтерв’ю людей із напрямів, які потрапили в твій топ.
                </span>
              </div>

              <div
                style={{
                  padding: isMobile ? '12px 12px' : '14px 16px',
                  borderRadius: 18,
                  border: `1px solid ${BRAND.line}`,
                  background: '#fff',
                }}
              >
                <strong
                  style={{
                    display: 'block',
                    marginBottom: 6,
                    color: BRAND.navyDark,
                  }}
                >
                  2. Спробуй маленьку практику
                </strong>
                <span
                  style={{
                    color: BRAND.text,
                    lineHeight: 1.6,
                    fontSize: isMobile ? 15 : 16,
                  }}
                >
                  Зроби одне маленьке завдання зі спеціальності, яка тебе зачепила найбільше.
                </span>
              </div>

              <div
                style={{
                  padding: isMobile ? '12px 12px' : '14px 16px',
                  borderRadius: 18,
                  border: `1px solid ${BRAND.line}`,
                  background: '#fff',
                }}
              >
                <strong
                  style={{
                    display: 'block',
                    marginBottom: 6,
                    color: BRAND.navyDark,
                  }}
                >
                  3. Відслідкуй відчуття
                </strong>
                <span
                  style={{
                    color: BRAND.text,
                    lineHeight: 1.6,
                    fontSize: isMobile ? 15 : 16,
                  }}
                >
                  Подумай чесно: що тебе реально захопило, а що швидко забрало енергію.
                </span>
              </div>
            </div>
          </InfoCard>

          <section style={{ textAlign: 'center', paddingTop: 8 }}>
            <button
              onClick={onRestart}
              style={{
                border: 'none',
                borderRadius: 18,
                padding: isMobile ? '15px 22px' : '16px 26px',
                color: '#fff',
                fontSize: 18,
                fontWeight: 700,
                background: BRAND.navy,
                cursor: 'pointer',
                width: isMobile ? '100%' : 'auto',
              }}
            >
              Пройти ще раз
            </button>
          </section>
        </div>
      </div>
    </Shell>
  )
}

export default function App() {
  const [stage, setStage] = useState('start')
  const [sceneIndex, setSceneIndex] = useState(0)
  const [answers, setAnswers] = useState([])

  const scores = useMemo(() => calculateScores(answers), [answers])
  const profileCode = useMemo(() => buildHybridCode(scores), [scores])
  const profile = useMemo(() => resolveProfile(profileCode), [profileCode])
  const ranked = useMemo(() => rankedSpecialties(scores), [scores])

  const handleAnswer = (option) => {
    setAnswers((prev) => [...prev, option])

    if (sceneIndex + 1 < SCENES.length) {
      setSceneIndex((prev) => prev + 1)
    } else {
      setStage('analysis')
    }
  }

  const restart = () => {
    setStage('start')
    setSceneIndex(0)
    setAnswers([])
  }

  return (
    <AnimatePresence mode="wait">
      {stage === 'start' && (
        <StartScreen key="start" onStart={() => setStage('intro')} />
      )}

      {stage === 'intro' && (
        <IntroScreen key="intro" onNext={() => setStage('onboarding')} />
      )}

      {stage === 'onboarding' && (
        <OnboardingScreen
          key="onboarding"
          onSubmit={() => setStage('scenes')}
        />
      )}

      {stage === 'scenes' && (
        <SceneScreen
          key={`scene-${sceneIndex}`}
          scene={SCENES[sceneIndex]}
          index={sceneIndex}
          total={SCENES.length}
          onAnswer={handleAnswer}
        />
      )}

      {stage === 'analysis' && (
        <AnalysisScreen
          key="analysis"
          onDone={() => setStage('result')}
        />
      )}

      {stage === 'result' && (
        <ResultScreen
          key="result"
          profileCode={profileCode}
          scores={scores}
          profile={profile}
          ranked={ranked}
          onRestart={restart}
        />
      )}
    </AnimatePresence>
  )
}


