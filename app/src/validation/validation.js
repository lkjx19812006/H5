let validation = {};

validation.checkPhone = (phone) => {
    let pattern = /^1[34578]\d{9}$/;
    if (!phone) {
        return '请输入手机号码！';
    } else if (!pattern.test(phone)) {
        return '手机号码有误！';
    } else {
        return false;
    }

}


validation.checkCode = (code, confirmCode) => {
	console.log(code)
	console.log(confirmCode)
    if (!code) {
        return '请输入验证码！';
    } else if (code != confirmCode) {
        return '验证码有误！';
    } else {
        return false;
    }
}

validation.checkNull = (param, show) => {
    if (!param) {
        return show;
    } else {
        return false;
    }
}


module.exports = validation;
