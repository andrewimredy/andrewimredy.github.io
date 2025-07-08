// Get accelerometer data using the DeviceMotionEvent API
if ('DeviceMotionEvent' in window) {
    window.addEventListener('devicemotion', function(event) {
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
    });
} else {
    console.log('DeviceMotionEvent is not supported on this device.');
}