import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const BRAND = {
  navy: '#0f3b6f',
  navyDark: '#0b2c54',
  blueText: '#1e4f86',
  soft: '#eef5fc',
  white: '#ffffff',
  text: '#10233f',
  muted: '#5f7592',
  line: '#d8e4f0',
  page: '#f5f9fd',
  softRed: '#fff4f4',
  softGreen: '#eef8f1',
}

const DISCLAIMER = 'Це не означає, що ти не зможеш там працювати. Це означає, що тобі доведеться витрачати в 3 рази більше зусиль, щоб отримати той самий результат, який у “твоїй” сфері прийде легше.'
const TYPES = ['R', 'I', 'A', 'S', 'E', 'C']

const SCENES = [
  {
    id: 1,
    text: 'У класі дали спільний проєкт. Частина команди зависла, хтось робить щось своє, і поки не дуже зрозуміло, що з цього вийде. Що ти робиш?',
    options: [
      { text: '«Окей, давайте зробимо це нормально» — збираю всіх і розподіляю ролі.', type: 'E' },
      { text: 'Спочатку хочу зрозуміти, що ми взагалі робимо — лізу в тему і структурую.', type: 'I' },
      { text: 'Я вже бачу, як це можна подати цікаво — беру ідею і оформлення.', type: 'A' },
      { text: 'Я краще просто зроблю свою частину і не буду чекати інших.', type: 'R' },
      { text: 'Мені важливо, щоб усі включились — пробую підтягнути слабших.', type: 'S' },
      { text: 'Мене бісить хаос — відкриваю нотатки і розписую план.', type: 'C' },
    ],
  },
  {
    id: 2,
    text: 'У тебе раптом повністю вільний день. Немає уроків, термінових справ і ніхто нічого не просить. Що тобі реально хочеться робити?',
    options: [
      { text: 'Щось створити: візуал, текст, ідею.', type: 'A' },
      { text: 'Розібрати нову тему, яка давно цікавить.', type: 'I' },
      { text: 'Зустрітися або списатись з людьми.', type: 'S' },
      { text: 'Придумати щось корисне і реалізувати.', type: 'E' },
      { text: 'Навести порядок у своїх справах.', type: 'C' },
      { text: 'Щось зробити руками або протестити.', type: 'R' },
    ],
  },
  {
    id: 3,
    text: 'У чаті по спільному завданню всі сперечаються, а нормального рішення досі немає. Що ти робиш?',
    options: [
      { text: '«Слухайте, є варіант» — кидаю нову ідею.', type: 'A' },
      { text: 'Хочу зрозуміти, чому ми взагалі тут застрягли.', type: 'I' },
      { text: 'Беру ініціативу і починаю вести.', type: 'E' },
      { text: 'Пишу чітко: хто що робить.', type: 'C' },
      { text: 'Стараюсь знизити напругу.', type: 'S' },
      { text: 'Просто закриваю свою частину.', type: 'R' },
    ],
  },
  {
    id: 4,
    text: 'Тобі задали завдання, яке ти ще жодного разу не робив(ла). Яка твоя перша реакція?',
    options: [
      { text: 'Відкриваю і пробую одразу.', type: 'R' },
      { text: 'Хочу спочатку зрозуміти логіку.', type: 'I' },
      { text: 'Думаю, як зробити це цікавіше.', type: 'A' },
      { text: 'Питаю або обговорюю.', type: 'S' },
      { text: 'Беру і починаю керувати процесом.', type: 'E' },
      { text: 'Шукаю інструкцію.', type: 'C' },
    ],
  },
  {
    id: 5,
    text: 'У який момент ти ловиш себе на думці: «О, це реально кайф»?',
    options: [
      { text: 'Коли видно реальний результат.', type: 'R' },
      { text: 'Коли зрозумів(ла) щось складне.', type: 'I' },
      { text: 'Коли вийшло красиво або незвично.', type: 'A' },
      { text: 'Коли комусь допоміг(ла).', type: 'S' },
      { text: 'Коли змінив(ла) ситуацію.', type: 'E' },
      { text: 'Коли все чітко і правильно.', type: 'C' },
    ],
  },
  {
    id: 6,
    text: 'Хтось із класу каже: «Я взагалі не розумію цю тему». Що ти робиш?',
    options: [
      { text: 'Показую на прикладі.', type: 'R' },
      { text: 'Пояснюю логіку.', type: 'I' },
      { text: 'Придумую просту аналогію.', type: 'A' },
      { text: 'Сідаю і розбираю разом.', type: 'S' },
      { text: 'Беру процес у свої руки.', type: 'E' },
      { text: 'Розкладаю по кроках.', type: 'C' },
    ],
  },
  {
    id: 7,
    text: 'Якщо треба обрати новий гурток, курс або напрям, тебе більше тягне туди, де:',
    options: [
      { text: 'Є реальна практика.', type: 'R' },
      { text: 'Можна досліджувати.', type: 'I' },
      { text: 'Можна проявитись творчо.', type: 'A' },
      { text: 'Є люди і контакт.', type: 'S' },
      { text: 'Можна вести і організовувати.', type: 'E' },
      { text: 'Є порядок і результат.', type: 'C' },
    ],
  },
  {
    id: 8,
    text: 'У команді ти зазвичай:',
    options: [
      { text: 'Той, хто робить.', type: 'R' },
      { text: 'Той, хто думає.', type: 'I' },
      { text: 'Той, хто придумує.', type: 'A' },
      { text: 'Той, хто підтримує.', type: 'S' },
      { text: 'Той, хто веде.', type: 'E' },
      { text: 'Той, хто структурує.', type: 'C' },
    ],
  },
  {
    id: 9,
    text: 'Що тебе дратує найбільше?',
    options: [
      { text: 'Сидіти і нічого не робити.', type: 'R' },
      { text: 'Тупі рішення.', type: 'I' },
      { text: '«Так треба і все».', type: 'A' },
      { text: 'Холодність.', type: 'S' },
      { text: 'Коли всі тягнуть час.', type: 'E' },
      { text: 'Хаос.', type: 'C' },
    ],
  },
  {
    id: 10,
    text: 'Уяви, що ти придумав(ла) свій маленький проєкт. Що тебе в цьому захоплює найбільше?',
    options: [
      { text: 'Налаштувати і протестити.', type: 'R' },
      { text: 'Продумати логіку.', type: 'I' },
      { text: 'Придумати стиль.', type: 'A' },
      { text: 'Зрозуміти людей.', type: 'S' },
      { text: 'Запустити і зібрати.', type: 'E' },
      { text: 'Побудувати систему.', type: 'C' },
    ],
  },
  {
    id: 11,
    text: 'Ти потрапив(ла) в нову школу, табір або компанію. Що робиш спочатку?',
    options: [
      { text: 'Дивлюсь, що тут можна зробити на практиці.', type: 'R' },
      { text: 'Спостерігаю і аналізую.', type: 'I' },
      { text: 'Ловлю атмосферу.', type: 'A' },
      { text: 'Знайомлюсь з людьми.', type: 'S' },
      { text: 'Швидко займаю активну позицію.', type: 'E' },
      { text: 'Хочу зрозуміти правила.', type: 'C' },
    ],
  },
  {
    id: 12,
    text: 'Яке завдання ти б узяв(ла) сам(а), навіть якщо воно не обов’язкове?',
    options: [
      { text: 'Практичну або технічну частину.', type: 'R' },
      { text: 'Аналіз і перевірку даних.', type: 'I' },
      { text: 'Оформлення, візуал або подачу.', type: 'A' },
      { text: 'Комунікацію з людьми.', type: 'S' },
      { text: 'Організацію процесу.', type: 'E' },
      { text: 'Порядок дій і контроль.', type: 'C' },
    ],
  },
  {
    id: 13,
    text: 'Що з цього для тебе звучить справді цікаво?',
    options: [
      { text: 'Де є щось реальне, що можна зробити.', type: 'R' },
      { text: 'Де треба думати і розбиратися.', type: 'I' },
      { text: 'Де можна створювати.', type: 'A' },
      { text: 'Де є люди.', type: 'S' },
      { text: 'Де можна впливати.', type: 'E' },
      { text: 'Де все чітко і зрозуміло.', type: 'C' },
    ],
  },
  {
    id: 14,
    text: 'Ким ти хочеш себе відчувати в майбутньому?',
    options: [
      { text: 'Я вмію робити реальні речі.', type: 'R' },
      { text: 'Я розумію складне.', type: 'I' },
      { text: 'Я створюю щось своє.', type: 'A' },
      { text: 'Я потрібен(на) людям.', type: 'S' },
      { text: 'Я веду і рухаю.', type: 'E' },
      { text: 'Я тримаю порядок.', type: 'C' },
    ],
  },
  {
    id: 15,
    text: 'Що в тобі, як тобі здається, найсильніше?',
    options: [
      { text: 'Практичність.', type: 'R' },
      { text: 'Розуміння.', type: 'I' },
      { text: 'Креативність.', type: 'A' },
      { text: 'Людяність.', type: 'S' },
      { text: 'Ініціативність.', type: 'E' },
      { text: 'Системність.', type: 'C' },
    ],
  },
  {
    id: 16,
    text: 'Потрібно здати завдання, а готова тільки половина. Що ти робиш?',
    options: [
      { text: 'Швидко ріжу зайве і збираю структуру.', type: 'C' },
      { text: 'Беру відповідальність і говорю з вчителем.', type: 'E' },
      { text: 'Мовчки доробляю.', type: 'R' },
      { text: 'Шукаю нестандартний вихід.', type: 'A' },
      { text: 'Заспокоюю людей.', type: 'S' },
      { text: 'Аналізую, що реально врятувати.', type: 'I' },
    ],
  },
  {
    id: 17,
    text: 'Перед тобою два варіанти: один дуже цікавий, але новий і трохи страшний. Інший — зрозумілий, але не дуже захоплює. Що ти обереш?',
    options: [
      { text: 'Дивлюсь, де буде реальний результат.', type: 'R' },
      { text: 'Збираю більше інформації.', type: 'I' },
      { text: 'Обираю те, де більше свободи.', type: 'A' },
      { text: 'Питаю інших.', type: 'S' },
      { text: 'Думаю, де більше росту.', type: 'E' },
      { text: 'Обираю зрозумілий шлях.', type: 'C' },
    ],
  },
  {
    id: 18,
    text: 'Ти старався(лась), але вийшло не так, як хотілося. Що далі?',
    options: [
      { text: 'Пробую ще.', type: 'R' },
      { text: 'Шукаю помилку.', type: 'I' },
      { text: 'Змінюю підхід.', type: 'A' },
      { text: 'Питаю фідбек.', type: 'S' },
      { text: 'Беру нову стратегію.', type: 'E' },
      { text: 'Переглядаю систему.', type: 'C' },
    ],
  },
]

