const joi = require('joi')

const signupcustomer = joi.object({
  CUST_CODE: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(4).max(15),
  CUST_NAME: joi.string(),
  CUST_CITY: joi.string(),
  PHONE_NO: joi.number().min(1111111111).max(9999999999),
  PASSWORD: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(4).max(15),
  ORDER_DATE: joi.date().greater(Date.now()),
  AGENT_CODE: joi.string()
}).unknown(true);

const signincoustomer = joi.object({
  PHONE_NO: joi.number().min(1111111111).max(9999999999),
  PASSWORD: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(4).max(15),
});

const adduservalidation = async (req, res, next) => {
  const value = await signupcustomer.validate(req.body);
  if (value.error) {
    res.json({
      success: 0,
      message: value.error.details[0].message
    })
  } else {
    next();
  }
};

const addsigninvalidation = async (req, res, next) => {
  const value = await signincoustomer.validate(req.body);
  if (value.error) {
    res.json({
      success: 0,
      message: value.error.details[0].message
    })
  } else {
    next();
  }
};

module.exports = {
  adduservalidation,
  addsigninvalidation
}
