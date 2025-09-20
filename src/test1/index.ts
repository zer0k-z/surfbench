import { Instance } from "cs_script/point_script";
import { externalFunction } from "./test";
import { Vec3, Vector3Utils } from '@s2ze/math'
import { Team } from "@s2ze/types";

Instance.Msg("Loaded")

{
  const player = Instance.GetPlayerController(0);
  const pawn = player.GetPlayerPawn(); // while we can teleport a controller as every entity has teleport and it does actually still teleport the player, it's still not correct
  player.JoinTeam(Team.T)
  pawn.Teleport(Vector3Utils.add(pawn.GetAbsOrigin(), new Vec3(0,0,20)), null, null);
  // OR
  const position = new Vec3(pawn.GetAbsOrigin());
  pawn.Teleport(position.add(new Vec3(0,0,20)), null, null)
}

Instance.SetThink(() => {
  const pawn = Instance.GetPlayerController(0).GetPlayerPawn();
  const position = new Vec3(pawn.GetAbsOrigin());

  Instance.SetNextThink(Instance.GetGameTime());
  Instance.DebugScreenText(`Distance from 0, 0, 0: ${position.distance(Vec3.Zero)}`, 300, 50, 0.01, { r: 0xff, g: 0, b: 0xff })

  // Lock player's camera to 0,0,0 origin
  const targetAngles = position.directionTowards(Vec3.Zero).eulerAngles;
  pawn.Teleport(null, targetAngles, null)
  Instance.DebugScreenText(`Needed angles: ${targetAngles.toString()}`, 300, 80, 0.01, { r: 0xff, g: 0, b: 0xff })
})

Instance.SetNextThink(Instance.GetGameTime());

Instance.OnGameEvent("bullet_impact" as any, async () => {
  externalFunction();
})