// ✅ ใช้ ES Module ทั้งหมด
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import "./googleAuth2/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ อนุญาตให้ frontend (port 3000) ติดต่อ backend (port 4000)
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

// ✅ เชื่อม MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ ตั้งค่า session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  },
}));

// ✅ เริ่มใช้งาน passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Route สำหรับทดสอบระบบ
app.get("/", (req, res) => {
  res.send(`<h2>🚀 Backend is running successfully!</h2>
            <a href="/auth/google">Login with Google</a>`);
});

// ✅ Route เริ่มต้น login
app.get("/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// ✅ Route callback หลัง login สำเร็จ
app.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000/login" }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard");
  }
);

// ✅ Route เช็กสถานะ login
app.get("/auth/status", (req, res) => {
  if (req.user) {
    res.status(200).json({ loggedIn: true, user: req.user });
  } else {
    res.status(401).json({ loggedIn: false });
  }
});

// ✅ Route ที่ต้อง login ถึงเข้าได้
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

// ✅ Route logout
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => res.redirect("http://localhost:3000/login"));
  });
});

// ✅ Route ดูข้อมูลผู้ใช้
app.get("/api/user", (req, res) => {
  if (req.user) res.json(req.user);
  else res.status(401).json({ user: null });
});

// ✅ สั่งให้ server ทำงาน
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
