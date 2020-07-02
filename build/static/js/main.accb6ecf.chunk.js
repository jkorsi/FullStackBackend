(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,n,t){e.exports=t(39)},37:function(e,n,t){},38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var o,a,l=t(0),r=t.n(l),i=t(13),c=t.n(i),u=t(14),s=t(3),d=function(e){return o=null==typeof e.filterValue?"":e.filterValue,a=null==typeof e.handleFilterChange?"":e.handleFilterChange,r.a.createElement("div",{style:{padding:10}},"Filtteri: ",r.a.createElement("input",{value:o,onChange:a}))},f=function(e){var n=e.person,t=e.deletePerson;return r.a.createElement("li",null,n.name,","," ",n.number," "," ",r.a.createElement("button",{onClick:t},"Poista"))},m=t(2),g=t.n(m),p=function(e){var n=String(e);if(console.log("Deleting person",n),window.confirm("Haluatko varmasti poistaa henkil\xf6n?"))return console.log("Deleting person ",n),g.a.delete("".concat("/api/persons","/").concat(n)).then(function(e){return e.data}).catch(function(e){alert("The person '".concat(n,"' was already deleted from server"))})},h=function(e){var n;return console.log("Filtered rows propsit: ",e),console.log(e.filteredRows),n=e.filterValue?e.filterValue.toLowerCase:"",e.filteredRows.filter(function(e){return e.name.toLowerCase().includes(n)}).map(function(n){return console.log("Filtered values: ",n.name,n.id),r.a.createElement(f,{key:n.id,person:n,deletePerson:function(){return e.deletePerson(n.id)}})})},v=function(e){return r.a.createElement("form",{onSubmit:e.addPersonAndNumber},r.a.createElement("div",{style:{padding:10}},"Nimi: ",r.a.createElement("input",{value:e.newName,onChange:e.handlePersonsChange})),r.a.createElement("div",{style:{padding:10}},"Puhelinnumero: ",r.a.createElement("input",{value:e.newPhone,onChange:e.handlePhoneChange})),r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement("button",{type:"submit"},"Lis\xe4\xe4")))},b=function(){return g.a.get("/api/persons").then(function(e){return e.data})},E=function(e){return g.a.post("/api/persons",e).then(function(e){return e.data})},w=function(e,n){var t=String(e);console.log("ID: ",t);var o=g.a.put("".concat("/api/persons","/").concat(t),n);return console.log(n),o.then(function(e){return e.data})},P=function(e){var n=e.message,t=e.isSuccess,o="green";return console.log("Message",n),console.log("Success ",t.toString()),null===n?null:(t?t&&(o="green",console.log("Success")):(o="red",console.log("No success")),r.a.createElement("div",{className:"error",style:{color:o}},n))},k=(t(37),function(){var e=Object(l.useState)([]),n=Object(s.a)(e,2),t=n[0],o=n[1],a=Object(l.useState)(""),i=Object(s.a)(a,2),c=i[0],f=i[1],m=Object(l.useState)(""),g=Object(s.a)(m,2),k=g[0],S=g[1],j=Object(l.useState)(""),C=Object(s.a)(j,2),O=C[0],y=C[1],N=Object(l.useState)(null),F=Object(s.a)(N,2),H=F[0],L=F[1],V=Object(l.useState)(!0),D=Object(s.a)(V,2),R=D[0],A=D[1],I=t,J="/api/persons/";Object(l.useEffect)(function(){b().then(function(e){console.log("Promise fulfilled"),console.log(e),o(e)})},[]);function T(e){L("".concat(e)),setTimeout(function(){L(null)},5e3)}return r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement(P,{message:H,isSuccess:R}),r.a.createElement("h3",null,"Hae henkil\xf6\xe4"),r.a.createElement(d,{filterValue:O,handleFilterChange:function(e){y(e.target.value)}}),r.a.createElement("h3",null,"Lis\xe4\xe4 henkil\xf6"),r.a.createElement(v,{addPersonAndNumber:function(e){if(e.preventDefault(),console.log("New name",c,", new number: ",k),t.filter(function(e){return e.name.toLowerCase()===c.toLowerCase()}).length>0)window.confirm("Henkil\xf6 ".concat(c," on jo olemassa. P\xe4ivitet\xe4\xe4nk\xf6 numero?"))&&function(){var e=c,n=t.find(function(n){return n.name===e}),a=String(n.id);"".concat(J).concat(a),console.log("Updating person (original):",n);var l=Object(u.a)({},n,{number:k});console.log("Updating person (updated):",l),w(a,l).then(function(n){A(!0),console.log("Setting person list..."),console.log("Personlist before update: ",t),o(t.map(function(e){return e.id!==a?e:n})),f(""),S(""),T("Henkil\xf6n ".concat(e," numero p\xe4ivitetty."))}).catch(function(n){A(!1),T("Henkil\xf6 ".concat(e," on poistettu palvelimelta. :( Kokeile lis\xe4t\xe4 henkil\xf6 uudelleen!")),o(t.filter(function(e){return e.id!==a}))})}();else{var n={name:c,number:k};E(n).then(function(e){n.id=e.id,A(!0),o(t.concat(n)),f(""),S(""),T("Henkil\xf6 ".concat(n.name," lis\xe4tty"))})}},newName:c,handlePersonsChange:function(e){f(e.target.value)},newPhone:k,handlePhoneChange:function(e){S(e.target.value)}}),r.a.createElement("h2",null,"Numerot"),r.a.createElement("ul",null,r.a.createElement(h,{filterValue:O,filteredRows:I,deletePerson:function(e){A(!0),console.log("Front: Deleting person with id: ",e);var n=t.find(function(n){return n.id===e}).name;p(e).then(o(t.filter(function(n){return n.id!==e}))),T("Poistettiin henkil\xf6 ".concat(n))}})))});t(38);c.a.render(r.a.createElement(k,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.accb6ecf.chunk.js.map