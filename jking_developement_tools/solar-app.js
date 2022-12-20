const addInputBtn = document.querySelector("#add-input")

const allAppInput = document.querySelector("#app-input")

const submitBtn = document.querySelector("#submit-btn")

const myQuote = document.querySelector("#my-quote")

const loadName = document.querySelector("#load-name")

const loadRating = document.querySelector("#load-rating")

const loadMultiple = document.querySelector("#load-multiple")

const actualLoad = document.querySelector("#actual-load")

const ulEl = document.querySelector("#ul-el")

const actualLoadValue = document.querySelector("#actual-load-value")

const actualLoadKva = document.querySelector("#actual-load-kva")

const hrs = document.querySelector("#hr")

const days = document.querySelector("#day")

//result screen elements
const invTer = document.querySelector("#invtr")
const btry = document.querySelector("#btry")
const btryVolt = document.querySelector("#btry-volt")
const nBtry = document.querySelector("#nbtry")
const chrgLabel = document.querySelector("#chrg-label")
const chrg = document.querySelector("#chrg")
const solr = document.querySelector("#solr")
const nSolr = document.querySelector("#nsolr")
const calcBtn = document.querySelector("#calc-btn")
const desClaimer = document.querySelector("#desclaimer")


const loadErrorTop = document.querySelector(".load-error-top")

const loadErrorMid = document.querySelector(".load-error-mid")

const loadErrorBase = document.querySelector(".load-error-base")

const alvUnit = document.querySelector("#alv-unit")

const alkUnit = document.querySelector("#alk-unit")

const saveLoadBtn = document.querySelector("#save-load-btn")

const myLoads = []
const loadSum = []
let loadRecord = ""

let val1 = ""
let val2 = ""
let val3 = val1 * val2
let hrVal = ""
let dayVal = ""
let sum = 0
let newSum = 0
let sumInvTr
let sumInKva
let inputLoad = ""
let xChrg = ""
let newQuote
const batAmpEach = 200
//let batSize = (inputLoad * bckP) / batVoltEach
//let batSplit = batSize/batAmpEach



function loadCalc() {
    val1 = parseInt(loadMultiple.value)
    val2 = (parseFloat(loadRating.value)).toFixed(1)
    if (loadName.value == "") {
        loadName.classList.add("error-line")
        loadErrorTop.textContent = "Please first specify the type of load"
    } else if (!loadName.value.match(/^([A-Za-z.-])*$/)) {
        loadName.classList.add("error-line")
        loadErrorTop.textContent = "Name of your load can't be alpha-numeric, numeric or symbols"
    } else if (val1 < 1) {
        loadMultiple.classList.add("error-line")
        loadErrorTop.textContent = "Your multiplier must be a positive whole number and minimu of 1"
    } else if (val2 < 1) {
        loadRating.classList.add("error-line")
        loadErrorTop.textContent = "Your load rating should not be less than 1W"
    } else {
        loadErrorTop.textContent = ""
        loadName.classList.remove("error-line")
        loadMultiple.classList.remove("error-line")
        loadRating.classList.remove("error-line")
        actualLoad.classList.remove("error-line")
        val3 = val1 * val2
        actualLoad.value = val3
    }
    
}

