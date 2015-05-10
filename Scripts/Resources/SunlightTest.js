#pragma strict
var Sun:Transform;
var hasSunlight = true;
function Start () {

}

function Update () {
	if(!Physics.Raycast(transform.position, Sun.position - transform.position, Vector3.Distance(transform.position, Sun.position)))
	{
		hasSunlight = true;
	}
	else
	{hasSunlight = false;}
}