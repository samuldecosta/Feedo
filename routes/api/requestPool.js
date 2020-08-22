const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Employee = require("../../models/Employees");
const RequestPool = require("../../models/RequestPool");

//@route  GET api/feedbackrequests
//@desc   GET all/employee specific feedback requests
//@access Private

router.get("/", auth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.employee.id);
    const isAdmin = employee && employee.isAdmin;
    let openRequests;
    if (!isAdmin) {
      openRequests = await RequestPool.find({ reqfrom: req.employee.id });
      return res.json({ openRequests });
    }
    openRequests = await RequestPool.find();
    return res.json({ openRequests });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route  POST api/feedbackrequests
//@desc   create Feedback request
//@access private

router.post(
  "/",
  [
    auth,
    [
      check("reqby", "requester id is Required").not().isEmpty(),
      check("reqfrom", "Reviewer id is required").not().isEmpty(),
      check("reqfor", "reqfor is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const employee = await Employee.findById(req.employee.id);
    const isAdmin = employee && employee.isAdmin;
    if (!isAdmin) {
      return res
        .status(400)
        .json({ msg: "Only administrator can raise review request" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      body: { reqby, reqfrom, reqfor },
    } = req;
    try {
      newFeedbackRequest = new RequestPool({ reqby, reqfrom, reqfor });
      await newFeedbackRequest.save();
      const openRequests = await RequestPool.find();
      res.json({ success: true, data: openRequests });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route  POST api/feedbackrequests/reject
//@desc   reject Feedback request
//@access private

router.post(
  "/denied",
  [
    auth,
    [check("rejectionReason", "rejection reason is Required").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      body: { rejectionReason: comment, reqId },
    } = req;
    try {
      //see if Selected request exist
      let feedbackReq = await RequestPool.findById(reqId);
      if (!feedbackReq) {
        return res
          .status(400)
          .json({ errors: [{ msg: "feedbackReq Not exist" }] });
      }
      feedbackReq.comment = comment;
      feedbackReq.rejected = true;
      feedbackReq.completed = true;
      await feedbackReq.save();
      const employee = await Employee.findById(req.employee.id);
      const isAdmin = employee && employee.isAdmin;
      if (isAdmin) {
        const openRequests = await RequestPool.find();
        return res.json({ success: true, data: openRequests });
      }
      return res.json({ success: true });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route  DELETE api/feedbackrequests
//@desc   delete feedback request
//@access Private
router.delete("/", auth, async (req, res) => {
  try {
    const { requestId } = req.body;
    const employee = await Employee.findById(req.employee.id);
    const isAdmin = employee && employee.isAdmin;
    if (!isAdmin) {
      return res.status(400).json({ msg: "Unauthorised Access" });
    }
    RequestPool.findOneAndRemove({ _id: requestId }).then(async () => {
      const openRequests = await RequestPool.find();
      return res.json({ success: true, data: openRequests });
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});
module.exports = router;
