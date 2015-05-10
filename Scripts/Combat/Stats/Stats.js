#pragma strict
import System.Collections.Generic;
var maxHP:float = 2500;
var HP:float = 2500;
var Armour:int = 100;
var Explode:ParticleSystem;
var ExplodeSFX = true;
var destroyed = false;
var startcol:Color;
var hasRenderer = true;
var childRenderer = false;
var Red:float = 50;
var RedTime:float = .2;
var isPlayer = false;
var lives = 3;

var spawnPoint:Vector3 = Vector3(0,0,0);
var spawnRot:Quaternion = Quaternion(0,0,0,0);

var OwnerTag:String;
function Start () {
	if(Explode)
	{
		Explode.Stop();
	}
	if(hasRenderer)
	{
		startcol = renderer.material.color;
	}
}

function Update () {
	if(HP <= 0 && !destroyed)
	{
		Debug.Log("Destroyed " + gameObject.name + "!");
		destroyed = true;
		if(ExplodeSFX)
		{
			Explode.gameObject.audio.Play();
		}
		if(Explode)
		{
			Explode.Play();
			Explode.transform.SetParent(null);
		}
		if(!isPlayer)
		{
			Destroy(gameObject, 0.05);
		}
		if(isPlayer)
		{
			lives --;
			Respawn();
		}
	}
	if(isPlayer && lives < 1)
		{
			RestartLevel();
		}
}

function OnCollisionEnter (col:Collision) {
	var obj:GameObject = col.gameObject;
	if(obj.tag == "Projectile")
	{
		var laser:Projectile = obj.GetComponent(Projectile);
		if(laser.Pen >= Armour && laser.Owner != OwnerTag || laser.Pen >= Armour && laser.DamageOwner)
		{
			HP -= laser.Dmg;
			if(hasRenderer)
			{
				renderer.material.color.r = Red;
				yield WaitForSeconds(RedTime);
				renderer.material.color.r = startcol.r;
			}
			if(childRenderer)
			{
				var renderers:Component[];
				renderers = GetComponentsInChildren(Renderer);
				for(var render:Renderer in renderers) {
					if(render.material.HasProperty("_Color"))
					{
						render.material.color.r = Red;
					}
				}
				yield WaitForSeconds(RedTime);
				for(var render:Renderer in renderers) {
					if(render.material.HasProperty("_Color"))
					{
						render.material.color.r = startcol.r;
					}
				}
			}
		}
	}
}

function Respawn () {

	transform.position = spawnPoint;
	transform.rotation = spawnRot;
	HP = maxHP;
	rigidbody.velocity = Vector3.zero;
	rigidbody.angularVelocity = Vector3.zero;
	destroyed = false;
	
}

function RestartLevel () {
	Application.LoadLevel(Application.loadedLevel);
}