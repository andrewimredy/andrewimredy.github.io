// Get accelerometer data using the DeviceMotionEvent API
var maxG = 0.0;

//[{ x, y, z, timestamp }]
var accelTimeSeries = new Array();
var speedTimeSeries = new Array();

function handleMotion(event) {
    // event.acceleration: {x, y, z} in m/s^2 (without gravity)
    // event.accelerationIncludingGravity: {x, y, z} in m/s^2 (with gravity)
    // event.rotationRate: {alpha, beta, gamma} in deg/s

    //messy
    const accelDisplay = document.getElementById('accelerationDisplay');
    const xDisplay = document.getElementById('xDisplay');
    const yDisplay = document.getElementById('yDisplay');
    const zDisplay = document.getElementById('zDisplay');
    const maxGDisplay = document.getElementById('maxGDisplay');
    const speedDisplay = document.getElementById('speedDisplay');


    if (accelDisplay && event.accelerationIncludingGravity) {
        const { x, y, z } = event.accelerationIncludingGravity;

        accelTimeSeries.push({ x, y, z, timestamp: Date.now() });

        // Use gravity-free acceleration for speed
        const a = event.acceleration;
        if (a) {
            speedTimeSeries.push({ x: a.x, y: a.y, z: a.z, timestamp: Date.now() });
        }

        const g = Math.sqrt((x || 0) ** 2 + (y || 0) ** 2 + (z || 0) ** 2) / 9.80665;
        if (g > maxG) {
            maxG = g;
            if (maxGDisplay) maxGDisplay.textContent = `Max g force: ${maxG.toFixed(2)}`;
        }
        accelDisplay.textContent = `Current g force: ${g.toFixed(2)}`;
        if (xDisplay) xDisplay.textContent = `|x| = ${Math.abs(x || 0).toFixed(1)} m/s²`;
        if (yDisplay) yDisplay.textContent = `|y| = ${Math.abs(y || 0).toFixed(1)} m/s²`;
        if (zDisplay) zDisplay.textContent = `|z| = ${Math.abs(z || 0).toFixed(1)} m/s²`;
        const speed = speedTimeSeries.reduce((v, sample, i) => {
            if (i === 0) return { vx: 0, vy: 0, vz: 0 };
            const dt = (sample.timestamp - speedTimeSeries[i - 1].timestamp) / 1000;
            return { vx: v.vx + (sample.x || 0) * dt, vy: v.vy + (sample.y || 0) * dt, vz: v.vz + (sample.z || 0) * dt };
        }, { vx: 0, vy: 0, vz: 0 });
        const speedMag = Math.sqrt(speed.vx ** 2 + speed.vy ** 2 + speed.vz ** 2);
        speedDisplay.textContent = `Current speed: ${speedMag.toFixed(1)} m/s`
    }


    //find area under the curve for signed X

}

function startAccelerometer() {

    if ('DeviceMotionEvent' in window) {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission().then(response => {
                if (response === 'granted') {
                    window.addEventListener('devicemotion', handleMotion);
                } else {
                    alert('Permission denied for accelerometer.');
                }
            });
        } else {
            window.addEventListener('devicemotion', handleMotion);
        }
    } else {
        console.log('DeviceMotionEvent is not supported on this device.');
        alert('Motion is not supported on this device - Use your Phone!');
        const accelDisplay = document.getElementById('accelerationDisplay');
        if (accelDisplay) {
            accelDisplay.textContent = 'Motion sensor not supported or access is restricted.';
        }
    }
}

function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}

function showDesktopMessageWithQR() {
    const container = document.getElementById('centerContainer');
    if (container) {
        container.innerHTML = `
            <div style="text-align:center;">
                <p>Motion sensor not supported on desktop.<br>Try on your phone!</p>
                <img id="qrCode" src="pictures/speedo_qr.png" alt="QR code to open on your phone" style="margin:20px 0; width:180px; height:180px;">
            </div>
        `;
        container.style.display = 'block';
    }
}

window.onload = function() {
    const btn = document.getElementById('startAccelBtn');
    if (btn) {
        btn.onclick = function() {
            if (!isMobileDevice()) {
                showDesktopMessageWithQR();
            } else {
                // Hide the button and center container after starting
                const container = document.getElementById('centerContainer');
                if (container) container.style.display = 'none';
                startAccelerometer();
            }
        };
    }
};