const CATEGORY_WEIGHTS = {
  education: { S: 0.35, I: 0.2, C: 0.2, E: 0.1, A: 0.1, R: 0.05 },
  arts: { A: 0.45, I: 0.15, S: 0.1, E: 0.1, C: 0.1, R: 0.1 },
  social: { I: 0.25, S: 0.2, E: 0.2, A: 0.15, C: 0.1, R: 0.1 },
  businessLaw: { E: 0.28, C: 0.22, S: 0.14, I: 0.14, A: 0.12, R: 0.1 },
  science: { I: 0.32, R: 0.18, C: 0.18, A: 0.12, S: 0.1, E: 0.1 },
  ict: { I: 0.34, C: 0.2, R: 0.18, A: 0.14, E: 0.08, S: 0.06 },
  engineering: { R: 0.32, I: 0.22, C: 0.18, E: 0.12, A: 0.1, S: 0.06 },
  agriculture: { R: 0.28, I: 0.18, C: 0.18, S: 0.14, E: 0.12, A: 0.1 },
  health: { S: 0.32, I: 0.2, C: 0.18, R: 0.14, E: 0.08, A: 0.08 },
  services: { E: 0.22, S: 0.22, R: 0.16, C: 0.16, A: 0.14, I: 0.1 },
}

const SPECIALTIES = [
  { title: 'дошкільна освіта', category: 'education' },
  { title: 'початкова освіта', category: 'education' },
  { title: 'середня освіта', category: 'education' },
  { title: 'предметне викладання', category: 'education' },
  { title: 'спеціальна освіта', category: 'education' },
  { title: 'освітній менеджмент', category: 'education', weights: { E: 0.24, S: 0.24, C: 0.22, I: 0.16, A: 0.08, R: 0.06 } },
  { title: 'педагогіка', category: 'education' },
  { title: 'андрагогіка', category: 'education' },
  { title: 'освітні технології', category: 'education', weights: { I: 0.26, S: 0.2, C: 0.2, E: 0.12, A: 0.12, R: 0.1 } },

  { title: 'образотворче мистецтво', category: 'arts' },
  { title: 'музика', category: 'arts' },
  { title: 'сценічне мистецтво', category: 'arts', weights: { A: 0.36, S: 0.18, E: 0.18, I: 0.1, C: 0.08, R: 0.1 } },
  { title: 'дизайн', category: 'arts', weights: { A: 0.38, I: 0.14, E: 0.14, C: 0.12, R: 0.12, S: 0.1 } },
  { title: 'мода', category: 'arts' },
  { title: 'графіка', category: 'arts' },
  { title: 'архітектура інтер’єру', category: 'arts', weights: { A: 0.28, R: 0.18, I: 0.18, C: 0.14, E: 0.12, S: 0.1 } },
  { title: 'історія мистецтв', category: 'arts' },
  { title: 'філософія', category: 'arts', weights: { I: 0.34, A: 0.2, S: 0.14, C: 0.12, E: 0.1, R: 0.1 } },
  { title: 'історія', category: 'arts', weights: { I: 0.3, A: 0.18, S: 0.14, C: 0.14, E: 0.12, R: 0.12 } },
  { title: 'археологія', category: 'arts', weights: { I: 0.26, R: 0.22, A: 0.16, C: 0.14, S: 0.12, E: 0.1 } },
  { title: 'релігієзнавство', category: 'arts' },
  { title: 'мовознавство', category: 'arts', weights: { I: 0.28, A: 0.24, S: 0.14, C: 0.14, E: 0.1, R: 0.1 } },
  { title: 'література', category: 'arts' },
  { title: 'переклад', category: 'arts', weights: { I: 0.24, A: 0.22, S: 0.18, C: 0.16, E: 0.1, R: 0.1 } },
  { title: 'культурологія', category: 'arts' },

  { title: 'соціологія', category: 'social' },
  { title: 'політологія', category: 'social' },
  { title: 'міжнародні відносини', category: 'social', weights: { I: 0.22, E: 0.22, S: 0.16, A: 0.14, C: 0.14, R: 0.12 } },
  { title: 'європейські студії', category: 'social' },
  { title: 'медіа', category: 'social', weights: { A: 0.24, E: 0.2, I: 0.18, S: 0.16, C: 0.12, R: 0.1 } },
  { title: 'журналістика', category: 'social', weights: { I: 0.22, A: 0.2, E: 0.18, S: 0.18, C: 0.12, R: 0.1 } },
  { title: 'комунікації', category: 'social', weights: { E: 0.24, S: 0.22, A: 0.18, I: 0.14, C: 0.12, R: 0.1 } },
  { title: 'бібліотечна справа', category: 'social', weights: { C: 0.28, I: 0.22, S: 0.18, A: 0.12, E: 0.1, R: 0.1 } },
  { title: 'документознавство', category: 'social', weights: { C: 0.3, I: 0.24, E: 0.14, S: 0.12, A: 0.1, R: 0.1 } },
  { title: 'інформаційна справа', category: 'social' },
  { title: 'gender studies', category: 'social' },
  { title: 'regional studies', category: 'social' },

  { title: 'менеджмент', category: 'businessLaw', weights: { E: 0.3, C: 0.2, S: 0.18, I: 0.14, A: 0.1, R: 0.08 } },
  { title: 'бізнес-адміністрування', category: 'businessLaw' },
  { title: 'міжнародний бізнес', category: 'businessLaw', weights: { E: 0.3, S: 0.18, C: 0.18, I: 0.14, A: 0.12, R: 0.08 } },
  { title: 'підприємництво', category: 'businessLaw', weights: { E: 0.34, A: 0.16, S: 0.16, C: 0.14, I: 0.12, R: 0.08 } },
  { title: 'маркетинг', category: 'businessLaw', weights: { E: 0.28, A: 0.22, S: 0.18, C: 0.14, I: 0.1, R: 0.08 } },
  { title: 'digital marketing', category: 'businessLaw', weights: { E: 0.24, A: 0.22, I: 0.18, S: 0.16, C: 0.12, R: 0.08 } },
  { title: 'продажі', category: 'businessLaw', weights: { E: 0.34, S: 0.24, A: 0.16, C: 0.12, I: 0.08, R: 0.06 } },
  { title: 'логістика', category: 'businessLaw', weights: { C: 0.24, E: 0.22, I: 0.18, R: 0.16, S: 0.1, A: 0.1 } },
  { title: 'HR', category: 'businessLaw', weights: { S: 0.26, E: 0.22, C: 0.18, I: 0.14, A: 0.12, R: 0.08 } },
  { title: 'фінанси', category: 'businessLaw', weights: { C: 0.28, I: 0.24, E: 0.16, S: 0.1, A: 0.12, R: 0.1 } },
  { title: 'банківська справа', category: 'businessLaw', weights: { C: 0.3, I: 0.22, E: 0.16, S: 0.1, A: 0.1, R: 0.12 } },
  { title: 'бухгалтерський облік', category: 'businessLaw', weights: { C: 0.34, I: 0.24, E: 0.12, S: 0.08, A: 0.08, R: 0.14 } },
  { title: 'аудит', category: 'businessLaw', weights: { C: 0.34, I: 0.26, E: 0.12, S: 0.08, A: 0.08, R: 0.12 } },
  { title: 'страхування', category: 'businessLaw', weights: { C: 0.28, S: 0.18, I: 0.18, E: 0.14, A: 0.08, R: 0.14 } },
  { title: 'державне управління', category: 'businessLaw', weights: { E: 0.26, C: 0.24, S: 0.16, I: 0.16, A: 0.08, R: 0.1 } },
  { title: 'публічна адміністрація', category: 'businessLaw', weights: { E: 0.24, C: 0.24, S: 0.18, I: 0.16, A: 0.08, R: 0.1 } },
  { title: 'право', category: 'businessLaw', weights: { I: 0.24, E: 0.22, C: 0.22, S: 0.14, A: 0.08, R: 0.1 } },
  { title: 'міжнародне право', category: 'businessLaw', weights: { I: 0.22, E: 0.22, C: 0.2, S: 0.16, A: 0.1, R: 0.1 } },
  { title: 'податкове право', category: 'businessLaw', weights: { C: 0.3, I: 0.24, E: 0.18, S: 0.08, A: 0.08, R: 0.12 } },
  { title: 'комплаєнс', category: 'businessLaw', weights: { C: 0.34, I: 0.22, E: 0.16, S: 0.08, A: 0.08, R: 0.12 } },

  { title: 'математика', category: 'science', weights: { I: 0.38, C: 0.22, R: 0.14, A: 0.08, E: 0.08, S: 0.1 } },
  { title: 'прикладна математика', category: 'science', weights: { I: 0.36, C: 0.22, R: 0.16, A: 0.08, E: 0.08, S: 0.1 } },
  { title: 'статистика', category: 'science', weights: { I: 0.34, C: 0.24, R: 0.14, E: 0.1, A: 0.08, S: 0.1 } },
  { title: 'фізика', category: 'science' },
  { title: 'хімія', category: 'science' },
  { title: 'біологія', category: 'science', weights: { I: 0.28, R: 0.18, C: 0.16, S: 0.14, A: 0.12, E: 0.12 } },
  { title: 'екологія', category: 'science', weights: { I: 0.24, R: 0.18, S: 0.18, C: 0.16, E: 0.12, A: 0.12 } },
  { title: 'географія', category: 'science' },
  { title: 'геологія', category: 'science' },
  { title: 'науки про землю', category: 'science' },
  { title: 'біохімія', category: 'science' },
  { title: 'молекулярна біологія', category: 'science' },
  { title: 'астрономія', category: 'science' },
  { title: 'нанонауки', category: 'science', weights: { I: 0.34, R: 0.18, C: 0.18, A: 0.1, E: 0.1, S: 0.1 } },

  { title: 'комп’ютерні науки', category: 'ict' },
  { title: 'програмна інженерія', category: 'ict' },
  { title: 'software development', category: 'ict' },
  { title: 'data science', category: 'ict', weights: { I: 0.36, C: 0.22, R: 0.14, A: 0.12, E: 0.08, S: 0.08 } },
  { title: 'штучний інтелект', category: 'ict', weights: { I: 0.36, C: 0.2, R: 0.16, A: 0.12, E: 0.08, S: 0.08 } },
  { title: 'кібербезпека', category: 'ict', weights: { I: 0.32, C: 0.24, R: 0.18, E: 0.1, A: 0.08, S: 0.08 } },
  { title: 'інформаційні системи', category: 'ict' },
  { title: 'web development', category: 'ict', weights: { I: 0.28, A: 0.2, C: 0.18, R: 0.18, E: 0.08, S: 0.08 } },
  { title: 'game development', category: 'ict', weights: { A: 0.24, I: 0.24, R: 0.18, C: 0.16, E: 0.1, S: 0.08 } },
  { title: 'cloud systems', category: 'ict', weights: { I: 0.32, C: 0.24, R: 0.18, E: 0.1, A: 0.08, S: 0.08 } },
  { title: 'computer engineering', category: 'ict', weights: { I: 0.3, R: 0.24, C: 0.2, E: 0.1, A: 0.08, S: 0.08 } },
  { title: 'business informatics', category: 'ict', weights: { I: 0.28, C: 0.22, E: 0.16, R: 0.14, A: 0.12, S: 0.08 } },
  { title: 'UX/UI', category: 'ict', weights: { A: 0.32, I: 0.18, S: 0.18, C: 0.14, E: 0.1, R: 0.08 } },
  { title: 'human-computer interaction', category: 'ict', weights: { I: 0.22, A: 0.2, S: 0.18, C: 0.16, E: 0.12, R: 0.12 } },

  { title: 'машинобудування', category: 'engineering' },
  { title: 'електротехніка', category: 'engineering' },
  { title: 'електроніка', category: 'engineering' },
  { title: 'робототехніка', category: 'engineering', weights: { R: 0.28, I: 0.24, C: 0.18, A: 0.1, E: 0.1, S: 0.1 } },
  { title: 'мехатроніка', category: 'engineering' },
  { title: 'автоматизація', category: 'engineering' },
  { title: 'цивільне будівництво', category: 'engineering', weights: { R: 0.3, C: 0.2, I: 0.2, E: 0.12, A: 0.1, S: 0.08 } },
  { title: 'архітектура', category: 'engineering', weights: { A: 0.24, R: 0.22, I: 0.18, C: 0.14, E: 0.12, S: 0.1 } },
  { title: 'промисловий дизайн', category: 'engineering', weights: { A: 0.26, R: 0.22, I: 0.18, C: 0.14, E: 0.12, S: 0.08 } },
  { title: 'матеріалознавство', category: 'engineering' },
  { title: 'енергетика', category: 'engineering' },
  { title: 'хімічна інженерія', category: 'engineering' },
  { title: 'транспортні технології', category: 'engineering' },
  { title: 'авіаційна інженерія', category: 'engineering' },
  { title: 'автомобільна інженерія', category: 'engineering' },
  { title: 'виробничі системи', category: 'engineering' },

  { title: 'агрономія', category: 'agriculture' },
  { title: 'агробізнес', category: 'agriculture', weights: { R: 0.22, E: 0.2, C: 0.18, I: 0.14, S: 0.14, A: 0.12 } },
  { title: 'садівництво', category: 'agriculture' },
  { title: 'харчові технології', category: 'agriculture', weights: { R: 0.24, I: 0.18, C: 0.18, A: 0.14, S: 0.14, E: 0.12 } },
  { title: 'лісове господарство', category: 'agriculture' },
  { title: 'захист рослин', category: 'agriculture' },
  { title: 'тваринництво', category: 'agriculture' },
  { title: 'ветеринарія', category: 'agriculture', weights: { S: 0.24, R: 0.2, I: 0.18, C: 0.14, E: 0.12, A: 0.12 } },
  { title: 'ветеринарна медицина', category: 'agriculture', weights: { S: 0.24, R: 0.2, I: 0.18, C: 0.14, E: 0.12, A: 0.12 } },
  { title: 'агроекологія', category: 'agriculture' },
  { title: 'виноробство', category: 'agriculture', weights: { R: 0.22, A: 0.18, C: 0.18, I: 0.16, E: 0.14, S: 0.12 } },
  { title: 'ландшафтний менеджмент', category: 'agriculture', weights: { R: 0.22, A: 0.18, E: 0.18, C: 0.16, I: 0.14, S: 0.12 } },

  { title: 'медицина', category: 'health', weights: { S: 0.28, I: 0.22, C: 0.18, R: 0.14, E: 0.08, A: 0.1 } },
  { title: 'стоматологія', category: 'health', weights: { R: 0.24, S: 0.2, I: 0.18, C: 0.18, E: 0.08, A: 0.12 } },
  { title: 'фармація', category: 'health', weights: { C: 0.22, I: 0.22, S: 0.18, R: 0.16, E: 0.08, A: 0.14 } },
  { title: 'медсестринство', category: 'health' },
  { title: 'фізична терапія', category: 'health', weights: { S: 0.26, R: 0.2, I: 0.16, C: 0.14, E: 0.1, A: 0.14 } },
  { title: 'реабілітація', category: 'health', weights: { S: 0.26, R: 0.2, I: 0.16, C: 0.14, E: 0.1, A: 0.14 } },
  { title: 'громадське здоров’я', category: 'health', weights: { S: 0.24, I: 0.2, C: 0.18, E: 0.14, R: 0.12, A: 0.12 } },
  { title: 'лабораторна діагностика', category: 'health', weights: { I: 0.26, C: 0.22, R: 0.18, S: 0.16, E: 0.08, A: 0.1 } },
  { title: 'біомедицина', category: 'health', weights: { I: 0.28, S: 0.18, C: 0.18, R: 0.16, A: 0.1, E: 0.1 } },
  { title: 'харчування і дієтологія', category: 'health', weights: { S: 0.24, I: 0.18, C: 0.18, R: 0.14, A: 0.14, E: 0.12 } },
  { title: 'психологія', category: 'health', weights: { S: 0.3, I: 0.18, A: 0.14, C: 0.14, E: 0.12, R: 0.12 } },
  { title: 'психотерапія', category: 'health', weights: { S: 0.32, I: 0.16, A: 0.14, C: 0.14, E: 0.12, R: 0.12 } },
  { title: 'соціальна робота', category: 'health', weights: { S: 0.32, E: 0.16, I: 0.14, C: 0.14, A: 0.12, R: 0.12 } },
  { title: 'ерготерапія', category: 'health', weights: { S: 0.26, R: 0.2, I: 0.16, C: 0.14, A: 0.14, E: 0.1 } },
  { title: 'акушерство', category: 'health', weights: { S: 0.28, R: 0.18, C: 0.16, I: 0.16, E: 0.1, A: 0.12 } },

  { title: 'туризм', category: 'services', weights: { E: 0.24, S: 0.24, A: 0.18, C: 0.12, R: 0.12, I: 0.1 } },
  { title: 'готельно-ресторанна справа', category: 'services', weights: { S: 0.22, E: 0.22, R: 0.18, C: 0.16, A: 0.12, I: 0.1 } },
  { title: 'івент-менеджмент', category: 'services', weights: { E: 0.28, A: 0.22, S: 0.2, C: 0.14, R: 0.08, I: 0.08 } },
  { title: 'спорт', category: 'services', weights: { R: 0.26, E: 0.18, S: 0.18, C: 0.12, A: 0.14, I: 0.12 } },
  { title: 'фітнес та wellness', category: 'services', weights: { S: 0.22, R: 0.2, E: 0.18, A: 0.14, C: 0.14, I: 0.12 } },
  { title: 'beauty & cosmetology', category: 'services', weights: { A: 0.24, S: 0.2, R: 0.18, E: 0.16, C: 0.12, I: 0.1 } },
  { title: 'безпекові студії', category: 'services', weights: { E: 0.22, C: 0.22, R: 0.18, I: 0.14, S: 0.14, A: 0.1 } },
  { title: 'пожежна безпека', category: 'services', weights: { R: 0.26, C: 0.2, E: 0.18, S: 0.14, I: 0.12, A: 0.1 } },
  { title: 'цивільний захист', category: 'services', weights: { E: 0.22, R: 0.2, C: 0.2, S: 0.16, I: 0.12, A: 0.1 } },
  { title: 'військові студії', category: 'services', weights: { R: 0.24, C: 0.22, E: 0.2, I: 0.12, S: 0.12, A: 0.1 } },
  { title: 'поліцейська справа', category: 'services', weights: { E: 0.22, R: 0.2, C: 0.2, S: 0.16, I: 0.12, A: 0.1 } },
  { title: 'транспортні послуги', category: 'services', weights: { C: 0.2, R: 0.2, E: 0.18, S: 0.16, I: 0.14, A: 0.12 } },
  { title: 'авіаційний сервіс', category: 'services', weights: { S: 0.22, C: 0.18, E: 0.18, R: 0.16, A: 0.14, I: 0.12 } },
  { title: 'митна справа', category: 'services', weights: { C: 0.24, E: 0.18, I: 0.18, S: 0.14, R: 0.14, A: 0.12 } },
  { title: 'охорона праці', category: 'services', weights: { C: 0.24, R: 0.2, I: 0.18, E: 0.14, S: 0.14, A: 0.1 } },
]

