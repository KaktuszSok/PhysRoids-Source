#pragma strict
var started = false;
function Start () {

}

function Update () {

	if(!started && particleSystem.isPlaying)
	{
		started = true;
	}
	if(!particleSystem.IsAlive() && started)
	{
		Destroy(gameObject);
	}
}