
//////////////////////////////////////////////
// �w�茅�̐��l���쐬����
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
	var		nDigits = ( Number(nNum).toString() ).length;	// ����
	
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
// �w��̃y�[�W����Đ����n�߂�
function jumpPage()
{
	if ( document.location.search != "" )
	{
		//@debug alert(document.location.search);
		// �ŏ��� "?" ���O���B
    	var param = document.location.search.substr(1);

		// "&" �ŋ�؂�ꂽ�����̃p�����[�^�𕪊�����B
		var arr = param.split("%26");
		
     	//@debug alert(arr.length + " item");
     	
		for ( var i=arr.length-1; 0 <= i; i-=1 )
	    {
			//@debug alert(i + " : " + arr[i]);

			// "page="�Ŏn�܂�p�����[�^���H
			var nPos = arr[i].indexOf("page="); 
				
			if ( 0 == nPos )
			{
				var val = arr[i].substr(5);	// 5 means length of "page="
				var	nPageNum = parseInt(val);

     			//@debug alert(nPageNum);
     			
     			//
     			// �L���ȃy�[�W�� 1�`N�iN�̓R���e���c�ˑ��j
     			// �����ɂ̓R���e���c�ɉ����ēK�؂Ȕ͈̓`�F�b�N���s���ׂ��B
     			//
				if ( !isNaN(nPageNum) && 1<=nPageNum )
				{ // �����l���w�肳��Ă�����A���̃y�[�W���Đ������悤�ɂ���B
					var loc = "./video/video" + fixedDigitsString(4, nPageNum) + ".html";
					//@debug alert(loc);

					// "video" frame �ɐV�����h�L�������g��ǂݍ��܂���B
					window.open(loc, "video");
				}

				break;
			}
		}
	}
}

