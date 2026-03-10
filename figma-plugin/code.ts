// ─────────────────────────────────────────────────────────────
// Cyderes Design System Generator — Figma Plugin
// 60 % Darkstar structure  ·  40 % Cyderes color accents
// ─────────────────────────────────────────────────────────────

// ── Tokens ──────────────────────────────────────────────────

const C = {
  // Cyderes brand accents (40 %)
  accentPrimary:    { r: 0.224, g: 0.725, b: 0.522 },   // #39B985
  accentHover:      { r: 0.184, g: 0.639, b: 0.455 },   // #2FA374
  accentDim:        { r: 0.059, g: 0.180, b: 0.133 },   // #0F2E22
  accentWarning:    { r: 0.867, g: 0.431, b: 0.118 },   // #DD6E1E
  accentHighlight:  { r: 1.000, g: 0.859, b: 0.212 },   // #FFDB36
  accentSecondary:  { r: 0.000, g: 0.345, b: 0.439 },   // #005970

  // Severity
  sevCritical:      { r: 1.000, g: 0.451, b: 0.580 },   // #FF7394
  sevHigh:          { r: 0.867, g: 0.431, b: 0.118 },   // #DD6E1E
  sevMedium:        { r: 1.000, g: 0.859, b: 0.212 },   // #FFDB36
  sevOk:            { r: 0.224, g: 0.725, b: 0.522 },   // #39B985
  sevInfo:          { r: 0.702, g: 0.878, b: 1.000 },   // #B3E0FF
  sevNeutral:       { r: 0.596, g: 0.596, b: 0.627 },   // #9898A0
  sevPurple:        { r: 0.631, g: 0.329, b: 0.894 },   // #A154E4
  sevTeal:          { r: 0.380, g: 0.788, b: 0.827 },   // #61C9D3

  // Darkstar surfaces (60 %)
  surfaceBase:      { r: 0.031, g: 0.047, b: 0.094 },   // #080C18
  surfaceRaised:    { r: 0.141, g: 0.161, b: 0.267 },   // #242944
  surfaceOverlay:   { r: 0.082, g: 0.078, b: 0.157 },   // #151428
  surfaceSunken:    { r: 0.000, g: 0.008, b: 0.043 },   // #00020B
  surfaceHover:     { r: 0.180, g: 0.208, b: 0.329 },   // #2E3554
  surfaceActive:    { r: 0.102, g: 0.122, b: 0.227 },   // #1A1F3A

  // Borders
  borderDefault:    { r: 0.298, g: 0.329, b: 0.569 },   // #4C5491
  borderSubtle:     { r: 0.141, g: 0.161, b: 0.267 },   // #242944

  // Text
  textPrimary:      { r: 0.925, g: 0.925, b: 0.941 },   // #ECECF0
  textSecondary:    { r: 0.596, g: 0.596, b: 0.627 },   // #9898A0
  textDisabled:     { r: 0.361, g: 0.361, b: 0.400 },   // #5C5C66
  textInverse:      { r: 0.075, g: 0.075, b: 0.075 },   // #131313

  // Utility
  white:            { r: 1, g: 1, b: 1 },
  black:            { r: 0, g: 0, b: 0 },
  transparent:      { r: 0, g: 0, b: 0 },               // used with 0 opacity
} as const;

type RGB = { r: number; g: number; b: number };

// ── Radius & spacing constants ──────────────────────────────
const RADIUS = { sm: 4, md: 6, lg: 8, xl: 12, xxl: 16, pill: 100 };
const SPACE  = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 };

// ── Font loading ────────────────────────────────────────────
async function loadFonts() {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
}

// ── Helpers ─────────────────────────────────────────────────

function solid(color: RGB, opacity = 1): Paint[] {
  return [{ type: "SOLID", color, opacity }];
}

function text(
  parent: FrameNode | ComponentNode,
  value: string,
  opts: {
    size?: number;
    weight?: "Regular" | "Medium" | "Semi Bold" | "Bold";
    color?: RGB;
    x?: number;
    y?: number;
    width?: number;
  } = {}
): TextNode {
  const t = figma.createText();
  t.characters = value;
  t.fontSize = opts.size ?? 14;
  t.fontName = { family: "Inter", style: opts.weight ?? "Regular" };
  t.fills = solid(opts.color ?? C.textPrimary);
  if (opts.x !== undefined) t.x = opts.x;
  if (opts.y !== undefined) t.y = opts.y;
  if (opts.width !== undefined) {
    t.resize(opts.width, t.height);
    t.textAutoResize = "HEIGHT";
  }
  parent.appendChild(t);
  return t;
}

function autoFrame(
  name: string,
  dir: "HORIZONTAL" | "VERTICAL" = "VERTICAL",
  gap = 0
): FrameNode {
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = dir;
  f.itemSpacing = gap;
  f.primaryAxisSizingMode = "AUTO";
  f.counterAxisSizingMode = "AUTO";
  f.fills = [];
  return f;
}

