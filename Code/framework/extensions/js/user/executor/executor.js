/*
    GreyOS - Executor (Version: 1.2)

    File name: executor.js
    Description: This file contains the Executor - User-level program execution development module.

    Coded by George Delaportas (G0D)
    Copyright © 2021 - 2024
    Open Software License (OSL 3.0)
*/

// Executor
function executor()
{
    var self = this;

    function error_details_model()
    {
        this.code = 0;
        this.message = null;
    }

    function error()
    {
        function codes()
        {
            this.INVALID = 0xC1;
            this.MISMATCH = 0xC2;
            this.OTHER = 0xC3;
        }

        function last()
        {
            this.code = function()
            {
                return error_details.code;
            };

            this.message = function()
            {
                return error_details.message;
            };
        }

        this.codes = new codes();
        this.last = new last();
    }

    this.load = function(new_program)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.misc.is_nothing(new_program) || !utils_sys.validation.alpha.is_string(new_program))
            return false;

        if (is_program_loaded === true)
            return false;

        program = new_program.replace(/\/\*[\s\S]*?\*\/|(?<=[^:])\/\/.*|^\/\/.*/g,'').trim();

        is_program_loaded = true;

        return true;
    };

    this.process = function(meta_caller)
    {
        if (is_program_loaded === false)
            return false;

        if (program.indexOf('navigator') >= 0 || program.indexOf('window') >= 0 || 
            program.indexOf('document') >= 0 || program.indexOf('location') >= 0 || 
            program.indexOf('eval') >= 0 || program.indexOf('this') >= 0)
        {
            error_details.code = self.error.codes.INVALID;
            error_details.message = 'Invalid keywords detected!\n\n' + 
                                    'The following are not allowed:\n' + 
                                    '{ "navigator", "window", "document", "location", "eval", "this" }\n';

            return error_details.code;
        }

        var __dynamic_program_model = null,
            __random_program_id = null,
            __this_program = null;

        __random_program_id = 'user_program_' + random.generate();

        __dynamic_program_model = new Function('return function ' + __random_program_id + '()\
        {\
            this.cosmos = (cosmos_object) => { return true; };\
            this.main = (meta_script) => { return eval(program); };\
        }')();

        try
        {
            __this_program = eval('new ' + __dynamic_program_model);

            if (!meta_script.program.start(__dynamic_program_model, meta_caller))
                return false;

            if (!__this_program.main(meta_script))
            {
                error_details.code = self.error.codes.MISMATCH;
                error_details.message = 'Program is incomplete!';

                return error_details.code;
            }
        }
        catch(e)
        {
            self.terminate();

            error_details.code = self.error.codes.OTHER;
            error_details.message = e;

            return error_details.code;
        }

        return true;
    };

    this.terminate = function()
    {
        if (is_program_loaded === false)
            return false;

        program = null;

        is_program_loaded = false;

        return meta_script.program.end();
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        dev_box = cosmos.hub.access('dev_box');

        meta_script = dev_box.get('meta_script');

        return true;
    };

    var is_program_loaded = false,
        cosmos = null,
        dev_box = null,
        meta_script = null,
        program = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        error_details = new error_details_model();

    this.error = new error();
}
