// backend/src/index.ts
// Local development entry point only. Vercel uses api/index.ts instead
// and never runs this file.
import app from "./app";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running locally on port ${PORT}`);
});
