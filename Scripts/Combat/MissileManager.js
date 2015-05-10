#pragma strict
var missiles:List.<MissileInfo>;
function Start () {

}

function Update () {
	if(missiles.Count > 0)
	{
		if(Input.GetKeyDown(missiles[0].key) && missiles[0] && !missiles[0].fired)
		{
			missiles[0].FireMissile();
		}
	}
	for(var i = 0; i < missiles.Count; i++)
	{
		if(missiles[i].fired)
		{
			missiles.Remove(missiles[i]);
		}
	}
}