function sectionHeader(title: string, subtitle?: string): FrameNode {
  const wrap = autoFrame(`Section: ${title}`, "VERTICAL", 8);
  wrap.paddingBottom = 24;
  const h = text(wrap, title, { size: 28, weight: "Semi Bold", color: C.textPrimary });
  if (subtitle) {
    text(wrap, subtitle, { size: 14, color: C.textSecondary });
  }
  // divider
  const div = figma.createFrame();
  div.name = "Divider";
  div.resize(800, 2);
  div.fills = solid(C.borderDefault, 0.5);
  div.layoutAlign = "STRETCH";
  wrap.appendChild(div);
  return wrap;
}

function setBorder(node: FrameNode | ComponentNode, color: RGB, width = 1, opacity = 1) {
  node.strokes = solid(color, opacity);
  node.strokeWeight = width;
  node.strokeAlign = "INSIDE";
}

// ── BUTTONS ─────────────────────────────────────────────────

function createButton(
  label: string,
  variant: "primary" | "secondary" | "ghost" | "danger",
  size: "sm" | "md" | "lg" = "md"
): ComponentNode {
  const comp = figma.createComponent();
  comp.name = `Button / ${variant} / ${size}`;

  comp.layoutMode = "HORIZONTAL";
  comp.primaryAxisSizingMode = "AUTO";
  comp.counterAxisSizingMode = "AUTO";
  comp.counterAxisAlignItems = "CENTER";
  comp.primaryAxisAlignItems = "CENTER";

  const py = size === "sm" ? 6 : size === "md" ? 10 : 14;
  const px = size === "sm" ? 12 : size === "md" ? 20 : 28;
  comp.paddingTop = py;
  comp.paddingBottom = py;
  comp.paddingLeft = px;
  comp.paddingRight = px;
  comp.cornerRadius = RADIUS.md;
  comp.itemSpacing = 8;

  switch (variant) {
    case "primary":
      comp.fills = solid(C.accentPrimary);
      break;
    case "secondary":
      comp.fills = solid(C.white, 0.06);
      setBorder(comp, C.borderDefault, 1, 0.6);
      break;
    case "ghost":
      comp.fills = solid(C.transparent, 0);
      break;
    case "danger":
      comp.fills = solid(C.sevCritical, 0.12);
      setBorder(comp, C.sevCritical, 1, 0.4);
      break;
  }

  const textColor =
    variant === "primary" ? C.textInverse :
    variant === "danger"  ? C.sevCritical :
    C.textPrimary;
  const fontSize = size === "sm" ? 12 : size === "md" ? 14 : 16;
  const weight = variant === "ghost" ? "Medium" : "Semi Bold";

  text(comp, label, { size: fontSize, weight, color: textColor });

  return comp;
}

function buildButtonsSection(): FrameNode {
  const section = autoFrame("Buttons", "VERTICAL", 32);
  section.appendChild(sectionHeader("Buttons", "Primary, secondary, ghost, and danger variants — transparent Darkstar style"));

  const variants: Array<"primary" | "secondary" | "ghost" | "danger"> = ["primary", "secondary", "ghost", "danger"];
  const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

  for (const v of variants) {
    const row = autoFrame(`${v} row`, "HORIZONTAL", 16);
    row.counterAxisAlignItems = "CENTER";

    const label = text(row, v.charAt(0).toUpperCase() + v.slice(1), {
      size: 12,
      weight: "Medium",
      color: C.textSecondary,
    });
    label.resize(80, label.height);

    for (const s of sizes) {
      row.appendChild(createButton("Button", v, s));
    }

    // disabled state for md
    const disabled = createButton("Disabled", v, "md");
    disabled.name += " / disabled";
    disabled.opacity = 0.4;
    row.appendChild(disabled);

    section.appendChild(row);
  }

  // icon button
  const iconRow = autoFrame("icon row", "HORIZONTAL", 16);
  iconRow.counterAxisAlignItems = "CENTER";
  text(iconRow, "Icon", { size: 12, weight: "Medium", color: C.textSecondary }).resize(80, 14);

  const iconBtn = figma.createComponent();
  iconBtn.name = "Button / icon-only / md";
  iconBtn.layoutMode = "HORIZONTAL";
  iconBtn.primaryAxisSizingMode = "FIXED";
  iconBtn.counterAxisSizingMode = "FIXED";
  iconBtn.resize(40, 40);
  iconBtn.primaryAxisAlignItems = "CENTER";
  iconBtn.counterAxisAlignItems = "CENTER";
  iconBtn.cornerRadius = RADIUS.md;
  iconBtn.fills = solid(C.white, 0.06);
  setBorder(iconBtn, C.borderDefault, 1, 0.6);
  const plus = text(iconBtn, "+", { size: 18, weight: "Bold", color: C.textPrimary });
  iconRow.appendChild(iconBtn);
  section.appendChild(iconRow);

  return section;
}

// ── TAGS / CHIPS ────────────────────────────────────────────

