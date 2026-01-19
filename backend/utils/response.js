const sendResponse = (res, statusCode, success, message, data = null) => {
    const response = {
        success,
        message
    };
    if (data !== null) {
        response.data = data;
    }
    return res.status(statusCode).json(response);
};

const successResponse = (res, message, data = null, statusCode = 200) => {
    return sendResponse(res, statusCode, true, message, data);
};

const errorResponse = (res, message, statusCode = 500) => {
    return sendResponse(res, statusCode, false, message);
};

export { successResponse, errorResponse };
