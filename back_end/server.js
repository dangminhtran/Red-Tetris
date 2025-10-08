import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Front Vue (Vite)
    methods: ["GET", "POST"]
  }
});

// --- Routes HTTP ---
app.get("/", (req, res) => {
  res.send("Serveur Node + Socket.io opérationnel 🚀");
});

// --- WebSockets ---
io.on("connection", (socket) => {
  console.log("🟢 Utilisateur connecté :", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Utilisateur déconnecté :", socket.id);
  });

  socket.on("message", (msg) => {
    console.log("📩 Message reçu :", msg);
    io.emit("message", msg);
  });
});

// --- Lancer le serveur ---
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Serveur en ligne sur http://localhost:${PORT}`);
});
