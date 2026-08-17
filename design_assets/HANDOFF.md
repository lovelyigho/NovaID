# NovaID (NICRS) — Design Handoff

Fourteen designed screens plus a token sheet, built from **NovaID PRD v1.1** and **NovaID User Story Suite** (NID-US-001). Every screen is a self-contained HTML file that opens in a browser.

This document is the specification. The HTML files are the visual reference. Read both before building.

---

## 1. How to use this with Google Antigravity

1. Put this folder in the working directory Antigravity has access to.
2. Give it three inputs together:
   - **`NovaID_PRD_v1.1.pdf`** — what to build (functional requirements, roles, journeys).
   - **`NovaID_User_Story_Suite.pdf`** — how it must behave (preconditions, process flow, acceptance criteria, error paths).
   - **This folder** — what it looks like (tokens below, plus the HTML screens).
3. Instruct it to build **components**, not to transcribe the HTML. The designs use inline styles deliberately, which is correct for design work and wrong for an application. Section 3 and 4 below are what it should implement.
4. Target stack per PRD 13.7: **Next.js frontend + Firebase/Firestore-style backend**.

**The risk to manage:** an agentic build drifts from the design unless the token set is enforced. Tell it explicitly that no colour, radius, font size or weight outside Section 3 may be introduced.

---

## 2. Screen map

| Screen | Role | PRD |
| --- | --- | --- |
| Staff Sign-In | All staff and institutional users | 7.10, 10; Story Suite §1 |
| Staff Provisioning | National / Regional Administrator, invitee | 6, 10; Story Suite §1 |
| Birth Registration | Registration Officer | 7.1, 7.2, 7.4, 8.1, 13.5 |
| Verification Queue | Verification Officer | 7.2, 7.3, 7.4, 22.2 |
| Duplicate Review | Duplicate Review Officer | 7.14, 8.5, 22.3 |
| Correction Review | Verification Officer, Senior Approver | 7.13, 8.4 |
| Death Registration | Senior Approver | 7.15, 8.6, 22.4 |
| Naturalization | Registration Officer | 7.5, 7.20, 8.3 |
| Identity Verification | Government Verification User | 7.11, 7.12 |
| Institution Access | National Administrator | 7.18, 9 |
| Centre Dashboard | Centre Administrator | 7.17, 12.3 |
| National Dashboard | National / Regional Administrator | 12.1, 12.2, 4 |
| Reports | Seven roles, filtered | 19, 12.4 |
| Citizen Self-Service | Citizen | 7.9, 7.16 |
| Log in with NovaID | Citizen | 7.10, 8.7, 22.5 |
| Design Tokens | — | reference sheet |

---

## 3. Design tokens

Exact values. Nothing outside this list.

### Ink
| Token | Value | Use |
| --- | --- | --- |
| ink | `#14232a` | Primary text |
| ink-muted | `#4f6a72` | Body secondary, breadcrumbs |
| ink-label | `#4f676e` | Field labels, overlines |
| ink-meta | `#5a7178` | Monospace metadata |
| ink-disabled | `#90a7ad` | Disabled control text |

### Accent and semantic
| Token | Base | Deep | Tint |
| --- | --- | --- | --- |
| accent | `#1f8a86` | `#14615e` | `#dff1ee` |
| success | `#35946c` | `#24685a` | `#e2f1e8` |
| attention | `#c98a1e` | `#7a5312` | `#fbeeda` |
| critical | `#b04545` | `#8d3232` | `#f4e6e6` |

Data series: `#4a9ec9`, `#6f6ab8`, `#8d8ab0`, `#5aa8a4`.

**Semantic colour carries meaning and is never decorative.** Attention = a field that differs, an exception, or a deadline in reach. Critical = a blocked action or paused issuance. Success = a completed check, never a pending one.

