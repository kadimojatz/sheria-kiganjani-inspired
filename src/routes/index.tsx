import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileCheck2,
  Headphones,
  Languages,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Star,
  Video,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import aminaPortrait from "@/assets/advocate-amina.jpg";
import josephPortrait from "@/assets/advocate-joseph.jpg";
import rehemaPortrait from "@/assets/advocate-rehema.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wakili Huduma Popote | Legal Help Tanzania" },
      { name: "description", content: "Book confidential consultations with verified Tanzanian advocates in English or Kiswahili." },
      { property: "og:title", content: "Wakili Huduma Popote | Legal Help Tanzania" },
      { property: "og:description", content: "Verified advocates, clear fees, and confidential legal help wherever you are." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

type Language = "en" | "sw";
type Copy = { en: string; sw: string };

const t = (copy: Copy, language: Language) => copy[language];

const specialties = [
  { en: "All fields", sw: "Fani zote" },
  { en: "Land & Property", sw: "Ardhi na Mali" },
  { en: "Family & Probate", sw: "Familia na Mirathi" },
  { en: "Business & Corporate", sw: "Biashara na Kampuni" },
  { en: "Labor & Employment", sw: "Kazi na Ajira" },
  { en: "Criminal Defense", sw: "Utetezi wa Jinai" },
] satisfies Copy[];

const lawyers = [
  { name: "Adv. Amina Jaffray", specialty: { en: "Family & Probate", sw: "Familia na Mirathi" }, location: "Dar es Salaam", languages: "English / Kiswahili", years: 15, rating: "4.9", reviews: 186, tzs: "120,000", usd: "47", image: aminaPortrait, description: { en: "Probate, inheritance, custody and matrimonial matters handled with discretion.", sw: "Mirathi, urithi, malezi na masuala ya ndoa yanayoshughulikiwa kwa usiri." } },
  { name: "Adv. Joseph Mwakyusa", specialty: { en: "Land & Property", sw: "Ardhi na Mali" }, location: "Dar es Salaam", languages: "English / Kiswahili", years: 11, rating: "4.8", reviews: 142, tzs: "95,000", usd: "37", image: josephPortrait, description: { en: "Land transfers, title registration, tenancy and boundary dispute counsel.", sw: "Uhamisho wa ardhi, hati, upangaji na ushauri wa migogoro ya mipaka." } },
  { name: "Adv. Rehema Mushi", specialty: { en: "Business & Corporate", sw: "Biashara na Kampuni" }, location: "Arusha", languages: "English / Kiswahili", years: 18, rating: "5.0", reviews: 224, tzs: "150,000", usd: "59", image: rehemaPortrait, description: { en: "Commercial contracts, company formation and regulatory compliance.", sw: "Mikataba ya biashara, uanzishaji wa kampuni na uzingatiaji wa sheria." } },
] as const;

const services = [
  { icon: Phone, title: { en: "Phone / Audio", sw: "Simu / Sauti" }, text: { en: "Quick legal advice in a focused 30-minute call.", sw: "Ushauri wa haraka wa kisheria kupitia simu ya dakika 30." }, price: "TZS 50,000" },
  { icon: Video, title: { en: "Video conference", sw: "Mkutano wa video" }, text: { en: "In-depth case assessment with screen and document sharing.", sw: "Tathmini ya kina ya kesi pamoja na kushiriki nyaraka." }, price: "TZS 90,000" },
  { icon: MessageCircle, title: { en: "WhatsApp guidance", sw: "Ushauri WhatsApp" }, text: { en: "Flexible text and voice-note support from an advocate.", sw: "Msaada wa maandishi na ujumbe wa sauti kutoka kwa wakili." }, price: "TZS 35,000" },
  { icon: FileCheck2, title: { en: "Document review", sw: "Ukaguzi wa nyaraka" }, text: { en: "Have a contract, deed or agreement checked before signing.", sw: "Kagua mkataba, hati au makubaliano kabla ya kusaini." }, price: "TZS 75,000" },
] as const;

const faqs = [
  { q: { en: "Can I prove land ownership without a title deed?", sw: "Naweza kuthibitisha umiliki wa ardhi bila hati?" }, a: { en: "Other records may help, including sale agreements, allocation letters, receipts and witness evidence. An advocate can assess the strength of your documents and guide the registration process.", sw: "Nyaraka nyingine zinaweza kusaidia, ikiwemo mkataba wa mauziano, barua ya ugawaji, risiti na ushahidi wa mashahidi. Wakili anaweza kutathmini nyaraka zako na kukuongoza kwenye usajili." } },
  { q: { en: "Who may administer an estate after someone dies?", sw: "Nani anaweza kusimamia mirathi baada ya mtu kufariki?" }, a: { en: "A court appoints an executor named in a valid will or an administrator where there is no will. The correct process depends on the estate and applicable law.", sw: "Mahakama humteua mtekelezaji aliyetajwa kwenye wosia halali au msimamizi ikiwa hakuna wosia. Utaratibu sahihi hutegemea mali na sheria inayotumika." } },
  { q: { en: "What should I do after unfair dismissal?", sw: "Nifanye nini baada ya kufukuzwa kazi isivyo haki?" }, a: { en: "Keep your contract, termination letter and pay records. Employment disputes are time-sensitive, so seek advice promptly before filing with the labor authorities.", sw: "Hifadhi mkataba, barua ya kufukuzwa na kumbukumbu za malipo. Migogoro ya ajira ina mipaka ya muda, hivyo tafuta ushauri mapema kabla ya kuwasilisha shauri." } },
  { q: { en: "Is my consultation confidential?", sw: "Mazungumzo yangu yatakuwa ya siri?" }, a: { en: "Yes. Your case details are shared only with the advocate you choose and handled under professional confidentiality obligations.", sw: "Ndiyo. Maelezo ya kesi yako yanashirikishwa tu na wakili unayemchagua na kulindwa kwa wajibu wa usiri wa kitaaluma." } },
];

function HomePage() {
  const [language, setLanguage] = useState<Language>("en");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [field, setField] = useState("All fields");
  const [location, setLocation] = useState("All locations");
  const [lawyerLanguage, setLawyerLanguage] = useState("All languages");
  const [faqSearch, setFaqSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [booking, setBooking] = useState<string | null>(null);

  const filteredLawyers = useMemo(() => lawyers.filter((lawyer) => {
    const needle = search.toLowerCase();
    const matchesSearch = `${lawyer.name} ${lawyer.specialty.en} ${lawyer.specialty.sw} ${lawyer.location}`.toLowerCase().includes(needle);
    return matchesSearch && (field === "All fields" || lawyer.specialty.en === field) && (location === "All locations" || lawyer.location === location) && (lawyerLanguage === "All languages" || lawyer.languages.includes(lawyerLanguage));
  }), [search, field, location, lawyerLanguage]);

  const filteredFaqs = faqs.filter((faq) => `${faq.q.en} ${faq.q.sw} ${faq.a.en} ${faq.a.sw}`.toLowerCase().includes(faqSearch.toLowerCase()));
  const whatsapp = "https://wa.me/255754200118?text=Hello%20Wakili%20Huduma%20Popote%2C%20I%20need%20legal%20help.";
  const nav = [
    ["services", { en: "Services", sw: "Huduma" }],
    ["directory", { en: "Find a lawyer", sw: "Tafuta wakili" }],
    ["faq", { en: "Q&A / Resources", sw: "Maswali / Maarifa" }],
  ] as const;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-body text-foreground">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_8%_5%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_24%),radial-gradient(circle_at_92%_45%,color-mix(in_oklab,var(--urgent)_9%,transparent),transparent_26%)]" aria-hidden="true" />
      <div className="relative">
        <header className="sticky top-0 z-40 border-b border-foreground/5 bg-background/80 backdrop-blur-xl">
          <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3 sm:flex sm:px-8">
            <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="Wakili Huduma Popote home">
              <span className="grid size-9 shrink-0 place-items-center rounded-[7px] bg-primary font-display text-sm font-extrabold text-primary-foreground">W</span>
              <span className="min-w-0 leading-tight"><span className="block truncate font-display text-[15px] font-extrabold">Wakili Huduma Popote</span><span className="block font-mono text-[9px] uppercase text-muted-foreground">Dar es Salaam</span></span>
            </a>
            <nav className="mx-auto hidden items-center gap-7 font-mono text-[10px] uppercase text-muted-foreground lg:flex" aria-label="Main navigation">
              {nav.map(([id, label]) => <a key={id} href={`#${id}`} className="hover:text-foreground">{t(label, language)}</a>)}
            </nav>
            <div className="flex shrink-0 items-center gap-2">
              <div className="flex items-center rounded-full border border-foreground/10 bg-surface/60 p-0.5 font-mono text-[10px]" aria-label="Language selector">
                {(["en", "sw"] as const).map((lang) => <button key={lang} onClick={() => setLanguage(lang)} className={cn("rounded-full px-2.5 py-1 uppercase", language === lang ? "bg-primary text-primary-foreground" : "text-muted-foreground")} aria-pressed={language === lang}>{lang === "sw" ? "SW" : "EN"}</button>)}
              </div>
              <Button variant="urgent" size="sm" asChild className="hidden md:inline-flex"><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle className="size-4" />{t({ en: "Consult Now", sw: "Ongea Sasa" }, language)}</a></Button>
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden" aria-label="Toggle menu">{mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}</Button>
            </div>
          </div>
          {mobileOpen && <nav className="border-t border-border bg-background px-5 py-4 lg:hidden">{nav.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMobileOpen(false)} className="block border-b border-border py-3 text-sm font-semibold">{t(label, language)}</a>)}<Button variant="urgent" asChild className="mt-4 w-full"><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle className="size-4" />{t({ en: "Consult Now via WhatsApp", sw: "Pata Ushauri kwa WhatsApp" }, language)}</a></Button></nav>}
        </header>

        <main id="top">
          <section className="mx-auto grid max-w-6xl items-center gap-9 px-5 py-12 sm:px-8 lg:grid-cols-12 lg:py-16">
            <div className="lg:col-span-7">
              <p className="rise font-mono text-[11px] uppercase text-primary">{t({ en: "Legal help · Wherever you are", sw: "Huduma za kisheria · Popote ulipo" }, language)}</p>
              <h1 className="rise mt-4 max-w-[16ch] font-display text-4xl font-extrabold leading-[1.04] text-balance sm:text-5xl">{t({ en: "Clear legal guidance, in your language.", sw: "Mwongozo wazi wa kisheria, kwa lugha yako." }, language)}</h1>
              <p className="rise mt-5 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">{t({ en: "Wakili Huduma Popote connects you with verified Tanzanian advocates for confidential advice by phone, video or WhatsApp.", sw: "Wakili Huduma Popote inakuunganisha na mawakili waliothibitishwa Tanzania kwa ushauri wa siri kupitia simu, video au WhatsApp." }, language)}</p>
              <div className="rise mt-7 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" onClick={() => setBooking("Any available advocate")}>{t({ en: "Book a consultation", sw: "Weka miadi ya ushauri" }, language)}<ArrowRight className="size-4" /></Button>
                <Button size="lg" variant="outline" asChild><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle className="size-4 text-primary" />WhatsApp · +255 754 200 118</a></Button>
              </div>
              <div className="rise mt-9 grid grid-cols-3 divide-x divide-foreground/10 border-y border-foreground/10">
                {[ ["48+", { en: "Verified advocates", sw: "Mawakili halali" }], ["1,240+", { en: "Cases handled", sw: "Kesi zilizosaidiwa" }], ["96%", { en: "Client satisfaction", sw: "Kuridhika kwa wateja" }] ].map(([stat, label]) => <div key={stat as string} className="px-3 py-4 first:pl-0"><p className="font-display text-xl font-extrabold sm:text-2xl">{stat as string}</p><p className="mt-1 font-mono text-[9px] uppercase leading-tight text-muted-foreground">{t(label as Copy, language)}</p></div>)}
              </div>
            </div>
            <div className="lg:col-span-5">
              <QuickBooking language={language} onBook={() => setBooking("Any available advocate")} />
            </div>
          </section>

          <section id="services" className="border-y border-foreground/10 bg-surface/30 py-16">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
              <SectionTitle marker="(a)" eyebrow={t({ en: "Consultation services", sw: "Huduma za ushauri" }, language)} title={t({ en: "Choose how you want to talk", sw: "Chagua namna ya kuzungumza" }, language)} />
              <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
                {services.map((service) => <article key={service.title.en} className="bg-background p-5"><service.icon className="size-5 text-primary" /><h3 className="mt-5 font-display text-base font-bold">{t(service.title, language)}</h3><p className="mt-2 min-h-14 text-sm leading-relaxed text-muted-foreground">{t(service.text, language)}</p><p className="mt-5 font-mono text-[10px] uppercase text-muted-foreground">{t({ en: "From", sw: "Kuanzia" }, language)} <span className="text-foreground">{service.price}</span></p></article>)}
              </div>
            </div>
          </section>

          <section id="directory" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <SectionTitle marker="(b)" eyebrow={t({ en: "Advocate directory", sw: "Orodha ya mawakili" }, language)} title={t({ en: "Find the right legal specialist", sw: "Pata mtaalamu sahihi wa sheria" }, language)} />
            <div className="mt-7 grid gap-3 rounded-lg border border-border bg-surface/55 p-3 backdrop-blur-xl md:grid-cols-4">
              <label className="relative md:col-span-1"><Search className="absolute left-3 top-3 size-4 text-muted-foreground" /><span className="sr-only">Search</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t({ en: "Name or specialty", sw: "Jina au utaalamu" }, language)} className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></label>
              <FilterSelect value={field} onChange={setField} options={specialties.map((s) => s.en)} labels={Object.fromEntries(specialties.map((s) => [s.en, t(s, language)]))} ariaLabel="Legal field" />
              <FilterSelect value={location} onChange={setLocation} options={["All locations", "Dar es Salaam", "Arusha"]} labels={{ "All locations": t({ en: "All locations", sw: "Maeneo yote" }, language) }} ariaLabel="Location" />
              <FilterSelect value={lawyerLanguage} onChange={setLawyerLanguage} options={["All languages", "English", "Kiswahili"]} labels={{ "All languages": t({ en: "All languages", sw: "Lugha zote" }, language) }} ariaLabel="Language" />
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase text-muted-foreground">{filteredLawyers.length} {t({ en: "advocates available", sw: "mawakili wanapatikana" }, language)}</p>
            <div className="mt-4 grid gap-5 lg:grid-cols-3">
              {filteredLawyers.map((lawyer) => <article key={lawyer.name} className="flex flex-col rounded-lg border border-foreground/10 bg-surface/60 p-4 backdrop-blur-xl"><div className="flex gap-4"><img src={lawyer.image} alt={`${lawyer.name}, verified Tanzanian advocate`} loading="lazy" width={768} height={768} className="size-20 shrink-0 rounded-md object-cover" /><div className="min-w-0"><div className="flex items-center gap-1 text-primary"><BadgeCheck className="size-4" /><span className="font-mono text-[9px] uppercase">TLS verified</span></div><h3 className="mt-1 truncate font-display text-base font-bold">{lawyer.name}</h3><p className="mt-1 text-xs text-muted-foreground">{t(lawyer.specialty, language)}</p></div></div><p className="mt-4 min-h-14 text-sm leading-relaxed text-muted-foreground">{t(lawyer.description, language)}</p><div className="mt-4 grid grid-cols-2 gap-2 border-y border-border py-3 text-xs text-muted-foreground"><span className="flex items-center gap-1"><BriefcaseBusiness className="size-3.5" />{lawyer.years} {t({ en: "years", sw: "miaka" }, language)}</span><span className="flex items-center gap-1"><Star className="size-3.5 fill-current text-primary" />{lawyer.rating} ({lawyer.reviews})</span><span className="flex items-center gap-1"><MapPin className="size-3.5" />{lawyer.location}</span><span className="flex items-center gap-1"><Languages className="size-3.5" />EN / SW</span></div><div className="mt-4 flex items-end justify-between gap-3"><div><p className="font-mono text-[9px] uppercase text-muted-foreground">{t({ en: "Consultation", sw: "Ushauri" }, language)}</p><p className="mt-1 text-sm font-semibold">TZS {lawyer.tzs} <span className="text-xs font-normal text-muted-foreground">/ ${lawyer.usd}</span></p></div><Button variant="urgent" size="sm" onClick={() => setBooking(lawyer.name)}>{t({ en: "Book", sw: "Weka miadi" }, language)}<ArrowRight className="size-3.5" /></Button></div></article>)}
            </div>
          </section>

          <section id="faq" className="border-y border-foreground/10 bg-surface/30 py-16">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
              <SectionTitle marker="(c)" eyebrow={t({ en: "Legal Q&A / Resources", sw: "Maswali na majibu ya sheria" }, language)} title={t({ en: "Straight answers to common questions", sw: "Majibu rahisi kwa maswali ya kawaida" }, language)} />
              <div className="mt-7 max-w-3xl"><label className="relative block"><Search className="absolute left-3 top-3 size-4 text-muted-foreground" /><span className="sr-only">Search legal questions</span><input value={faqSearch} onChange={(e) => setFaqSearch(e.target.value)} placeholder={t({ en: "Search land, inheritance, employment…", sw: "Tafuta ardhi, mirathi, ajira…" }, language)} className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></label><div className="mt-5 divide-y divide-border border-y border-border">{filteredFaqs.map((faq, index) => <div key={faq.q.en}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5 text-left"><span className="min-w-0 font-semibold">{t(faq.q, language)}</span><ChevronDown className={cn("size-4 shrink-0 transition-transform", openFaq === index && "rotate-180")} /></button>{openFaq === index && <p className="max-w-2xl pb-5 text-sm leading-relaxed text-muted-foreground">{t(faq.a, language)}</p>}</div>)}</div></div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <SectionTitle marker="(d)" eyebrow={t({ en: "Trust & confidentiality", sw: "Uaminifu na usiri" }, language)} title={t({ en: "Legal help you can rely on", sw: "Msaada wa sheria unaoaminika" }, language)} />
            <div className="mt-8 grid gap-5 md:grid-cols-2"><blockquote className="rounded-lg border border-foreground/10 bg-surface/55 p-5"><p className="text-sm leading-relaxed">“{t({ en: "I finally understood my tenancy dispute in Kiswahili. The whole booking took five minutes.", sw: "Hatimaye nilielewa mgogoro wangu wa upangaji kwa Kiswahili. Kuweka miadi kulichukua dakika tano." }, language)}”</p><footer className="mt-4 font-mono text-[10px] uppercase text-muted-foreground">Neema K. · Arusha</footer></blockquote><blockquote className="rounded-lg border border-foreground/10 bg-surface/55 p-5"><p className="text-sm leading-relaxed">“{t({ en: "Discreet and fast. I paid by M-Pesa and spoke to an advocate that afternoon.", sw: "Huduma ya siri na ya haraka. Nililipa kwa M-Pesa na kuzungumza na wakili alasiri hiyo." }, language)}”</p><footer className="mt-4 font-mono text-[10px] uppercase text-muted-foreground">Hassan M. · Dar es Salaam</footer></blockquote></div>
            <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{[[ShieldCheck,{en:"Private by design",sw:"Usiri umehakikishwa"}],[BadgeCheck,{en:"TLS compliant",sw:"Inafuata kanuni za TLS"}],[Clock3,{en:"Mon–Sat support",sw:"Msaada Jumatatu–Jumamosi"}],[MapPin,{en:"Dar es Salaam office",sw:"Ofisi Dar es Salaam"}]].map(([Icon,label]) => { const TrustIcon = Icon as typeof ShieldCheck; return <div key={(label as Copy).en} className="flex items-center gap-3 bg-background p-4"><TrustIcon className="size-5 text-primary" /><span className="text-sm font-semibold">{t(label as Copy,language)}</span></div>; })}</div>
          </section>
        </main>

        <footer className="border-t border-foreground/10 bg-surface/40">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3 sm:px-8"><div><div className="flex items-center gap-2"><span className="grid size-8 place-items-center rounded-md bg-primary font-display text-xs font-extrabold text-primary-foreground">W</span><p className="font-display text-sm font-extrabold">Wakili Huduma Popote</p></div><p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-muted-foreground">{t({ en: "Confidential, professional legal help wherever you are.", sw: "Msaada wa kisheria wa siri na kitaaluma popote ulipo." }, language)}</p></div><div className="text-sm leading-relaxed text-muted-foreground"><p className="font-mono text-[10px] uppercase text-foreground">{t({ en: "Office & hours", sw: "Ofisi na muda" }, language)}</p><p className="mt-2">Samora Avenue, Dar es Salaam<br />Mon–Fri 8:00–18:00 · Sat 9:00–14:00</p></div><div className="text-sm leading-relaxed text-muted-foreground"><p className="font-mono text-[10px] uppercase text-foreground">{t({ en: "Direct contact", sw: "Mawasiliano" }, language)}</p><p className="mt-2">+255 754 200 118<br />msaada@wakilihudumapopote.co.tz</p></div></div><p className="border-t border-foreground/5 px-5 py-4 text-center font-mono text-[9px] uppercase text-muted-foreground">© 2026 Wakili Huduma Popote · {t({ en: "Independent legal consultation platform", sw: "Jukwaa huru la ushauri wa kisheria" }, language)}</p>
        </footer>
      </div>
      {booking && <BookingModal lawyer={booking} language={language} onClose={() => setBooking(null)} />}
    </div>
  );
}

