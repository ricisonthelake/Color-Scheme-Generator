let seedColor = document.getElementById("seed-color")
const getColorSchemeBtn = document.getElementById("get-btn")
const paletteContainerEl = document.getElementById("palette-container")
const hexFooterEl = document.getElementById("hex-footer")
let schemeHTML = ""
// let schemeColorsArr = []

const defaultSeedColor = "#F55A5A"


seedColor = document.getElementById("seed-color")
seedColor.value = defaultSeedColor

seedColor.addEventListener("input", getSeedColor, false)


function getSeedColor(e) {
    seedColor = e.target.value
    return seedColor
}

getColorSchemeBtn.addEventListener("click", (e) => {

    seedColor = document.getElementById("seed-color")
    let schemeSeedColor = seedColor.value.slice(1)
    console.log("schemeSeedColor = " + schemeSeedColor)
    const selectedSchemeMode = document.getElementById("scheme-mode-selector").value
    console.log("selectedSchemeMode = " + selectedSchemeMode)
    getColorApiScheme(schemeSeedColor, selectedSchemeMode)

})

function getColorApiScheme(seed, mode) {
    let schemeColorsArr = []
    fetch(`https://www.thecolorapi.com/scheme?hex=${seed}&mode=${mode}`)
        .then(response => response.json())
        .then(data => {
            data.colors.map(hexValue => {
                schemeColorsArr.push(hexValue.hex.value)
            })
            console.log('schemeColorsArr = ' + schemeColorsArr)
            paletteContainerEl.innerHTML = ""
            hexFooterEl.innerHTML = ""
            renderColors(schemeColorsArr)
        })


}

function renderColors(schemeColorsArr) {
    console.log("in renderColors")
    console.log('in renderColors, schemeColorsArr = ' + schemeColorsArr)
    console.log('in renderColors, schemeColorsArr[0] = ' + schemeColorsArr[0])
    for (let i = 0; i < schemeColorsArr.length; i++) {
        paletteContainerEl.innerHTML += `
        <div class="palette-colors" id="palette-color-${[i]}" style="background-color:${schemeColorsArr[i]}" onclick="copyToClipboard('${schemeColorsArr[i]}')">
        </div>
        `
        hexFooterEl.innerHTML += `
        <div id="hex-color-${[i]}" class="hex-colors" onclick="copyToClipboard('${schemeColorsArr[i]}')">${schemeColorsArr[i]}</div>
        `
        console.log("paletteContainerEl.innerHTML = " + paletteContainerEl.innerHTML)
    }
    // schemeColorsArr = []

}

function copyToClipboard(text) {
    console.log("in copyToClipboard")
    navigator.clipboard.writeText("#" + text)
    alert("#" + text + " has been copied to the clipboard")
}