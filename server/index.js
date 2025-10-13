import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import "./googleAuth2/auth.js"; // Passport Google strategy

// --- 1. Initial Setup ---
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// --- 2. Middleware ---

// อนุญาตให้ frontend ที่ port 3000 ติดต่อเข้ามาได้
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// ทำให้ Express อ่าน request ที่เป็น JSON ได้
app.use(express.json());

// --- 3. Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// --- 4. Session and Passport Setup ---

// [DEBUG] แสดงค่า SECRET ที่เซิร์ฟเวอร์เห็น
console.log("ค่า SECRET ที่เซิร์ฟเวอร์เห็นคือ:", process.env.SESSION_SECRET);

// ตั้งค่า session (ต้องอยู่ก่อน passport)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // ตั้งเป็น false สำหรับ localhost (http)
    sameSite: "lax",
  },
}));

// เริ่มใช้งาน passport (ต้องอยู่หลัง session)
app.use(passport.initialize());
app.use(passport.session());

// --- 5. Routes ---

// Route สำหรับทดสอบว่าเซิร์ฟเวอร์ทำงาน
app.get("/", (req, res) => {
  res.send(`<h2>🚀 Backend is running!</h2><a href="/auth/google">Login with Google</a>`);
});

// Route เริ่มกระบวนการล็อกอินกับ Google
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Route ที่ Google จะส่งข้อมูลกลับมาหลังผู้ใช้ล็อกอินสำเร็จ
app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000/demo-git/login" }), // <--- แก้ไข
  (req, res) => {
    // ถ้าสำเร็จ, redirect กลับไปที่หน้า profile ของ frontend
    res.redirect("http://localhost:3000/demo-git/profile"); // <--- แก้ไข
  }
);

// Route ให้ frontend เช็กสถานะการล็อกอิน
app.get("/auth/status", (req, res) => {
  if (req.user) {
    res.status(200).json({ loggedIn: true, user: req.user });
  } else {
    res.status(201).json({ loggedIn: false }); // ใช้ 201 หรือ 401 ก็ได้
  }
});

// Route ให้ frontend ดึงข้อมูล user ที่ล็อกอินอยู่
app.get("/api/user", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ user: null });
  }
});

// Route สำหรับล็อกเอาต์
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => res.redirect("http://localhost:3000/demo-git/login")); // <--- แก้ไข
  });
});

// --- 6. Start Server ---
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));