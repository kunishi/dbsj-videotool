
// --------------------------------------------------------------------------------
// DCC(Dynamic Create Contents) functions
//
//
// --------------------------------------------------------------------------------


function DCC_checkArgs(args)
{
	var bRet = true;
	// If number of arguments isn't even, show a warning and return false.
	if ( parseFloat(args.length/2) != parseInt(args.length/2) )
	{
    	bRet = false;
	}
	return bRet;
}

//
// strFuncName : WindowsMedia || RealMedia-ImageWindow || RealMedia-StatusBar || RealMedia-ControlPanel
//
function DCC_generateObject(strFuncName, args)
{
	if ( strFuncName!="WindowsMedia" && strFuncName!="RealMedia-ImageWindow" && strFuncName!="RealMedia-StatusBar" && strFuncName!="RealMedia-ControlPanel" )
	{
		return;
	}

	if ( !DCC_checkArgs(args) )
	{
		return;
	}

	// Initialize variables
	var strTag = '';
	var strKey = '';
	var strLowerKey = '';
	var strValue = '';
	var strCloseTag =  '/>';
	var strEmbed = '<embed';
	var strParam = '';
	var strObject = '<object';
	var strControlsEmbedValue = '';
	var bForObject = false;
	var bForParam = false;
	var bForEmbed = false;

	for ( var i=0; i < args.length; i=i+2 )
	{
		bForObject = false;
		bForParam = false;
		bForEmbed = false;
		
		strKey = args[i];
		strValue = args[i+1];
		strLowerKey = strKey.toLowerCase();

		switch ( strLowerKey )
		{
			// for object
			case "id":
			case "classid":
				bForObject = true;
				break;

			// for object & embed
			case "width":
			case "height":
				bForObject = true;
				bForEmbed = true;
				break;

			// for param
			case "url":	// URL
				bForParam = true;
				break;

			// for param & embed
			case "currentposition":
			case "enabled":
			case "autostart":		// autoStart || autostart
			case "stretchtofit":	// stretchToFit
			case "uimode":			// uiMode
			case "backgroundcolor":
			case "center":
				bForParam = true;
				bForEmbed = true;
				break;

			// for embed
			case "type":
			case "name":
			case "nojava":
			case "pluginspage":
				bForEmbed = true;
				break;
			
			//
			// others
			//

			case "src":
				bForEmbed = true;
				if ( strFuncName.indexOf("RealMedia-ImageWindow") != -1 )
				{
					bForParam = true;
				}
				break;

			case "console":
				bForParam = true;
				if ( strFuncName.indexOf("RealMedia") != -1 )
				{
					bForParam = true;
				}
				break;

			case "controls":
				bForParam = true;

				if ( strControlsEmbedValue != "" )
				{
					strControlsEmbedValue += ';';
				}
				strControlsEmbedValue += strValue;
				break;

			default:
				break;
		}
		
		// Apply data
		
		if ( bForObject )
		{
			strObject += ' ' + strKey + '="' + strValue + '"';
		}
		
		if ( bForParam )
		{
			strParam += '<param name="' + strKey + '" value="' + strValue + '"' + strCloseTag + '\n'; 
		}
		
		if ( bForEmbed )
		{
			strEmbed += ' ' + strKey + '="' + strValue + '"';
		}
	}

	// append embed 'controls' value
	if ( strControlsEmbedValue != "" )
	{
		strEmbed += ' controls="' + strControlsEmbedValue + '"';
	}

	// Close object and embed tag strings.
	strObject += '>\n';
	strEmbed += '/>\n'; 

	// Build object tag.
	strTag = strObject + strParam + strEmbed + '</object>\n'; 

	document.write(strTag);
	return;
}

function generateWindowsMedia()
{
  DCC_generateObject("WindowsMedia", arguments);
}


function generateRealMediaImage()
{
  DCC_generateObject("RealMedia-ImageWindow", arguments);
}

function generateRealMediaStatus()
{
  DCC_generateObject("RealMedia-StatusBar", arguments);
}

function generateRealMediaControl()
{
  DCC_generateObject("RealMedia-ControlPanel", arguments);
}
