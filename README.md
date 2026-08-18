# NovaID

**National Identity and Civil Registration System for Novaria**

NovaID is the public-facing identity platform for Novaria, a fictional country used as a shared universe across a portfolio of government-tech projects. It provides identity issuance and civil registration (birth, naturalization, identity correction, and related citizen/resident services) for citizens and non-citizen residents.

> This is a portfolio/fictional-world project. Novaria, its institutions, and all data referenced here are invented for design and product-development practice.

## What this system does

- Issues the **NSN (Novaria Social Number)** — a 12-digit identifier for citizens — and the **NRN (Novaria Resident Number)** for lawful non-citizen residents, both using the same generation scheme with separate number series.
- Manages civil registration events: birth registration (including via OneHealth-connected health facilities), naturalized citizen registration, and identity correction / material change requests.
- Provides staff, institutional, and citizen self-service accounts, provisioned under a strict "no open sign-up" model — see [Account model](#account-model) below.
- Operates under the fictional **Novaria Identity and Civil Registration Act** and **Novaria Data Protection Act**.

## Naming reference

| Term | Meaning |
|---|---|
| **NICRA** | Novaria Identity and Civil Registration Authority — the government agency that runs the system |
| **NICRS** | National Identity Civil Registration System — the formal/technical system name |
| **NovaID** | The public-facing brand citizens interact with (e.g. "Log in with NovaID") |
| **NSN** | Novaria Social Number — 12-digit citizen identifier, format `XXXX-XXXX-XXXX`, Luhn (mod-10) check digit |
| **NRN** | Novaria Resident Number — same format as NSN, separate series, issued to non-citizen residents |

NSN/NRN values never encode date of birth, sex, location, or citizenship type.

## Account model

No NovaID account is created through an open sign-up form. The first NICRA National Administrator is bootstrapped once, out-of-band, by NICRA IT. Every other staff or institutional account is provisioned by an administrator above it and activated by the invited user. Citizens and residents never "sign up" — they activate self-service access against an NSN/NRN that already exists from a prior registration event (birth, naturalization, or resident registration), consistent with the system's "One Person, One Identity" principle.

## Tech stack

- **Frontend:** Next.js
- **Backend:** Firebase / Firestore
- **Build environment:** [Google Antigravity](https://antigravity.google/) (agentic dev platform with first-class Firebase integration)

This mirrors the stack used by **OneHealth**, a related live product in the same Novaria universe, for consistency across the portfolio.

## Project status

- Product Requirements Document: complete (v1.1)
- User Story Suite: 39 stories across account provisioning/login, birth registration, naturalized citizen registration, and identity correction
- Application build: in progress

## Related systems

NovaID is one product in a shared fictional-government universe:

- **OneHealth** — live health records system, already built (Next.js + Firebase/Firestore)
- **NovaID** — this project
- Police Investigation and Case Management, and Social Services — planned, not started

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with `create-next-app`.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Geist, a new font family for Vercel.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