saveLoadBtn.addEventListener("click", (appInput) => {
    if (loadName.value == "") {
        loadName.classList.add("error-line")
        loadErrorTop.textContent = "Please first specify the type of load"
    } else if (loadMultiple.value == "") {
        loadMultiple.classList.add("error-line")
        loadErrorTop.textContent = "Specify how many of such load you are powering"
    } else if (loadRating.value == "") {
        loadRating.classList.add("error-line")
        loadErrorTop.textContent = "Provide your load rating - Check your load label"
    } else {
        loadName.classList.remove("error-line")
        loadMultiple.classList.remove("error-line")
        loadRating.classList.remove("error-line")
        sum += parseInt(actualLoad.value)
        actualLoadValue.value = sum
        loadSum.push(sum)

        //this portion shows the load records
        loadRecord = `${loadMultiple.value} ${loadName.value}(s) of ${loadRating.value}W each = ${actualLoad.value}W`
        myLoads.push(loadRecord)
        pinDownLoads()
        //--------------

        sumInKva = sum / (0.8)
        console.log(sumInKva)
        actualLoadKva.value = sumInKva
        sumInvTr = (sum / (0.8)) + ((sum / (0.8))*0.25)
        if (sum >= 1000) {
            let roundSum = sum / 1000
            actualLoadValue.value = roundSum.toFixed(1)
            alvUnit.textContent = "KW"
        }

        if (parseInt(actualLoadKva.value) >= 1000) {
            sumInKva = sum / (1000*0.8)
            actualLoadKva.value = sumInKva.toFixed(1)
            alkUnit.textContent = "KVA"
            
        }

        if (sumInvTr <= 1000) {
            invTer.value = 1
        } else if (sumInvTr <= 1500) {
            invTer.value = 1.5
        } else if (sumInvTr <= 2000) {
            invTer.value = 2
        } else if (sumInvTr <= 2500) {
            invTer.value = 2.5
        } else if (sumInvTr <= 3500) {
            invTer.value = 3.5
        } else if(sumInvTr <= 5000){
            invTer.value = 5
        } else if (sumInvTr <= 7500) {
            invTer.value = 7.5
        } else if (sumInvTr <= 10000) {
            invTer.value = 10
        } else if(sumInvTr <= 15000) {
            invTer.value = 15
        } else if (sumInvTr <= 20000) {
            invTer.value = 20
            console.log(sumInvTr)
        } else if (sumInvTr <= 30000) {
            invTer.value = 30
        } else if (sumInvTr <= 40000) {
            invTer.value = 40
        } else if (sumInvTr <= 50000) {
            invTer.value = 50
        } else if(sumInvTr > 50000){
            invTer.value = "N/A"
            desClaimer.innerHTML = "We will have to be on site for Solar/Inverter installation larger than 50KVA for a more precise specification.<br>Please click on 'Submit Specification' to get a callback. Thanks"
        }
        loadErrorTop.textContent = ""
        loadName.value = ""
        loadMultiple.value = ""
        loadRating.value = ""
        actualLoad.value = ""
        console.log(sumInvTr)
    }

})


function backUp() {
    sum += parseInt(actualLoad.value)
    
    if (parseInt(hrs.value) < 1 || parseInt(hrs.value) > 24) {
        hrs.value = 1
        hrs.classList.add("error-line")
        loadErrorMid.textContent = "Minimum of 1 hour, maximum of 24 hours per day"
    } else if (parseInt(days.value) < 1 || parseInt(days.value) > 5) {
        days.value = 1
        days.classList.add("error-line")
        loadErrorMid.textContent = "Minimum of 1 day, maximum of 5 days without charging"
    } else {
        hrs.classList.remove("error-line")
        days.classList.remove("error-line")
        loadErrorMid.textContent = ""
    }
}



