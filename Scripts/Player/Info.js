#pragma strict
var angvel:Vector3;
static var player:Transform;

function Start () {
	player = transform;
}

function Update () {
	angvel = transform.InverseTransformDirection(rigidbody.angularVelocity);
}