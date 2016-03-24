
/////////////////////////////////////////////
// メニューボタン用イメージ

var g_aMenuButtons = new Array();
g_aMenuButtons[1] = new Image();
g_aMenuButtons[1].src = "./textMenuIcon_u.png";
g_aMenuButtons[2] = new Image();
g_aMenuButtons[2].src = "./textMenuIcon_d.png";
g_aMenuButtons[3]= new Image();
g_aMenuButtons[3].src = "./slideMenuIcon_u.png";
g_aMenuButtons[4]= new Image();
g_aMenuButtons[4].src = "./slideMenuIcon_d.png";
g_aMenuButtons[5]= new Image();
g_aMenuButtons[5].src = "./timeMenuIcon_u.png";
g_aMenuButtons[6]= new Image();
g_aMenuButtons[6].src = "./timeMenuIcon_d.png";


/////////////////////////////////////////////
// ロケーションからファイル名を取得する
// 
// caller : control frame
// 
function getFileComponent(sUrl)
{
	var sDesc = sUrl.toString();
	var nIndex = sDesc.lastIndexOf("/");
	
	if ( 0 <= nIndex )
	{
		return sDesc.substr(nIndex + 1);
	}
	else
	{
		return sDesc;
	}
}

/////////////////////////////////////////////
// メニュー表示を切り替える
// 
// caller : control frame
// 
function switchMenu(menuUrl)
{
	if ( document.getElementById ) // for IE
	{
		// check whether current location is same menu or not.
		var sCurrentLocation = window.parent.menu.document.location;
		var oInput = window.parent.control.document.getElementById("selectedMenuType");
		
		var sCurFile = getFileComponent(sCurrentLocation);
		var sNewFile = getFileComponent(menuUrl);
		
		if ( sCurFile.toLowerCase() != sNewFile.toLowerCase() )
		{
			//alert(sNewFile);

			// ボタン画像の変更
			if ( sNewFile == "menu_type2.html" )
			{
				window.parent.control.document.images['imgText' ].src = g_aMenuButtons[1].src;
				window.parent.control.document.images['imgSlide'].src = g_aMenuButtons[4].src;
				window.parent.control.document.images['imgTime' ].src = g_aMenuButtons[5].src;
			}
			else if ( sNewFile == "menu_type3.html" )
			{
				window.parent.control.document.images['imgText' ].src = g_aMenuButtons[1].src;
				window.parent.control.document.images['imgSlide'].src = g_aMenuButtons[3].src;
				window.parent.control.document.images['imgTime' ].src = g_aMenuButtons[6].src;
			}
			else
			{
				window.parent.control.document.images['imgText' ].src = g_aMenuButtons[2].src;
				window.parent.control.document.images['imgSlide'].src = g_aMenuButtons[3].src;
				window.parent.control.document.images['imgTime' ].src = g_aMenuButtons[5].src;
			}
			
			// メニューframeのロード
			window.parent.menu.document.location = menuUrl;
			oInput.setAttribute("value", sNewFile);
		}
	}
}
