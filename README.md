# 📚 PU Notes

PU Notes is a clean, fast, and organized platform where students can access faculty wise and semester wise notes.  
The goal is to provide a simple, secure, and reliable study resource fully free for students.

All content is uploaded and verified by a single admin, so updates happen gradually thanks for your patience!

---

## 🚀 Features

- 🔐 **Login Required** – Only used to keep track of authentic users. No personal data is ever shared or misused.
- 📂 **All Notes in One Place** – Organized by faculty & semester.
- ⚡ **Minimal & Fast UI** – Built using Next.js, shadcn/ui, and Radix UI.
- 🆓 **Completely Free** – No fees, no hidden limits.
- ☁️ **Highly Reliable Hosting** – Fast and accessible anytime.
- 📥 **Admin-Verified Uploads** – Ensures accuracy and quality of notes.
- 🔄 **More Coming Soon** – Past papers, model sets, reference books, and more.

---

## 🛠️ Tech Stack

- **Next.js 16**
- **React 19**
- **Tailwind CSS v4**
- **shadcn/ui & Radix UI**
- **Prisma ORM**
- **PostgreSQL**
- **TanStack React Query**
- **Zod**
- **Axios**
- **TypeScript**

---

## 📦 Installation

Clone the project:

```bash
git clone https://github.com/f0rsakeN-afk/punotes.git
cd punotes
```

Install dependencies:

```bash
npm install
```

---

## 🗄️ Environment Variables Setup

Create a `.env` file in the root:

```env
DATABASE_URL=
NEXT_PUBLIC_STACK_PROJECT_ID=
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=
STACK_SECRET_SERVER_KEY=
BACKEND_URL=
```

Make sure PostgreSQL is running and accessible.

---

## 🧩 Prisma Setup

Generate Prisma client:

```bash
npx prisma generate
```

Push schema to your database:

```bash
npx prisma db push
```

(Optional) Open Prisma Studio:

```bash
npx prisma studio
```

---

## ▶️ Running the App

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

---

## 🤝 Contributing

Contributions are welcome! 🎉

You can:

- Report bugs  
- Suggest features  
- Improve UI/UX  
- Send PRs  
- Improve docs  

---

## 🐞 Found a Bug?

Open an issue here:

👉 https://github.com/f0rsakeN-afk/punotes/issues

When reporting a bug, please include:

- Steps to reproduce  
- Expected behavior  
- Screenshots (if any)  
- System info  

---

## ⭐ Support the Project

If PU Notes helped you:

- ⭐ Star the repository  
- 🍴 Fork the repo  
- 🔁 Share with friends  

Your support motivates further development!

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 💬 Feedback

Have ideas to improve the platform?  
Open an issue or contribute directly. Community feedback is always appreciated.

---

Built with ❤️ to help students learn better.
