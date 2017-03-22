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
validation.checkMaxNum = (val, name) => {
    /*if (parseInt(val)) {
        if (val >= 1 && val <= 99999999) {
            return true
        } else {
            name + '不能大于8位'
        }
    } else {
        name + '必须为整数'
    }*/
    let pattern = /^[1-9]\d{0,7}$/;
    if (!val) {
        return '请输入' + name + '数量'
    } else if (!pattern.test(val)) {
        return name + '需为8位以内正整数'
    } else {
        return false;
    }
}
validation.checkLook = (look) => {
    //let pattern = /[\ud83c\udc00-\ud83c\udfff]|[\ud83d\udc00-\ud83d\udfff]|[\u2600-\u27ff]/
    let pattern = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g
    if (pattern.test(look)) {
        return '不可以输入表情'
    } else {
        return false
    }
}
validation.checkMinNumber = (password) => {
    let pattern = /^[a-zA-Z0-9]{6,16}$/
    if (!pattern.test(password)) {
        return '密码必须为6~16位数字或字母'
    } else {
        return false
    }
}


validation.checkPhoneTrue = (phone) => {
    let pattern = /^1[34578]\d{9}$/;
    if (!pattern.test(phone) || phone == '') {
        return '手机号码有误'
    } else {
        return false;
    }
}
validation.checkNameTrue = (name) => {
    let pattern = /^[A-Za-z\u4e00-\u9fa5]+$/;
    if (!pattern.test(name) || name == '') {
        return '姓名请输入汉字或字母！'
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
validation.checkCommon = (newName, oldName) => {
    if (newName !== oldName) {
        return '新密码不一致'
    } else {
        return false;
    }
}
validation.checkNumber = (value) => {
    if (parseInt(value)) {
        return true
    } else {
        return false
    }
}
validation.checkDifferent = (newName, oldName) => {
    if (newName == oldName) {
        return '与原密码不能相同'
    } else {
        return false;
    }
}
module.exports = validation;
