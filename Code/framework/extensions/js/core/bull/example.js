var my_bull = new bull();
var ajax_data = 'some_id=some_data&another_id=other_data';

var bull_config = {
                        "type"          :   "request",
                        "url"           :   "/",
                        "data"          :   ajax_data,
                        "ajax_mode"     :   "asynchronous",
                        "on_success"    :   function(response)
                                            {
                                                // Do actions here...
                                            }
                  };

my_bull.run(bull_config);
