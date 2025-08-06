const TimeLog = require('../models/TimeLog');
const Task = require('../models/Task');

exports.startTimeLog = async (req, res) => {
  try {
    const { taskId } = req.body;
    if (!taskId) return res.status(400).json({ message: 'Task ID required.' });
    const task = await Task.findOne({ _id: taskId, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    const activeLog = await TimeLog.findOne({ user: req.user._id, task: taskId, endTime: null });
    if (activeLog) return res.status(400).json({ message: 'Timer already running for this task.' });
    const timeLog = await TimeLog.create({ user: req.user._id, task: taskId, startTime: new Date() });
    res.status(201).json(timeLog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.stopTimeLog = async (req, res) => {
  try {
    const { taskId } = req.body;
    if (!taskId) return res.status(400).json({ message: 'Task ID required.' });
    const timeLog = await TimeLog.findOne({ user: req.user._id, task: taskId, endTime: null });
    if (!timeLog) return res.status(404).json({ message: 'No active timer for this task.' });
    timeLog.endTime = new Date();
    timeLog.duration = Math.floor((timeLog.endTime - timeLog.startTime) / 1000);
    await timeLog.save();
    res.status(200).json(timeLog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getTimeLogs = async (req, res) => {
  try {
    const logs = await TimeLog.find({ user: req.user._id }).populate('task');
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getTaskTotalTime = async (req, res) => {
  try {
    const { taskId } = req.params;
    const logs = await TimeLog.find({ user: req.user._id, task: taskId, duration: { $gt: 0 } });
    const total = logs.reduce((sum, log) => sum + log.duration, 0);
    res.status(200).json({ taskId, totalSeconds: total });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
