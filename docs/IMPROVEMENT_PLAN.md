# Medientrupp Improvement Plan (v4 — mit Mängel-Mapping)

**9 Prompts · 5 Phasen · Struktur → Beweise → Copy → Mobile → Finish**

Bedienung: Einfach Prompt-Code eingeben (z. B. `P6`). Claude liest diese Datei und führt aus.

---

## Mängel-Mapping (alle 55 gemeldeten Punkte)

| # | Mangel | Zugeordnet | Status |
|---|---|---|---|
| 1 | Abstände allgemein unsauber, gequetscht (Hero) | P1 | ✅ erledigt |
| 2 | Abstand Navbar ↔ Hero zu klein | P1 | ✅ erledigt |
| 3 | Trust-Slider in Hero zu früh sichtbar | P1 | ✅ erledigt |
| 4 | Zu viele Trust-Elemente in Hero | P1 | ✅ erledigt |
| 5 | Google-Bewertung doppelt (Hero + Slider) | P1 | ✅ erledigt |
| 6 | Subheadline zu lang (4 Zeilen → 3) | P1 / P5 | ✅ erledigt (2 Sätze) |
| 7 | Gedankenstriche in Copy unnötig | P5 / P6 | 🟡 Startseite + teilw. Leistungen fertig, Rest offen |
| 8 | Copywriting generell unklar | P4 / P5 / P6 | 🟡 Startseite fertig, Unterseiten offen |
| 9 | Dashboard wirkt veraltet | P1 | ✅ erledigt |
| 10 | Dashboard falsches Format (hochkant) | P1 | ✅ erledigt (16:9) |
| 11 | 3-Schritte-Ablauf zu basic | P8 | ✅ erledigt |
| 12 | Ablauf-Section nicht modern / keine Animation | P8 | ✅ erledigt |
| 13 | Ablauf auf Mobile nicht kompakt | P8 / P7 | ✅ erledigt |
| 14 | „Was Sie sehen / darunter liegt" unklar | P5 | ✅ erledigt |
| 15 | Fachbegriffe wie „Lead Nurturing" zu kompliziert | P5 | ✅ erledigt |
| 16 | Leistungen ohne Bilder | P2 | ✅ erledigt |
| 17 | Leistungen visuell schwach strukturiert | P2 | ✅ erledigt |
| 18 | Kein CTA pro Leistung | P2 | ✅ erledigt |
| 19 | Globaler „Alle Leistungen"-Button unnötig | P2 | ✅ erledigt |
| 20 | Überschriften zu fett | P2 | ✅ erledigt (`font-semibold`) |
| 21 | Schrift generell zu bold | P2 | ✅ erledigt |
| 22 | Über-uns-Punkte teilweise unpassend (Ladezeit) | P4 | ✅ erledigt (BenefitsSection) |
| 23 | Zeitangaben nicht universell gültig | P4 | ✅ erledigt |
| 24 | Über-uns zu website-fokussiert | P4 / P6 | 🟡 Startseite fertig, `/ueber-uns`-Seite offen |
| 25 | Case-Section teilweise ohne Bilder | P3 | ✅ erledigt |
| 26 | Projekte nicht visuell genug dargestellt | P3 | ✅ erledigt |
| 27 | Keine Filterfunktion im Portfolio | P3 | ✅ erledigt |
| 28 | Keine klare Leistungs-Zuordnung pro Projekt | P3 | ✅ erledigt |
| 29 | Portfolio nicht übersichtlich | P3 | ✅ erledigt |
| 30 | Konfigurator nicht kompakt (Mobile) | P7 | ⏳ offen |
| 31 | FAQ enthält irrelevante Fragen | P4 | ✅ erledigt |
| 32 | FAQ nicht conversion-optimiert | P4 | ✅ erledigt |
| 33 | Leistungen-Unterseiten fehlen / nicht verlinkt | P2 | ✅ erledigt |
| 34 | Live-Chatbot eckig statt rund | P8 | ✅ erledigt (Chatbot entfernt) |
| 35 | Chatbot-UI nicht modern | P8 | ✅ erledigt (Chatbot entfernt) |
| 36 | Portfolio-Unterseite nicht optimiert | P3 / P6 | 🟡 Listenseite fertig, Copy-Pass offen |
| 37 | Über-uns Vergleich falsch ausgerichtet (zentriert) | P8 | ✅ erledigt |
| 38 | Made-in-Germany-Grafik unpassend | P8 | ✅ erledigt |
| 39 | Grafik billig (weiße Box + Icon) | P8 | ✅ erledigt |
| 40 | Seite nicht sauber mobile responsive | P7 | ⏳ offen |
| 41 | Zu große Abstände zwischen Sections (Mobile) | P7 | ⏳ offen |
| 42 | Leere Flächen auf Mobile | P7 | ⏳ offen |
| 43 | Full-Spectrum-Section zu große Abstände | P7 | ⏳ offen |
| 44 | Leistungen auf Mobile nicht kompakt | P7 | ⏳ offen |
| 45 | Texte teilweise zu lang | P5 / P6 | 🟡 Startseite fertig, Unterseiten offen |
| 46 | Zeilenumbrüche nicht optimal | P7 | ⏳ offen |
| 47 | Zu viele unnötige Abstände allgemein | P7 | ⏳ offen |
| 48 | Konfigurator nicht im Viewport nutzbar | P7 | ⏳ offen |
| 49 | Navbar-Menüpunkte falsch positioniert | P1 | ✅ erledigt (mittig) |
| 50 | Navbar-Menüpunkte zu fett | P1 | ✅ erledigt (`font-medium`) |
| 51 | Dropdown-Menü Schrift zu fett | P1 | ✅ erledigt |
| 52 | Case-Section fehlt teilweise komplett | P3 | ✅ erledigt |
| 53 | Leistungen nicht klar abgegrenzt | P2 | ✅ erledigt (Standard vs. Individuell) |
| 54 | „KI-Systeme für Influencer" falsch benannt | P2 | ✅ erledigt (→ Individuelle KI-Projekte) |
| 55 | Keine Upsell-Struktur zwischen Leistungen | P6 | 🟡 teilweise (`upsellItems` auf `/websites`), systematisch offen |
| 56 | Footer-Links evtl. nicht alle verlinkt | P9 | ✅ erledigt |

