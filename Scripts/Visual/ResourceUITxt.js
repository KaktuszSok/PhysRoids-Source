#pragma strict
var Resource:Resource;
var Name:String;
var Txt:UI.Text;
function Start () {

}

function Update () {
	Txt.text = Name + ": " + Mathf.Clamp((Mathf.Round(Resource.amount)), 0, Resource.maxAmount) + "/" + Resource.maxAmount + " (" + Mathf.Round((Resource.amount/Resource.maxAmount)*100) + "%)";
}