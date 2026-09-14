import { Snapshot } from "../models/SnapshotModel.js";


export const getSnapshot = async(req, res) => {
    const { userId } = req.user;

    try {
        const snapshots = await Snapshot.find({ userId }).sort({ date: 1 });
        return res.status(200).json(snapshots);
    }
    catch(error) {
        return res.status(500).json({ error: error.message });
    }
}