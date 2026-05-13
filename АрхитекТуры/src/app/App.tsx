import { useEffect, useState } from "react";
import logoAT from "../imports/logo-architektury.jpg";
import logoPolytech from "../imports/logo-polytech.png";

const NAV = [
  { id: "about", label: "О нас" },
  { id: "portfolio", label: "Портфолио" },
  { id: "projects", label: "Проекты в разработке" },
  { id: "mosaic", label: "Петербургская мозаика" },
  { id: "gallery", label: "Фотовернисаж" },
  { id: "news", label: "Новости" },
  { id: "contacts", label: "Контакты" },
];

const portfolio = [
  { title: "Политехнический — сердце Политеха", desc: "Авторская экскурсия по историческому кампусу СПбПУ: от главного здания до гидробашни.", tag: "Кампус · 90 мин" },
  { title: "Архитектурный модерн Петербурга", desc: "Прогулка по доходным домам Петроградки: Лидваль, Бубырь, Васильев — стиль, ставший визитной карточкой города.", tag: "Город · 2 часа" },
  { title: "Экскурсии для официальных делегаций", desc: "Протокольные программы для гостей университета на русском и английском языках.", tag: "VIP · по запросу" },
];

const inDev = [
  { title: "Индустриальный туризм Политеха", stage: "Сбор материала", date: "Запуск: осень 2026" },
  { title: "Квест-экскурсия по кампусу", stage: "Прототип маршрута", date: "Запуск: весна 2026" },
  { title: "Аудиогид на иностранных языках", stage: "Запись треков", date: "Запуск: лето 2026" },
  { title: "Цикл лекций «Конструктивизм СПб»", stage: "Согласование с партнёрами", date: "Запуск: зима 2026" },
];

const mosaic = [
  { title: "Жемчужины северного модерна", excerpt: "Как финский гранит и северные мотивы сформировали лицо Петроградской стороны в начале XX века.", date: "12 апр 2026" },
  { title: "История экскурсионного дела", excerpt: "От первых проводников по столице империи до современных гидов-аттестованных профессионалов.", date: "28 мар 2026" },
  { title: "Конструктивизм за Невской заставой", excerpt: "Дома-коммуны, фабрики-кухни и ДК Ильича: маршрут по утопии 1920-х.", date: "10 мар 2026" },
  { title: "Памятные места Политеха", excerpt: "Где работали Иоффе, Капица и Курчатов: научная топография университета.", date: "21 фев 2026" },
  { title: "Гидробашня: символ кампуса", excerpt: "История и реставрация одного из самых узнаваемых силуэтов Политехнического.", date: "5 фев 2026" },
];

const gallery = Array.from({ length: 8 }).map((_, i) => ({
  src: `https://picsum.photos/seed/spb-arch-${i + 1}/800/1000`,
  place: ["Главное здание СПбПУ", "Дом Лидваля", "ДК им. Горького", "Гидробашня", "Дом с башнями", "Особняк Кшесинской", "Нарвские ворота", "Чесменская церковь"][i],
  date: ["мар 2026", "фев 2026", "янв 2026", "дек 2025", "ноя 2025", "окт 2025", "сен 2025", "авг 2025"][i],
  author: ["А. Иванова", "М. Петров", "Е. Сидорова", "Д. Орлов", "К. Белова", "С. Гриневич", "Н. Ким", "О. Лебедев"][i],
}));

