events=(v)=>{
v.evt = {};
v.evt.q=()=>{
	var q={};
	q.ids=0;
	q.subs=[];
	q.on=(name, f)=>{
		var id=q.ids++;
		q.subs.push({ name : name, id: id, f : f});
		return id;
	}
	q.off=(id)=>{
		for(var i=0; i<q.subs.length; i++){
			if(q.subs[i].id == id){
				q.subs.splice(i,1);
			}
		}
	}
	q.ev=(name, obj)=>{
		for(var i=0; i<q.subs.length; i++){
			var s = q.subs[i];
			if(name.indexOf(s.name) == 0){
				s.f(obj, name);
			}
		}
	}
	
	return q;
};
v.evt.events=v.evt.q();
v.evt.intents=v.evt.q();
} 