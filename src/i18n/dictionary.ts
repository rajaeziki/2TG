export type Lang = "en" | "fr" | "ar";
export const LANG_IDS: Lang[] = ["en", "fr", "ar"];
export const isLang = (v: string): v is Lang => (LANG_IDS as string[]).includes(v);
export const LANGS: { id: Lang; label: string }[] = [
  { id: "en", label: "EN" },
  { id: "fr", label: "FR" },
  { id: "ar", label: "عربي" },
];

const en = {
  nav: { services: "Services", quote: "Quote", gallery: "Gallery", faq: "FAQ" },
  call: "Call",
  seo: {
    title: "2TG Business Services | Cleaners, nannies, cooks & drivers in Agadir and Dar Bouazza",
    description:
      "Trusted home and business staff in Agadir and Dar Bouazza: cleaners, nannies, cooks and drivers, full-time or part-time. Get a quote on WhatsApp.",
  },
  hero: {
    kicker: "Staffing · Agadir & Dar Bouazza",
    title: "Trusted home & business staff,",
    accent: "matched fast.",
    sub: "Cleaners, nannies, cooks and drivers for households and companies. Choose full-time or part-time and get an indicative quote in under a minute.",
    cta: "Get a quote",
    wa: "Chat on WhatsApp",
    waMsg: "Hello 2TG, I would like to request staff.",
    drag: "Move your mouse or scroll to explore",
    chips: ["Agadir & Dar Bouazza", "Full-time or part-time", "Quote via WhatsApp"],
  },
  services: {
    title: "Our services",
    sub: "Every placement is available full-time or part-time.",
    items: {
      cleaner: { label: "Cleaners", blurb: "Home and office cleaning, one-off or recurring." },
      nanny: { label: "Nannies", blurb: "Childcare for families, day or live-in." },
      cook: { label: "Cooks", blurb: "Daily meals, events and private dining." },
      driver: { label: "Drivers", blurb: "Private and business drivers." },
    },
    plans: {
      full: { label: "Full-time", detail: "Dedicated staff, set weekly schedule." },
      part: { label: "Part-time", detail: "A few days or hours per week." },
    },
  },
  why: {
    title: "Why 2TG",
    sub: "What you can expect when you work with us.",
    draft: "DRAFT: replace with 2TG's real process, then set CONFIRMED.why = true",
    items: [
      { title: "How we select staff", text: "[Describe how 2TG selects and checks candidates. Only list what you really do.]" },
      { title: "What the contract covers", text: "[Explain what the contract covers: duration, schedule, duties of both sides.]" },
      { title: "If the match is not right", text: "[Explain what happens if the match is not right: replacement, delay, conditions.]" },
    ],
  },
  how: {
    title: "How it works",
    steps: [
      { title: "Tell us what you need", text: "Pick the role, schedule and city in the quote form." },
      { title: "We match you", text: "2TG proposes suitable staff for your household or business." },
      { title: "Start with confidence", text: "Confirm the details with us on WhatsApp and begin." },
    ],
  },
  cities: { agadir: "Agadir", darbouazza: "Dar Bouazza" },
  quote: {
    title: "Request a quote",
    sub: "Build your request, then send it straight to us on WhatsApp.",
    who: "Who do you need?",
    schedule: "Schedule",
    staff: "Staff needed",
    city: "City",
    name: "Your name",
    estimate: "Indicative estimate",
    from: "from",
    onRequest: "Your personalised price is confirmed by 2TG after your request.",
    perMonth: "/ month",
    note: "Indicative only. Final price is confirmed by 2TG after your request.",
    send: "Send on WhatsApp",
    msg: (name: string, city: string, n: number, who: string, plan: string, total: string | null) =>
      `Hello 2TG, I would like a quote.\nName: ${name}\nCity: ${city}\nStaff: ${n} ${who}, ${plan}` +
      (total ? `\nIndicative estimate: from ~${total} MAD/month` : ""),
  },
  testimonials: { title: "What clients say" },
  gallery: {
    title: "Gallery",
    note: "Illustrative imagery. These are mostly stock photos and do not depict 2TG employees.",
    stock: "Stock image",
    more: "Show more",
    left: "left",
    close: "Close",
    alt: "Illustrative stock photo of a household or business service",
    drag: "Drag to spin",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      { q: "What services does 2TG offer?", a: "Cleaners, nannies, cooks and drivers for households and businesses." },
      { q: "Which cities do you serve?", a: "Agadir and Dar Bouazza." },
      { q: "Full-time or part-time?", a: "Both. Full-time means dedicated staff with a set weekly schedule; part-time means a few days or hours per week. Choose in the quote form." },
      { q: "How do I get a quote?", a: "Fill in the quote form on this page and send it on WhatsApp, or call us. The team confirms the details with you." },
      { q: "Is the price in the quote form final?", a: "No. It is indicative only. 2TG confirms the final price after your request." },
      { q: "How is my personal data used?", a: "Please read our privacy policy for the details." },
    ],
  },
  chat: {
    title: "2TG Assistant",
    subtitle: "Ask about our services",
    greeting: "Hello! I'm the 2TG assistant. How can I help you find the right staff?",
    suggestions: ["What services do you offer?", "Full-time or part-time?", "How do I get a quote?"],
    placeholder: "Type your message...",
    send: "Send",
    error: "Sorry, I can't answer right now.",
    whatsapp: "Chat with the team on WhatsApp",
    privacy: "Replies are generated by an AI service. Don't share sensitive details.",
  },
  footer: { line: "2TG Business Services · Agadir & Dar Bouazza", privacy: "Privacy policy" },
  privacy: {
    title: "Privacy policy",
    updated: "Last updated: 4 November 2026",
    sections: [
      { h: "Who we are", p: "2TG Business Services is a staffing agency serving Agadir and Dar Bouazza. You can reach us by phone or WhatsApp using the numbers in the page footer." },
      { h: "The quote form", p: "The details you type in the quote form (name, city, role, schedule) stay in your browser. They are sent to us only when you press the WhatsApp button, through WhatsApp. This site does not store them." },
      { h: "The chat assistant", p: "Messages you type in the assistant are sent to a third-party AI service so it can write a reply. This site does not store them. Please do not share sensitive personal information in the chat." },
      { h: "Analytics", p: "If enabled, we use Google Analytics to measure visits, such as pages viewed, language, and clicks on the WhatsApp and call buttons. It may set cookies." },
      { h: "Your rights", p: "Under the applicable Moroccan data-protection law (Law 09-08), you can ask to access, correct or delete personal data we hold about you. Contact us by phone or WhatsApp." },
      { h: "Changes", p: "We may update this page. The date above shows the latest version." },
    ],
  },
  wa: { float: "WhatsApp", general: "Hello 2TG, I have a question." },
  mad: "MAD",
};

