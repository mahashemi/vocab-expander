#!/usr/bin/env node
'use strict';

function normalizeLongTasks(value) {
  return Array.isArray(value) ? value : [];
}

function summarizeLongTasks(entries) {
  const tasks = normalizeLongTasks(entries);
  return {
    count: tasks.length,
    totalDurationMs: tasks.reduce((total, task) => {
      const duration = Number(task && task.duration);
      return total + (Number.isFinite(duration) ? duration : 0);
    }, 0),
  };
}

module.exports = { normalizeLongTasks, summarizeLongTasks };
