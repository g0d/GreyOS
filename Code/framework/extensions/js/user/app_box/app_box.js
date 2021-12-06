/*
    GreyOS - App Box (Version: 1.6)

    File name: app_box.js
    Description: This file contains the App Box - Integrated/User applications container module.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// App Box
function app_box()
{
    var self = this;

    function app_box_model()
    {
        this.num = 0;
        this.list = [];
    }

    function utilities()
    {
        this.model_exists = function(model)
        {
            if (!utils_sys.validation.misc.is_object(model))
                return false;

            for (var i = 0; i < apps.num; i++)
            {
                if (apps.list[i].constructor.name === model.constructor.name)
                    return true;
            }

            return false;
        };
    }

    this.num = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        return apps.num;
    };

    this.list = function(index)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.misc.is_undefined(index))
            return apps.list;

        if (!utils_sys.validation.numerics.is_integer(index) || index < 0 || index > (apps.num - 1))
            return false;

        return apps.list[index];
    };

    this.get = function(app_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (apps.num === 0)
            return null;

        if (utils_sys.validation.alpha.is_symbol(app_id))
            return false;

        for (var i = 0; i < apps.num; i++)
        {
            if (apps.list[i].constructor.name === app_id)
            {
                var __new_app = new apps.list[i].constructor();

                __new_app.cosmos(cosmos);

                if (backtrace === true)
                    frog('APP BOX', 'Models :: Get', app_id);

                return __new_app;
            }
        }

        return false;
    };

    this.add = function(models_array)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (!utils_sys.validation.misc.is_array(models_array))
            return false;

        var __models_num = models_array.length;

        if (__models_num === 0)
            return false;

        for (var i = 0; i < __models_num; i++)
        {
            if (!utils_sys.validation.misc.is_function(models_array[i]))
            {
                if (backtrace === true)
                    frog('APP BOX', 'Models :: Invalid', models_array[i]);

                self.clear();

                return false;
            }

            var __object_model = new models_array[i]();

            if (utils_int.model_exists(__object_model))
            {
                if (backtrace === true)
                    frog('APP BOX', 'Models :: Duplication', __object_model.constructor.name);

                self.clear();

                return false;
            }

            apps.list.push(__object_model);
            apps.num++;

            if (backtrace === true)
                frog('APP BOX', 'Models :: Addition', __object_model.constructor.name);
        }

        if (backtrace === true)
            frog('APP BOX', 'All models', apps.list, 'Model count: ' + apps.num);

        return true;
    };

    this.remove = function(app_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.alpha.is_symbol(app_id))
            return false;

        for (var i = 0; i < apps.num; i++)
        {
            if (apps.list[i].constructor.name === app_id)
            {
                apps.list.splice(i, 1);
                apps.num--;

                if (backtrace === true)
                {
                    frog('APP BOX', 'Models :: Removal', app_id);
                    frog('APP BOX', 'All models', apps.list, 'Model count: ' + apps.num);
                }

                return true;
            }
        }

        return false;
    };

    this.replace = function(models_array)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (!utils_sys.validation.misc.is_array(models_array))
            return false;

        var __models_num = models_array.length;

        if (__models_num === 0)
            return false;

        for (var i = 0; i < __models_num; i++)
        {
            if (!utils_sys.validation.misc.is_function(models_array[i]))
            {
                if (backtrace === true)
                    frog('APP BOX', 'Models :: Invalid', models_array[i]);

                self.clear();

                return false;
            }

            self.remove(models_array[i].name);
        }

        return self.add(models_array);
    };

    this.clear = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (apps.num === 0)
            return false;

        apps.num = 0;
        apps.list = [];

        if (backtrace === true)
            frog('APP BOX', 'Models :: Clear', apps.list);

        return true;
    };

    this.backtrace = function(val)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (!utils_sys.validation.misc.is_bool(val))
            return false;

        backtrace = val;

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        return true;
    };

    var backtrace = false, 
        cosmos = null,
        utils_sys = new vulcan(),
        apps = new app_box_model(),
        utils_int = new utilities();
}
