import React, { useState, useEffect } from 'react';

const initialForm = {
  age: '',
  gender: 'female',
  height: '',
  weight: '',
  activity: 'none',
  goal: 'lose',
};

const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium text-indigo-900">
    {children}
  </label>
);

const Input = (props) => (
  <input
    {...props}
    className={`w-full rounded-xl border border-indigo-200 bg-white px-3 py-2 text-indigo-900 placeholder-indigo-400 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 ${props.className || ''}`}
  />
);

const Select = (props) => (
  <select
    {...props}
    className={`w-full rounded-xl border border-indigo-200 bg-white px-3 py-2 text-indigo-900 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 ${props.className || ''}`}
  />
);

const Questionnaire = ({ onPlanReady }) => {
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem('fitlife_form');
    return saved ? JSON.parse(saved) : initialForm;
  });

  useEffect(() => {
    localStorage.setItem('fitlife_form', JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const calcCalories = () => {
    const height = parseFloat(form.height);
    const weight = parseFloat(form.weight);
    const age = parseFloat(form.age);
    if (!height || !weight || !age) return 2000;
    // Mifflin-St Jeor estimate
    const s = form.gender === 'male' ? 5 : -161;
    const bmr = 10 * weight + 6.25 * height - 5 * age + s;
    const activityFactor = {
      none: 1.2,
      beginner: 1.4,
      gym: 1.6,
    }[form.activity] || 1.2;
    let tdee = bmr * activityFactor;
    if (form.goal === 'lose') tdee -= 300;
    if (form.goal === 'gain') tdee += 300;
    return Math.round(Math.max(1200, tdee));
  };

  const generatePlan = () => {
    const calories = calcCalories();
    const activity = form.activity;

    const baseTips = [
      'Fill half your plate with vegetables.',
      'Use extra-virgin olive oil as your main fat.',
      'Include legumes 3x per week.',
      'Prioritize whole grains and seasonal fruit.',
      'Hydrate with water and unsweetened tea.',
    ];

    const style = {
      none: {
        focus: 'light, balanced meals and gentle portions',
        protein: 0.9,
        carbs: 0.5,
      },
      beginner: {
        focus: 'steady, energetic meals to build consistency',
        protein: 1.1,
        carbs: 0.55,
      },
      gym: {
        focus: 'protein-rich, recovery-focused nutrition',
        protein: 1.4,
        carbs: 0.6,
      },
    }[activity];

    const protein = Math.round((style.protein * parseFloat(form.weight || 60)));
    const carbs = Math.round((style.carbs * calories) / 4);
    const fats = Math.round(((calories - protein * 4 - carbs * 4) / 9));

    const meals = [
      {
        name: 'Breakfast',
        items: [
          'Greek yogurt with honey, walnuts, and berries',
          'Whole-grain toast with avocado and cherry tomatoes',
          'Green tea or water',
        ],
      },
      {
        name: 'Lunch',
        items: [
          'Quinoa salad with chickpeas, cucumber, olives, and feta',
          'Drizzle of olive oil and lemon',
          'Sparkling water with lime',
        ],
      },
      {
        name: 'Dinner',
        items: [
          'Grilled salmon or tofu with roasted vegetables',
          'Brown rice or whole-grain pasta',
          'Side salad with olive oil',
        ],
      },
      {
        name: 'Snacks',
        items: [
          'Apple with almond butter',
          'Carrot sticks with hummus',
          'A small handful of nuts',
        ],
      },
    ];

    const plan = {
      calories,
      macros: { protein, carbs, fats },
      focus: style.focus,
      meals,
      tips: baseTips,
      form,
    };

    localStorage.setItem('fitlife_plan', JSON.stringify(plan));
    onPlanReady(plan);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    generatePlan();
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-white to-indigo-50 py-14 text-indigo-900" id="questionnaire">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <h2 className="text-3xl font-bold md:text-4xl">Personalized Questionnaire</h2>
        <p className="mt-2 text-indigo-900/70">
          Tell us about you — we’ll tailor a Mediterranean-inspired plan that matches your goals and activity.
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-6 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5 md:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input id="age" name="age" type="number" min="10" max="100" placeholder="28" value={form.age} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select id="gender" name="gender" value={form.gender} onChange={handleChange}>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" name="height" type="number" placeholder="170" value={form.height} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" name="weight" type="number" placeholder="68" value={form.weight} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="activity">Activity level</Label>
              <Select id="activity" name="activity" value={form.activity} onChange={handleChange}>
                <option value="none">Sedentary</option>
                <option value="beginner">Beginner</option>
                <option value="gym">Gym-goer</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="goal">Goal</Label>
              <Select id="goal" name="goal" value={form.goal} onChange={handleChange}>
                <option value="lose">Lose weight</option>
                <option value="maintain">Maintain</option>
                <option value="gain">Gain muscle</option>
              </Select>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="text-sm text-indigo-900/70">
              Estimated calories: <span className="font-semibold text-indigo-900">{calcCalories()} kcal/day</span>
            </div>
            <button type="submit" className="rounded-xl bg-indigo-900 px-5 py-3 font-semibold text-white shadow-md shadow-indigo-900/20 transition-colors hover:bg-indigo-800">
              Generate My Plan
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Questionnaire;