calcBtn.addEventListener("click", (specGenerator) => {
    for (let i = 0; i < loadSum.length; i++){
        sum = loadSum[i]
    }
    
    console.log(sum)

    sumInvTr = (sum / (0.8)) + ((sum / (0.8)) * 0.25)
    console.log(sumInvTr)
    hrVal = parseInt(hrs.value)
    dayVal = parseInt(days.value)
    const bckP = hrVal * dayVal
    console.log(bckP)

    let batVoltEach = ""
    let solrVolt = ""
    let solrSplit = ""
    let chrgController = ""
    let solarPowerEach = ""
    let actualBatrySplit = ""
    
    if (hrs.value == "") {
        loadErrorMid.textContent = "Backup strength must be specified"
        hrs.classList.add("error-line")
    } else if (days.value == "") {
        loadErrorMid.textContent = "Backup strength must be specified"
        days.classList.add("error-line")
    } else if (sumInvTr <= 2500) {
        batVoltEach = 12
        btryVolt.value = 12
    } else if (sumInvTr <= 5000) {
        batVoltEach = 24
        btryVolt.value = 24
    } else if (sumInvTr <= 14000) {
        batVoltEach = 48
        btryVolt.value = 48
    } else if (sumInvTr <= 19000) {
        batVoltEach = 96
        btryVolt.value = 96
    } else if (sumInvTr <= 25000) {
        batVoltEach = 120
        btryVolt.value = 120
    } else if (sumInvTr <= 30000) {
        batVoltEach = 192
        btryVolt.value = 192
    } else if (sumInvTr <= 50000) {
        batVoltEach = 360
        btryVolt.value = 360
    } else {
        batVoltEach = "N/A"
        btryVolt.value = "N/A"
        desClaimer.innerHTML = "We will have to be on site for Solar/Inverter installation larger than 50KVA for a more precise specification.<br>Please click on 'Submit Specification' to get a callback. Thanks"
    }
    console.log(batVoltEach)

    solrVolt = batVoltEach

    console.log(solrVolt)
    console.log(sum)
    dcCurrent = sum / batVoltEach
    console.log(dcCurrent)

    const btryBank = Math.ceil((sum * bckP) / batVoltEach)
    console.log(btryBank)
    const chrgCurrent = btryBank * 0.1
    console.log(chrgCurrent)
    const solrCurrent = dcCurrent + chrgCurrent
    console.log(solrCurrent)
    if ((chrgCurrent <= 30 && batVoltEach == 12) || (chrgCurrent <= 30 && batVoltEach == 24) || (chrgCurrent <= 30 && batVoltEach == 48)) {
        chrgController = 30
        xChrg = 1
    } else if ((chrgCurrent <= 40 && batVoltEach == 12) || (chrgCurrent <= 40 && batVoltEach == 24) || (chrgCurrent <= 40 && batVoltEach == 48)) {
        chrgController = 40
        xChrg = 1
    } else if ((chrgCurrent <= 60 && batVoltEach == 12) || (chrgCurrent <= 60 && batVoltEach == 24) || (chrgCurrent <= 60 && batVoltEach == 48) || (chrgCurrent <= 60 && batVoltEach == 96)) {
        chrgController = 60
        xChrg = 1
    } else if ((chrgCurrent <= 80 && batVoltEach == 12) || (chrgCurrent <= 80 && batVoltEach == 24) || (chrgCurrent <= 80 && batVoltEach == 48) || (chrgCurrent <= 80 && batVoltEach == 96) || (chrgCurrent <= 80 && batVoltEach == 120)) {
        chrgController = 80
        xChrg = 1
    } else if ((chrgCurrent <= 100 && batVoltEach == 12) || (chrgCurrent <= 100 && batVoltEach == 24) || (chrgCurrent <= 100 && batVoltEach == 48) || (chrgCurrent <= 100 && batVoltEach == 96) || (chrgCurrent <= 100 && batVoltEach == 120) || (chrgCurrent <= 100 && batVoltEach == 192) || (chrgCurrent <= 100 && batVoltEach == 360)) {
        chrgController = 100
        xChrg = 1
    } else {
        
        if ((chrgCurrent <= 200 && batVoltEach == 12) || (chrgCurrent <= 200 && batVoltEach == 24) || (chrgCurrent <= 200 && batVoltEach == 48) || (chrgCurrent <= 200 && batVoltEach == 96) || (chrgCurrent <= 200 && batVoltEach == 120) || (chrgCurrent <= 200 && batVoltEach == 192) || (chrgCurrent <= 200 && batVoltEach == 360)) {
            chrgController = 100
            chrgLabel.textContent += "(2)"
            xChrg = 2
        } else if ((chrgCurrent <= 300 && batVoltEach == 12) || (chrgCurrent <= 300 && batVoltEach == 24) || (chrgCurrent <= 300 && batVoltEach == 48) || (chrgCurrent <= 300 && batVoltEach == 96) || (chrgCurrent <= 300 && batVoltEach == 120) || (chrgCurrent <= 300 && batVoltEach == 192) || (chrgCurrent <= 300 && batVoltEach == 360)) {
            chrgController = 100
            chrgLabel.textContent += "(3)"
            xChrg = 3
        } else if ((chrgCurrent <= 400 && batVoltEach == 12) || (chrgCurrent <= 400 && batVoltEach == 24) || (chrgCurrent <= 400 && batVoltEach == 48) || (chrgCurrent <= 400 && batVoltEach == 96) || (chrgCurrent <= 400 && batVoltEach == 120) || (chrgCurrent <= 400 && batVoltEach == 192) || (chrgCurrent <= 400 && batVoltEach == 360)) {
            chrgController = 100
            chrgLabel.textContent += "(4)"
            xChrg = 4
        } else if ((chrgCurrent <= 500 && batVoltEach == 12) || (chrgCurrent <= 500 && batVoltEach == 24) || (chrgCurrent <= 500 && batVoltEach == 48) || (chrgCurrent <= 500 && batVoltEach == 96) || (chrgCurrent <= 500 && batVoltEach == 120) || (chrgCurrent <= 500 && batVoltEach == 192) || (chrgCurrent <= 500 && batVoltEach == 360)) {
            chrgController = 100
            chrgLabel.textContent += "(5)"
            xChrg = 5
        } else if ((chrgCurrent <= 600 && batVoltEach == 12) || (chrgCurrent <= 600 && batVoltEach == 24) || (chrgCurrent <= 600 && batVoltEach == 48) || (chrgCurrent <= 600 && batVoltEach == 96) || (chrgCurrent <= 600 && batVoltEach == 120) || (chrgCurrent <= 600 && batVoltEach == 192) || (chrgCurrent <= 600 && batVoltEach == 360)) {
            chrgController = 100
            chrgLabel.textContent += "(6)"
            xChrg = 6
        } else if ((chrgCurrent <= 700 && batVoltEach == 12) || (chrgCurrent <= 700 && batVoltEach == 24) || (chrgCurrent <= 700 && batVoltEach == 48) || (chrgCurrent <= 700 && batVoltEach == 96) || (chrgCurrent <= 700 && batVoltEach == 120) || (chrgCurrent <= 700 && batVoltEach == 192) || (chrgCurrent <= 700 && batVoltEach == 360)) {
            chrgController = 100
            chrgLabel.textContent += "(7)"
            xChrg = 7
        } else if ((chrgCurrent <= 800 && batVoltEach == 12) || (chrgCurrent <= 800 && batVoltEach == 24) || (chrgCurrent <= 800 && batVoltEach == 48) || (chrgCurrent <= 800 && batVoltEach == 96) || (chrgCurrent <= 800 && batVoltEach == 120) || (chrgCurrent <= 800 && batVoltEach == 192) || (chrgCurrent <= 800 && batVoltEach == 360)) {
            chrgController = 100
            chrgLabel.textContent += "(8)"
            xChrg = 8
        } else {
            chrgController = "N/A"
            chrgLabel.textContent = chrgLabel.textContent
        }
    }
    chrg.value = chrgController

    let batrySplit = Math.ceil(btryBank / batAmpEach)
    

    if (batrySplit % 2 == 0 || batrySplit === 1 ) {
        batrySplit = batrySplit
    } else {
        batrySplit += 1
        console.log("result is odd")
    }

    console.log(batrySplit)

    if (batVoltEach == 12) {
        actualBatrySplit = batrySplit
    } else if(batVoltEach == 24) {
        actualBatrySplit = batrySplit * 2
    } else if (batVoltEach == 48) {
        actualBatrySplit = batrySplit * 4
    } else if (batVoltEach == 96) {
        actualBatrySplit = batrySplit * 8
    } else if (batVoltEach == 120) {
        actualBatrySplit = batrySplit * 10
    } else if (batVoltEach == 240) {
        actualBatrySplit = batrySplit * 20
    } else if (batVoltEach == 360) {
        actualBatrySplit = batrySplit * 30
    } else {
        actualBatrySplit = "N/A"
        desClaimer.innerHTML = "We will have to be on site for Solar/Inverter installation larger than 50KVA for a more precise specification.<br>Please click on 'Submit Specification' to get a callback. Thanks"
    }

    nBtry.value = actualBatrySplit
    console.log(actualBatrySplit)

    solrPower = solrVolt * solrCurrent
    console.log(solrPower)

    if (solrVolt == 12 && batrySplit <= 2) {
        solarPowerEach = 150
    } else if (solrVolt == 12 && batrySplit > 2) {
        solarPowerEach = 350
    } else if (solrVolt == 12 && batrySplit >= 12) {
        solarPowerEach = 450
    } else if (solrVolt == 24 && batrySplit >= 1) {
        solarPowerEach = 350
    } else if (solrVolt == 24 && batrySplit >= 16) {
        solarPowerEach = 450
    } else if (solrVolt == 24 && batrySplit >= 30) {
        solarPowerEach = 550
    } else if (solrVolt == 48 && batrySplit >= 1) {
        solarPowerEach = 350
    } else if (solrVolt == 48 && batrySplit >= 20) {
        solarPowerEach = 450
    } else if (solrVolt == 48 && batrySplit >= 40) {
        solarPowerEach = 550
    } else if (solrVolt == 96 && batrySplit >= 1) {
        solarPowerEach = 450
    } else if (solrVolt == 96 && batrySplit >= 30) {
        solarPowerEach = 550
    } else if (solrVolt >= 120 && solrVolt <= 360) {
        solarPowerEach = 550
    } else {
        solarPowerEach  = "N/A"
        nSolr.value = "N/A"
    }

    solr.value = solarPowerEach
    console.log(solarPowerEach)
    solrSplit = Math.ceil(solrPower / solarPowerEach)

    if (solrSplit % 2 == 0) {
        solrSplit = solrSplit
    } else {
        solrSplit += 1
    }

    nSolr.value = solrSplit
    console.log(solrSplit)

    
})


