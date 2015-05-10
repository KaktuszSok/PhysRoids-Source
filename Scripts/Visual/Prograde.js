#pragma strict
function Start () {

}

function Update () {
	var prograde:Vector3 = transform.root.position + transform.root.rigidbody.velocity;
	transform.LookAt(prograde);
}