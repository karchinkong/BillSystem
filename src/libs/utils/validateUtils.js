
const validateUtils = {

    valideNumber(rule, value, callback) {

        var re = /^[0-9]+$/;

        if (!re.test(value)) {

            callback(new Error('只能输入数字哦'));

        } else {

            callback();

        }

    },

    validePhone(rule, value, callback) {

        var re = /^1[0-9]{10}$/;

        if (!re.test(value)) {

            callback(new Error('请输入正确格式的手机号'));

        } else {

            callback();

        }

    }

}

export default validateUtils;
