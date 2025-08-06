const Task = require('../models/Task');
const TimeLog = require('../models/TimeLog');

exports.getDailySummary = async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Get all tasks for user
    const tasks = await Task.find({ user: req.user._id });

    // Get today's time logs for user
    const timeLogs = await TimeLog.find({
      user: req.user._id,
      startTime: { $gte: todayStart, $lte: todayEnd }
    });

    // Calculate total time tracked today
    const totalTime = timeLogs.reduce((sum, log) => sum + (log.duration || 0), 0);

    // Completed tasks
    const completedTasks = tasks.filter(task => task.status === 'Completed');
    // In progress or pending tasks
    const activeTasks = tasks.filter(task => task.status !== 'Completed');

    res.status(200).json({
      date: todayStart.toISOString().slice(0, 10),
      tasksWorkedOn: [...new Set(timeLogs.map(log => log.task.toString()))],
      totalTimeTrackedSeconds: totalTime,
      completedTasks: completedTasks.map(t => t._id),
      activeTasks: activeTasks.map(t => t._id)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
