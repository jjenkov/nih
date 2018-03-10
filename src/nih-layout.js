layout=(v)=>{
v.layout={};

v.layout.cnf = {
	breaks   : [0, 320, 640, 960, 1280],
    colCounts: [12, 12, 12, 12, 12],
    widths   : ["100%", "100%", "100%", "100%", "1200"],
	paddings : [8,16,16,16,24],
    spacings : [8,16,16,16,32]
}


v.layout.conf=(cnf)=>{ v.layout.cnf = cnf; }
v.layout.rows=(rws)=>{ 
	v.layout.rws = rws;
    for(var i=0; i<rws.length; i++){
		/* remove white space text nodes */
		var kids = rws[i].el.childNodes;
		for(var j=0; j<kids.length; j++){
			if(kids[j].nodeType == Node.TEXT_NODE && kids[j].textContent.trim().length == 0){
				kids[j].parentNode.removeChild(kids[j]);
			}
		}

		/* match cells with child elements of row element */
		if(rws[i].cells == null){
			rws[i].cells = [];
		}
		var min = Math.min(rws[i].cells.length, kids.length);
		for(var k=0;k<min;k++) {
			rws[i].cells[k].el = kids[k];
		}
		
		/* transfer default conf to row */
		if(!rws[i].breaks){ rws[i].breaks = v.layout.cnf.breaks; }
		if(!rws[i].colCounts) { rws[i].colCounts = v.layout.cnf.colCounts; }
		if(!rws[i].widths) { rws[i].widths = v.layout.cnf.widths; }
		if(!rws[i].paddings){ rws[i].paddings = v.layout.cnf.paddings; }
		if(!rws[i].spacings){ rws[i].spacings = v.layout.cnf.spacings; }
	}
	
	
}

v.layout.do=()=> {
	for(var j=0; j<v.layout.rws.length; j++){
		var row = v.layout.rws[j];

		/*find width interval for row*/
		var wi = 0;
		for(var i=0; i<row.breaks.length; i++){
			if(window.innerWidth>=row.breaks[i]){
				wi=i;
			}
		}

		/* calculate row's column boundaries */
		var colCount = row.colCounts[wi];
		
		var spacing = row.spacings[wi];
		var rowWidth = (row.el.parentElement ? row.el.parentElement.offsetWidth : window.innerWidth)
			- row.paddings[wi] * 2
			+ spacing;
		
		var colBounds  = new Array(colCount + 1);

		for(var i=0; i < colCount; i++){
            var calcBound = Math.floor(rowWidth * i / colCount);
            var prevEnd   = calcBound - Math.floor(spacing / 2);
            var nextBegin = calcBound + Math.floor(spacing / 2);
            colBounds[i] = { prevEnd: prevEnd, boundary: calcBound, nextBegin : nextBegin };
        }

        colBounds[colCount] = {
            prevEnd: rowWidth - Math.floor(spacing / 2),
            boundary  : rowWidth
        };
		
		/* apply row's column boundaries to row cell elements */
		var fromCol = 0;
		for(var i=0; i<row.cells.length; i++) {
			var toCol = fromCol + row.cells[i].colwidths[wi];
			var cellWidth = colBounds[toCol].prevEnd - colBounds[fromCol].nextBegin;
			
			row.cells[i].el.style = "display: inline-block; box-sizing: border-box; "
			    + (cellWidth > 0 ? "width: " + cellWidth + "px; " : "display: none;")
			    + "margin-left: " + (fromCol == 0 ? row.paddings[wi] : row.spacings[wi]) + "px";

			fromCol = toCol < colCount ? toCol : 0;
		}
	}
}

window.addEventListener("resize", (e)=>{ v.layout.do(); });
}