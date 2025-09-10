import app from "./src/app.js";
import connectDB from "./src/db/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const isConnected = await connectDB();
  if (isConnected) {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } else {
    console.error("❌ Failed to connect to the database. Server not started.");
    process.exit(1); // server band ho jaye
  }
};

startServer();