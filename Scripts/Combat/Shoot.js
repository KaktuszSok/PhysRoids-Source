#pragma strict
var ReloadLeft:float = 0;
var Reload:float = 2.5;
var Reloaded = true;
var Trail:Transform;
var Velocity:float = 100;
var safecheckDist:float = 5;
var rayThickness = 0.1;
var Owner:String;
var DamageOwner = false;
var AmmoContainer:Resource;
var AmmoUsage:float = 1;
var Parent:Transform;

var AI = false;
var target:Transform;
var maxrange:float = 200;
var AimYaw:EnemyAim;
var AimPitch:EnemyAim;

function Start () {
	if(AI)
	{
		target = Info.player;
	}
}

function Update () {
	if(AI && AimYaw.target)
	{
		target = AimYaw.target;
	}
	else if(AI && AimPitch.target)
	{
		target = AimPitch.target;
	}
	else if(AI && !target)
	{
		target = Info.player;
	}
	if(!AI && Input.GetMouseButton(0) && Reloaded && AmmoContainer.amount >= AmmoUsage &&
	!Physics.Raycast(transform.position, transform.forward, safecheckDist) &&
	!Physics.Raycast(transform.position + Vector3(rayThickness, 0, 0), transform.forward, safecheckDist) &&
	!Physics.Raycast(transform.position + Vector3(-rayThickness, 0, 0), transform.forward, safecheckDist))
	{
		Shoot();
		if(AmmoContainer)
		{
			AmmoContainer.amount -= AmmoUsage;
		}
		ReloadLeft = Reload;
		ReloadWeapon();
	}
	if(AI && Vector3.Distance(transform.position, target.position) < maxrange && Reloaded && AimYaw.inRangeYaw && AimPitch.inRangePitch)
	{
		Shoot();
		ReloadLeft = Reload;
		ReloadWeapon();
	}
	if(ReloadLeft > 0)
	{
		ReloadLeft -= Time.deltaTime;
	}
	if(ReloadLeft < 0)
	{
		ReloadLeft = 0;
	}
}

function Shoot () {
	Reloaded = false;
	var Laser:Rigidbody;
	Laser = Instantiate(Trail, transform.position, transform.rotation).rigidbody;
	Laser.velocity = transform.forward*Velocity;
	Laser.velocity += transform.root.rigidbody.velocity;
	Laser.gameObject.GetComponent(Projectile).Owner = Owner;
	Laser.gameObject.GetComponent(Projectile).DamageOwner = DamageOwner;
	Laser.transform.SetParent(Parent);
}

function ReloadWeapon () {
	yield WaitForSeconds(Reload);
	Reloaded = true;
}