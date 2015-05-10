#pragma strict
var Thrust:float = 1.5;
var Dir:Vector3;
var Player:Rigidbody;
var Key:KeyCode;
var Key2:KeyCode;

var StabilizerKey:KeyCode = KeyCode.T;
var StabilizerDir:String = "y";
var StabilizerVel:float = 0.02;

function Start () {
	particleSystem.enableEmission = false;
}

function FixedUpdate () {
if(transform.root.name == "Player")
{
	if(Input.GetKey(Key) && Input.GetKey(Key2) && !Input.GetKey(StabilizerKey))
	{
		Player.AddRelativeTorque(Dir*Thrust);
		particleSystem.enableEmission = true;
	}
	else
	{
		particleSystem.enableEmission = false;
	}
	
	if(Input.GetKey(StabilizerKey))
	{
	
		var angvel:Vector3 = Player.gameObject.GetComponent(Info).angvel;
		if(angvel.x >= StabilizerVel && StabilizerDir == "-x")
		{
			Player.AddRelativeTorque(-Vector3.right*Thrust);
			particleSystem.enableEmission = true;
		}
		if(angvel.x <= -StabilizerVel && StabilizerDir == "x")
		{
			Player.AddRelativeTorque(Vector3.right*Thrust);
			particleSystem.enableEmission = true;
		}
		
		
		if(angvel.y >= StabilizerVel && StabilizerDir == "-y")
		{
			Player.AddRelativeTorque(-Vector3.up*Thrust);
			particleSystem.enableEmission = true;
		}
		if(angvel.y <= -StabilizerVel && StabilizerDir == "y")
		{
			Player.AddRelativeTorque(Vector3.up*Thrust);
			particleSystem.enableEmission = true;
		}
		
		
		if(angvel.z >= StabilizerVel && StabilizerDir == "-z")
		{
			Player.AddRelativeTorque(-Vector3.forward*Thrust);
			particleSystem.enableEmission = true;
		}
		if(angvel.z <= -StabilizerVel && StabilizerDir == "z")
		{
			Player.AddRelativeTorque(Vector3.forward*Thrust);
			particleSystem.enableEmission = true;
		}
	}
}
}