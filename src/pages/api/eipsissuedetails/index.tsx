import { Request, Response } from 'express';
import mongoose from 'mongoose';

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error: any) => {
        console.error('Error connecting to the database:', error.message);
    });

// Define the Issue schema
const IssueDetailsSchema = new mongoose.Schema({
    issueNumber: { type: Number, required: true, unique: true },
    issueTitle: { type: String, required: true },
    issueDescription: { type: String },
    labels: { type: [String] },
    conversations: { type: [Object] },
    numConversations: { type: Number, default: 0 },
    participants: { type: [String] },
    numParticipants: { type: Number, default: 0 },
    state: { type: String, required: true },
    createdAt: { type: Date, required: true },
    closedAt: { type: Date },
    updatedAt: { type: Date, required: true },
    author: { type: String, required: true },
});

// Check if the model exists or create it
const IssueDetails = mongoose.models.IssueDetails || mongoose.model('AllEipsIssueDetails', IssueDetailsSchema);

export default async (req: Request, res: Response) => {
    try {
        // Fetch Issue details with selected fields
        const issueDetails = await IssueDetails.find({}).select('issueNumber issueTitle createdAt closedAt state').exec();
        
        // Transform the data to include createdAt, closedAt, and state
        const transformedDetails = issueDetails.map((issue: any) => {
            const created_at = issue.createdAt;
            const closed_at = issue.closedAt;
            const state = issue.state;

            return {
                IssueNumber: issue.issueNumber,
                IssueTitle: issue.issueTitle,
                created_at,
                closed_at,
                state,
            };
        });
        
        // Log the transformed details
        console.log(transformedDetails);
        
        // Return the Issue details as JSON response
        res.json(transformedDetails);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
