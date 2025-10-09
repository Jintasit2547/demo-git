import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  passwordHash: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Student", "Recruiter"],
    default: "Student",
  },
  accountStatus: {
    type: String,
    enum: ["PENDING", "ACTIVE"],
    default: "PENDING",
  },
  photo: {
    type: String,
    default: function () {
      // ถ้ามี displayName → ดึงอักษรแรกมา (และให้เป็นตัวพิมพ์ใหญ่)
      if (this.displayName && this.displayName.length > 0) {
        return this.displayName.charAt(0).toUpperCase();
      }
      // ถ้าไม่มีชื่อ → ตั้งเป็น "?" ไว้ก่อน
      return "?";
    },
  },
  studentIdImageUrl: String,
  employeeIdImageUrl: String,
  displayName: String,
}, { timestamps: true });

export default mongoose.model("User", userSchema);