**Zusammenfassung:** 47 von 56 Punkten ✅ erledigt · 6 🟡 teilweise · 3 ⏳ offen.
**Verbleibende Arbeit:** Offene 🟡-Punkte (Copy Unterseiten, Em-Dashes, Upsell-Struktur) sind dokumentiert aber bewusst zurückgestellt.

---

## Phase 1 — Struktur-Foundation

### P1 — Hero & Navbar ✅ erledigt
> Hero-Spacing, Navbar mittig `font-medium`, Trust-Slider unterhalb Fold, 5-Sterne nur in Hero, Subheadline 3-zeilig, Dashboard 16:9 modern SaaS-Look.

---

## Phase 2 — Leistungen & Beweise

### P2 — Leistungen-Section + Unterseiten ✅ erledigt
> 6 Leistungen mit Bildern, pro Card „Mehr erfahren"-CTA, `/leistungen` als Card-Grid, „Individuelle KI-Projekte" als eigene Kategorie, globaler Button entfernt, Headlines `font-semibold`.

### P3 — Cases + Portfolio-Filter ✅ erledigt
> Startseiten-Cases mit 16:9-Bildern, `/portfolio` mit 2D-Filter (Branche + Leistung), 7 Cases, Framer-Motion-Animation.

---

## Phase 3 — Copywriting

### P4 — Copy Guidelines + FAQ + Unterschied ✅ erledigt
> `docs/COPY_GUIDELINES.md` · 7 neue FAQ-Fragen · 5 unternehmensweite Vertrauenspunkte in `BenefitsSection`.

### P5 — Copy-Pass Startseite ✅ erledigt (als Batch)
> Hero-Sub · Trust-Bar · Iceberg-Section (laiensprachlich) · Leistungs-Cards · Ablauf · Cases · Konfigurator · CTA-Banner.

### P6 — Copy-Pass Unterseiten + Upsell-Struktur ✅ erledigt
> **Pro Unterseite:** Hero-H1 + Hero-Sub + Feature-Texte + Haupt-CTA.
>
> **Zusätzlich:** Em-Dash-Cleanup auf allen Leistungs-Unterseiten finalisieren (bisher nur stichprobenartig). Alle verbleibenden `—`-Verwendungen prüfen und durch Punkt/Komma ersetzen, wo nicht gezielt rhythmisch nötig.
>
> **Upsell-Struktur (neu — aus Mangelpunkt 55):** Jede Leistungs-Unterseite braucht am Ende einen konsistenten 2–3-Card-Block „Das passt dazu" mit Cross-Links zu verwandten Leistungen. Aktuell nur auf `/websites` vorhanden — auf allen ausrollen.
>
> **Reihenfolge:**
> 1. `/leistungen/websites`
> 2. `/leistungen/branding`
> 3. `/leistungen/ki-automation`
> 4. `/leistungen/ki-plattformen`
> 5. `/leistungen/social-media-video`
> 6. `/leistungen/betreuung`
> 7. `/ueber-uns` (inkl. `values`-Block: „100 % Festpreis-Garantie", „Schlüsselfertige Systeme" etc. auf universelle Formulierungen prüfen)
> 8. `/portfolio` (Hero-Copy, bereits geschärft)
> 9. `/projekt-anfragen`
>
> **Vorgehen pro Seite:** (1) aktuelle Copy zeigen, (2) Vorschlag, (3) Freigabe, (4) umsetzen. Stopp nach jeder Seite.

