let timeoutId;
let simulationActive = false;

const roadScene = document.getElementById('roadScene');
const sensorPanel = document.getElementById('sensorPanel');
const sensorStatus = document.getElementById('sensorStatus');
const simulationImage = document.querySelector('.simulation-image');
const sign = document.getElementById('ledSign');
const timeMode = document.getElementById('timeMode');
const weatherMode = document.getElementById('weatherMode');

function applySceneState() {
    const timeValue = timeMode.value;
    const weatherValue = weatherMode.value;

    roadScene.classList.remove('day', 'sunrise', 'sunset', 'night', 'fog', 'rain', 'clear', 'cloudy');

    roadScene.classList.add(timeValue === 'night' ? 'night' : 'day');

    if (weatherValue === 'rain') {
        roadScene.classList.add('rain');
    } else if (weatherValue === 'cloudy') {
        roadScene.classList.add('fog');
    } else {
        roadScene.classList.add('clear');
    }

    updateSignalState();
}

function shouldActivateSignal(timeValue, weatherValue) {
    return (timeValue === 'day' && (weatherValue === 'rain' || weatherValue === 'cloudy')) ||
        (timeValue === 'sunrise' || timeValue === 'sunset' || timeValue === 'night');
}

function updateSignalState() {
    const lightsOn = simulationActive && shouldActivateSignal(timeMode.value, weatherMode.value);
    simulationImage.src = lightsOn ? 'simulacion-senda.png' : 'simulacion-senda-apagada.png';
    sign.classList.toggle('active', lightsOn);
    sensorPanel.classList.toggle('active', lightsOn);
}

function simularCruce() {
    simulationActive = true;
    sign.textContent = 'Reduzca la velocidad — peatón cruzando';
    roadScene.classList.add('active');
    sensorStatus.textContent = 'Peatón detectado';
    updateSignalState();

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        simulationActive = false;
        sign.textContent = 'Sistema en espera';
        roadScene.classList.remove('active');
        sensorStatus.textContent = 'Sistema en espera';
        updateSignalState();
    }, 4000);
}

if (timeMode && weatherMode) {
    timeMode.addEventListener('change', applySceneState);
    weatherMode.addEventListener('change', applySceneState);
}
