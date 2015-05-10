#pragma strict
var Player:Stats;
var Txt:UI.Text;
function Start () {

}

function Update () {
	if(Player.HP >= 10000)
	{
		Txt.text = "HP: " + Player.HP/1000 + "k/" + Player.maxHP/1000 + "k (" + Mathf.Round((Player.HP/Player.maxHP)*100) + "%)";
	}
	else
	{
		Txt.text = "HP: " + Player.HP + "/" + Player.maxHP + " (" + Mathf.Round((Player.HP/Player.maxHP)*100) + "%)";
	}
}