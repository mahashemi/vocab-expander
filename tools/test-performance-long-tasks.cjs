#!/usr/bin/env node
'use strict';

const assert = require('node:assert/strict');
const { normalizeLongTasks, summarizeLongTasks } = require('./performance-long-tasks.cjs');

assert.deepEqual(normalizeLongTasks(undefined), []);
assert.deepEqual(normalizeLongTasks(null), []);
assert.deepEqual(normalizeLongTasks({}), []);
assert.deepEqual(normalizeLongTasks([{ duration: 12 }]), [{ duration: 12 }]);
assert.deepEqual(summarizeLongTasks(undefined), { count: 0, totalDurationMs: 0 });
assert.deepEqual(summarizeLongTasks(null), { count: 0, totalDurationMs: 0 });
assert.deepEqual(summarizeLongTasks([{ duration: 12 }, { duration: 8.5 }, { duration: 'bad' }]), {
  count: 3,
  totalDurationMs: 20.5,
});

console.log('Performance long-task normalization tests passed.');
