var my_aether = new aether();
var aether_config = {
                        "settings"  :   {
                                            "chain_mode"                :   "callback",             // CHOICES: ['serial' (Process based on 'priority' / Disable 'delay'), 'parallel', 'delay', 'callback' (Proceed to next task on 'success' callback / Respect both 'priority' and 'delay')]
                                            "init_delay"                :   1000,                   // OPTIONAL (Delay initialization of scheduler by so many milliseconds)
                                            "interval"                  :   2000,                   // OPTIONAL (Repeat scheduled tasks every so many milliseconds)
                                            "optional_task_callbacks"   :   true,                   // OPTIONAL (Allow optional task callbacks: 'fail' and 'timeout' - DEFAULT: true)
                                            "scheduler_callback"        :   function()              // OPTIONAL (Function to execute after all tasks have been scheduled)
                                                                            {
                                                                                console.log('------------------------------');
                                                                                console.log('All tasks have been scheduled!');
                                                                                console.log('------------------------------');
                                                                                console.log('');
                                                                                console.log('');
                                                                            }
                                        },
                        "tasks"     :   [
                                            {
                                                "type"                  :   "data",                                                         // CHOICES: ['data', 'request']
                                                "element_id"            :   "test_results",                                                 // OPTIONAL (Use only with 'data' type / Any valid HTML element ID)
                                                "content_fill_mode"     :   "replace",                                                      // OPTIONAL (Use only with 'data' type / Modes: 'replace' or 'append')
                                                "url"                   :   "/",
                                                "data"                  :   "x2y",
                                                "response_timeout"      :   100,                                                            // RESPONSE TIMEOUT: Waiting time of response until timeout in milliseconds
                                                "callbacks"             :   {
                                                                                "success"   :   function()
                                                                                                {
                                                                                                    console.log('SUCCESS: 2nd task');
                                                                                                },
                                                                                "fail"      :   function()                                  // OPTIONAL (By design unless enforced by 'optional_task_callbacks')
                                                                                                {
                                                                                                    console.log('FAIL: 2nd task');
                                                                                                },
                                                                                "timeout"   :   function()                                  // OPTIONAL (By design unless enforced by 'optional_task_callbacks')
                                                                                                {
                                                                                                    console.log('TIMEOUT: 2nd task');
                                                                                                }
                                                                            },
                                                "priority"              :   2,                                                              // OPTIONAL (Relative priority to other tasks / If not set, priority is the lowest)
                                                "qos"                   :   {
                                                                                "latency"       :   { "min" : 10, "max" : 1350 },           // OPTIONAL (Guarantee latency in ms / To ignore set min or max to -1)
                                                                                "bandwidth"     :   { "min" : 2,  "max" : 10 }              // OPTIONAL (Guarantee bandwidth in Kbps / To ignore set min or max to -1)
                                                                            },
                                                /*"repeat"                :   { "times" : 2, "mode" : "parallel" },*/                       // OPTIONAL (Repeat task so many times - DEFAULT: 0 / FOREVER: -1 (Iterated every 'response_timeout') | Modes: 'serial' or 'parallel')
                                                "delay"                 :   1500                                                            // OPTIONAL (Delayed start in milliseconds)
                                            },
                                            {
                                                "priority"              :   1,
                                                "type"                  :   "request",
                                                "ajax_mode"             :   "asynchronous",                                                 // OPTIONAL (Use only with 'request' type / Modes: 'asynchronous' or 'synchronous')
                                                "url"                   :   "/",
                                                "data"                  :   "1",
                                                "response_timeout"      :   400,
                                                "callbacks"             :   {
                                                                                "success"       :   function()
                                                                                                {
                                                                                                    console.log('SUCCESS: 1st task');
                                                                                                },
                                                                                "fail"          :   function()
                                                                                                {
                                                                                                    console.log('FAIL: 1st task');
                                                                                                },
                                                                                "timeout"       :   function()
                                                                                                {
                                                                                                    console.log('TIMEOUT: 1st task');
                                                                                                }
                                                                            },
                                                "qos"                   :   {
                                                                                "latency"       :   { "min" : 10, "max" : 7000 },
                                                                                "bandwidth"     :   { "min" : 1,  "max" : -1 }
                                                                            },
                                                //"repeat"                :   { "times" : 1, "mode" : "serial" },
                                                "delay"                 :   100
                                            },
                                            {
                                                "type"                  :   "request",
                                                "ajax_mode"             :   "asynchronous",
                                                "url"                   :   "/",
                                                "data"                  :   "d=30",
                                                "response_timeout"      :   400,
                                                "callbacks"             :   {
                                                                                "success"       :   function()
                                                                                                {
                                                                                                    console.log('SUCCESS: n-th task');
                                                                                                },
                                                                                "fail"          :   function()
                                                                                                {
                                                                                                    console.log('FAIL: n-th task');
                                                                                                },
                                                                                "timeout"       :   function()
                                                                                                {
                                                                                                    console.log('TIMEOUT: n-th task');
                                                                                                }
                                                                            },
                                                "qos"                   :   {
                                                                                "latency"       :   { "min" : 10, "max" : 7000 },
                                                                                //"bandwidth"     :   { "min" : 1,  "max" : -1 }
                                                                            },
                                            },
                                            {
                                                "type"                  :   "request",
                                                "ajax_mode"             :   "asynchronous",
                                                "url"                   :   "/",
                                                "data"                  :   "d=00",
                                                "response_timeout"      :   400,
                                                "callbacks"             :   {
                                                                                "success"       :   function()
                                                                                                {
                                                                                                    console.log('SUCCESS: 3rd task');
                                                                                                },
                                                                                "fail"          :   function()
                                                                                                {
                                                                                                    console.log('FAIL: 3rd task');
                                                                                                },
                                                                                "timeout"       :   function()
                                                                                                {
                                                                                                    console.log('TIMEOUT: 3rd task');
                                                                                                }
                                                                            },
                                                 "priority"              :  3,
                                            }
                                        ]
                     };

my_aether.schedule(aether_config); // Schedule and run AJAX tasks