function pinDownLoads() {
    loadList = ""
    for (let i = 0; i < myLoads.length; i++){
        loadList += "<li>" + myLoads[i] + "</li>"  
    }

    ulEl.innerHTML = loadList
}

submitBtn.addEventListener("click", (submitToQuote) => {
    newQuote = `I need a quote for the installation of this spec of Solar/Inverter
    1 unit of ${invTer.value}KVA inverter
    ${nBtry.value} units of 200AH/12V deep cycle cell battery
    ${xChrg} unit of ${chrg.value}Amps charge controller
    ${nSolr.value} units of ${solr.value}W solar panels
    Please get back to me as soon as possible.
    Thank you.`

    myQuote.textContent = newQuote
})


/*
function addInput(b) {
    sum += parseInt(actualLoad.value)
    sumInKva = sum/(1000*0.8)
    actualLoadKva.value = sumInKva.toFixed(1)
}*/

//alvUnit.textContent = "KW"
//alkUnit.textContent = "KVA"







/*
let inputLoad = 3000
let batVoltEach = ""
const batAmpEach = 200
let hrs = 6
let days = 1
const bkT = hrs * days
let batSize = (inputLoad * bkT) / batVoltEach
let batSplit = batSize/batAmpEach
let a = Math.floor((inputLoad * 1000) / 600)
let b = Math.floor((inputLoad*bkT)/24)
let test = Math.floor(a + (a * (50 / 100)))

console.log(batSize)
console.log(batSplit)
console.log(a)
console.log(b)
console.log(test)

if (a > 1000) {
    a = a / 1000
    console.log(a)
}

if (test < 1000) {
    console.log(`${test} VA`)
} else if (test > 1000 && test <= 1500) {

    test = 1.5
    console.log(`${test} KVA`)
} else if (test > 1500 && test <= 2000) {
    test = 2
    console.log(`${test} KVA`)
}*/




