/*
    GreyOS - Svc Box (Version: 1.2)

    File name: svc_box.js
    Description: This file contains the Svc Box - Integrated services container module.

    Coded by George Delaportas (G0D)
    Copyright © 2024
    Open Software License (OSL 3.0)
*/

// Svc Box
function svc_box()
{
    var self = this;

    function svc_box_model()
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

            for (var i = 0; i < svcs.num; i++)
            {
                if (svcs.list[i].constructor.name === model.constructor.name)
                    return true;
            }

            return false;
        };
    }

    this.num = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        return svcs.num;
    };

    this.list = function(index)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.misc.is_undefined(index))
            return svcs.list;

        if (!utils_sys.validation.numerics.is_integer(index) || index < 0 || index > (svcs.num - 1))
            return false;

        return svcs.list[index];
    };

    this.get = function(svc_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (svcs.num === 0)
            return null;

        if (utils_sys.validation.alpha.is_symbol(svc_id))
            return false;

        for (var i = 0; i < svcs.num; i++)
        {
            if (svcs.list[i].constructor.name === svc_id)
            {
                var __new_svc = new svcs.list[i].constructor();

                __new_svc.cosmos(cosmos);

                if (backtrace === true)
                    frog('SVC BOX', 'Models :: Get', svc_id);

                return __new_svc;
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
            var __func = new Function('return new ' + models_array[i] + '()'),
                __object_model = new __func;

            if (!utils_sys.validation.misc.is_object(__object_model))
            {
                if (backtrace === true)
                    frog('SVC BOX', 'Models :: Invalid', models_array[i]);

                self.clear();

                return false;
            }

            if (utils_int.model_exists(__object_model))
            {
                if (backtrace === true)
                    frog('SVC BOX', 'Models :: Duplication', __object_model.constructor.name);

                self.clear();

                return false;
            }

            svcs.list.push(__object_model);
            svcs.num++;

            if (backtrace === true)
                frog('SVC BOX', 'Models :: Addition', __object_model.constructor.name);
        }

        if (backtrace === true)
            frog('SVC BOX', 'All models', svcs.list, 'Model count: ' + svcs.num);

        return true;
    };

    this.remove = function(svc_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.alpha.is_symbol(svc_id))
            return false;

        for (var i = 0; i < svcs.num; i++)
        {
            if (svcs.list[i].constructor.name === svc_id)
            {
                svcs.list.splice(i, 1);
                svcs.num--;

                if (backtrace === true)
                {
                    frog('SVC BOX', 'Models :: Removal', svc_id);
                    frog('SVC BOX', 'All models', svcs.list, 'Model count: ' + svcs.num);
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
            var __func = new Function('return new ' + models_array[i] + '()'),
                __object_model = new __func;

            if (!utils_sys.validation.misc.is_object(__object_model))
            {
                if (backtrace === true)
                    frog('SVC BOX', 'Models :: Invalid', models_array[i]);

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

        if (svcs.num === 0)
            return false;

        svcs.num = 0;
        svcs.list = [];

        if (backtrace === true)
            frog('SVC BOX', 'Models :: Clear', svcs.list);

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
        svcs = new svc_box_model(),
        utils_int = new utilities();
}
