#pragma strict
var Resource:Resource;
var Rate:float = 1;
var Activated = true;
var stopAt = 0;
var needsSun = false;
var SunTest:SunlightTest;
function Start () {

}

function Update () {
	if(needsSun && SunTest.hasSunlight || !needsSun)
	{
		Activated = true;
	} else
	{
		Activated = false;
	}
	if(Activated && Resource.amount > stopAt && stopAt >= 0 && Resource.amount < Resource.maxAmount + Rate*Time.deltaTime)
	{
		Resource.amount -= Rate*Time.deltaTime;
	}
	if(stopAt < 0)
	{
		if(Activated && Resource.amount < -stopAt && Resource.amount < Resource.maxAmount + Rate*Time.deltaTime)
		{
			Resource.amount -= Rate*Time.deltaTime;
		}
	}
}