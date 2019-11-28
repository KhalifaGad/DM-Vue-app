function showSucessMessage(context, message) {
    context.$message({
        showClose: true,
        duration: 2000,
        message,
        type: "success"
    });
}

function showErrorMessage(context, message, time = 2000) {
    context.$message({
        showClose: true,
        duration: time,
        message,
        type: "error"
    });
}

export {
    showSucessMessage,
    showErrorMessage
}