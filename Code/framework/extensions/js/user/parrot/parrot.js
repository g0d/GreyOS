/*
    GreyOS - Parrot (Version: 1.0)

    File name: parrot.js
    Description: This file contains the Parrot - Sound service module.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Parrot
function parrot()
{
    var self = this;

    function audio_service_model()
    {
        var __audio_service_init = false,
            __sound_files = [],
            __play_file = null,
            __audio_player = utils_sys.objects.by_id(self.settings.id()).childNodes[0];

        function set_sounds()
        {
            function os_sounds_model()
            {
                this.login = function(sound_file)
                {
                    if (__audio_service_init === false)
                        return false;
    
                    if (!utils_sys.validation.alpha.is_string(sound_file))
                        return false;

                    return true;
                };
    
                this.logout = function(sound_file)
                {
                    if (__audio_service_init === false)
                        return false;
    
                    if (!utils_sys.validation.alpha.is_string(sound_file))
                        return false;

                    return true;
                };

                this.click = function(sound_file)
                {
                    if (__audio_service_init === false)
                        return false;
    
                    if (!utils_sys.validation.alpha.is_string(sound_file))
                        return false;

                    return true;
                };
            }

            function app_sounds_model()
            {
                this.open = function(sound_file)
                {
                    if (__audio_service_init === false)
                        return false;
    
                    if (!utils_sys.validation.alpha.is_string(sound_file))
                        return false;

                    return true;
                };

                this.close = function(sound_file)
                {
                    if (__audio_service_init === false)
                        return false;
    
                    if (!utils_sys.validation.alpha.is_string(sound_file))
                        return false;

                    return true;
                };
            }

            this.os = new os_sounds_model();
            this.app = new app_sounds_model();
        }

        this.volume = function(app_id)
        {
            if (__audio_service_init === false)
                return false;

            if (utils_sys.validation.alpha.is_symbol(app_id))
                return false;

            return ;
        };

        this.options = function(app_id)
        {
            if (__audio_service_init === false)
                return false;

            if (utils_sys.validation.alpha.is_symbol(app_id))
                return false;

            return ;
        };

        this.play = function(sound_file, list = false, replay = false)
        {
            if (__audio_service_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(sound_file))
            {
                if (__play_file === null)
                    return false;

                if (replay === true)
                    __audio_player.loop = true;

                __audio_player.src = __play_file;
            }
            else
            {
                if (!utils_sys.validation.alpha.is_string(sound_file))
                    return false;

                __play_file = sound_file;

                if (replay === true)
                    __audio_player.loop = true;

                __audio_player.src = __play_file;
            }

            return true;
        };

        this.pause = function()
        {
            if (__audio_service_init === false)
                return false;

            __audio_player.pause();

            return true;
        };

        this.stop = function()
        {
            if (__audio_service_init === false)
                return false;

            audio.pause();

            __audio_player.src = '';

            return true;
        };

        this.clear = function()
        {
            if (__audio_service_init === false)
                return false;

            audio.stop();

            __sound_files = [];
            __play_file = null;

            return true;
        };

        this.files = function()
        {
            if (__audio_service_init === false)
                return false;

            return __sound_files;
        };

        this.init = function()
        {
            if (__audio_service_init === true)
                return false;

            __audio_service_init = true;

            return true;
        };

        this.set = new set_sounds();
    }

    function utilities()
    {
        var me = this;

        this.load_ui = function()
        {
            nature.theme('parrot');
            nature.apply('new');

            me.start_service();
            me.draw();
        };

        this.start_service = function()
        {
            if (is_service_active === true)
                return false;

            var __dynamic_object = null,
                __parrot_id = self.settings.id(),
                __container = utils_sys.objects.by_id(self.settings.container());

            __container.innerHTML = '';

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', __parrot_id);
            __dynamic_object.setAttribute('class', 'parrot');

            __dynamic_object.innerHTML = '<audio id="' + __parrot_id + '_audio_service" autoplay></audio>';

            __container.appendChild(__dynamic_object);

            audio = new audio_service_model();

            audio.init();

            is_service_active = true;

            return true;
        };

        this.draw = function()
        {
            if (is_service_active === false)
                return false;

            audio.clear();

            var __parrot_id = self.settings.id(),
                __parrot_div = utils_sys.objects.by_id(self.settings.id());

            __parrot_div.innerHTML += '<div id="' + __parrot_id + '_speaker" class="speaker"></div>' + 
                                      '<div id="' + __parrot_id + '_volume" class="volume">100%</div>';
            __parrot_div.style.display = 'block';

            return true;
        };
    }

    function status()
    {
        this.volume = function(app_id)
        {
            if (is_init === false)
                return false;

            return audio.volume(app_id);
        };

        this.options = function(app_id)
        {
            if (is_init === false)
                return false;

            return audio.options(app_id);
        };
    }

    function settings()
    {
        var __id = null,
            __container = 'audio';

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

    this.files = function()
    {
        if (is_init === false)
            return false;

        return audio.files();
    };

    this.options = function()
    {
        if (is_init === false)
            return false;

        return audio.options();
    };

    this.volume = function()
    {
        if (is_init === false)
            return false;

        return audio.volume();
    };

    this.set = function()
    {
        if (is_init === false)
            return false;

        return audio.set();
    };

    this.play = function(sound_file, list = false, replay = false)
    {
        if (is_init === false)
            return false;

        return audio.play(sound_file, list, replay);
    };

    this.pause = function()
    {
        if (is_init === false)
            return false;

        return audio.pause();
    };

    this.stop = function()
    {
        if (is_init === false)
            return false;

        return audio.stop();
    };

    this.clear = function()
    {
        if (is_init === false)
            return false;

        return audio.clear();
    };

    this.load = function(container_id)
    {
        if (is_init === false)
            return false;

        if (utils_sys.validation.alpha.is_symbol(container_id))
            return false;

        self.settings.container(container_id);

        utils_int.load_ui();

        return true;
    };

    this.init = function(container_id)
    {
        if (is_init === true)
            return false;

        is_init = true;

        self.settings.id('parrot_' + random.generate());

        if (utils_sys.validation.misc.is_undefined(container_id))
            return utils_int.start_service();
        else
            return self.load(container_id);
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');

        nature = matrix.get('nature');

        return true;
    };

    var is_init = false,
        is_service_active = false,
        cosmos = null,
        matrix = null,
        nature = null,
        audio = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        utils_int = new utilities();

    this.status = new status();
    this.settings = new settings();
}