const PROFILE_LIBRARY = {
  EAS: {
    label: 'EAS — дії, люди, ідеї',
    who: 'Ти заряджаєшся від руху, людей і можливості запускати щось нове. Тобі добре там, де є драйв, комунікація і простір для рішень.',
    strengths: ['ініціативність', 'контактність', 'уміння зрушити процес', 'ідеї', 'вплив'],
    future: 'Твій ранок через 5 років: Ти прокидаєшся у ритмі насиченого дня. Попереду не нудний офісний маршрут, а зустрічі, рішення, запуск нового і живий рух. Ти презентуєш ідеї, збираєш людей навколо себе і відчуваєш, як твій драйв заряджає команду. Ти — людина-двигун, яка створює можливості там, де інші бачать проблеми.',
  },
  ICR: {
    label: 'ICR — логіка, система, результат',
    who: 'Ти сильний(а) там, де треба розібратися глибоко, побачити закономірність і зібрати систему, яка реально працює.',
    strengths: ['логіка', 'точність', 'аналітика', 'концентрація', 'системність'],
    future: 'Твій ранок: Ти заходиш у сучасний простір, де важливі точність, логіка і сильні рішення. На твоїх екранах — дані, які сьогодні стануть відповіддю на велику задачу. Твій спокій і точність захоплюють. Ти знаєш, як працює цей світ «під капотом», і отримуєш задоволення від того, що створюєш архітектуру майбутнього, яка працює ідеально.',
  },
  SAE: {
    label: 'SAE — люди, підтримка, контакт',
    who: 'Ти добре відчуваєш людей і не проходиш повз, коли комусь потрібна опора. Твоя сила — у взаємодії, турботі та змісті.',
    strengths: ['емпатія', 'контакт', 'пояснення', 'підтримка', 'витримка'],
    future: 'Твій ранок: Ти збираєшся на роботу, де головна цінність — люди. Твоя суперсила — бачити потенціал у людях. Сьогодні ти допоможеш комусь знайти свій шлях або відновити сили. Ти відчуваєш глибокий сенс у кожній хвилині, бо твоя робота — це вдячні очі людей та реальні зміни в їхніх долях.',
  },
  AES: {
    label: 'AES — креатив, стиль, візуал',
    who: 'Ти бачиш світ не так, як більшість. Тобі важлива форма, атмосфера, подача і можливість створювати щось впізнаване.',
    strengths: ['креативність', 'візуальне мислення', 'смак', 'ідеї', 'нестандартний погляд'],
    future: 'Твій ранок: Ти заходиш у простір, де навколо — ескізи, мудборди, кольори, сенси і візуальні рішення. Ти не просто працюєш, ти створюєш візуальну мову майбутнього. Твій день — це пошук ідеальної форми та кольору. Ти бачиш світ інакше, і люди готові платити за твій унікальний погляд.',
  },
  CIS: {
    label: 'CIS — порядок, точність, система',
    who: 'Ти спокійний(а) там, де є ясність, структура і відповідальність. Коли інші губляться, ти наводиш порядок.',
    strengths: ['увага до деталей', 'порядок', 'контроль', 'точність', 'надійність'],
    future: 'Твій ранок: Ти відкриваєш звіти, показники і задачі, де все має бути точно. Навколо — порядок і чіткість. Поки інші губляться в хаосі, ти спокійно тримаєш усе під контролем. Ти — той самий фундамент, на якому тримається великий бізнес. Твоя стабільність і системність — це твій ключ до високого статусу.',
  },
  AIR: {
    label: 'AIR — інтерес, відкриття, нове',
    who: 'Тебе тягне туди, де ще немає готових відповідей. Ти любиш досліджувати, пробувати нове і поєднувати те, що інші не поєднують.',
    strengths: ['дослідницький інтерес', 'сміливість до нового', 'ідеї', 'гнучкість', 'експеримент'],
    future: 'Твій ранок: Ти працюєш над проєктом, якого ще рік тому не існувало. Це поєднання науки та дизайну, або технологій та мистецтва. Ти — дослідник, який не боїться експериментів. Твій день — це лабораторія ідей, де ти щоразу винаходиш новий спосіб вирішення складних задач. Ти завжди на крок попереду ринку.',
  },
  ESC: {
    label: 'ESC — управління, відповідальність, рамка',
    who: 'Ти вмієш тримати рамку, брати відповідальність і збирати процес так, щоб він працював, а не сипався.',
    strengths: ['управління', 'відповідальність', 'рамка', 'рішення', 'системний вплив'],
    future: 'Твій ранок: Ти заходиш у простір, де приймаються важливі рішення. Це може бути управлінська, юридична чи організаційна реальність, де багато залежить від твоєї зібраності. Ти знаєш правила гри і вмієш керувати процесами так, щоб система працювала як годинник. Ти несеш відповідальність і насолоджуєшся масштабом свого впливу.',
  },
  IAS: {
    label: 'IAS — аналітика, сенси, комунікація',
    who: 'Ти поєднуєш глибину думки з умінням пояснити складне так, щоб це мало сенс для інших.',
    strengths: ['аналітика', 'сенси', 'пояснення', 'інтелектуальна глибина', 'комунікація'],
    future: 'Твій ранок: Ти готуєш аналітичний матеріал, виступ або пояснення для людей, яким важлива глибина. Ти поєднуєш знання з умінням донести їх до інших. Ти — експерт, до думки якого прислухаються. Твій день — це інтелектуальні дискусії та пошук істини в океані інформації.',
  },
  ERC: {
    label: 'ERC — дія, техніка, конкретика',
    who: 'Ти любиш реальний результат. Не просто говорити, а будувати, запускати, піднімати, ремонтувати, реалізовувати.',
    strengths: ['практичність', 'дія', 'технічне мислення', 'витривалість', 'конкретика'],
    future: 'Твій ранок: Ти там, де ідеї стають реальними конструкціями, системами або технічними рішеннями. Ти любиш бачити, як цифри на папері перетворюються на щось справжнє. Твоя робота — це надійність і результат, який залишиться надовго. Ти людина справи.',
  },
  SCI: {
    label: 'SCI — турбота, відповідальність, опора',
    who: 'Ти вмієш бути опорою. Там, де потрібні терпіння, відповідальність і реальна користь для інших, ти розкриваєшся дуже сильно.',
    strengths: ['турбота', 'відповідальність', 'терпіння', 'стійкість', 'надійність'],
    future: 'Твій ранок: Ти перевіряєш план допомоги, відновлення або підтримки для людей, яким справді важлива твоя присутність. Ти — та людина, якій довіряють найцінніше. Ти поєднуєш професіоналізм з неймовірним терпінням. Ти створюєш безпечний простір, де люди одужують, відновлюються і зростають.',
  },
  ESA: {
    label: 'ESA — дія, вплив, люди',
    who: 'Ти швидко включаєшся, добре комунікуєш і любиш бути в центрі процесу. Тобі важливо не просто бути присутнім(ьою), а реально вести.',
    strengths: ['лідерство', 'енергія', 'вплив', 'контактність', 'швидкі рішення'],
    future: 'Твій ранок через 5 років: У тебе перший дзвінок ще до кави. Ти в русі, у процесі, в контакті з людьми. Ти збираєш команду, запускаєш рішення і бачиш, як твоя енергія рухає все вперед.',
  },
  IAR: {
    label: 'IAR — логіка, креатив, рішення',
    who: 'Ти не просто думаєш — ти придумуєш розумно. У тебе сильне поєднання логіки і нестандартного мислення.',
    strengths: ['системне мислення', 'креативність', 'концептуальність', 'розв’язання складних задач', 'дослідницький інтерес'],
    future: 'Твій ранок через 5 років: Перед тобою задача, яку більшість назвала б занадто складною. А ти бачиш у ній не проблему, а конструкцію. Ти поєднуєш ідеї, дані і нестандартні рішення так, ніби це твоя природна мова.',
  },
}

