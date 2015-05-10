#pragma strict
var Lifetime:float = 2;
var Dmg:float = 250;
var Pen:float = 100;
var Owner:String;
var DamageOwner = false;

function Start () {
	transform.FindChild("Explode").particleSystem.Stop();
	Destroy(gameObject, Lifetime);
}

function Update () {
	
}

function OnCollisionEnter (hit:Collision) {
	if(hit.gameObject.tag != "Projectile")
	{
		if(transform.FindChild("Explode"))
		{
			transform.FindChild("Explode").particleSystem.Play();
			transform.FindChild("Explode").SetParent(null);
		}
		Destroy(gameObject);
	}
}