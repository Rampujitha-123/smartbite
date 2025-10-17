const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = prisma;
const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");

// ✅ Get all items
router.get("/", async (req, res) => {
  try {
    const items = await prisma.item.findMany({ orderBy: { expiresAt: "asc" } });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// ✅ Add a new item
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const item = await prisma.item.create({ data });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create item" });
  }
});

// ✅ Apply a discount to an item
router.patch("/:id/discount", async (req, res) => {
  const { id } = req.params;
  const { discountPct } = req.body;
  try {
    const updated = await prisma.item.update({
      where: { id: parseInt(id) },
      data: { discounted: true, discountPct }
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to apply discount" });
  }
});
const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");

// ✅ Get all items
router.get("/", async (req, res) => {
  try {
    const items = await prisma.item.findMany({ orderBy: { expiresAt: "asc" } });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// ✅ Add a new item
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const item = await prisma.item.create({ data });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create item" });
  }
});

// ✅ Apply a discount to an item
router.patch("/:id/discount", async (req, res) => {
  const { id } = req.params;
  const { discountPct } = req.body;
  try {
    const updated = await prisma.item.update({
      where: { id: parseInt(id) },
      data: { discounted: true, discountPct }
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to apply discount" });
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const OPENAI_KEY = process.env."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";

// ✅ Generate recipe from ingredients
router.post("/", async (req, res) => {
  const { ingredients, preferences } = req.body;

  if (!ingredients || ingredients.length === 0)
    return res.status(400).json({ error: "Provide ingredients array" });

  const prompt = `
You are a helpful chef assistant. Given these ingredients: ${ingredients.join(", ")}.
Return a short recipe with title, ingredients used, steps (3-6 steps), and estimated time.
Respect dietary preferences: ${preferences || "none"}.
Return JSON only.
`;

  try {
    const resp = await axios.post(
      "https://api.openai.com/v1/responses",
      {
        model: "gpt-4o-mini",
        input: prompt,
        max_tokens: 600
      },
      {
        headers: { Authorization: Bearer $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 }
      }
    );

    const text =
      resp.data.output?.[0]?.content?.[0]?.text || JSON.stringify(resp.data);

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { text };
    }

    res.json({ recipe: parsed });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({
      error: "Recipe generation failed",
      detail: err?.response?.data || err.message
    });
  }
});

module.exports = router;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const itemsRouter = require("./routes/items");
const recipesRouter = require("./routes/recipes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API routes
app.use("/api/items", itemsRouter);
app.use("/api/recipes", recipesRouter);

// Server start
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(🚀 Backend running on port ${port}));

