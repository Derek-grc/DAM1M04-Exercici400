"use strict"

const midaCasella = 150
const numFiles = 3
const numColumnes = 3

function init() {
  const root = document.documentElement
  root.style.setProperty("--mida", midaCasella + "px")
  root.style.setProperty("--files", numFiles)
  root.style.setProperty("--columnes", numColumnes)

    const refTauler = document.getElementById("tauler")

  for (let fila = 0; fila < numFiles; fila++) {
    for (let columna = 0; columna < numColumnes; columna++) {
      const casella = document.createElement("div")
      casella.classList.add("casella")
      casella.style.left = `${columna * midaCasella}px`
      casella.style.top = `${fila * midaCasella}px`
      refTauler.appendChild(casella)
    }
  }
}