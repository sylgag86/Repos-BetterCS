import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

// GET /api/lenders - Returns all lenders in the database
router.get('/', async (req, res) => {
  try {
    const lendersPath = path.join(__dirname, '../data/lenders.json');
    const lendersData = fs.readFileSync(lendersPath, 'utf8');
    const lenders = JSON.parse(lendersData);
    
    res.json(lenders);
  } catch (error) {
    console.error('Error fetching lenders:', error);
    res.status(500).json({ error: 'Failed to fetch lenders' });
  }
});

// GET /api/lender/:id - Returns a single lender by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const lendersPath = path.join(__dirname, '../data/lenders.json');
    const lendersData = fs.readFileSync(lendersPath, 'utf8');
    const lenders = JSON.parse(lendersData);
    
    const lender = lenders.find((l: any) => l.id === id);
    
    if (!lender) {
      return res.status(404).json({ error: 'Lender not found' });
    }
    
    res.json(lender);
  } catch (error) {
    console.error('Error fetching lender:', error);
    res.status(500).json({ error: 'Failed to fetch lender' });
  }
});

export default router;