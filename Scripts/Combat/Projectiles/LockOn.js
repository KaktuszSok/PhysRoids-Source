#pragma strict
var target:Vector3;
var speed:float = 90;
var look:Quaternion;
var AI = false;
var angle:float;
function Start () {
	if(AI)
	{
		target = Info.player.position;
	}
}

function Update () {
	if(target != null && target - transform.position != Vector3(0,0,0) && rigidbody)
	{
		look = Quaternion.LookRotation(target - transform.position + rigidbody.velocity*Time.deltaTime);
		angle = Quaternion.Angle(transform.rotation, look);
		transform.rotation = Quaternion.Slerp(transform.rotation, look, speed/angle*Time.deltaTime);
	}
	else if(target != null && target - transform.position != Vector3(0,0,0) && !rigidbody)
	{
		look = Quaternion.LookRotation(target - transform.position);
		angle = Quaternion.Angle(transform.rotation, look);
		transform.rotation = Quaternion.Slerp(transform.rotation, look, speed/angle*Time.deltaTime);
	}
}