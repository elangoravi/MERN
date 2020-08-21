const Customer = require('../models/CustomerModel');

exports.Customer_List = (req, res, next) => {
    Customer
        .find({}, { name: 1, _id: 0 })
        .populate('Customer')
        .sort([['name', 'ascending']])
        .exec(function (err, list_customers) {
            if (err) { return next(err); }
            //Successful, so render
            res.json(list_customers);
        })
}

exports.Customer_get = (req, res, next) => {
    Customer
        .find({ name: req.params.name })
        .then(result => res.json(result))
        .catch(err => res.send("Not Found"))
}

exports.Customer_post = (req, res, next) => {
    var newCustomer = new Customer({
        name: req.body.name,
        phone: req.body.phNo,
        address: req.body.address,
        startDate: req.body.startDate,
        amount: req.body.amtDep,
        interest: req.body.amtInt,
        aadhaar: req.body.aadhaar
    });
    newCustomer.save()
        .then(result => res.json({ "success": "true" }))
        .catch(err => res.json(err))
}

exports.Customer_update = (req, res, next) => {
    Customer.findOne({ name: req.params.name }, function (err, customer) {
        if (!err) {
            if (!customer) {
                customer = new Customer();
                customer.name = req.params.name;
            }
            customer.phone = req.body.phNo,
                customer.address = req.body.address,
                customer.startDate = req.body.startDate,
                customer.amount = req.body.amtDep,
                customer.interest = req.body.amtInt,
                customer.aadhaar = req.body.aadhaar
            customer.save(function (err) {
                if (!err) {
                    res.json({ "success": "true" });
                }
                else {
                    res.json({ "success": "false" });
                }
            });
        }
    });
}

exports.Customer_delete = (req, res, next) => {
    Customer
        .findOneAndDelete({ name: req.params.name })
        .then(result => res.json({ "success": "true" }))
        .catch(err => res.json(err))
}