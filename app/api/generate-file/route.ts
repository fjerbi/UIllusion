import fs from 'fs';
import path from 'path';

export async function POST(req, res) {
  if (req.method === 'POST') {
    const { script } = req.body;  

    if (!script) {
      return res.status(400).json({ error: 'No script provided' });
    }

  
    const filePath = path.join(process.cwd(), 'app', 'GeneratedCode.tsx');

    try {
    
      fs.writeFileSync(filePath, script, 'utf-8');
      return res.status(200).json({ message: 'File generated successfully!' });
    } catch (error) {
      console.error('Error writing file:', error);
      return res.status(500).json({ error: 'Error generating file' });
    }
  } else {

    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
