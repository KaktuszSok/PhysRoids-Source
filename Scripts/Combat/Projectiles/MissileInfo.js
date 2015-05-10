#pragma strict
var Thrust:Thrust;
var LockOn:LockOn;
var Projectile:Projectile;
var Particles:ParticleSystem;
var WaitTime:float = 0.25;
var DetatchForce:float = 2.5;
var fired = false;
var Manager:MissileManager;
var Aim:MouseAim;
var updateAim = false;
var Parent:Transform;
var rbMass:float = 0.03;
var priority:int = 0;
var Player:Rigidbody;
var key:KeyCode = KeyCode.R;

var AI = false;
var AimAI:EnemyAim;
var activateRange:float = 100;
var alwaysLockOn = false;
var changeParent = true;

function Start () {
	Destroy(rigidbody);
	Thrust.enabled = false;
	Projectile.enabled = false;
	Particles.Stop();
	if(!AI)
	{
		AddToManager();
	}
	
}

function Update () {
	if(alwaysLockOn && Vector3.Distance(transform.position, AimAI.Point) < activateRange)
	{
		LockOn.enabled = true;
	}
	if(updateAim && !AI)
	{
		LockOn.target = Aim.target;
	}
	if(updateAim && AI)
	{
		LockOn.target = AimAI.Point;
	}
	if(AI && Vector3.Distance(transform.position, AimAI.Point) < activateRange && !fired)
	{
		FireMissile();
	}
}

function FireMissile () {
	fired = true;
	AddRigid();
	if(TargetMissiles != null)
	{
		TargetMissiles.allMissiles.Add(this);
	}
	if(!AI)
	{
		LockOn.target = Aim.target;
		rigidbody.velocity = Player.velocity;
		rigidbody.angularVelocity = Player.angularVelocity;
		rigidbody.AddForce(transform.up*DetatchForce, ForceMode.Impulse);
	}
	if(AI)
	{
		LockOn.target = AimAI.Point;
	}
	if(changeParent)
	{
		transform.SetParent(Parent);
	}
	yield WaitForSeconds(WaitTime);
	if(Thrust)
	{
		Thrust.enabled = true;
	}
	if(LockOn)
	{
		LockOn.enabled = true;
	}
	if(Projectile)
	{
		Projectile.enabled = true;
	}
	if(Particles)
	{
		Particles.Play();
	}
}

function AddRigid () {
	gameObject.AddComponent(Rigidbody);
	rigidbody.drag = 0;
	rigidbody.angularDrag = 0;
	rigidbody.mass = rbMass;
	rigidbody.useGravity = false;
}

function AddToManager () {
	yield WaitForSeconds(priority*Time.deltaTime);
	Manager.missiles.Add(this);
}