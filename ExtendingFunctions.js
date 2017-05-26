/*
* Gets the value from a variable Name from an Object
*
* Example:
* var _object = {};
* _object["myStuff"] = "XYZ";
* Usage: object.fetch("mystuff")
* Return: "XYZ"
* 
* You dont have to care about case-sensitivity
* Just get the data with bare bone!
*/
if (!Object.prototype.fetch) {
    Object.defineProperty(Object.prototype, "fetch", {
        enumerable: false
    , configurable: true
    , writable: false
    , value: function (variableName) {

        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                if (key.toString().toLowerCase() === variableName.toString().toLowerCase()) {
                    return this[key];
                }
            }
        }
        return undefined;
    }
    });
}

/*
* Creates a Hash-Code from an Input-String
* 
* Usage: var hash = "123456789".toHashCode();
*/
if (!Object.prototype.toHashCode) {
    Object.defineProperty(Object.prototype, "toHashCode", {
        enumerable: false
    , configurable: true
    , writable: false
    , value: function (_args) {
        var string = this.toString();
        var hash = 0;
        if (string.length == 0) return hash;
        for (i = 0; i < string.length; i++) {
            char = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
    });
}

/*
* Tries to Parse the Input-String into a boolean
* 
* Usage: var _bool = "true".tryParseBoolean();
* Return: true
*/
if (!Object.prototype.tryParseBoolean) {
    Object.defineProperty(Object.prototype, "tryParseBoolean", {
        enumerable: false
    , configurable: true
    , writable: false
    , value: function (_args) {
        var string = this.toString();
        try {
            return /true/i.test(string);
        }
        catch (Exception) {
            console.log(Exception);
            return 0;
        }
    }
    });
}

/*
* Equivalent to LINQ Where-Function
* 
* var _object = {};
* _object["test"] = {};
* _object["test"]["_val"] = "123";
* Usage: var _bool = _object.Where("_val", "123");
* Return: _object["test"]
*
*/
if (!Object.prototype.Where) {
    Object.defineProperty(Object.prototype, "Where", {
        enumerable: false
    , configurable: true
    , writable: false
    , value: function (key, value, firstLevel) {
        firstLevel = typeof firstLevel !== 'undefined' ? firstLevel : true;
        if ((this.constructor.name === "Object" && firstLevel) && this.constructor.name !== "Array") {
            var elemKeys = Object.keys(this);
            var returnValue = [];
            for (var _key in elemKeys) {
                var _tempValue = this[elemKeys[_key]].Where(key, value, false);
                if (_tempValue != undefined) {
                    returnValue = _tempValue;
                    break;
                }
            }
            if (returnValue.length != 0) {
                return returnValue;
            }
            else {
                return undefined;
            }
        }
        for (var element in this) {
            if (this.hasOwnProperty(element)) {
                if (typeof this[element] === 'string') {
                    if (element.toLowerCase() == key.toLowerCase()) {
                        if (this[element] == value) {
                            return this;
                        }
                    }
                }
                else {
                    for (var childElement in this[element]) {
                        if (this[element].hasOwnProperty(childElement)) {
                            if (childElement.toLowerCase() == key.toLowerCase()) {
                                if (this[element][childElement] == value) {
                                    return this[element];
                                }
                            }
                        }
                    }
                }
            }
        }
        return undefined;
    }
    });
}

/*
* Checks if a string starts with a given sequence
* 
* var _string = "123";
* Usage: var _bool = _string.StartsWith("1");
* Return: true
*
*/
if (!Object.prototype.StartsWith) {
    Object.defineProperty(Object.prototype, "StartsWith", {
        enumerable: false
    , configurable: true
    , writable: false
    , value: function (value) {
        if (this.toLowerCase().substring(0, value.length) == value.toLowerCase()) {
            return true;
        }
        return false;
    }
    });
}

/*
* Creates a string with randomly choosen characters with the given length
* 
* var _length = 5;
* Usage: var _string = String.createRandom(_length);
* Return: aE52D
*
*/
if (!String.prototype.createRandom) {
    Object.defineProperty(String.prototype, "createRandom", {
        enumerable: false
    , configurable: true
    , writable: false
        , value: function (length) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < length; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }
    });
}

/*
* Returns the size of an Object
* var _object = {};
* _object["test"] = 123;
* Usage: var _int = _object.getSize();
* Return: 1
*/
if (!Object.prototype.getSize) {
    Object.defineProperty(Object.prototype, "getSize", {
        enumerable: false
    , configurable: true
    , writable: false
    , value: function () {
        var size = 0, key;
        for (key in this) {
            if (this.hasOwnProperty(key)) size++;
        }
        return size;
    }
    });
}

/*
* Replace Value inside Object
*/
if (!Object.prototype.replaceValueForKey) {
    Object.defineProperty(Object.prototype, "replaceValueForKey", {
        enumerable: false
    , configurable: true
    , writable: false
    , value: function (searchedValue, replacingValue) {
        for (var variable in this) {
            //only the first-level variables
            if (this.hasOwnProperty(variable)) {
                if (this[variable] == searchedValue) {
                    this[variable] = replacingValue;
                }
            }
        }
    }
    });
}

/*
* This function is used to get the highest z-Index for a specific Selector
*/
(function ($) {
    $.fn.zIndex = function (zIndex) {
        if (zIndex !== undefined) {
            return this.css("zIndex", zIndex);
        }

        if (this.length) {
            var elem = $(this[0]), position, value;
            while (elem.length && elem[0] !== document) {
                // Ignore z-index if position is set to a value where z-index is ignored by the browser
                // This makes behavior of this function consistent across browsers
                // WebKit always returns auto if the element is positioned
                position = elem.css("position");
                if (position === "absolute" || position === "relative" || position === "fixed") {
                    // IE returns 0 when zIndex is not specified
                    // other browsers return a string
                    // we ignore the case of nested elements with an explicit value of 0
                    // <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
                    value = Number(elem.css("zIndex"), 10);
                    if (!isNaN(value) && value !== 0) {
                        return value;
                    }
                }
                elem = elem.parent();
            }
        }

        return 0;
    }
}(jQuery));

$.fn.findByContentText = function (text) {
    return $(this).contents().filter(function () {
        return $(this).text().trim().indexOf(text.trim()) != -1;
    });
};

$.fn.findByContentValue = function (text) {
    return $(this).contents().find("input").filter(function (index, element) {
        var elemVal = $(element).val().toString().trim();
        var textPos = elemVal.indexOf(text.toString().trim());
        return textPos != -1;
    });
};

$.fn.findByClassName = function (className, tagName) {
    return $(this).contents().find("*").filter(function (index, element) {
        var _element = $(element);
        if (_element.attr("class") == null || ((_element.prop("tagName").toLowerCase() != tagName.toLowerCase()) && tagName != undefined)) {
            return false;
        }
        var elemClassList = _element.attr("class").toString().trim();
        var textPos = elemClassList.indexOf(className.toString().trim());
        return textPos != -1;
    });
};

$.fn.findByContainingID = function (idText, tagName) {
    return $(this).contents().find("*").filter(function (index, element) {
        var _element = $(element);
        var elementID = _element.attr("id");
        if ((elementID == undefined || _element.prop("tagName").toLowerCase() != tagName.toLowerCase()) && tagName != undefined) {
            return false;
        }
        var elemVal = elementID.toString().trim();
        var textPos = elemVal.indexOf(idText.toString().trim());
        return textPos != -1;
    });
};