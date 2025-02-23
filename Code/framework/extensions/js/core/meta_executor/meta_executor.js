/*
    GreyOS - Meta-Executor (Version: 1.9)

    File name: meta_executor.js
    Description: This file contains the Meta-Executor - Meta-Script program execution module.

    Coded by George Delaportas (G0D)
    Copyright © 2021 - 2024
    Open Software License (OSL 3.0)
*/

// Meta-Executor
function meta_executor()
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
            this.INVALID_CODE = 0xC1;
            this.RUN_FAIL = 0xC2;
            this.RUN_BLOCK = 0xC3
            this.ERROR = 0xC4;
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
        if (is_program_loaded === true)
            return false;

        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.misc.is_nothing(new_program) || !utils_sys.validation.alpha.is_string(new_program))
            return false;

        var user_code = new_program.replace(/\/\*[\s\S]*?\*\/|(?<=[^:])\/\/.*|^\/\/.*/g,'').trim();

        if (utils_sys.validation.misc.is_nothing(user_code))
            return false;

        program = '"use strict";\r\n' + user_code;

        is_program_loaded = true;

        return true;
    };

    this.process = function(meta_caller)
    {
        if (is_program_loaded === false)
            return false;

        if (utils_sys.validation.misc.is_undefined(meta_caller) || !utils_sys.validation.misc.is_object(meta_caller))
            return false;

        if (!meta_caller.hasOwnProperty('telemetry') || !meta_caller.hasOwnProperty('source') || !meta_caller.hasOwnProperty('reset'))
            return false;

        if (program.indexOf('navigator') >= 0 || program.indexOf('window') >= 0 || 
            program.indexOf('document') >= 0 || program.indexOf('location') >= 0 || 
            program.indexOf('alert') >= 0 || program.indexOf('eval') >= 0 || 
            program.indexOf('this') >= 0)
        {
            error_details.code = self.error.codes.INVALID_CODE;
            error_details.message = 'Invalid keywords detected!\n\n' + 
                                    'The following are not allowed:\n' + 
                                    '{ "navigator", "window", "document", "location", "alert", "eval", "this" }\n';

            return error_details.code;
        }

        var __dynamic_program_model = null,
            __random_program_id = null,
            __this_program = null,
            __run_result = null;

        __random_program_id = 'meta_program_' + random.generate();

        __dynamic_program_model = new Function('return function ' + __random_program_id + '()\
        {\
            this.cosmos = (cosmos_object) => { return true; };\
            this.main = (meta_script) => { return eval(program); };\
        }')();

        try
        {
            __this_program = eval('new ' + __dynamic_program_model);

            if (!meta_script.start(__dynamic_program_model, meta_caller))
                return false;

            __run_result = __this_program.main(meta_script.ms_object);

            if (!__run_result)
            {
                if (__run_result === null)
                {
                    error_details.code = self.error.codes.RUN_BLOCK;
                    error_details.message = 'Program is blocked by another instance!';
                }
                else
                {
                    error_details.code = self.error.codes.RUN_FAIL;
                    error_details.message = 'Program is incomplete or misconfigured!';
                }

                return error_details.code;
            }
        }
        catch(e)
        {
            self.terminate();

            error_details.code = self.error.codes.ERROR;
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

        return meta_script.end();
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