function createTag(
  label: string,
  color: RGB,
  style: "filled" | "transparent" | "outline",
  size: "sm" | "md" = "md",
  hasClose = false
): ComponentNode {
  const comp = figma.createComponent();
  comp.name = `Tag / ${style} / ${size}${hasClose ? " / dismissible" : ""}`;

  comp.layoutMode = "HORIZONTAL";
  comp.primaryAxisSizingMode = "AUTO";
  comp.counterAxisSizingMode = "AUTO";
  comp.counterAxisAlignItems = "CENTER";
  comp.itemSpacing = 6;

  const py = size === "sm" ? 2 : 4;
  const px = size === "sm" ? 8 : 12;
  comp.paddingTop = py;
  comp.paddingBottom = py;
  comp.paddingLeft = px;
  comp.paddingRight = px;
  comp.cornerRadius = RADIUS.pill;

  switch (style) {
    case "filled":
      comp.fills = solid(color, 0.16);
      break;
    case "transparent":
      comp.fills = solid(C.transparent, 0);
      break;
    case "outline":
      comp.fills = solid(C.transparent, 0);
      setBorder(comp, color, 1, 0.5);
      break;
  }

  const fontSize = size === "sm" ? 11 : 13;
  text(comp, label, { size: fontSize, weight: "Medium", color });

  if (hasClose) {
    text(comp, "\u00D7", { size: fontSize + 2, weight: "Regular", color });
  }

  return comp;
}

function createChip(label: string, state: "default" | "active"): ComponentNode {
  const comp = figma.createComponent();
  comp.name = `Chip / ${state}`;

  comp.layoutMode = "HORIZONTAL";
  comp.primaryAxisSizingMode = "AUTO";
  comp.counterAxisSizingMode = "AUTO";
  comp.counterAxisAlignItems = "CENTER";
  comp.itemSpacing = 6;
  comp.paddingTop = 6;
  comp.paddingBottom = 6;
  comp.paddingLeft = 14;
  comp.paddingRight = 14;
  comp.cornerRadius = RADIUS.pill;

  if (state === "active") {
    comp.fills = solid(C.accentPrimary, 0.14);
    setBorder(comp, C.accentPrimary, 1, 0.5);
    text(comp, label, { size: 13, weight: "Medium", color: C.accentPrimary });
  } else {
    comp.fills = solid(C.white, 0.04);
    setBorder(comp, C.borderDefault, 1, 0.4);
    text(comp, label, { size: 13, weight: "Regular", color: C.textSecondary });
  }

  return comp;
}

function buildTagsSection(): FrameNode {
  const section = autoFrame("Tags / Chips", "VERTICAL", 32);
  section.appendChild(sectionHeader("Tags / Chips", "Severity pills, transparent tags, and filter chips"));

  // Severity pills
  const sevRow = autoFrame("severity row", "HORIZONTAL", 10);
  const severities: Array<{ label: string; color: RGB }> = [
    { label: "Critical",  color: C.sevCritical },
    { label: "High",      color: C.sevHigh },
    { label: "Medium",    color: C.sevMedium },
    { label: "OK",        color: C.sevOk },
    { label: "Info",      color: C.sevInfo },
    { label: "Neutral",   color: C.sevNeutral },
    { label: "Purple",    color: C.sevPurple },
    { label: "Teal",      color: C.sevTeal },
  ];
  for (const s of severities) {
    sevRow.appendChild(createTag(s.label, s.color, "filled", "md"));
  }
  section.appendChild(sevRow);

  // Small severity
  const sevSmRow = autoFrame("severity sm row", "HORIZONTAL", 10);
  for (const s of severities) {
    sevSmRow.appendChild(createTag(s.label, s.color, "filled", "sm"));
  }
  section.appendChild(sevSmRow);

  // Transparent tags
  const transRow = autoFrame("transparent row", "HORIZONTAL", 10);
  for (const s of severities.slice(0, 4)) {
    transRow.appendChild(createTag(s.label, s.color, "transparent", "md"));
  }
  section.appendChild(transRow);

  // Outline tags with close
  const outlineRow = autoFrame("outline row", "HORIZONTAL", 10);
  outlineRow.appendChild(createTag("Filter", C.accentPrimary, "outline", "md", true));
  outlineRow.appendChild(createTag("Category", C.sevInfo, "outline", "md", true));
  outlineRow.appendChild(createTag("Status", C.sevMedium, "outline", "md", true));
  section.appendChild(outlineRow);

  // Chips
  const chipRow = autoFrame("chip row", "HORIZONTAL", 10);
  chipRow.appendChild(createChip("All", "active"));
  chipRow.appendChild(createChip("Open", "default"));
  chipRow.appendChild(createChip("Closed", "default"));
  chipRow.appendChild(createChip("Pending", "default"));
  section.appendChild(chipRow);

  return section;
}

// ── CARDS ───────────────────────────────────────────────────

