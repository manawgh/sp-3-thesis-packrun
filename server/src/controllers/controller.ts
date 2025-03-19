import { Request, Response } from "express"
import Runner, { RunnerAttributes } from "../models/runnerModel";
import sequelize from "../models/model";
import { QueryTypes } from "sequelize";

export function setLocation(req: Request, res: Response) {

  if (isMissingData(req)) res.status(400).json('Missing fields');
  else {

    const { userId, longitude, latitude } = req.body;
    const runner: RunnerAttributes = { userId, longitude, latitude }
    console.log('runner', runner);
    Runner.create(runner)
      .then(runner => {
        console.log(`saved runner with id= ${runner.userId}`);
        res.status(200).json(runner.userId);

      })
      .catch(() => { res.status(500).json("server error") });

    console.log(`long=${longitude} lat=${latitude} userId=${userId}`);
  }
}

function isMissingData(req: Request): boolean {
  return !req.body || Object.keys(req.body).length === 0
    || !Object.keys(req.body).includes('longitude') || !Object.keys(req.body).includes('latitude')
    || !Object.keys(req.body).includes('userId')
}


function calculateDistance(user: any, db: any) {
  const R = 3958.8;
  const dLat = deg2rad(db.latitude - user.latitude);
  const dLon = deg2rad(db.longitude - user.longitude);
  const haversFormula =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(user.latitude)) * Math.cos(deg2rad(db.latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const ang = 2 * Math.atan2(Math.sqrt(haversFormula), Math.sqrt(1 - haversFormula));
  const kms = R * ang;
  const kmsRounded = Math.round(kms);

}
function deg2rad(deg: number) {
  return deg * (Math.PI / 180);

}
export function getNearbyRunners(req: Request, res: Response) {
  async (req: Request, res: Response) => {
    const runnerId = req.params.id;
    const distance = req.params.distance;
    sequelize.query(
      `SELECT * FROM get_nearby_runners(:runner_id, :distance)`,
      {
        replacements: { runner_id: runnerId, distance: distance },
        type: QueryTypes.SELECT
      }
    )
      .then((results) => {
        console.log("Function results:", results);
        res.status(200).json(results);
      })
      .catch((error) => {
        console.error("Error calling function:", error);
        res.status(404);
      });
  }
}

//! I think this function should not exist for users
export async function getAllRunners(req: Request, res: Response) {
  try {
    const allRunners = await Runner.findAll();
    res.status(200).json(allRunners)
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error })
  }
};