// The people and numbers the manual can point to. Fixed numbers are the same
// for everyone in the US and cannot be edited; the rest are filled in on the
// "My people" page and shared by both seats.

export const FIXED = {
  emergency: {
    label: 'Emergency',
    name: '911',
    phone: '911',
    hint: 'Police, fire, ambulance.',
  },
  poison: {
    label: 'Poison Control',
    name: 'Poison Help',
    phone: '1-800-222-1222',
    hint: 'Free, any hour, any poison question.',
  },
  crisis: {
    label: 'Crisis line',
    name: '988 Suicide & Crisis Lifeline',
    phone: '988',
    hint: 'Call or text, any hour.',
  },
};

// Grouped in the order they appear on the "My people" page.
export const ROLE_GROUPS = [
  {
    title: 'People',
    roles: [
      {
        role: 'family',
        label: 'Family, first call',
        hint: 'Who you ring first when something goes wrong.',
      },
      {
        role: 'spare-key',
        label: 'Spare key',
        hint: 'Who holds a spare key to your place or car.',
      },
    ],
  },
  {
    title: 'Car',
    roles: [
      {
        role: 'car-insurer',
        label: 'Car insurance claims',
        hint: 'The claims number, usually on the insurance card or app. Put the policy number in the note.',
      },
      {
        role: 'roadside',
        label: 'Roadside help',
        hint: 'Jump starts, tows, flat tires, lockouts. Often part of car insurance, AAA, or a credit card.',
      },
      { role: 'mechanic', label: 'Mechanic', hint: 'The garage you trust.' },
    ],
  },
  {
    title: 'Home',
    roles: [
      {
        role: 'landlord',
        label: 'Landlord or building',
        hint: 'If you rent. Include the after-hours or emergency maintenance number.',
      },
      {
        role: 'home-insurer',
        label: "Home or renter's insurance",
        hint: 'Claims number. Policy number in the note.',
      },
      {
        role: 'plumber',
        label: 'Plumber',
        hint: 'Leaks, clogs, water heater.',
      },
      { role: 'electrician', label: 'Electrician', hint: '' },
      {
        role: 'hvac',
        label: 'Heating and air',
        hint: 'Furnace, boiler, air conditioning.',
      },
      {
        role: 'appliance',
        label: 'Appliance repair',
        hint: 'Fridge, washer, dryer, oven. Or the home warranty company.',
      },
      {
        role: 'locksmith',
        label: 'Locksmith',
        hint: 'One you have looked up in advance, with a price you know.',
      },
      {
        role: 'power-company',
        label: 'Electric company',
        hint: 'The outage line.',
      },
      {
        role: 'gas-company',
        label: 'Gas company',
        hint: 'The gas-leak emergency line. Skip if the home has no gas.',
      },
      {
        role: 'house-spots',
        label: 'Where things are',
        hint: 'Use the note: where the breaker box, the main water shut-off and the gas shut-off are.',
        noteOnly: true,
      },
    ],
  },
  {
    title: 'Health',
    roles: [
      { role: 'doctor', label: 'Doctor', hint: 'Your primary care office.' },
      {
        role: 'urgent-care',
        label: 'Urgent care',
        hint: 'The nearest one, and its hours in the note.',
      },
      { role: 'pharmacy', label: 'Pharmacy', hint: '' },
      { role: 'vet', label: 'Vet', hint: 'If there is a pet.' },
    ],
  },
  {
    title: 'Money and phone',
    roles: [
      {
        role: 'bank',
        label: 'Bank or card fraud line',
        hint: 'The number on the back of your card.',
      },
      {
        role: 'phone-carrier',
        label: 'Phone company',
        hint: 'To suspend a lost phone.',
      },
    ],
  },
];

export const ROLES = Object.fromEntries(
  ROLE_GROUPS.flatMap((g) => g.roles).map((r) => [r.role, r]),
);

// Digits and a leading + only, for tel: links.
export const telHref = (phone) => `tel:${String(phone).replace(/[^\d+]/g, '')}`;