const GENERIC_PROFILE = {
  label: 'Твій профіль формується',
  who: 'У тебе змішаний профіль. Це не мінус. Це означає, що в тебе кілька сильних сторін, і важливо знайти середовище, де вони складуться в сильну комбінацію.',
  strengths: ['гнучкість', 'здатність адаптуватися', 'кілька сильних сторін'],
  future: 'Ти не вписуєшся в один шаблон — і це нормально. У тебе більш багатошарова картина. Тут важливо не вгадати професію навмання, а побачити, де твоя комбінація здібностей дає максимум.',
}

function calculateScores(answers) {
  const base = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
  answers.forEach((answer) => {
    if (answer?.type && base[answer.type] !== undefined) {
      base[answer.type] += 1
    }
  })
  return base
}

function buildHybridCode(scores) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const [first, second, third] = sorted
  if (!first || !second) return ''
  const secondScore = second[1]
  const thirdScore = third?.[1] ?? 0
  const includeThird = secondScore > 0 && Math.abs(secondScore - thirdScore) / secondScore <= 0.15
  return includeThird ? `${first[0]}${second[0]}${third[0]}` : `${first[0]}${second[0]}`
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
  return { code, ...GENERIC_PROFILE }
}

function specialityWeights(spec) {
  return spec.weights || CATEGORY_WEIGHTS[spec.category]
}

