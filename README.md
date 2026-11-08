# Plateau Nurse Register

Plateau State Nurse Registry and Licence Verification Platform, built for the Nurses and Midwives Association (Plateau State chapter) during the October 2026 MIC Builder pilot.

This repository holds both halves of the platform:

| Path | What it is |
|---|---|
| `/` (this directory) | React + Vite front end — reviewer, hospital HR and nurse portals, plus the public verification page |
| `backend/` | Django + Django REST Framework API, serving `/api/v1/` |
| `backend/README.md` | Full backend documentation: demo data, credentials, runbook, production notes |

## What the platform does

Nurses register themselves with their details, licence scan, expiry date and a selfie. Association administrators review each registration and approve, reject, flag, suspend or revoke it. Approval issues an immutable NANNM identifier and a printable digital ID card with a QR code. Anyone can check a nurse's status publicly by that identifier, and hospital HR can see — and confirm or reject the employment of — only the nurses attached to their own hospital.

## Prerequisites

- Python 3.12 or newer for the backend
- Node.js for the front end
- A Gmail address and Google App Password if you want expiry reminder and password reset emails to actually send

## Running it locally

Two terminals. The demo runs entirely on one laptop; no Docker and no deployed backend are needed.

```bash
# terminal 1 — backend
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# put a Fernet key in NIN_ENCRYPTION_KEY in .env:
python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
python manage.py migrate
python manage.py setup_groups
python manage.py seed_demo
python manage.py runserver
```

```bash
# terminal 2 — front end
npm install
npm run dev
```

Then open `http://localhost:5173`. Vite proxies `/api/v1` to Django on port 8000, so the browser only ever talks to `localhost:5173`.

| Surface | URL |
|---|---|
| React app (use this) | http://localhost:5173 |
| Django REST API | http://127.0.0.1:8000/api/v1/ |
| Django admin | http://127.0.0.1:8000/django-admin/ |
| Public verification | http://127.0.0.1:8000/verify/ |

## Demonstration data and accounts

`python manage.py seed_demo` creates 18 fictional nurses across 5 fictional employers, covering every registry scenario. Everything is fake: employer names end in `(Demo)`, licence numbers start with `PLT-LIC-DEMO-`, email addresses use the reserved `example.test` domain, and photographs are generated placeholders.

Every demo account uses the password `DemoPass123!`:

- **Reviewers:** `demo_superadmin`, `demo_supervisor`, `demo_officer1`
- **Hospital HR:** `demo_hr1` to `demo_hr5`, one per demo employer
- **Nurses:** `demo_nurse1` to `demo_nurse4`

Sign in at `/admin/login` (reviewers), `/hospital/login` (HR) or `/nurse/login` (nurses). See `backend/README.md` for the full suggested demo flow.

## Tests

```bash
cd backend
source .venv/bin/activate
python manage.py check
python manage.py makemigrations --check --dry-run
python manage.py test
```

## Deployment

Vercel builds and serves this front end (`npm run build` into `dist/`). Vercel cannot run Django — it is a static host with no persistent process or writable database.

To put the platform online, deploy `backend/` to a host that runs Django (Render, Railway, Fly.io or a VPS) with PostgreSQL, then set `VITE_API_BASE_URL=https://<your-backend>/api/v1` in the Vercel environment and redeploy. Until that happens, the deployed front end will load but cannot show any registry data. See `backend/README.md` for production configuration.
