import AuctionItem from "../schema/Auction.schema.js";

// Get all auction items
export const getAllAuctionItems = async (req, res) => {
    try {
      const auctions = await AuctionItem.find();//get all
      
      res.json(auctions);
    } catch (error) {
      console.error('Fetching Auctions Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Get a single auction item by ID
export const getAuctionById = async (req, res) => {
    try {
      const auctionItem = await AuctionItem.findById(req.params.id);
      if (!auctionItem) 
        return res.status(404).json({ message: 'Auction not found' });
  
      res.json(auctionItem);
    } catch (error) {
      console.error('Fetching Auction Item Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Create Auction Item (Protected)
export const postAuctionItem = async (req, res) => {
    try {
      const { itemName, description, startingBid, closingTime } = req.body;
  
      if (!itemName || !description || !startingBid || !closingTime) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const newItem = new AuctionItem({
        itemName,
        description,
        currentBid: startingBid,
        highestBidder: '',
        closingTime,
      });
  
      await newItem.save();
      res.status(201).json({ message: 'Auction item created', item: newItem });
  
    } catch (error) {
      console.error('Auction Post Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Deleting an Item (Protected)
export const deleteAuctionItemById = async (req, res) => {
    try {
        const { id } = req.params
        await AuctionItem.findByIdAndDelete(id)

    res.status(200).json({message: "AuctionItem Deleted Successfully"})
    } catch (error) {
        console.error('Error in Deleting AuctionItem', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}