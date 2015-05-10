#pragma strict
var Name = "Battery";
var Rate:float = 50;
var Activated = false;
var obj:GameObject;

function Start () {

}

function Update () {
	if(Activated && obj.GetComponentInChildren(Resource).amount < obj.GetComponentInChildren(Resource).maxAmount)
	{
		obj.GetComponentInChildren(Resource).amount += Rate*Time.deltaTime;
	}
}

function OnTriggerEnter (col:Collider) {
	if(col.gameObject.transform.root.gameObject.tag == "Player")
	{
		obj = col.gameObject.transform.root.gameObject;
		if(obj.tag == "Player" && obj.GetComponentInChildren(Resource) && obj.GetComponentInChildren(Resource).Name == Name)
		{
			if(obj.GetComponentInChildren(Resource).amount <= obj.GetComponentInChildren(Resource).maxAmount - Rate*Time.deltaTime)
			{
				Activated = true;
			}
		}
		else
		{
			Activated = false;
		}
	}
}

function OnTriggerExit (col:Collider) {
	if(col.gameObject.transform.root.gameObject.tag == "Player")
	{
		obj = col.gameObject.transform.root.gameObject;
		if(obj.tag == "Player" && obj.GetComponentInChildren(Resource) && obj.GetComponentInChildren(Resource).Name == Name)
		{
			Activated = false;
		}
	}
}