function createCard(
  title: string,
  body: string,
  variant: "default" | "accent" | "stat"
): ComponentNode {
  const comp = figma.createComponent();
  comp.name = `Card / ${variant}`;

  comp.layoutMode = "VERTICAL";
  comp.primaryAxisSizingMode = "AUTO";
  comp.counterAxisSizingMode = "FIXED";
  comp.resize(360, 10);
  comp.itemSpacing = 16;
  comp.paddingTop = 24;
  comp.paddingBottom = 24;
  comp.paddingLeft = 24;
  comp.paddingRight = 24;
  comp.cornerRadius = RADIUS.lg;
  comp.fills = solid(C.surfaceRaised);
  setBorder(comp, C.borderSubtle, 1, 0.6);

  if (variant === "accent") {
    // top accent bar
    const bar = figma.createFrame();
    bar.name = "Accent Bar";
    bar.resize(312, 3);
    bar.fills = solid(C.accentPrimary);
    bar.cornerRadius = 2;
    bar.layoutAlign = "STRETCH";
    comp.appendChild(bar);
  }

  if (variant === "stat") {
    // large metric
    text(comp, "2,847", { size: 36, weight: "Bold", color: C.accentPrimary });
  }

  text(comp, title, { size: 16, weight: "Semi Bold", color: C.textPrimary });
  text(comp, body, {
    size: 14,
    weight: "Regular",
    color: C.textSecondary,
    width: 312,
  });

  // footer row
  const footer = autoFrame("Footer", "HORIZONTAL", 8);
  footer.layoutAlign = "STRETCH";
  footer.counterAxisAlignItems = "CENTER";
  footer.appendChild(createTag("Status", C.sevOk, "filled", "sm"));
  const spacer = figma.createFrame();
  spacer.name = "Spacer";
  spacer.layoutGrow = 1;
  spacer.resize(10, 1);
  spacer.fills = [];
  footer.appendChild(spacer);
  text(footer, "View details \u2192", { size: 12, weight: "Medium", color: C.accentPrimary });
  comp.appendChild(footer);

  return comp;
}

function buildCardsSection(): FrameNode {
  const section = autoFrame("Cards", "VERTICAL", 32);
  section.appendChild(sectionHeader("Cards", "Surface cards with optional accent bars and stat displays"));

  const row = autoFrame("card row", "HORIZONTAL", 24);
  row.appendChild(createCard("Threat Overview", "Summary of detected threats across all monitored endpoints in the last 24 hours.", "default"));
  row.appendChild(createCard("Risk Score", "Current risk posture based on active vulnerabilities and exposure metrics.", "accent"));
  row.appendChild(createCard("Active Incidents", "Total open incidents requiring analyst attention and triage.", "stat"));
  section.appendChild(row);

  return section;
}

// ── INPUTS ──────────────────────────────────────────────────

function createInput(
  placeholder: string,
  variant: "default" | "focused" | "error" | "disabled",
  hasLeftIcon = false,
  hasRightIcon = false
): ComponentNode {
  const comp = figma.createComponent();
  comp.name = `Input / ${variant}`;

  comp.layoutMode = "HORIZONTAL";
  comp.primaryAxisSizingMode = "FIXED";
  comp.counterAxisSizingMode = "AUTO";
  comp.counterAxisAlignItems = "CENTER";
  comp.resize(320, 10);
  comp.itemSpacing = 8;
  comp.paddingTop = 10;
  comp.paddingBottom = 10;
  comp.paddingLeft = 14;
  comp.paddingRight = 14;
  comp.cornerRadius = RADIUS.md;
  comp.fills = solid(C.surfaceBase);

  switch (variant) {
    case "default":
      setBorder(comp, C.borderDefault, 1, 0.5);
      break;
    case "focused":
      setBorder(comp, C.accentPrimary, 1.5);
      break;
    case "error":
      setBorder(comp, C.sevCritical, 1.5);
      break;
    case "disabled":
      setBorder(comp, C.borderDefault, 1, 0.25);
      comp.opacity = 0.5;
      break;
  }

  if (hasLeftIcon) {
    text(comp, "\u2315", { size: 16, color: C.textSecondary }); // search glyph
  }

  const t = text(comp, placeholder, {
    size: 14,
    weight: "Regular",
    color: variant === "disabled" ? C.textDisabled : C.textSecondary,
  });
  t.layoutGrow = 1;

  if (hasRightIcon) {
    text(comp, "\u2715", { size: 14, color: C.textSecondary }); // x glyph
  }

  return comp;
}

function createTextarea(): ComponentNode {
  const comp = figma.createComponent();
  comp.name = "Input / textarea";

  comp.layoutMode = "VERTICAL";
  comp.primaryAxisSizingMode = "FIXED";
  comp.counterAxisSizingMode = "FIXED";
  comp.resize(320, 120);
  comp.paddingTop = 12;
  comp.paddingBottom = 12;
  comp.paddingLeft = 14;
  comp.paddingRight = 14;
  comp.cornerRadius = RADIUS.md;
  comp.fills = solid(C.surfaceBase);
  setBorder(comp, C.borderDefault, 1, 0.5);

  text(comp, "Enter description...", { size: 14, color: C.textSecondary, width: 292 });
  return comp;
}

