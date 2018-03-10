dom=(v)=>{
v.dom={};

v.dom.q=(s)=>{ return document.querySelector(s); }
v.dom.qall=(s)=>{ return document.querySelectorAll(s); }
v.dom.qid=(id)=> { return document.getElementById(id); }
v.dom.qcl=(cl)=> { return document.getElementsByClassName(cl); }

v.dom.el=(name)=>{ return document.createElement(name); }
v.dom.txt=(text)=>{ return document.createTextNode(text); }
v.dom.append=(e, c)=> { return e.appendChild(c); };

v.dom.on=(e, name, f, opt)=>{ return e.addEventListener(name, f, opt); } 
v.dom.off=(e, name, f, opt)=>{ return e.removeEventListener(name, f, opt); } 
}