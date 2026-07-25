import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3030;

// Increase limit to handle large HTML dumps
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));

// Lazy initializer for Gemini client to prevent crash if key is missing on startup
let aiClient: GoogleGenAI | null = null;

function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Please add it in Settings > Secrets.");
    }
    // Explicitly configure GoogleGenAI to target the developer API instead of Vertex AI,
    // which resolves authentication mismatch errors (ACCESS_TOKEN_TYPE_UNSUPPORTED) with new AQ. key formats.
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// B2B Pre-Populated Audit Samples for immediate testability and B2B feel
const PREPOPULATED_SAMPLES = [
  {
    name: "Apex Global Logistics",
    url: "https://apexlogistics-example.com/services/freight",
    industry: "SaaS & Logistics",
    rawText: `<html>
      <body>
        <header>Welcome to Apex Global Logistics Solutions</header>
        <div>
          <p>We provide stellar logistics and supply chain services across the country. Our company aims to streamline your business shipping requirements through our customized approaches. We have been working in this area for quite some time, and our team of experts understands the details of shipping packages securely.</p>
          <p>If you want to ship something, we are here for you. Our freight solutions are very cost-effective, saving you time and money. We focus on providing high quality service to all of our global clients. Our network covers many destinations and we can help you get where you want to go. Reach out to our customer agents to learn more about how we can help your operations grow.</p>
        </div>
      </body>
    </html>`
  },
  {
    name: "Bahria Heights Premium Condos",
    url: "https://bahriaheights-estate.com/properties/phase7",
    industry: "Real Estate",
    rawText: `<html>
      <body>
        <h1>Bahria heights Real Estate Opportunities</h1>
        <p>This premium project in Phase 7 offers wonderful living apartments for families who want class and convenience. Our location is near the commercial center, which means you can walk to nearby shopping centers, grocery stores, and local attractions. Our project has modern facilities like parking spaces, reliable electricity, and 24/7 security systems.</p>
        <p>We are dedicated to building long term relations with buyers. Our flexible payment plans are designed to make ownership easy. If you are looking to invest in a growing region with great potential returns, this is the perfect opportunity. Contact us today to visit our site and book an apartment.</p>
      </body>
    </html>`
  },
  {
    name: "MediHealth Urgent Care",
    url: "https://medihealthurgent.com/clinics/austin-central",
    industry: "Healthcare / Medical",
    rawText: `<html>
      <body>
        <h2>Your Local Neighborhood Clinic Group</h2>
        <p>At our urgent care clinic, we treat our patients like family. We offer medical support for a lot of different common illnesses and injuries. We have state of the art clinics with clean waiting rooms and fully certified doctors. We are located right in the center of town and you don't even need an appointment to walk in.</p>
        <p>We accept most major insurance plans and keep our treatment rates extremely low for self-paying patients too. Our staff works quickly so you do not have to wait in the lobby for too long. If you are feeling under the weather, come see us today for rapid diagnostics and friendly treatment.</p>
      </body>
    </html>`
  }
];

// Endpoint to retrieve prepopulated samples
app.get("/api/samples", (req, res) => {
  res.json(PREPOPULATED_SAMPLES);
});