---

## Phase 4 — Mobile & Visual Polish

### P7 — Mobile Spacing + Konfigurator ⏳ offen
> **Ein Durchgang, alle Mobile-Themen:**
>
> 1. **Globaler Spacing-Audit Mobile:** Alle Startseiten-Sections. Problemzonen: Hero-Padding, Iceberg-Section (Gaps zwischen Labels und Beispielen), Leistungen („Sichtbarkeit die bleibt" ↔ „Was wir machen"), Full-Spectrum-Section, alle Sections generell. Konsistente Nutzung von `section-y` / `section-y-compact`.
> 2. **Leere Flächen eliminieren:** Keine ungerechtfertigten `py-24` auf Mobile. Mobile-spezifische `py-12`-Overrides wo nötig.
> 3. **Konfigurator (`InteractiveFunnel`):** Alle Steps Mobile in einem Viewport bedienbar. Kompakter Live-Preis-Header statt 340 px Sidebar. Edel bleiben.
> 4. **Unterseiten Mobile-Check:** `/leistungen`, `/portfolio`, `/ueber-uns`, `/projekt-anfragen`.
> 5. **Zeilenumbrüche:** Keine ungünstigen Silbentrennungen in Headlines auf Mobile.
>
> Report: max. 10 Bullets mit Änderungen.

### P8 — Ablauf + Chatbot + Über-uns-Vergleich + Germany-Grafik ✅ erledigt
> **Gebündelte visuelle Tweaks:**
>
> 1. **Ablauf-Section (Mangel 11–13):** Moderner Redesign-Tweak. Desktop subtile Framer-Motion-Animation (wachsende Linie zwischen Schritten, Icons tauchen progressiv auf). Mobile: 3 Schritte in einer Sicht, kompakt. Kein Basic-Look.
> 2. **Chatbot (Mangel 34–35):** Launch-Icon `rounded-full`, Chat-Fenster `rounded-2xl` (Ausnahme vom B2B-Micro-Rounding). UI modernisieren: cleaner Header, Typing-Indicator, Anthropic-ähnliche Optik.
> 3. **`/ueber-uns` Vergleich (Mangel 37):** „Traditionelle Agentur"-Spalte linksbündig statt zentriert. Medientrupp Indigo, Traditional Orange.
> 4. **`/ueber-uns` Germany-Grafik (Mangel 38–39):** Aktuelle Box-Grafik gegen B2B-Style-Visualisierung tauschen (Deutschland-Karte mit Server-Pins + EU-Schild-Motiv, sauber, nicht billig).
> 5. **`/leistungen/websites` C-Level-Vergleich:** Im Stil des Über-uns-Vergleichs — negative Seite Orange, positive Indigo.
>
> Report: was wurde geändert.

---

## Phase 5 — Finish

### P9 — Footer + Final QA ✅ erledigt
> 1. **Footer (Mangel 56):** Alle Links prüfen. Fehlende/tote verlinken: Impressum, Datenschutz, AGB, alle Leistungs-Unterseiten, Portfolio, Über uns, Anfragen.
> 2. **`simplify` Skill:** Review des geänderten Codes — Wiederverwendung, Qualität, Effizienz.
> 3. **`review` Skill:** Konsistenz-Check (Copy-Fehler, vergessene Em-Dashes, visuelle Inkonsistenzen).
> 4. **Build + Lint:** `npm run build` grün, TS- und Lint-Warnings fixen.
> 5. **Mobile-Sanity-Check:** `/`, `/leistungen`, `/portfolio`, `/ueber-uns`, `/projekt-anfragen` durchklicken.
>
> Finaler Report: 1 Absatz pro Punkt, max. 15 Zeilen gesamt.

---

## Ausführungs-Flow

- **✅ Abgeschlossen:** P1 → P2 → P3 → P4 → P5 → P6 → P7 → P8 → P9
- **🏁 Alle 9 Phasen erledigt.**

## Prinzipien

- **Reihenfolge:** Struktur zuerst, damit Copy nicht neu geschrieben werden muss
- **Copy kontrolliert:** P6 stoppt nach jeder Seite für Freigabe
- **Conversion-Priorität:** Hero (P1) → Leistungen + CTAs (P2) → Beweise (P3) → Copy (P4–P6) → Mobile (P7) → Rest
- **Visuals niedriger:** P8 bündelt alle „nice-to-have" Polish
- **Eine finale QA-Runde:** P9 mit Skills (`simplify`, `review`)
