// The manual. Each situation reads top to bottom in the order you act:
// first the steps for right now, then who to call, then what to do after.
//
// `call` names roles from contacts.js. `when` limits a line to renters or
// owners; a line without it applies to everyone.
// `danger: true` puts the 911 banner at the top of the page.
// `sources` lists the pages the safety-critical steps were checked against
// (2026-11-13). A situation with no sources is ordinary practical advice.

const READY_POWER = {
  label: 'Ready.gov, power outages',
  url: 'https://www.ready.gov/power-outages',
};
const FOODSAFETY = {
  label: 'FoodSafety.gov, keeping food safe when the power goes out',
  url: 'https://www.foodsafety.gov/blog/poweroutage.html',
};

export const GROUPS = [
  { id: 'road', title: 'On the road' },
  { id: 'home', title: 'At home' },
  { id: 'health', title: 'Health' },
  { id: 'money', title: 'Money and phone' },
];

export const SITUATIONS = [
  // On the road
  {
    slug: 'car-crash',
    group: 'road',
    title: 'Car crash',
    keywords: 'accident collision hit wreck fender bender',
    danger: true,
    now: [
      'If anyone is hurt, call 911 first.',
      'Turn on your hazard lights.',
      'If the car can drive and nobody is hurt, move it out of traffic to the shoulder or a parking lot.',
      'If you cannot move it and getting out is not safe, stay in the car with your seatbelt on until help comes.',
    ],
    call: [
      {
        role: 'emergency',
        why: 'If anyone is hurt or the cars are blocking the road.',
      },
      { role: 'car-insurer', why: 'Today, even if it was not your fault.' },
      { role: 'roadside', why: 'If the car needs a tow.' },
      { role: 'family', why: 'So you are not doing this alone.' },
    ],
    after: [
      'Ask the police for a report number.',
      "Swap with the other driver: name, phone, insurance company and policy number, license plate. Take a photo of their insurance card and driver's license.",
      'Photograph both cars, the plates, the damage and the road.',
      'Get the names and phone numbers of anyone who saw it.',
      'Stick to facts with the other driver. The insurance companies decide who was at fault.',
      'See a doctor if anything hurts, even a day or two later.',
    ],
    sources: [
      {
        label: 'Progressive, what to do after a car accident',
        url: 'https://www.progressive.com/answers/what-to-do-after-car-accident/',
      },
    ],
  },
  {
    slug: 'battery-dead',
    group: 'road',
    title: 'Car battery died',
    keywords: 'jump start wont start clicking dead battery',
    now: [
      'Signs: the engine clicks or does nothing, and the dash lights are dim or off.',
      'Easiest: call roadside help. A jump start is usually included.',
      'With jumper cables and a second car, connect in this order:',
    ],
    steps: {
      title: 'Jump-start order',
      items: [
        'Both cars off.',
        'Red clamp on the dead battery’s + post.',
        'Other red clamp on the good battery’s + post.',
        'Black clamp on the good battery’s − post.',
        'Last black clamp on bare, unpainted metal on the dead car’s engine, away from the battery.',
        'Start the good car, let it run a few minutes, then start yours.',
        'Take the clamps off in the reverse order.',
      ],
    },
    call: [
      { role: 'roadside', why: 'For a jump start.' },
      { role: 'family', why: 'If you need someone to bring a car and cables.' },
    ],
    after: [
      'Drive the car for a while so the battery recharges.',
      'If it dies again within a few days, have the battery and alternator tested. Many auto-parts stores test batteries for free.',
    ],
    sources: [
      {
        label: 'Midtronics, the right way to jump-start a battery',
        url: 'https://www.midtronics.com/blog/whats-the-right-way-to-jump-start-a-battery/',
      },
    ],
  },
  {
    slug: 'flat-tire',
    group: 'road',
    title: 'Flat tire',
    keywords: 'tyre puncture blowout spare',
    now: [
      'Hold the wheel steady and ease off the gas. Do not brake hard.',
      'Pull fully off the road, somewhere flat, and turn on your hazard lights.',
      'Call roadside help to change it. Changing a tire next to traffic is the dangerous part.',
    ],
    call: [
      { role: 'roadside', why: 'To change the tire or tow the car.' },
      { role: 'mechanic', why: 'To repair or replace the tire afterward.' },
    ],
    after: [
      'A small spare ("donut") is for short, slow trips. The speed limit for it is printed on its side.',
      'Get the flat repaired or replaced soon.',
    ],
  },
  {
    slug: 'locked-out-car',
    group: 'road',
    title: 'Keys locked in the car',
    keywords: 'locked out lost keys',
    now: [
      'If a child or a pet is inside, call 911 now.',
      'Otherwise, check whether your car’s app can unlock it.',
    ],
    call: [
      { role: 'emergency', why: 'Only if a child or pet is locked inside.' },
      { role: 'roadside', why: 'Lockouts are usually covered.' },
      { role: 'spare-key', why: 'If someone has your spare.' },
      { role: 'locksmith', why: 'If roadside help cannot come.' },
    ],
    after: ['Give a spare key to someone you trust.'],
  },
  {
    slug: 'warning-light',
    group: 'road',
    title: 'Warning light on the dashboard',
    keywords: 'check engine oil temperature dash light',
    now: [
      'A red light (oil pressure, engine temperature, brakes) means stop somewhere safe soon and turn the engine off.',
      'A flashing check-engine light means pull over and do not keep driving.',
      'A steady check-engine light means book the mechanic soon. The car can usually be driven gently.',
      'The owner’s manual has a page that names every light.',
    ],
    call: [
      {
        role: 'roadside',
        why: 'If you had to stop and the car should not be driven.',
      },
      { role: 'mechanic', why: 'To read the code and fix it.' },
    ],
    after: [],
  },

  // At home
  {
    slug: 'fridge-stopped',
    group: 'home',
    title: 'Fridge stopped working',
    keywords: 'refrigerator freezer warm not cold appliance food',
    now: [
      'Keep the doors shut.',
      'Check it is plugged in, and plug a lamp into the same outlet to see if the outlet works.',
      'Check the breaker box for a switch that has flipped. Flip it fully off, then on.',
      'Check the temperature dial inside was not turned off by accident.',
    ],
    steps: {
      title: 'How long food stays safe with the doors shut',
      items: [
        'Fridge: about 4 hours.',
        'Full freezer: about 48 hours. Half full: about 24 hours.',
        'Throw out fridge food (meat, fish, eggs, milk, leftovers) that has been above 40°F for more than 2 hours.',
        'Do not taste food to check it. When in doubt, throw it out.',
      ],
    },
    call: [
      {
        role: 'landlord',
        when: 'rent',
        why: 'If the fridge came with the place, it is theirs to fix.',
      },
      {
        role: 'appliance',
        when: 'own',
        why: 'For a repair visit, or the home warranty company.',
      },
      {
        role: 'home-insurer',
        why: 'Ask whether your policy covers spoiled food.',
      },
    ],
    after: ['Put a cheap fridge thermometer inside so next time you can tell.'],
    sources: [READY_POWER, FOODSAFETY],
  },
  {
    slug: 'power-out',
    group: 'home',
    title: 'Power is out',
    keywords: 'electricity blackout outage lights',
    now: [
      'Look outside. If the neighbors are dark too, it is the area, not you.',
      'If only your place is out, check the breaker box.',
      'Keep the fridge and freezer shut.',
      'Use a flashlight, not candles.',
      'Never run a generator, grill or camp stove indoors or in a garage. They give off carbon monoxide.',
    ],
    call: [
      {
        role: 'power-company',
        why: 'To report the outage and get a time estimate.',
      },
      {
        role: 'landlord',
        when: 'rent',
        why: 'If only your unit is out and the breakers look fine.',
      },
      {
        role: 'electrician',
        when: 'own',
        why: 'If only your home is out and the breakers look fine.',
      },
    ],
    after: [
      'Unplug computers and TVs so a power surge cannot damage them when it comes back.',
      'Check the food times on the "Fridge stopped working" page.',
    ],
    sources: [READY_POWER, FOODSAFETY],
  },
  {
    slug: 'water-leak',
    group: 'home',
    title: 'Water leak or burst pipe',
    keywords: 'flood leaking pipe water ceiling drip',
    now: [
      'Turn off the water. For one sink or toilet, turn the small valve under it clockwise. For anything bigger, turn off the main shut-off for the home.',
      'If water is near outlets or the electrical panel, stay out of the water.',
      'Take photos and video before you clean up.',
      'Move belongings out of the way.',
    ],
    call: [
      {
        role: 'landlord',
        when: 'rent',
        why: 'Right away, even at night. Use the emergency maintenance line.',
      },
      { role: 'plumber', when: 'own', why: 'To find and fix the leak.' },
      { role: 'home-insurer', why: 'To start a claim for the damage.' },
    ],
    after: [
      'Find out where your main water shut-off is now, before there is a leak, and write it under "Where things are" on My people.',
    ],
  },
  {
    slug: 'toilet-overflow',
    group: 'home',
    title: 'Toilet overflowing',
    keywords: 'clogged toilet flood bathroom',
    now: [
      'Lift the tank lid and push the rubber flap at the bottom down. That stops more water coming in.',
      'Turn the valve on the wall behind the toilet clockwise to shut it off.',
      'Wait for the bowl to drain a bit, then use a plunger.',
    ],
    call: [
      {
        role: 'landlord',
        when: 'rent',
        why: 'If it will not clear or keeps happening.',
      },
      {
        role: 'plumber',
        when: 'own',
        why: 'If it will not clear or keeps happening.',
      },
    ],
    after: [],
  },
  {
    slug: 'gas-smell',
    group: 'home',
    title: 'Smell gas',
    keywords: 'rotten eggs sulfur gas leak stove',
    danger: true,
    now: [
      'Leave now. Get everyone out, and pets if you can do it quickly.',
      'Do not turn any light switch on or off, do not light anything, and do not use your phone until you are outside and well away.',
      'Leave the door open behind you.',
      'Once you are well away, call 911.',
    ],
    call: [
      { role: 'emergency', why: 'From outside, well away from the building.' },
      { role: 'gas-company', why: 'Their emergency line, after 911.' },
      { role: 'landlord', when: 'rent', why: 'Once you are safe.' },
    ],
    after: [
      'Do not go back in until the fire department or gas company says it is safe.',
    ],
    sources: [
      {
        label:
          'PHMSA (US Department of Transportation), what to do if you suspect a gas leak',
        url: 'http://primis.phmsa.dot.gov/stakeholder-comms/emergencyresponse/',
      },
    ],
  },
  {
    slug: 'co-alarm',
    group: 'home',
    title: 'Carbon monoxide alarm going off',
    keywords: 'co detector beeping alarm headache dizzy',
    danger: true,
    now: [
      'Get everyone outside into fresh air now. Do not look for the cause.',
      'Call 911 from outside.',
      'Count everyone outside.',
      'Do not go back in until the responders say it is safe.',
    ],
    call: [
      { role: 'emergency', why: 'From outside.' },
      { role: 'landlord', when: 'rent', why: 'Once you are safe.' },
      {
        role: 'hvac',
        when: 'own',
        why: 'To check the furnace, water heater and other fuel-burning things.',
      },
    ],
    after: [
      'Carbon monoxide has no smell. Headache, dizziness and nausea are the early signs.',
      'If the alarm goes off again within a day, do the same again and have every fuel-burning appliance inspected.',
      'A short chirp every minute or so usually means a low battery, not carbon monoxide.',
    ],
    sources: [
      {
        label:
          'US Consumer Product Safety Commission, carbon monoxide fact sheet',
        url: 'https://www.cpsc.gov/safety-education/safety-guides/carbon-monoxide/carbon-monoxide-fact-sheet',
      },
    ],
  },
  {
    slug: 'fire',
    group: 'home',
    title: 'Fire or smoke alarm',
    keywords: 'smoke burning kitchen fire alarm',
    danger: true,
    now: [
      'Get out, stay out, and call 911 from outside.',
      'Stay low under smoke. Feel a door before you open it; if it is hot, use another way out.',
      'If your clothes catch fire: stop, drop and roll.',
      'A small pan fire on the stove: turn off the burner and slide a lid over the pan. Never put water on a grease fire.',
    ],
    call: [
      {
        role: 'emergency',
        why: 'From outside. Tell them about any pets still inside.',
      },
      { role: 'family', why: 'Once you are safe.' },
      { role: 'home-insurer', why: 'Once the fire is out.' },
    ],
    after: [
      'If you are trapped: close the door, block the gap under it with cloth, and signal from a window.',
    ],
    sources: [
      {
        label: 'NFPA, smoke alarms',
        url: 'https://www.nfpa.org/education-and-research/home-fire-safety/smoke-alarms',
      },
      {
        label: 'Ready.gov, home fires',
        url: 'https://www.ready.gov/home-fires',
      },
    ],
  },
  {
    slug: 'no-heat',
    group: 'home',
    title: 'No heat or no air conditioning',
    keywords: 'furnace boiler heater ac air conditioner cold hot thermostat',
    now: [
      'Check the thermostat: right mode (heat or cool), set past the room temperature, fresh batteries.',
      'Check the breaker box for a flipped switch.',
      'Check the furnace filter. A clogged one can shut the system down.',
      'Never heat your home with the oven or stove.',
    ],
    call: [
      {
        role: 'landlord',
        when: 'rent',
        why: 'Many places require landlords to provide heat. Use the emergency line in winter.',
      },
      { role: 'hvac', when: 'own', why: 'For a service visit.' },
    ],
    after: [],
  },
  {
    slug: 'locked-out-home',
    group: 'home',
    title: 'Locked out of home',
    keywords: 'lost keys door locked out',
    now: ['Check every door and window you can reach safely from the ground.'],
    call: [
      { role: 'spare-key', why: 'If someone has your spare.' },
      { role: 'landlord', when: 'rent', why: 'They usually have a key.' },
      {
        role: 'locksmith',
        why: 'Ask for the total price on the phone before they come.',
      },
    ],
    after: [
      'Give a spare key to someone you trust, and put their name on My people.',
    ],
  },

  // Health
  {
    slug: 'someone-hurt',
    group: 'health',
    title: 'Someone is hurt or very sick',
    keywords:
      'injury emergency ambulance urgent care er chest pain stroke bleeding',
    danger: true,
    now: [
      'Call 911 for: trouble breathing, chest pain, signs of a stroke (face drooping, an arm weak, slurred speech), heavy bleeding that will not stop, passing out, or a seizure.',
      'For anything that can wait a few hours (a sprain, a small cut, a fever), go to urgent care or call the doctor.',
    ],
    call: [
      { role: 'emergency', why: 'For anything on the list above.' },
      { role: 'urgent-care', why: 'For things that can wait a few hours.' },
      { role: 'doctor', why: 'For advice, or to follow up.' },
      { role: 'family', why: 'So someone knows.' },
    ],
    after: [],
  },
  {
    slug: 'poison',
    group: 'health',
    title: 'Swallowed something, or a chemical splash',
    keywords: 'poison overdose pills cleaning product child pet ate',
    danger: true,
    now: [
      'If the person is not breathing, will not wake up, or is having a seizure, call 911.',
      'Otherwise call Poison Control at 1-800-222-1222. It is free and open all the time.',
      'Have the bottle or package in your hand when you call.',
    ],
    call: [
      {
        role: 'emergency',
        why: 'If they are not breathing, will not wake, or are seizing.',
      },
      { role: 'poison', why: 'For everything else, people and pets.' },
      { role: 'vet', why: 'If it was a pet.' },
    ],
    after: [],
    sources: [
      {
        label: "America's Poison Centers, Poison Help",
        url: 'https://poisoncenters.org/poison-help',
      },
    ],
  },
  {
    slug: 'crisis',
    group: 'health',
    title: 'Thoughts of ending your life',
    keywords: 'suicide crisis hopeless self harm panic',
    danger: true,
    now: [
      'Call or text 988. It is free, confidential, and answered at any hour.',
      'If you are in danger right now, call 911.',
      'Tell someone you trust that you are not okay.',
    ],
    call: [
      { role: 'crisis', why: 'Call or text, any hour.' },
      { role: 'family', why: 'You are not a burden.' },
      { role: 'emergency', why: 'If you are in danger now.' },
    ],
    after: [],
    sources: [
      {
        label: '988 Suicide & Crisis Lifeline',
        url: 'https://988lifeline.org/',
      },
    ],
  },

  // Money and phone
  {
    slug: 'lost-wallet',
    group: 'money',
    title: 'Lost wallet or cards',
    keywords: 'stolen purse credit card debit card license id',
    now: [
      'Lock or freeze each card in your bank’s app.',
      'Call the number on the bank’s website to report them lost.',
    ],
    call: [{ role: 'bank', why: 'To cancel and replace the cards.' }],
    after: [
      "Replace your driver's license through your state's DMV website.",
      'If your ID was taken, consider freezing your credit with Equifax, Experian and TransUnion. It is free.',
      'Watch your bank statements for charges you did not make.',
    ],
  },
  {
    slug: 'lost-phone',
    group: 'money',
    title: 'Lost or stolen phone',
    keywords: 'missing iphone android find my',
    now: [
      'From another phone or computer, open Find My (icloud.com/find) for an iPhone or Find My Device (google.com/android/find) for an Android.',
      'Mark it as lost there. That locks it and shows a message with a number to call.',
    ],
    call: [
      { role: 'phone-carrier', why: 'To suspend the line if it is stolen.' },
    ],
    after: ['Change the passwords for your email and bank.'],
  },
  {
    slug: 'scam-call',
    group: 'money',
    title: 'Someone says you owe money, right now',
    keywords: 'scam fraud irs gift cards urgent call text',
    now: [
      'Hang up or stop replying. Pressure to pay right now is the warning sign.',
      'Government offices and real companies do not ask for gift cards, wire transfers or crypto.',
      'If you are worried it might be real, call the number printed on your card or on the official website.',
    ],
    call: [
      { role: 'family', why: 'Talk it over before you pay anyone.' },
      { role: 'bank', why: 'If you already paid or gave card details.' },
    ],
    after: ['Report it at reportfraud.ftc.gov.'],
  },
];

export const bySlug = Object.fromEntries(SITUATIONS.map((s) => [s.slug, s]));
