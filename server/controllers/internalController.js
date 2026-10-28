import { runDailySnapshot } from '../tasks/dailySnapshot.js';

export const triggerSnapshot = async (req, res) => {
    if (req.headers["x-snapshot-key"] !== process.env.SNAPSHOT_SECRET) {
        return res.status(401).send("Unauthorized");
    }
    try {
        await runDailySnapshot();
        res.status(200).send("Snapshot complete");
    } catch (error) {
        console.error("Manual snapshot trigger failed", error);
        res.status(500).send("Snapshot failed");
    }
};