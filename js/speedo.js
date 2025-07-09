// Get accelerometer data using the DeviceMotionEvent API
if ('DeviceMotionEvent' in window) {
    // Check if permission is needed (iOS 13+)
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        // Show a button or trigger this on user gesture (e.g., button click)
        const btn = document.createElement('button');
        btn.textContent = 'Enable Accelerometer';
        btn.onclick = function() {
            DeviceMotionEvent.requestPermission().then(response => {
                if (response === 'granted') {
                    window.addEventListener('devicemotion', handleMotion);
                } else {
                    alert('Permission denied for accelerometer.');
                }
            });
        };
        document.body.appendChild(btn);
    } else {
        // No permission needed, just add listener
        window.addEventListener('devicemotion', handleMotion);
    }

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
        if (accelDisplay && event.accelerationIncludingGravity) {
            const { x, y, z } = event.accelerationIncludingGravity;
            const g = Math.sqrt((x || 0) ** 2 + (y || 0) ** 2 + (z || 0) ** 2) / 9.80665;
            accelDisplay.textContent = `Your g is ${g.toFixed(3)}`;
        }
    }
} else {
    console.log('DeviceMotionEvent is not supported on this device.');
}