function buildInputsSection(): FrameNode {
  const section = autoFrame("Inputs", "VERTICAL", 32);
  section.appendChild(sectionHeader("Inputs", "Text fields, search bars, and textareas"));

  // States row
  const statesRow = autoFrame("states row", "HORIZONTAL", 16);
  statesRow.appendChild(createInput("Placeholder text", "default"));
  statesRow.appendChild(createInput("Focused input", "focused"));
  statesRow.appendChild(createInput("Error state", "error"));
  statesRow.appendChild(createInput("Disabled", "disabled"));
  section.appendChild(statesRow);

  // With icons
  const iconRow = autoFrame("icon row", "HORIZONTAL", 16);
  iconRow.appendChild(createInput("Search...", "default", true, false));
  iconRow.appendChild(createInput("Filter value", "default", true, true));
  section.appendChild(iconRow);

  // Labels + input
  const labeledWrap = autoFrame("labeled input", "VERTICAL", 6);
  text(labeledWrap, "Email address", { size: 13, weight: "Medium", color: C.textPrimary });
  labeledWrap.appendChild(createInput("name@cyderes.com", "default"));
  text(labeledWrap, "We'll never share your email.", { size: 12, color: C.textSecondary });
  section.appendChild(labeledWrap);

  // Error label + input
  const errorWrap = autoFrame("error input", "VERTICAL", 6);
  text(errorWrap, "Password", { size: 13, weight: "Medium", color: C.textPrimary });
  errorWrap.appendChild(createInput("Required field", "error"));
  text(errorWrap, "Password must be at least 8 characters.", { size: 12, color: C.sevCritical });
  section.appendChild(errorWrap);

  // Textarea
  section.appendChild(createTextarea());

  return section;
}

// ── DROPDOWNS ───────────────────────────────────────────────

function createDropdownTrigger(
  label: string,
  state: "default" | "open"
): ComponentNode {
  const comp = figma.createComponent();
  comp.name = `Dropdown / trigger / ${state}`;

  comp.layoutMode = "HORIZONTAL";
  comp.primaryAxisSizingMode = "FIXED";
  comp.counterAxisSizingMode = "AUTO";
  comp.counterAxisAlignItems = "CENTER";
  comp.resize(260, 10);
  comp.itemSpacing = 8;
  comp.paddingTop = 10;
  comp.paddingBottom = 10;
  comp.paddingLeft = 14;
  comp.paddingRight = 14;
  comp.cornerRadius = RADIUS.md;
  comp.fills = solid(C.surfaceBase);

  if (state === "open") {
    setBorder(comp, C.accentPrimary, 1.5);
  } else {
    setBorder(comp, C.borderDefault, 1, 0.5);
  }

  const t = text(comp, label, { size: 14, color: C.textPrimary });
  t.layoutGrow = 1;

  const arrow = state === "open" ? "\u25B2" : "\u25BC";
  text(comp, arrow, { size: 10, color: C.textSecondary });

  return comp;
}

function createDropdownMenu(): ComponentNode {
  const comp = figma.createComponent();
  comp.name = "Dropdown / menu";

  comp.layoutMode = "VERTICAL";
  comp.primaryAxisSizingMode = "AUTO";
  comp.counterAxisSizingMode = "FIXED";
  comp.resize(260, 10);
  comp.paddingTop = 4;
  comp.paddingBottom = 4;
  comp.cornerRadius = RADIUS.lg;
  comp.fills = solid(C.surfaceRaised);
  setBorder(comp, C.borderDefault, 1, 0.3);

  // shadow effect
  comp.effects = [
    {
      type: "DROP_SHADOW",
      color: { r: 0, g: 0, b: 0, a: 0.4 },
      offset: { x: 0, y: 4 },
      radius: 16,
      spread: 0,
      visible: true,
      blendMode: "NORMAL",
    },
  ];

  const items = ["Option one", "Option two", "Option three", "Option four"];
  items.forEach((item, i) => {
    const row = autoFrame(`item-${i}`, "HORIZONTAL", 8);
    row.paddingTop = 10;
    row.paddingBottom = 10;
    row.paddingLeft = 14;
    row.paddingRight = 14;
    row.layoutAlign = "STRETCH";
    row.counterAxisAlignItems = "CENTER";

    if (i === 1) {
      row.fills = solid(C.accentPrimary, 0.1);
    }

    const color = i === 1 ? C.accentPrimary : C.textPrimary;
    const t = text(row, item, { size: 14, color });
    t.layoutGrow = 1;

    if (i === 1) {
      text(row, "\u2713", { size: 14, weight: "Bold", color: C.accentPrimary });
    }

    comp.appendChild(row);
  });

  return comp;
}

function buildDropdownsSection(): FrameNode {
  const section = autoFrame("Dropdowns", "VERTICAL", 32);
  section.appendChild(sectionHeader("Dropdowns", "Select triggers and floating menus"));

  const row = autoFrame("trigger row", "HORIZONTAL", 24);
  row.appendChild(createDropdownTrigger("Select option...", "default"));
  row.appendChild(createDropdownTrigger("Option two", "open"));
  section.appendChild(row);

  // assembled dropdown
  const assembled = autoFrame("assembled", "VERTICAL", 4);
  assembled.appendChild(createDropdownTrigger("Option two", "open"));
  assembled.appendChild(createDropdownMenu());
  section.appendChild(assembled);

  return section;
}