function SectionTitle({ marker, eyebrow, title }: { marker: string; eyebrow: string; title: string }) {
  return <div><p className="font-mono text-[10px] uppercase text-primary">{marker} {eyebrow}</p><h2 className="mt-2 max-w-2xl font-display text-2xl font-extrabold text-balance sm:text-3xl">{title}</h2></div>;
}

function FilterSelect({ value, onChange, options, labels, ariaLabel }: { value: string; onChange: (value: string) => void; options: string[]; labels: Record<string,string>; ariaLabel: string }) {
  return <label className="relative"><span className="sr-only">{ariaLabel}</span><select aria-label={ariaLabel} value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-full appearance-none rounded-md border border-input bg-background px-3 pr-8 text-sm outline-none focus:ring-2 focus:ring-ring">{options.map((option) => <option key={option} value={option}>{labels[option] ?? option}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-3 size-4 text-muted-foreground" /></label>;
}

function QuickBooking({ language, onBook }: { language: Language; onBook: () => void }) {
  const [channel, setChannel] = useState("Phone");
  const [day, setDay] = useState("Tue");
  return <div id="booking" className="rounded-xl border border-surface/80 bg-surface/65 p-5 shadow-xl backdrop-blur-2xl"><div className="flex items-center justify-between border-b border-foreground/10 pb-3"><p className="font-mono text-[10px] uppercase text-muted-foreground">{t({ en: "Quick booking", sw: "Miadi ya haraka" }, language)}</p><span className="font-mono text-[10px] text-primary">01 / 04</span></div><p className="mt-5 font-display text-lg font-bold">{t({ en: "How should we connect?", sw: "Tuungane kwa njia gani?" }, language)}</p><div className="mt-4 grid grid-cols-2 gap-2">{["Video", "Phone", "WhatsApp", "Document"].map((item) => <Button key={item} variant={channel === item ? "default" : "outline"} onClick={() => setChannel(item)} className="justify-start">{item}</Button>)}</div><p className="mt-5 font-mono text-[10px] uppercase text-muted-foreground">{t({ en: "Choose a day", sw: "Chagua siku" }, language)}</p><div className="mt-2 grid grid-cols-3 gap-2">{["Mon", "Tue", "Wed"].map((item) => <Button key={item} variant={day === item ? "default" : "outline"} onClick={() => setDay(item)}>{item}</Button>)}</div><Button onClick={onBook} className="mt-4 w-full">{t({ en: "Continue", sw: "Endelea" }, language)}<ChevronRight className="size-4" /></Button><p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-4 text-primary" />{t({ en: "Your details stay confidential.", sw: "Maelezo yako yanabaki siri." }, language)}</p></div>;
}

