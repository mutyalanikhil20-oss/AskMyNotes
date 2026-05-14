document.addEventListener("DOMContentLoaded", () => {
  // Existing element references
  const questionEl   = document.querySelector("#question");
  const askBtn       = document.querySelector("#ask-btn");
  const statusEl     = document.querySelector("#status");
  const answerEl     = document.querySelector("#answer");
  const answerTextEl = document.querySelector("#answer-text");
  const qtypePill    = document.querySelector("#type-pill");
  const toolPill     = document.querySelector("#tool-pill");
  const sourcesEl    = document.querySelector("#sources");
  const sourcesListEl= document.querySelector("#sources-list");

  // Upload file elements
  const pdfInput     = document.querySelector("#pdf-input");
  const uploadStatus = document.querySelector("#upload-status");

  // Color mapping for question type pills
  const QTYPE_COLORS = {
    definition: "bg-blue-100 text-blue-700",
    example:    "bg-green-100 text-green-700",
    comparison: "bg-purple-100 text-purple-700",
  };

  // ── Helper: reset answer UI to hidden/empty state ─────────────────────────
  function resetAnswerUI() {
    // Hide answer panel
    answerEl.classList.add("hidden");

    // Clear answer text
    answerTextEl.textContent = "";

    // Hide and clear question-type pill
    qtypePill.classList.add("hidden");
    qtypePill.textContent = "";
    qtypePill.className = "hidden";

    // Hide and clear tool pill
    toolPill.classList.add("hidden");
    toolPill.textContent = "";

    // Hide sources accordion and clear list
    if (sourcesEl) sourcesEl.classList.add("hidden");
    if (sourcesListEl) sourcesListEl.innerHTML = "";
  }

  // ── Upload handler ─────────────────────────────────────────────────────────
  pdfInput.addEventListener("change", handleUpload);

  function handleUpload() {
    const file = pdfInput.files[0];
    if (!file) return;
    uploadStatus.textContent = `Uploading ${file.name}...`;
    uploadStatus.className = "text-sm text-slate-500";
    const fd = new FormData();
    fd.append("file", file);
    // No real backend — upload simulation only
  }

  // ── Submit handler ─────────────────────────────────────────────────────────
  askBtn.addEventListener("click", () => {

    // Step 1 — Read and validate input
    const rawValue = questionEl.value;
    const question = rawValue.trim();

    if (!question) {
      statusEl.textContent = "Please type a question first.";
      statusEl.className   = "text-sm text-red-500 mt-2 min-h-[1.25rem]";
      resetAnswerUI();
      return;
    }

    // Step 2 — Show loading state
    resetAnswerUI();
    statusEl.textContent = "Thinking...";
    statusEl.className   = "text-sm text-gray-500 mt-2 min-h-[1.25rem]";

    // Step 3 — Simulate backend delay (ONE setTimeout, 600ms)
    setTimeout(() => {

      // Step 4 — Determine placeholder question type
      const lower = question.toLowerCase();
      let placeholderType;

      if (lower.startsWith("what is")) {
        placeholderType = "definition";
      } else if (
        lower.startsWith("give") ||
        lower.includes("example")
      ) {
        placeholderType = "example";
      } else if (
        lower.includes("vs") ||
        lower.includes("versus") ||
        lower.includes("compare") ||
        lower.includes("difference")
      ) {
        placeholderType = "comparison";
      } else {
        placeholderType = "definition";
      }

      // Step 5 — Determine placeholder tool
      const isArithmetic = /^[\d\s+\-*/()%.^]+$/.test(question);
      const placeholderTool = isArithmetic ? "calculator" : "search_notes";

      // Step 6 — Build placeholder answer
      const placeholderAnswer =
        `Placeholder answer for: "${question}". Real answers will appear here once the backend is connected.`;

      // Step 7 — Populate UI

      // Answer text
      answerTextEl.textContent = placeholderAnswer;

      // Question-type pill
      const typeColors = QTYPE_COLORS[placeholderType] || "bg-gray-100 text-gray-700";
      qtypePill.textContent = `type: ${placeholderType}`;
      qtypePill.className   = `inline-block rounded-full px-3 py-1 text-xs font-semibold ${typeColors}`;

      // Tool pill
      toolPill.textContent = `tool: ${placeholderTool}`;
      toolPill.classList.remove("hidden");

      // Sources list
      if (sourcesListEl) {
        sourcesListEl.innerHTML = "";

        const chunks = [
          "Sample source chunk 1 — example excerpt from the uploaded notes.",
          "Sample source chunk 2 — another excerpt.",
          "Sample source chunk 3 — final excerpt.",
        ];

        chunks.forEach((chunkText) => {
          const li = document.createElement("li");
          li.textContent = chunkText;
          sourcesListEl.appendChild(li);
        });
      }

      // Calculator path: keep sources hidden; otherwise show
      if (placeholderTool === "calculator") {
        if (sourcesEl) sourcesEl.classList.add("hidden");
      } else {
        if (sourcesEl) sourcesEl.classList.remove("hidden");
      }

      // Reveal answer panel
      answerEl.classList.remove("hidden");

      // Clear status message
      statusEl.textContent = "";

    }, 600);
  });
});