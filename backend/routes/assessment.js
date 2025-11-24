const express = require('express');
const router = express.Router();
const { analyzeAssessment, generateReport } = require('../controllers/assessmentController');

router.post('/analyze', analyzeAssessment);
router.post('/download', generateReport);

module.exports = router;