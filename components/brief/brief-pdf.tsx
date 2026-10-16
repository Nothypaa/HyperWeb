import { Document, Image, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer"

import { ALL_QUESTIONS, BRIEF_SECTIONS } from "./questions"
import { briefDate, extractHexes, formatAnswer, pad, type Answers, type Picks } from "./format"

// Loaded on demand (dynamic import) when the client clicks "Télécharger en PDF",
// so @react-pdf/renderer never weighs on the page itself.

const INK = "#171717"
const MUTED = "#737373"
const FAINT = "#A3A3A3"
const RULE = "#E5E5E5"

const s = StyleSheet.create({
  page: { paddingTop: 48, paddingBottom: 64, paddingHorizontal: 52, fontFamily: "Helvetica", fontSize: 10.5, color: INK, lineHeight: 1.5 },
  brandRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  brand: { flexDirection: "row", alignItems: "center" },
  logo: { width: 21, height: 17, marginRight: 9 },
  brandName: { fontFamily: "Helvetica-Bold", fontSize: 12, letterSpacing: -0.2 },
  date: { fontSize: 8.5, color: FAINT },
  eyebrow: { marginTop: 56, fontFamily: "Helvetica-Bold", fontSize: 7.5, letterSpacing: 2, color: MUTED },
  title: { marginTop: 8, fontFamily: "Helvetica-Bold", fontSize: 34, letterSpacing: -1.2, lineHeight: 1.1 },
  progressRow: { marginTop: 18, flexDirection: "row", alignItems: "center" },
  progressTrack: { width: 110, height: 3, borderRadius: 2, backgroundColor: "#F0F0F0", marginRight: 10 },
  progressFill: { height: 3, borderRadius: 2, backgroundColor: INK },
  progressText: { fontSize: 8.5, color: MUTED },
  coverRule: { marginTop: 36, borderBottomWidth: 1, borderBottomColor: RULE },
  section: { paddingTop: 26, paddingBottom: 6 },
  sectionHead: { flexDirection: "row", alignItems: "baseline", marginBottom: 14 },
  sectionNum: { width: 28, fontFamily: "Helvetica-Bold", fontSize: 13, color: "#D4D4D4" },
  sectionTitle: { fontFamily: "Helvetica-Bold", fontSize: 16, letterSpacing: -0.5 },
  item: { marginLeft: 28, marginBottom: 14 },
  label: { fontFamily: "Helvetica-Bold", fontSize: 7, letterSpacing: 1.4, color: FAINT, marginBottom: 4 },
  empty: { fontFamily: "Helvetica-Oblique", fontSize: 10, color: FAINT },
  pills: { flexDirection: "row", flexWrap: "wrap", marginBottom: 2 },
  pill: { borderWidth: 0.8, borderColor: INK, borderRadius: 10, paddingTop: 4, paddingBottom: 3, paddingHorizontal: 9, marginRight: 5, marginBottom: 5 },
  pillText: { fontSize: 9, lineHeight: 1 },
  swatches: { flexDirection: "row", flexWrap: "wrap", marginBottom: 6 },
  swatchWrap: { marginRight: 10, marginBottom: 4 },
  swatch: { width: 44, height: 30, borderRadius: 6, borderWidth: 0.5, borderColor: "#00000020" },
  swatchHex: { marginTop: 3, fontSize: 7.5, color: MUTED },
  detail: { color: "#525252" },
  footerRule: { position: "absolute", bottom: 46, left: 52, right: 52, borderTopWidth: 0.5, borderTopColor: RULE },
  footerLeft: { position: "absolute", bottom: 26, left: 52, height: 10, fontSize: 7.5, lineHeight: 1, color: FAINT },
  // With a page-level lineHeight, react-pdf only draws render-prop text inside a box of fixed height
  footerRight: { position: "absolute", bottom: 26, left: 52, right: 52, height: 10 },
  footerRightText: { fontSize: 7.5, lineHeight: 1, color: FAINT, textAlign: "right" },
})

interface BriefPdfProps {
  answers: Answers
  picks: Picks
  title: string
  /** ISO date of the submission; defaults to today */
  date?: string
  logoSrc?: string
}

function BriefPdf({ answers, picks, title, date, logoSrc }: BriefPdfProps) {
  const answered = ALL_QUESTIONS.filter((q) => formatAnswer(q, answers, picks) !== "").length

  return (
    <Document title={`Cahier des charges — ${title}`} author="HyperWeb" creator="HyperWeb" language="fr">
      <Page size="A4" style={s.page}>
        <View style={s.footerRule} fixed />
        <Text style={s.footerLeft} fixed>
          HyperWeb · Cahier des charges — {title}
        </Text>
        <View
          style={s.footerRight}
          fixed
          render={(props) => {
            // totalPages is passed at runtime but missing from View's render typings
            const { pageNumber, totalPages } = props as typeof props & { totalPages: number }
            return (
              <Text style={s.footerRightText}>
                {pageNumber} / {totalPages}
              </Text>
            )
          }}
        />

        <View style={s.brandRow}>
          <View style={s.brand}>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image has no alt */}
            {logoSrc && <Image src={logoSrc} style={s.logo} />}
            <Text style={s.brandName}>HyperWeb</Text>
          </View>
          <Text style={s.date}>{briefDate(date)}</Text>
        </View>

        <Text style={s.eyebrow}>CAHIER DES CHARGES DU SITE WEB</Text>
        <Text style={s.title}>{title}</Text>
        <View style={s.progressRow}>
          <View style={s.progressTrack}>
            <View style={[s.progressFill, { width: `${(answered / ALL_QUESTIONS.length) * 100}%` }]} />
          </View>
          <Text style={s.progressText}>
            {answered} {answered > 1 ? "réponses" : "réponse"} sur {ALL_QUESTIONS.length}
          </Text>
        </View>
        <View style={s.coverRule} />

        {BRIEF_SECTIONS.map((section, i) => (
          <View key={section.id} style={s.section}>
            {/* Keep each chapter title with its first answer */}
            <View style={s.sectionHead} minPresenceAhead={60}>
              <Text style={s.sectionNum}>{pad(i + 1)}</Text>
              <Text style={s.sectionTitle}>{section.title}</Text>
            </View>

            {section.questions.map((q) => {
              const selected = picks[q.id] || []
              const text = (answers[q.id] || "").trim()
              const empty = formatAnswer(q, answers, picks) === ""
              const hexes = q.kind === "colors" ? extractHexes(text) : []
              return (
                <View key={q.id} style={s.item} wrap={false}>
                  <Text style={s.label}>{q.short.toUpperCase()}</Text>
                  {empty ? (
                    <Text style={s.empty}>Non renseigné</Text>
                  ) : (
                    <>
                      {selected.length > 0 && (
                        <View style={s.pills}>
                          {selected.map((p) => (
                            <View key={p} style={s.pill}>
                              <Text style={s.pillText}>{p}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                      {hexes.length > 0 && (
                        <View style={s.swatches}>
                          {hexes.map((hex) => (
                            <View key={hex} style={s.swatchWrap}>
                              <View style={[s.swatch, { backgroundColor: hex }]} />
                              <Text style={s.swatchHex}>{hex}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                      {text && <Text style={selected.length > 0 ? s.detail : undefined}>{text}</Text>}
                    </>
                  )}
                </View>
              )
            })}
          </View>
        ))}
      </Page>
    </Document>
  )
}

// The site logo SVG wraps a PNG; react-pdf can't draw SVG <image>, so pull the PNG out
async function loadLogo() {
  try {
    const svg = await (await fetch("/HyperWeb-logo/hyperweb-logo.svg")).text()
    return svg.match(/href="(data:image\/png;base64,[^"]+)"/)?.[1]
  } catch {
    return undefined
  }
}

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "projet"

export async function downloadBriefPdf({ answers, picks, title, date }: Omit<BriefPdfProps, "logoSrc">) {
  const logoSrc = await loadLogo()
  const blob = await pdf(<BriefPdf answers={answers} picks={picks} title={title} date={date} logoSrc={logoSrc} />).toBlob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `cahier-des-charges-${slugify(title)}.pdf`
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 10_000)
}
