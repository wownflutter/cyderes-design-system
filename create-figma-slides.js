/**
 * Figma Slide Deck Creator
 *
 * This is a Figma Plugin script. To use it:
 * 1. Open your Figma file: https://www.figma.com/design/czYU3q5R60dshPUyOMlrqh/Sydecar-Contrast
 * 2. Go to Plugins > Development > New Plugin > "Figma design" > Save
 * 3. Replace the generated code.ts with this file's contents
 * 4. Run the plugin
 *
 * Or use the quick method:
 * 1. In Figma, open the Console (Menu > Plugins > Development > Open Console)
 * 2. Paste this entire script and press Enter
 */

// ── Colors ──
const BG_DARK = { r: 0.09, g: 0.09, b: 0.13 };       // #17171f
const BG_CARD = { r: 0.13, g: 0.13, b: 0.18 };        // #21212e
const TEXT_WHITE = { r: 1, g: 1, b: 1 };
const TEXT_DIM = { r: 0.6, g: 0.6, b: 0.65 };
const ACCENT = { r: 0.0, g: 0.82, b: 0.78 };          // #00d1c7 teal
const ACCENT_RED = { r: 0.9, g: 0.3, b: 0.3 };        // before
const ACCENT_GREEN = { r: 0.3, g: 0.85, b: 0.5 };     // after

const SLIDE_W = 1440;
const SLIDE_H = 900;
const PADDING = 80;
const SPACING = SLIDE_W + 100;