function specialityScore(userScores, spec) {
  const weights = specialityWeights(spec)
  const totalUser = TYPES.reduce((sum, type) => sum + userScores[type], 0) || 1
  let raw = 0
  TYPES.forEach((type) => {
    raw += (userScores[type] / totalUser) * (weights[type] || 0)
  })
  return Math.round(raw * 100)
}

function rankedSpecialties(userScores) {
  return SPECIALTIES
    .map((spec) => ({ ...spec, percent: specialityScore(userScores, spec) }))
    .sort((a, b) => b.percent - a.percent)
}

function Character({ stage = 'start' }) {
  const stageBubble = {
    start: 'Тут не треба вгадувати. Просто обирай чесно.',
    intro: 'Зараз буде коротко і по ділу — без нудного тесту.',
    onboarding: 'Ще кілька питань про тебе — і підемо далі.',
    scenes: 'Обирай те, що справді схоже на тебе.',
    analysis: 'Зараз я збираю твою картину.',
    result: 'Ось що я бачу по тобі.',
  }

  const bubblePosition = stage === 'result'
    ? { right: 180, bottom: 150 }
    : stage === 'scenes'
      ? { right: 190, bottom: 138 }
      : { right: 188, bottom: 128 }

  return (
    <motion.div
      initial={{ x: 18, opacity: 0 }}
      animate={{ x: [0, -4, 0], y: [0, -6, 0], opacity: 1 }}
      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'fixed', right: 20, bottom: 14, zIndex: 30, pointerEvents: 'none' }}
    >
      <motion.div
        key={stage}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{
          position: 'absolute',
          ...bubblePosition,
          width: 260,
          background: '#fff',
          border: `1px solid ${BRAND.line}`,
          borderRadius: 18,
          padding: '12px 14px',
          boxShadow: '0 14px 30px rgba(15,59,111,0.10)',
          color: BRAND.blueText,
          fontSize: 14,
          lineHeight: 1.45,
        }}
      >
        {stageBubble[stage] || 'Йдемо далі.'}
      </motion.div>

      <div style={{ filter: 'drop-shadow(0 16px 30px rgba(15,59,111,0.14))' }}>
        <svg width="170" height="188" viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg">
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

