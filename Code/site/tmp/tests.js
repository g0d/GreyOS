
console.log('VM CPU: ', navigator.hardwareConcurrency, ' CORES');
console.log('VM RAM: ', navigator.deviceMemory, ' GiB');

setInterval(function()
{
    // console.log('SIZE LIMIT: ', window.performance.memory.jsHeapSizeLimit / 1073741824, ' GiB');
    // console.log('TOTAL ALLOCATED: ', window.performance.memory.totalJSHeapSize / 1048576, ' MiB');
    // console.log('AVAILABLE: ', 32, ' MiB');
    // console.log('USED: ', Math.floor(window.performance.memory.usedJSHeapSize / 1048576), ' MiB');
    // console.log('FREE: ', (window.performance.memory.totalJSHeapSize - 
    //                       window.performance.memory.usedJSHeapSize) / 1048576, ' MiB');
    console.log('MEMORY USE: ', Math.floor(((window.performance.memory.usedJSHeapSize / 1048576) / 32) * 100), '%');
}, 15000)



console.log('NETWORK: ', navigator.connection);
console.log('LOCATION: ', navigator.geolocation);
console.log('| ===> CURRENT POS: ', navigator.geolocation.getCurrentPosition(
            function(pos) { },
            function(error) { },
            {
                enableHighAccuracy: true,
                timeout: 5000
            }));
console.log('| ===> WATCH POS: ', navigator.geolocation.watchPosition(
            function(pos) { },
            function(error) { },
            {
                enableHighAccuracy: true,
                timeout: 5000
            }));
console.log('| ===> CLEAR WATCH: ', navigator.geolocation.clearWatch(0));



console.log('SYSTEM CONSTRAINTS: ', navigator.mediaDevices.getSupportedConstraints());
console.log('SHARE SCREEN: ', navigator.mediaDevices.getDisplayMedia(
            {
                video:
                {
                    width:          1366,
                    height:         700,
                    aspectRatio:    1.777777778,
                    frameRate:      30
                },
                audio:
                {
                    sampleSize:     16,
                    channelCount:   2
                }
            }));



console.log('USE MIC & CAMERA: ', navigator.mediaDevices.getUserMedia(
    {
        audio:      true,
        video:
        {
            width:  1280,
            height: 720
        }
    }));
