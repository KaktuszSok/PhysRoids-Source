#pragma strict
var Name:String;
var maxAmount:float = 5000;
var amount:float = 5000;

function Start () {

}

function Update () {
	amount = Mathf.Clamp(amount, 0, maxAmount);
}