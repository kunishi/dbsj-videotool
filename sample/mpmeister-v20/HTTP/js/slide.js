
/////////////////////////////////////////////
// スライドを表示する
function showSlide(sUrl, sTitle, nWidth, nHeight)
{
	var sAttr = "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbar=no,resizable=no,";
	
	sAttr += "width=" + nWidth + ",";
	sAttr += "height=" + nHeight;
	
	window.open(sUrl, sTitle, sAttr);
}
