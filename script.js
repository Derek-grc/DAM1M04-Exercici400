"use strict"

const midaCasella = 150
const numFiles = 3
const numColumnes = 3

function init() {
  const root = document.documentElement
  root.style.setProperty("--mida", midaCasella + "px")
  root.style.setProperty("--files", numFiles)
  root.style.setProperty("--columnes", numColumnes)
}