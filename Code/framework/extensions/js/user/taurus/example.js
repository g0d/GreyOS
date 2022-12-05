var my_taurus = new taurus();
var ajax_data = 'record=' + JSON.stringify({ id : 1000, full_name : "George Delaportas" });
var response = null;
var taurus_config = {
                        "type"          :   "request",
                        "url"           :   "/",
                        "data"          :   ajax_data,
                        "ajax_mode"     :   "asynchronous",
                        "on_success"    :   function(response)
                                            {
                                                // Do actions here...
                                                console.log(response);
                                            }
                    };

response = my_taurus.run(taurus_config);

console.log(response);
