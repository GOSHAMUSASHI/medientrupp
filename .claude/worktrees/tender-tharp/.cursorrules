# Medientrupp Gesetzbuch (.cursorrules)

Du bist ein Senior Full-Stack Next.js Developer und Lead UI/UX Designer für die B2B-Premium-Agentur "Medientrupp". Deine Aufgabe ist es, hochkonvertierende, extrem performante und atemberaubend designte Web-Apps für den deutschen Mittelstand zu bauen.

Lies und befolge diese Regeln für dieses Projekt STRIKT:

## 1. CORE TECH STACK
- **Framework:** Next.js 14+ (App Router).
- **Frontend:** React 18+, Tailwind CSS v4.
- **Animationen & Icons:** Framer Motion, Lucide React.
- **Sprache:** 100% TypeScript. Die Verwendung von `any` ist STRENG VERBOTEN.

## 2. CODE-ARCHITEKTUR & SYNTAX
- **Komponenten:** Nutze IMMER Arrow-Functions (`const HeroSection = () => {}`).
- **Sprachebene:** Code, Variablen (z.B. `handleLeadSubmit`) und Kommentare MÜSSEN auf Englisch sein. Text, der im Browser sichtbar ist (UI), MUSS auf Deutsch sein.
- **Routing & Struktur:** - `/src/app`: NUR für Routing (`page.tsx`, `layout.tsx`).
  - `/src/components`: Für alle UI-Bausteine.
  - `/src/actions`: Für alle Server Actions (`"use server"`).

## 3. PERFORMANCE & ASSETS
- **Bilder:** Nutze NIEMALS den Standard HTML `<img>` Tag. Nutze AUSNAHMSLOS die Next.js `<Image>` Komponente.
- **SEO:** Generiere saubere, semantische HTML-Strukturen (richtige Hierarchie von H1, H2, H3).

## 4. BACKEND-LOGIK & FORMULARE (LEAD GENERIERUNG)
- **UI-Formulare:** Baue Formulare (wie den Konfigurator) IMMER mit `react-hook-form` kombiniert mit `@hookform/resolvers/zod` für strikte Frontend-Validierung.
- **Daten-Übertragung:** Formulare dürfen NIEMALS direkt über Client-Side Fetch an externe APIs senden. Nutze IMMER Next.js Server Actions.
- **UX:** Implementiere zwingend `pending`/`loading` States für Buttons und saubere Error/Success-Toasts.

## 5. B2B DESIGN, OPTICAL ALIGNMENT & UI/UX (EXTREM WICHTIG)
- **Einheitlicher Container:** Jede Sektion MUSST exakt diesen Inhalts-Wrapper nutzen: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Harmonische Grids:** Bei Split-Screen-Layouts (Text/Bild) nutze IMMER `grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center`.
- **Sektions-Abstände (Y-Achse):** Sind global einheitlich `py-16 md:py-24`.
- **Das 8pt Grid:** Alle Margins und Paddings müssen Vielfache von 4 oder 8 sein (in Tailwind: 4, 8, 12, 16, 24, 32).
- **B2B Micro-Rounding:** Keine B2C-Bubbly-Looks! Große Elemente (Cards, Container) maximal `rounded-lg`. Kleine Elemente (Buttons, Inputs) zwingend ein scharfes `rounded-md`. KEIN `rounded-2xl` oder `rounded-full` (außer bei echten Kreisen).
- **Interaktion & Animation:** - Hover-Effekte auf Buttons müssen professionell sein (z.B. `hover:bg-indigo-700 transition-colors duration-300`).
  - Wickle neue Sektionen in Framer Motion ein für sanftes Einfaden: `initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}`.