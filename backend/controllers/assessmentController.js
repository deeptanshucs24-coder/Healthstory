const { calculateAnalysis, generateStory } = require('../services/healthAnalysisService');

const analyzeAssessment = (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || Object.keys(answers).length === 0) {
      return res.status(400).json({ error: 'No answers provided' });
    }

    const analysis = calculateAnalysis(answers);
    const story = generateStory(analysis);

    res.json({
      analysis,
      story,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error analyzing assessment:', error);
    res.status(500).json({ error: 'Failed to analyze assessment' });
  }
};

const generateReport = (req, res) => {
  try {
    const { results } = req.body;

    if (!results) {
      return res.status(400).json({ error: 'No results provided' });
    }

    const { analysis, story } = results;

    const content = `
MY HEALTH RISK STORY - DETAILED REPORT
Generated: ${new Date().toLocaleDateString()}

========================================
OVERALL HEALTH ASSESSMENT
========================================

Health Status: ${story.healthStatus}
Overall Score: ${analysis.overallPercentage}%

10-YEAR OUTLOOK:
${story.overallMessage}

========================================
HEALTH METRICS
========================================

Energy Level: ${story.energyLevel}%
Mood Health: ${story.moodLevel}%
Mobility: ${story.mobilityLevel}%

========================================
DETAILED ANALYSIS
========================================

${story.detailedBreakdown}

WHY THESE NUMBERS MATTER:
${story.detailedStory}

========================================
CATEGORY BREAKDOWN
========================================

${Object.entries(analysis.categoryPercentages).map(([cat, score]) => 
  `${cat}: ${score}%`
).join('\n')}

========================================
ACTION PLAN
========================================

${analysis.habits.mustImprove.length > 0 ? `
MUST IMPROVE (PRIORITY):
${analysis.habits.mustImprove.map(h => `- ${h.category} (${h.score}%)`).join('\n')}

These habits need immediate attention and will have the biggest impact on your future health.
` : ''}

${analysis.habits.easierToStart.length > 0 ? `
EASIER TO START:
${analysis.habits.easierToStart.map(h => `- ${h.category} (${h.score}%)`).join('\n')}

You have a foundation here. Small improvements can push these into the healthy zone.
` : ''}

${analysis.habits.easiestToMaintain.length > 0 ? `
EASIEST TO MAINTAIN:
${analysis.habits.easiestToMaintain.map(h => `- ${h.category} (${h.score}%)`).join('\n')}

Great work! These positive habits are already protecting your future.
` : ''}

========================================
NEXT STEPS
========================================

1. Focus on your "Must Improve" areas first
2. Choose ONE habit to change this week
3. Track your progress daily
4. Reassess in 30 days
5. Seek professional support if needed

========================================

This report is for informational purposes only and does not constitute medical advice.
Please consult healthcare professionals for personalized medical guidance.
    `.trim();

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename=health-report-${Date.now()}.txt`);
    res.send(content);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
};

module.exports = { analyzeAssessment, generateReport };