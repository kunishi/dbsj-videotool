
//////////////////////////////////////////////
// 指定桁の数値を作成する
function fixedDigitsString(nFixedDigits, nNum)
{
	nFixedDigits = parseInt(nFixedDigits);
	nNum = parseInt(nNum);
	
	if ( isNaN(nFixedDigits) || isNaN(nNum) )
	{
		return nNum.toString();
	}
	
	if ( 0>nFixedDigits || 0>nNum )
	{
		return nNum.toString();
	}
	
	var		strRet = new String("");
	var		nDigits = ( Number(nNum).toString() ).length;	// 桁数
	
	if ( nFixedDigits <= nDigits )
	{
		return nNum.toString();
	}
	
	var		nPrefixs = nFixedDigits - nDigits;
	
	for ( var i=0; i < nPrefixs; i++ ) { strRet += '0'; }
	
	strRet += nNum.toString();
	
	return strRet;
}


//////////////////////////////////////////////
// 指定のページから再生を始める
function jumpPage()
{
	if ( document.location.search != "" )
	{
		//@debug alert(document.location.search);
		// 最初の "?" を外す。
    	var param = document.location.search.substr(1);

		// "&" で区切られた複数のパラメータを分割する。
		var arr = param.split("%26");
		
     	//@debug alert(arr.length + " item");
     	
		for ( var i=arr.length-1; 0 <= i; i-=1 )
	    {
			//@debug alert(i + " : " + arr[i]);

			// "page="で始まるパラメータか？
			var nPos = arr[i].indexOf("page="); 
				
			if ( 0 == nPos )
			{
				var val = arr[i].substr(5);	// 5 means length of "page="
				var	nPageNum = parseInt(val);

     			//@debug alert(nPageNum);
     			
     			//
     			// 有効なページは 1～N（Nはコンテンツ依存）
     			// 厳密にはコンテンツに応じて適切な範囲チェックを行うべき。
     			//
				if ( !isNaN(nPageNum) && 1<=nPageNum )
				{ // もし値が指定されていたら、そのページが再生されるようにする。
					var loc = "./video/video" + fixedDigitsString(4, nPageNum) + ".html";
					//@debug alert(loc);

					// "video" frame に新しいドキュメントを読み込ませる。
					window.open(loc, "video");
				}

				break;
			}
		}
	}
}

