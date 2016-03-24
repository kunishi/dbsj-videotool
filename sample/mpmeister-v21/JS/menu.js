

var INDEX_APPENDIX = new String("MenuIndex");
var DESC_APPENDIX = new String("Desc");
var THUMBNAIL_APPENDIX = new String("Thumbnail");
var TIMEBAR_APPENDIX = new String("TimeBar");
var TIMEDESC_APPENDIX = new String("TimeDesc");


/////////////////////////////////////////////
// メニューの選択を保存する
// 
// caller : menu frame
// 
// @param targetid		id of hilite
// 
function saveMenuHiliteState(targetid)
{
	if ( document.getElementById ) // for IE
	{
		var oInput = window.parent.control.document.getElementById("hiliteItem");
		
		if ( oInput != null )
		{
			oInput.setAttribute("value", targetid);
		}
	}
}

/////////////////////////////////////////////
// メニューの選択を復元する
// 
// caller : menu frame
// 
// @param menulayout	menu layout type ( 'portrait', 'landscape' )
// 
function restoreMenuHiliteState(menulayout)
{
	if ( document.getElementById ) // for IE
	{
		var sHiliteId = String("id0001");	// default value
		var oInput = window.parent.control.document.getElementById("hiliteItem");	// control owns hilite value
		
		if ( oInput != null )
		{
			sHiliteId = String( oInput.getAttribute("value") );
		}
		
		if ( null!=sHiliteId && 0<sHiliteId.length )
		{
			hiliteMenuItem(sHiliteId, menulayout);
		}

	}
}

/////////////////////////////////////////////
// メニューの該当項目の色を変える。
// 
// caller : slide frame
// 
// @param targetid		id of hilite row
// @param menulayout	menu layout type ( 'portrait', 'landscape' )
// 
// 
function hiliteMenuItemFromSlide(targetid, menulayout)
{
	// avoid error when slide opens without frame
	if ( undefined == window.parent.menu )
	{
		return;
	}

	if ( document.getElementById ) // for IE
	{
		//
		// if menu item was already hilited, do nothing.
		// if targetid is first(='id0001'), it is possible for browser... menu frame NOT loaded yet.
		//
		var oInput = window.parent.control.document.getElementById("hiliteItem");
		var sHiliteId = String("id0001");	// default value;
		
		if ( oInput != null )
		{
			sHiliteId = String( oInput.getAttribute("value") );
		}
		
		if ( undefined!=sHiliteId && sHiliteId==targetid )
		{
			return;
		}
		
		// hilite...
		hiliteMenuItem(targetid, menulayout);
		
	}
}


/////////////////////////////////////////////
// メニューの該当項目の色を変える。
// 
// caller : menu frame / slide frame
// 
// only "tr" element has @id="idNNNN?????"
//    Ex:
// 			id0001MenuIndex 	(menu type 1/2/3 : All)
// 			id0001Desc			(menu type 1/2/3 : All)
// 			id0001Thumbnail		(menu type 2/3)
// 			id0001TimeBar		(menu type 3)
// 
// @param targetid		id of hilite
// @param menulayout	menu layout type ( 'portrait', 'landscape' )
// 
// 
//
//
function hiliteMenuItem(targetid, menulayout)
{
	if ( document.getElementById ) // for IE
	{
		// All menu type has index id
		var sDescTargetId = targetid + INDEX_APPENDIX;
		
		var targetItem = window.parent.menu.document.getElementById( sDescTargetId );
		
		// if no target menu item, then do nothing.
		// probably, TOC is summarized...
		if ( null == targetItem )
		{
			//alert(sDescTargetId);
			return;
		}
		//alert(sDescTargetId);
		
		var collTd = window.parent.menu.document.getElementsByTagName("td");
		if ( collTd != null )
		{
			var		i;
			var		j;
			
			/////////////////////////////////////////////////////////////////////////////
			// remove hilite...
			//    NOTE: currently, css class name is given to 'td' and 'td/div' element.
		    for ( i=0; i<collTd.length; i++ )
		    {
		    	var strId = collTd[i].id;
		    	
		    	if ( 0==strId.indexOf("id") && strId.substr(0, 6)!=targetid )
		    	{
					var strTdClass = String( collTd[i].className );

					// modify "td" class attribute
			    	if ( null!=strTdClass && 0==strTdClass.indexOf("selected_") )
			    	{
			    		var nLen = strTdClass.length - 9;
			    		
			    		strTdClass = strTdClass.substr(9, nLen);
			    		
			    		collTd[i].className = strTdClass;
			    	}
			    	
					// modify "div" class attribute
					var collDiv = collTd[i].getElementsByTagName("div");
					if ( collDiv != null )
					{
					    for ( j=0; j<collDiv.length; j++ )
					    {
					    	var strDivClass = String( collDiv[j].className );
					    	
					    	if ( null!=strDivClass && 0==strDivClass.indexOf("selected_") )
					    	{
					    		var nLen = strDivClass.length - 9;
					    		
					    		strDivClass = strDivClass.substr(9, nLen);
					    		
					    		collDiv[j].className = strDivClass;
					    	}
					    }
					} // END if
					
				} // END if 
			}
			
			/////////////////////////////////////////////////////////////////////////////
			// add hilite...
			//    NOTE: currently, css class name is given to 'td' and 'td/div' element.
			
			// modify class attribute
		    for ( i=0; i<collTd.length; i++ )
		    {
		    	var strId = collTd[i].id;
		    	
		    	if ( 0==strId.indexOf("id") && strId.substr(0, 6)==targetid )
		    	{
			    	var strTdClass = String( collTd[i].className );
			    	
			    	if ( null!=strTdClass && 0<strTdClass.length )
			    	{
			    		var strNewTdClass = "selected_" + strTdClass;
			    		
			    		collTd[i].className = strNewTdClass;
			    	}
			    	
					// modify class attribute
					var collDiv = collTd[i].getElementsByTagName("div");
					if ( collDiv != null )
					{
					    for ( j=0; j<collDiv.length; j++ )
					    {
					    	var strDivClass = String( collDiv[j].className );
					    	
					    	if ( null!=strDivClass && 0<strDivClass.length )
					    	{
					    		var strNewDivClass = "selected_" + strDivClass;
					    		
					    		collDiv[j].className = strNewDivClass;
					    	}
					    }
					} // END if
			    	
			    }
		    }
		}
		
		// store current state
		saveMenuHiliteState(targetid);
		
		// scroll
		scrollMenu(targetid, menulayout);
	}
}

