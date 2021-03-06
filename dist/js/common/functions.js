/**
 * 公用函数文件
 */
define(function() {

    window.D = {
        /*测试*/
        test: function() {
            return "公用函数调用";
        },
        /*显示模版*/
        display: function(id) {
            $(".hnHide").hide();
            $("#" + id).show();
        },
        /*ajax请求数据*/
        ajax: function(api, data, callback) {
            if (!C.DATA_METHOD) {
                method = "GET";
            } else {
                method = C.DATA_METHOD;
            }
            $.ajax({
                type: method,
                url: api,
                data: data,
                dataType: C.DATA_TYPE,
                //跨域请求
                xhrFields: {
                    withCredentials: true
                },
                success: callback,
                error: function() {
                    console.log("服务端无响应");
                }
            });
        },
        /*当前时间*/
        time: function() {
            return new Date().getTime();
        },
        /*拼接json*/
        json_encode: function(json) {
            return this.push_json(json);
        },
        /*拼接json，转成字符串*/
        json_encode_str: function(json) {
            var jsons = this.push_json({
                "md_key": C.DATA_KEY
            }, json);
            var str = "";
            for (var key in jsons) {
                str += "&" + key + "=" + jsons[key];
            }
            return str;
        },
        /*合并json*/
        push_json: function(des, src, override) {
            if (src instanceof Array) {
                for (var i = 0, len = src.length; i < len; i++)
                    this.push_json(des, src[i], override);
            }
            for (var i in src) {
                if (override || !(i in des)) {
                    des[i] = src[i];
                }
            }
            return des;
        },
        /*设置cookie*/
        addcookie: function(name, value) {
            var Days = 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        },
        /*获取cookie*/
        getcookie: function(name) {
            var strcookie = document.cookie;
            var arrcookie = strcookie.split("; ");
            for (var i = 0; i < arrcookie.length; i++) {
                var arr = arrcookie[i].split("=");
                if (arr[0] == name) return arr[1];
            }
            return "";
        },
        /*删除cookie*/
        delCookie: function(name) {
            var date = new Date();
            date.setTime(date.getTime() - 10000);
            document.cookie = name + "=v;expires=" + date.toGMTString();
        },
        /*get*/
        get: function(arg) {
            var url = window.document.location.href.toString();
            var u = url.split("?");
            if (typeof(u[1]) == "string") {
                u = u[1].split("&");
                var args = {};
                for (var i in u) {
                    var j = u[i].split("=");
                    args[j[0]] = j[1];
                }
                return args[arg];
            } else {
                return {};
            }
        },
        getUrl: function(url, arg) {
            var u = url.split("?");
            if (typeof(u[1]) == "string") {
                u = u[1].split("&");
                var args = {};
                for (var i in u) {
                    var j = u[i].split("=");
                    args[j[0]] = j[1];
                }
                return args[arg];
            } else {
                return {};
            }
        },
        /*跳转*/
        goto: function(url) {
            window.location.href = url;
        },
        /*url*/
        url: function(str) {
            return C.ROOT_PATH + str;
        },
        /*用户信息*/
        getUserInfo: function() {},
        utf16to8: function(str) {
            var out, i, len, c;
            out = "";
            len = str.length;
            for (i = 0; i < len; i++) {
                c = str.charCodeAt(i);
                if ((c >= 0x0001) && (c <= 0x007F)) {
                    out += str.charAt(i);
                } else if (c > 0x07FF) {
                    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                    out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                } else {
                    out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                }
            }
            return out;
        },
        utf8to16: function(str) {
            var out, i, len, c;
            var char2, char3;
            out = "";
            len = str.length;
            i = 0;
            while (i < len) {
                c = str.charCodeAt(i++);
                switch (c >> 4) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        // 0xxxxxxx
                        out += str.charAt(i - 1);
                        break;
                    case 12:
                    case 13:
                        // 110x xxxx   10xx xxxx
                        char2 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                        break;
                    case 14:
                        // 1110 xxxx  10xx xxxx  10xx xxxx
                        char2 = str.charCodeAt(i++);
                        char3 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                        break;
                }
            }
            return out;
        },
        /*base编码*/
        base64_encode: function(str) {
            var out, i, len, base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var c1, c2, c3;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i == len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                    out += "==";
                    break;
                }
                c2 = str.charCodeAt(i++);
                if (i == len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                    out += "=";
                    break;
                }
                c3 = str.charCodeAt(i++);
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                out += base64EncodeChars.charAt(c3 & 0x3F);
            }
            return out;
        },
        /*base解析*/
        base64_decode: function(str) {
            var c1, c2, c3, c4, base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
            var i, len, out;
            len = str.length;
            i = 0;
            out = "";
            while (i < len) {
                /* c1 */
                do {
                    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c1 == -1);
                if (c1 == -1) break;

                /* c2 */
                do {
                    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
                } while (i < len && c2 == -1);
                if (c2 == -1) break;
                out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
                /* c3 */
                do {
                    c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 == 61) return out;
                    c3 = base64DecodeChars[c3];
                } while (i < len && c3 == -1);
                if (c3 == -1) break;
                out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
                /* c4 */
                do {
                    c4 = str.charCodeAt(i++) & 0xff;
                    if (c4 == 61) return out;
                    c4 = base64DecodeChars[c4];
                } while (i < len && c4 == -1);
                if (c4 == -1) break;
                out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
            }
            return out;
        },
        /* 去处字符串空格*/
        trim: function(str) {
            str = str.replace(/\s+/g, "");
            return str;
        },

        /* 字符转整数*/
        str2Num: function(str) {
            var num = str - 0;
            return num;
        },

        /* 字符转FLOAT */
        str2Float: function(str) {
            var num = str.parseFloat();
            return num;
        },

        /* 数字格式化，将数字10000格式化成10,000的形式*/
        number2str: function(number) {
            var temp_str = "";
            var point_str = "";
            var number_str = number.toString();
            var pointFlag = false;
            if (number_str.indexOf('.') != -1) {
                pointFlag = true;
                point_str = number_str.split('.')[1];
                number_str = number_str.split('.')[0];
            }
            var len = number_str.length;
            if (len > 3) {
                var model = len % 3;
                if (model != 0) {
                    temp_str = number_str.substring(0, model);
                }
                for (var i = 0; i < Math.floor(len / 3); i++) {
                    if (temp_str == "") {
                        temp_str += number_str.substring(model + i * 3, model + 3 + i * 3);
                    } else {
                        temp_str += "," + number_str.substring(model + i * 3, model + 3 + i * 3);
                    }
                }
                if (!pointFlag)
                    return temp_str;
                else
                    return temp_str + "." + point_str;
            } else
                return number.toString();

        },
        /**
         * 解码路径
         * @param name
         * @returns
         */
        getParam: function(name) {
            var search = document.location.search;
            var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
            var matcher = pattern.exec(search);
            var items = null;
            if (null != matcher) {
                try {
                    items = decodeURIComponent(decodeURIComponent(matcher[1]));
                } catch (e) {
                    try {
                        items = decodeURIComponent(matcher[1]);
                    } catch (e) {
                        items = matcher[1];
                    }
                }
            }
            return items;
        },
        //减法函数
        Subtr: function(arg1, arg2) {
            var r1, r2, m, n;
            try {
                r1 = arg1.toString().split(".")[1].length;
            } catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            } catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            //last modify by deeka
            //动态控制精度长度
            n = (r1 >= r2) ? r1 : r2;
            return ((arg1 * m - arg2 * m) / m);
        },

        //乘法函数
        accMul: function(arg1, arg2) {
            var m = 0,
                s1 = arg1.toString(),
                s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length;
            } catch (e) {}
            try {
                m += s2.split(".")[1].length;
            } catch (e) {}
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        },

        //除法函数
        accDiv: function(arg1, arg2) {
            var t1 = 0,
                t2 = 0,
                r1, r2;
            try {
                t1 = arg1.toString().split(".")[1].length;
            } catch (e) {}
            try {
                t2 = arg2.toString().split(".")[1].length;
            } catch (e) {}
            with(Math) {
                r1 = Number(arg1.toString().replace(".", ""));
                r2 = Number(arg2.toString().replace(".", ""));
                return (r1 / r2) * pow(10, t2 - t1);
            }
        },

        /* 将数字10,000格式化成10000的形式*/
        str2number: function(number_str) {
            var temp_str = number_str.replaceAll(',', '');
            return new Number(temp_str);
        },

        /* 将数字10000.11111格式化成10,000.1111的形式*/
        /* num：待格式化数字    decimalNum：四舍五入保留小数的位数   bolCommas：整数部分是否要三位用“,”分割*/
        number2string: function(num, decimalNum, bolCommas) {
            if (isNaN(parseInt(num)))
                return "NaN";

            var tmpNum = num;
            var iSign = num < 0 ? -1 : 1; // 得到数字符号
            // 调整小数点位数到给定的数字位置
            tmpNum *= Math.pow(10, decimalNum);
            tmpNum = Math.round(Math.abs(tmpNum))
            tmpNum /= Math.pow(10, decimalNum);
            tmpNum *= iSign; // 重新调整符号
            var tmpNumStr = new String(tmpNum);

            // 处理是否有逗号
            if (bolCommas && (num >= 1000 || num <= -1000)) {
                var iStart = tmpNumStr.indexOf(".");
                if (iStart < 0)
                    iStart = tmpNumStr.length;

                iStart -= 3;
                while (iStart >= 1) {
                    tmpNumStr = tmpNumStr.substring(0, iStart) + "," + tmpNumStr.substring(iStart, tmpNumStr.length)
                    iStart -= 3;
                }
            }

            return tmpNumStr; // 返回格式化后字符串
        },


        /**
         * 判断开始日期是否大于结束日期 日期格式 yyyy-mm-dd
         */
        checkDate: function(beginDate, endDate) {

            var isSuccess = false;
            var beginYear = str2Num(beginDate.substring(0, 4));
            var beginMonth = str2Num(beginDate.substring(5, 7));
            var beginDay = str2Num(beginDate.substring(8, 10));
            var endYear = str2Num(endDate.substring(0, 4));
            var endMonth = str2Num(endDate.substring(5, 7));
            var endDay = str2Num(endDate.substring(8, 10));
            if (beginYear < endYear)
                isSuccess = true;
            else if (beginYear == endYear) {
                if (beginMonth < endMonth)
                    isSuccess = true;
                else if (beginMonth == endMonth) {
                    if (beginDay <= endDay)
                        isSuccess = true;
                }
            }
            return isSuccess;

        },

        /**
         * 判断结束日期是否超过开始日期的多少天 由参数传入 日期格式 yyyy-mm-dd
         * 返回true 结束日期超过开始日期day天，false:没有超过
         */
        checkDateIsPassDay: function(beginDate, endDate, day) {
            var checkFlag = false;
            var tmpBeginDate = new Date(beginDate.replace(/\-/i, "V"));
            var tmpEndDate = new Date(endDate.replace(/\-/i, "V"));
            var resultDate = (tmpEndDate - tmpBeginDate) / 1000 / 60 / 60 / 24;
            //判断时间间隔是够大于多少天
            if (resultDate > day) {
                checkFlag = true;
            }
            return checkFlag;
        },
        /**
         * 格式化换行
         * @param oldStr 字符串
         * @param len 长度
         * @returns {String}
         */
        formatNewLine: function(oldStr, len) {
            var temp = "";
            if (oldStr != null && oldStr.length > len) {

                var t = oldStr.length / len;
                var j = 0;
                for (var i = 0; i < t; i++) {
                    j++;
                    temp += oldStr.substring(i * len, len * j) + "<br>";
                }
                temp = temp + oldStr.substring(t * len, oldStr.length);
            } else {

                temp = oldStr;

            }
            return temp;

        },
        /**
         * JS的ReplaceAll方法
         */
        replaceAll: function(s1, s2) {
            return this.replace(new RegExp(s1, "gm"), s2);
        },

        /**
         * 清空dom
         */
        clearDom: function(parentDom) {
            var childDomArray = [];
            childDomArray = parentDom.childNodes;
            var childDomArrayLength = (childDomArray.length)
            for (var i = 0; i < childDomArrayLength; i++) {
                parentDom.removeChild(childDomArray[0]);
            }
        },

        /* 处理浏览器特殊字符*/
        swapParameter: function(swapData) {
            if (swapData == null)
                return null;

            while (swapData.indexOf("%") != -1)
                swapData = swapData.replace("%", "%25");

            while (swapData.indexOf("#") != -1)
                swapData = swapData.replace("#", "%23");

            while (swapData.indexOf("+") != -1)
                swapData = swapData.replace("+", "%2B");

            while (swapData.indexOf("&") != -1)
                swapData = swapData.replace("&", "%26");

            return swapData;
        },

        /* 处理浏览器特殊字符*/
        unSwapParameter: function(swapData) {
            if (swapData == null)
                return null;

            while (swapData.indexOf("%25") != -1)
                swapData = swapData.replace("%25", "%");

            while (swapData.indexOf("%23") != -1)
                swapData = swapData.replace("%23", "#");

            while (swapData.indexOf("%2B") != -1)
                swapData = swapData.replace("%2B", "+");

            while (swapData.indexOf("%26") != -1)
                swapData = swapData.replace("%26", "&");

            return swapData;
        },
        /**
         *获取当前时间的秒数
         * @returns
         */
        getCurrentTimeSeconds: function() {
            // 获取当前时间表示的秒数
            var d = new Date();
            var hour = d.getHours();
            var minute = d.getMinutes();
            second: d.getSeconds();
            return hour * 60 * 60 + minute * 60 + second;
        },

        /*
         * 日期格式化
         */
        getCurrentTimeSeconds: function(formatter) {
            if (!formatter || formatter == "") {
                formatter = "yyyy-MM-dd";
            }
            var year = this.getFullYear().toString();
            var month = (this.getMonth() + 1).toString();
            var day = this.getDate().toString();
            var yearMarker = formatter.replace(/[^y|Y]/g, '');
            if (yearMarker.length == 2) {
                year = year.substring(2, 4);
            }
            var monthMarker = formatter.replace(/[^m|M]/g, '');
            if (monthMarker.length > 1) {
                if (month.length == 1) {
                    month = "0" + month;
                }
            }
            var dayMarker = formatter.replace(/[^d]/g, '');
            if (dayMarker.length > 1) {
                if (day.length == 1) {
                    day = "0" + day;
                }
            }
            return formatter.replace(yearMarker, year).replace(monthMarker, month).replace(dayMarker, day);
        },

        /** **********************表单数据验证******************** */
        // 校验手机号
        checkPhone: function(value) {
            if (/^13\d{9}$/g.test(value) || (/^15[0-35-9]\d{8}$/g.test(value)) || (/^18[05-9]\d{8}$/g.test(value))) {
                return true;
            } else {
                return false;
            }
        },

        // 校验邮箱
        checkMail: function(value) {
            var email = /^[a-zA-Z0-9_\.\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{1,}$/;
            var emailYM = /^[*]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{1,}$/;
            if (email.exec(value) == null && emailYM.exec(value) == null) {
                return false;
            } else {
                return true;
            }
        },

        // 校验普通电话、传真号码：可含有特殊字符
        checkTel: function(value) {
            //120803-验证电话号码和传真号必须以数字开头
            if (/^[0-9]/.test(value) == false) {
                return false;
            }
            var pattern = /^([\d-+#]*)$/;
            if (pattern.exec(value) == "" || pattern.exec(value) == null) {
                return false;
            } else {
                return true;
            }
        },

        // 字段字数的判断
        checkLength: function(inputText, length) {
            var totalLength = 0;
            var buffer;

            for (var i = 0; i < inputText.length; i++) {
                buffer = inputText.substr(i, 1, 1);
                if (/[^\x00-\xff]/g.test(buffer)) {
                    totalLength += 2; // 中文字符
                } else {
                    totalLength += 1; // 其他 1
                }
            }
            if (totalLength > length) {
                return false;
            } else {
                return true;
            }
        },

        /**
         * 校验字符串是否为整型 返回值： 如果为空，定义校验不通过则返回false 如果字串全部为数字，校验通过，返回true 如果校验不通过则
         * 返回false 参考提示信息：输入域必须为数字
         */
        checkIsNumber: function(str) {
            // 如果为空，则不通过校验
            if (str == "") return false;
            if (/^(-|\+)?\d+$/.test(str)) return true;
            else return false;
        },

        /**
         * 校验字符串是否为整型 返回值： 如果为空，定义校验不通过 返回false 如果字串全部为数字切不为0，校验通过，返回true 如果校验不通过
         * 返回false 参考提示信息：输入域必须为数字和非零！
         */
        checkIsNumberAndNoZore: function(str) {
            // 如果为空，则通过校验
            if (str == "") return false;
            if (/^(-|\+)?\d+$/.test(str) && /^(0|[1-9][0-9]*)$/.test(str)) return true;
            else return false;
        },

        /**
         * 校验日期格式 日期格式：MMDDYY
         */
        checkIsDateString: function(sDate) {
            var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            var iaDate = new Array(3)
            var year, month, day

            month = sDate.substring(0, 2)
            day = sDate.substring(2, 4)
            year = sDate.substring(4, 6)

            if (!checkIsNumber(month) || !checkIsNumber(day) || !checkIsNumber(year)) return false

            year = parseInt(year) + 2000;

            if (year < 1900 || year > 2100) return false
            if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
            if (month < 1 || month > 12) return false
            if (day < 1 || day > iaMonthDays[month - 1]) return false
            return true
        },
        /**
         * 校验日期格式 日期格式：YYYY-MM-DD
         * @param sDate
         * @returns {Boolean}
         */
        checkIsDateStr: function(sDate) {
            var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            var iaDate = new Array(3)
            var year, month, day
            month = sDate.substring(5, 7)
            day = sDate.substring(8, 10)
            year = sDate.substring(0, 4)
            var sign1 = sDate.substring(4, 5)
            var sign2 = sDate.substring(7, 8)
            if (!checkIsNumber(month) || !checkIsNumber(day) || !checkIsNumber(year)) return false

            //year = parseInt(year)+2000;
            if (sDate.length != 10) return false
            if (sign1 != "-") return false
            if (sign2 != "-") return false
            if (year < 1000 || year > 9999) return false
            if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
            if (month < 1 || month > 12) return false
            if (day.length != 2) return false
            if (day < 1 || day > iaMonthDays[month - 1]) return false
            return true
        },

        /**
         * 校验是否全部为英文字母
         * @param str
         */
        checkIsChar: function(str) {
            if (str == "") return false;
            if (!/[^a-zA-Z]/.exec(str)) return true;
            else return false;
        },


        /**
         * 校验验证码格式
         * 4个字符区分大小写，可由英文字母，数字自由组合，区分大小写；
         */
        checkVercode: function(str) {
            var regExp = /[^a-zA-Z0-9]/g; //可由英文字母，数字自由组合，区分大小写
            if (str.length == 4) { //校验验证码规则：4个字符
                if (str.match(regExp) != null) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        },
        /**
         * 校验是否均为数字和英文字符
         * @param str
         */
        checkNumOrChar: function(str) {
            if (str == "") return false;
            if (!/[^a-zA-Z0-9]/.exec(str)) return true;
            else return false;
        },

        /**
         * 校验是否均为数字和英文字母和-
         */
        checkNumOrCharOrPartLine: function(str) {
            if (str == "") return false;
            if (!/[^a-zA-Z0-9\-]/.exec(str)) return true;
            else return false;
        },

        /**
         * 校验是否均为数字和英文字母和-
         */
        checkNumOrPartLine: function(str) {
            if (str == "") return false;
            if (!/[^0-9\-]/.exec(str)) return true;
            else return false;
        },

        /**
         * 校验字符串是否以“E-”开头
         * @param str
         * @returns {Boolean}
         */
        checkRetCode: function(str) {
            if (null != str && str.indexOf("E-") == 0) {
                return true;
            }
            return false;
        },

        //检验字符串是否符合日时分格式：00,00:00
        checkHourAndSeconds: function(str) {
            return /^(([0-1]?[0-9])||(2[0-3])):([0-5][0-9])$/.test(str);
        },

        //检验字符串是否符合日时分格式：00,00:00
        checkDayAndHourAndSeconds: function(str) {
            return /^([0-2]?[0-9]),(([0-1]?[0-9])||(2[0-3])):([0-5][0-9])$/.test(str);
        },

        /**
         * 检查是否大于最大值
         * @return
         */
        checkGtMaxValue: function(value, maxValue) {
            if (value <= maxValue) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * 计算日期天数差的函数 日期格式为
         * @param sDate1 格式为 yyyy-mm-dd
         * @param sDate2 格式为 yyyy-mm-dd
         * @return 相差多少天
         */
        dateDiff: function(sDate1, sDate2) {
            //alert(sDate1);
            //sDate1和sDate2的格式为xxxx-xx-xx
            var oDate1, oDate2, iDays;
            var aDate = new Array();
            // alert(sDate1);
            //转换为xx-xx-xxxx格式
            //alert(sDate2);
            var aa1 = sDate1.split("-");

            var aa2 = sDate2.split("-");

            var date1 = new Date();
            date1.setFullYear(aa1[0]);
            date1.setMonth(aa1[1] - 1);
            date1.setDate(aa1[2]);
            var date2 = new Date();
            date2.setFullYear(aa2[0]);
            date2.setMonth(aa2[1] - 1);
            date2.setDate(aa2[2]);
            //把相差的毫秒数转换为天数
            iDays = (date2.getTime() - date1.getTime()) / 1000 / 60 / 60 / 24;

            // alert(iDays);
            return iDays;
        },
        /**
         * 转换元成万元，并且保留两位小数
         * @param number 元
         * @return 万元
         */
        convertYen2Million: function(number) {
            var million = 0.00;
            if (number) {
                million = number / 10000;
                million = million.toFixed(2);
            }
            return million;
        }
    };
    return D;
});