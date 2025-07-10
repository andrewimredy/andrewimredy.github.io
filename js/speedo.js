// Get accelerometer data using the DeviceMotionEvent API

function handleMotion(event) {
    // event.acceleration: {x, y, z} in m/s^2 (without gravity)
    // event.accelerationIncludingGravity: {x, y, z} in m/s^2 (with gravity)
    // event.rotationRate: {alpha, beta, gamma} in deg/s

    // Log the acceleration data
    console.log('Acceleration (no gravity):', event.acceleration);
    console.log('Acceleration (with gravity):', event.accelerationIncludingGravity);
    console.log('Rotation rate:', event.rotationRate);
    console.log('Interval (ms):', event.interval);

    const accelDisplay = document.getElementById('accelerationDisplay');
    const xDisplay = document.getElementById('xDisplay');
    const yDisplay = document.getElementById('yDisplay');
    const zDisplay = document.getElementById('zDisplay');
    if (accelDisplay && event.accelerationIncludingGravity) {
        const { x, y, z } = event.accelerationIncludingGravity;
        const g = Math.sqrt((x || 0) ** 2 + (y || 0) ** 2 + (z || 0) ** 2) / 9.80665;
        accelDisplay.textContent = `Your g is ${g.toFixed(3)}`;
        if (xDisplay) xDisplay.textContent = `|x| = ${Math.abs(x || 0).toFixed(3)}`;
        if (yDisplay) yDisplay.textContent = `|y| = ${Math.abs(y || 0).toFixed(3)}`;
        if (zDisplay) zDisplay.textContent = `|z| = ${Math.abs(z || 0).toFixed(3)}`;
    }
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
        const accelDisplay = document.getElementById('accelerationDisplay');
        if (accelDisplay) {
            accelDisplay.textContent = 'Motion sensor not supported or access is restricted.';
        }
    }
}

window.onload = function() {
    const btn = document.getElementById('startAccelBtn');
    if (btn) {
        btn.onclick = function() {
            // Hide the button and center container after starting
            const container = document.getElementById('centerContainer');
            if (container) container.style.display = 'none';
            startAccelerometer();
        };
    }
};