
/////////////////////////////////////////////
// Netscape 4.x �p ScriptCommand�C�x���g�n���h��
// 
// caller : video frame
// 
function OnDSScriptCommandEvt(scType, scParam)
{
    if ( scType == "changeSlide" )
    {
    	var strCommand = "parent.slide.location.href=\"" + scParam + "\";";
		
		setTimeout(strCommand, 0);
    }
}

/////////////////////////////////////////////
// Netscape 4.x �p ScriptCommand�C�x���g�n���h����L���ɂ���
// 
// caller : video frame
// 
function initVideo()
{
	if ( navigator.appName == "Netscape" ) 
	{
		var plugIn = document.MediaPlayer;
		document.appObs.setByProxyDSScriptCommandObserver(plugIn, true);
	}
}

