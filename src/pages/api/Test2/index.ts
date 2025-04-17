// // import { NextApiRequest, NextApiResponse } from 'next';
// // import mongoose, { Schema } from 'mongoose';

// // const mockEIP = [
// //   {
// //     _id: "6490b4c738d0b74c7b2b24a6",
// //     eip: 100,
// //     title: "Change difficulty adjustment to target mean block time including uncles",
// //     author: "Vitalik Buterin (@vbuterin)",
// //     status: "Final",
// //     type: "Standards Track",
// //     category: "Core",
// //     created: "2016-04-28",
// //     requires: [],
// //     last_call_deadline: "None",
// //   },
// //   {
// //     _id: "6490b4c71a04485b89dda323",
// //     eip: 1,
// //     title: "EIP Purpose and Guidelines",
// //     author: "Martin Becze <mb@ethereum.org>, Hudson Jameson <hudson@ethereum.org>",
// //     status: "Living",
// //     type: "Meta",
// //     category: "Meta",
// //     created: "2015-10-27",
// //     requires: [],
// //     last_call_deadline: "None",
// //   },
// // ];

// // // Connect to MongoDB if not already connected
// // if (mongoose.connection.readyState === 0) {
// //   if (typeof process.env.MONGODB_URI === 'string') {
// //     mongoose.connect(process.env.MONGODB_URI);
// //   } else {
// //     console.warn('MONGODB_URI not defined, using fallback mock data');
// //   }
// // }

// // // Schema
// // const prDetailsSchema = new Schema({
// //   prNumber: Number,
// //   prTitle: String,
// //   prDescription: String,
// //   labels: [String],
// //   conversations: [Object],
// //   numConversations: Number,
// //   participants: [String],
// //   numParticipants: Number,
// //   commits: [Object],
// //   numCommits: Number,
// //   filesChanged: [String],
// //   numFilesChanged: Number,
// //   mergedAt: Date,
// //   closedAt: Date,
// //   status: String,
// //   type: String,
// // });

// // // Models
// // const EipPrDetails = mongoose.models.alleipsprdetails || mongoose.model('alleipsprdetails', prDetailsSchema);
// // const ErcPrDetails = mongoose.models.allercsprdetails || mongoose.model('allercsprdetails', prDetailsSchema);
// // const RipPrDetails = mongoose.models.allripsprdetails || mongoose.model('allripsprdetails', prDetailsSchema);

// // // Handler
// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   try {
// //     const { status, type } = req.query;

// //     if (!status || !type) {
// //       return res.status(400).json({ error: 'Missing status or type parameter' });
// //     }

// //     console.log('Received Status:', status, 'Received Type:', type);

// //     let Model;
// //     switch ((type as string).toLowerCase()) {
// //       case 'eip':
// //         Model = EipPrDetails;
// //         break;
// //       case 'erc':
// //         Model = ErcPrDetails;
// //         break;
// //       case 'rip':
// //         Model = RipPrDetails;
// //         break;
// //       default:
// //         return res.status(400).json({ error: 'Invalid type parameter' });
// //     }

// //     let prResults = [];

// //     // Fetch from DB
// //     try {
// //       console.log('Using model:', Model.modelName);
// //       prResults = await Model.find({ status: { $regex: status as string, $options: 'i' }
// //       }).lean();
// //     } catch (err) {
// //       console.warn('DB access failed, using mock data fallback');
// //       prResults = mockEIP.filter(
// //         (item) =>
// //           item.status.toLowerCase() === (status as string).toLowerCase() &&
// //           (type as string).toLowerCase() === 'eip'
// //       );
// //     }

// //     // ✅ Format for logging only
// //     const formattedData = prResults.map((pr: any) => ({
// //       prNumber: pr.prNumber,
// //       prTitle: pr.prTitle,
// //       status: pr.labels?.join(', ') || pr.status,
// //       participants: pr.participants?.length || pr.numParticipants || 0,
// //       mergedAt: pr.mergedAt || 'N/A',
// //     }));

// //     console.log('🧾 Formatted PR Data Preview:', formattedData);

// //     // Return full PR data
// //     return res.status(200).json(prResults);
// //   } catch (error) {
// //     console.error('API error:', error);
// //     return res.status(500).json({ error: 'Internal server error' });
// //   }
// // }

// import { NextApiRequest, NextApiResponse } from 'next';
// import mongoose, { Schema } from 'mongoose';

// // Database connection function
// async function connectToDatabase() {
//   if (mongoose.connection.readyState === 0) {
//     try {
//       if (typeof process.env.MONGODB_URI === 'string') {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log('Connected to MongoDB');
//       } else {
//         throw new Error('MONGODB_URI not defined in environment variables');
//       }
//     } catch (err) {
//       console.error('MongoDB connection error:', err);
//       throw err; // Re-throw to handle in the main function
//     }
//   }
// }

// // Schema definition
// const prDetailsSchema = new Schema({
//   eip: Number,
//   erc: Number,
//   rip: Number,
//   title: String,
//   author: String,
//   status: String,
//   type: String,
//   category: String,
//   created: String,
//   requires: [String],
//   last_call_deadline: String,
// }, { collection: 'eips' });

// // Model definition
// const EIPModel = mongoose.models.EIP || mongoose.model('EIP', prDetailsSchema);

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // Connect to database
//     await connectToDatabase();
    
//     // Get query parameters
//     const { status, type } = req.query;

