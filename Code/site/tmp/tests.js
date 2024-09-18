/*
    Tests for current libs and future additions
*/

console.log(navigator.onLine);
console.log(navigator.languages);
console.log(navigator.userAgentData);



var tk = new task();
tk.create('/framework/extensions/js/core/task/worker.js');
tk.message.receive((x) => { console.log(x.data); });
tk.message.send('Test');



var pl = new parallel();
var tk_1 = pl.create('/framework/extensions/js/core/parallel/worker.js');
var tk_2 = pl.create('/framework/extensions/js/core/parallel/worker.js');
var tk_3 = pl.create('/framework/extensions/js/core/parallel/worker.js');
var tasks_config = 
[
    { "id" : tk_1, "data" : "Task 1" },
    { "id" : tk_2, "data" : {"id" : "1", "sd" : [2,5,3,4] }, "callback" : function(e) { console.log(e.data); } },
    { "id" : tk_3, "data" : '...', "callback" : function(e) { console.log(e.data + 'XXX'); } },
];
//console.log(pl.run(tk_1, 'TASK 1'));
//console.log(pl.run(tk_2, 'test 2', () => { console.log('OK!'); }));
//console.log(pl.run(tk_3, '3333', (e) => { console.log(e.data); }));
console.log(pl.run_all(tasks_config));



console.log('VM CPU: ', navigator.hardwareConcurrency, ' CORES');
console.log('VM RAM: ', navigator.deviceMemory, ' GiB');



setInterval(function()
{
    // console.log('SIZE LIMIT: ', window.performance.memory.jsHeapSizeLimit / 1073741824, ' GiB');
    // console.log('TOTAL ALLOCATED: ', window.performance.memory.totalJSHeapSize / 1048576, ' MiB');
    // console.log('AVAILABLE: ', 32, ' MiB');
    console.log('USED: ', Math.floor(window.performance.memory.usedJSHeapSize / 1048576), ' MiB');
    console.log('FREE: ', (window.performance.memory.totalJSHeapSize - 
                           window.performance.memory.usedJSHeapSize) / 1048576, ' MiB');
    //console.log('MEMORY USE: ', Math.floor(((window.performance.memory.usedJSHeapSize / 1048576) / 32) * 100), '%');
}, 15000)



console.log('NETWORK: ', navigator.connection);
console.log('LOCATION: ', navigator.geolocation);
console.log('| ===> ENABLE POS: ', navigator.geolocation.getCurrentPosition(
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
                    width:          1200,
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



var greyos_bc = new BroadcastChannel("greyos-bc-2024-xxx");
greyos_bc.addEventListener("message", (event) => { console.info(event.data); });
greyos_bc.postMessage('GreyOS R0ckZ!!!');



// HID API - https://developer.mozilla.org/en-US/docs/Web/API/HID
// Keyboard API - https://developer.mozilla.org/en-US/docs/Web/API/Keyboard
// USB API - https://developer.mozilla.org/en-US/docs/Web/API/WebUSB_API
// Bluetooth API - https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API (Bismuth)
// Serial API - https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API
// Battery API - https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API (Volta)
// GPU API - https://developer.mozilla.org/en-US/docs/Web/API/Navigator/gpu [navigator.gpu]
// Barcode - https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API (we will see...)
// Notifications API - https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API (Iris)
// Clipboard API - https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API (Consus)
// Indexed DB - https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API (Mammoth)
// Canvas API - https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API (component as part of Cloud IDE)
// WebRTC API - https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API (we will see...)
// Sensors API - https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs (we will see...)
