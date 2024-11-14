const fs = require('fs').promises;
const path = require('path');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const report = {
    reporterName: req.body.get('reporterName'),
    crimeCategory: req.body.get('crimeCategory'),
    crimeDescription: req.body.get('crimeDescription'),
    location: req.body.get('location'),
    date: req.body.get('date'),
    time: req.body.get('time'),
  };

  const reportsPath = path.join(__dirname, 'reports.json');

  try {
    const data = await fs.readFile(reportsPath, 'utf8');
    const reports = JSON.parse(data);
    reports.push(report);

    await fs.writeFile(reportsPath, JSON.stringify(reports, null, 2));
    res.status(200).json({ message: 'Report submitted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving report.' });
  }
}

export const config = {
  api: {
    bodyParser: {
      multipart: true,
    },
  },
};
