const button = document.querySelector(".mainButton")
const chart = document.querySelector(".chart")
let startPage = 0 // 0 - start | 1 - stop | 2 - download/back
const rootEl = document.querySelector(':root')
const downloadButton = document.querySelector(".downloadButton")
// const inputBoxes = document.querySelector(".inputBoxes")
let gestureArray = []
let indexOfGestureArray = 0
const n = 150
let gestureName = document.getElementById("gestureUsername").getAttribute("data-username")
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

    rootEl.style.setProperty('--mrd', '0px')
    rootEl.style.setProperty('--mld', '10px')
    downloadButton.innerHTML = 'done<i class="fa-solid fa-check"></i>'

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
    ];

    // Преобразование данных в JSON-строку
    let jsonData = gesturesJson;

    // Создание объекта XMLHttpRequest
    let xhr = new XMLHttpRequest();

    // Установка метода и URL-адреса запроса
    xhr.open("POST", "user_series/test", true);

    // Установка заголовков запроса, если необходимо
    xhr.setRequestHeader("Content-Type", "application/json");

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
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                rootEl.style.setProperty('--mrd', '0px')
                rootEl.style.setProperty('--mld', '10px')
                downloadButton.classList.add("btn-success");
                downloadButton.innerHTML = 'DONE<i class="fa-solid fa-check"></i>';

                document.getElementById("statusDiv").classList.remove("d-none")
                document.getElementById("statusDiv").innerHTML = "Проверка успешно пройдена!"

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
})

backButton.addEventListener('click', (e) => {
    window.location.href = `/test_gesture?username=${gestureName}`;
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
