/*
    GreyOS - Parrot (Version: 1.2)

    File name: parrot.js
    Description: This file contains the Parrot - Sound module.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2023
    Open Software License (OSL 3.0)
*/

// Parrot
function parrot()
{
    var self = this;

    function audio_component_model()
    {
        var __audio_component_init = false,
            __stream_contexts = ['sys', 'action', 'misc'],
            __sound_files = [],
            __stream_context_in_use = null,
            __play_file = null,
            __audio_stream = null,
            __audio_player = utils_sys.objects.by_id(parrot_id);

        function set_sounds()
        {
            function os_sounds_model()
            {
                this.login = function(sound_file)
                {
                    if (__audio_component_init === false)
                        return false;
    
                    if (!utils_sys.validation.alpha.is_string(sound_file))
                        return false;

                    return true;
                };
    
                this.logout = function(sound_file)
                {
                    if (__audio_component_init === false)
                        return false;
    
                    if (!utils_sys.validation.alpha.is_string(sound_file))
                        return false;

                    return true;
                };

                this.click = function(sound_file)
                {
                    if (__audio_component_init === false)
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
                    if (__audio_component_init === false)
                        return false;
    
                    if (!utils_sys.validation.alpha.is_string(sound_file))
                        return false;

                    return true;
                };

                this.close = function(sound_file)
                {
                    if (__audio_component_init === false)
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
            if (__audio_component_init === false)
                return false;

            if (utils_sys.validation.alpha.is_symbol(app_id))
                return false;

            return ;
        };

        this.options = function(app_id)
        {
            if (__audio_component_init === false)
                return false;

            if (utils_sys.validation.alpha.is_symbol(app_id))
                return false;

            return ;
        };

        this.play = function(context, sound_file, list = false, replay = false)
        {
            if (__audio_component_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(context) || utils_sys.validation.alpha.is_symbol(context))
                return false;

            if (__stream_contexts.indexOf(context) === -1)
                return false;

            __stream_context_in_use = context;

            if (context === 'sys')
                __audio_stream = __audio_player.childNodes[0];
            else if (context === 'action')
                __audio_stream = __audio_player.childNodes[2];
            else
                __audio_stream = __audio_player.childNodes[4];

            if (utils_sys.validation.misc.is_undefined(sound_file))
            {
                if (__play_file === null)
                    return false;

                if (replay === true)
                    __audio_stream.loop = true;

                __audio_stream.src = __play_file;
            }
            else
            {
                if (!utils_sys.validation.alpha.is_string(sound_file))
                    return false;

                __play_file = sound_file;

                if (replay === true)
                    __audio_stream.loop = true;

                __audio_stream.src = __play_file;
            }

            return true;
        };

        this.pause = function()
        {
            if (__audio_component_init === false)
                return false;

            if (__stream_context_in_use === null)
                return false;

            __audio_stream.pause();

            return true;
        };

        this.stop = function()
        {
            if (__audio_component_init === false)
                return false;

            if (__stream_context_in_use === null)
                return false;

            audio.pause();

            __audio_stream.src = '';

            return true;
        };

        this.clear = function()
        {
            if (__audio_component_init === false)
                return false;

            audio.stop();

            __sound_files = [];
            __play_file = null;
            __audio_stream = null;
            __stream_context_in_use = null;

            return true;
        };

        this.files = function()
        {
            if (__audio_component_init === false)
                return false;

            return __sound_files;
        };

        this.init = function()
        {
            if (__audio_component_init === true)
                return false;

            __audio_component_init = true;

            return true;
        };

        this.set = new set_sounds();
    }

    function utilities()
    {
        var me = this;

        this.load_ui = function()
        {
            nature.themes.store('parrot');
            nature.apply('new');

            me.start_component();
            me.draw();
        };

        this.start_component = function()
        {
            if (is_component_active === true)
                return false;

            var __dynamic_object = null,
                __container = utils_sys.objects.by_id(self.settings.container());

            __container.innerHTML = '';

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', parrot_id);
            __dynamic_object.setAttribute('class', 'parrot');
            __dynamic_object.setAttribute('title', 'Manage system & apps sound');

            __dynamic_object.innerHTML = '<audio id="' + parrot_id + '_audio_component_sys" autoplay></audio>\
                                          <audio id="' + parrot_id + '_audio_component_actions" autoplay></audio>\
                                          <audio id="' + parrot_id + '_audio_component_misc" autoplay></audio>';

            __container.appendChild(__dynamic_object);

            audio = new audio_component_model();

            audio.init();

            is_component_active = true;

            return true;
        };

        this.draw = function()
        {
            if (is_component_active === false)
                return false;

            audio.clear();

            var __parrot_div = utils_sys.objects.by_id(parrot_id);

            __parrot_div.innerHTML += '<div id="' + parrot_id + '_speaker" class="speaker"></div>' + 
                                      '<div id="' + parrot_id + '_volume" class="volume">100%</div>';
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

    this.play = function(context, sound_file, list = false, replay = false)
    {
        if (is_init === false)
            return false;

        return audio.play(context, sound_file, list, replay);
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
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        is_init = true;

        self.settings.id('parrot_' + random.generate());

        parrot_id = self.settings.id();

        if (utils_sys.validation.misc.is_undefined(container_id))
            return utils_int.start_component();
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
        is_component_active = false,
        parrot_id = null,
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
