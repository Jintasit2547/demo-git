// server/models/addUser.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import User from "./Schema.js";

// ✅ แปลง path ให้ Node.js เข้าใจได้ทุกเครื่อง (รวมถึง Windows)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ โหลดไฟล์ .env จากโฟลเดอร์ข้างบน (server/.env)
dotenv.config({ path: resolve(__dirname, "../.env"), quiet: true });

// ✅ เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // ตรวจว่ามีผู้ใช้นี้อยู่แล้วหรือยัง
    const exist = await User.findOne({ email: "ploy@example.com" });
    if (exist) {
      console.log("ℹ️ Test user already exists:", exist.email);
    } else {
      // เพิ่มข้อมูลผู้ใช้ทดสอบ
      const testUser = await User.create({
        email: "ploy@example.com",
        passwordHash: "test1234",
        role: "Student",
        accountStatus: "ACTIVE",
        displayName: "Jao Ploy",
      });
      console.log("🌱 Added test user successfully:", testUser.email);
    }

    // ปิดการเชื่อมต่อหลังเสร็จ
    mongoose.connection.close();
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
