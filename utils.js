function payload(...objects) {
    const res = { };
    for(var object of objects) {
        Object.assign(res, object);
    }

    return res;
}

(function($) {
    $.fetch = function(url, method, payload) {
        return $.ajax({
            url: url,
            method: method,
            data: payload
        });
    }

    $.fn.bindValue = function(value) {
        var tagName = $(this).prop("tagName").toLowerCase();

        if(value !== undefined) {
            if(tagName === "input" || tagName === "select" || tagName === "textarea") {
                return $(this).val(value);
            }
            else {
                return $(this).html(value);
            }
        }
        else {
            if(tagName === "input") {
                return $(this).val();
            }
            else {
                return $(this).html();
            }
        }
    }

    $.bindings = function (state) {
        const stateValues = {};
        for(const prop in state) {
            const stateProp = state[prop];
            if(typeof stateProp === "object") {
                stateValues[prop] = stateProp.value;
            }
            else {
                stateValues[prop] = stateProp;
            }
            updateElements(prop, stateValues[prop]);
    
            Object.defineProperty(state, prop, {
                get: function () {
                    return stateValues[prop];
                },
                set: function (value) {
                    if(typeof stateProp === "object" && stateProp.change) {
                        stateProp.change();
                    }
                    updateElements(prop, value);
                    stateValues[prop] = value;
                }
            })
        }
    
        $("*[data-bind]").on("change paste keyup select", function() {
            var bindedElement = $(this).data("bind");
            // console.log($(this).bindValue());
            state[bindedElement] = $(this).bindValue();
        });
        
        function updateElements(key, value) {
            $("*[data-bind=" + key + "]").each(function() {
                // console.log($(this).prop("tagName"));
                $(this).bindValue(value);
            });
        }
    
        return state;
    }

})(jQuery);
