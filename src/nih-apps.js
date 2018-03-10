apps=(v)=>{
v.apps={c:{}};
v.apps.add=(name)=>{
	var app={};

	app.facts={};
	app.addFact=(type, f)=>{ app.facts[type]=f; }
	app.fact=(type)=>{ return app.facts[type]; }

	app.coms={};
	app.addCom=(name, type)=>{
		var com=app.fact(type)();
		app.coms[name]=com;
		return com;
	}
	app.remCom=(name)=>{
		app.coms[name]=null;
	}
	app.com=(name)=>{return app.coms[name];}

	v.apps.c[name]=app;
	return app;
}
v.apps.rem=(name)=>{
	v.apps.c[name]=null;
}
v.apps.app=(name)=>{return v.apps.c[name];}
}