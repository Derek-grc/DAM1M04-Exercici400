"use strict"

const midaCasella = 150
const numFiles = 3
const numColumnes = 3

const ESTAT_RESOLT = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0]
]

let tauler = []
let moviments = 0
let resolt = false

const refFitxes = {}

function init() {

  const root = document.documentElement
  root.style.setProperty("--mida", midaCasella + "px")
  root.style.setProperty("--files", numFiles)
  root.style.setProperty("--columnes", numColumnes)

  const refTauler = document.getElementById("tauler")

  for (let num = 1; num <= numFiles * numColumnes - 1; num++) {
    const fitxa = document.createElement("div")
    fitxa.classList.add("fitxa")
    fitxa.setAttribute("id", "fitxa" + num)

    const img = document.createElement("img")
    img.src = "peces/peca" + num + ".png"
    img.alt = "Peca " + num
    fitxa.appendChild(img)

    refTauler.appendChild(fitxa)
    refFitxes[num] = fitxa
  }

  for (let fila = 0; fila < numFiles; fila++) {
    for (let columna = 0; columna < numColumnes; columna++) {
      const casella = document.createElement("div")
      casella.classList.add("casella")
      casella.style.left = `${columna * midaCasella}px`
      casella.style.top = `${fila * midaCasella}px`
      casella.addEventListener("click", () => clicCasella(fila, columna))
      refTauler.appendChild(casella)
    }
  }

  const refReset = document.getElementById("btnReinici")
  refReset.addEventListener("click", reinicia)

  reinicia()
}

function trobaBuit() {
  for (let fila = 0; fila < numFiles; fila++) {
    for (let columna = 0; columna < numColumnes; columna++) {
      if (tauler[fila][columna] === 0) {
        return { fila, columna }
      }
    }
  }
}

function esAdjacent(fila, columna) {
  const buit = trobaBuit()
  const df = Math.abs(fila - buit.fila)
  const dc = Math.abs(columna - buit.columna)
  return df + dc === 1
}

function clicCasella(fila, columna) {
  if (resolt) return
  if (!esAdjacent(fila, columna)) return

  const buit = trobaBuit()
  const numPeca = tauler[fila][columna]

  tauler[buit.fila][buit.columna] = numPeca
  tauler[fila][columna] = 0

  moviments++
  actualitzaDOM()

  if (comprovaResolt()) {
    resolt = true
    document.getElementById("missatge").textContent =
      `Puzzle resolt en ${moviments} moviments!`
  }
}

function comprovaResolt() {
  for (let fila = 0; fila < numFiles; fila++) {
    for (let columna = 0; columna < numColumnes; columna++) {
      if (tauler[fila][columna] !== ESTAT_RESOLT[fila][columna]) {
        return false
      }
    }
  }
  return true
}

function actualitzaDOM() {
  for (let fila = 0; fila < numFiles; fila++) {
    for (let columna = 0; columna < numColumnes; columna++) {
      const num = tauler[fila][columna]
      if (num === 0) continue

      const x = columna * midaCasella
      const y = fila * midaCasella
      refFitxes[num].style.transform = `translate(${x}px, ${y}px)`
    }
  }

  document.getElementById("info").textContent = `Moviments: ${moviments}`
}

function barejaTauler() {
  tauler = ESTAT_RESOLT.map(fila => [...fila])

  let ultimDireccio = -1

  for (let i = 0; i < 200; i++) {
    const buit = trobaBuit()

    const direccions = [
      { df: -1, dc: 0, id: 0 },
      { df: 1, dc: 0, id: 1 },
      { df: 0, dc: -1, id: 2 },
      { df: 0, dc: 1, id: 3 }
    ]

    const oposades = [1, 0, 3, 2]

    const valides = direccions.filter(d => {
      const nf = buit.fila + d.df
      const nc = buit.columna + d.dc
      return nf >= 0 && nf < numFiles &&
             nc >= 0 && nc < numColumnes &&
             d.id !== oposades[ultimDireccio]
    })

    const d = valides[Math.floor(Math.random() * valides.length)]
    const nf = buit.fila + d.df
    const nc = buit.columna + d.dc

    tauler[buit.fila][buit.columna] = tauler[nf][nc]
    tauler[nf][nc] = 0
    ultimDireccio = d.id
  }
}

function reinicia() {
  barejaTauler()
  moviments = 0
  resolt = false
  document.getElementById("missatge").textContent = ""
  actualitzaDOM()
}