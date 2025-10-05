# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Student Portfolio Management System (SPMS) – Sprint #2 Authentication
**StudentPort.com**
ระบบบริหารจัดการผลงานนักศึกษา รองรับการล็อกอินหลายบทบาท (Student, Advisor Admin, Super Admin, Recruiter) พร้อมระบบ Authentication แบบ **Server-side Session** โดยใช้ Express + React เชื่อมต่อกันผ่าน REST API และ Cookie (HTTP-only)

## Project Overview
- **Frontend:** Vite + React.js  
- **Backend:** Node.js + Express.js  
- **Authentication:** Server-side session (express-session)  
- **Role-based Access Control (RBAC):** Student / Advisor Admin / Super Admin / Recruiter  
- **Database:** MongoDB + Mongoose  
- **Security:** Helmet, CORS, express-rate-limit  
- **Testing:** Jest, Supertest, Playwright (optional)

---

## Tech Stack
### Frontend
- Vite + React.js (UI Development)
- TailwindCSS (Responsive Styling)
- React Router DOM (Protected Routes by role)
- React Query (TanStack) (Cache / Fetch state)
- Axios / Fetch API (REST communication)

### Backend
- Node.js + Express.js (REST API)
- express-session (Session handling)
- MongoDB + Mongoose (User persistence)
- bcrypt (Password hashing)
- dotenv (Environment variables)
- Helmet + CORS + express-rate-limit (Security)
- Winston / Pino (Logging)

##  Installation

```bash
# 1. Clone โปรเจกต์
git clone https://github.com/<your-team-or-username>/studentport.git
cd studentport

# 2. ติดตั้ง dependencies
cd backend && npm install
cd ../frontend && npm install

# 3. กลับไป root
cd ..

# 4. สร้างไฟล์ .env ทั้ง backend และ frontend (ดูตัวอย่างด้านล่าง)

# 5. รันระบบ (สองเทอร์มินัล)
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev

## Authentication Approach (ADR-001)
- ใช้ Server-side Session Authentication
- Library: express-session
- Cookie: HTTP-only, Secure, SameSite=strict
- เหมาะกับ React + Express
- ง่ายต่อการทำ Role-Based Access Control (RBAC)

## Project Structure
.
├── docs/
│   ├── README.md
│   └── ADR/
│       └── ADR-001-authentication.md
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   └── models/
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── routes/
│   │   └── lib/
│   ├── package.json
│   └── .env
└── README.md

## Roles
- Student: อัปโหลดและจัดการผลงาน
- Advisor/Admin: ตรวจสอบและอนุมัติผลงาน
- Super Admin: ดูแลระบบทั้งหมด
- Recruiter: ค้นหาและดูผลงานที่ผ่านการอนุมัติ

## Example API Test
## Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"student@uni.ac.th","password":"Passw0rd!","role":"Student"}'

## Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@uni.ac.th","password":"Passw0rd!"}' \
  -c cookies.txt

## Check session
curl -X GET http://localhost:3000/api/auth/me -b cookies.txt

## Environment Variables
backend/.env
PORT=3000
MONGO_URI=mongodb://localhost:27017/studentport
SESSION_SECRET=changeme
SESSION_NAME=sid
COOKIE_SECURE=false
CORS_ORIGIN=http://localhost:5173

frontend/.env
VITE_API_BASE_URL=http://localhost:3000

หมายเหตุ: Production ควรตั้ง COOKIE_SECURE=true และใช้ session store (Redis/Mongo) แทน MemoryStore