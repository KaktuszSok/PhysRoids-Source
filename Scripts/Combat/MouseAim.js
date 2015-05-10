var target:Vector3;
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

var AI = false;
var aimAt:Transform;
var AntiMissile:TargetMissiles;
var MuzzleVel:float = 500;
var Accuracy:float = 1;

var inRangeYaw = true;
var inRangePitch = true;
var inRange = true;

var defAim:Transform;
function Update () {
	Aim();
}

function Aim() {
	if(!AI)
	{
		var mouseAim:Vector3 = new Vector3(Input.mousePosition.x/Screen.width, Input.mousePosition.y/Screen.height, 0);
		var ray:Ray = Camera.main.ViewportPointToRay(mouseAim);
		var	hit:RaycastHit;
		if(Physics.Raycast(ray, hit, range))
		{
			target = hit.point;
		}
		else
		{
			target = ray.direction * range + Camera.main.transform.position;
		}
	}
	if(AI && aimAt)
	{
		if(aimAt.rigidbody)
		{
			target = aimAt.position + transform.root.rigidbody.velocity + aimAt.rigidbody.velocity*(Vector3.Distance(transform.position, aimAt.position)/MuzzleVel*Mathf.Clamp(Random.Range(1-Accuracy, 1+Accuracy), 0.1, Mathf.Infinity));
		}
		else
		{
			target = aimAt.position;
		}
	}
	else if(AI)
	{
		aimAt = defAim;
	}
	var angle = Quaternion.Angle(transform.rotation, Quaternion.LookRotation(target - transform.position, transform.root.up));
	rotate = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(target - transform.position, transform.root.up), (Speed*Time.deltaTime)/angle);
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
		}
		else if(Paiming == -1 && transform.localRotation.x < -minPitch*Mathf.Deg2Rad/2)
		{
			transform.localRotation.x = locrotate.x;
		}
		else if(Paiming == 0 && minPitch != 0 && maxPitch != 0)
		{
			transform.localRotation.x = locrotate.x;
		}
	}
	if(yaw && YawL >= 360 && Yaiming == 1|| yaw && YawR >= 360 && Yaiming == -1)
	{transform.localRotation.y = locrotate.y;}
	else if(yaw)
	{
		if(Yaiming == 1 && transform.localRotation.y > -YawL*Mathf.Deg2Rad/2)
		{
			transform.localRotation.y = locrotate.y;
		}
		else if(Yaiming == -1 && transform.localRotation.y < YawR*Mathf.Deg2Rad/2)
		{
			transform.localRotation.y = locrotate.y;
		}
		else if(Yaiming == 0 && YawR != 0 && YawL != 0)
		{
			transform.localRotation.y = locrotate.y;
		}
		
	}
	
	transform.localRotation.z = 0;
}