// ── TABLES ──────────────────────────────────────────────────

function createTableCell(
  value: string,
  opts: {
    isHeader?: boolean;
    width?: number;
    severity?: RGB;
    isTag?: boolean;
  } = {}
): FrameNode {
  const cell = autoFrame("Cell", "HORIZONTAL", 8);
  cell.primaryAxisSizingMode = "FIXED";
  cell.counterAxisSizingMode = "AUTO";
  cell.resize(opts.width ?? 160, 10);
  cell.counterAxisAlignItems = "CENTER";
  cell.paddingTop = 14;
  cell.paddingBottom = 14;
  cell.paddingLeft = 16;
  cell.paddingRight = 16;

  if (opts.isTag && opts.severity) {
    cell.appendChild(createTag(value, opts.severity, "filled", "sm"));
  } else {
    text(cell, value, {
      size: opts.isHeader ? 13 : 14,
      weight: opts.isHeader ? "Semi Bold" : "Regular",
      color: opts.isHeader ? C.textSecondary : C.textPrimary,
    });
  }

  return cell;
}

function createTableRow(
  cells: Array<{ value: string; width?: number; severity?: RGB; isTag?: boolean }>,
  isHeader = false
): FrameNode {
  const row = autoFrame(isHeader ? "Header Row" : "Row", "HORIZONTAL", 0);

  if (isHeader) {
    row.fills = solid(C.surfaceRaised);
  } else {
    row.fills = solid(C.surfaceBase);
  }

  for (const cell of cells) {
    row.appendChild(
      createTableCell(cell.value, {
        isHeader,
        width: cell.width,
        severity: cell.severity,
        isTag: cell.isTag,
      })
    );
  }

  // bottom border
  return row;
}

function buildTablesSection(): FrameNode {
  const section = autoFrame("Tables", "VERTICAL", 32);
  section.appendChild(sectionHeader("Tables", "Data tables with severity indicators and pagination"));

  const table = figma.createComponent();
  table.name = "Table / default";
  table.layoutMode = "VERTICAL";
  table.primaryAxisSizingMode = "AUTO";
  table.counterAxisSizingMode = "AUTO";
  table.cornerRadius = RADIUS.lg;
  table.clipsContent = true;
  table.fills = solid(C.surfaceBase);
  setBorder(table, C.borderSubtle, 1, 0.5);

  const colWidths = [200, 180, 120, 120, 160];
  const headers = [
    { value: "Name", width: colWidths[0] },
    { value: "Description", width: colWidths[1] },
    { value: "Severity", width: colWidths[2] },
    { value: "Status", width: colWidths[3] },
    { value: "Last Updated", width: colWidths[4] },
  ];
  table.appendChild(createTableRow(headers, true));

  const rows = [
    [
      { value: "Firewall Rule #42", width: colWidths[0] },
      { value: "Inbound traffic block", width: colWidths[1] },
      { value: "Critical", width: colWidths[2], severity: C.sevCritical, isTag: true },
      { value: "Open", width: colWidths[3], severity: C.sevOk, isTag: true },
      { value: "2 hours ago", width: colWidths[4] },
    ],
    [
      { value: "Endpoint Agent", width: colWidths[0] },
      { value: "Agent health check", width: colWidths[1] },
      { value: "Medium", width: colWidths[2], severity: C.sevMedium, isTag: true },
      { value: "Pending", width: colWidths[3], severity: C.sevNeutral, isTag: true },
      { value: "5 hours ago", width: colWidths[4] },
    ],
    [
      { value: "SIEM Integration", width: colWidths[0] },
      { value: "Log ingestion pipeline", width: colWidths[1] },
      { value: "OK", width: colWidths[2], severity: C.sevOk, isTag: true },
      { value: "Resolved", width: colWidths[3], severity: C.sevInfo, isTag: true },
      { value: "1 day ago", width: colWidths[4] },
    ],
  ];

  rows.forEach((cells, i) => {
    const row = createTableRow(cells);
    if (i % 2 === 1) {
      row.fills = solid(C.surfaceRaised, 0.3);
    }
    // add border between rows
    const divider = figma.createFrame();
    divider.name = "Row Divider";
    divider.resize(colWidths.reduce((a, b) => a + b, 0), 1);
    divider.fills = solid(C.borderDefault, 0.2);
    divider.layoutAlign = "STRETCH";
    table.appendChild(divider);
    table.appendChild(row);
  });

  // Pagination footer
  const pagination = autoFrame("Pagination", "HORIZONTAL", 12);
  pagination.paddingTop = 12;
  pagination.paddingBottom = 12;
  pagination.paddingLeft = 16;
  pagination.paddingRight = 16;
  pagination.layoutAlign = "STRETCH";
  pagination.counterAxisAlignItems = "CENTER";
  pagination.fills = solid(C.surfaceRaised, 0.5);

  text(pagination, "Showing 1-3 of 128 results", { size: 12, color: C.textSecondary });
  const pgSpacer = figma.createFrame();
  pgSpacer.name = "Spacer";
  pgSpacer.layoutGrow = 1;
  pgSpacer.resize(10, 1);
  pgSpacer.fills = [];
  pagination.appendChild(pgSpacer);

  const pages = ["\u2190", "1", "2", "3", "...", "12", "\u2192"];
  pages.forEach((p, i) => {
    const pg = autoFrame(`page-${i}`, "HORIZONTAL", 0);
    pg.primaryAxisSizingMode = "FIXED";
    pg.counterAxisSizingMode = "FIXED";
    pg.resize(32, 28);
    pg.primaryAxisAlignItems = "CENTER";
    pg.counterAxisAlignItems = "CENTER";
    pg.cornerRadius = RADIUS.sm;

    if (p === "1") {
      pg.fills = solid(C.accentPrimary, 0.15);
      text(pg, p, { size: 12, weight: "Semi Bold", color: C.accentPrimary });
    } else {
      pg.fills = [];
      text(pg, p, { size: 12, color: C.textSecondary });
    }

    pagination.appendChild(pg);
  });

  table.appendChild(pagination);
  section.appendChild(table);

  return section;
}

