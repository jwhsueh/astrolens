var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var aiClient = null;
function getAiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
    }
    aiClient = new import_genai.GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
app.post("/api/astrology/interpret", async (req, res) => {
  try {
    const {
      birthData,
      transitData,
      userQuestion
    } = req.body;
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return res.status(400).json({
        error: "missing_api_key",
        message: "\u5C1A\u672A\u8A2D\u5B9A GEMINI_API_KEY \u5BC6\u9470\uFF0C\u8ACB\u81F3 [Settings > Secrets] \u9762\u677F\u4E2D\u65B0\u589E\u6B64\u503C\uFF0C\u5373\u53EF\u555F\u7528\u667A\u6167 AI \u661F\u76E4\u89E3\u8AAA\u529F\u80FD\u3002"
      });
    }
    const ai = getAiClient();
    const prompt = `
\u4F60\u662F\u4E00\u4F4D\u5B78\u8B58\u6975\u5176\u6DF5\u535A\u4E14\u5BCC\u6709\u6148\u60B2\u5FC3\u7684\u53E4\u5178\u5360\u661F\u5927\u5E2B\u3002\u8ACB\u4F9D\u64DA\u4EE5\u4E0B\u6C42\u554F\u8005\u7684\u3010\u51FA\u751F\u661F\u76E4\u3011\u8207\u3010\u7576\u4E0B\u6D41\u5E74\uFF08Transit\uFF09\u96D9\u76E4\u6578\u64DA\u3011\uFF0C\u9032\u884C\u6DF1\u5EA6\u3001\u7D30\u7DFB\u7684\u5360\u535C\u548C\u751F\u547D\u76E4\u9762\u89E3\u6790\u3002

\u3010\u6C42\u554F\u8005\u51FA\u751F\u661F\u76E4\u6578\u64DA (Natal Chart)\u3011\uFF1A
- \u89C0\u6E2C\u6642\u9593: ${birthData.localTime}
- \u5730\u9EDE: ${birthData.location}
- \u592A\u967D\u4F4D\u7F6E: ${birthData.sunSign}
- \u6708\u4EAE\u4F4D\u7F6E: ${birthData.moonSign}
- \u4E0A\u5347\u661F\u5EA7 (ASC): ${birthData.ascendantSign}
- \u884C\u661F\u5BAB\u4F4D\u8207\u661F\u5EA7\u5206\u4F48:
${birthData.planetDetails?.map((p) => `  * ${p.name}: ${p.signName} ${Math.floor(p.degreeInSign)}\u5EA6, \u843D\u5165\u7B2C ${p.house} \u5BAE (${p.houseMeaning}) ${p.isRetrograde ? "(\u9006\u884C)" : ""}`).join("\n")}
- \u672C\u547D\u76F8\u4F4D\u5206\u4F48 (Natal Aspects):
${birthData.aspects?.map((a) => `  * ${a.planetA} \u8207 ${a.planetB} \u5448 ${a.name} (${Math.floor(a.angle)}\u5EA6): ${a.description}`).join("\n")}

\u3010\u7576\u4E0B\u6C42\u554F\u6642\u523B\u6D41\u5E74\u661F\u76E4\u6578\u64DA (Transit Chart)\u3011\uFF1A
- \u6D41\u5E74\u6642\u9593: ${transitData.localTime}
- \u6D41\u5E74\u884C\u661F\u843D\u5165\u672C\u547D\u5BAE\u4F4D\u8207\u5F71\u97FF:
${transitData.planetDetails?.map((p) => `  * \u6D41\u5E74 ${p.name}: \u843D\u5165\u672C\u547D\u7B2C ${p.house} \u5BAE (${p.houseMeaning}), \u9810\u8A08 ${p.timeForecast} \u79FB\u52D5\u81F3\u4E0B\u4E00\u5BAE`).join("\n")}

\u3010\u6C42\u554F\u8005\u7576\u4E0B\u5360\u535C\u89E3\u8AAA\u5099\u8A3B\u8207\u95DC\u6CE8\u9EDE\u3011\uFF1A
"${userQuestion || "\u7121\u7279\u5B9A\u63D0\u554F\uFF0C\u8ACB\u91DD\u5C0D\u6574\u500B\u4EBA\u751F\u683C\u5C40\u3001\u8FD1\u671F\u4E8B\u696D\u3001\u8CA1\u904B\u8207\u611F\u60C5\u767C\u5C55\u7D66\u4E88\u7D9C\u5408\u6D1E\u5BDF\u3002"}"

\u8ACB\u64B0\u5BEB\u4E00\u4EFD\u7D50\u69CB\u6975\u5176\u6E05\u6670\u3001\u8A00\u4E4B\u6709\u7269\u7406\u6027\u4E14\u6587\u7B46\u5178\u96C5\u7D30\u81A9\u7684\u300C\u661F\u76E4\u5360\u535C\u89E3\u8AAA\u5831\u544A\u300D\u3002\u5FC5\u9808\u5305\u542B\u4EE5\u4E0B\u4E09\u500B\u5411\u5EA6\uFF1A
1. \u3010\u672C\u547D\u683C\u5C40\u8207\u4EBA\u683C\u5929\u8CE6\u5206\u6790\u3011\uFF1A\u89E3\u8B80\u592A\u967D\u3001\u6708\u4EAE\u8207\u4E0A\u5347\u661F\u5EA7\u7684\u4EA4\u7E54\u4F5C\u7528\uFF0C\u5256\u6790\u6838\u5FC3\u6027\u683C\u512A\u52E2\u3001\u96B1\u85CF\u76F2\u9EDE\u8207\u4ECA\u751F\u7279\u5FB5\u3002
2. \u3010\u7576\u4E0B\u661F\u5BBF\u6D41\u5E74\u904B\u52E2\u5256\u6790\u3011\uFF1A\u8AAA\u660E\u7576\u524D\u6D41\u5E74\u661F\u5BBF\u9032\u5165\u672C\u547D\u5BAE\u4F4D\u5E36\u4F86\u7684\u6025\u8FEB\u8AB2\u984C\uFF0C\u5305\u542B\u9762\u81E8\u4F55\u7A2E\u6A5F\u9047\u8207\u5982\u4F55\u5316\u89E3\u78E8\u96E3\u3002
3. \u3010\u5927\u5E2B\u6307\u5F15\u8207\u5C08\u5C6C\u5360\u535C\u5EFA\u8B70\u3011\uFF1A\u91DD\u5C0D\u6C42\u554F\u8005\u7684\u554F\u984C\u6216\u8FD1\u671F\u751F\u6D3B\uFF0C\u7D66\u4E88\u5728\u4E8B\u696D\u767C\u5C55\u3001\u8CA1\u5BCC\u5132\u5099\u3001\u60C5\u611F\u548C\u5FC3\u9748\u72C0\u614B\u4E0A\u7684\u5177\u9AD4\u6307\u5F15\uFF0C\u6307\u51FA\u8FD1\u671F\u9069\u5408\u958B\u62D3\u7684\u4E8B\u9805\u3002

\u8ACB\u4F7F\u7528\u300C\u7E41\u9AD4\u4E2D\u6587\uFF08\u53F0\u7063\uFF09\u300D\u66F8\u5BEB\uFF0C\u8BED\u6C14\u8981\u771F\u8AA0\u3001\u5305\u5BB9\u3001\u5145\u6EFF\u667A\u6167\u4E14\u5177\u6709\u555F\u767C\u6027\u3002
`;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt
    });
    const text = response.text || "\u7121\u6CD5\u751F\u6210\u89E3\u6790\u5167\u5BB9\u3002";
    return res.json({ text });
  } catch (err) {
    console.error("Gemini interpretation error:", err);
    return res.status(500).json({
      error: "api_failed",
      message: err.message || "AI \u661F\u76E4\u8A08\u7B97\u89E3\u8B80\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66\u3002"
    });
  }
});
if (process.env.NODE_ENV !== "production") {
  (0, import_vite.createServer)({
    server: { middlewareMode: true },
    appType: "spa"
  }).then((vite) => {
    app.use(vite.middlewares);
    app.get("*", (req, res, next) => {
      vite.middlewares(req, res, next);
    });
  });
} else {
  const distPath = import_path.default.join(process.cwd(), "dist");
  app.use(import_express.default.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(import_path.default.join(distPath, "index.html"));
  });
}
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Astrology App server running on http://localhost:${PORT} with NODE_ENV=${process.env.NODE_ENV}`);
});
//# sourceMappingURL=server.cjs.map
