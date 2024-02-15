const button = document.querySelector(".mainButton")
const chart = document.querySelector(".chart")
let startPage = 0 // 0 - start | 1 - stop | 2 - download/back
const rootEl = document.querySelector(':root')
const downloadButton = document.querySelector(".downloadButton")
// const inputBoxes = document.querySelector(".inputBoxes")
let gestureArray = []
let indexOfGestureArray = 0
const n = 150
let gestureName = document.getElementById("usernameField").getAttribute("data-username")
let userName = ''

let backButton = document.createElement("button");

function detectMob() {
    const toMatch = [
        /Android/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

let x_acc = new Array(n).fill(0)
let y_acc = new Array(n).fill(0)
let z_acc = new Array(n).fill(0)
let a_rot = new Array(n).fill(0)
let b_rot = new Array(n).fill(0)
let g_rot = new Array(n).fill(0)

rootEl.style.setProperty('--chartWidth', Math.floor(document.documentElement.scrollWidth * 0.9) + 'px')

button.addEventListener("click", e => {
    e.preventDefault()
    button.classList.add("animate")
    setTimeout(() => {
        button.classList.remove("animate")
    }, 600)
    startPage += 1
    if (startPage % 3 === 0) {                                                      // START PAGE

        gestureArray = []
        indexOfGestureArray = 0
        x_acc.fill(0)
        y_acc.fill(0)
        z_acc.fill(0)
        a_rot.fill(0)
        b_rot.fill(0)
        g_rot.fill(0)

        rootEl.style.setProperty('--clr', '#c8ff00')
        button.innerText = 'start'
        chart.style.display = 'none'
        // inputBoxes.style.display = 'block'
        downloadButton.style.display = 'none'
        rootEl.style.setProperty('--mrd', '10px')
        rootEl.style.setProperty('--mld', '0px')
        downloadButton.innerHTML = '<i class="fa-solid fa-download"></i>Upload'
    } else if (startPage % 3 === 1) {                                               // CHARTS PAGE
        rootEl.style.setProperty('--clr', '#ff073a')
        button.innerText = 'stop'
        chart.style.display = 'block'
        // inputBoxes.style.display = 'none'
        permission()
    } else {                                                                        // DOWNLOAD PAGE
        window.removeEventListener("devicemotion", myListener)
        rootEl.style.setProperty('--clr', '#04d9ff')
        button.innerText = 'back'
        downloadButton.style.display = 'block'
    }
})

function myListener(e) {
    const curObj = {
        'index': indexOfGestureArray++,
        'x_acc': e.acceleration.x,
        'y_acc': e.acceleration.y,
        'z_acc': e.acceleration.z,
        'x_rot': e.rotationRate.alpha,
        'y_rot': e.rotationRate.beta,
        'z_rot': e.rotationRate.gamma
    }
    gestureArray.push(curObj)

    x_acc.shift()
    x_acc.push(curObj.x_acc)
    y_acc.shift()
    y_acc.push(curObj.y_acc)
    z_acc.shift()
    z_acc.push(curObj.z_acc)
    a_rot.shift()
    a_rot.push(curObj.x_rot)
    b_rot.shift()
    b_rot.push(curObj.y_rot)
    g_rot.shift()
    g_rot.push(curObj.z_rot)

    accChart.update('none')
    gyroChart.update('none')
}

function permission() {
    if (typeof (DeviceMotionEvent) !== "undefined" && typeof (DeviceMotionEvent.requestPermission) === "function") {
        // (optional) Do something before API request prompt.
        DeviceMotionEvent.requestPermission()
            .then(response => {
                // (optional) Do something after API prompt dismissed.
                if (response === "granted") {
                    window.addEventListener("devicemotion", myListener)
                }
            })
            .catch(console.error)
    } else if (detectMob()) {
        window.addEventListener("devicemotion", myListener)
    }
    else {
        alert("DeviceMotionEvent is not defined")
    }
}

//======================================================================================================================

downloadButton.addEventListener('click', e => {
    e.preventDefault()
    downloadButton.classList.add("animate")
    setTimeout(() => {
        downloadButton.classList.remove("animate")
    }, 600)


    const gesture = JSON.stringify(gestureArray, null, 2)
    const blob = new Blob([gesture], { type: 'application/json' })

    const href = URL.createObjectURL(blob)
    const currentDate = new Date();
    const dateTime = '' + currentDate.getFullYear() + "_"
        + (currentDate.getMonth() + 1) + "_"
        + currentDate.getDate() + "@"
        + currentDate.getHours() + "_"
        + currentDate.getMinutes() + "_"
        + currentDate.getSeconds()
    // const a = Object.assign(document.createElement('a'),
    //     {href, style: 'display:none', download: gestureName + '_' + userName + '_' + dateTime + '.json'})

    let gesturesJson = [
        {
            "index": 0,
            "x_acc": 0.3144783296093345,
            "y_acc": 0.10923603526651858,
            "z_acc": -0.45559389647841453,
            "x_rot": -8.974877107133217,
            "y_rot": -3.263976436176432,
            "z_rot": 6.352279126239666
        },
        {
            "index": 1,
            "x_acc": 0.4887257662296295,
            "y_acc": 0.1175268937498331,
            "z_acc": -0.7081868478000164,
            "x_rot": 3.9676581695208766,
            "y_rot": -5.256429915424481,
            "z_rot": 6.937397953659387
        },
        {
            "index": 2,
            "x_acc": 0.42246494933664797,
            "y_acc": 0.13530629606842995,
            "z_acc": -0.8044634482502937,
            "x_rot": 13.938906624189451,
            "y_rot": -10.123434887773392,
            "z_rot": 5.591444717798082
        },
        {
            "index": 3,
            "x_acc": 0.18412823117617516,
            "y_acc": 0.10355565154254436,
            "z_acc": -0.8513526251971721,
            "x_rot": 24.325776785608358,
            "y_rot": -12.104687497112854,
            "z_rot": 5.56453078426047
        },
        {
            "index": 4,
            "x_acc": 0.20941081219911575,
            "y_acc": 0.16435820302963255,
            "z_acc": -0.6088999596178531,
            "x_rot": 28.3726672839355,
            "y_rot": -13.531262151502874,
            "z_rot": 5.821976835777529
        },
        {
            "index": 5,
            "x_acc": 0.4304095516655594,
            "y_acc": 0.16222469813227652,
            "z_acc": -0.38259704932868477,
            "x_rot": 30.067158669840207,
            "y_rot": -14.195206057699595,
            "z_rot": 7.076748326879633
        },
        {
            "index": 6,
            "x_acc": 0.608269845020771,
            "y_acc": 0.21188100170493124,
            "z_acc": -0.14602525848150252,
            "x_rot": 28.225579160159274,
            "y_rot": -15.093949669446554,
            "z_rot": 9.094342238358617
        },
        {
            "index": 7,
            "x_acc": 0.44931846947073933,
            "y_acc": 0.10611235028803348,
            "z_acc": -0.03821779471337795,
            "x_rot": 21.947870331730513,
            "y_rot": -16.068373484744544,
            "z_rot": 9.339440161629941
        },
        {
            "index": 8,
            "x_acc": 0.36638745361007746,
            "y_acc": 0.030314474242925642,
            "z_acc": 0.07773147445619105,
            "x_rot": 7.369708373872997,
            "y_rot": -18.41809516301233,
            "z_rot": 10.565939792210068
        },
        {
            "index": 9,
            "x_acc": -0.0759819273751229,
            "y_acc": -0.12755436676740645,
            "z_acc": 0.914964388886094,
            "x_rot": -2.754986683802262,
            "y_rot": -23.215336583178733,
            "z_rot": 11.105978944220881
        },
        {
            "index": 10,
            "x_acc": -0.25468363999053834,
            "y_acc": -0.11314239505529403,
            "z_acc": 0.6694821463525295,
            "x_rot": -6.165219027893235,
            "y_rot": -12.592084673643086,
            "z_rot": 8.497976223810001
        },
        {
            "index": 11,
            "x_acc": -0.2555973938345909,
            "y_acc": -0.033415362867712975,
            "z_acc": 0.14910510431826113,
            "x_rot": -1.982092295720551,
            "y_rot": 17.075269726904068,
            "z_rot": -6.15011790652516
        },
        {
            "index": 12,
            "x_acc": 0.14951631546765565,
            "y_acc": -0.1318704764008522,
            "z_acc": 0.16501520563364028,
            "x_rot": -2.1121429394990017,
            "y_rot": 15.684568079808603,
            "z_rot": -4.851091485356427
        },
        {
            "index": 13,
            "x_acc": 0.48416912583857774,
            "y_acc": -0.09896773923039436,
            "z_acc": 0.06463467699587344,
            "x_rot": -3.1021737370504727,
            "y_rot": 6.663713554277445,
            "z_rot": -2.0146831836755013
        },
        {
            "index": 14,
            "x_acc": 0.31131489714235067,
            "y_acc": -0.008463876962661742,
            "z_acc": 0.14374270050227642,
            "x_rot": -4.464737992973248,
            "y_rot": 2.696739470890628,
            "z_rot": -0.8756783297240892
        },
        {
            "index": 15,
            "x_acc": 0.06956577672250569,
            "y_acc": 0.14445873981714247,
            "z_acc": 0.45784489027559755,
            "x_rot": -6.834374795313499,
            "y_rot": 0.8223333250066731,
            "z_rot": -0.9689972300024164
        },
        {
            "index": 16,
            "x_acc": 0.07035108188129961,
            "y_acc": 0.003022562691569328,
            "z_acc": 0.4776140051066875,
            "x_rot": -7.863492631050837,
            "y_rot": 0.05075678990880436,
            "z_rot": -1.297051642724952
        },
        {
            "index": 17,
            "x_acc": 0.02696319105364382,
            "y_acc": -0.07551146031916141,
            "z_acc": 0.36467794627845285,
            "x_rot": -5.670399997056137,
            "y_rot": 3.21574548223921,
            "z_rot": -3.030268280232929
        },
        {
            "index": 18,
            "x_acc": -0.14014964444637298,
            "y_acc": -0.16941782450675963,
            "z_acc": 0.0740875649958849,
            "x_rot": -3.6450858373809223,
            "y_rot": 7.781266544953993,
            "z_rot": -5.798319194926721
        },
        {
            "index": 19,
            "x_acc": -0.15948942794948814,
            "y_acc": -0.2920662990540266,
            "z_acc": 0.1351204181075096,
            "x_rot": -3.694527442348529,
            "y_rot": 18.118381339590293,
            "z_rot": -9.000252113673461
        },
        {
            "index": 20,
            "x_acc": -0.21135171713382003,
            "y_acc": -0.3556576044768095,
            "z_acc": 0.08490472708642482,
            "x_rot": -6.47175834473023,
            "y_rot": 22.550339120302535,
            "z_rot": -12.510524530990319
        },
        {
            "index": 21,
            "x_acc": -0.39289859004728495,
            "y_acc": -0.5242278722435235,
            "z_acc": -0.04346913937032223,
            "x_rot": -12.083752967306765,
            "y_rot": 23.872936951183807,
            "z_rot": -14.810238979249856
        },
        {
            "index": 22,
            "x_acc": -0.5002051916211843,
            "y_acc": -0.6767074214309453,
            "z_acc": 0.09551672199368476,
            "x_rot": -24.405857338532172,
            "y_rot": 24.888883193993596,
            "z_rot": -18.851303326214975
        },
        {
            "index": 23,
            "x_acc": -0.5295528666585684,
            "y_acc": -0.8174462639421224,
            "z_acc": 0.016249708533287048,
            "x_rot": -33.54308974978389,
            "y_rot": 25.39471163599911,
            "z_rot": -20.59324232873647
        },
        {
            "index": 24,
            "x_acc": -0.4955754859939217,
            "y_acc": -1.0527391208946704,
            "z_acc": -0.41629532079100606,
            "x_rot": -42.29130190666835,
            "y_rot": 20.84342703539216,
            "z_rot": -21.831340474300927
        },
        {
            "index": 25,
            "x_acc": -0.7211348844394088,
            "y_acc": -1.382795835646987,
            "z_acc": -0.9108195441663265,
            "x_rot": -47.724949617845276,
            "y_rot": 19.33267286080267,
            "z_rot": -28.884774377335543
        },
        {
            "index": 26,
            "x_acc": -1.2298998146131634,
            "y_acc": -1.4851532173156738,
            "z_acc": -0.8129331704318523,
            "x_rot": -45.031385971475295,
            "y_rot": 24.16434867966969,
            "z_rot": -43.14409883586863
        },
        {
            "index": 27,
            "x_acc": -2.026167096926272,
            "y_acc": -1.6426771904110908,
            "z_acc": -0.696165570616722,
            "x_rot": -34.32152299439565,
            "y_rot": 27.28360215851343,
            "z_rot": -54.070840809663686
        },
        {
            "index": 28,
            "x_acc": -2.006930773797631,
            "y_acc": -1.5131787038385867,
            "z_acc": -1.0893477268457412,
            "x_rot": -29.077932127063505,
            "y_rot": 7.980452790398136,
            "z_rot": -63.69561895406008
        },
        {
            "index": 29,
            "x_acc": -1.696623884654045,
            "y_acc": -0.49636546732783315,
            "z_acc": -0.6225099672973156,
            "x_rot": -39.20045347703541,
            "y_rot": -1.7342748899425056,
            "z_rot": -67.87011446155599
        },
        {
            "index": 30,
            "x_acc": -1.3363938576951622,
            "y_acc": 0.21526187631487845,
            "z_acc": 1.2585177140712738,
            "x_rot": -59.75511206715048,
            "y_rot": 12.87439773638087,
            "z_rot": -58.29089026382899
        },
        {
            "index": 31,
            "x_acc": 0.3677107381030917,
            "y_acc": 0.1493430047273636,
            "z_acc": 1.759108690139651,
            "x_rot": -84.82369583065982,
            "y_rot": 30.111599295674893,
            "z_rot": -25.571311299631667
        },
        {
            "index": 32,
            "x_acc": 1.8497870321914553,
            "y_acc": 0.39519349605143067,
            "z_acc": 0.9609861353486776,
            "x_rot": -92.96896962346682,
            "y_rot": -3.302923455484314,
            "z_rot": 5.619953927393715
        },
        {
            "index": 33,
            "x_acc": 5.108903102168441,
            "y_acc": 2.3999337740674616,
            "z_acc": -0.02810848863124847,
            "x_rot": -88.49385700003114,
            "y_rot": -45.57206716126809,
            "z_rot": 40.75963540038758
        },
        {
            "index": 34,
            "x_acc": 7.716267620533705,
            "y_acc": 4.061392529577017,
            "z_acc": 0.8784744408786296,
            "x_rot": -49.30890805241167,
            "y_rot": -61.779771382439016,
            "z_rot": 106.83135763838462
        },
        {
            "index": 35,
            "x_acc": 8.04076670115888,
            "y_acc": 4.632709485253692,
            "z_acc": 0.792644415640831,
            "x_rot": -4.914830383804164,
            "y_rot": -79.21595342772844,
            "z_rot": 158.08087611325323
        },
        {
            "index": 36,
            "x_acc": 7.432368261322378,
            "y_acc": 5.540867701256275,
            "z_acc": 1.4438614219844341,
            "x_rot": 26.865198430336786,
            "y_rot": -58.385877704616355,
            "z_rot": 216.29237908835916
        },
        {
            "index": 37,
            "x_acc": 5.6589095587909215,
            "y_acc": 5.22418017116487,
            "z_acc": 1.3611422222435474,
            "x_rot": 52.710577900604385,
            "y_rot": -112.24655017842417,
            "z_rot": 257.7795901447986
        },
        {
            "index": 38,
            "x_acc": 0.6055987261153757,
            "y_acc": 2.26155347738117,
            "z_acc": 0.5549263773679733,
            "x_rot": 49.81312627732035,
            "y_rot": -117.57135199498777,
            "z_rot": 263.2055470629701
        },
        {
            "index": 39,
            "x_acc": -5.005325823315978,
            "y_acc": -0.27293343629986044,
            "z_acc": -0.32568449101746083,
            "x_rot": 29.29350314255286,
            "y_rot": -48.847112132437935,
            "z_rot": 230.165053368167
        },
        {
            "index": 40,
            "x_acc": -7.085968899056315,
            "y_acc": -1.1670692644298075,
            "z_acc": -0.4209381781607866,
            "x_rot": 1.471394462445349,
            "y_rot": 42.44164461558409,
            "z_rot": 143.75276481958895
        },
        {
            "index": 41,
            "x_acc": -9.240549902188777,
            "y_acc": -3.6489845716133713,
            "z_acc": -0.7629694083452224,
            "x_rot": -42.652834064720885,
            "y_rot": 124.28960802488236,
            "z_rot": 25.639131662995307
        },
        {
            "index": 42,
            "x_acc": -7.630696538493037,
            "y_acc": -3.7780052115410565,
            "z_acc": 0.0888274534881115,
            "x_rot": -62.910338444805376,
            "y_rot": 158.88004922727976,
            "z_rot": -61.7044958675963
        },
        {
            "index": 43,
            "x_acc": -7.02165454005599,
            "y_acc": -3.1736130847364663,
            "z_acc": -0.24908055928647516,
            "x_rot": -62.815562739882274,
            "y_rot": 154.90571241341107,
            "z_rot": -145.8453162152274
        },
        {
            "index": 44,
            "x_acc": -4.762625612716376,
            "y_acc": -2.0508549634590745,
            "z_acc": -0.32933716830611226,
            "x_rot": -33.13836347542019,
            "y_rot": 123.39531769647424,
            "z_rot": -232.88797658268427
        },
        {
            "index": 45,
            "x_acc": -0.40331601223051544,
            "y_acc": -0.8019839063942432,
            "z_acc": -0.5083949278175831,
            "x_rot": 13.43056381879573,
            "y_rot": 72.22701700102624,
            "z_rot": -253.34425654308907
        },
        {
            "index": 46,
            "x_acc": 1.7073032457090913,
            "y_acc": 0.41679537926763294,
            "z_acc": -0.8912187716394663,
            "x_rot": 80.97818321472674,
            "y_rot": -0.8445128168715558,
            "z_rot": -228.31370327287837
        },
        {
            "index": 47,
            "x_acc": 3.6674034408792853,
            "y_acc": 2.1044544516995547,
            "z_acc": -1.5268588541448116,
            "x_rot": 172.90886163151407,
            "y_rot": -105.2592734876903,
            "z_rot": -164.53529559588856
        },
        {
            "index": 48,
            "x_acc": 5.833409216606617,
            "y_acc": 4.63628295982629,
            "z_acc": -1.2008318332999943,
            "x_rot": 229.78849137884586,
            "y_rot": -148.75300970717188,
            "z_rot": -111.00269759848398
        },
        {
            "index": 49,
            "x_acc": 6.90283468388617,
            "y_acc": 6.582973784455657,
            "z_acc": 2.144324397534132,
            "x_rot": 182.63693614182316,
            "y_rot": -24.363334288306966,
            "z_rot": -12.316986851989775
        },
        {
            "index": 50,
            "x_acc": 5.538110511502623,
            "y_acc": 5.015778828269243,
            "z_acc": -1.094519576525688,
            "x_rot": 109.56535258954649,
            "y_rot": -50.926836432815115,
            "z_rot": 150.05754851788762
        },
        {
            "index": 51,
            "x_acc": 4.41440429572016,
            "y_acc": 2.0391437751382586,
            "z_acc": 3.4064193855702873,
            "x_rot": 53.95103587652708,
            "y_rot": -37.83184749190493,
            "z_rot": 234.7453235840642
        },
        {
            "index": 52,
            "x_acc": 3.628186405995488,
            "y_acc": 0.45092122849225996,
            "z_acc": 2.387031914657354,
            "x_rot": -17.93874224177708,
            "y_rot": -26.68228425681655,
            "z_rot": 216.87160645073294
        },
        {
            "index": 53,
            "x_acc": -2.0357098551668225,
            "y_acc": -0.5696235957622527,
            "z_acc": 0.6850795284569263,
            "x_rot": -67.20740852714633,
            "y_rot": -11.515734799134641,
            "z_rot": 154.67165549093306
        },
        {
            "index": 54,
            "x_acc": -5.994216449156403,
            "y_acc": -1.8602882602006197,
            "z_acc": -2.7148879044950007,
            "x_rot": -57.87941917765991,
            "y_rot": -2.0570102928488936,
            "z_rot": 103.66846095829179
        },
        {
            "index": 55,
            "x_acc": -6.107573363745212,
            "y_acc": -2.559767485409975,
            "z_acc": -2.35152980864346,
            "x_rot": -31.122641462660617,
            "y_rot": 48.02985609258381,
            "z_rot": 36.54640247501395
        },
        {
            "index": 56,
            "x_acc": -5.830198437866568,
            "y_acc": -2.4009943890362977,
            "z_acc": -1.172885257232189,
            "x_rot": 5.781713297507127,
            "y_rot": 67.8263329489762,
            "z_rot": -63.47171852287789
        },
        {
            "index": 57,
            "x_acc": -5.38712558478713,
            "y_acc": -2.3865946922838686,
            "z_acc": -1.5276818609654903,
            "x_rot": 51.8215194971005,
            "y_rot": 51.296417968804505,
            "z_rot": -142.61661749267068
        },
        {
            "index": 58,
            "x_acc": -4.103982840286195,
            "y_acc": -1.685193559101224,
            "z_acc": -1.304924075937271,
            "x_rot": 82.52247532568829,
            "y_rot": 39.66235184984669,
            "z_rot": -194.3775258910765
        },
        {
            "index": 59,
            "x_acc": -0.10826514440774918,
            "y_acc": 0.5834416932344436,
            "z_acc": -1.0211655865013598,
            "x_rot": 120.54748398241577,
            "y_rot": -11.324907851460948,
            "z_rot": -180.855267636447
        },
        {
            "index": 60,
            "x_acc": 3.5649800082370637,
            "y_acc": 2.501920861119032,
            "z_acc": -0.5660989287674427,
            "x_rot": 109.96596367493525,
            "y_rot": -48.58264379268046,
            "z_rot": -125.94846972898169
        },
        {
            "index": 61,
            "x_acc": 4.794112345609069,
            "y_acc": 3.1258798581808804,
            "z_acc": 0.40448271792232987,
            "x_rot": 66.57015187758414,
            "y_rot": -62.58114381737827,
            "z_rot": -37.17596150138153
        },
        {
            "index": 62,
            "x_acc": 8.108930721324683,
            "y_acc": 4.382710057556629,
            "z_acc": 2.0390216100633145,
            "x_rot": 19.7457268433119,
            "y_rot": -77.26523091020529,
            "z_rot": 96.60804660192542
        },
        {
            "index": 63,
            "x_acc": 8.143874608933926,
            "y_acc": 2.480077278101444,
            "z_acc": 2.5730712036192416,
            "x_rot": 2.355816768328377,
            "y_rot": -81.64052031892122,
            "z_rot": 170.25443155399367
        },
        {
            "index": 64,
            "x_acc": 6.059892744159698,
            "y_acc": 1.2201678174108266,
            "z_acc": 3.0451345888614654,
            "x_rot": -16.940274453053352,
            "y_rot": -73.74132458153143,
            "z_rot": 198.47270241174104
        },
        {
            "index": 65,
            "x_acc": -1.991357210960239,
            "y_acc": -0.11235913572311401,
            "z_acc": 1.5709341427147387,
            "x_rot": -54.95063747665303,
            "y_rot": -47.535019132500146,
            "z_rot": 146.3404639489183
        },
        {
            "index": 66,
            "x_acc": -8.173028807225823,
            "y_acc": -0.43947102919518943,
            "z_acc": 0.595759323015809,
            "x_rot": -69.35838536094508,
            "y_rot": -2.878645124291227,
            "z_rot": 59.51839820108534
        },
        {
            "index": 67,
            "x_acc": -7.980235367828607,
            "y_acc": -0.7654109562784432,
            "z_acc": 0.6910346374690532,
            "x_rot": -63.57245698294641,
            "y_rot": 61.616782578275,
            "z_rot": -25.57363356394947
        },
        {
            "index": 68,
            "x_acc": -4.562282780852914,
            "y_acc": -2.0040344678342343,
            "z_acc": 0.05510404758453369,
            "x_rot": -44.962810872208365,
            "y_rot": 113.98452596367976,
            "z_rot": -93.32401651690242
        },
        {
            "index": 69,
            "x_acc": -1.1460288144886492,
            "y_acc": -1.0366501558810473,
            "z_acc": -0.7053548392444848,
            "x_rot": -25.20119359379243,
            "y_rot": 98.07532149980591,
            "z_rot": -108.26805377935095
        },
        {
            "index": 70,
            "x_acc": 0.39672377435863015,
            "y_acc": -0.4881505966901779,
            "z_acc": -0.6787140850782394,
            "x_rot": -3.2110106670405103,
            "y_rot": 53.51933718513101,
            "z_rot": -101.48154366908044
        },
    ];

    // document.body.appendChild(a)
    // a.click()

    // Преобразование данных в JSON-строку
    let jsonData = gesturesJson;

    // Создание объекта XMLHttpRequest
    let xhr = new XMLHttpRequest();

    // Установка метода и URL-адреса запроса
    xhr.open("POST", "user_series/new", true);

    // Установка заголовков запроса, если необходимо
    xhr.setRequestHeader("Content-Type", "application/json");

    // Отслеживание событий изменения состояния запроса
    xhr.onloadstart = function () {
        document.getElementById("myProgressBar").classList.remove("d-none");
        document.getElementById("myProgressBar").style.width = "0%";
    };

    xhr.onprogress = function (event) {
        if (event.lengthComputable) {
            let percentComplete = (event.loaded / event.total) * 100;
            document.getElementById("myProgressBar").style.width = percentComplete + "%";
        }
    };

    xhr.onloadend = function () {
        // Выполнение дополнительных действий по завершении загрузки
        document.getElementById("myProgressBar").style.width = "100%";
    };

    // Отслеживание события изменения состояния запроса
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 201) {
                console.log(xhr.responseText);
                rootEl.style.setProperty('--mrd', '0px')
                rootEl.style.setProperty('--mld', '10px')
                downloadButton.classList.add("btn-success");
                downloadButton.innerHTML = 'done<i class="fa-solid fa-check"></i>';

                button.classList.add("d-none");

                backButton.innerHTML = "BACK";
                backButton.setAttribute("type", "button");
                backButton.classList.add("downloadButton");
                backButton.style.setProperty('--clr', '#04d9ff')
                document.getElementById("buttonsSection").append(backButton);
            } else {
                downloadButton.innerHTML = 'Error occured<i class="fa-solid fa-times"></i>';
                downloadButton.classList.add("btn-danger");
                downloadButton.setAttribute("disabled", true);
                console.log("Произошла ошибка при выполнении запроса");
            }
        }
    };

    // Отправка данных
    xhr.send(JSON.stringify({
        'time_series': jsonData,
        'username': gestureName,
    }));

    // URL.revokeObjectURL(href)
    // a.remove()
});