export type Dict = typeof en;

const fr: Dict = {
  nav: { services: "Services", quote: "Devis", gallery: "Galerie", faq: "FAQ" },
  call: "Appeler",
  seo: {
    title: "2TG Business Services | Ménage, nounous, cuisiniers et chauffeurs à Agadir et Dar Bouazza",
    description:
      "Du personnel de confiance pour la maison et l'entreprise à Agadir et Dar Bouazza : ménage, nounous, cuisiniers et chauffeurs, à temps plein ou partiel. Devis sur WhatsApp.",
  },
  hero: {
    kicker: "Recrutement · Agadir & Dar Bouazza",
    title: "Du personnel de confiance pour la maison et l'entreprise,",
    accent: "trouvé rapidement.",
    sub: "Femmes de ménage, nounous, cuisiniers et chauffeurs pour particuliers et entreprises. Choisissez temps plein ou temps partiel et obtenez un devis indicatif en moins d'une minute.",
    cta: "Demander un devis",
    wa: "Discuter sur WhatsApp",
    waMsg: "Bonjour 2TG, je souhaite recruter du personnel.",
    drag: "Bougez la souris ou faites défiler pour explorer",
    chips: ["Agadir & Dar Bouazza", "Temps plein ou partiel", "Devis via WhatsApp"],
  },
  services: {
    title: "Nos services",
    sub: "Chaque placement est disponible à temps plein ou à temps partiel.",
    items: {
      cleaner: { label: "Ménage", blurb: "Nettoyage de maison et de bureaux, ponctuel ou régulier." },
      nanny: { label: "Nounous", blurb: "Garde d'enfants, à la journée ou à demeure." },
      cook: { label: "Cuisiniers", blurb: "Repas quotidiens, événements et dîners privés." },
      driver: { label: "Chauffeurs", blurb: "Chauffeurs particuliers et d'entreprise." },
    },
    plans: {
      full: { label: "Temps plein", detail: "Personnel dédié, planning hebdomadaire fixe." },
      part: { label: "Temps partiel", detail: "Quelques jours ou heures par semaine." },
    },
  },
  why: {
    title: "Pourquoi 2TG",
    sub: "Ce que vous pouvez attendre de notre part.",
    draft: "BROUILLON : remplacez par le vrai processus de 2TG, puis mettez CONFIRMED.why = true",
    items: [
      { title: "Comment nous sélectionnons le personnel", text: "[Décrivez comment 2TG sélectionne et vérifie les candidats. N'indiquez que ce que vous faites réellement.]" },
      { title: "Ce que couvre le contrat", text: "[Précisez ce que couvre le contrat : durée, horaires, obligations des deux parties.]" },
      { title: "Si le profil ne convient pas", text: "[Expliquez ce qui se passe si le profil ne convient pas : remplacement, délais, conditions.]" },
    ],
  },
  how: {
    title: "Comment ça marche",
    steps: [
      { title: "Dites-nous votre besoin", text: "Choisissez le poste, le rythme et la ville dans le formulaire de devis." },
      { title: "Nous trouvons le bon profil", text: "2TG vous propose du personnel adapté à votre foyer ou à votre entreprise." },
      { title: "Démarrez sereinement", text: "Confirmez les détails avec nous sur WhatsApp et commencez." },
    ],
  },
  cities: { agadir: "Agadir", darbouazza: "Dar Bouazza" },
  quote: {
    title: "Demander un devis",
    sub: "Composez votre demande, puis envoyez-la-nous directement sur WhatsApp.",
    who: "Qui recherchez-vous ?",
    schedule: "Rythme",
    staff: "Personnel souhaité",
    city: "Ville",
    name: "Votre nom",
    estimate: "Estimation indicative",
    from: "à partir de",
    onRequest: "Votre tarif personnalisé est confirmé par 2TG après votre demande.",
    perMonth: "/ mois",
    note: "Indicatif uniquement. Le prix final est confirmé par 2TG après votre demande.",
    send: "Envoyer sur WhatsApp",
    msg: (name, city, n, who, plan, total) =>
      `Bonjour 2TG, je souhaite un devis.\nNom : ${name}\nVille : ${city}\nPersonnel : ${n} ${who}, ${plan}` +
      (total ? `\nEstimation indicative : à partir de ~${total} MAD/mois` : ""),
  },
  testimonials: { title: "Ce que disent nos clients" },
  gallery: {
    title: "Galerie",
    note: "Images d'illustration. Ce sont en majorité des photos de stock qui ne représentent pas les employés de 2TG.",
    stock: "Image de stock",
    more: "Voir plus",
    left: "restantes",
    close: "Fermer",
    alt: "Photo de stock illustrant un service à domicile ou en entreprise",
    drag: "Glissez pour faire tourner",
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      { q: "Quels services propose 2TG ?", a: "Ménage, nounous, cuisiniers et chauffeurs pour particuliers et entreprises." },
      { q: "Dans quelles villes intervenez-vous ?", a: "Agadir et Dar Bouazza." },
      { q: "Temps plein ou temps partiel ?", a: "Les deux. Le temps plein, c'est du personnel dédié avec un planning hebdomadaire fixe ; le temps partiel, quelques jours ou heures par semaine. Choisissez dans le formulaire de devis." },
      { q: "Comment obtenir un devis ?", a: "Remplissez le formulaire de devis sur cette page et envoyez-le sur WhatsApp, ou appelez-nous. L'équipe confirme les détails avec vous." },
      { q: "Le prix du formulaire est-il définitif ?", a: "Non. Il est indicatif. 2TG confirme le prix final après votre demande." },
      { q: "Comment mes données personnelles sont-elles utilisées ?", a: "Veuillez lire notre politique de confidentialité pour les détails." },
    ],
  },
  chat: {
    title: "Assistant 2TG",
    subtitle: "Posez vos questions sur nos services",
    greeting: "Bonjour ! Je suis l'assistant 2TG. Comment puis-je vous aider à trouver le bon personnel ?",
    suggestions: ["Quels services proposez-vous ?", "Temps plein ou partiel ?", "Comment obtenir un devis ?"],
    placeholder: "Écrivez votre message...",
    send: "Envoyer",
    error: "Désolé, je ne peux pas répondre pour le moment.",
    whatsapp: "Écrire à l'équipe sur WhatsApp",
    privacy: "Les réponses sont générées par un service d'IA. Ne partagez pas d'informations sensibles.",
  },
  footer: { line: "2TG Business Services · Agadir & Dar Bouazza", privacy: "Politique de confidentialité" },
  privacy: {
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : 4 novembre 2026",
    sections: [
      { h: "Qui sommes-nous", p: "2TG Business Services est une agence de recrutement présente à Agadir et Dar Bouazza. Vous pouvez nous joindre par téléphone ou WhatsApp aux numéros indiqués en bas de page." },
      { h: "Le formulaire de devis", p: "Les informations saisies dans le formulaire de devis (nom, ville, poste, rythme) restent dans votre navigateur. Elles ne nous sont transmises que lorsque vous appuyez sur le bouton WhatsApp, via WhatsApp. Ce site ne les conserve pas." },
      { h: "L'assistant de chat", p: "Les messages saisis dans l'assistant sont envoyés à un service d'IA tiers afin de rédiger une réponse. Ce site ne les conserve pas. Merci de ne pas partager d'informations personnelles sensibles dans le chat." },
      { h: "Mesure d'audience", p: "Si elle est activée, nous utilisons Google Analytics pour mesurer les visites : pages vues, langue et clics sur les boutons WhatsApp et appel. Elle peut déposer des cookies." },
      { h: "Vos droits", p: "Conformément à la loi marocaine applicable sur la protection des données (loi 09-08), vous pouvez demander l'accès, la rectification ou la suppression des données personnelles que nous détenons. Contactez-nous par téléphone ou WhatsApp." },
      { h: "Modifications", p: "Nous pouvons mettre à jour cette page. La date ci-dessus indique la dernière version." },
    ],
  },
  wa: { float: "WhatsApp", general: "Bonjour 2TG, j'ai une question." },
  mad: "MAD",
};

