# Novaria / NovaID — Project Context Briefing

Last updated: 2026-08-12. Written so a new chat (with no memory of the PRD session) can pick up instantly. Point a fresh chat at this file, or just ask Claude to read it from the connected folder.

## The world

Novaria is a fictional country used as a shared universe across multiple portfolio government-tech products. Same country, same conventions, reused across products so nothing has to be reinvented per project.

**Products in this universe:**
- **OneHealth** — already built, live, has real sample data. Next.js frontend + Firebase/Firestore backend. Managing authority: Novaria Health Authority (NHA). PRD versions on file: "OneHealth PRD 2.docx" (RFC 2.0, Feb 2026, current) and "OneHealth PRD.docx" (RFC 1.0, Nov 2025, superseded). Uses a legacy "NSN (NIN)" field, format NNN-NN-AAA — analysis of the 61 sample records found it leaks birth year (45/61) and, less reliably, name initials (14/61). This is a known, accepted legacy quirk — not something being retrofitted.
- **NovaID** — the current project. National Identity and Civil Registration System. PRD is complete (v1.0), all comments resolved, ready to move into development.
- Future planned: Police Investigation and Case Management System, Social Services system — not started.

## Where everything lives

All files are in the connected OneDrive folder, under the `NovaID` subfolder (`C:\Users\Igho Oviroro\OneDrive\Claude\NovaID` — the user reorganized the top-level Claude folder into subfolders on 2026-08-13; NovaID's files, and only NovaID's files, live here now. Check for a `NovaID` subfolder first before assuming files are loose in the root) — reconnect this folder in any new chat to access them directly:

- **NovaID_PRD_Working_Draft_0.6.docx** — the living PRD, source of truth. Century Gothic font throughout (user customization — always preserve on edit, never regenerate from scratch, edit the XML directly). All comments have been resolved and deleted; this is a clean v1.0.
- **NovaID_PRD_v1.0.pdf** — portfolio-ready export of the above, for Notion.
- **NovaID_User_Story_Suite.docx** (+ **NovaID_User_Story_Suite.pdf**, portfolio export of the same content, same docx/pdf pairing pattern as the PRD) — detailed user stories, one level down from the PRD (PRD = summary, this = the implementation-level detail: actor, story, preconditions, process flow, postconditions, acceptance criteria, error path — format modeled on a real Sterling Bank BRD sample the user provided). Four sections as of 2026-08-12: (1) Account Provisioning, Activation, and Login — covers the NICRA National Administrator bootstrap, staff/institution provisioning, and citizen self-service activation (see the Decisions Log entry below — this is a cross-system convention, not NovaID-specific), (2) Birth Registration via a OneHealth-Connected Facility, (3) Naturalized Citizen Registration, (4) Identity Correction and Material Change. 39 stories, ~29 pages. Sections 2-4 cover PRD journeys 8.1, 8.3, 8.4. Not yet covered: 8.2 (birth outside a facility), 8.5 (potential duplicate as its own journey), 8.6 (death registration) — could be added the same way if the user wants more journeys detailed later.
- **build_stories.js** + **stories_content.js** — the generator behind the docx above (Node + the `docx` npm package). `stories_content.js` holds all story text as plain data (`header` + `sections[].stories[]`); `build_stories.js` renders it into the merged-cell table layout and writes `NovaID_User_Story_Suite.docx`. To extend (e.g. add Section 5 for journey 8.2/8.5/8.6): copy both files to a Linux shell, add a new section object to `stories_content.js` following the existing pattern, run `node build_stories.js`, then copy the output back here. Don't regenerate the whole document from scratch — edit the data file and rerun.
- **Novaria_Administrative_Reference.xlsx** — canonical states/zones/LGAs. 30 states across 5 zones (North, South, East, West, Central) + the Novaria Capital Territory (NCT), which uses Area Councils instead of LGAs. 152 total LGA rows.
- **Novaria_Platform_Reference.xlsx** — cross-system conventions, government agencies, a Systems Map, and a Decisions Log. This is the one to check before inventing any new convention for a future system (Police, Social Services, etc.) — always check it tallies with OneHealth's existing data before proposing a change, since OneHealth's live data/PRD should not need to change.

## Key naming, resolved on purpose