// ── SIDE PANELS ─────────────────────────────────────────────

function buildSidePanelsSection(): FrameNode {
  const section = autoFrame("Side Panels", "VERTICAL", 32);
  section.appendChild(sectionHeader("Side Panels", "Slide-over detail panels with header, body, and footer"));

  const panel = figma.createComponent();
  panel.name = "SidePanel / default";
  panel.layoutMode = "VERTICAL";
  panel.primaryAxisSizingMode = "FIXED";
  panel.counterAxisSizingMode = "FIXED";
  panel.resize(420, 640);
  panel.fills = solid(C.surfaceOverlay);
  setBorder(panel, C.borderSubtle, 1, 0.6);
  panel.cornerRadius = RADIUS.xl;
  panel.clipsContent = true;

  panel.effects = [
    {
      type: "DROP_SHADOW",
      color: { r: 0, g: 0, b: 0, a: 0.5 },
      offset: { x: -8, y: 0 },
      radius: 32,
      spread: 0,
      visible: true,
      blendMode: "NORMAL",
    },
  ];

  // ── Header
  const header = autoFrame("Header", "HORIZONTAL", 12);
  header.layoutAlign = "STRETCH";
  header.paddingTop = 20;
  header.paddingBottom = 20;
  header.paddingLeft = 24;
  header.paddingRight = 24;
  header.counterAxisAlignItems = "CENTER";
  header.fills = solid(C.surfaceRaised, 0.6);

  const headerText = autoFrame("Header Text", "VERTICAL", 4);
  headerText.layoutGrow = 1;
  text(headerText, "Incident Details", { size: 18, weight: "Semi Bold", color: C.textPrimary });
  text(headerText, "INC-2024-0847", { size: 12, color: C.textSecondary });
  header.appendChild(headerText);

  // close button
  const closeBtn = autoFrame("Close", "HORIZONTAL", 0);
  closeBtn.primaryAxisSizingMode = "FIXED";
  closeBtn.counterAxisSizingMode = "FIXED";
  closeBtn.resize(32, 32);
  closeBtn.primaryAxisAlignItems = "CENTER";
  closeBtn.counterAxisAlignItems = "CENTER";
  closeBtn.cornerRadius = RADIUS.md;
  closeBtn.fills = solid(C.white, 0.06);
  text(closeBtn, "\u2715", { size: 16, color: C.textSecondary });
  header.appendChild(closeBtn);

  panel.appendChild(header);

  // divider
  const hDiv = figma.createFrame();
  hDiv.name = "Divider";
  hDiv.resize(420, 1);
  hDiv.fills = solid(C.borderDefault, 0.3);
  hDiv.layoutAlign = "STRETCH";
  panel.appendChild(hDiv);

  // ── Body
  const body = autoFrame("Body", "VERTICAL", 20);
  body.layoutAlign = "STRETCH";
  body.layoutGrow = 1;
  body.paddingTop = 24;
  body.paddingBottom = 24;
  body.paddingLeft = 24;
  body.paddingRight = 24;

  // meta row
  const metaGrid = autoFrame("Meta", "VERTICAL", 16);
  metaGrid.layoutAlign = "STRETCH";

  const metaItems = [
    { label: "Severity", value: "Critical" },
    { label: "Assignee", value: "Jane Cooper" },
    { label: "Source", value: "SIEM — Chronicle" },
    { label: "Created", value: "Mar 9, 2026 at 14:32 UTC" },
  ];

  for (const m of metaItems) {
    const metaRow = autoFrame("meta-row", "HORIZONTAL", 8);
    metaRow.layoutAlign = "STRETCH";
    metaRow.counterAxisAlignItems = "CENTER";

    const lbl = text(metaRow, m.label, { size: 13, weight: "Medium", color: C.textSecondary });
    lbl.resize(100, lbl.height);

    if (m.label === "Severity") {
      metaRow.appendChild(createTag(m.value, C.sevCritical, "filled", "sm"));
    } else {
      text(metaRow, m.value, { size: 13, color: C.textPrimary });
    }

    metaGrid.appendChild(metaRow);
  }

  body.appendChild(metaGrid);

  // description
  const descWrap = autoFrame("Description", "VERTICAL", 8);
  descWrap.layoutAlign = "STRETCH";
  text(descWrap, "Description", { size: 14, weight: "Semi Bold", color: C.textPrimary });
  text(descWrap, "Unauthorized access attempt detected on production endpoint. Multiple failed authentication attempts followed by a successful login from an unrecognized IP address.", {
    size: 14,
    color: C.textSecondary,
    width: 372,
  });
  body.appendChild(descWrap);

  panel.appendChild(body);

  // ── Footer
  const fDiv = figma.createFrame();
  fDiv.name = "Divider";
  fDiv.resize(420, 1);
  fDiv.fills = solid(C.borderDefault, 0.3);
  fDiv.layoutAlign = "STRETCH";
  panel.appendChild(fDiv);

  const footer = autoFrame("Footer", "HORIZONTAL", 12);
  footer.layoutAlign = "STRETCH";
  footer.paddingTop = 16;
  footer.paddingBottom = 16;
  footer.paddingLeft = 24;
  footer.paddingRight = 24;
  footer.counterAxisAlignItems = "CENTER";
  footer.primaryAxisAlignItems = "MAX";

  footer.appendChild(createButton("Cancel", "ghost", "md"));
  footer.appendChild(createButton("Resolve", "primary", "md"));
  panel.appendChild(footer);

  section.appendChild(panel);

  return section;
}