// Main Core GEO Engine API Endpoint
app.post("/api/audit", async (req, res) => {
  try {
    const { url, tier, rawText } = req.body;

    if (!url || !tier || !rawText) {
      return res.status(400).json({ error: "Missing required fields: url, tier, or rawText" });
    }

    if (!["FREE", "STANDARD", "PRO"].includes(tier)) {
      return res.status(400).json({ error: "Invalid tier. Must be FREE, STANDARD, or PRO" });
    }

    const ai = getGeminiClient();

    // Construct the algorithmic prompt instructions depending on the requested tier
    let tierPrompt = "";
    if (tier === "FREE") {
      tierPrompt = `
Generate the [OUTPUT FORMAT] for TIER: FREE (Diagnostic AI Readiness Scorecard).
Follow this layout precisely:

## GEO Readiness Score: [X]/10
*Evaluation Metric Breakdown:*
- Information Density: [X]/10
- Formatted Scannability: [X]/10
- Entity Mapping: [X]/10

### 3 Critical Algorithmic Blockers
*   **Blocker 1 (Low Information Density):** [State the exact section or pattern in the text that lacks quantitative values, explaining why RAG engines will deprioritize it for answering data-driven user prompts].
*   **Blocker 2 (Structural Inefficiency):** [Identify where the content uses long, conversational, unstructured prose blocks instead of highly scannable, front-loaded data points].
*   **Blocker 3 (Ambiguous Entity Footprint):** [Point out where the text relies heavily on vague relative pronouns like 'our services' or 'this region', failing to register as a concrete entity inside an LLM Knowledge Graph].

### Recommended Remediation
To resolve these architectural flaws, upgrading to the **Standard Tier** deploys our automated semantic content re-engineering system. This layer automatically reconstructs these flagged text intervals into high-density, citation-friendly response modules optimized for prompt retrieval.
`;
    } else if (tier === "STANDARD") {
      tierPrompt = `
Generate the [OUTPUT FORMAT] for TIER: STANDARD (Semantic Content Engineering).
Follow this layout precisely:

## Raw vs. Optimized Structural Contrast Audit

### Unoptimized Segment (Identified Weakness)
> [Extract a direct 2-4 sentence excerpt from the [RAW_TEXT] that contains highly conversational, zero-metric prose.]

### Engineered GEO-Optimized Alternative
> [Rewrite the excerpt above. Front-load the core value proposition within the first 15 words. Introduce explicit data placeholders, quantitative benchmarks, and precise localized entity terms.]

---

## AI-Engineered Citation Q&A Blocks

### **[Draft a clear, high-intent user query that a customer would input into ChatGPT/Gemini/Perplexity regarding this business niche]**
*   **Optimized Formulation:** [Provide a highly dense, 40-60 word response block. Structure: Direct Answer Sentence + [Insert Specific Performance Metric %] + Reference to explicit brand name entity + Contextual anchor.]

### **[Draft a secondary long-tail query focusing on transactional intent or localized comparison]**
*   **Optimized Formulation:** [Provide a highly dense, 40-60 word response block. Structure: Direct Answer Sentence + [Insert Specific Financial/Temporal Metric] + Reference to explicit brand name entity + Contextual anchor.]
`;
    } else if (tier === "PRO") {
      tierPrompt = `
Generate the [OUTPUT FORMAT] for TIER: PRO (Technical Semantic Graph Generation).
Follow this layout precisely:

## Extracted Semantic Entity Mapping Graph
*   **Primary Entity Type:** [e.g., LocalBusiness, RealEstateAgent, Organization, Product]
*   **Target Domain Reference:** [URL]
*   **Identified Child Nodes:** [List out specific named entities extracted from text: explicit locations, verified services, distinct personnel names]

## JSON-LD Semantic Web Integration Script
\`\`\`json
[Generate a syntactically pristine, fully schema.org-compliant JSON-LD script block. If the text maps to a business, utilize @type: 'LocalBusiness' or 'Organization' with populated fields for name, url, and description. You MUST nest a 'mainEntity': { "@type": "FAQPage", "mainEntity": [...] } array containing the optimized Q&A blocks generated in the Standard Tier logic. Use clear type constraints and do not truncate the code block.]
\`\`\`
`;
    }

    const systemInstruction = `
You are the core algorithmic parsing engine behind GEOEngine AI, a high-performance B2B Generative Engine Optimization (GEO) auditing pipeline. Your sole objective is to ingest raw website textual data, evaluate its structural crawlability against known LLM citation mechanics (RAG architecture optimization), and deliver deterministic, structured optimizations based on the user's commercial tier.

========================================================================
ALGORITHMIC BENCHMARKS FOR EVALUATION (INTERNAL LOGIC CRITERIA)
========================================================================
To calculate scores and analyze data, evaluate the [RAW_TEXT] against these three core GEO dimensions:
1. Information Density: Ratio of hard data points (percentages, years, monetary figures, geo-spatial entities) to total word count.
2. Formatted Scannability: Presence of explicit h1/h2 structural markdown, concise multi-level lists, and distinct front-loaded declarations.
3. Semantic Clarity (Entity Mapping): Explicit use of formal entity terms (e.g., "Bahria Phase 7 Rawalpindi") instead of ambiguous relative pronouns ("our project", "here", "this area").

You MUST return a JSON object with properties mapped exactly to the required output formats. Do not include conversational prefaces or postscripts in the generated 'markdownOutput'. The response should be formatted as a valid JSON object matching the requested schema.
`;

    const prompt = `
URL: ${url}
TIER: ${tier}
RAW_TEXT:
${rawText}

---
Execute the instructions for TIER: ${tier}.

For the response JSON structure:
- "markdownOutput" must contain the complete, formatted Markdown matching the requested layout for TIER: ${tier} precisely. Do not truncate.
- Also populate the following parsed fields based on your analysis to enable dashboard visualizations:

If TIER is "FREE":
- "score": overall score out of 10 (integer)
- "informationDensityScore": score out of 10 (integer)
- "formattedScannabilityScore": score out of 10 (integer)
- "entityMappingScore": score out of 10 (integer)
- "blocker1Title": Blocker 1 title (Low Information Density)
- "blocker1Desc": Detailed explanation for Blocker 1
- "blocker2Title": Blocker 2 title (Structural Inefficiency)
- "blocker2Desc": Detailed explanation for Blocker 2
- "blocker3Title": Blocker 3 title (Ambiguous Entity Footprint)
- "blocker3Desc": Detailed explanation for Blocker 3

If TIER is "STANDARD":
- "unoptimizedSegment": Extracted unoptimized segment text from RAW_TEXT
- "optimizedAlternative": The engineered GEO-optimized rewrite
- "qa1Query": Query 1
- "qa1Formulation": Formulated response 1 (dense 40-60 words with metric % and brand entity)
- "qa2Query": Query 2 (long-tail query)
- "qa2Formulation": Formulated response 2 (dense 40-60 words with financial/temporal metric and brand entity)

If TIER is "PRO":
- "primaryEntityType": Primary schema.org type (e.g. LocalBusiness, Organization)
- "childNodes": Array of identified child nodes (explicit locations, verified services, distinct personnel names)
- "jsonLd": Pristine syntactically correct JSON-LD schema string (nesting the FAQPage with the FAQ blocks matching Standard Q&A structure)
`;

    // Invoke Gemini 2.5 Flash
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            markdownOutput: { type: Type.STRING },
            score: { type: Type.INTEGER },
            informationDensityScore: { type: Type.INTEGER },
            formattedScannabilityScore: { type: Type.INTEGER },
            entityMappingScore: { type: Type.INTEGER },
            blocker1Title: { type: Type.STRING },
            blocker1Desc: { type: Type.STRING },
            blocker2Title: { type: Type.STRING },
            blocker2Desc: { type: Type.STRING },
            blocker3Title: { type: Type.STRING },
            blocker3Desc: { type: Type.STRING },
            unoptimizedSegment: { type: Type.STRING },
            optimizedAlternative: { type: Type.STRING },
            qa1Query: { type: Type.STRING },
            qa1Formulation: { type: Type.STRING },
            qa2Query: { type: Type.STRING },
            qa2Formulation: { type: Type.STRING },
            primaryEntityType: { type: Type.STRING },
            childNodes: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            jsonLd: { type: Type.STRING }
          },
          required: ["markdownOutput"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from AI engine");
    }

    const geminiData = JSON.parse(resultText);

    // Map the gemini response back to our standard AuditResponse interface
    const auditResponse = {
      markdownOutput: geminiData.markdownOutput,
      tier,
      parsedData: {
        free: tier === "FREE" ? {
          score: geminiData.score || 5,
          metrics: {
            informationDensity: geminiData.informationDensityScore || 5,
            formattedScannability: geminiData.formattedScannabilityScore || 5,
            entityMapping: geminiData.entityMappingScore || 5
          },
          blockers: [
            { title: geminiData.blocker1Title || "Low Information Density", description: geminiData.blocker1Desc || "Lacks quantitative metrics" },
            { title: geminiData.blocker2Title || "Structural Inefficiency", description: geminiData.blocker2Desc || "Relies on conversational prose blocks" },
            { title: geminiData.blocker3Title || "Ambiguous Entity Footprint", description: geminiData.blocker3Desc || "Vague relative pronouns utilized" }
          ]
        } : undefined,
        standard: tier === "STANDARD" ? {
          unoptimizedSegment: geminiData.unoptimizedSegment || "",
          optimizedAlternative: geminiData.optimizedAlternative || "",
          qaBlocks: [
            { query: geminiData.qa1Query || "High intent query", formulation: geminiData.qa1Formulation || "" },
            { query: geminiData.qa2Query || "Secondary transactional/local query", formulation: geminiData.qa2Formulation || "" }
          ]
        } : undefined,
        pro: tier === "PRO" ? {
          primaryType: geminiData.primaryEntityType || "LocalBusiness",
          targetDomain: url,
          childNodes: geminiData.childNodes || [],
          jsonLd: geminiData.jsonLd || "{}"
        } : undefined
      }
    };

    res.json(auditResponse);
  } catch (error: any) {
    console.error("Audit processing error:", error);
    res.status(500).json({ error: error.message || "An error occurred during evaluation." });
  }
});

// Setup Vite Dev Middleware in development, static files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