const news = [
  { date: "15 мая 2026", title: "Лекция по подготовке к аттестации гидов", text: "Открытая лекция для членов бюро и всех желающих. Разбор изменений 2026 года." },
  { date: "02 мая 2026", title: "Победа в грантовом конкурсе ПФКИ", text: "Проект «Архитектурный модерн Петербурга» получил поддержку Президентского фонда." },
  { date: "18 апр 2026", title: "Анонс экскурсии для абитуриентов", text: "В рамках Дня открытых дверей бюро проведёт серию бесплатных прогулок по кампусу." },
  { date: "04 апр 2026", title: "Участие в форуме «Студтуризм»", text: "Делегация «АрхитекТур» представила опыт бюро на всероссийском форуме в Казани." },
  { date: "20 мар 2026", title: "Новый набор в актив", text: "Открыт приём заявок на вступление в медиа-отдел и отдел проектной работы." },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    // Reveal on scroll
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // Scroll progress + parallax
    const parallaxEls = document.querySelectorAll<HTMLElement>("[data-parallax]");
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      h.style.setProperty("--scroll", String(p));
      const y = h.scrollTop;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.15");
        el.style.setProperty("--py", String(-y * speed));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      alert("Пожалуйста, подтвердите согласие на обработку персональных данных.");
      return;
    }
    const fd = new FormData(e.target as HTMLFormElement);
    console.log("[demo] form submit:", Object.fromEntries(fd.entries()));
    alert("Данные не отправляются на сервер (демо-режим).");
  };

  return (
    <div className="min-h-screen">
      <div className="scroll-progress" aria-hidden="true" />

      {/* HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur bg-background/85 border-b border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 flex items-center justify-between h-16">
          <a href="#top" className="flex items-center gap-3">
            <img src={logoAT} alt="Логотип АрхитекТуры" className="h-10 w-10 rounded object-cover" />
            <div className="leading-tight">
              <div style={{ fontFamily: 'var(--font-display)' }} className="font-bold text-sm tracking-tight">АрхитекТуры</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">СПбПУ · ИПМЭиТ</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-7 text-sm">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="text-foreground/80 hover:text-accent transition-colors">{n.label}</a>
            ))}
          </nav>
          <button
            aria-label="Меню"
            className="lg:hidden inline-flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`block h-0.5 w-6 bg-foreground transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-foreground transition ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-foreground transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
        {menuOpen && (
          <nav className="lg:hidden border-t border-border bg-background">
            <div className="px-5 py-4 flex flex-col gap-3">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setMenuOpen(false)} className="py-1 text-foreground/90 hover:text-accent">{n.label}</a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="blob absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-accent/40" />
          <div className="blob absolute top-40 -right-24 w-[480px] h-[480px] rounded-full bg-primary/40" style={{ animationDelay: "-3s" }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-24 lg:pt-28 lg:pb-36 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 reveal">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-accent font-semibold">
              <span className="h-px w-8 bg-accent" /> Студенческое проектное бюро
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)' }} className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[0.95]">
              Архитек<span className="text-accent">Туры</span>
              <span className="block text-foreground/70 text-2xl sm:text-3xl lg:text-4xl font-semibold mt-4">
                Петербург, рассказанный студентами Политеха
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-base lg:text-lg text-muted-foreground">
              Мы создаём авторские экскурсии, исследуем архитектуру и историю города,
              готовим будущих гидов и работаем с университетом, грантами и партнёрами.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#portfolio" className="px-6 py-3 rounded-md bg-accent text-accent-foreground font-semibold hover:opacity-90 hover:-translate-y-0.5 transition">Посмотреть портфолио</a>
              <a href="#contacts" className="px-6 py-3 rounded-md border border-foreground/20 hover:border-accent hover:text-accent transition font-semibold">Связаться с нами</a>
            </div>
          </div>
          <div className="lg:col-span-5 relative reveal reveal-delay-2">
            <div data-parallax="0.08" className="parallax-y aspect-square rounded-2xl bg-card border border-border shadow-xl overflow-hidden flex items-center justify-center p-10">
              <img src={logoAT} alt="Логотип проектного бюро АрхитекТуры" className="w-full h-full object-contain" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground px-5 py-4 rounded-xl shadow-lg max-w-[220px]">
              <div className="text-xs uppercase tracking-widest opacity-80">Основано при</div>
              <div style={{ fontFamily: 'var(--font-display)' }} className="font-bold leading-tight mt-1">ИПМЭиТ · Совет по молодёжной политике СПбПУ</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" eyebrow="О бюро" title="Кто мы и зачем">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5 text-foreground/85 leading-relaxed">
            <p>
              <b>«АрхитекТуры»</b> — студенческое проектное бюро (Student Project Bureau «ArkhitekTury»),
              созданное в Санкт-Петербургском политехническом университете Петра Великого
              при поддержке Института промышленного менеджмента, экономики и торговли (ИПМЭиТ)
              и Совета по молодёжной политике СПбПУ.
            </p>
            <p>
              Мы объединяем студентов, увлечённых историей, архитектурой и культурой Петербурга,
              чтобы превращать академические знания в живой и доступный экскурсионный продукт.
            </p>
            <h3 className="text-2xl font-bold pt-4">Цели и задачи</h3>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 list-disc pl-5 marker:text-accent">
              <li>Развитие навыков экскурсоводов</li>
              <li>Подготовка к профессиональной аттестации</li>
              <li>Проектирование экскурсионных продуктов</li>
              <li>Образовательные мероприятия и лекции</li>
              <li>Содействие в формировании портфолио</li>
              <li>Работа с грантами и партнёрами</li>
            </ul>
          </div>
          <aside className="bg-card border border-border rounded-2xl p-6 space-y-5">
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)' }} className="font-bold text-lg">Состав актива</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><span className="text-accent font-semibold">·</span> Руководитель бюро</li>
                <li><span className="text-accent font-semibold">·</span> Отдел культурно-массовой, проектной и образовательной работы</li>
                <li><span className="text-accent font-semibold">·</span> Медиа-отдел</li>
                <li><span className="text-accent font-semibold">·</span> Хозяйственный отдел</li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-display)' }} className="font-bold text-lg">Управление</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Высший орган — Совет проектного бюро. Заседания проводятся не реже одного раза в год;
                на них избирается руководитель и определяются стратегические направления.
              </p>
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Файл Положения будет добавлен."); }}
               className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent">
              ↓ Скачать Положение (PDF)
            </a>
          </aside>
        </div>
      </Section>

      {/* PORTFOLIO */}
      <Section id="portfolio" eyebrow="Портфолио" title="Что мы уже водим" alt>
        <div className="grid md:grid-cols-3 gap-6">
          {portfolio.map((p, i) => (
            <article key={i} className="group bg-card rounded-2xl border border-border overflow-hidden hover:-translate-y-1 transition shadow-sm hover:shadow-xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={`https://picsum.photos/seed/portfolio-${i}/800/600`}
                     alt={`Изображение экскурсии «${p.title}»`}
                     className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-widest text-accent font-semibold">{p.tag}</div>
                <h3 className="mt-2 font-bold text-xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold">Участие в мероприятиях</h3>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {["Конференция «Студтуризм-2026»", "Форум молодых гидов СЗФО", "Грантовый конкурс ПФКИ", "Фестиваль «Открытый город»", "Ночь музеев СПб", "Питчинг в ИПМЭиТ"].map((t, i) => (
              <div key={i} className="flex gap-4 bg-card border border-border rounded-xl p-4 items-center">
                <img src={`https://picsum.photos/seed/event-${i}/200/200`} alt="Изображение мероприятия" className="w-16 h-16 rounded-lg object-cover" />
                <div className="text-sm font-medium">{t}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold">Партнёры</h3>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Туристско-информационное бюро СПб", "ИПМЭиТ СПбПУ", "Совет по молодёжной политике", "ВКонтакте Сообщество", "ПФКИ"].map((n) => (
              <div key={n} className="px-5 py-3 rounded-lg bg-card border border-border text-sm text-foreground/80">{n}</div>
            ))}
          </div>
        </div>
      </Section>

      {/* IN DEVELOPMENT */}
      <Section id="projects" eyebrow="В разработке" title="Что готовим к запуску">
        <div className="grid md:grid-cols-2 gap-5">
          {inDev.map((p, i) => (
            <div key={i} className="relative bg-card border border-border rounded-2xl p-6 overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 text-[10px] uppercase tracking-widest bg-accent text-accent-foreground rounded-bl-lg font-bold">
                В разработке
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)' }} className="font-bold text-xl pr-24">{p.title}</h3>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground text-xs uppercase tracking-wider">Стадия</div>
                  <div className="mt-1 font-semibold">{p.stage}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs uppercase tracking-wider">Запуск</div>
                  <div className="mt-1 font-semibold">{p.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* MOSAIC */}
      <Section id="mosaic" eyebrow="Петербургская мозаика" title="Истории, которые мы собираем" alt>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mosaic.map((m, i) => (
            <article key={i} className="bg-card rounded-2xl border border-border p-6 flex flex-col">
              <div className="text-3xl">{["🏛️", "🗺️", "🏗️", "🔬", "🗼"][i]}</div>
              <div className="mt-3 text-xs text-muted-foreground">{m.date}</div>
              <h3 className="mt-2 font-bold text-lg leading-snug">{m.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground flex-1">{m.excerpt}</p>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Полный материал появится позже."); }}
                 className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
                Читать далее →
              </a>
            </article>
          ))}
        </div>
      </Section>

      {/* GALLERY */}
      <Section id="gallery" eyebrow="Фотовернисаж" title="Город в кадрах бюро">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((g, i) => (
            <figure key={i} className="group relative overflow-hidden rounded-xl bg-card border border-border">
              <img
                src={g.src}
                alt={`${g.place}, ${g.date}, фото © ${g.author}`}
                className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition duration-500"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent text-white p-3 text-xs leading-tight opacity-0 group-hover:opacity-100 transition">
                <div className="font-semibold">{g.place}</div>
                <div className="opacity-80">{g.date} · © {g.author}</div>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground italic">
          Все фото размещены с согласия участников и авторов. Копирование только с разрешения проектного бюро.
          На странице используются демо-изображения.
        </p>
      </Section>

      {/* NEWS */}
      <Section id="news" eyebrow="Новости" title="Что у нас происходит" alt>
        <div className="space-y-4">
          {news.map((n, i) => (
            <article key={i} className="grid md:grid-cols-[160px_1fr_auto] gap-4 md:gap-8 items-start bg-card border border-border rounded-xl p-5">
              <div className="text-sm font-mono text-accent font-semibold">{n.date}</div>
              <div>
                <h3 className="font-bold text-lg">{n.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{n.text}</p>
              </div>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Подробности скоро."); }}
                 className="text-sm font-semibold text-primary hover:text-accent whitespace-nowrap">Подробнее →</a>
            </article>
          ))}
        </div>
      </Section>

      {/* CONTACTS */}
      <Section id="contacts" eyebrow="Контакты" title="Напишите нам">
        <div className="grid lg:grid-cols-2 gap-10">
          <form onSubmit={submit} className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div>
              <label className="text-sm font-semibold">Имя</label>
              <input name="name" required maxLength={100}
                     className="mt-1 w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-accent focus:outline-none" />
            </div>
            <div>
              <label className="text-sm font-semibold">Email</label>
              <input name="email" type="email" required maxLength={255}
                     className="mt-1 w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-accent focus:outline-none" />
            </div>
            <div>
              <label className="text-sm font-semibold">Сообщение</label>
              <textarea name="message" required maxLength={1000} rows={5}
                        className="mt-1 w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-accent focus:outline-none resize-none" />
            </div>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 accent-accent" />
              <span>
                Я согласен(на) на обработку персональных данных согласно{" "}
                <button type="button" onClick={() => setPrivacyOpen(true)} className="text-accent underline underline-offset-2">Политике конфиденциальности</button>.
              </span>
            </label>
            <button type="submit" className="w-full px-6 py-3 rounded-lg bg-accent text-accent-foreground font-bold hover:opacity-90 transition">
              Отправить
            </button>
            <p className="text-xs text-muted-foreground">Демо-режим: данные не отправляются на сервер.</p>
          </form>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
              <a href="mailto:architektury@spbstu.ru" className="block text-xl font-bold hover:text-accent">architektury@spbstu.ru</a>
              <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">Адрес</div>
              <div className="font-semibold">Новороссийская ул., 50, Санкт-Петербург</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Ст. метро «Площадь Мужества», далее ~10 минут пешком или одна остановка на наземном транспорте.
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 flex items-center gap-5">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://vk.com/architektury_spbpu"
                alt="QR-код на сообщество ВКонтакте vk.com/architektury_spbpu"
                className="w-32 h-32"
              />
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Мы во ВКонтакте</div>
                <a href="https://vk.com/architektury_spbpu" target="_blank" rel="noreferrer" className="font-bold text-lg hover:text-accent">vk.com/architektury_spbpu</a>
                <p className="mt-1 text-sm text-muted-foreground">Отсканируйте QR-код, чтобы перейти в сообщество.</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border h-72">
              <iframe
                title="Карта: Новороссийская ул., 50, Санкт-Петербург"
                src="https://www.openstreetmap.org/export/embed.html?bbox=30.3680%2C60.0050%2C30.3790%2C60.0125&layer=mapnik&marker=60.00865%2C30.37335"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-primary text-primary-foreground mt-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-12 grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoAT} alt="Логотип АрхитекТуры" className="w-12 h-12 rounded bg-white object-contain p-1" />
              <div>
                <div style={{ fontFamily: 'var(--font-display)' }} className="font-bold">АрхитекТуры</div>
                <div className="text-xs opacity-80">Student Project Bureau «ArkhitekTury»</div>
              </div>
            </div>
            <p className="mt-4 text-sm opacity-80 max-w-xs">
              Студенческое проектное бюро при СПбПУ Петра Великого и ИПМЭиТ.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest opacity-70">Навигация</div>
            <ul className="mt-3 space-y-2 text-sm">
              {NAV.map((n) => <li key={n.id}><a href={`#${n.id}`} className="hover:text-accent opacity-90">{n.label}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest opacity-70">Партнёры</div>
            <div className="mt-3 flex items-center gap-4">
              <img src={logoPolytech} alt="Логотип СПбПУ" className="w-14 h-14 bg-white rounded p-1 object-contain" />
              <div className="text-sm leading-tight">
                СПбПУ Петра Великого<br />
                <span className="opacity-80">Институт ИПМЭиТ</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/15">
          <div className="mx-auto max-w-7xl px-5 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs opacity-80">
            <div>© Студенческое проектное бюро «АрхитекТуры», СПбПУ Петра Великого, 2026. Все права защищены.</div>
            <button onClick={() => setPrivacyOpen(true)} className="hover:text-accent underline underline-offset-2">Политика конфиденциальности</button>
          </div>
        </div>
      </footer>

      {/* PRIVACY MODAL */}
      {privacyOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setPrivacyOpen(false)}>
          <div className="bg-background rounded-2xl max-w-lg w-full p-6 max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-bold">Политика конфиденциальности</h3>
              <button onClick={() => setPrivacyOpen(false)} className="text-2xl leading-none">×</button>
            </div>
            <div className="mt-4 space-y-3 text-sm text-foreground/85">
              <p>Персональные данные, оставленные в форме обратной связи, используются исключительно для ответа на ваше сообщение.</p>
              <p>Данные не передаются третьим лицам и не используются в маркетинговых рассылках.</p>
              <p>Вы можете в любой момент запросить удаление ваших данных, написав на architektury@spbstu.ru.</p>
              <p className="text-xs text-muted-foreground">Демо-документ. Финальная редакция будет утверждена бюро.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ id, eyebrow, title, children, alt }: { id: string; eyebrow: string; title: string; children: React.ReactNode; alt?: boolean }) {
  return (
    <section id={id} className={alt ? "bg-secondary/40" : ""}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl mb-12 reveal">
          <div className="text-xs uppercase tracking-[0.25em] text-accent font-bold">{eyebrow}</div>
          <h2 style={{ fontFamily: 'var(--font-display)' }} className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold">{title}</h2>
        </div>
        <div className="reveal reveal-delay-1">{children}</div>
      </div>
    </section>
  );
}