backButton.addEventListener('click', (e) => {
    window.location.href = `/`;
});

//======================================================================================================================

Chart.defaults.font.size = 20
Chart.defaults.font.family = "'Symbol', system-ui"
Chart.defaults.color = '#e0e0e0'

const AccChart = document.getElementById('AccelerationChart')
const GyroChart = document.getElementById('GyroChart')

function createScales(suggested) {
    return {
        x: {
            grid: {
                display: false,
            },
            border: {
                display: false,
            },
            ticks: {
                display: false,
            },
        },
        y: {
            grid: {
                display: false,
            },
            border: {
                display: false,
            },
            ticks: {
                display: false,
            },
            suggestedMin: -suggested,
            suggestedMax: suggested
        },
    };
}

const accChart = new Chart(AccChart, {
    type: 'line',
    data: {
        labels: Array(n).join('.').split('.'),
        datasets: [{
            label: 'X Axis',
            data: x_acc,
            fill: false,
            borderColor: '#bc13fe',
            pointRadius: 0
        },
        {
            label: 'Y Axis',
            data: y_acc,
            fill: false,
            borderColor: '#04d9ff',
            pointRadius: 0
        },
        {
            label: 'Z Axis',
            data: z_acc,
            fill: false,
            borderColor: '#c8ff00',
            pointRadius: 0
        }]
    },
    options: {
        scales: createScales(10),
        plugins: {
            title: {
                display: true,
                text: 'Acceleration',
                font: {
                    size: 40
                }
            }
        }
    }
})

const gyroChart = new Chart(GyroChart, {
    type: 'line',
    data: {
        labels: Array(n).join('.').split('.'),
        datasets: [{
            label: 'X Axis',
            data: a_rot,
            fill: false,
            borderColor: '#fe019a',
            pointRadius: 0
        },
        {
            label: 'Y Axis',
            data: b_rot,
            fill: false,
            borderColor: '#7df9ff',
            pointRadius: 0
        },
        {
            label: 'Z Axis',
            data: g_rot,
            fill: false,
            borderColor: '#5555ff',
            pointRadius: 0
        }]
    },
    options: {
        scales: createScales(150),
        plugins: {
            title: {
                display: true,
                text: 'Rotation',
                font: {
                    size: 40
                }
            }
        }
    }
})
