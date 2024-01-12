var my_bull = new bull();
var ajax_data = 'some_id=some_data&another_id=other_data';
var response = null;
var ajax_config = {
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

response = my_bull.run(ajax_config);

console.log(response);