function BookingModal({ lawyer, language, onClose }: { lawyer: string; language: Language; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [channel, setChannel] = useState("Phone / Audio");
  const [date, setDate] = useState("2026-09-14");
  const [time, setTime] = useState("10:00");
  const [details, setDetails] = useState("");
  const [payment, setPayment] = useState("M-Pesa");
  const [done, setDone] = useState(false);
  const channels = ["Phone / Audio", "Video Conference", "WhatsApp", "Document Review"];
  const payments = ["M-Pesa", "Tigo Pesa", "Airtel Money", "Card"];
  return <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/45 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(e) => { if (e.currentTarget === e.target) onClose(); }}><div role="dialog" aria-modal="true" aria-labelledby="booking-title" className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-lg bg-background shadow-2xl"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border p-5"><div className="min-w-0"><p className="font-mono text-[10px] uppercase text-primary">Wakili Huduma Popote</p><h2 id="booking-title" className="mt-1 truncate font-display text-xl font-extrabold">{done ? t({ en: "Booking received", sw: "Ombi la miadi limepokelewa" }, language) : t({ en: "Reserve a consultation", sw: "Weka miadi ya ushauri" }, language)}</h2></div><Button variant="ghost" size="icon" onClick={onClose} aria-label="Close booking"><X className="size-5" /></Button></div>{done ? <div className="p-8 text-center"><span className="mx-auto grid size-14 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-7" /></span><h3 className="mt-5 font-display text-xl font-bold">{t({ en: "Your request is confirmed", sw: "Ombi lako limethibitishwa" }, language)}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t({ en: "This is a simulated booking. In a live service, payment instructions and advocate details would be sent to you securely.", sw: "Huu ni mfano wa miadi. Kwenye huduma halisi, maelekezo ya malipo na mawasiliano ya wakili yangetumwa kwako kwa usalama." }, language)}</p><Button onClick={onClose} className="mt-6">{t({ en: "Done", sw: "Sawa" }, language)}</Button></div> : <><div className="px-5 pt-5"><div className="flex gap-2">{[1,2,3,4].map((item) => <span key={item} className={cn("h-1.5 flex-1 rounded-full", item <= step ? "bg-primary" : "bg-muted")} />)}</div><p className="mt-3 font-mono text-[10px] uppercase text-muted-foreground">{t({ en: `Step ${step} of 4`, sw: `Hatua ${step} kati ya 4` }, language)} · {lawyer}</p></div><div className="p-5">{step === 1 && <ChoiceGrid title={t({ en: "Choose consultation channel", sw: "Chagua njia ya ushauri" }, language)} items={channels} selected={channel} onSelect={setChannel} />}{step === 2 && <div><h3 className="font-display text-lg font-bold">{t({ en: "Choose date and time", sw: "Chagua tarehe na saa" }, language)}</h3><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold"><span className="mb-2 block">{t({ en: "Date", sw: "Tarehe" }, language)}</span><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-11 w-full rounded-md border border-input bg-background px-3" /></label><label className="text-sm font-semibold"><span className="mb-2 block">{t({ en: "Available time", sw: "Saa inayopatikana" }, language)}</span><select value={time} onChange={(e) => setTime(e.target.value)} className="h-11 w-full rounded-md border border-input bg-background px-3"><option>09:00</option><option>10:00</option><option>14:30</option><option>16:00</option></select></label></div></div>}{step === 3 && <div><h3 className="font-display text-lg font-bold">{t({ en: "Tell us briefly about your matter", sw: "Tueleze kwa ufupi kuhusu suala lako" }, language)}</h3><p className="mt-2 text-sm text-muted-foreground">{t({ en: "Do not include highly sensitive evidence. You can share it securely with your advocate later.", sw: "Usiweke ushahidi nyeti sana. Utaweza kuushiriki kwa usalama na wakili baadaye." }, language)}</p><textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={5} placeholder={t({ en: "Example: I need advice about an inherited property…", sw: "Mfano: Nahitaji ushauri kuhusu mali ya mirathi…" }, language)} className="mt-4 w-full resize-none rounded-md border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></div>}{step === 4 && <ChoiceGrid title={t({ en: "Choose payment method", sw: "Chagua njia ya malipo" }, language)} items={payments} selected={payment} onSelect={setPayment} />}<div className="mt-7 flex gap-3"><Button variant="outline" onClick={() => step === 1 ? onClose() : setStep(step - 1)}><ChevronLeft className="size-4" />{t({ en: step === 1 ? "Cancel" : "Back", sw: step === 1 ? "Ghairi" : "Rudi" }, language)}</Button><Button className="flex-1" disabled={step === 3 && !details.trim()} onClick={() => step === 4 ? setDone(true) : setStep(step + 1)}>{step === 4 ? t({ en: "Confirm simulated payment", sw: "Thibitisha malipo ya mfano" }, language) : t({ en: "Continue", sw: "Endelea" }, language)}<ChevronRight className="size-4" /></Button></div></div></>}</div></div>;
}

function ChoiceGrid({ title, items, selected, onSelect }: { title: string; items: string[]; selected: string; onSelect: (value: string) => void }) {
  const icons = [Headphones, Video, MessageCircle, FileCheck2, Phone, Phone, Phone, BriefcaseBusiness];
  return <div><h3 className="font-display text-lg font-bold">{title}</h3><div className="mt-5 grid grid-cols-2 gap-3">{items.map((item,index) => { const Icon = icons[index] ?? CalendarDays; return <button key={item} onClick={() => onSelect(item)} className={cn("min-h-24 rounded-md border p-4 text-left transition-colors", selected === item ? "border-primary bg-accent" : "border-border bg-surface hover:border-primary/50")}><Icon className="size-5 text-primary" /><span className="mt-3 block text-sm font-semibold">{item}</span></button>; })}</div></div>;
}