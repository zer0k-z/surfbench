import { Vec3 } from "@s2ze/math";
import { Instance } from "cs_script/point_script";

let startTime = 0;

Instance.OnScriptInput("start", () => {
  startTime = Instance.GetGameTime();
  Instance.Msg("Timer started: " + startTime);
});

Instance.OnScriptInput("stop", () => {
  const endTime = Instance.GetGameTime();
  Instance.Msg("Timer stopped: " + endTime);
  Instance.Msg("Elapsed time: " + (endTime - startTime));
  
  const player = Instance.GetPlayerController(0);
  const pawn = player.GetPlayerPawn();

  Instance.Msg("Player exit velocity: " + new Vec3(pawn.GetAbsVelocity()).length);
  if (endTime - startTime > 1.0)
  {
	Instance.DebugScreenText(`Elapsed time: ${(endTime - startTime).toFixed(2)}`, 600, 620, 5, { r: 0xff, g: 0, b: 0xff });
	Instance.DebugScreenText(`Exit velocity: ${new Vec3(pawn.GetAbsVelocity()).length.toFixed(2)}`, 600, 640, 5, { r: 0xff, g: 0, b: 0xff });
  }
});

Instance.OnScriptInput("slideup", () => {
  const player = Instance.GetPlayerController(0);
  const pawn = player.GetPlayerPawn();
  
  const destinationEntity = Instance.FindEntityByName("slide_start");
  pawn.Teleport(destinationEntity.GetAbsOrigin(), destinationEntity.GetAbsAngles(), Vec3.Zero);
});

Instance.OnScriptInput("surf", () => {
  const player = Instance.GetPlayerController(0);
  const pawn = player.GetPlayerPawn();
  
  const destinationEntity = Instance.FindEntityByName("surf_start");
  pawn.Teleport(destinationEntity.GetAbsOrigin(), destinationEntity.GetAbsAngles(), Vec3.Zero);
});

Instance.SetThink(() => {
  const pawn = Instance.GetPlayerController(0).GetPlayerPawn();

  Instance.SetNextThink(Instance.GetGameTime());
  Instance.DebugScreenText(`Speed: ${new Vec3(pawn.GetAbsVelocity()).length2D.toFixed(2)}`, 1000, 600, 0.01, { r: 0xff, g: 0xff, b: 0xff })

})

Instance.SetNextThink(Instance.GetGameTime());