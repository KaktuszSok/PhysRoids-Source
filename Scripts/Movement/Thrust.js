#pragma strict
var Thrust:float = 50;
var Dir:Vector3 = Vector3.forward;
var Player:Transform;
var Key:KeyCode = KeyCode.W;
var Key2:KeyCode = KeyCode.Tab;
var key2disable = true;
var Exhaust:ParticleSystem;
var alwaysOn = false;
var Activated = false;

function Start () {
	Exhaust.enableEmission = false;
}

function FixedUpdate () {
	if(Input.GetKey(Key) && !alwaysOn)
	{
		if(key2disable && !Input.GetKey(Key2))
			{
				Activated = true;
			}
			if(!key2disable && Input.GetKey(Key2))
			{
				Activated = true;
			}
	}
	else if(!alwaysOn)
	{
		Activated = false;
	}
	
	if(Activated)
	{
		Player.rigidbody.AddRelativeForce(Dir*Thrust);
		Exhaust.enableEmission = true;
	}
	else
	{
		Exhaust.enableEmission = false;
	}
	
	if(alwaysOn)
	{
		Activated = true;
	}
}