async function main() {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Light" });

  const slides = [];

  // ── Helper functions ──
  function createSlide(name, xIndex) {
    const frame = figma.createFrame();
    frame.name = name;
    frame.resize(SLIDE_W, SLIDE_H);
    frame.x = xIndex * SPACING;
    frame.y = 0;
    frame.fills = [{ type: "SOLID", color: BG_DARK }];
    return frame;
  }

  function addText(parent, text, x, y, opts = {}) {
    const node = figma.createText();
    node.characters = text;
    node.x = x;
    node.y = y;
    node.fontName = { family: "Inter", style: opts.style || "Regular" };
    node.fontSize = opts.size || 16;
    node.fills = [{ type: "SOLID", color: opts.color || TEXT_WHITE }];
    if (opts.width) {
      node.resize(opts.width, node.height);
      node.textAutoResize = "HEIGHT";
    }
    parent.appendChild(node);
    return node;
  }

  function addDivider(parent, x, y, width) {
    const line = figma.createLine();
    line.x = x;
    line.y = y;
    line.resize(width, 0);
    line.strokes = [{ type: "SOLID", color: { r: 0.3, g: 0.3, b: 0.35 } }];
    line.strokeWeight = 1;
    parent.appendChild(line);
    return line;
  }

  function addCard(parent, x, y, w, h) {
    const rect = figma.createFrame();
    rect.x = x;
    rect.y = y;
    rect.resize(w, h);
    rect.fills = [{ type: "SOLID", color: BG_CARD }];
    rect.cornerRadius = 12;
    parent.appendChild(rect);
    return rect;
  }

  // ── SLIDE 1: Title ──
  {
    const s = createSlide("01 — Title", 0);
    addText(s, "Redesigning Security\nfor the AI Era", PADDING, 240, {
      size: 56, style: "Bold", width: SLIDE_W - PADDING * 2
    });
    addText(s, "How research-driven design transformed Contrast Security's\nplatform — and what it means for Sydecar", PADDING, 400, {
      size: 22, style: "Light", color: TEXT_DIM, width: SLIDE_W - PADDING * 2
    });
    addDivider(s, PADDING, 500, 200);
    addText(s, "[Your Name]", PADDING, 530, { size: 18, style: "Medium" });
    addText(s, "April 2026", PADDING, 560, { size: 16, color: TEXT_DIM });
    slides.push(s);
  }

  // ── SLIDE 2: Strategic Context ──
  {
    const s = createSlide("02 — The Challenge", 1);
    addText(s, "The Challenge", PADDING, PADDING, { size: 40, style: "Bold" });
    addDivider(s, PADDING, 140, SLIDE_W - PADDING * 2);

    const bullets = [
      "Contrast Security faced an existential category shift — AI was disrupting traditional application security",
      "The product needed to pivot from a developer tool to an enterprise security platform",
      "A brand-new user persona (SOC analysts) had to be designed for from scratch",
      "62 research participants across enterprise accounts informed every decision"
    ];
    let by = 180;
    for (const b of bullets) {
      addText(s, "→", PADDING, by, { size: 18, color: ACCENT });
      addText(s, b, PADDING + 30, by, { size: 18, style: "Regular", width: SLIDE_W - PADDING * 2 - 40, color: TEXT_DIM });
      by += 70;
    }

    // Callout
    const callout = addCard(s, PADDING, 520, SLIDE_W - PADDING * 2, 80);
    addText(callout, '"We didn\'t just redesign an existing product — we helped Contrast pivot its category."', 24, 24, {
      size: 20, style: "Medium", color: ACCENT, width: SLIDE_W - PADDING * 2 - 48
    });
    slides.push(s);
  }

  // ── SLIDE 3: Research Synthesis ──
  {
    const s = createSlide("03 — Research Synthesis", 2);
    addText(s, "Research Synthesis", PADDING, PADDING, { size: 40, style: "Bold" });
    addDivider(s, PADDING, 140, SLIDE_W - PADDING * 2);

    const colW = (SLIDE_W - PADDING * 2 - 60) / 3;
    const columns = [
      { title: "Scale", items: ["62 participants", "Enterprise accounts", "Multiple personas:\nDevelopers, CISOs,\nSOC Analysts"] },
      { title: "Methods", items: ["Contextual inquiry", "Task analysis", "Stakeholder interviews", "Usability testing"] },
      { title: "Outcomes", items: ["New persona definition\n(SOC Analyst)", "Priority-driven IA", "Role-differentiated views", "Actionable intelligence\nover raw data"] }
    ];

    columns.forEach((col, i) => {
      const cx = PADDING + i * (colW + 30);
      const card = addCard(s, cx, 180, colW, 580);
      addText(card, col.title, 24, 24, { size: 22, style: "Bold", color: ACCENT });
      addDivider(card, 24, 60, colW - 48);
      let iy = 80;
      for (const item of col.items) {
        addText(card, item, 24, iy, { size: 16, color: TEXT_DIM, width: colW - 48 });
        iy += 60;
      }
    });
    slides.push(s);
  }

  // ── SLIDE 4: Before Overview ──
  {
    const s = createSlide("04 — Before: The Problem", 3);
    addText(s, "Before: A Reporting Platform,\nNot an Operational One", PADDING, 60, { size: 36, style: "Bold", width: SLIDE_W - PADDING * 2 });
    addDivider(s, PADDING, 160, SLIDE_W - PADDING * 2);

    const cardW = (SLIDE_W - PADDING * 2 - 30) / 2;
    const cardH = 260;
    const items = [
      { title: "Libraries / Vulnerabilities", desc: "Dense table view, raw data dump, no prioritization, no role differentiation. CISOs and developers see the same screen." },
      { title: "Dashboard", desc: "Static severity bars, meaningless letter grade, flat trend chart, \"Contrast News\" feed taking prime real estate. Nobody can act from this screen." },
      { title: "Attack Events", desc: "Endless identical \"SUSPICIOUS\" badges. Same IP, same app, same rule, same time repeated 20+ times. No grouping, no prioritization. Pure noise." },
      { title: "Applications List", desc: "7,335 applications with overlapping drawers and tooltips fighting for space. Raw code traces with no \"what does this mean\" context." }
    ];

    items.forEach((item, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const card = addCard(s, PADDING + col * (cardW + 30), 190 + row * (cardH + 20), cardW, cardH);
      addText(card, item.title, 24, 24, { size: 20, style: "Bold" });
      addDivider(card, 24, 60, cardW - 48);
      addText(card, item.desc, 24, 80, { size: 15, color: TEXT_DIM, width: cardW - 48 });
      // Red indicator
      const dot = figma.createEllipse();
      dot.resize(8, 8);
      dot.x = cardW - 32;
      dot.y = 28;
      dot.fills = [{ type: "SOLID", color: ACCENT_RED }];
      card.appendChild(dot);
    });

    // Callout at bottom
    addText(s, '"The data was there. But it was inert."', PADDING, SLIDE_H - 80, {
      size: 20, style: "Medium", color: ACCENT
    });
    slides.push(s);
  }

  // ── SLIDE 5: Before/After Grid ──
  {
    const s = createSlide("05 — Before → After", 4);
    addText(s, "Before → After", PADDING, 40, { size: 36, style: "Bold" });
    addText(s, "Four Surfaces, One Design Philosophy", PADDING + 340, 48, { size: 20, color: TEXT_DIM });

    // Column headers
    const leftCol = PADDING;
    const rightCol = SLIDE_W / 2 + 15;
    const colW = SLIDE_W / 2 - PADDING - 15;

    addText(s, "BEFORE", leftCol + 24, 100, { size: 14, style: "Bold", color: ACCENT_RED });
    addText(s, "AFTER", rightCol + 24, 100, { size: 14, style: "Bold", color: ACCENT_GREEN });

    const rows = [
      {
        label: "Vulnerability Library",
        before: "Dense table, every vulnerability equal weight. No context about what matters. CISO and developer see identical view.",
        after: "Priority-driven list with exploitability context. Role-aware — CISO sees business risk, developer sees fix path."
      },
      {
        label: "Executive Dashboard",
        before: "Static severity bars, meaningless letter grade, flat trend chart, \"Contrast News\" in prime real estate.",
        after: "Operational dashboard — what needs attention NOW. Urgency signals replace vanity metrics."
      },
      {
        label: "SOC Analyst View",
        before: "Didn't exist. Attack events buried in endless identical \"SUSPICIOUS\" rows. No grouping. Pure noise.",
        after: "Purpose-built for a new persona. Grouped attack patterns. Context-rich: source, target, frequency, blast radius."
      },
      {
        label: "Incident Detail",
        before: "Raw code traces, no \"what does this mean\" context, technical data with no narrative.",
        after: "Contextual incident story, impact assessment visible immediately, remediation guidance tailored to role."
      }
    ];

    const rowH = 160;
    const startY = 130;

    rows.forEach((row, i) => {
      const y = startY + i * (rowH + 12);

      // Label
      addText(s, row.label, leftCol, y, { size: 13, style: "Bold", color: ACCENT });

      // Before card
      const bCard = addCard(s, leftCol, y + 22, colW, rowH - 28);
      addText(bCard, row.before, 20, 16, { size: 14, color: TEXT_DIM, width: colW - 40 });

      // After card
      const aCard = addCard(s, rightCol, y + 22, colW, rowH - 28);
      addText(aCard, row.after, 20, 16, { size: 14, color: TEXT_WHITE, width: colW - 40 });
    });

    // Callout
    addText(s, '"We didn\'t improve existing surfaces — we invented new ones for personas that didn\'t exist in the product yet."', PADDING, SLIDE_H - 60, {
      size: 16, style: "Medium", color: ACCENT, width: SLIDE_W - PADDING * 2
    });
    slides.push(s);
  }

  // ── SLIDE 6: ADR Strategic Context ──
  {
    const s = createSlide("06 — Architecture Decision Records", 5);
    addText(s, "Architecture Decision Records", PADDING, PADDING, { size: 40, style: "Bold", width: SLIDE_W - PADDING * 2 });
    addDivider(s, PADDING, 150, SLIDE_W - PADDING * 2);

    const bullets = [
      "Every major design decision documented with strategic rationale",
      "ADRs connected research findings to business outcomes",
      "Created shared language between design, engineering, and product leadership",
      "Enabled the team to move fast without losing alignment"
    ];
    let by = 190;
    for (const b of bullets) {
      addText(s, "→", PADDING, by, { size: 18, color: ACCENT });
      addText(s, b, PADDING + 30, by, { size: 20, color: TEXT_DIM, width: SLIDE_W - PADDING * 2 - 40 });
      by += 70;
    }

    // Flow diagram
    const flowY = 520;
    const steps = ["Research", "ADR", "Design", "Validation"];
    const stepW = 180;
    const totalW = steps.length * stepW + (steps.length - 1) * 40;
    const startX = (SLIDE_W - totalW) / 2;

    steps.forEach((step, i) => {
      const card = addCard(s, startX + i * (stepW + 40), flowY, stepW, 60);
      addText(card, step, 0, 16, { size: 18, style: "Bold", color: ACCENT, width: stepW });
      // Center text
      const t = card.children[0];
      t.textAlignHorizontal = "CENTER";

      if (i < steps.length - 1) {
        addText(s, "→", startX + i * (stepW + 40) + stepW + 8, flowY + 16, { size: 22, color: TEXT_DIM });
      }
    });

    addText(s, "A traceable chain from insight to outcome.", PADDING, 620, {
      size: 18, style: "Medium", color: ACCENT
    });
    slides.push(s);
  }

  // ── SLIDE 7: Design Principles → Sydecar ──
  {
    const s = createSlide("07 — What This Means for Sydecar", 6);
    addText(s, "What This Means for Sydecar", PADDING, 40, { size: 36, style: "Bold", width: SLIDE_W - PADDING * 2 });
    addDivider(s, PADDING, 100, SLIDE_W - PADDING * 2);

    const principles = [
      {
        title: "Data should be actionable, not just visible",
        application: "Fund dashboard shows four numbers with no urgency signal. Investor list repeats \"NEEDS TO RESPOND\" identically. Activity feed has no prioritization."
      },
      {
        title: "Surfaces should serve the role, not just display the record",
        application: "A fund manager with 228 members and active SPVs needs help knowing what requires attention right now. Filing cabinet → decision support tool."
      },
      {
        title: "Intelligence over information",
        application: "Members table has rich data (invest rate, median check, interests) but no intelligence applied. Make the platform tell you what matters."
      },
      {
        title: "New categories need new personas",
        application: "Sydecar is expanding categories. At Contrast, we designed for a persona that didn't exist in the product. That's exactly this role's muscle."
      }
    ];

    const cardH = 155;
    const cardW = (SLIDE_W - PADDING * 2 - 30) / 2;

    principles.forEach((p, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const card = addCard(s, PADDING + col * (cardW + 30), 130 + row * (cardH + 20), cardW, cardH);

      addText(card, p.title, 24, 20, { size: 16, style: "Bold", color: ACCENT, width: cardW - 48 });
      addDivider(card, 24, 55, cardW - 48);
      addText(card, p.application, 24, 70, { size: 14, color: TEXT_DIM, width: cardW - 48 });
    });

    // Bottom callout
    addText(s, "Same patterns. Same opportunity. Proven approach.", PADDING, SLIDE_H - 70, {
      size: 20, style: "Medium", color: ACCENT
    });
    slides.push(s);
  }

  // ── SLIDE 8: Closing ──
  {
    const s = createSlide("08 — The Through Line", 7);
    addText(s, "The Through Line", PADDING, 200, { size: 48, style: "Bold" });
    addDivider(s, PADDING, 280, 200);
    addText(s, "At Contrast, I helped a security platform pivot its entire category by designing for users who didn't exist in the product yet — grounded in research with 62 participants across enterprise accounts.", PADDING, 320, {
      size: 22, style: "Light", color: TEXT_DIM, width: SLIDE_W - PADDING * 2
    });
    addText(s, "Sydecar is at the same inflection point. Expanding categories. New user needs. Data that's rich but inert.", PADDING, 460, {
      size: 22, style: "Regular", color: TEXT_WHITE, width: SLIDE_W - PADDING * 2
    });
    addText(s, "I've done exactly this before, and I have the research and outcomes to prove it.", PADDING, 540, {
      size: 24, style: "Bold", color: ACCENT, width: SLIDE_W - PADDING * 2
    });
    slides.push(s);
  }

  // ── SLIDE 9: Thank You ──
  {
    const s = createSlide("09 — Let's Talk", 8);
    addText(s, "Let's Talk", PADDING, 320, { size: 64, style: "Bold" });
    addDivider(s, PADDING, 410, 160);
    addText(s, "[Your Name]", PADDING, 440, { size: 24, style: "Medium" });
    addText(s, "[Email]  ·  [Portfolio URL]", PADDING, 480, { size: 18, color: TEXT_DIM });
    slides.push(s);
  }

  // Zoom to fit
  figma.viewport.scrollAndZoomIntoView(slides);
  figma.notify("✅ 9 slides created!");
  figma.closePlugin();
}

main();
