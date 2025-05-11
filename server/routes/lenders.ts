import express from 'express';
import Database from '@replit/database';

const router = express.Router();
const db = new Database();

/**
 * GET /api/lenders
 * Returns all lenders in the database
 */
router.get('/api/lenders', async (req, res) => {
  try {
    // Get the lender index which contains all lender IDs
    const lenderIds = await db.get('lender_index');
    
    if (!lenderIds || !Array.isArray(lenderIds)) {
      return res.status(404).json({ 
        error: 'No lenders found. Run the seeding script to populate the database.' 
      });
    }
    
    // Fetch all lenders from the database
    const lenders = await Promise.all(
      lenderIds.map(id => db.get(`lender_${id}`))
    );
    
    // Filter out any null values (in case some lenders were deleted)
    const validLenders = lenders.filter(lender => lender !== null);
    
    res.json(validLenders);
  } catch (error) {
    console.error('Error fetching lenders:', error);
    res.status(500).json({ error: 'Failed to fetch lenders' });
  }
});

/**
 * GET /api/lender/:id
 * Returns a single lender by ID
 */
router.get('/api/lender/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Fetch the lender from the database
    const lender = await db.get(`lender_${id}`);
    
    if (!lender) {
      return res.status(404).json({ error: `Lender with ID ${id} not found` });
    }
    
    res.json(lender);
  } catch (error) {
    console.error(`Error fetching lender with ID ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch lender' });
  }
});

export default router;