// ── MASTER RUNNER ───────────────────────────────────────────

async function main() {
  await loadFonts();

  // Create a dedicated page
  const page = figma.createPage();
  page.name = "Cyderes Design System — Starter Kit";
  figma.currentPage = page;

  // Master frame
  const root = autoFrame("Cyderes Design System", "VERTICAL", 80);
  root.paddingTop = 64;
  root.paddingBottom = 64;
  root.paddingLeft = 64;
  root.paddingRight = 64;
  root.fills = solid(C.surfaceSunken);
  root.cornerRadius = RADIUS.xxl;

  // Title block
  const titleBlock = autoFrame("Title", "VERTICAL", 8);
  text(titleBlock, "Cyderes Design System", { size: 40, weight: "Bold", color: C.textPrimary });
  const sub = autoFrame("Subtitle", "HORIZONTAL", 8);
  sub.counterAxisAlignItems = "CENTER";
  text(sub, "60% Darkstar Structure", { size: 16, weight: "Medium", color: C.textSecondary });
  text(sub, "\u00B7", { size: 16, color: C.borderDefault });
  text(sub, "40% Cyderes Accents", { size: 16, weight: "Medium", color: C.accentPrimary });
  titleBlock.appendChild(sub);
  root.appendChild(titleBlock);

  // Color palette swatch bar
  const swatchRow = autoFrame("Color Swatches", "HORIZONTAL", 12);
  const swatches: Array<{ name: string; color: RGB }> = [
    { name: "Primary",  color: C.accentPrimary },
    { name: "Warning",  color: C.accentWarning },
    { name: "Highlight", color: C.accentHighlight },
    { name: "Critical",  color: C.sevCritical },
    { name: "Info",      color: C.sevInfo },
    { name: "Purple",    color: C.sevPurple },
    { name: "Teal",      color: C.sevTeal },
    { name: "Surface",   color: C.surfaceRaised },
    { name: "Border",    color: C.borderDefault },
  ];
  for (const sw of swatches) {
    const swatchWrap = autoFrame(sw.name, "VERTICAL", 6);
    swatchWrap.counterAxisAlignItems = "CENTER";
    const circle = figma.createEllipse();
    circle.name = sw.name;
    circle.resize(40, 40);
    circle.fills = solid(sw.color);
    swatchWrap.appendChild(circle);
    text(swatchWrap, sw.name, { size: 10, weight: "Medium", color: C.textSecondary });
    swatchRow.appendChild(swatchWrap);
  }
  root.appendChild(swatchRow);

  // Build sections
  root.appendChild(buildButtonsSection());
  root.appendChild(buildTagsSection());
  root.appendChild(buildCardsSection());
  root.appendChild(buildInputsSection());
  root.appendChild(buildDropdownsSection());
  root.appendChild(buildTablesSection());
  root.appendChild(buildSidePanelsSection());

  // Position and zoom
  page.appendChild(root);
  figma.viewport.scrollAndZoomIntoView([root]);

  figma.notify("Cyderes Design System starter kit generated \u2714");
  figma.closePlugin();
}

main();
