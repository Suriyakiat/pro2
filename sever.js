const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = 3000;

// การตั้งค่าการเชื่อมต่อ MSSQL
const config = {
    user: 'ipuetdatabase',
    password: 'Audi2546',
    server: 'ipuetdatabase.database.windows.net',
    database: 'ipuetdatabase',
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
};

// ใช้งาน Middleware
app.use(cors());
app.use(bodyParser.json());

// API สำหรับตรวจสอบข้อมูลผู้ใช้
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    try {
        // เชื่อมต่อกับฐานข้อมูล
        const pool = await sql.connect(config);

        // ตรวจสอบข้อมูลผู้ใช้ในฐานข้อมูล
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .query('SELECT * FROM Users WHERE email = @email AND password = @password');

        if (result.recordset.length > 0) {
            // พบผู้ใช้
            res.status(200).json({ message: 'เข้าสู่ระบบสำเร็จ', user: result.recordset[0] });
        } else {
            // ไม่พบผู้ใช้
            res.status(401).json({ message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในระบบ' });
    }
});

// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