/////////////////////////////////////////////
// メニューをスクロールする。
//
// メニューインデックス（ページ番号が表示されているカラム）をスクロールの基準とする
// 
// caller : menu frame
// 
// @param targetid		id of hilite
// @param menulayout	menu layout type ( 'portrait', 'landscape' )
// 
function scrollMenu(targetid, menulayout)
{
	if ( document.getElementById ) // for IE
	{
		// All menu type has index id and it is most suitable for scrolling vertical or horizontal.
		var sMenuIndexTargetId = targetid + INDEX_APPENDIX;

	 	var menuHolder = window.parent.menu.document.getElementById( "menuHolder" );
	 	var item = window.parent.menu.document.getElementById( sMenuIndexTargetId );
		if ( null!=item && null!=menuHolder )
		{
			if ( String(menulayout) == "landscape"  )
			{
				var		nXOffset = 0;
				var		oPosChild = item;
				
				// calc X offset from menuHolder
				do
				{
					nXOffset += oPosChild.offsetLeft;
					oPosChild = oPosChild.offsetParent;
					
				} while ( oPosChild != menuHolder );
				
				var		nMenuItemWidth = item.offsetWidth;
				var 	sMenuType = window.parent.control.document.getElementById("selectedMenuType").getAttribute("value");
				
				if ( 0 <= sMenuType.indexOf("menu_type1") )
				{
					var sDescTargetId = targetid + DESC_APPENDIX;
				 	var descitem = window.parent.menu.document.getElementById( sDescTargetId );
				 	
				 	nMenuItemWidth += descitem.offsetWidth;
				}
				
				//if ( (menuHolder.clientWidth < nXOffset) || (nXOffset < menuHolder.scrollLeft) ) // always center item
				if ( (menuHolder.clientWidth < ((nXOffset+nMenuItemWidth) - menuHolder.scrollLeft)) || (nXOffset < menuHolder.scrollLeft) ) // scroll only item is invisible --- left or right
				{
					var nOffsetToCenter = (menuHolder.clientWidth - nMenuItemWidth) / 2;
					var nHorizontalOffset = ( 0 < nOffsetToCenter ) ? (nXOffset - nOffsetToCenter) : nXOffset;
					
					window.parent.menu.scrollTo(nHorizontalOffset, 0);
				}
			}
			else
			{
				var		nYOffset = 0;
				var		oPosChild = item;
				
				// calc Y offset from menuHolder
				do
				{
					nYOffset += oPosChild.offsetTop;
					oPosChild = oPosChild.offsetParent;
					
				} while ( oPosChild != menuHolder );
				
				var		nMenuItemHeight = item.offsetHeight;
				
				//if ( (menuHolder.clientHeight < nYOffset) || (nYOffset < menuHolder.scrollTop) ) // always center item
				if ( (menuHolder.clientHeight < ((nYOffset+nMenuItemHeight) - menuHolder.scrollTop)) || (nYOffset < menuHolder.scrollTop) ) // scroll only item is invisible --- below or above
				{
					var nOffsetToCenter = (menuHolder.clientHeight - nMenuItemHeight) / 2;
					var nVerticalOffset = ( 0 < nOffsetToCenter ) ? (nYOffset - nOffsetToCenter) : nYOffset;
					
					window.parent.menu.scrollTo(0, nVerticalOffset);
				}
			}
		}
	}
}

