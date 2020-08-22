const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Employee = require("../../models/Employees");

//@route  GET api/employees
//@desc   GET all employees
//@access Public

router.get("/", auth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.employee.id);
    const isAdmin = employee && employee.isAdmin;
    if (!isAdmin) {
      return res
        .status(400)
        .json({ msg: "You have no authority to update this profile" });
    }
    const employees = await Employee.find().select("-password");
    res.json({ employees });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route  POST api/employees
//@desc   Register Employee
//@access private

router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is Required").not().isEmpty(),
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with minimum of 8 character with at least one upper, lower case and special character"
      ).matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
        "i"
      ),
      check("designation", "Designation is Required").not().isEmpty(),
      check("bio", "Bio is Required").not().isEmpty(),
      check("domain", "Domain is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const employee = await Employee.findById(req.employee.id);
    const isAdmin = employee && employee.isAdmin;
    if (!isAdmin) {
      return res
        .status(400)
        .json({ msg: "You have no authority to update this profile" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      body: { name, email, password, designation, bio, domain },
    } = req;
    try {
      //see if Employee exist
      let employee = await Employee.findOne({ email });
      if (employee) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Employee already exist" }] });
      }
      //Get Employee gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      employee = new Employee({
        name,
        email,
        avatar,
        designation,
        password,
        bio,
        domain,
      });
      //Encrypt password
      const salt = await bcrypt.genSalt(10);
      employee.password = await bcrypt.hash(password, salt);
      await employee.save();
      res.json({ success: true });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route  UPDATE api/employees
//@desc   Update Employee
//@access private

router.put(
  "/",
  [
    auth,
    [
      check("name", "Name is Required").not().isEmpty(),
      check("designation", "Designation is Required").not().isEmpty(),
      check("email", "email is Required").isEmail(),
      check("bio", "Bio is Required").not().isEmpty(),
      check("domain", "Domain is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const employee = await Employee.findById(req.employee.id);
    const isAdmin = employee && employee.isAdmin;
    if (!isAdmin) {
      return res
        .status(400)
        .json({ msg: "You have no authority to update this profile" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      body: {
        name,
        email,
        designation,
        bio,
        domain,
        giveAdminRight,
        revokeAdminRight,
      },
    } = req;
    try {
      //see if Employee exist
      let employee = await Employee.findOne({ email });
      if (!employee) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Employee Not exist" }] });
      }
      employee.name = name;
      employee.designation = designation;
      employee.bio = bio;
      employee.domain = domain;
      if (giveAdminRight) {
        employee.isAdmin = true;
      }
      if (revokeAdminRight) {
        employee.isAdmin = false;
      }
      updatedEmployee = await Employee.findOneAndUpdate(
        { email },
        { $set: employee },
        { new: true }
      );
      res.json({ success: true, data: updatedEmployee });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route  DELETE api/employee
//@desc   delete employee
//@access Private
router.delete("/", auth, async (req, res) => {
  try {
    const { employeeId } = req.body;
    const employee = await Employee.findById(req.employee.id);
    const isAdmin = employee && employee.isAdmin;
    if (!isAdmin) {
      return res.status(400).json({ msg: "Unauthorised Access" });
    }
    Employee.findOneAndRemove({ _id: employeeId }).then(() =>
      res.json({ success: true })
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});
module.exports = router;
