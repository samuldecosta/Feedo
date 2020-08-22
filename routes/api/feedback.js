const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Employee = require("../../models/Employees");
const Feedback = require("../../models/Feedbacks");
const RequestPool = require("../../models/RequestPool");

//@route  POST api/feedback
//@desc   Submit Feedback
//@access Private

router.post(
  "/",
  [auth, [check("summary", "Feedback summary is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const {
      body: { reqId, employee, summary, overAllPerformance = 0 },
    } = req;
    const updatedFeedbackObject = new Feedback({
      request: reqId,
      reviewer: req.employee.id,
      employee: employee,
      summary,
      level: overAllPerformance,
    });
    try {
      //Check if request exist in request pool
      const selectedRequest = reqId && (await RequestPool.findById(reqId));
      if (selectedRequest) {
        selectedRequest.completed = true;
        await RequestPool.findByIdAndUpdate(reqId, selectedRequest, {
          new: true,
        });
      }
      await updatedFeedbackObject.save();
      return res.json({ success: true });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route  PUT api/feedback
//@desc   Update Feedback
//@access Private
router.put("/", auth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.employee.id);
    const isAdmin = employee.isAdmin;
    if (!isAdmin) {
      return res.status(400).send("Unauthorise access to update feedback");
    }
    const {
      body: { feedbackId, summary, overAllPerformance },
    } = req;
    const updatedFeedback = await Feedback.findById(feedbackId);
    updatedFeedback.level = overAllPerformance;
    updatedFeedback.reviewer = req.employee.id;
    updatedFeedback.summary = summary;
    updatedFeedback.save();
    return res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

//@route  DELETE api/feedback
//@desc   delete feedback
//@access Private
router.delete("/", auth, async (req, res) => {
  try {
    const { requestId } = req.body;
    const employee = await Employee.findById(req.employee.id);
    const isAdmin = employee && employee.isAdmin;
    if (!isAdmin) {
      return res.status(400).json({ msg: "Unauthorised Access" });
    }
    Feedback.findOneAndRemove({ _id: requestId });
    return res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});
module.exports = router;