function LogoMark() {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="48" cy="48" r="43" stroke={BRAND.navy} strokeWidth="6" fill="white" />
        <path d="M18 31L48 20L78 31L48 42L18 31Z" fill={BRAND.navy} />
        <path d="M30 31V48C35 43.5 41.5 41.5 48 41.5C54.5 41.5 61 43.5 66 48V31" fill={BRAND.navy} />
        <path d="M77 31V54" stroke={BRAND.navy} strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="77" cy="57" r="3" fill={BRAND.navy} />
        <path d="M17 67C22 55 33 48.5 48 48.5C63 48.5 74 55 79 67" stroke={BRAND.navy} strokeWidth="5" strokeLinecap="round" />
      </svg>
      <div style={{ lineHeight: 1.02 }}>
        <div style={{ fontSize: 34, fontWeight: 800, color: '#000', letterSpacing: '0.01em' }}>MAX</div>
        <div style={{ fontSize: 30, fontWeight: 400, color: '#000' }}>Europe Study</div>
      </div>
    </div>
  )
}

function Shell({ children, stage = 'start' }) {
  return (
    <div style={{ minHeight: '100vh', width: '100%', background: `linear-gradient(180deg, ${BRAND.soft} 0%, ${BRAND.white} 54%, #f7fbff 100%)`, color: BRAND.text, position: 'relative', overflowX: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.18, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(15,59,111,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,59,111,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <Character stage={stage} />
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  )
}

function StartScreen({ onStart }) {
  return (
    <Shell stage="start">
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(360px, 0.85fr)', gap: 36, alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ marginBottom: 14 }}><LogoMark /></div>
            <h1 style={{ fontSize: 'clamp(34px, 5.2vw, 58px)', lineHeight: 1.08, margin: '20px 0 14px', fontWeight: 800, color: BRAND.navyDark, maxWidth: 760 }}>
              Кар’єрний компас
            </h1>
            <p style={{ fontSize: 21, lineHeight: 1.6, color: BRAND.blueText, margin: '0 0 24px', maxWidth: 760, textAlign: 'left' }}>
              Це коротка, жива діагностика для тих, хто не хоче вибирати навмання. Вона допоможе краще зрозуміти себе, побачити сильні сторони і напрями, які справді можуть підійти.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
              {['Свій кар’єрний код', 'Напрями з відсотками співпадіння', 'Анти-напрями без тиску', 'Сценарій «Майбутнє Я»'].map((item) => (
                <span key={item} style={{ borderRadius: 999, background: '#fff', padding: '10px 14px', fontSize: 14, border: `1px solid ${BRAND.line}`, color: BRAND.blueText }}>{item}</span>
              ))}
            </div>
            <button onClick={onStart} style={{ border: 'none', borderRadius: 18, padding: '16px 28px', color: '#fff', fontSize: 18, fontWeight: 700, cursor: 'pointer', background: 'linear-gradient(135deg, #0f3b6f, #1b5da0)', boxShadow: '0 16px 32px rgba(15,59,111,0.20)' }}>
              Почати
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} style={{ background: '#fff', border: `1px solid ${BRAND.line}`, borderRadius: 30, padding: 30, boxShadow: '0 18px 48px rgba(15,59,111,0.10)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -14, right: 18, borderRadius: 999, padding: '9px 14px', fontSize: 14, color: '#fff', background: BRAND.navy }}>
              8–11 клас
            </div>
            <div style={{ display: 'grid', gap: 14, lineHeight: 1.6, fontSize: 18, color: BRAND.text, textAlign: 'left' }}>
              <p style={{ margin: 0 }}>Для тебе, якщо не знаєш, ким хочеш бути.</p>
              <p style={{ margin: 0 }}>Для тебе, якщо в голові вже є кілька варіантів, але вибрати один складно.</p>
              <p style={{ margin: 0 }}>Для тебе, якщо не хочеш вибирати навмання і хочеш краще зрозуміти себе без тиску.</p>
            </div>
            <div style={{ marginTop: 20, borderRadius: 18, padding: 16, background: BRAND.soft }}>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: BRAND.blueText, textAlign: 'left' }}>
                Наприкінці ти побачиш свій кар’єрний код, напрями з відсотками співпадіння, напрями, де буде складніше, і сценарій твого «Майбутнього Я».
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Shell>
  )
}

function IntroScreen({ onNext }) {
  return (
    <Shell stage="intro">
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '40px 24px' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 1000, width: '100%', margin: '0 auto', background: '#0b1325', color: '#fff', borderRadius: 32, padding: '40px 42px', boxShadow: '0 22px 54px rgba(2, 6, 23, 0.35)', textAlign: 'left' }}>
          <h2 style={{ fontSize: 'clamp(34px, 5vw, 58px)', margin: '0 0 22px', lineHeight: 1.08 }}>Уяви, що це не тест</h2>
          <div style={{ display: 'grid', gap: 16, fontSize: 21, lineHeight: 1.65, color: '#d8e5f6', maxWidth: 820, marginBottom: 28 }}>
            <p style={{ margin: 0 }}>Це схоже на невелику гру про тебе самого або саму себе.</p>
            <p style={{ margin: 0 }}>Тут будуть різні ситуації зі шкільного життя. У них немає «правильно» чи «неправильно» — важливо тільки, як би вчинив(ла) саме ти.</p>
            <p style={{ margin: 0 }}>Твоє завдання — не вгадати красиву відповідь, а вибрати те, як ти насправді поводишся в житті.</p>
            <p style={{ margin: 0 }}>Тоді результат буде чесним і справді корисним.</p>
          </div>
          <button onClick={onNext} style={{ border: 'none', borderRadius: 18, padding: '16px 28px', background: '#fff', color: '#0b1325', fontSize: 18, fontWeight: 700, cursor: 'pointer' }}>
            Поїхали
          </button>
        </motion.div>
      </div>
    </Shell>
  )
}