const ar: Dict = {
  nav: { services: "الخدمات", quote: "عرض سعر", gallery: "المعرض", faq: "الأسئلة" },
  call: "اتصل",
  seo: {
    title: "2TG Business Services | عاملات نظافة ومربيات وطباخون وسائقون في أكادير ودار بوعزة",
    description:
      "عمال موثوقون للمنزل والشركة في أكادير ودار بوعزة: عاملات نظافة ومربيات وطباخون وسائقون، بدوام كامل أو جزئي. احصل على عرض سعر عبر واتساب.",
  },
  hero: {
    kicker: "توظيف · أكادير ودار بوعزة",
    title: "عمال موثوقون للمنزل والشركة،",
    accent: "بسرعة ودقة.",
    sub: "عاملات نظافة ومربيات وطباخون وسائقون للأسر والشركات. اختاروا دواماً كاملاً أو جزئياً واحصلوا على عرض سعر تقريبي في أقل من دقيقة.",
    cta: "احصل على عرض سعر",
    wa: "تواصل عبر واتساب",
    waMsg: "مرحباً 2TG، أرغب في طلب عمال.",
    drag: "حرّك الفأرة أو مرّر للأسفل للاستكشاف",
    chips: ["أكادير ودار بوعزة", "دوام كامل أو جزئي", "عرض سعر عبر واتساب"],
  },
  services: {
    title: "خدماتنا",
    sub: "كل الخدمات متاحة بدوام كامل أو جزئي.",
    items: {
      cleaner: { label: "عاملات النظافة", blurb: "تنظيف المنازل والمكاتب، لمرة واحدة أو بشكل منتظم." },
      nanny: { label: "المربيات", blurb: "رعاية الأطفال للأسر، نهاراً أو بالإقامة." },
      cook: { label: "الطباخون", blurb: "وجبات يومية ومناسبات وولائم خاصة." },
      driver: { label: "السائقون", blurb: "سائقون للأفراد والشركات." },
    },
    plans: {
      full: { label: "دوام كامل", detail: "عامل مخصص وجدول أسبوعي ثابت." },
      part: { label: "دوام جزئي", detail: "بضعة أيام أو ساعات في الأسبوع." },
    },
  },
  why: {
    title: "لماذا 2TG",
    sub: "ما يمكنك توقعه عند التعامل معنا.",
    draft: "مسودة: استبدلها بالإجراءات الفعلية لـ 2TG ثم اجعل CONFIRMED.why = true",
    items: [
      { title: "كيف نختار العاملين", text: "[صف هنا كيف تختار 2TG المرشحين وتتحقق منهم. اذكر فقط ما تفعله فعلاً.]" },
      { title: "ما يغطيه العقد", text: "[وضّح ما يغطيه العقد: المدة والمواعيد والتزامات الطرفين.]" },
      { title: "إذا لم يكن الاختيار مناسباً", text: "[اشرح ما يحدث إذا لم يناسبك العامل: الاستبدال والمدة والشروط.]" },
    ],
  },
  how: {
    title: "كيف نعمل",
    steps: [
      { title: "أخبرنا بما تحتاجه", text: "اختر الوظيفة ونوع الدوام والمدينة في نموذج عرض السعر." },
      { title: "نختار لك الأنسب", text: "تقترح 2TG عاملين مناسبين لمنزلك أو شركتك." },
      { title: "ابدأ بثقة", text: "أكّد التفاصيل معنا عبر واتساب وابدأ." },
    ],
  },
  cities: { agadir: "أكادير", darbouazza: "دار بوعزة" },
  quote: {
    title: "اطلب عرض سعر",
    sub: "حدّد طلبك ثم أرسله إلينا مباشرة عبر واتساب.",
    who: "من تحتاج؟",
    schedule: "نوع الدوام",
    staff: "عدد العمال",
    city: "المدينة",
    name: "اسمك",
    estimate: "تقدير تقريبي",
    from: "ابتداءً من",
    onRequest: "يؤكد فريق 2TG سعرك الخاص بعد طلبك.",
    perMonth: "/ شهرياً",
    note: "تقدير تقريبي فقط. يتم تأكيد السعر النهائي من 2TG بعد طلبك.",
    send: "أرسل عبر واتساب",
    msg: (name, city, n, who, plan, total) =>
      `مرحباً 2TG، أرغب في عرض سعر.\nالاسم: ${name}\nالمدينة: ${city}\nالعمال: ${n} ${who}، ${plan}` +
      (total ? `\nالتقدير التقريبي: ابتداءً من ~${total} درهم/شهرياً` : ""),
  },
  testimonials: { title: "آراء عملائنا" },
  gallery: {
    title: "المعرض",
    note: "صور توضيحية. معظمها صور جاهزة ولا تمثل موظفي 2TG.",
    stock: "صورة جاهزة",
    more: "عرض المزيد",
    left: "متبقية",
    close: "إغلاق",
    alt: "صورة توضيحية جاهزة لخدمة منزلية أو لشركة",
    drag: "اسحب للتدوير",
  },
  faq: {
    title: "الأسئلة الشائعة",
    items: [
      { q: "ما الخدمات التي تقدمها 2TG؟", a: "عاملات نظافة ومربيات وطباخون وسائقون للأسر والشركات." },
      { q: "في أي مدن تعملون؟", a: "أكادير ودار بوعزة." },
      { q: "دوام كامل أم جزئي؟", a: "الاثنان معاً. الدوام الكامل يعني عاملاً مخصصاً بجدول أسبوعي ثابت، والدوام الجزئي بضعة أيام أو ساعات في الأسبوع. اختر ذلك في نموذج عرض السعر." },
      { q: "كيف أحصل على عرض سعر؟", a: "املأ نموذج عرض السعر في هذه الصفحة وأرسله عبر واتساب، أو اتصل بنا. يؤكد الفريق التفاصيل معك." },
      { q: "هل السعر في النموذج نهائي؟", a: "لا، هو تقدير تقريبي فقط. تؤكد 2TG السعر النهائي بعد طلبك." },
      { q: "كيف تُستخدم بياناتي الشخصية؟", a: "يرجى قراءة سياسة الخصوصية لمعرفة التفاصيل." },
    ],
  },
  chat: {
    title: "مساعد 2TG",
    subtitle: "اسأل عن خدماتنا",
    greeting: "مرحباً! أنا مساعد 2TG. كيف أساعدك في العثور على العامل المناسب؟",
    suggestions: ["ما هي خدماتكم؟", "دوام كامل أو جزئي؟", "كيف أحصل على عرض سعر؟"],
    placeholder: "اكتب رسالتك...",
    send: "إرسال",
    error: "عذراً، لا أستطيع الرد الآن.",
    whatsapp: "تواصل مع الفريق عبر واتساب",
    privacy: "يتم إنشاء الردود بواسطة خدمة ذكاء اصطناعي. لا تشارك معلومات حساسة.",
  },
  footer: { line: "2TG Business Services · أكادير ودار بوعزة", privacy: "سياسة الخصوصية" },
  privacy: {
    title: "سياسة الخصوصية",
    updated: "آخر تحديث: 4 نوفمبر 2026",
    sections: [
      { h: "من نحن", p: "2TG Business Services وكالة توظيف تخدم أكادير ودار بوعزة. يمكنك التواصل معنا هاتفياً أو عبر واتساب على الأرقام الموجودة أسفل الصفحة." },
      { h: "نموذج عرض السعر", p: "تبقى المعلومات التي تكتبها في نموذج عرض السعر (الاسم والمدينة والوظيفة ونوع الدوام) في متصفحك. ولا تصلنا إلا عند الضغط على زر واتساب، وعبر واتساب. لا يحتفظ هذا الموقع بها." },
      { h: "مساعد المحادثة", p: "تُرسل الرسائل التي تكتبها في المساعد إلى خدمة ذكاء اصطناعي تابعة لطرف ثالث لكتابة الرد. لا يحتفظ هذا الموقع بها. يرجى عدم مشاركة معلومات شخصية حساسة في المحادثة." },
      { h: "التحليلات", p: "عند تفعيلها، نستخدم Google Analytics لقياس الزيارات مثل الصفحات المعروضة واللغة والنقرات على زري واتساب والاتصال. وقد تضع ملفات تعريف الارتباط." },
      { h: "حقوقك", p: "وفقاً للقانون المغربي المعمول به لحماية المعطيات (القانون 09-08)، يمكنك طلب الاطلاع على بياناتك الشخصية لدينا أو تصحيحها أو حذفها. تواصل معنا هاتفياً أو عبر واتساب." },
      { h: "التعديلات", p: "قد نحدّث هذه الصفحة. يبيّن التاريخ أعلاه آخر نسخة." },
    ],
  },
  wa: { float: "واتساب", general: "مرحباً 2TG، لدي سؤال." },
  mad: "درهم",
};

export const DICT: Record<Lang, Dict> = { en, fr, ar };