//     // Validate required parameters
//     if (!status || !type) {
//       return res.status(400).json({ 
//         error: 'Missing required parameters',
//         message: 'Please provide both status and type parameters',
//         example: '/api/Test2?status=Final&type=eip'
//       });
//     }

//     const typeLower = (type as string).toLowerCase();
//     const statusLower = (status as string).toLowerCase();

//     // Validate type parameter
//     if (!['eip', 'erc', 'rip'].includes(typeLower)) {
//       return res.status(400).json({ 
//         error: 'Invalid type parameter',
//         message: 'Type must be one of: eip, erc, rip',
//         received: type
//       });
//     }

//     // Build query
//     const query = { 
//       status: { $regex: new RegExp(`^${status}$`, 'i') },
//       [typeLower]: { $exists: true }
//     };
//     // Execute query
//     // First try just checking type exists
//     // const results = await EIPModel.find({ [typeLower]: { $exists: true } }).limit(5).lean();
//     // console.log('Sample records:', results);

// // Then try with status
//     const results = await EIPModel.find({ 
//     status: { $regex: status, $options: 'i' },
//     [typeLower]: { $exists: true }
//   }).lean();

//     if (results.length === 0) {
//       return res.status(404).json({ 
//         message: 'No records found',
//         status: status,
//         type: type,
//         suggestion: 'Try different status or type values',
//         query: query // For debugging purposes
//       });
//     }

//     // Return successful response
//     return res.status(200).json({
//       count: results.length,
//       status: status,
//       type: type,
//       data: results
//     });

//   } catch (error) {
//     console.error('API error:', error);
//     if (error instanceof Error && error.message.includes('MONGODB_URI')) {
//       return res.status(500).json({
//         error: 'Database configuration error',
//         message: 'MongoDB connection string is not configured'
//       });
//     }
//     return res.status(500).json({ 
//       error: 'Internal server error',
//       message: error instanceof Error ? error.message : 'An unexpected error occurred'
//     });
//   }
// }


import { Request, Response } from "express";
import { Octokit } from "@octokit/rest";

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error: any) => {
    console.error("Error connecting to the database:", error.message);
  });

const mdFilesSchema = new mongoose.Schema({
  eip: { type: String, unique: true },
  title: { type: String },
  author: { type: String },
  status: { type: String },
  type: { type: String },
  category: { type: String },
  created: { type: String },
});

const EIPMdFiles =
  mongoose.models.EipMdFiles3 || mongoose.model("EipMdFiles3", mdFilesSchema);
const ERCMdFiles =
  mongoose.models.ErcMdFiles3 || mongoose.model("ErcMdFiles3", mdFilesSchema);
const RIPMdFiles =
  mongoose.models.RipMdFiles3 || mongoose.model("RipMdFiles3", mdFilesSchema);

export default async (req: Request, res: Response) => {
  try {
    // Get query parameters
    const { status, type } = req.query;

    // Validate required parameters
    if (!status || !type) {
      return res.status(400).json({ 
        error: 'Missing required parameters',
        message: 'Please provide both status and type parameters',
        example: '/api/Test2?status=Final&type=eip'
      });
    }

    const typeLower = (type as string).toLowerCase();
    const statusRegex = new RegExp(`^${status}$`, 'i');

    // Validate type parameter
    if (!['eip', 'erc', 'rip'].includes(typeLower)) {
      return res.status(400).json({ 
        error: 'Invalid type parameter',
        message: 'Type must be one of: eip, erc, rip',
        received: type
      });
    }

    // Build base query for each collection
    const baseQuery = {
      status: { $regex: statusRegex }
    };

    let eipResult = [];
    let ercResult = [];
    let ripResult = [];

    // Fetch data based on type
    if (typeLower === 'eip') {
      eipResult = await EIPMdFiles.aggregate([
        {
          $match: {
            ...baseQuery,
            eip: { $nin: ["7212"] },
            category: { $nin: ["ERC", "ERCs"] },
          }
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);
    } 
    else if (typeLower === 'erc') {
      ercResult = await ERCMdFiles.aggregate([
        {
          $match: baseQuery
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);
    } 
    else if (typeLower === 'rip') {
      ripResult = await RIPMdFiles.aggregate([
        {
          $match: baseQuery
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);
    }

    // Add repo information
    const eipModified = eipResult.map((item: any) => {
      return { ...item, repo: "eip" };
    });

    const ercModified = ercResult.map((item: any) => {
      return { ...item, repo: "erc" };
    });

    const ripModified = ripResult.map((item: any) => {
      return { ...item, repo: "rip" };
    });
    interface ResponseData {
      [key: string]: any[]; // This ensures each value in the object is an array
    }

    // Prepare response based on type
    let responseData: ResponseData = {};
    if (typeLower === 'eip') {
      responseData = { eip: eipModified };
    } else if (typeLower === 'erc') {
      responseData = { erc: ercModified };
    } else if (typeLower === 'rip') {
      responseData = { rip: ripModified };
    }

    if (Object.values(responseData)[0].length === 0) {
      return res.status(404).json({ 
        message: 'No records found',
        status: status,
        type: type,
        suggestion: 'Try different status or type values'
      });
    }

    res.json({
      count: Object.values(responseData)[0].length,
      status: status,
      type: type,
      ...responseData
    });

  } catch (error: any) {
    console.error("Error retrieving data:", error.message);
    res.status(500).json({ 
      error: "Internal server error",
      message: error.message 
    });
  }
};