function OnboardingScreen({ onSubmit }) {
  const [form, setForm] = useState({ grade: '', difficulty: '', priority: '' })
  const ready = form.grade && form.difficulty && form.priority

  return (
    <Shell stage="onboarding">
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '40px 24px' }}>
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 920, width: '100%', margin: '0 auto', background: '#fff', border: `1px solid ${BRAND.line}`, borderRadius: 32, padding: 32, boxShadow: '0 18px 48px rgba(15,59,111,0.10)' }}>
          <h2 style={{ fontSize: 42, margin: '0 0 10px', color: BRAND.navyDark }}>Налаштуємо компас під тебе</h2>
          <p style={{ color: BRAND.blueText, fontSize: 18, margin: '0 0 28px' }}>Кілька коротких запитань — і далі підемо в сам квест.</p>
          <div style={{ display: 'grid', gap: 30 }}>
            <QuestionBlock title="У якому ти класі?">
              <ChoiceGrid items={['8', '9', '10', '11', 'вже закінчив(ла)']} value={form.grade} onPick={(item) => setForm((s) => ({ ...s, grade: item }))} />
            </QuestionBlock>
            <QuestionBlock title="Що тебе найбільше бісить у виборі майбутнього?">
              <ChoiceStack items={['Я взагалі не розумію, ким бути', 'Є варіанти, але не можу вибрати', 'Боюся зробити неправильний вибір', 'Не розумію, в чому я сильний(а)', 'На мене тиснуть з вибором']} value={form.difficulty} onPick={(item) => setForm((s) => ({ ...s, difficulty: item }))} />
            </QuestionBlock>
            <QuestionBlock title="Якби можна було обрати ідеально, що для тебе важливо?">
              <ChoiceStack items={['Щоб було цікаво', 'Щоб приносило гроші', 'Щоб було стабільно', 'Щоб була свобода', 'Щоб можна було жити/вчитись за кордоном', 'Щоб це мало сенс']} value={form.priority} onPick={(item) => setForm((s) => ({ ...s, priority: item }))} />
            </QuestionBlock>
          </div>
          <button disabled={!ready} onClick={() => onSubmit(form)} style={{ marginTop: 28, border: 'none', borderRadius: 18, padding: '16px 28px', fontSize: 18, fontWeight: 700, color: '#fff', cursor: ready ? 'pointer' : 'not-allowed', background: ready ? 'linear-gradient(135deg, #0f3b6f, #1b5da0)' : '#cbd5e1' }}>
            Далі
          </button>
        </motion.div>
      </div>
    </Shell>
  )
}

function QuestionBlock({ title, children }) {
  return (
    <div>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: BRAND.navyDark }}>{title}</div>
      {children}
    </div>
  )
}

function ChoiceGrid({ items, value, onPick }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 10 }}>
      {items.map((item) => <SelectButton key={item} active={value === item} onClick={() => onPick(item)}>{item}</SelectButton>)}
    </div>
  )
}

function ChoiceStack({ items, value, onPick }) {
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {items.map((item) => <SelectButton key={item} active={value === item} onClick={() => onPick(item)}>{item}</SelectButton>)}
    </div>
  )
}

function SelectButton({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{ border: `1px solid ${BRAND.line}`, borderRadius: 18, padding: '16px 18px', cursor: 'pointer', fontSize: 16, lineHeight: 1.45, transition: 'all 0.2s ease', background: active ? BRAND.navy : '#fff', color: active ? '#fff' : BRAND.text, textAlign: 'left' }}>
      {children}
    </button>
  )
}

function Progress({ current, total }) {
  const percent = Math.round((current / total) * 100)
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: BRAND.blueText, marginBottom: 8 }}>
        <span>Твоя подорож</span>
        <span>{current}/{total}</span>
      </div>
      <div style={{ height: 12, width: '100%', borderRadius: 999, background: '#dfe9f3', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${percent}%` }} transition={{ duration: 0.35 }} style={{ height: '100%', borderRadius: 999, background: BRAND.navy }} />
      </div>
    </div>
  )
}

function SceneScreen({ scene, index, total, onAnswer }) {
  return (
    <Shell stage="scenes">
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '36px 24px' }}>
        <div style={{ width: '100%', maxWidth: 1120, margin: '0 auto' }}>
          <Progress current={index + 1} total={total} />
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#fff', border: `1px solid ${BRAND.line}`, borderRadius: 32, boxShadow: '0 18px 48px rgba(15,59,111,0.10)', marginTop: 22, padding: 34, textAlign: 'left' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1.18, margin: '0 0 14px', color: BRAND.navyDark, textAlign: 'left' }}>
              {scene.text}
            </h2>
            <p style={{ fontSize: 16, margin: '0 0 24px', color: BRAND.blueText, lineHeight: 1.55, textAlign: 'left' }}>
              Обирай не ту відповідь, яка звучить правильно, а ту, яка реально найбільше схожа на тебе.
            </p>
            <div style={{ display: 'grid', gap: 12 }}>
              {scene.options.map((option, i) => (
                <motion.button key={option.text} onClick={() => onAnswer(option)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} style={{ border: `1px solid ${BRAND.line}`, borderRadius: 20, padding: '18px 20px', textAlign: 'left', background: '#fff', color: BRAND.text, fontSize: 18, cursor: 'pointer' }}>
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
  useEffect(() => {
    const timer = setTimeout(onDone, 1800)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <Shell stage="analysis">
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '40px 24px' }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 900, margin: '0 auto', width: '100%', background: '#0b1325', color: '#fff', borderRadius: 32, padding: '40px 42px', textAlign: 'left', boxShadow: '0 22px 54px rgba(2, 6, 23, 0.35)' }}>
          <h2 style={{ fontSize: 'clamp(34px, 5vw, 58px)', margin: '0 0 20px', lineHeight: 1.08 }}>
            Твій компас уже показує напрямок
          </h2>
          <p style={{ fontSize: 20, color: '#d8e5f6', lineHeight: 1.6, margin: '0 0 28px', maxWidth: 700 }}>
            Зараз ми не просто рахуємо бали. Ми збираємо твої патерни поведінки.
          </p>
          <div style={{ height: 10, width: '100%', maxWidth: 560, borderRadius: 999, background: '#1e293b', overflow: 'hidden' }}>
            <motion.div initial={{ width: '5%' }} animate={{ width: '76%' }} transition={{ duration: 1.6 }} style={{ height: '100%', borderRadius: 999, background: '#fff' }} />
          </div>
        </motion.div>
      </div>
    </Shell>
  )
}

function ScoreBox({ label, value }) {
  return (
    <div style={{ borderRadius: 18, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', border: `1px solid ${BRAND.line}`, background: BRAND.soft, color: BRAND.text }}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function InfoCard({ title, children }) {
  return (
    <section style={{ background: '#fff', border: `1px solid ${BRAND.line}`, borderRadius: 30, padding: 28, boxShadow: '0 14px 36px rgba(15,59,111,0.08)' }}>
      <h2 style={{ fontSize: 30, margin: '0 0 18px', color: BRAND.navyDark, lineHeight: 1.15 }}>{title}</h2>
      {children}
    </section>
  )
}

function Pill({ children, tone = 'default' }) {
  const styles = {
    default: { background: BRAND.soft, border: BRAND.line },
    bad: { background: BRAND.softRed, border: '#f2caca' },
    good: { background: BRAND.softGreen, border: '#c8e7d0' },
  }
  return (
    <span style={{ borderRadius: 999, padding: '10px 14px', fontSize: 15, border: `1px solid ${styles[tone].border}`, background: styles[tone].background, color: BRAND.text }}>
      {children}
    </span>
  )
}

function groupSpecialties(items) {
  const groups = [
    ['маркетинг', 'digital marketing', 'комунікації', 'медіа', 'журналістика'],
    ['менеджмент', 'бізнес-адміністрування', 'міжнародний бізнес', 'підприємництво', 'продажі', 'HR', 'логістика'],
    ['комп’ютерні науки', 'програмна інженерія', 'software development', 'data science', 'штучний інтелект', 'кібербезпека', 'web development', 'game development', 'cloud systems', 'computer engineering', 'business informatics', 'UX/UI', 'human-computer interaction'],
    ['медицина', 'стоматологія', 'фармація', 'медсестринство', 'фізична терапія', 'реабілітація', 'громадське здоров’я', 'лабораторна діагностика', 'біомедицина', 'харчування і дієтологія', 'психологія', 'психотерапія', 'соціальна робота', 'ерготерапія', 'акушерство'],
    ['машинобудування', 'електротехніка', 'електроніка', 'робототехніка', 'мехатроніка', 'автоматизація', 'цивільне будівництво', 'архітектура', 'промисловий дизайн', 'матеріалознавство', 'енергетика', 'хімічна інженерія', 'транспортні технології', 'авіаційна інженерія', 'автомобільна інженерія', 'виробничі системи'],
    ['дошкільна освіта', 'початкова освіта', 'середня освіта', 'предметне викладання', 'спеціальна освіта', 'освітній менеджмент', 'педагогіка', 'андрагогіка', 'освітні технології'],
    ['дизайн', 'мода', 'графіка', 'архітектура інтер’єру', 'образотворче мистецтво', 'музика', 'сценічне мистецтво'],
    ['право', 'міжнародне право', 'податкове право', 'комплаєнс', 'державне управління', 'публічна адміністрація', 'безпекові студії', 'митна справа', 'поліцейська справа'],
  ]

  const mapped = groups.map((group) => {
    const matched = items.filter((item) => group.includes(item.title))
    if (!matched.length) return null
    const avg = Math.round(matched.reduce((sum, item) => sum + item.percent, 0) / matched.length)
    return {
      label: matched.slice(0, 3).map((m) => m.title).join(' / '),
      percent: avg,
    }
  }).filter(Boolean)

  return mapped.sort((a, b) => b.percent - a.percent)
}

function SpecialityBlock({ ranked }) {
  const grouped = groupSpecialties(ranked)
  const top = grouped.slice(0, 5)
  const anti = grouped.slice(-5).reverse()
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 28 }}>
      <InfoCard title="Які напрями тобі підходять найбільше">
        <div style={{ display: 'grid', gap: 12 }}>
          {top.map((item, index) => (
            <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '32px minmax(0,1fr) auto', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 18, border: `1px solid ${BRAND.line}`, background: index < 3 ? BRAND.softGreen : '#fff' }}>
              <div style={{ width: 32, height: 32, borderRadius: 999, background: '#fff', border: `1px solid ${BRAND.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: BRAND.navy, fontWeight: 700 }}>{index + 1}</div>
              <span style={{ color: BRAND.text, fontSize: 17, lineHeight: 1.35 }}>{item.label}</span>
              <strong style={{ color: BRAND.navy, fontSize: 18 }}>{item.percent}%</strong>
            </div>
          ))}
        </div>
      </InfoCard>

      <InfoCard title="Напрями, де тобі буде складніше">
        <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
          {anti.map((item) => (
            <div key={item.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', alignItems: 'center', gap: 16, padding: '14px 16px', borderRadius: 18, border: '1px solid #f2caca', background: BRAND.softRed }}>
              <span style={{ color: BRAND.text, fontSize: 17, lineHeight: 1.35 }}>{item.label}</span>
              <strong style={{ color: '#a94442', fontSize: 18 }}>{item.percent}%</strong>
            </div>
          ))}
        </div>
        <p style={{ margin: 0, color: BRAND.blueText, lineHeight: 1.7, fontSize: 17, textAlign: 'left' }}>{DISCLAIMER}</p>
      </InfoCard>
    </div>
  )
}

