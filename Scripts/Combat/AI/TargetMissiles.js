#pragma strict
static var allMissiles:List.<MissileInfo> = new List.<MissileInfo>();
var maxRange:float = 500;
var closest:float = 1000;
var closestmissile:Transform;
var AimYaw:EnemyAim;
var AimPitch:EnemyAim;
var yaw = false;
var pitch = false;
var parentAim = true;
var inRange = true;
var player = false;
var pYaw:MouseAim;
var pPitch:MouseAim;
var defAim:Transform;
function Start () {
	closest = maxRange;
	if(yaw && !player)
	{
		AimYaw = gameObject.GetComponent(EnemyAim);
		if(parentAim)
		{
			AimPitch = transform.parent.GetComponent(EnemyAim);
		}
	}
	if(yaw && player)
	{
		pYaw = gameObject.GetComponent(MouseAim);
		if(parentAim)
		{
			pPitch = transform.parent.GetComponent(MouseAim);
		}
	}
	if(pitch && !player)
	{
		AimPitch = gameObject.GetComponent(EnemyAim);
		if(parentAim)
		{
			AimYaw = transform.parent.GetComponent(EnemyAim);
		}
	}
	if(pitch && player)
	{
		pPitch = gameObject.GetComponent(MouseAim);
		if(parentAim)
		{
			pYaw = transform.parent.GetComponent(MouseAim);
		}
	}
}

function Update () {
	if(AimYaw && AimPitch && !player)
	{
		if(AimYaw.inRangeYaw && AimPitch.inRangePitch && AimYaw.target == AimPitch.target && !player)
		{
			inRange = true;
		}
		else if(!pYaw && !pPitch)
		{
			inRange = false;
		}
	}
	
	if(pYaw && pPitch && player)
	{
		if(pYaw.inRangeYaw && pPitch.inRangePitch && pYaw.target == pPitch.target)
		{
			inRange = true;
		}
		else
		{
			inRange = false;
		}
	}

	if(allMissiles)
	{
		for(var i = 0; i < allMissiles.Count; i++)
		{
			if(allMissiles[i] == null || allMissiles[i].tag == "EnemyProjectile" && !player || allMissiles[i].tag == "Projectile" && player)
			{
				closest = maxRange;
				allMissiles.Remove(allMissiles[i]);
			}
			if(allMissiles.Count > i)
			{
				if(Vector3.Distance(allMissiles[i].gameObject.transform.position, transform.position) < closest)
				{
					closest = Vector3.Distance(allMissiles[i].gameObject.transform.position, transform.position);
					closestmissile = allMissiles[i].gameObject.transform;
				}
			}
		}
	}
	if(!player)
	{
		if(!closestmissile || !inRange && AimYaw.target != Info.player && AimPitch.target != Info.player)
		{
			closest = maxRange;
			AimYaw.target = Info.player;
			AimPitch.target = Info.player;
		}
		else if(closestmissile && AimYaw.target == Info.player && AimPitch.target == Info.player)
		{
			if(Vector3.Distance(transform.position, Info.player.position) > Vector3.Distance(transform.position, closestmissile.position))
			{
				AimYaw.target = closestmissile;
				AimPitch.target = closestmissile;
			}
		}
	}
	else
	{
		if(!closestmissile || !inRange && pYaw.aimAt.tag != defAim && pPitch.target != defAim)
		{
			closest = maxRange;
			pYaw.aimAt = defAim;
			pPitch.aimAt = defAim;
		}
		else if(closestmissile && pYaw.aimAt == defAim && pPitch.aimAt == defAim)
		{
			pYaw.aimAt = closestmissile;
			pPitch.aimAt = closestmissile;
		}
	}
}