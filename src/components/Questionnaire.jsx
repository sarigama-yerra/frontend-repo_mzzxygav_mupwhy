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
  <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium text-white">
    {children}
  </label>
);

const Input = (props) => (
  <input
    {...props}
    className={`w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 ${props.className || ''}`}
  />
);

const Select = (props) => (
  <select
    {...props}
    className={`w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 ${props.className || ''}`}
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
      'Riempi metà piatto con verdure.',
      'Usa olio extravergine di oliva come grasso principale.',
      'Includi legumi 3 volte a settimana.',
      'Preferisci cereali integrali e frutta di stagione.',
      "Idratati con acqua e tè non zuccherato.",
    ];

    const style = {
      none: {
        focus: 'pasti leggeri ed equilibrati con porzioni delicate',
        protein: 0.9,
        carbs: 0.5,
      },
      beginner: {
        focus: 'pasti costanti ed energetici per costruire abitudine',
        protein: 1.1,
        carbs: 0.55,
      },
      gym: {
        focus: 'alimentazione ricca di proteine e orientata al recupero',
        protein: 1.4,
        carbs: 0.6,
      },
    }[activity];

    const protein = Math.round((style.protein * parseFloat(form.weight || 60)));
    const carbs = Math.round((style.carbs * calories) / 4);
    const fats = Math.round(((calories - protein * 4 - carbs * 4) / 9));

    const meals = [
      {
        name: 'Colazione',
        items: [
          'Yogurt greco con miele, noci e frutti di bosco',
          'Pane integrale tostato con avocado e pomodorini',
          'Tè verde o acqua',
        ],
      },
      {
        name: 'Pranzo',
        items: [
          'Insalata di quinoa con ceci, cetrioli, olive e feta',
          'Condimento con olio EVO e limone',
          'Acqua frizzante con lime',
        ],
      },
      {
        name: 'Cena',
        items: [
          'Salmone o tofu alla griglia con verdure al forno',
          'Riso integrale o pasta integrale',
          'Insalata con olio EVO',
        ],
      },
      {
        name: 'Spuntini',
        items: [
          'Mela con crema di mandorle',
          'Bastoncini di carota con hummus',
          'Piccola manciata di frutta secca',
        ],
      },
    ];

    const reasoning = `Questo piano è costruito sulla Piramide Alimentare Mediterranea. La base include frutta, verdura, cereali integrali e acqua per garantire micronutrienti e fibra. Lo strato intermedio privilegia proteine magre e latticini con moderazione. In cima, dolci e grassi aggiunti sono occasionali. In base al tuo profilo (attività: ${activity}, obiettivo: ${form.goal}), abbiamo puntato su ${style.focus}. Le proteine sono impostate a circa ${protein} g/giorno per sostenere il mantenimento o la crescita muscolare; i carboidrati (${carbs} g/giorno) forniscono energia di qualità da cereali integrali e legumi; i grassi (${fats} g/giorno) provengono soprattutto da olio EVO e frutta secca.`;

    const plan = {
      calories,
      macros: { protein, carbs, fats },
      focus: style.focus,
      meals,
      tips: baseTips,
      reasoning,
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
    <section className="relative w-full bg-black py-14 text-white" id="questionnaire">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <h2 className="text-3xl font-bold md:text-4xl">Questionario personalizzato</h2>
        <p className="mt-2 text-white/70">
          Raccontaci di te: creeremo un piano ispirato alla dieta mediterranea in linea con i tuoi obiettivi.
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-6 rounded-2xl bg-white/5 p-6 shadow-lg ring-1 ring-white/10 md:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="age">Età</Label>
              <Input id="age" name="age" type="number" min="10" max="100" placeholder="28" value={form.age} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="gender">Genere</Label>
              <Select id="gender" name="gender" value={form.gender} onChange={handleChange}>
                <option value="female">Femmina</option>
                <option value="male">Maschio</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="height">Altezza (cm)</Label>
              <Input id="height" name="height" type="number" placeholder="170" value={form.height} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input id="weight" name="weight" type="number" placeholder="68" value={form.weight} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="activity">Livello di attività</Label>
              <Select id="activity" name="activity" value={form.activity} onChange={handleChange}>
                <option value="none">Sedentario</option>
                <option value="beginner">Principiante</option>
                <option value="gym">Palestra</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="goal">Obiettivo</Label>
              <Select id="goal" name="goal" value={form.goal} onChange={handleChange}>
                <option value="lose">Perdere peso</option>
                <option value="maintain">Mantenimento</option>
                <option value="gain">Massa muscolare</option>
              </Select>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="text-sm text-white/70">
              Calorie stimate: <span className="font-semibold text-white">{calcCalories()} kcal/giorno</span>
            </div>
            <button type="submit" className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-black shadow-md shadow-emerald-500/20 transition-colors hover:bg-emerald-400">
              Genera il mio piano
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Questionnaire;