function ResultScreen({ profileCode, scores, profile, ranked, onRestart }) {
  return (
    <Shell stage="result">
      <div style={{ padding: '36px 24px 70px' }}>
        <div style={{ width: '100%', maxWidth: 1180, margin: '0 auto', display: 'grid', gap: 24 }}>
          <section style={{ background: '#fff', border: `1px solid ${BRAND.line}`, borderRadius: 32, padding: 30, boxShadow: '0 18px 48px rgba(15,59,111,0.10)' }}>
            <h1 style={{ fontSize: 'clamp(34px, 5vw, 60px)', margin: '0 0 14px', lineHeight: 1.08, color: BRAND.navyDark }}>
              Твій кар’єрний код — {profileCode}
            </h1>
            <p style={{ fontSize: 18, color: BRAND.blueText, lineHeight: 1.6, margin: '0 0 10px', textAlign: 'left' }}>
              Це не ярлик і не вирок. Це твій поточний патерн: як ти думаєш, дієш і в якому середовищі розкриваєшся сильніше.
            </p>
            <p style={{ fontSize: 21, color: BRAND.text, lineHeight: 1.6, margin: '0 0 22px', textAlign: 'left', fontWeight: 600 }}>{profile.label}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 12 }}>
              {TYPES.map((type) => <ScoreBox key={type} label={type} value={scores[type]} />)}
            </div>
          </section>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 24 }}>
            <InfoCard title="Хто ти">
              <p style={{ margin: 0, color: BRAND.text, lineHeight: 1.7, fontSize: 18, textAlign: 'left' }}>{profile.who}</p>
            </InfoCard>
            <InfoCard title="Де ти сильний(а)">
              <ul style={{ margin: 0, paddingLeft: 22, color: BRAND.text, lineHeight: 1.9, fontSize: 18, textAlign: 'left' }}>
                {profile.strengths.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </InfoCard>
          </div>

          <SpecialityBlock ranked={ranked} />

          <section style={{ borderRadius: 30, padding: 28, color: '#fff', background: 'linear-gradient(135deg, #0b2c54, #0f3b6f)', boxShadow: '0 18px 48px rgba(15,59,111,0.20)' }}>
            <h2 style={{ fontSize: 30, margin: '0 0 16px' }}>Сценарій «Майбутнє Я»</h2>
            <p style={{ margin: 0, color: '#eaf2fb', lineHeight: 1.85, fontSize: 19, textAlign: 'left' }}>{profile.future}</p>
          </section>

          <InfoCard title="Що можна зробити вже зараз">
            <p style={{ margin: '0 0 14px', color: BRAND.blueText, fontSize: 17, textAlign: 'left' }}>Ось кілька кроків, які допоможуть перевірити результат не тільки в теорії, а й у реальному житті.</p>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ padding: '14px 16px', borderRadius: 18, border: `1px solid ${BRAND.line}`, background: BRAND.soft }}>
                <strong style={{ display: 'block', marginBottom: 6, color: BRAND.navyDark }}>1. Подивись на реальних людей</strong>
                <span style={{ color: BRAND.text, lineHeight: 1.6 }}>Знайди 2–3 блоги, відео або інтерв’ю людей із напрямів, які потрапили в твій топ.</span>
              </div>
              <div style={{ padding: '14px 16px', borderRadius: 18, border: `1px solid ${BRAND.line}`, background: '#fff' }}>
                <strong style={{ display: 'block', marginBottom: 6, color: BRAND.navyDark }}>2. Спробуй маленьку практику</strong>
                <span style={{ color: BRAND.text, lineHeight: 1.6 }}>Зроби одне маленьке завдання зі спеціальності, яка тебе зачепила найбільше.</span>
              </div>
              <div style={{ padding: '14px 16px', borderRadius: 18, border: `1px solid ${BRAND.line}`, background: '#fff' }}>
                <strong style={{ display: 'block', marginBottom: 6, color: BRAND.navyDark }}>3. Відслідкуй відчуття</strong>
                <span style={{ color: BRAND.text, lineHeight: 1.6 }}>Подумай чесно: що тебе реально захопило, а що швидко забрало енергію.</span>
              </div>
            </div>
          </InfoCard>

          <section style={{ textAlign: 'center', paddingTop: 8 }}>
            <button onClick={onRestart} style={{ border: 'none', borderRadius: 18, padding: '16px 26px', color: '#fff', fontSize: 18, fontWeight: 700, background: BRAND.navy, cursor: 'pointer' }}>
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
      {stage === 'start' && <StartScreen key="start" onStart={() => setStage('intro')} />}
      {stage === 'intro' && <IntroScreen key="intro" onNext={() => setStage('onboarding')} />}
      {stage === 'onboarding' && <OnboardingScreen key="onboarding" onSubmit={() => setStage('scenes')} />}
      {stage === 'scenes' && <SceneScreen key={`scene-${sceneIndex}`} scene={SCENES[sceneIndex]} index={sceneIndex} total={SCENES.length} onAnswer={handleAnswer} />}
      {stage === 'analysis' && <AnalysisScreen key="analysis" onDone={() => setStage('result')} />}
      {stage === 'result' && <ResultScreen key="result" profileCode={profileCode} scores={scores} profile={profile} ranked={ranked} onRestart={restart} />}
    </AnimatePresence>
  )
}

