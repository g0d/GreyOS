/*
    GreyOS - Octopus (Version: 1.4)

    File name: octopus.js
    Description: This file contains the Octopus - Devices management module.

    Coded by George Delaportas (G0D)
    Copyright © 2021 - 2023
    Open Software License (OSL 3.0)
*/

// Octopus
function octopus()
{
    var self = this;

    function devices_model()
    {
        function input_model()
        {
            this.audio = [];
            this.video = [];
        }

        function output_model()
        {
            this.audio = [];
            this.video = [];
        }

        this.num = 0;
        this.all = [];
        this.input = new input_model();
        this.output = new output_model();
    }

    function utilities()
    {
        var me = this;

        function show_notification(status)
        {
            var __notification_object = utils_sys.objects.by_id(octopus_id + '_notification'),
                __notification_msg_object = utils_sys.objects.by_id(octopus_id + '_message'),
                __sys_theme = chameleon.get();

            __notification_msg_object.innerHTML = 'Device: ' + status + '!';
            __notification_object.style.display = 'block';

            parrot.play('action', '/site/themes/' + __sys_theme + '/sounds/pong.wav');

            setTimeout(function()
                       {
                           __notification_object.style.display = 'none';
                       }, 5000);

            return true;
        }

        function scan_new_devices(devices)
        {
            var __device = null,
                __status = null,
                __device_exists = false;

            for (__device in devices)
            {
                for (var i = 0; i < usb_devices.num; i++)
                {
                    if (__device.label === usb_devices.all[i])
                    {
                        __device_exists = true;

                        break;
                    }
                }

                if (__device_exists === false)
                {
                    var [kind, type, direction] = device.kind.match(/(\w+)(input|output)/i);

                    usb_devices.all.push(device.label);
                    usb_devices[direction][type].push(device.label);
                    usb_devices.num++;

                    if (usb_devices.num === devices.length)
                        __status = 'Connected';
                    else
                        __status = 'Disconnected';

                    show_notification(__status);

                    return true;
                }
            }

            return false;
        }

        function device_manager()
        {
            navigator.mediaDevices.enumerateDevices()
            .then(function(devices)
            {
                scan_new_devices(devices)
            })
            .catch(function(error)
            {
                // Nothing...
            });

            return true;
        }

        this.load_ui = function()
        {
            nature.themes.store('octopus');
            nature.apply('new');

            if (me.start_component())
                return me.draw();
            else
                return false;
        };

        this.start_component = function()
        {
            if (is_component_active === true)
                return false;

            var __constraints =
            {
                video:
                {
                    width: 1920,
                    height: 1080,
                    frameRate: 30,
                },
                audio:
                {
                    sampleRate: 44100,
                    sampleSize: 16,
                    volume: 0.30,
                }
            };

            if (!navigator.mediaDevices)
                return false;

            //navigator.mediaDevices.getUserMedia(__constraints).then(() => { device_manager(); });
            navigator.mediaDevices.ondevicechange = function() { device_manager(); };

            is_component_active = true;

            return true;
        };

        this.draw = function()
        {
            if (is_component_active === false)
                return false;

            var __dynamic_object = null,
                __container = utils_sys.objects.by_id(self.settings.container());

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', octopus_id);
            __dynamic_object.setAttribute('class', 'octopus');
            __dynamic_object.setAttribute('title', 'Manage devices');

            __dynamic_object.innerHTML += '<div id="' + octopus_id + '_manager" class="device"></div>\
                                           <div id="' + octopus_id + '_notification" class="notification">\
                                               <div id="' + octopus_id + '_icon" class="icon"></div>\
                                               <div id="' + octopus_id + '_message" class="message"></div>\
                                           </div>';

            __container.appendChild(__dynamic_object);

            return true;
        };
    }

    function devices()
    {
        function io_model()
        {
            this.inputs = function(device_id)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.alpha.is_symbol(device_id))
                    return false;

                return usb_devices.inputs;
            };
    
            this.outputs = function(device_id)
            {
                if (is_init === false)
                    return false;
        
                if (utils_sys.validation.alpha.is_symbol(device_id))
                    return false;

                return usb_devices.outputs;
            };
        }
    
        this.list = function(device_id)
        {
            if (is_init === false)
                return false;
    
            if (utils_sys.validation.alpha.is_symbol(device_id))
                return false;

            return usb_devices.all;
        };

        this.io = new io_model();
    }

    function settings()
    {
        var __id = null,
            __container = null;

        this.id = function(val)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(val))
                return __id;

            if (utils_sys.validation.alpha.is_symbol(val))
                return false;

            __id = val;

            return true;
        };

        this.container = function(val)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(val))
                return __container;

            if (utils_sys.validation.alpha.is_symbol(val))
                return false;

            __container = val;

            return true;
        };
    }

    this.init = function(container_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        is_init = true;

        self.settings.id('octopus_' + random.generate());

        octopus_id = self.settings.id();

        if (utils_sys.validation.misc.is_undefined(container_id))
            return utils_int.start_component();
        else
        {
            if (utils_sys.validation.alpha.is_symbol(container_id))
                return false;

            self.settings.container(container_id);

            return utils_int.load_ui();
        }
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');

        parrot = matrix.get('parrot');
        chameleon = matrix.get('chameleon');
        nature = matrix.get('nature');

        return true;
    };

    var is_init = false,
        is_component_active = false,
        octopus_id = null,
        cosmos = null,
        matrix = null,
        parrot = null,
        chameleon = null,
        nature = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        usb_devices = new devices_model(),
        utils_int = new utilities();

    this.devices = new devices();
    this.settings = new settings();
}
