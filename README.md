# 🔐 Next.js ফুল-স্ট্যাক Authentication App

একটি আধুনিক ফুল-স্ট্যাক Authentication System, যা তৈরি করা হয়েছে **Next.js App Router**, **Better Auth**, এবং **MongoDB** ব্যবহার করে।

---

## 🚀 প্রোজেক্ট ওভারভিউ

এই প্রোজেক্টে একটি সম্পূর্ণ **User Authentication System** তৈরি করা হয়েছে।

এখানে যেসব ফিচার আছে:

* ✅ User Signup (নতুন অ্যাকাউন্ট তৈরি)
* ✅ User Signin (লগইন সিস্টেম)
* ✅ Session Management (লগইন স্টেট ম্যানেজ)
* ✅ Protected Route (Dashboard সিকিউর করা)
* ✅ MongoDB Database Integration
* ✅ Clean UI (Tailwind CSS)

---

## ⚙️ ব্যবহৃত টেকনোলজি

| টেকনোলজি     | কাজ                   |
| ------------ | --------------------- |
| Next.js 16   | Full-stack framework  |
| React 19     | UI তৈরি               |
| Better Auth  | Authentication handle |
| MongoDB      | Database              |
| Tailwind CSS | Styling               |
| HeroUI       | UI Components         |

---

## 📁 প্রোজেক্ট স্ট্রাকচার

```id="m7dz9p"
src/
 ├── app/
 │   ├── api/auth/[...all]/route.js   # সব auth API handle করে
 │   ├── auth/
 │   │   ├── signin/page.jsx          # Login page
 │   │   └── signup/page.jsx          # Register page
 │   ├── dashboard/page.jsx           # Protected page
 │   ├── page.js                      # Home page
 │   ├── layout.js                    # Global layout
 │
 ├── components/
 │   └── Navbar.jsx                  # Navbar (সব পেজে দেখা যায়)
 │
 ├── lib/
 │   ├── auth.js                     # Server side auth config
 │   └── auth-client.js              # Client side auth config
```

---

## 🔐 Authentication কীভাবে কাজ করে

### ১. Server Config (`auth.js`)

```js id="qvte66"
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI);

export const auth = betterAuth({
  database: mongodbAdapter(client.db("auth-db2")),
  emailAndPassword: {
    enabled: true,
  },
});
```

📌 **কেন ব্যবহার করা হয়েছে?**

* MongoDB এর সাথে কানেক্ট করার জন্য
* ইউজারের ডাটা (email, password) সেভ করার জন্য
* Authentication সিস্টেম configure করার জন্য

---

### ২. Client Auth (`auth-client.js`)

```js id="41w3f5"
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});
```

📌 **কেন ব্যবহার করা হয়েছে?**

* Frontend থেকে login/signup করার জন্য
* API call সহজভাবে করার জন্য

---

### ৩. API Route

```js id="pbsy68"
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

📌 **কেন ব্যবহার করা হয়েছে?**

* সব `/api/auth/*` request handle করার জন্য
* Backend auth logic এর সাথে connect করার জন্য

---

## 🔒 Protected Route (Dashboard)

```js id="4h0u8i"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  return <h1>Dashboard</h1>;
};
```

📌 **কেন ব্যবহার করা হয়েছে?**

* লগইন ছাড়া dashboard access বন্ধ রাখার জন্য
* Security নিশ্চিত করার জন্য

---

## 🧭 Navbar (Session অনুযায়ী UI পরিবর্তন)

```jsx id="11t8d0"
"use client";

import { useSession, signOut } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <p>Welcome {session.user.name}</p>
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <a href="/auth/signin">Login</a>
      )}
    </>
  );
};
```

📌 **কেন ব্যবহার করা হয়েছে?**

* ইউজার লগইন থাকলে একরকম UI
* লগইন না থাকলে অন্যরকম UI

---

## 📝 Sign Up Example

```jsx id="u3pfqy"
import { signUp } from "@/lib/auth-client";

await signUp.email({
  name: "Babul",
  email: "test@mail.com",
  password: "12345678",
});
```

📌 **কেন ব্যবহার করা হয়েছে?**

* নতুন ইউজার তৈরি করার জন্য

---

## 🔑 Sign In Example

```jsx id="e9cqlw"
import { signIn } from "@/lib/auth-client";

await signIn.email({
  email: "test@mail.com",
  password: "12345678",
});
```

📌 **কেন ব্যবহার করা হয়েছে?**

* ইউজারকে লগইন করানোর জন্য

---

## 🌍 Environment Setup

`.env.local` ফাইল তৈরি করো:

```id="26gkz6"
MONGODB_URI=your_mongodb_connection_string
```

---

## ▶️ প্রোজেক্ট রান করার নিয়ম

```bash id="m3o9li"
npm install
npm run dev
```

---

## 🎯 কোথায় ব্যবহার করতে পারো

এই সিস্টেম ব্যবহার করতে পারো:

* SaaS Application
* Admin Dashboard
* E-commerce Website
* Portfolio Project
* Client Project

---

## 🚀 Future Improvement (Next Level)

* 🔥 Form Validation (Zod)
* 🔥 Toast Notification (alert বাদ দিয়ে)
* 🔥 Role-based Auth (Admin/User)
* 🔥 Profile Page
* 🔥 API Data Fetching

---

## 💡 শেষ কথা

এই প্রোজেক্টটি একটি শক্তিশালী **Authentication Base System**
যেটা তুমি সহজেই বড় প্রোজেক্ট (SaaS / Startup idea) এ ব্যবহার করতে পারো।

---

### 👨‍💻 Author

**Babul Hossan**
