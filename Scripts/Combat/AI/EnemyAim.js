var Point:Vector3;
var range:float = 200;

var maxPitch:float = 10;
var minPitch:float = -10;
var YawL:float = 45;
var YawR:float = 45;
var Speed:float = 90;
var rotate:Quaternion;

var Paiming:int = 0;
var Yaiming:int = 0;

var yaw = true;
var pitch = true;

var target:Transform;
var Accuracy:float = 1;
var MuzzleVel:float = 100;

var inRangePitch = true;
var inRangeYaw = true;
var inRange = true;
var missileAim = false;
function Start() {
	target = Info.player;
}

function Update () {
	if(Vector3.Distance(target.position, transform.position) <= range)
	{
		Aim();
		if(inRangePitch && inRangeYaw)
		{
			inRange = true;
		}
		else
		{
			inRange = false;
		}
	}
}

function Aim() {
	if(missileAim)
	{
		MuzzleVel = rigidbody.velocity.magnitude;
	}
	if(target)
	{
		Point = target.position + target.rigidbody.velocity*(Vector3.Distance(transform.position, target.position)/MuzzleVel)*Mathf.Clamp(Random.Range(1-Accuracy, 1+Accuracy), 0.1, Mathf.Infinity);
	}
	var angle = Quaternion.Angle(transform.rotation, Quaternion.LookRotation(Point - transform.position, transform.root.up));
	rotate = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(Point - transform.position, transform.root.up), (Speed*Time.deltaTime)/angle);
	var relrotate:Quaternion = Quaternion.Inverse(rotate)*transform.rotation;
	var locrotate:Quaternion = Quaternion.Inverse(transform.parent.rotation)*rotate;
	
	if(relrotate.x > 0)
	{Paiming = 1;}
	else if(relrotate.x < 0)
	{Paiming = -1;}
	else
	{Paiming = 0;}
	
	if(relrotate.y > 0)
	{Yaiming = 1;}
	else if(relrotate.y < 0)
	{Yaiming = -1;}
	else
	{Yaiming = 0;}
	
	if(pitch)
	{
		if(Paiming == 1 && transform.localRotation.x > -maxPitch*Mathf.Deg2Rad/2)
		{
			transform.localRotation.x = locrotate.x;
			inRangePitch = true;
		}
		else if(Paiming == -1 && transform.localRotation.x < -minPitch*Mathf.Deg2Rad/2)
		{
			transform.localRotation.x = locrotate.x;
			inRangePitch = true;
		}
		else if(Paiming == 0 && minPitch != 0 && maxPitch != 0)
		{
			transform.localRotation.x = locrotate.x;
			inRangePitch = true;
		}
		else
		{
			inRangePitch = false;
		}
	}
	if(yaw && YawL >= 360 && Yaiming == 1|| yaw && YawR >= 360 && Yaiming == -1)
	{transform.localRotation.y = locrotate.y;}
	else if(yaw)
	{
		if(Yaiming == 1 && transform.localRotation.y > -YawL*Mathf.Deg2Rad/2)
		{
			transform.localRotation.y = locrotate.y;
			inRangeYaw = true;
		}
		else if(Yaiming == -1 && transform.localRotation.y < YawR*Mathf.Deg2Rad/2)
		{
			transform.localRotation.y = locrotate.y;
			inRangeYaw = true;
		}
		else if(Yaiming == 0 && YawR != 0 && YawL != 0)
		{
			transform.localRotation.y = locrotate.y;
			inRangeYaw = true;
		}
		else
		{
			inRangeYaw = false;
		}
		
	}
	
	transform.localRotation.z = 0;
}