- **NICRA** — Novaria Identity and Civil Registration Authority. The *agency* that runs the system.
- **NICRS** — National Identity Civil Registration System. The *formal/technical* name, used in legal/architectural language.
- **NovaID** — the *public-facing brand* citizens see (e.g. "Log in with NovaID").
- **NSN** — Novaria Social Number. 12-digit identifier NovaID issues to *citizens*. Displayed `XXXX-XXXX-XXXX` (dashes), check digit uses the **Luhn (mod-10) algorithm**. Must never encode DOB, sex, location, or citizenship type.
- **NRN** — Novaria Resident Number. Same format/generation as the NSN but a separate number series, issued to lawful residents/refugees who are *not* citizens (Section 7.20 of the PRD).

## Conventions locked in Platform Reference (must match OneHealth)

- Phone: `XXX XXX XXXX`, starts with 8 (matches OneHealth).
- Government email domain: confirmed pattern, matches OneHealth.
- Date of birth: ISO 8601.
- System timestamps: stored 24-hour canonically; display can be 12-hour (with AM/PM) or 24-hour, like a phone's format toggle.
- Units: metric, "m" = metres (not "metric").
- Currency: still open/undecided.

## Decisions specific to NovaID's PRD (all now written into the document body, not just comments)

- **Population baseline**: ~38,000,000, an assumed planning figure (not measured), recorded in the Platform Reference Decisions Log. Year-One targets assume a ~5% initial enrolment wave (~1.9M registrations).
- **OneHealth integration**: planned, not yet built. Status note in Section 9: OneHealth keeps its own Patient Reference identifiers until integration ships; NSN populates per-patient during rollout, not a bulk migration.
- **Immigration integration**: same treatment as OneHealth — planned, activates when the Immigration system ships. V1 doesn't wait on it since birth-based registration alone is enough for V1.
- **Biometrics**: children recapture at ages 12 and 18 (in addition to initial capture at 5); adults recapture roughly every 10 years or on request. No named commercial biometric vendor — conforms to ISO/IEC 19794 (fingerprint) / ISO/IEC 39794 (facial) standards, vendor picked at procurement.
- **Statutory birth registration period**: 60 days from date of birth.
- **Tech stack (working assumption for V1)**: Next.js frontend + Firebase/Firestore-style backend, consistent with OneHealth's precedent. To be built using **Google Antigravity** (Google's agentic dev platform) as the build environment — this is a tooling choice, does not change the stack. Antigravity has first-class Firebase integration, so this pairing is well-supported (checked as of Aug 2026).
- Fictional governing legislation named: Novaria Identity and Civil Registration Act, Novaria Data Protection Act.
- Physical ID cards: not in V1 — V1 has a virtual identity card + citizen self-service instead.
- **Account provisioning/activation model** (2026-08-12, logged in Platform Reference Decisions Log — cross-system, not NovaID-specific): no NovaID account is ever created through an open sign-up form. The first NICRA National Administrator is bootstrapped once, out-of-band, by NICRA IT. Every other staff/institutional account is provisioned by an administrator above it and activated by the invited user. Citizens never sign up — they activate self-service access against an NSN/NRN that already exists from a prior registration journey (birth/naturalization/resident registration), consistent with "One Person, One Identity" (PRD Section 3.1). Full detail in NovaID_User_Story_Suite.docx, Section 1.

## Working style notes for whoever picks this up

- Any edit to the PRD .docx must preserve the Century Gothic font — edit the existing file's XML in place (unzip → edit `word/document.xml` → rezip), never regenerate via docx-js after the user started customizing it.
- Comment workflow (now moot — PRD is comment-free — but applies if new comments get added): reply in-thread, wait for explicit user confirmation ("ok"/"go ahead"), only then edit the body text and mark the thread resolved. Never delete a comment without saying so explicitly.
- Don't invent conventions for future systems (Police, Social Services) without checking the Platform Reference workbook first and making sure they don't force a change to OneHealth's live data.

## Status as of this note

PRD is done (v1.0, PDF exported for the portfolio). A detailed User Story Suite now exists on top of it (see above) covering four journeys, including account provisioning/login which the PRD only summarizes. Next step is either detailing the remaining journeys (8.2, 8.5, 8.6) the same way, or moving on to building the actual NovaID web app in Antigravity — ask the user which. This file was written because Claude cannot write into this Project's built-in memory system (read-only from Claude's side) — this document is the reliable substitute. Keep it updated if you want future chats to stay in sync.
