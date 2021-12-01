var pl = new parallel();
var tk_1 = pl.tasks.create('/framework/extensions/js/user/parallel/worker.js');
var tk_2 = pl.tasks.create('/framework/extensions/js/user/parallel/worker.js');
var tk_3 = pl.tasks.create('/framework/extensions/js/user/parallel/worker.js');
var tasks_config = 
[
    { "id" : tk_1, "data" : "Task 1", "callback" : function(e) { console.log(e.data); } },
    { "id" : tk_2, "data" : "Task 2", "callback" : function(e) { console.log(e.data); } },
    { "id" : tk_3, "data" : "Task 3", "callback" : function(e) { console.log(e.data); } },
];
console.log(pl.tasks.run_all(tasks_config));

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



navigator.usb.getDevices()
.then(devices =>
{
    console.log("Total devices: " + devices.length);

    devices.forEach(device =>
    {
        console.log("Product name: " + device.productName + ", serial number " + device.serialNumber);
    });
});

navigator.usb.onconnect = function(event) { console.log('CONNECTED!'); };
navigator.usb.ondisconnect = function(event) { console.log('DISCONNECTED!'); };