### Surfaces
| Surface | Spec |
| --- | --- |
| Page (console) | `linear-gradient(135deg, #e9f4f1 0%, #f2f5fb 46%, #f7f1f7 100%)` |
| Page (citizen) | `#eaf3f3` + three radial washes (mint 8%/-6%, lavender 96%/4%, blue 62%/108%) |
| Nav rail | `linear-gradient(180deg, #123035, #10262c)` |
| Officer card | `rgba(255,255,255,0.78)`, blur 18, radius 20 |
| Citizen card | white-to-mint gradient at 0.62, blur 24, radius 22 |
| Metric tile | tinted gradient at 0.9→0.68, no blur, radius 17 |
| Card border | `inset 0 0 0 1px rgba(255,255,255,0.9)` |
| Card shadow | `0 16px 40px -22px rgba(16,45,52,0.26)` |

### Type
| Role | Font | Size / weight |
| --- | --- | --- |
| Page heading | Jost 500 | 30px, −0.2px |
| Section heading | Jost 500 | 16px |
| Metric figure | Jost 500 | 25–27px, −0.3px |
| Body | IBM Plex Sans 400 | 13.5px / 1.55 |
| Field label | IBM Plex Sans 500 | 11.5px |
| Overline | IBM Plex Sans 400 | 11px, uppercase, 0.9px |
| Identifiers, dates | IBM Plex Mono 400/500 | 12–13px |

Never below 11px. Slide/print minimums do not apply; this is screen UI.

### Geometry
- Radius: section 20–22, tile 17, control 10–13, pill 20.
- Spacing: page 26/32, card 19–24, field gap 14, stack gap 16–20.
- Layout: nav rail 244px (collapsed 76px), right rail 348–372px, citizen content max 1140px.
- **Min-width: 1280px for two-column consoles, 1600px for three-column** (nav + list + content: Verification Queue, Institution Access, Reports, Audit Log). Consoles scroll horizontally rather than compressing data columns.
- Focus ring: `0 0 0 3px rgba(31,138,134,0.12)` with `border-color: #1f8a86`.

---

## 4. Component inventory

Build these once. Every screen composes them.

| Component | States / props |
| --- | --- |
| `AppShell` | collapsible nav rail (icon toggle, 244/76px), role-driven nav items, user chip |
| `PageHeader` | breadcrumb, status pill cluster, right-side meta or period control |
| `StatusPill` | success / accent / attention / critical / neutral; optional leading dot |
| `MetricTile` | label, value, note; note tone success / attention / critical / neutral |
| `RecordCompare` | label + N value columns; per-row match / mismatch tint; used by Duplicate Review and Correction Review |
| `FieldRow` | label, value, mono flag, lock flag, inline Update action |
| `EvidenceList` | item, meta, tag (Verified / Recorded / Flagged); opening an item is an audited event |
| `SystemChecks` | list of label + note + state dot (ok / warn / bad / info) |
| `DecisionPanel` | radio card set, required rationale, gate note, primary action disabled until valid |
| `QueueList` | filter chips with counts **derived from data**, selectable rows, age pill (red ≥5 days) |
| `Timeline` | activity entries: text + monospace actor/timestamp |
| `SegmentedControl` | period and mode switches |
| `Toggle` | connectivity / offline switch |
| `FilterBar` | search + selects + action (Audit Log, Reports) |
| `BarSeries` | column chart; zoomed axis for high-baseline series like availability |
| `AttributeGrid` | checkbox cards for institution attribute grants |
| `VirtualIdCard` | front / back, masked or revealed number, print action |
| `ConsentCard` | requesting service, receives list, never-shared list |

---

## 5. Data conventions (from Platform Reference)

