var heartbeat_config = {
                            "interval"          :   60000,
                            "response_timeout"  :   5000,
                            "on_success"        :   function() {  },
                            "on_fail"           :   function() {  },
                            "on_timeout"        :   function() {  }
                       };

heartbeat_config.service_name = 'micro-MVC';

heartbeat(heartbeat_config);