- **NSN / NRN**: 12 digits, displayed `XXXX-XXXX-XXXX`, dashes not stored. Twelfth digit is a **Luhn (mod-10) check digit** — implemented in Identity Verification and worth reusing. Every sample number in these designs passes Luhn. Must never encode DOB, sex, location or citizenship type.
- **NRN is a separate series**, never a variant of the NSN. Systems record which type a person holds.
- **Phone**: `XXX XXX XXXX`, always starts with 8.
- **Government email**: `mailbox@agency-or-region.gov.nv`.
- **Date of birth**: ISO 8601 `YYYY-MM-DD`. **Never reformatted** to match system-timestamp display.
- **System timestamps**: stored 24-hour; displayed `MM/DD/YYYY` with 24-hour time.
- **States, LGAs, Area Councils**: from `Novaria_Administrative_Reference.xlsx` (30 states + NCT, 152 LGAs). Do not hard-code; read the workbook. State codes are two letters, LGA codes `STATECODE-01`.
- **Masking**: sensitive identifiers masked by default (`••••-••••-9050`). Revealing is an audited event.

---

## 6. Rules that must survive implementation

These are not styling preferences. Each one is in the PRD and each is visible in the designs.

1. **Contrast** meets 4.5:1 against the *composited* background, not against white. Frosted surfaces reduce effective contrast.
2. **No blur under dense tables or over photographs.** Officer surfaces sit at 0.78 opacity for this reason.
3. **Sensitive identifiers masked by default**; reveal writes an audit entry (6.1, 11).
4. **Separation of duties stated in the UI**, before the button: an officer cannot approve what they created; material changes need a second approver (6.1, 7.13).
5. **NSN issued only after final approval** — never on notification, never offline (7.2, 7.9, 13.5).
6. **Verification returns a result, not a record** (7.12). Seven outcomes, each with copy that prevents a wrong conclusion.
7. **No open sign-up.** Provision-and-activate for staff; citizens activate against an existing NSN/NRN (Decisions Log, 2026-08-12).
8. **Counts shown must derive from the data behind them.** A filter labelled 5 that renders 2 rows is a defect.
9. **Audit records cannot be edited or deleted by anyone.** Exporting the log is itself audited.
10. **Hit targets ≥44px** on assisted-registration devices (13.4).

---

## 7. Deliberately not designed

- **Institution-side admin console** for a connected institution's own user management (7.18 covers NICRA's side; the institution's mirror is the same pattern at narrower scope).
- **Offline capture on a tablet** — the offline *state* is designed inside Birth Registration; a separate device-sized layout is not.
- **Registration centre creation flow** (7.17) — the centre record and suspension state exist in Centre Dashboard; the create form does not.
- **Notification catalogue UI** (7.19) — notifications are referenced throughout but have no management screen.
- **Regional Administrator, Senior Approver, Auditor, Immigration Officer, Compliance Officer** have no dedicated screens. They reuse existing ones at narrowed scope, exposed through tweaks (`regionalScope`, `viewerRole`, `queueRegion`).

---

## 8. Open items carried from the PRD

- Biometric matching thresholds (numeric) — set during biometric testing (21.3).
- Value sets for sex, citizenship status, basis of citizenship, identity status — marked TBD in the Data Dictionary (23.1).
- Authentication methods included in the MVP — defined during security design (7.10).

---

## 9. Tweaks per screen

Each screen exposes props that switch scenario or policy. Use them to check states without editing code.

| Screen | Tweaks |
| --- | --- |
| Duplicate Review | confidence tier, numeric scores visible, require Senior Approver |
| Birth Registration | late registration (past 60 days) |
| Verification Queue | queue scope, non-facility births need senior approval |
| Correction Review | material vs minor change, push updates to connected systems |
| Death Registration | require a separate approver |
| Naturalization | Immigration reference status, applicant already holds an NRN |
| Identity Verification | result returned (7 outcomes), return attributes |
| Staff Provisioning | provisioner is Regional, MFA mandatory |
| Staff Sign-In | account state (active / pending / suspended / locked), bootstrap note |
| Institution Access | include planned and revoked institutions |
| Centre Dashboard | centre suspended, officer activity visible |
| National Dashboard | regional view, compliance panel |
| Reports | opening report; role selected in-screen |
| Audit Log | viewing as Compliance Officer or Auditor |
| Citizen Self-Service | resident (NRN) mode, access history visible |
| Log in with NovaID | requesting service not approved |
